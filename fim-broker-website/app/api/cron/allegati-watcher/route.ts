/**
 * Allegati Watcher — GET /api/cron/allegati-watcher
 *
 * Sorveglia i PDF ufficiali IVASS da cui deriva l'informativa precontrattuale
 * pubblicata su /trasparenza (Allegato 3 e 4 al Reg. 40/2018, testo consolidato)
 * e avvisa quando cambiano.
 *
 * Perché esiste: il watcher RSS legge le *notizie*, e un provvedimento dal
 * titolo opaco può scivolare via — è successo con il Provv. 147/2024, che ha
 * sostituito gli Allegati 3, 4, 4-bis e 4-ter con il MUP mentre il sito
 * continuava a pubblicare lo schema vecchio. Il file, invece, cambia sempre.
 *
 * Manda anche un promemoria quando l'informativa non viene riletta da più di
 * REVISIONE_MAX_MESI, così il silenzio di IVASS non diventa disattenzione.
 *
 * Non ha un cron proprio: il piano Hobby ne consente 2, entrambi già occupati.
 * È agganciato al dispatcher `daily-maintenance` (08:00), fra i job leggeri.
 *
 * Protezione: Bearer ${CRON_SECRET}.
 *
 * Test manuale: `curl -H "Authorization: Bearer $CRON_SECRET" \
 *   https://www.fimbroker.it/api/cron/allegati-watcher`
 */
import { NextRequest, NextResponse } from 'next/server'
import { checkAllegati, markNotified } from '@/lib/ivass-watcher/allegati'
import { sendAllegatiAlert } from '@/lib/ivass-watcher/email'
import {
  REVISIONE_MAX_MESI,
  ULTIMA_REVISIONE_ISO,
  mesiDaUltimaRevisione,
} from '@/lib/compliance'

const CRON_SECRET = process.env.CRON_SECRET

// Tre download da ivass.it, il più pesante ~1,2 MB: comodamente dentro i 60s.
export const maxDuration = 60

export async function GET(req: NextRequest) {
  if (!CRON_SECRET) {
    console.error('[allegati-watcher] CRON_SECRET non configurato — endpoint disabilitato')
    return NextResponse.json({ error: 'Cron non configurato' }, { status: 503 })
  }
  const auth = req.headers.get('authorization') ?? ''
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const startedAt = Date.now()
  const checks = await checkAllegati()

  const daNotificare = checks.filter((c) => c.daNotificare)
  const errori = checks.filter((c) => c.status === 'errore')

  // Il promemoria di revisione entra nell'email solo quando la soglia è
  // superata; se ci sono già modifiche da segnalare viaggia insieme a quelle.
  const mesi = mesiDaUltimaRevisione()
  const revisioneScaduta = mesi > REVISIONE_MAX_MESI ? Math.floor(mesi) : null

  const alert = await sendAllegatiAlert(daNotificare, revisioneScaduta)

  // Solo un invio andato a buon fine chiude la partita: se l'email fallisce, i
  // documenti restano in coda e rientrano nell'alert del giorno dopo.
  if (alert.sent && daNotificare.length > 0) {
    await markNotified(daNotificare.map((c) => c.id))
  }

  const summary = {
    ok: errori.length === 0,
    at: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    ultimaRevisione: ULTIMA_REVISIONE_ISO,
    mesiDaUltimaRevisione: Number(mesi.toFixed(1)),
    revisioneScaduta: revisioneScaduta !== null,
    documenti: checks.map((c) => ({
      id: c.id,
      status: c.status,
      daNotificare: c.daNotificare,
      lastModified: c.lastModified ?? null,
      error: c.error ?? null,
    })),
    alert: { sent: alert.sent, to: alert.to ?? null, dryRun: alert.dryRun ?? false, error: alert.error ?? null },
  }

  if (daNotificare.length > 0) {
    console.warn(
      `[allegati-watcher] ${daNotificare.length} documento/i da rivedere:`,
      daNotificare.map((c) => c.id).join(', '),
    )
  }
  if (errori.length > 0) {
    console.error('[allegati-watcher] errori:', errori.map((c) => `${c.id}: ${c.error}`).join(' | '))
  }

  return NextResponse.json(summary)
}
