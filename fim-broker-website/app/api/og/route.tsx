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
          background: 'linear-gradient(135deg, #060f1d 0%, #0B1F3A 60%, #132d52 100%)',
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
            <path d="M 65.98,39.95 C 65.97,38.45 65.62,37.76 63.97,37.77 C 53.84,37.82 43.70,37.78 33.57,37.81 C 31.47,37.82 29.65,38.63 28.77,40.64 C 28.11,42.14 27.02,42.82 25.54,43.17 C 23.73,43.59 22.05,44.54 20.17,44.66 C 18.18,38.39 23.43,30.47 30.23,29.32 C 31.42,29.12 32.64,29.03 33.84,29.03 C 45.87,29.00 57.89,29.00 69.92,29.00 Z" fill="white" fillOpacity="0.25" transform="translate(3,3)" />
            <path d="M 23.98,70.47 C 23.14,71.00 22.70,70.55 22.33,70.06 C 21.06,68.37 19.82,66.66 18.57,64.96 C 18.13,64.36 18.08,63.73 18.29,63.03 C 19.00,60.56 19.62,58.08 20.41,55.64 C 21.72,51.54 24.72,49.23 28.88,48.83 C 35.95,48.14 43.06,48.64 50.15,48.52 C 51.44,48.50 51.83,49.12 51.64,50.39 C 50.95,55.03 48.05,57.63 43.31,57.67 C 39.54,57.71 35.76,57.70 31.99,57.68 C 29.79,57.67 28.47,58.60 27.99,60.83 C 27.25,64.22 26.49,67.63 23.98,70.47 Z" fill="white" fillOpacity="0.25" transform="translate(3,3)" />
            <path d="M 65.98,39.95 C 65.97,38.45 65.62,37.76 63.97,37.77 C 53.84,37.82 43.70,37.78 33.57,37.81 C 31.47,37.82 29.65,38.63 28.77,40.64 C 28.11,42.14 27.02,42.82 25.54,43.17 C 23.73,43.59 22.05,44.54 20.17,44.66 C 18.18,38.39 23.43,30.47 30.23,29.32 C 31.42,29.12 32.64,29.03 33.84,29.03 C 45.87,29.00 57.89,29.00 69.92,29.00 Z" fill="white" />
            <path d="M 23.98,70.47 C 23.14,71.00 22.70,70.55 22.33,70.06 C 21.06,68.37 19.82,66.66 18.57,64.96 C 18.13,64.36 18.08,63.73 18.29,63.03 C 19.00,60.56 19.62,58.08 20.41,55.64 C 21.72,51.54 24.72,49.23 28.88,48.83 C 35.95,48.14 43.06,48.64 50.15,48.52 C 51.44,48.50 51.83,49.12 51.64,50.39 C 50.95,55.03 48.05,57.63 43.31,57.67 C 39.54,57.71 35.76,57.70 31.99,57.68 C 29.79,57.67 28.47,58.60 27.99,60.83 C 27.25,64.22 26.49,67.63 23.98,70.47 Z" fill="white" />
            <polygon points="66,1 93,1 93,28" fill="url(#oag)" />
            <polygon points="50,28 59,18 84,5 75,15" fill="url(#oag)" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '34px', letterSpacing: '-1px', lineHeight: '1' }}>
              FIM
            </span>
            <span style={{ color: '#2FA36B', fontWeight: '600', fontSize: '13px', letterSpacing: '4px', marginTop: '2px' }}>
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
                color: '#2FA36B',
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
