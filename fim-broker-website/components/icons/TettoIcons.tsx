import type { ReactNode } from 'react'
import { clsx } from 'clsx'

/*
 * «Sotto il tetto»: il set di icone FIM.
 * - sopra c'è il tetto del logo in geometria pulita: simmetrico, bordi dritti, fianchi verticali
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
 * Il tetto si disegna qui con sei punti, NON si copia da `LOGO_PATH_ROOF`: quello è un
 * ricalco a 88 curve, che ingrandito ondeggia, e a sinistra ha il taglio dell'innesto
 * nello scudo, che staccato dallo scudo sembra un errore.
 * Dal logo vengono le proporzioni: largo 206, spesso 23, pendenza 0,3364 (34,65 su 103).
 */
const TETTO = 'M0 34.65 103 0 206 34.65V57.65L103 23 0 57.65Z'

/** La sommità navy del riquadro: stessi fianchi e stessa pendenza, 13 sotto il verde */
const SOMMITA = 'M0 70.65 103 36 206 70.65V76H0Z'

/** Porta il tetto (largo 206) alla griglia 24 */
const TETTO_IN_GRIGLIA = 'translate(1 .3) scale(.1068)'

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
      {conTetto && <path d={TETTO} transform={TETTO_IN_GRIGLIA} className="text-accent" />}
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
      <path d="m16.9 17.1 4.6 4.2-1.9 1.9-4.6-4.2Z" />
    </SottoIlTetto>
  )
}

/** Guida: bussola */
export function TettoGuida(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M12 7.6a7.8 7.8 0 1 0 0 15.6 7.8 7.8 0 0 0 0-15.6ZM12 9.8a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2Z" />
      <path d="m15.4 12-1.8 5-5 1.8 1.8-5ZM12 14.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </SottoIlTetto>
  )
}

/** Strategia: la bandiera del traguardo */
export function TettoStrategia(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M4.5 7.5h2.8V23H4.5ZM7.3 8h12.2L16 12.5l3.5 4.5H7.3Z" />
    </SottoIlTetto>
  )
}

/** Indipendenza: bilancia */
export function TettoBilancia(props: TettoIconProps) {
  return (
    <SottoIlTetto {...props}>
      <path d="M11 7.5h2v2h7.5v2H13V21h3l2 2H6l2-2h3v-9.5H3.5v-2H11Z" />
      <path d="m5.5 11.2-3.7 6.1a3.7 3.2 0 0 0 7.4 0ZM18.5 11.2l-3.7 6.1a3.7 3.2 0 0 0 7.4 0ZM5.5 14l1.9 3.1H3.6ZM18.5 14l1.9 3.1h-3.8Z" />
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
    <svg viewBox="0 0 206 76" className={clsx('block h-auto w-full', className)} aria-hidden="true">
      <path d={TETTO} className="fill-accent" />
      <path d={SOMMITA} className="fill-primary" />
    </svg>
  )
}
