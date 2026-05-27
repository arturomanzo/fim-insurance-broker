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

/** Restituisce gli `id` già presenti in DB tra quelli passati. */
export async function getKnownIds(ids: string[]): Promise<Set<string>> {
  const supa = getSupabase()
  if (!supa || ids.length === 0) return new Set()
  const { data, error } = await supa
    .from('ivass_watcher_state')
    .select('id')
    .in('id', ids)
  if (error) {
    console.error('[ivass-watcher] getKnownIds error:', error.message)
    return new Set()
  }
  return new Set((data ?? []).map((r) => r.id as string))
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
  if (!supa) return { inserted: 0, error: 'Supabase non configurato' }
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

  const { error, count } = await supa
    .from('ivass_watcher_state')
    .insert(payload, { count: 'exact' })

  if (error) {
    console.error('[ivass-watcher] insertRows error:', error.message)
    return { inserted: 0, error: error.message }
  }
  return { inserted: count ?? rows.length }
}
