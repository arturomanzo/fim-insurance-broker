/**
 * Punto di aggancio di Next per il codice che deve girare all'avvio del
 * server, prima di servire qualunque richiesta.
 *
 * Perché esiste: dalla v8 l'SDK Sentry non carica più da sé
 * `sentry.server.config.ts` e `sentry.edge.config.ts` — li aspetta da qui.
 * Senza questo file quei due venivano semplicemente ignorati, quindi
 * Sentry.init() non girava mai lato server: gli errori delle route API, del
 * middleware e del rendering server non arrivavano a nessuno. Il build lo
 * diceva in chiaro a ogni giro ("Could not find a Next.js instrumentation
 * file") e il messaggio scorreva via insieme al resto dell'output.
 *
 * Il monitoraggio lato browser funzionava, ed è quello che si nota: il
 * pannello Sentry non era vuoto, era pieno a metà — la metà peggiore, perché
 * gli errori server sono quelli che il visitatore non ti racconta.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

export { captureRequestError as onRequestError } from '@sentry/nextjs'
