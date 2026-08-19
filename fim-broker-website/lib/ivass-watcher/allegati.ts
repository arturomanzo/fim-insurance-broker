/**
 * Sorveglianza degli allegati al Reg. IVASS 40/2018.
 *
 * Il watcher RSS intercetta le *notizie*; questo modulo controlla i *file*.
 * È la rete di sicurezza che è mancata quando il Provv. 147/2024 ha sostituito
 * gli Allegati 3, 4, 4-bis e 4-ter con il MUP senza che il sito se ne
 * accorgesse: un provvedimento dal titolo opaco può sfuggire al triage, ma il
 * PDF dell'allegato cambia comunque.
 *
 * Meccanica: si scarica ogni PDF sorvegliato, se ne calcola lo sha256 e lo si
 * confronta con l'ultimo hash salvato in `ivass_allegati_state`. Nessun parsing
 * del contenuto — il PDF IVASS non è estraibile in modo affidabile senza
 * dipendenze aggiuntive, e per far scattare l'allarme basta sapere *che* è
 * cambiato.
 *
 * Stato: tabella Supabase `ivass_allegati_state`, una riga per documento.
 */
import { createHash } from 'node:crypto'
import { getSupabase } from '@/lib/supabase'
import { ALLEGATI_MONITORATI } from '@/lib/compliance'
import { BROWSER_UA } from './sources'

/** Timeout per singolo download: i PDF stanno fra 150 KB e 1,2 MB. */
const FETCH_TIMEOUT_MS = 25_000

export type AllegatoStatus = 'primo-rilevamento' | 'invariato' | 'modificato' | 'errore'

export interface AllegatoCheck {
  id: string
  label: string
  url: string
  status: AllegatoStatus
  /** sha256 del PDF appena scaricato. */
  hash?: string
  /** Hash conosciuto prima di questo giro (assente al primo rilevamento). */
  previousHash?: string
  lastModified?: string
  contentLength?: number
  /** Data dell'ultimo cambiamento noto, per i documenti invariati. */
  lastChangedAt?: string
  /**
   * true se questo documento deve finire nell'alert di oggi: o è cambiato
   * adesso, o era cambiato in un giro precedente la cui email non è mai partita.
   */
  daNotificare: boolean
  error?: string
}

interface StoredAllegato {
  id: string
  content_hash: string | null
  etag: string | null
  last_modified: string | null
  content_length: number | null
  last_changed_at: string | null
  consecutive_errors: number | null
  notified_at: string | null
}

function describeError(err: unknown): string {
  if (err instanceof Error) {
    const cause = (err as Error & { cause?: unknown }).cause
    return cause ? `${err.name}: ${err.message} | cause=${String(cause)}` : `${err.name}: ${err.message}`
  }
  return String(err)
}

interface FetchedPdf {
  hash: string
  etag: string | null
  lastModified: string | null
  contentLength: number
}

