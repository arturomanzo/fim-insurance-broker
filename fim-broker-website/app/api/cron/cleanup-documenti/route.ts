/**
 * Retention documenti preventivo — GET /api/cron/cleanup-documenti
 *
 * Eseguito una volta al giorno (Vercel Cron). Elimina dal bucket privato
 * `documenti-preventivo` i file più vecchi di RETENTION_DAYS giorni, in
 * applicazione del principio di minimizzazione GDPR.
 *
 * Protetto da CRON_SECRET (Bearer token), come gli altri cron.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { DOC_BUCKET, DOC_PATH_PREFIX } from '@/lib/preventivoDocumenti'

const CRON_SECRET = process.env.CRON_SECRET
const RETENTION_DAYS = 30
const PAGE_SIZE = 1000

export async function GET(req: NextRequest) {
  if (!CRON_SECRET) {
    console.error('[CRON] CRON_SECRET non configurato — endpoint disabilitato')
    return NextResponse.json({ error: 'Cron non configurato' }, { status: 503 })
  }
  const auth = req.headers.get('authorization') ?? ''
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sb = getSupabase()
  if (!sb) {
    return NextResponse.json({ error: 'Storage non disponibile' }, { status: 503 })
  }

  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000
  const toRemove: string[] = []

  try {
    // Struttura: preventivo-auto/<id>/<file>. Elenco le cartelle <id>, poi i file.
    const { data: folders, error: foldersErr } = await sb.storage
      .from(DOC_BUCKET)
      .list(DOC_PATH_PREFIX, { limit: PAGE_SIZE })
    if (foldersErr) throw foldersErr

    for (const folder of folders ?? []) {
      // Le cartelle non hanno metadata/created_at proprio: ne elenco il contenuto.
      const folderPath = `${DOC_PATH_PREFIX}/${folder.name}`
      const { data: items, error: itemsErr } = await sb.storage
        .from(DOC_BUCKET)
        .list(folderPath, { limit: PAGE_SIZE })
      if (itemsErr) {
        console.error('[CRON cleanup] list error', folderPath, itemsErr.message)
        continue
      }
      for (const item of items ?? []) {
        const created = item.created_at ? new Date(item.created_at).getTime() : NaN
        if (Number.isFinite(created) && created < cutoff) {
          toRemove.push(`${folderPath}/${item.name}`)
        }
      }
    }

    if (toRemove.length > 0) {
      const { error: removeErr } = await sb.storage.from(DOC_BUCKET).remove(toRemove)
      if (removeErr) throw removeErr
    }

    return NextResponse.json(
      { success: true, deleted: toRemove.length, retentionDays: RETENTION_DAYS },
      { status: 200 },
    )
  } catch (error) {
    console.error('[CRON cleanup-documenti] error:', error)
    return NextResponse.json({ error: 'Errore durante la pulizia' }, { status: 500 })
  }
}
