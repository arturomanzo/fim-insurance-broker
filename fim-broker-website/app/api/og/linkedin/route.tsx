import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

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
          <svg width="56" height="56" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lsg" x1="7" y1="97" x2="93" y2="1" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#050f1e" />
                <stop offset="50%" stopColor="#0d2945" />
                <stop offset="100%" stopColor="#2FA36B" />
              </linearGradient>
              <linearGradient id="lag" x1="55" y1="30" x2="93" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2FA36B" />
                <stop offset="100%" stopColor="#4aba83" />
              </linearGradient>
            </defs>
            <path d="M7,15 C7,5 15,1 24,1 L76,1 C85,1 93,5 93,15 L93,56 C93,78 50,97 50,97 C50,97 7,78 7,56 Z" fill="url(#lsg)" />
            <path d="M 65.98,39.95 C 65.97,38.45 65.62,37.76 63.97,37.77 C 53.84,37.82 43.70,37.78 33.57,37.81 C 31.47,37.82 29.65,38.63 28.77,40.64 C 28.11,42.14 27.02,42.82 25.54,43.17 C 23.73,43.59 22.05,44.54 20.17,44.66 C 18.18,38.39 23.43,30.47 30.23,29.32 C 31.42,29.12 32.64,29.03 33.84,29.03 C 45.87,29.00 57.89,29.00 69.92,29.00 Z" fill="white" />
            <path d="M 23.98,70.47 C 23.14,71.00 22.70,70.55 22.33,70.06 C 21.06,68.37 19.82,66.66 18.57,64.96 C 18.13,64.36 18.08,63.73 18.29,63.03 C 19.00,60.56 19.62,58.08 20.41,55.64 C 21.72,51.54 24.72,49.23 28.88,48.83 C 35.95,48.14 43.06,48.64 50.15,48.52 C 51.44,48.50 51.83,49.12 51.64,50.39 C 50.95,55.03 48.05,57.63 43.31,57.67 C 39.54,57.71 35.76,57.70 31.99,57.68 C 29.79,57.67 28.47,58.60 27.99,60.83 C 27.25,64.22 26.49,67.63 23.98,70.47 Z" fill="white" />
            <polygon points="66,1 93,1 93,28" fill="url(#lag)" />
            <polygon points="50,28 59,18 84,5 75,15" fill="url(#lag)" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '30px', letterSpacing: '-1px', lineHeight: '1' }}>
              FIM
            </span>
            <span style={{ color: '#2FA36B', fontWeight: '600', fontSize: '12px', letterSpacing: '4px', marginTop: '2px' }}>
              INSURANCE BROKER
            </span>
          </div>
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
