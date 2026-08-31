/**
 * Newsletter mensile — GET /api/cron/newsletter
 *
 * Prepara la bozza del mese e manda l'anteprima ad Arturo. **Non spedisce
 * niente agli iscritti**: quello lo fa /api/newsletter/invia, dopo
 * l'approvazione.
 *
 * Su Vercel Hobby i cron sono due e sono presi (ivass-watcher e
 * daily-maintenance), quindi questo gira dentro il dispatcher giornaliero e si
 * ferma da solo nei giorni che non sono il primo del mese. `?force=1` salta il
 * controllo sulla data per le prove a mano.
 *
 * Protezione: Bearer ${CRON_SECRET}.
 */
import { NextRequest, NextResponse } from 'next/server'
import { preparaBozza, inviaAnteprima } from '@/lib/newsletterInvio'

const CRON_SECRET = process.env.CRON_SECRET

export const maxDuration = 60

export async function GET(req: NextRequest) {
  if (!CRON_SECRET) {
    console.error('[cron newsletter] CRON_SECRET non configurato — endpoint disabilitato')
    return NextResponse.json({ error: 'Cron non configurato' }, { status: 503 })
  }
  if ((req.headers.get('authorization') ?? '') !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const force = req.nextUrl.searchParams.get('force') === '1'
  const now = new Date()
  if (!force && now.getUTCDate() !== 1) {
    return NextResponse.json({ ok: true, saltato: 'non è il primo del mese' })
  }

  try {
    const esito = await preparaBozza(now)

    if (esito.stato !== 'bozza-pronta') {
      console.log('[cron newsletter]', esito.stato, esito.periodo)
      return NextResponse.json({ ok: true, ...esito })
    }

    await inviaAnteprima(esito.bozza, esito.token)

    return NextResponse.json({
      ok: true,
      stato: 'anteprima-inviata',
      periodo: esito.bozza.periodo,
      articoli: esito.bozza.articoli,
      destinatari: esito.bozza.destinatari,
    })
  } catch (err) {
    console.error('[cron newsletter] errore:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
