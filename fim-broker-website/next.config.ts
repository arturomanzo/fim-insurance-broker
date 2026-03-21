import type { NextConfig } from 'next'

const securityHeaders = [
  // Impedisce al browser di fare MIME sniffing sul Content-Type dichiarato
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Blocca l'incorporazione del sito in iframe esterni (anti-clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Controlla le informazioni di referrer inviate alle pagine esterne
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disabilita funzionalità browser non necessarie per un sito assicurativo
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  // Forza HTTPS per 2 anni (attivo solo in produzione, ignorato in HTTP locale)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Content Security Policy
  // - unsafe-inline su script-src: richiesto da Next.js (idratazione) e JSON-LD inline
  // - fonts.googleapis.com / fonts.gstatic.com: Google Fonts caricato via CSS @import
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Aggiungi qui eventuali domini esterni per immagini remote
    // remotePatterns: [],
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

export default nextConfig
