'use client'

import { useEffect } from 'react'

// Microsoft Clarity (heatmap + session recording) installa cookie e registra
// la sessione: secondo le Linee guida del Garante richiede CONSENSO PREVENTIVO.
// Per questo NON viene caricato nel root layout come <Script>, ma qui, solo
// quando l'utente ha prestato il consenso analitico tramite il CookieBanner.
// Il banner emette l'evento 'fim-consent-updated' alla scelta dell'utente:
// così Clarity parte subito dopo il consenso, senza bisogno di ricaricare.

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

type ClarityWindow = Window & {
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }
}

function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem('fim-cookie-consent')
    if (!raw) return false
    const c = JSON.parse(raw)
    return c?.choice === 'all' || c?.analytics === true
  } catch {
    return false
  }
}

function loadClarity(id: string) {
  const w = window as ClarityWindow
  if (w.clarity) return // già caricato: evita doppio inserimento

  const queue: unknown[] = []
  const stub = (...args: unknown[]) => {
    queue.push(args)
  }
  stub.q = queue
  w.clarity = stub

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.clarity.ms/tag/' + id
  document.head.appendChild(script)
}

export default function ClarityLoader() {
  useEffect(() => {
    if (!CLARITY_ID) return

    if (hasAnalyticsConsent()) {
      loadClarity(CLARITY_ID)
      return
    }

    const onConsent = () => {
      if (hasAnalyticsConsent()) loadClarity(CLARITY_ID)
    }
    window.addEventListener('fim-consent-updated', onConsent)
    return () => window.removeEventListener('fim-consent-updated', onConsent)
  }, [])

  return null
}
