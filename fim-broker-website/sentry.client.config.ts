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
