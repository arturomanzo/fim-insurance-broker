import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const securityHeaders = [
  // Previene MIME sniffing sul Content-Type dichiarato
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Blocca l'incorporazione in iframe esterni (anti-clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

  // Disabilita il pre-fetch DNS automatico del browser
  { key: 'X-DNS-Prefetch-Control', value: 'off' },

  // Controlla le informazioni di referrer verso pagine esterne
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Isola il browsing context: impedisce attacchi cross-window (Spectre, XS-Leaks)
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },

  // Impedisce che risorse di questo sito vengano caricate da origini esterne
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },

  // Forza HTTPS per 2 anni (ignorato in HTTP locale)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // Disabilita funzionalità browser non necessarie e API di tracciamento
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'interest-cohort=()',   // blocca FLoC
      'browsing-topics=()',   // blocca Topics API
      'display-capture=()',
      'autoplay=()',
      'clipboard-write=(self)',
      'fullscreen=(self)',
      'picture-in-picture=()',
      'sync-xhr=()',
    ].join(', '),
  },

  // Content Security Policy
  // - unsafe-inline su script-src: richiesto da Next.js (idratazione React) e Google Tag Manager
  // - googletagmanager.com: Google Analytics 4
  // - maps.google.com + www.google.com in frame-src: Google Maps embed
  // - fonts.googleapis.com + fonts.gstatic.com: Google Fonts
  // - google-analytics.com + doubleclick.net in connect-src: beaconing GA4
  // - *.sentry.io + *.ingest.sentry.io: error reporting
  // - www.clarity.ms + c.bing.com: Microsoft Clarity heatmaps
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://maps.gstatic.com https://www.google-analytics.com https://images.unsplash.com https://www.clarity.ms",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://*.sentry.io https://*.ingest.sentry.io https://www.clarity.ms",
      "frame-src 'self' https://maps.google.com https://www.google.com",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/photo-*',
      },
    ],
  },
  async headers() {
    return [
      {
        // Applica gli header di sicurezza a tutte le route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  // Token per upload delle source maps (opzionale ma raccomandato)
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Org e project Sentry
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Non mostrare output verboso durante la build
  silent: true,

  // Disabilita telemetria verso Sentry durante la build
  telemetry: false,

  // Upload source maps solo in produzione
  sourcemaps: {
    disable: process.env.NODE_ENV !== 'production',
  },

  // Tunnel Sentry tramite il proprio dominio per bypassare ad-blocker
  tunnelRoute: '/monitoring',
})
