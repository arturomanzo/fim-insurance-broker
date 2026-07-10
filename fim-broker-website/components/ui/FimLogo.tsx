/**
 * FimLogo — riproduce il logo ufficiale FIM Insurance Broker in SVG.
 * Scudo Blu Profondo con F stilizzata bianca e chevron Verde Sicurezza.
 *
 * Props:
 *  variant: 'full' (scudo + wordmark) | 'icon' (solo scudo)
 *  theme:   'color' | 'white' (per sfondi scuri) | 'dark'
 *  height:  altezza px (default 48)
 */

interface FimLogoProps {
  variant?: 'full' | 'icon'
  theme?: 'color' | 'white' | 'dark'
  height?: number
  className?: string
}

export default function FimLogo({
  variant = 'full',
  theme = 'color',
  height = 48,
  className,
}: FimLogoProps) {
  const isWhite = theme === 'white'

  const shieldColor = isWhite ? '#ffffff' : '#0B1F3A'
  const chevronColor = isWhite ? '#4aba83' : '#2FA36B'
  const fColor = isWhite ? '#0B1F3A' : '#ffffff'
  const textColor = isWhite ? '#ffffff' : '#0B1F3A'
  const subColor = isWhite ? '#2FA36B' : '#2FA36B'

  const iconSVG = (
    <svg
      width={height}
      height={height}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FIM Insurance Broker"
      role="img"
    >
      {/* Chevron verde in cima */}
      <path
        d="M50,0 L78,18 L50,12 L22,18 Z"
        fill={chevronColor}
      />
      {/* Scudo */}
      <path
        d="M15,22 L15,65 C15,82 50,105 50,105 C50,105 85,82 85,65 L85,22 L50,14 Z"
        fill={shieldColor}
        stroke={isWhite ? 'none' : shieldColor}
        strokeWidth="1"
      />
      {/* Bordo interno scudo (leggero rilievo) */}
      <path
        d="M20,26 L20,63 C20,78 50,98 50,98 C50,98 80,78 80,63 L80,26 L50,19 Z"
        fill="none"
        stroke={isWhite ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}
        strokeWidth="1.5"
      />
      {/* F stilizzata — monogramma ufficiale (gancio + braccio), da LOGO.svg */}
      <path d="M 70.93,48.43 C 70.92,47.00 70.59,46.35 69.02,46.35 C 59.37,46.40 49.72,46.36 40.06,46.39 C 38.07,46.40 36.34,47.17 35.49,49.09 C 34.87,50.51 33.83,51.16 32.42,51.49 C 30.69,51.89 29.09,52.80 27.30,52.91 C 25.41,46.94 30.41,39.40 36.89,38.30 C 38.02,38.11 39.18,38.03 40.33,38.03 C 51.78,38.00 63.23,38.00 74.68,38.00 Z" fill={fColor} />
      <path d="M 30.93,77.49 C 30.13,78.00 29.72,77.57 29.36,77.10 C 28.16,75.49 26.97,73.87 25.78,72.24 C 25.36,71.68 25.32,71.07 25.51,70.40 C 26.19,68.06 26.78,65.69 27.53,63.37 C 28.79,59.46 31.64,57.27 35.60,56.88 C 42.33,56.23 49.10,56.71 55.85,56.59 C 57.09,56.57 57.46,57.16 57.28,58.37 C 56.62,62.79 53.86,65.26 49.34,65.31 C 45.75,65.35 42.15,65.34 38.56,65.31 C 36.47,65.30 35.21,66.19 34.75,68.31 C 34.04,71.54 33.33,74.79 30.93,77.49 Z" fill={fColor} />
    </svg>
  )

  if (variant === 'icon') return iconSVG

  const fullWidth = Math.round(height * 3.8)
  return (
    <svg
      width={fullWidth}
      height={height}
      viewBox="0 0 380 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FIM Insurance Broker"
      role="img"
    >
      {/* ── Icona ── */}
      <path d="M50,0 L78,18 L50,12 L22,18 Z" fill={chevronColor} />
      <path
        d="M15,22 L15,65 C15,82 50,105 50,105 C50,105 85,82 85,65 L85,22 L50,14 Z"
        fill={shieldColor}
      />
      <path
        d="M20,26 L20,63 C20,78 50,98 50,98 C50,98 80,78 80,63 L80,26 L50,19 Z"
        fill="none"
        stroke={isWhite ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}
        strokeWidth="1.5"
      />
      {/* F stilizzata — monogramma ufficiale (gancio + braccio), da LOGO.svg */}
      <path d="M 70.93,48.43 C 70.92,47.00 70.59,46.35 69.02,46.35 C 59.37,46.40 49.72,46.36 40.06,46.39 C 38.07,46.40 36.34,47.17 35.49,49.09 C 34.87,50.51 33.83,51.16 32.42,51.49 C 30.69,51.89 29.09,52.80 27.30,52.91 C 25.41,46.94 30.41,39.40 36.89,38.30 C 38.02,38.11 39.18,38.03 40.33,38.03 C 51.78,38.00 63.23,38.00 74.68,38.00 Z" fill={fColor} />
      <path d="M 30.93,77.49 C 30.13,78.00 29.72,77.57 29.36,77.10 C 28.16,75.49 26.97,73.87 25.78,72.24 C 25.36,71.68 25.32,71.07 25.51,70.40 C 26.19,68.06 26.78,65.69 27.53,63.37 C 28.79,59.46 31.64,57.27 35.60,56.88 C 42.33,56.23 49.10,56.71 55.85,56.59 C 57.09,56.57 57.46,57.16 57.28,58.37 C 56.62,62.79 53.86,65.26 49.34,65.31 C 45.75,65.35 42.15,65.34 38.56,65.31 C 36.47,65.30 35.21,66.19 34.75,68.31 C 34.04,71.54 33.33,74.79 30.93,77.49 Z" fill={fColor} />

      {/* ── Wordmark ── */}
      <text
        x="110" y="70"
        fontFamily="'Montserrat','Arial Black','Helvetica Neue',sans-serif"
        fontWeight="900"
        fontSize="60"
        fill={textColor}
        letterSpacing="2"
      >
        FIM
      </text>
      <text
        x="113" y="93"
        fontFamily="'Montserrat','Arial','Helvetica Neue',sans-serif"
        fontWeight="700"
        fontSize="14"
        fill={subColor}
        letterSpacing="5"
      >
        INSURANCE BROKER
      </text>
    </svg>
  )
}
