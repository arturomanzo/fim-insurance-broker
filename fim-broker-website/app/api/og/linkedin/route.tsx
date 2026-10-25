import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import FimLogo from '@/components/ui/FimLogo'

export const runtime = 'edge'

/**
 * Card brandizzata per i post LinkedIn della pagina aziendale.
 *
 * Formato 1200x627 (landscape LinkedIn). Pensata per il post del martedì
 * ("il fatto"), dove il numero è il protagonista: il dato grande al centro,
 * la fonte in basso per credibilità, la firma RUI sempre presente.
 *
 * Palette del brand guide FIM (non quella del tailwind del sito):
 * navy #081F3A · verde #2FA36B · oro #C8A96A · grigio #6B7280.
 *
 * Esempio:
 * /api/og/linkedin?dato=1.499&label=ricorsi in 4 mesi
 *   &title=L'Arbitro Assicurativo ha già un anno di lavoro davanti
 *   &rubrica=Il fatto&fonte=IVASS, maggio 2026
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const dato = (searchParams.get('dato') ?? '').slice(0, 12)
  const label = (searchParams.get('label') ?? '').slice(0, 60)
  const title = (searchParams.get('title') ?? 'FIM Insurance Broker').slice(0, 120)
  const rubrica = (searchParams.get('rubrica') ?? 'Il fatto').slice(0, 24)
  const fonte = (searchParams.get('fonte') ?? '').slice(0, 60)

  // Il titolo rimpicciolisce quando è lungo: senza dato ha più spazio a disposizione.
  const titleSize = dato
    ? title.length > 60
      ? '38px'
      : '46px'
    : title.length > 60
      ? '52px'
      : '64px'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #050f1e 0%, #081F3A 58%, #102c4e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '58px 72px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Riga logo + rubrica */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <FimLogo variant="full" theme="white" height={56} />
          <div
            style={{
              marginLeft: 'auto',
              background: 'rgba(200,169,106,0.12)',
              border: '1px solid rgba(200,169,106,0.45)',
              borderRadius: '24px',
              padding: '8px 22px',
              color: '#C8A96A',
              fontSize: '15px',
              fontWeight: '700',
              letterSpacing: '2px',
            }}
          >
            {rubrica.toUpperCase()}
          </div>
        </div>

        {/* Corpo: il dato fa da protagonista, il titolo lo spiega */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, paddingTop: '18px' }}>
          {dato && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '22px' }}>
              <span
                style={{
                  color: '#2FA36B',
                  fontSize: dato.length > 6 ? '112px' : '148px',
                  fontWeight: '900',
                  letterSpacing: '-4px',
                  lineHeight: '1',
                }}
              >
                {dato}
              </span>
              {label && (
                <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: '26px', fontWeight: '600', maxWidth: '520px', lineHeight: 1.25 }}>
                  {label}
                </span>
              )}
            </div>
          )}
          <div
            style={{
              color: 'white',
              fontSize: titleSize,
              fontWeight: '800',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              maxWidth: '1010px',
              marginTop: dato ? '26px' : '0',
            }}
          >
            {title}
          </div>
        </div>

        {/* Barra di chiusura: fonte a sinistra, firma RUI a destra */}
        <div style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '22px' }}>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px' }}>
            {fonte ? `Fonte: ${fonte}` : 'www.fimbroker.it'}
          </span>
          <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.35)', fontSize: '14px' }}>
            FIM Insurance Broker S.a.s. · RUI B000405449
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 627 }
  )
}
