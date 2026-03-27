import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = (searchParams.get('title') ?? 'FIM Insurance Broker').slice(0, 70)
  const tag = (searchParams.get('tag') ?? '').slice(0, 30)
  const sub = (searchParams.get('sub') ?? '').slice(0, 100)

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
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #0f2d6b 0%, #00b4c8 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,180,200,0.35)',
            }}
          >
            <span style={{ color: 'white', fontWeight: '900', fontSize: '28px' }}>F</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '34px', letterSpacing: '-1px', lineHeight: '1' }}>
              FIM
            </span>
            <span style={{ color: '#00b4c8', fontWeight: '600', fontSize: '13px', letterSpacing: '4px', marginTop: '2px' }}>
              INSURANCE BROKER
            </span>
          </div>
          {tag && (
            <div
              style={{
                marginLeft: '16px',
                background: 'rgba(0,180,200,0.15)',
                border: '1px solid rgba(0,180,200,0.4)',
                borderRadius: '24px',
                padding: '6px 18px',
                color: '#00b4c8',
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '1px',
              }}
            >
              {tag.toUpperCase()}
            </div>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            color: 'white',
            fontSize: title.length > 45 ? '44px' : '54px',
            fontWeight: '900',
            lineHeight: 1.1,
            maxWidth: '960px',
            letterSpacing: '-0.5px',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {sub && (
          <div
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '22px',
              marginTop: '20px',
              maxWidth: '760px',
              lineHeight: 1.4,
            }}
          >
            {sub}
          </div>
        )}

        {/* Bottom badge row */}
        <div style={{ display: 'flex', gap: '24px', marginTop: 'auto', paddingTop: '40px' }}>
          {['Broker Indipendente', '30+ Compagnie Partner', 'Preventivo Gratuito'].map((badge) => (
            <div
              key={badge}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '24px',
                padding: '8px 20px',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '15px',
                fontWeight: '600',
              }}
            >
              ✓ {badge}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: 'absolute', bottom: '40px', right: '72px', color: 'rgba(255,255,255,0.35)', fontSize: '16px' }}>
          www.fimbroker.it
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
