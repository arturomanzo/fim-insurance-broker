import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FIM Insurance Broker — Soluzioni Assicurative Personalizzate'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #060f1d 0%, #0B1F3A 60%, #132d52 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px' }}>
          {/* Shield SVG — Satori supports basic svg elements */}
          <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="osg" x1="7" y1="97" x2="93" y2="1" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#060f1d" />
                <stop offset="50%" stopColor="#0d2945" />
                <stop offset="100%" stopColor="#2FA36B" />
              </linearGradient>
              <linearGradient id="oag" x1="55" y1="30" x2="93" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2FA36B" />
                <stop offset="100%" stopColor="#4aba83" />
              </linearGradient>
            </defs>
            <path d="M7,15 C7,5 15,1 24,1 L76,1 C85,1 93,5 93,15 L93,56 C93,78 50,97 50,97 C50,97 7,78 7,56 Z" fill="url(#osg)" />
            <path d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z" fill="white" fillOpacity="0.25" transform="translate(5,4)" />
            <path d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z" fill="white" />
            <polygon points="66,1 93,1 93,28" fill="url(#oag)" />
            <polygon points="50,28 59,18 84,5 75,15" fill="url(#oag)" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '42px', letterSpacing: '-1px', lineHeight: 1 }}>
              FIM
            </span>
            <span style={{ color: '#2FA36B', fontWeight: '600', fontSize: '16px', letterSpacing: '4px', marginTop: '4px' }}>
              INSURANCE BROKER
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ color: 'white', fontSize: '56px', fontWeight: '900', lineHeight: 1.1, maxWidth: '900px' }}>
          Soluzioni Assicurative
          <br />
          <span style={{ color: '#2FA36B' }}>Personalizzate</span>
        </div>

        {/* Subline */}
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '26px', marginTop: '24px', maxWidth: '700px', lineHeight: 1.4 }}>
          Confrontiamo le offerte delle principali compagnie assicurative per trovare la polizza perfetta per te.
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '32px', marginTop: '48px' }}>
          {['20+ anni', 'Clienti soddisfatti', 'Preventivo gratuito'].map((badge) => (
            <div
              key={badge}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '32px',
                padding: '10px 24px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              ✓ {badge}
            </div>
          ))}
        </div>

        {/* Website */}
        <div style={{ position: 'absolute', bottom: '48px', right: '80px', color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>
          www.fimbroker.it
        </div>
      </div>
    ),
    { ...size }
  )
}
