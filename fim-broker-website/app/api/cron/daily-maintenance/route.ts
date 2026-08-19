/**
 * Daily maintenance dispatcher — GET /api/cron/daily-maintenance
 *
 * Vercel Hobby consente max 2 cron job. Per non sforare il limite, questo
 * dispatcher accorpa i job giornalieri "leggeri" in una sola invocazione:
 *   1. cleanup-documenti  → retention GDPR del bucket preventivi (veloce)
 *   2. reminder-rinnovi   → email promemoria scadenza polizze (leggero, dataset mock)
 *   3. allegati-watcher   → hash dei PDF IVASS sorvegliati (3 download, nessuna AI)
 *
 * Il job pesante `ivass-watcher` (fino a 30 triage Claude in sequenza) resta su
 * un cron separato per non sommare il suo budget tempo a questi.
 *
 * I singoli handler restano invariati e individualmente invocabili (test manuale):
 * questo dispatcher li richiama con una richiesta interna autorizzata via Bearer.
 *
 * Protezione: Bearer ${CRON_SECRET}.
 */
import { NextRequest, NextResponse } from 'next/server'
import { GET as cleanupDocumenti } from '../cleanup-documenti/route'
import { GET as reminderRinnovi } from '../reminder-rinnovi/route'
import { GET as allegatiWatcher } from '../allegati-watcher/route'

const CRON_SECRET = process.env.CRON_SECRET

// I job leggeri stanno comodamente nei 60s; l'ordine mette prima quello veloce.
export const maxDuration = 60

type Job = { name: string; fn: (req: NextRequest) => Promise<Response> }

const JOBS: Job[] = [
  { name: 'cleanup-documenti', fn: cleanupDocumenti },
  { name: 'reminder-rinnovi', fn: reminderRinnovi },
  { name: 'allegati-watcher', fn: allegatiWatcher },
]

export async function GET(req: NextRequest) {
  if (!CRON_SECRET) {
    console.error('[cron daily-maintenance] CRON_SECRET non configurato — endpoint disabilitato')
    return NextResponse.json({ error: 'Cron non configurato' }, { status: 503 })
  }
  const auth = req.headers.get('authorization') ?? ''
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Richiesta interna autorizzata da inoltrare ai singoli handler.
  const internal = new NextRequest(req.nextUrl, {
    headers: { authorization: `Bearer ${CRON_SECRET}` },
  })

  const results: Record<string, { status: number; body?: unknown; error?: string }> = {}
  for (const job of JOBS) {
    try {
      const res = await job.fn(internal)
      const body = await res.json().catch(() => null)
      results[job.name] = { status: res.status, body }
    } catch (err) {
      console.error(`[cron daily-maintenance] ${job.name} fallito:`, err)
      results[job.name] = { status: 500, error: err instanceof Error ? err.message : String(err) }
    }
  }

  return NextResponse.json({ ok: true, at: new Date().toISOString(), results })
}
