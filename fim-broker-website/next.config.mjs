/** @type {import('next').NextConfig} */

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
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://maps.gstatic.com https://www.google-analytics.com https://images.unsplash.com",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net",
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

const nextConfig = {
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
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
