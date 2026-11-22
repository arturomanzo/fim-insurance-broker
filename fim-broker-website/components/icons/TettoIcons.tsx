import { clsx } from 'clsx'
import type { Forma } from '@/lib/icone'

/*
 * «Sotto il tetto»: il set di icone FIM.
 * - sopra c'è il tetto del logo in geometria pulita: simmetrico, bordi dritti, fianchi verticali
 * - sotto, un solo oggetto pieno, del colore del testo: le forme stanno in lib/icone.ts
 * - un taglio obliquo per oggetto, come nei terminali della F
 * - sotto i 24px il tetto sparisce e l'oggetto si allarga: in piccolo si mangiavano a vicenda
 * - niente fondini, tondini o contorni sottili: il contenitore è il tetto
 * - il tetto non si aggiunge allo scudo né alla F: il logo resta solo in FimLogo
 */

export interface IconaProps {
  forma: Forma
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

/** Un'icona del set. Decorativa: il significato sta sempre nel testo accanto. */
export function Icona({ forma, size = 24, className }: IconaProps) {
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
      {forma.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
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
