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
          background: 'linear-gradient(135deg, #091d47 0%, #0f2d6b 60%, #1a4a9e 100%)',
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
          {/* Shield icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #0f2d6b 0%, #00b4c8 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0,180,200,0.3)',
            }}
          >
            <span style={{ color: 'white', fontWeight: '900', fontSize: '32px' }}>F</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '42px', letterSpacing: '-1px', lineHeight: 1 }}>
              FIM
            </span>
            <span style={{ color: '#00b4c8', fontWeight: '600', fontSize: '16px', letterSpacing: '4px', marginTop: '4px' }}>
              INSURANCE BROKER
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ color: 'white', fontSize: '56px', fontWeight: '900', lineHeight: 1.1, maxWidth: '900px' }}>
          Soluzioni Assicurative
          <br />
          <span style={{ color: '#00b4c8' }}>Personalizzate</span>
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
