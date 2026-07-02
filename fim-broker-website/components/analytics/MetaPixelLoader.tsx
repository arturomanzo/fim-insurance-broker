'use client'

import { useEffect } from 'react'

// Meta Pixel (Facebook/Instagram) — tag PUBBLICITARIO. Come Microsoft Clarity,
// installa cookie di tracciamento e richiede CONSENSO PREVENTIVO (Linee guida
// del Garante / GDPR). Per questo NON viene caricato nel root layout: parte SOLO
// quando l'utente ha prestato il consenso MARKETING (choice === 'all') tramite
// il CookieBanner. Il banner emette l'evento 'fim-consent-updated' alla scelta
// dell'utente, così il Pixel parte subito dopo il consenso senza ricaricare.
// Finché non c'è consenso marketing, NESSUNA chiamata verso Meta viene fatta
// (nessun <noscript> fallback, che tracerebbe a prescindere dal consenso).
//
// L'ID del dataset è pubblico (finisce comunque nel JS lato client), quindi è
// hard-coded come per GTM_ID in app/layout.tsx. Dataset Meta: "FIM Broker".

const META_PIXEL_ID = '1271502811523830'

// Stub tipizzato di fbq, coerente con lo snippet ufficiale del Meta Pixel:
// finché fbevents.js non è caricato, le chiamate finiscono in `queue`; dopo il
// caricamento Meta popola `callMethod` e la coda viene svuotata.
type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  push: Fbq
  loaded: boolean
  version: string
}

type FbqWindow = Window & {
  fbq?: Fbq
  _fbq?: Fbq
}

function hasMarketingConsent(): boolean {
  try {
    const raw = localStorage.getItem('fim-cookie-consent')
    if (!raw) return false
    const c = JSON.parse(raw)
    // Marketing/ad_storage = consenso pieno ("all"). Il solo consenso analitico
    // NON abilita il Pixel pubblicitario.
    return c?.choice === 'all'
  } catch {
    return false
  }
}

function loadPixel(id: string) {
  const w = window as FbqWindow
  if (w.fbq) return // già caricato: evita doppio inserimento

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  }) as Fbq
  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.push = fbq
  w.fbq = fbq
  if (!w._fbq) w._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  w.fbq('init', id)
  w.fbq('track', 'PageView')
}

export default function MetaPixelLoader() {
  useEffect(() => {
    if (hasMarketingConsent()) {
      loadPixel(META_PIXEL_ID)
      return
    }

    const onConsent = () => {
      if (hasMarketingConsent()) loadPixel(META_PIXEL_ID)
    }
    window.addEventListener('fim-consent-updated', onConsent)
    return () => window.removeEventListener('fim-consent-updated', onConsent)
  }, [])

  return null
}
