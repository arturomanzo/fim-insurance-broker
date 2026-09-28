/**
 * Rimanda al gestionale le lead rimaste in coda — GET /api/cron/coda-lead
 *
 * Non sta nei cron di Vercel: il piano Hobby ne concede due, giornalieri, e
 * sono già usati. Lo chiama n8n sul VPS ogni dieci minuti, e in più il giro di
 * daily-maintenance delle 8. Vedi lib/codaLead.ts.
 *
 * Protezione: Bearer ${CRON_SECRET}.
 */
import { NextRequest, NextResponse } from 'next/server'
import { svuotaCodaLead } from '@/lib/codaLead'

const CRON_SECRET = process.env.CRON_SECRET

export const maxDuration = 60

export async function GET(req: NextRequest) {
  if (!CRON_SECRET) {
    console.error('[cron coda-lead] CRON_SECRET non configurato — endpoint disabilitato')
    return NextResponse.json({ error: 'Cron non configurato' }, { status: 503 })
  }
  if ((req.headers.get('authorization') ?? '') !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const esito = await svuotaCodaLead()
  // 503 se la coda non si può leggere: chi chiama deve accorgersene.
  const status = !esito.redis || esito.errore ? 503 : 200
  return NextResponse.json({ ok: status === 200, at: new Date().toISOString(), ...esito }, { status })
}
