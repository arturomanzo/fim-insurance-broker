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

  // Replay: cattura il 5% delle sessioni normali, 100% degli errori
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,

  // Non registra errori in sviluppo locale
  enabled: process.env.NODE_ENV === 'production',

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})

// Segnala a Sentry le transizioni di rotta, per legare gli errori alla
// navigazione che li ha preceduti.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
