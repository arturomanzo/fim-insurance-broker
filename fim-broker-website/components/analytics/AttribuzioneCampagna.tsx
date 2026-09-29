'use client'

import { useEffect } from 'react'
import { CONSENT_UPDATED_EVENT } from '@/lib/consent'
import { aggiornaConsenso, registraArrivo } from '@/lib/campagnaBrowser'

// Registra da quale campagna arriva il visitatore (lib/campagnaBrowser.ts).
// Montato nel root layout: il primo render della sessione è la pagina d'arrivo.
export default function AttribuzioneCampagna() {
  useEffect(() => {
    registraArrivo()
    window.addEventListener(CONSENT_UPDATED_EVENT, aggiornaConsenso)
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, aggiornaConsenso)
  }, [])

  return null
}
