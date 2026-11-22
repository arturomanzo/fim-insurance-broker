import type { ReactNode } from 'react'
import { clsx } from 'clsx'

/*
 * «Sotto il tetto»: il set di icone FIM.
 * - sopra c'è sempre il tetto vero del logo, con il suo lato staccato: non si ridisegna
 * - sotto, un solo oggetto pieno, del colore del testo, tra y=8 e y=23
 * - un taglio obliquo per oggetto, come nei terminali della F
 * - sotto i 24px il tetto sparisce e l'oggetto si allarga: in piccolo si mangiavano a vicenda
 * - niente fondini, tondini o contorni sottili: il contenitore è il tetto
 * - il tetto non si aggiunge allo scudo né alla F: il logo resta solo in FimLogo
 */

export interface TettoIconProps {
  className?: string
  size?: number
}

/*
 * Il tracciato del tetto pesa 3 KB: sta in un file solo e si richiama, scritto dentro
 * ogni icona gonfiava la pagina di 65 KB. Che resti uguale al logo lo controlla
 * `lib/tetto.test.ts`.
 */
const TETTO = '/images/brand/tetto.svg#tetto'

/** Porta il tetto dalle coordinate del logo (10-215) alla griglia 24 */
const TETTO_IN_GRIGLIA = 'translate(1 .3) scale(.1073) translate(-10 -10)'

function SottoIlTetto({ className, size = 24, children }: TettoIconProps & { children: ReactNode }) {
  const conTetto = size >= 24
  return (
    <svg
      width={size}
      height={size}
      viewBox={conTetto ? '0 0 24 24' : '2.5 6.5 19 17'}
      fill="currentColor"
      fillRule="evenodd"
      className={clsx('flex-shrink-0', className)}
      aria-hidden="true"
      data-icona=""
    >
      {conTetto && <use href={TETTO} transform={TETTO_IN_GRIGLIA} className="text-accent" />}
      {children}
    </svg>
  )
}

/** RC professionale: la borsa da lavoro al riparo */
export function TettoLavoro(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M8.5 12V9.7A1.7 1.7 0 0 1 10.2 8h3.6a1.7 1.7 0 0 1 1.7 1.7V12h-2v-2h-3v2Z" />
      <path d="M5 11.5h14a1.5 1.5 0 0 1 1.5 1.5v3h-17v-3A1.5 1.5 0 0 1 5 11.5ZM3.5 17.5h17v2L17 23H5a1.5 1.5 0 0 1-1.5-1.5Z" />
    </SottoIlTetto>
  )
}

/** Dati personali: lucchetto */
export function TettoDati(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M7.5 14v-2a4.5 4.5 0 0 1 9 0v2h-2.2v-2a2.3 2.3 0 0 0-4.6 0v2Z" />
      <path d="M5 13.5h14v6.5l-3 3H5ZM12 15.5a1.6 1.6 0 0 0-.9 2.9V21h1.8v-2.6a1.6 1.6 0 0 0-.9-2.9Z" />
    </SottoIlTetto>
  )
}

/** Regole: documento con l'angolo tagliato e la spunta */
export function TettoRegole(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M5.5 8h9.5l3.5 3.5V23h-13ZM8 16l1.5-1.5 1.8 1.8 3.7-3.8 1.5 1.5-5.2 5.3Z" />
    </SottoIlTetto>
  )
}

/** Analisi: i numeri, tagliati in obliquo */
export function TettoAnalisi(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M11 7.5a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM7.2 17.5h2v-3h-2ZM10 17.5h2v-6.7h-2ZM12.8 17.5h2v-4.7h-2Z" />
      <path d="m16.8 18.6 4.4 3-1.7 1.9-4.2-3.3Z" />
    </SottoIlTetto>
  )
}

/** Guida: bussola */
export function TettoGuida(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M12 7.6a7.8 7.8 0 1 0 0 15.6 7.8 7.8 0 0 0 0-15.6ZM12 9.8a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2Z" />
      <path d="m16.2 11.2-2.4 6-6 2.4 2.4-6ZM12 14.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </SottoIlTetto>
  )
}

/** Strategia: la bandiera del traguardo */
export function TettoStrategia(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M4 7.5h2.8V23H4ZM8 8h13l-3.5 4.5L21 17H8Z" />
    </SottoIlTetto>
  )
}

/** Indipendenza: bilancia */
export function TettoBilancia(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M11 7.5h2v2h8v2h-8V21h4l-2 2H7v-2h4v-9.5H3v-2h8Z" />
      <path d="m5.5 12-3.7 5.5a3.7 3.2 0 0 0 7.4 0ZM18.5 12l-3.7 5.5a3.7 3.2 0 0 0 7.4 0ZM5.5 14.3l1.8 2.7H3.7ZM18.5 14.3l1.8 2.7h-3.6Z" />
    </SottoIlTetto>
  )
}

/** Documento da scaricare */
export function TettoScarica(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M10.3 7.5h3.4V13h3.8L12 19l-5.5-6h3.8ZM4 18h2.5v2.8h11V18H20v2.5L17.5 23H4Z" />
    </SottoIlTetto>
  )
}

/**
 * Cappello di un riquadro a forma di casa: tetto del logo e sommità navy parallela.
 * Va appoggiato sopra un blocco `bg-primary` largo uguale.
 */
export function CappelloTetto({ className }: { className?: string }) {
  return (
    <svg viewBox="10 9 205.5 76" className={clsx('block h-auto w-full', className)} aria-hidden="true">
      <use href={TETTO} className="fill-accent" />
      <path d="M10 81 115 45 215.5 79V86H10Z" className="fill-primary" />
    </svg>
  )
}