async function fetchPdf(url: string): Promise<FetchedPdf> {
  const res = await fetch(url, {
    headers: { 'User-Agent': BROWSER_UA, Accept: 'application/pdf,*/*' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)

  const buf = Buffer.from(await res.arrayBuffer())
  // Guardia contro pagine di errore servite con status 200: un PDF inizia per %PDF.
  if (buf.length < 1024 || buf.subarray(0, 4).toString('latin1') !== '%PDF') {
    throw new Error(`Risposta non è un PDF (${buf.length} byte)`)
  }
  return {
    hash: createHash('sha256').update(buf).digest('hex'),
    etag: res.headers.get('etag'),
    lastModified: res.headers.get('last-modified'),
    contentLength: buf.length,
  }
}

async function loadStored(ids: string[]): Promise<Map<string, StoredAllegato>> {
  const supa = getSupabase()
  const map = new Map<string, StoredAllegato>()
  if (!supa || ids.length === 0) return map
  try {
    const { data, error } = await supa
      .from('ivass_allegati_state')
      .select('id,content_hash,etag,last_modified,content_length,last_changed_at,consecutive_errors,notified_at')
      .in('id', ids)
    if (error) {
      console.error('[allegati-watcher] loadStored error:', error.message)
      return map
    }
    for (const row of (data ?? []) as StoredAllegato[]) map.set(row.id, row)
  } catch (err) {
    console.error('[allegati-watcher] loadStored threw:', describeError(err))
  }
  return map
}

/**
 * Riga di stato completa. Tutte le colonne sono sempre valorizzate: PostgREST
 * costruisce la lista di colonne dell'upsert dall'unione delle chiavi del
 * batch, quindi un payload parziale sul ramo d'errore azzererebbe `content_hash`
 * — e al giro dopo un allegato modificato passerebbe per "primo rilevamento",
 * senza notifica. Meglio riscrivere sempre tutto, riportando i valori noti.
 */
interface StateRow {
  id: string
  label: string
  url: string
  content_hash: string | null
  etag: string | null
  last_modified: string | null
  content_length: number | null
  last_checked_at: string
  last_changed_at: string | null
  consecutive_errors: number
  check_error: string | null
  notified_at: string | null
}

async function persist(rows: StateRow[]): Promise<void> {
  const supa = getSupabase()
  if (!supa || rows.length === 0) return
  try {
    const { error } = await supa.from('ivass_allegati_state').upsert(rows, { onConflict: 'id' })
    if (error) console.error('[allegati-watcher] persist error:', error.message)
  } catch (err) {
    console.error('[allegati-watcher] persist threw:', describeError(err))
  }
}

/**
 * Scarica e confronta tutti i documenti sorvegliati.
 *
 * Il primo giro salva gli hash e riporta `primo-rilevamento` per tutti: è
 * atteso, non è un allarme. Dal secondo giro in poi solo i `modificato`
 * meritano una notifica.
 */
export async function checkAllegati(): Promise<AllegatoCheck[]> {
  const ids = ALLEGATI_MONITORATI.map((a) => a.id)
  const stored = await loadStored(ids)
  const now = new Date().toISOString()

  const checks = await Promise.all(
    ALLEGATI_MONITORATI.map(async (doc): Promise<{ check: AllegatoCheck; row: StateRow }> => {
      const prev = stored.get(doc.id)
      const base = { id: doc.id, label: doc.label, url: doc.url }

      try {
        const pdf = await fetchPdf(doc.url)
        const previousHash = prev?.content_hash ?? undefined
        const changed = Boolean(previousHash) && previousHash !== pdf.hash
        const status: AllegatoStatus = !previousHash
          ? 'primo-rilevamento'
          : changed
          ? 'modificato'
          : 'invariato'

        // Una modifica registrata ieri ma mai notificata (email fallita, invio
        // saltato) resta in coda: l'hash ormai combacia, quindi senza questo
        // recupero l'allarme si perderebbe per sempre.
        const arretrato = !changed && Boolean(prev?.last_changed_at) && !prev?.notified_at

        return {
          check: {
            ...base,
            status,
            hash: pdf.hash,
            previousHash,
            lastModified: pdf.lastModified ?? undefined,
            contentLength: pdf.contentLength,
            lastChangedAt: changed ? now : prev?.last_changed_at ?? undefined,
            daNotificare: changed || arretrato,
          },
          row: {
            ...base,
            content_hash: pdf.hash,
            etag: pdf.etag,
            last_modified: pdf.lastModified,
            content_length: pdf.contentLength,
            last_checked_at: now,
            last_changed_at: changed ? now : prev?.last_changed_at ?? null,
            consecutive_errors: 0,
            check_error: null,
            // Si azzera alla modifica e si valorizza solo a email spedita,
            // via markNotified(). Vedi il commento su `arretrato`.
            notified_at: changed ? null : prev?.notified_at ?? null,
          },
        }
      } catch (err) {
        const detail = describeError(err)
        console.error(`[allegati-watcher] ${doc.id} fallito:`, detail)
        return {
          check: { ...base, status: 'errore', daNotificare: false, error: detail },
          // Download fallito: si riportano i valori noti, si incrementa solo il
          // contatore d'errore. Perdere l'hash qui significherebbe perdere la
          // capacità di accorgersi della modifica successiva.
          row: {
            ...base,
            content_hash: prev?.content_hash ?? null,
            etag: prev?.etag ?? null,
            last_modified: prev?.last_modified ?? null,
            content_length: prev?.content_length ?? null,
            last_checked_at: now,
            last_changed_at: prev?.last_changed_at ?? null,
            consecutive_errors: (prev?.consecutive_errors ?? 0) + 1,
            check_error: detail,
            notified_at: prev?.notified_at ?? null,
          },
        }
      }
    }),
  )

  await persist(checks.map((c) => c.row))
  return checks.map((c) => c.check)
}

/**
 * Marca come notificati i documenti il cui alert è effettivamente partito.
 * Va chiamata solo dopo un invio riuscito: è ciò che impedisce sia il doppio
 * allarme sia, soprattutto, l'allarme perso.
 */
export async function markNotified(ids: string[]): Promise<void> {
  const supa = getSupabase()
  if (!supa || ids.length === 0) return
  try {
    const { error } = await supa
      .from('ivass_allegati_state')
      .update({ notified_at: new Date().toISOString() })
      .in('id', ids)
    if (error) console.error('[allegati-watcher] markNotified error:', error.message)
  } catch (err) {
    console.error('[allegati-watcher] markNotified threw:', describeError(err))
  }
}
