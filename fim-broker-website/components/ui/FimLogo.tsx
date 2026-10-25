/**
 * FimLogo — logo ufficiale FIM Insurance Broker in SVG (tracciati in lib/logo.ts).
 * Scudo a contorno blu con F stilizzata e tetto verde, wordmark FIM + INSURANCE BROKER.
 *
 * Props:
 *  variant: 'full' (scudo + wordmark) | 'icon' (solo scudo)
 *  theme:   'color' | 'white' (per sfondi scuri: blu -> bianco, il verde resta) | 'dark'
 *  height:  altezza px (default 48); la larghezza segue le proporzioni del logo
 */

import {
  LOGO_COLORS,
  LOGO_PATH_FIM,
  LOGO_PATH_ROOF,
  LOGO_PATH_SHIELD,
  LOGO_PATH_SUB,
  LOGO_VIEWBOX_FULL,
  LOGO_VIEWBOX_ICON,
  viewBoxString,
} from '@/lib/logo'

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
  const navy = theme === 'white' ? '#ffffff' : LOGO_COLORS.navy
  const green = LOGO_COLORS.green
  const vb = variant === 'icon' ? LOGO_VIEWBOX_ICON : LOGO_VIEWBOX_FULL

  return (
    <svg
      width={Math.round((height * vb.width) / vb.height)}
      height={height}
      viewBox={viewBoxString(vb)}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FIM Insurance Broker"
      role="img"
    >
      <path d={LOGO_PATH_SHIELD} fill={navy} />
      <path d={LOGO_PATH_ROOF} fill={green} />
      {variant === 'full' && <path d={LOGO_PATH_FIM} fill={navy} />}
      {variant === 'full' && <path d={LOGO_PATH_SUB} fill={green} />}
    </svg>
  )
}
