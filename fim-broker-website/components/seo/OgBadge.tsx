// Il badge delle immagini di anteprima (/api/og e /opengraph-image), che il
// motore di next/og disegna con regole sue: un <div> con più figli vuole
// display: flex, e un carattere che i font di sistema non hanno lo va a
// scaricare da Google. Col "✓" quel download rispondeva 400 (errore in
// produzione da giugno 2026): qui la spunta è un SVG.

export const OG_BADGES = ['Broker indipendente', '20 compagnie partner', 'Preventivo gratuito'] as const

interface OgBadgeProps {
  testo: string
  fontSize?: number
}

export default function OgBadge({ testo, fontSize = 15 }: OgBadgeProps) {
  const lato = Math.round(fontSize * 1.1)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '24px',
        padding: '8px 20px',
        color: 'rgba(255,255,255,0.8)',
        fontSize: `${fontSize}px`,
        fontWeight: '600',
      }}
    >
      <svg width={lato} height={lato} viewBox="0 0 24 24">
        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#2FA36B" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{testo}</span>
    </div>
  )
}
