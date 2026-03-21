/**
 * FimLogo — componente SVG vettoriale del brand FIM Insurance Broker.
 * Riproduce fedelmente il logo: scudo con freccia (F) + wordmark "FIM INSURANCE BROKER".
 *
 * Props:
 *  - variant: 'full' (scudo + testo) | 'icon' (solo scudo) | 'wordmark' (solo testo)
 *  - theme:   'color' (gradiente navy/teal) | 'white' (tutto bianco, per sfondi scuri) | 'dark' (navy pieno)
 *  - height:  altezza in px (default 48)
 */

import { useId } from 'react'

interface FimLogoProps {
  variant?: 'full' | 'icon' | 'wordmark'
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
  // Colori per ciascun tema
  const navy = theme === 'white' ? '#ffffff' : '#0f2d6b'
  const teal = theme === 'white' ? '#ffffff' : theme === 'dark' ? '#0f2d6b' : '#00b4c8'
  const tealLight = theme === 'white' ? '#ffffff' : theme === 'dark' ? '#1a4a9e' : '#33c7d8'
  const uid = useId()
  const gradId = `fim-grad-${uid}`

  // Proporzioni: icona 1:1, full circa 3.5:1
  const iconSize = height
  const fullWidth = variant === 'icon' ? height : Math.round(height * 3.6)
  const fullHeight = height

  if (variant === 'icon') {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="FIM Insurance Broker"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={navy} />
            <stop offset="100%" stopColor={teal} />
          </linearGradient>
        </defs>
        {/* Scudo */}
        <path
          d="M50 5 L90 22 L90 52 C90 74 72 88 50 95 C28 88 10 74 10 52 L10 22 Z"
          fill={`url(#${gradId})`}
        />
        {/* F stilizzata con freccia */}
        <path
          d="M32 30 L68 30 L60 38 L44 38 L44 47 L60 47 L54 55 L44 55 L44 70 L34 70 L34 30 Z"
          fill="#ffffff"
          opacity="0.95"
        />
        {/* Punta freccia in alto a destra */}
        <path
          d="M62 22 L80 40 L70 40 L70 30 L60 30 Z"
          fill={tealLight}
          opacity="0.9"
        />
      </svg>
    )
  }

  if (variant === 'wordmark') {
    return (
      <svg
        width={Math.round(height * 2.8)}
        height={height}
        viewBox="0 0 280 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="FIM Insurance Broker"
      >
        {/* FIM */}
        <text
          x="0"
          y="54"
          fontFamily="'Arial Black', 'Arial Bold', system-ui"
          fontWeight="900"
          fontSize="52"
          fill={navy}
          letterSpacing="-1"
        >
          FIM
        </text>
        {/* INSURANCE BROKER */}
        <text
          x="2"
          y="74"
          fontFamily="'Arial', system-ui"
          fontWeight="600"
          fontSize="14"
          fill={teal}
          letterSpacing="3"
        >
          INSURANCE BROKER
        </text>
      </svg>
    )
  }

  // variant === 'full'
  return (
    <svg
      width={fullWidth}
      height={fullHeight}
      viewBox="0 0 360 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FIM Insurance Broker"
      role="img"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={navy} />
          <stop offset="100%" stopColor={teal} />
        </linearGradient>
      </defs>

      {/* ── Scudo ── */}
      <path
        d="M50 5 L90 22 L90 52 C90 74 72 88 50 95 C28 88 10 74 10 52 L10 22 Z"
        fill={`url(#${gradId})`}
      />
      {/* F stilizzata */}
      <path
        d="M32 28 L70 28 L62 37 L44 37 L44 47 L60 47 L53 55 L44 55 L44 72 L33 72 L33 28 Z"
        fill="#ffffff"
        opacity="0.95"
      />
      {/* Freccia teal in alto a destra dello scudo */}
      <path
        d="M64 20 L82 38 L73 38 L73 27 L62 27 Z"
        fill={tealLight}
        opacity="0.9"
      />

      {/* ── Wordmark ── */}
      {/* FIM */}
      <text
        x="108"
        y="62"
        fontFamily="'Arial Black', 'Arial Bold', system-ui"
        fontWeight="900"
        fontSize="54"
        fill={navy}
        letterSpacing="-1"
      >
        FIM
      </text>
      {/* INSURANCE BROKER */}
      <text
        x="110"
        y="82"
        fontFamily="'Arial', system-ui"
        fontWeight="600"
        fontSize="13"
        fill={teal}
        letterSpacing="3.5"
      >
        INSURANCE BROKER
      </text>
    </svg>
  )
}
