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
  const fStroke = isWhite ? 'none' : 'none'
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
      {/* F stilizzata */}
      <path
        d="M35,36 L35,80 L44,80 L44,62 L62,62 L62,54 L44,54 L44,44 L65,44 L65,36 Z"
        fill={fColor}
        stroke={fStroke}
      />
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
      <path
        d="M35,36 L35,80 L44,80 L44,62 L62,62 L62,54 L44,54 L44,44 L65,44 L65,36 Z"
        fill={fColor}
      />

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
