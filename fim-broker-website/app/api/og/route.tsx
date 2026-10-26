import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import FimLogo from '@/components/ui/FimLogo'
import OgBadge, { OG_BADGES } from '@/components/seo/OgBadge'

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
          <FimLogo variant="full" theme="white" height={64} />
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
          {OG_BADGES.map((badge) => (
            <OgBadge key={badge} testo={badge} />
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
