'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  readConsent,
  type ConsentChoice,
  type StoredConsent,
} from '@/lib/consent'

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
 * Aggiorna il Consent Mode v2 di Google in base alle due finalità.
 * Chiamato dopo che l'utente ha cliccato un pulsante del banner.
 * GTM e tutti i tag al suo interno (GA4, Google Ads) leggono questo stato
 * per decidere se collezionare dati pubblicitari/analitici.
 *
 * Gli storage pubblicitari seguono `marketingGranted` e NON la scelta
 * complessiva: chi accende i soli analitici non deve finire profilato.
 */
function updateGtagConsent(analyticsGranted: boolean, marketingGranted: boolean) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    ad_storage: marketingGranted ? 'granted' : 'denied',
    ad_user_data: marketingGranted ? 'granted' : 'denied',
    ad_personalization: marketingGranted ? 'granted' : 'denied',
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
  })
}

/** Etichetta della scelta complessiva, derivata dalle due finalità. */
function choiceFrom(analytics: boolean, marketing: boolean): ConsentChoice {
  if (analytics && marketing) return 'all'
  if (!analytics && !marketing) return 'essential'
  return 'custom'
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
  // Default: tutto ciò che non è necessario parte DISATTIVO — i cookie non
  // tecnici richiedono opt-in esplicito (Linee guida Garante 2021).
  const [analyticsChecked, setAnalyticsChecked] = useState(false)
  const [marketingChecked, setMarketingChecked] = useState(false)
  const firstButtonRef = useRef<HTMLButtonElement>(null)

  /**
   * Salva le due finalità in modo indipendente. Ogni pulsante del banner passa
   * esplicitamente i due valori: non si deducono mai l'uno dall'altro, così
   * "solo analitici" non può più tradursi in consenso pubblicitario.
   */
  const saveConsent = useCallback((analytics: boolean, marketing: boolean) => {
    const payload: StoredConsent = {
      version: CONSENT_VERSION,
      choice: choiceFrom(analytics, marketing),
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload))
    // Propaga la scelta al Consent Mode v2 di Google (GA4 + Google Ads in GTM)
    updateGtagConsent(analytics, marketing)
    // Notifica i loader consent-aware (Meta Pixel, Microsoft Clarity)
    notifyConsentUpdated()
    setVisible(false)
  }, [])

  useEffect(() => {
    // readConsent() ritorna null anche per i consensi di versione precedente:
    // quelli non sono ereditabili e il banner torna a chiedere.
    if (!readConsent()) {
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
      // Pre-popola i toggle con la scelta salvata, se presente. Se manca o è
      // di una versione superata si riparte dai default (tutto disattivo).
      const saved = readConsent()
      setAnalyticsChecked(saved?.analytics === true)
      setMarketingChecked(saved?.marketing === true)
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
      // Chiudere senza scegliere equivale a rifiutare: solo cookie tecnici.
      saveConsent(false, false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [visible, saveConsent])

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
            Usiamo cookie tecnici per far funzionare il sito, cookie analitici per capire come viene
            usato e cookie di profilazione per misurare le nostre campagne pubblicitarie. Le ultime
            due cose sono separate: puoi accettarne una e rifiutare l&apos;altra da
            &ldquo;Personalizza&rdquo;.{' '}
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
                    Google Analytics (IP anonimizzato) e Microsoft Clarity per statistiche
                    aggregate di navigazione. Non servono a mostrarti pubblicità.
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

              {/* Cookie di marketing / profilazione — finalità distinta dagli
                  analitici: va accettata a parte (consenso specifico). */}
              <div className="flex items-start justify-between gap-4 pt-3 border-t border-gray-200">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Cookie di marketing e profilazione</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Meta Pixel e Conversions API (Facebook/Instagram) e Google Ads, per misurare le
                    nostre campagne e mostrarti annunci pertinenti. Con il tuo consenso, i dati di
                    contatto che ci lasci in un modulo vengono inviati a Meta in forma cifrata per
                    collegare la richiesta all&apos;annuncio da cui arrivi.
                  </p>
                </div>
                <button
                  onClick={() => setMarketingChecked(!marketingChecked)}
                  className={`flex-shrink-0 mt-0.5 relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 ${
                    marketingChecked ? 'bg-accent' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={marketingChecked}
                  aria-label="Cookie di marketing e profilazione"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      marketingChecked ? 'translate-x-5' : 'translate-x-0'
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
              onClick={() => saveConsent(true, true)}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Accetta tutti
            </button>
            <button
              onClick={() => saveConsent(false, false)}
              className="btn-secondary text-sm px-5 py-2.5"
            >
              Solo necessari
            </button>
            {showDetails ? (
              <button
                onClick={() => saveConsent(analyticsChecked, marketingChecked)}
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
