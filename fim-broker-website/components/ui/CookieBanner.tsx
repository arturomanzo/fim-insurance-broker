'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type ConsentChoice = 'all' | 'essential' | null

// Estensione type-safe del global window per gtag (Consent Mode v2).
// Il default consent ("denied") e l'inizializzazione di gtag avvengono
// nello <script> inline in app/layout.tsx (CONSENT_INIT_SCRIPT).
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/**
 * Aggiorna il Consent Mode v2 di Google in base alla scelta dell'utente.
 * Chiamato dopo che l'utente ha cliccato un pulsante del banner.
 * GTM e tutti i tag al suo interno (GA4, Google Ads) leggono questo stato
 * per decidere se collezionare dati pubblicitari/analitici.
 */
function updateGtagConsent(choice: ConsentChoice, analyticsGranted: boolean) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const allGranted = choice === 'all'
  window.gtag('consent', 'update', {
    ad_storage: allGranted ? 'granted' : 'denied',
    ad_user_data: allGranted ? 'granted' : 'denied',
    ad_personalization: allGranted ? 'granted' : 'denied',
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
  })
}

// Notifica i loader consent-aware (es. Microsoft Clarity) che la scelta
// dell'utente è cambiata, così possono attivarsi senza ricaricare la pagina.
function notifyConsentUpdated() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event('fim-consent-updated'))
}

// Evento con cui altri componenti (es. il link "Preferenze cookie" nel
// footer) chiedono di riaprire il banner per modificare/revocare il consenso.
export const OPEN_COOKIE_PREFERENCES_EVENT = 'fim-open-cookie-preferences'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  // Default: cookie analitici DISATTIVI (i non necessari richiedono opt-in
  // esplicito, Linee guida Garante 2021).
  const [analyticsChecked, setAnalyticsChecked] = useState(false)
  const firstButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const consent = localStorage.getItem('fim-cookie-consent')
    if (!consent) {
      // Leggero delay per non bloccare il LCP
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  // Riapertura del banner su richiesta (link "Preferenze cookie" nel footer):
  // consente di modificare o revocare il consenso in qualsiasi momento, con la
  // stessa facilità con cui è stato prestato (requisito Garante / GDPR).
  useEffect(() => {
    const handleOpen = () => {
      // Pre-popola i toggle con la scelta salvata, se presente
      try {
        const raw = localStorage.getItem('fim-cookie-consent')
        if (raw) {
          const c = JSON.parse(raw)
          setAnalyticsChecked(c?.choice === 'all' || c?.analytics === true)
        }
      } catch {
        // ignora JSON corrotto: si riparte dai default
      }
      setShowDetails(true)
      setVisible(true)
    }
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpen)
  }, [])

  useEffect(() => {
    if (!visible) return
    firstButtonRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      localStorage.setItem('fim-cookie-consent', JSON.stringify({
        choice: 'essential', analytics: false, timestamp: new Date().toISOString(),
      }))
      updateGtagConsent('essential', false)
      notifyConsentUpdated()
      setVisible(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [visible])

  const saveConsent = (choice: ConsentChoice) => {
    const analytics =
      choice === 'all' ? true : choice === 'essential' ? false : analyticsChecked
    localStorage.setItem('fim-cookie-consent', JSON.stringify({
      choice,
      analytics,
      timestamp: new Date().toISOString(),
    }))
    // Propaga la scelta al Consent Mode v2 di Google (GA4 + Google Ads in GTM)
    updateGtagConsent(choice, analytics)
    // Notifica i loader consent-aware (Microsoft Clarity)
    notifyConsentUpdated()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 animate-slide-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="gradient-primary px-6 py-4 flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🍪</span>
          <h2 className="text-white font-bold text-lg" id="cookie-banner-title">Preferenze Cookie</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Utilizziamo i cookie per migliorare la tua esperienza di navigazione, analizzare il
            traffico e personalizzare i contenuti. Puoi scegliere quali cookie accettare.{' '}
            <Link href="/cookie-policy" className="text-primary hover:underline font-medium">
              Leggi la Cookie Policy
            </Link>
          </p>

          {/* Dettagli espandibili */}
          {showDetails && (
            <div className="mb-5 space-y-3 border border-gray-200 rounded-xl p-4 bg-gray-50">
              {/* Cookie tecnici — sempre attivi */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Cookie tecnici necessari</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Essenziali per il funzionamento del sito. Non possono essere disabilitati.
                  </p>
                </div>
                <div className="flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                    Sempre attivi
                  </span>
                </div>
              </div>

              {/* Cookie analitici */}
              <div className="flex items-start justify-between gap-4 pt-3 border-t border-gray-200">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Cookie analitici</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Google Analytics (IP anonimizzato) per statistiche aggregate di navigazione.
                  </p>
                </div>
                <button
                  onClick={() => setAnalyticsChecked(!analyticsChecked)}
                  className={`flex-shrink-0 mt-0.5 relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 ${
                    analyticsChecked ? 'bg-accent' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={analyticsChecked}
                  aria-label="Cookie analitici"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      analyticsChecked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Azioni */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              ref={firstButtonRef}
              onClick={() => saveConsent('all')}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Accetta tutti
            </button>
            <button
              onClick={() => saveConsent('essential')}
              className="btn-secondary text-sm px-5 py-2.5"
            >
              Solo necessari
            </button>
            {showDetails ? (
              <button
                onClick={() => saveConsent(analyticsChecked ? 'all' : 'essential')}
                className="text-sm text-primary font-semibold hover:underline"
              >
                Salva preferenze
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                Personalizza →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
