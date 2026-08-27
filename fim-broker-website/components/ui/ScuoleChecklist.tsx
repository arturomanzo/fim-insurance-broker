'use client'

import { useState } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { CHECKLIST_SOGLIA, DIECI_DOMANDE, SCUOLE_DOCS } from '@/lib/scuole'
import { trackScuoleChecklist } from '@/lib/analytics'

type Risposta = 'si' | 'no' | 'ns'

const OPZIONI: { value: Risposta; label: string }[] = [
  { value: 'si', label: 'Sì' },
  { value: 'no', label: 'No' },
  { value: 'ns', label: 'Non so' },
]

/**
 * Le dieci domande del check-up, in versione interattiva.
 *
 * Nessun dato lascia il browser: è un autotest, non un form. Conta i punti
 * aperti (le risposte "no" e "non so") e, sopra la soglia, rimanda al
 * check-up gratuito. Il PDF con le stesse domande resta scaricabile.
 */
export default function ScuoleChecklist() {
  const [risposte, setRisposte] = useState<Record<number, Risposta>>({})
  const [tracciato, setTracciato] = useState(false)

  const dateCount = Object.keys(risposte).length
  const completa = dateCount === DIECI_DOMANDE.length
  const puntiAperti = Object.values(risposte).filter((r) => r !== 'si').length

  function rispondi(i: number, value: Risposta) {
    const next = { ...risposte, [i]: value }
    setRisposte(next)
    if (!tracciato && Object.keys(next).length === DIECI_DOMANDE.length) {
      setTracciato(true)
      trackScuoleChecklist(Object.values(next).filter((r) => r !== 'si').length)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <ol className="divide-y divide-gray-100">
        {DIECI_DOMANDE.map((domanda, i) => {
          const scelta = risposte[i]
          return (
            <li key={i} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-start gap-4 flex-1">
                <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <p id={`scuole-domanda-${i}`} className="text-gray-800 leading-relaxed">
                  {domanda}
                </p>
              </div>
              <div
                role="radiogroup"
                aria-labelledby={`scuole-domanda-${i}`}
                className="flex gap-2 md:flex-shrink-0 md:ml-4 pl-12 md:pl-0"
              >
                {OPZIONI.map((o) => {
                  const attivo = scelta === o.value
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="radio"
                      aria-checked={attivo}
                      onClick={() => rispondi(i, o.value)}
                      className={clsx(
                        'px-4 py-2 rounded-lg text-sm font-semibold border transition-colors',
                        attivo && o.value === 'si' && 'bg-accent text-white border-accent',
                        attivo && o.value !== 'si' && 'bg-primary text-white border-primary',
                        !attivo && 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary',
                      )}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="bg-gray-50 border-t border-gray-200 p-5 md:p-6" aria-live="polite">
        {!completa ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-600">
              Risposte date: <strong className="text-primary">{dateCount}</strong> su {DIECI_DOMANDE.length}.
              Segnate le risposte come le dareste oggi, senza andare a cercare la polizza.
            </p>
            <a href={SCUOLE_DOCS.dieciDomande.href} className="text-sm font-semibold text-primary hover:underline whitespace-nowrap">
              Preferite la versione PDF →
            </a>
          </div>
        ) : puntiAperti >= CHECKLIST_SOGLIA ? (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-black text-primary text-lg">
                {puntiAperti} {puntiAperti === 1 ? 'punto aperto' : 'punti aperti'} su {DIECI_DOMANDE.length}. Vale la pena parlarne.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Non è un problema di chi gestisce la scuola: le polizze scolastiche si stratificano anno dopo anno e nessuno le
                rilegge tutte insieme. Mandateci quelle in corso e vi consegniamo una lettura scritta.
              </p>
            </div>
            <Link href="#check-up" className="btn-primary whitespace-nowrap">
              Richiedi il check-up gratuito
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-black text-primary text-lg">
                {puntiAperti === 0 ? 'Sapete rispondere a tutto: siete a posto.' : `${puntiAperti} ${puntiAperti === 1 ? 'punto aperto' : 'punti aperti'} su ${DIECI_DOMANDE.length}: la situazione è sotto controllo.`}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Se volete comunque una lettura scritta delle polizze in corso, il check-up resta gratuito e senza impegno.
              </p>
            </div>
            <Link href="#check-up" className="btn-secondary whitespace-nowrap">
              Richiedi comunque il check-up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
