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
          {/* Shield SVG */}
          <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="osg" x1="7" y1="97" x2="93" y2="1" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#091c4a" />
                <stop offset="50%" stopColor="#0b4a7a" />
                <stop offset="100%" stopColor="#00b4c8" />
              </linearGradient>
              <linearGradient id="oag" x1="55" y1="30" x2="93" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00b4c8" />
                <stop offset="100%" stopColor="#40e4f8" />
              </linearGradient>
            </defs>
            <path d="M7,15 C7,5 15,1 24,1 L76,1 C85,1 93,5 93,15 L93,56 C93,78 50,97 50,97 C50,97 7,78 7,56 Z" fill="url(#osg)" />
            <path d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z" fill="white" fillOpacity="0.25" transform="translate(5,4)" />
            <path d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z" fill="white" />
            <polygon points="66,1 93,1 93,28" fill="url(#oag)" />
            <polygon points="50,28 59,18 84,5 75,15" fill="url(#oag)" />
          </svg>
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
