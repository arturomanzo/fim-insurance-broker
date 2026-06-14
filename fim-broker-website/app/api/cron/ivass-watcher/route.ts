/**
 * IVASS Watcher — GET /api/cron/ivass-watcher
 *
 * Cron giornaliero (Vercel Cron, vedi vercel.json).
 * 1. Fetcha tutte le fonti RSS configurate in `lib/ivass-watcher/sources.ts`
 * 2. Filtra item già visti (Supabase) e applica pre-filter keyword
 * 3. Triage AI di ogni item nuovo con Claude Haiku 4.5
 * 4. Invia digest email se ci sono item con relevance high/medium
 * 5. Persiste TUTTI gli item nuovi (anche low/none) in Supabase per audit
 *
 * Protezione: Bearer ${CRON_SECRET}.
 *
 * Test manuale: `curl -H "Authorization: Bearer $CRON_SECRET" \
 *   https://www.fimbroker.it/api/cron/ivass-watcher`
 */
import { NextRequest, NextResponse } from 'next/server'
import { SOURCES, type Source } from '@/lib/ivass-watcher/sources'
import { fetchFeed, type RssItem } from '@/lib/ivass-watcher/rss'
import { triageItem } from '@/lib/ivass-watcher/triage'
import { getKnownIds, insertRows, getRecentRows, makeId, type InsertPayload } from '@/lib/ivass-watcher/state'
import { sendDigest, sendWeeklyHeartbeat, type DigestItem } from '@/lib/ivass-watcher/email'

const CRON_SECRET = process.env.CRON_SECRET

// Limiti di sicurezza per non sforare 60s Vercel cron e per contenere i costi Claude
const MAX_TRIAGE_PER_RUN = 30
const MAX_ITEMS_PER_SOURCE = 25

interface SourceReport {
  source: string
  fetched: number
  prefiltered: number
  new: number
  triaged: number
  high: number
  medium: number
  low: number
  none: number
  error?: string
}

function passesPrefilter(item: RssItem, source: Source): boolean {
  const haystack = `${item.title} ${item.description}`
  // Filtro negativo: scarta il rumore ricorrente prima di tutto.
  if (source.exclude && source.exclude.test(haystack)) return false
  if (!source.prefilter) return true
  return source.prefilter.test(haystack)
}

export async function GET(req: NextRequest) {
  if (!CRON_SECRET) {
    console.error('[ivass-watcher] CRON_SECRET non configurato — endpoint disabilitato')
    return NextResponse.json({ error: 'Cron non configurato' }, { status: 503 })
  }
  const auth = req.headers.get('authorization') ?? ''
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const startedAt = Date.now()
  const reports: SourceReport[] = []

  // 1. Fetch in parallelo di tutte le fonti
  const fetched = await Promise.all(
    SOURCES.map(async (s) => ({ source: s, feed: await fetchFeed(s.url, s.userAgent) })),
  )

  // 2. Per ogni fonte: filtro pre-AI + diff con DB
  const candidates: { source: Source; item: RssItem; id: string }[] = []
  for (const { source, feed } of fetched) {
    const report: SourceReport = {
      source: source.id,
      fetched: feed.items.length,
      prefiltered: 0,
      new: 0,
      triaged: 0,
      high: 0,
      medium: 0,
      low: 0,
      none: 0,
      error: feed.ok ? undefined : feed.error,
    }
    reports.push(report)
    if (!feed.ok || feed.items.length === 0) continue

    const passing = feed.items
      .slice(0, MAX_ITEMS_PER_SOURCE)
      .filter((it) => passesPrefilter(it, source))
    report.prefiltered = passing.length

    if (passing.length === 0) continue

    const ids = passing.map((it) => makeId(source.id, it))
    const known = await getKnownIds(ids)

    passing.forEach((item, i) => {
      const id = ids[i]
      if (!known.has(id)) {
        candidates.push({ source, item, id })
      }
    })

    report.new = candidates.filter((c) => c.source.id === source.id).length
  }

  // 3. Triage AI sequenziale (per non sovraccaricare Anthropic SDK) — cap MAX_TRIAGE_PER_RUN
  const toTriage = candidates.slice(0, MAX_TRIAGE_PER_RUN)
  const digest: DigestItem[] = []
  const inserts: InsertPayload[] = []

  for (const c of toTriage) {
    const triage = await triageItem(c.item, c.source)
    const report = reports.find((r) => r.source === c.source.id)
    if (report) {
      report.triaged++
      report[triage.relevance]++
    }

    const shouldNotify = triage.relevance === 'high' || triage.relevance === 'medium'
    if (shouldNotify) {
      digest.push({ source: c.source, item: c.item, triage })
    }
    inserts.push({
      id: c.id,
      source: c.source.id,
      item: c.item,
      triage,
      notified: shouldNotify, // segniamo notified=true subito, viene confermato dalla mail
    })
  }

  // I candidati oltre il cap vengono inseriti senza triage (verranno presi al prossimo giro)
  for (const c of candidates.slice(MAX_TRIAGE_PER_RUN)) {
    inserts.push({ id: c.id, source: c.source.id, item: c.item, triage: null, notified: false })
  }

  // 4. Email digest (solo se ci sono item rilevanti)
  const mail = await sendDigest(digest)

  // 5. Persist
  const insertResult = await insertRows(inserts)

  // 6. Heartbeat settimanale (lunedì): riepilogo di audit anche se è tutto tranquillo,
  //    così il watcher non è mai silenzioso. Legge il DB DOPO l'insert odierno.
  let heartbeat = null
  if (new Date().getUTCDay() === 1) {
    heartbeat = await sendWeeklyHeartbeat(await getRecentRows(7))
  }

  const elapsedMs = Date.now() - startedAt
  return NextResponse.json({
    ok: true,
    at: new Date().toISOString(),
    elapsedMs,
    sources: reports,
    candidates: candidates.length,
    triaged: toTriage.length,
    digestItems: digest.length,
    email: mail,
    heartbeat,
    db: insertResult,
  })
}
