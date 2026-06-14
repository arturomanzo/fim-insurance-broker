import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { getSupabase } from '@/lib/supabase'
import {
  DOC_BUCKET,
  DOC_PATH_PREFIX,
  MAX_DOC_SIZE,
  fileTypeAllowed,
  isValidDocSlot,
  sanitizeFileName,
} from '@/lib/preventivoDocumenti'

interface FileMeta {
  slot: string
  name: string
  type: string
  size: number
}

/**
 * Step 1: il client invia i metadati dei file da caricare; il server valida
 * e restituisce per ciascuno un signed upload URL (token + path) verso il
 * bucket privato. Il file vero viaggia poi direttamente client → Supabase,
 * senza passare dalla serverless function (evita i limiti di body di Vercel).
 */
export async function POST(req: NextRequest) {
  const { ok, retryAfter } = await rateLimit(req, { limit: 10, windowMs: 60 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche ora.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  const sb = getSupabase()
  if (!sb) {
    return NextResponse.json(
      { error: 'Caricamento documenti non disponibile al momento. Contattaci al +39 06 96883381.' },
      { status: 503 },
    )
  }

  try {
    const body = await req.json()
    const files: FileMeta[] = Array.isArray(body?.files) ? body.files : []

    if (files.length === 0) {
      return NextResponse.json({ error: 'Nessun documento da caricare.' }, { status: 400 })
    }
    if (files.length > 6) {
      return NextResponse.json({ error: 'Troppi documenti.' }, { status: 400 })
    }

    // Validazione metadati
    for (const f of files) {
      if (!isValidDocSlot(f.slot)) {
        return NextResponse.json({ error: 'Documento non riconosciuto.' }, { status: 400 })
      }
      if (!fileTypeAllowed(f.type)) {
        return NextResponse.json(
          { error: 'Formato non supportato. Carica foto (JPG/PNG) o PDF.' },
          { status: 400 },
        )
      }
      if (typeof f.size !== 'number' || f.size <= 0 || f.size > MAX_DOC_SIZE) {
        return NextResponse.json(
          { error: 'File troppo grande. Dimensione massima: 10 MB per documento.' },
          { status: 400 },
        )
      }
    }

    const id = `PA-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`

    const uploads = await Promise.all(
      files.map(async (f) => {
        const path = `${DOC_PATH_PREFIX}/${id}/${f.slot}__${sanitizeFileName(f.name)}`
        const { data, error } = await sb.storage.from(DOC_BUCKET).createSignedUploadUrl(path)
        if (error || !data) throw new Error(error?.message ?? 'signed url error')
        return { slot: f.slot, path: data.path, token: data.token }
      }),
    )

    return NextResponse.json({ success: true, id, uploads }, { status: 200 })
  } catch (error) {
    console.error('[preventivo-auto/init] error:', error)
    return NextResponse.json(
      { error: 'Errore nella preparazione del caricamento. Riprova.' },
      { status: 500 },
    )
  }
}
