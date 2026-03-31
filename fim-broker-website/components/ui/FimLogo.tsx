/**
 * FimLogo — riproduce il logo reale FIM Insurance Broker in SVG vettoriale.
 * Scudo con gradiente navy→teal, F stilizzata con effetto profondità, freccia diagonale.
 *
 * Props:
 *  variant: 'full' (scudo + wordmark) | 'icon' (solo scudo)
 *  theme:   'color' | 'white' (per sfondi scuri) | 'dark'
 *  height:  altezza px (default 48)
 */

import { useId } from 'react'

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
  const uid = useId().replace(/:/g, '')

  const isWhite = theme === 'white'
  const isDark  = theme === 'dark'

  // Colori testo / monochrome
  const textColor   = isWhite ? '#ffffff' : '#0f2d6b'
  const subColor    = isWhite ? '#ffffff' : isDark ? '#0f2d6b' : '#0f2d6b'

  // Gradient stops
  const gradFrom = isWhite ? '#ffffff' : isDark ? '#0f2d6b' : '#091c4a'
  const gradMid  = isWhite ? '#ffffff' : isDark ? '#0f2d6b' : '#0b4a7a'
  const gradTo   = isWhite ? '#ffffff' : isDark ? '#1a4a9e' : '#00b4c8'

  // Arrow gradient
  const arrowFrom = isWhite ? '#ffffff' : isDark ? '#1a4a9e' : '#00b4c8'
  const arrowTo   = isWhite ? '#ffffff' : isDark ? '#1a4a9e' : '#40e4f8'

  // ID univoci per evitare conflitti se il componente appare più volte
  const gShield = `fsg-${uid}`
  const gArrow  = `fag-${uid}`

  // ── ICON ONLY ──────────────────────────────────────────────────────────────
  // ViewBox 100×100: scudo largo 86px centrato, freccia che rompe l'angolo sup-dx
  const iconSVG = (
    <svg
      width={height}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FIM Insurance Broker"
      role="img"
    >
      <defs>
        <linearGradient id={gShield} x1="7" y1="97" x2="93" y2="1" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={gradFrom} />
          <stop offset="50%"  stopColor={gradMid}  />
          <stop offset="100%" stopColor={gradTo}   />
        </linearGradient>
        <linearGradient id={gArrow} x1="55" y1="30" x2="93" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={arrowFrom} />
          <stop offset="100%" stopColor={arrowTo}   />
        </linearGradient>
      </defs>

      {/* Scudo */}
      <path
        d="M7,15 C7,5 15,1 24,1 L76,1 C85,1 93,5 93,15 L93,56 C93,78 50,97 50,97 C50,97 7,78 7,56 Z"
        fill={`url(#${gShield})`}
      />

      {/* F — strato profondità (ombra) */}
      <path
        d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z"
        fill="white" opacity="0.18" transform="translate(5,4)"
      />
      {/* F — strato intermedio */}
      <path
        d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z"
        fill="white" opacity="0.35" transform="translate(2.5,2)"
      />
      {/* F — primo piano */}
      <path
        d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z"
        fill="white"
      />

      {/* Freccia: testa triangolare nell'angolo sup-dx */}
      <polygon points="66,1 93,1 93,28" fill={`url(#${gArrow})`} />
      {/* Freccia: asta diagonale */}
      <polygon points="50,28 59,18 84,5 75,15" fill={`url(#${gArrow})`} />
    </svg>
  )

  if (variant === 'icon') return iconSVG

  // ── FULL LOGO ──────────────────────────────────────────────────────────────
  // ViewBox 380×100: icona 0-100, testo da 110
  const fullWidth = Math.round(height * 3.8)
  return (
    <svg
      width={fullWidth}
      height={height}
      viewBox="0 0 380 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FIM Insurance Broker"
      role="img"
    >
      <defs>
        <linearGradient id={gShield} x1="7" y1="97" x2="93" y2="1" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={gradFrom} />
          <stop offset="50%"  stopColor={gradMid}  />
          <stop offset="100%" stopColor={gradTo}   />
        </linearGradient>
        <linearGradient id={gArrow} x1="55" y1="30" x2="93" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={arrowFrom} />
          <stop offset="100%" stopColor={arrowTo}   />
        </linearGradient>
      </defs>

      {/* ── Icona (stessi path del variant=icon, 100×100) ── */}
      <path
        d="M7,15 C7,5 15,1 24,1 L76,1 C85,1 93,5 93,15 L93,56 C93,78 50,97 50,97 C50,97 7,78 7,56 Z"
        fill={`url(#${gShield})`}
      />
      <path
        d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z"
        fill="white" opacity="0.18" transform="translate(5,4)"
      />
      <path
        d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z"
        fill="white" opacity="0.35" transform="translate(2.5,2)"
      />
      <path
        d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z"
        fill="white"
      />
      <polygon points="66,1 93,1 93,28" fill={`url(#${gArrow})`} />
      <polygon points="50,28 59,18 84,5 75,15" fill={`url(#${gArrow})`} />

      {/* ── Wordmark ── */}
      <text
        x="110" y="64"
        fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif"
        fontWeight="900"
        fontSize="58"
        fill={textColor}
        letterSpacing="1"
      >
        FIM
      </text>
      <text
        x="113" y="83"
        fontFamily="Arial,'Helvetica Neue',sans-serif"
        fontWeight="700"
        fontSize="13.5"
        fill={subColor}
        letterSpacing="4"
      >
        INSURANCE BROKER
      </text>
    </svg>
  )
}
