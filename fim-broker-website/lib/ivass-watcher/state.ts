/**
 * IVASS Watcher — persistenza dello stato in Supabase.
 *
 * Tabella: ivass_watcher_state (vedi supabase/website_tables.sql).
 *
 * Lo stato serve a:
 *  1. Evitare doppia notifica per lo stesso item
 *  2. Tenere uno storico delle classificazioni AI per audit
 *  3. (futuro) alimentare una dashboard admin
 */
import { createHash } from 'node:crypto'
import { getSupabase } from '@/lib/supabase'
import type { RssItem } from './rss'
import type { SourceId } from './sources'
import type { Relevance, TriageResult } from './triage'

export function makeId(source: SourceId, item: RssItem): string {
  return createHash('sha256').update(`${source}|${item.guid}`).digest('hex').slice(0, 32)
}

export interface StoredRow {
  id: string
  source: SourceId
  title: string
  url: string
  published_at: string | null
  detected_at: string
  triage_relevance: Relevance | null
  triage_impacts_site: boolean
  triage_summary: string | null
  triage_affected_pages: string[] | null
  triage_deadline: string | null
  triage_normative_refs: string | null
  triage_error: string | null
  notified: boolean
  notified_at: string | null
}

/** Diagnostica strutturata di un errore (cattura `.cause` di TypeError native fetch). */
function describeError(err: unknown): string {
  if (err instanceof Error) {
    const cause = (err as Error & { cause?: unknown }).cause
    const causeStr =
      cause instanceof Error
        ? `${cause.name}: ${cause.message}`
        : cause
        ? String(cause)
        : null
    return causeStr ? `${err.name}: ${err.message} | cause=${causeStr}` : `${err.name}: ${err.message}`
  }
  return String(err)
}

/** Esegue `op` e, se throw, ritenta una volta dopo 1.5s. Logga `.cause` su fallimento. */
async function runWithRetry<T>(label: string, op: () => Promise<T>): Promise<T> {
  try {
    return await op()
  } catch (err) {
    console.warn(`[ivass-watcher] ${label} primo tentativo fallito:`, describeError(err))
    await new Promise((r) => setTimeout(r, 1500))
    return await op()
  }
}

/** Restituisce gli `id` già presenti in DB tra quelli passati. */
export async function getKnownIds(ids: string[]): Promise<Set<string>> {
  const supa = getSupabase()
  if (!supa || ids.length === 0) return new Set()
  try {
    const result = await runWithRetry('getKnownIds', async () =>
      supa.from('ivass_watcher_state').select('id').in('id', ids),
    )
    if (result.error) {
      console.error('[ivass-watcher] getKnownIds error:', result.error.message)
      return new Set()
    }
    return new Set((result.data ?? []).map((r: { id: string }) => r.id))
  } catch (err) {
    console.error('[ivass-watcher] getKnownIds threw:', describeError(err))
    return new Set()
  }
}

export interface InsertPayload {
  id: string
  source: SourceId
  item: RssItem
  triage: (TriageResult & { error?: string }) | null
  notified: boolean
}

/** Inserisce in batch i nuovi item rilevati. */
export async function insertRows(rows: InsertPayload[]): Promise<{ inserted: number; error?: string }> {
  const supa = getSupabase()
  if (!supa) return { inserted: 0, error: 'Supabase non configurato (env mancante)' }
  if (rows.length === 0) return { inserted: 0 }

  const now = new Date().toISOString()
  const payload = rows.map((r) => ({
    id: r.id,
    source: r.source,
    title: r.item.title,
    url: r.item.link,
    published_at: r.item.pubDate ? r.item.pubDate.toISOString() : null,
    detected_at: now,
    triage_relevance: r.triage?.relevance ?? null,
    triage_impacts_site: r.triage?.impactsSite ?? false,
    triage_summary: r.triage?.summary ?? null,
    triage_affected_pages: r.triage?.affectedPages ?? null,
    triage_deadline: r.triage?.deadline ?? null,
    triage_normative_refs: r.triage?.normativeRefs ?? null,
    triage_error: r.triage?.error ?? null,
    notified: r.notified,
    notified_at: r.notified ? now : null,
  }))

  try {
    const result = await runWithRetry('insertRows', async () =>
      supa.from('ivass_watcher_state').insert(payload, { count: 'exact' }),
    )
    if (result.error) {
      console.error('[ivass-watcher] insertRows postgrest error:', result.error.message)
      return { inserted: 0, error: `postgrest: ${result.error.message}` }
    }
    return { inserted: result.count ?? rows.length }
  } catch (err) {
    const detail = describeError(err)
    console.error('[ivass-watcher] insertRows threw:', detail)
    return { inserted: 0, error: detail }
  }
}
