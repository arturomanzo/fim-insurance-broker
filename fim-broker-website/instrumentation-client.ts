/**
 * Init di Sentry lato browser.
 *
 * Si chiamava `sentry.client.config.ts`. Con Turbopack quel nome non viene
 * piu' letto, e il monitoraggio del browser si sarebbe spento in silenzio al
 * primo build che passa a Turbopack — lo stesso genere di guasto muto che
 * l'audit ha gia' trovato due volte su questo sito.
 */
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Campiona il 10% delle transazioni di performance in produzione
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Niente Session Replay (01/11/2026): da solo era la parte più pesante del
  // JavaScript della home. Con Lighthouse mobile la home stava a 53 di
  // performance, con il thread principale bloccato per circa 3 secondi, e
  // quasi tutto veniva dai chunk di Sentry. Gli errori continuano ad arrivare
  // con stack, pagina e navigazione; manca solo la registrazione della
  // sessione. Se un giorno serve, va caricata dopo l'interazione e non al load.

  // Non registra errori in sviluppo locale
  enabled: process.env.NODE_ENV === 'production',
})

// Segnala a Sentry le transizioni di rotta, per legare gli errori alla
// navigazione che li ha preceduti.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
