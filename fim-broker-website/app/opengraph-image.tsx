import { ImageResponse } from 'next/og'
import FimLogo from '@/components/ui/FimLogo'
import OgBadge, { OG_BADGES } from '@/components/seo/OgBadge'

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
        {/* Logo */}
        <div style={{ display: 'flex', marginBottom: '48px' }}>
          <FimLogo variant="full" theme="white" height={80} />
        </div>

        {/* Headline */}
        {/* Più figli in un <div>: senza display flex il motore rifiuta l'immagine */}
        <div style={{ display: 'flex', flexDirection: 'column', color: 'white', fontSize: '56px', fontWeight: '900', lineHeight: 1.1, maxWidth: '900px' }}>
          <span>Soluzioni Assicurative</span>
          <span style={{ color: '#2FA36B' }}>Personalizzate</span>
        </div>

        {/* Subline */}
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '26px', marginTop: '24px', maxWidth: '700px', lineHeight: 1.4 }}>
          Confrontiamo le offerte delle principali compagnie assicurative per trovare la polizza giusta per te.
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '24px', marginTop: '48px' }}>
          {OG_BADGES.map((badge) => (
            <OgBadge key={badge} testo={badge} fontSize={18} />
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
