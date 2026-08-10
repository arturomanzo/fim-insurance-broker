'use client'

import { useEffect } from 'react'
import { hasMarketingConsent, CONSENT_UPDATED_EVENT } from '@/lib/consent'

// Meta Pixel (Facebook/Instagram) — tag PUBBLICITARIO. Come Microsoft Clarity,
// installa cookie di tracciamento e richiede CONSENSO PREVENTIVO (Linee guida
// del Garante / GDPR). Per questo NON viene caricato nel root layout: parte SOLO
// col consenso MARKETING, cioè il flag `marketing` di lib/consent.ts letto da
// `hasMarketingConsent()`. Marketing e analitici sono finalità separate: chi
// accetta le sole statistiche NON sta accettando la profilazione, quindi qui non
// si guarda mai `choice`. Il banner emette l'evento 'fim-consent-updated' alla
// scelta dell'utente, così il Pixel parte subito dopo il consenso senza ricaricare.
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
    window.addEventListener(CONSENT_UPDATED_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onConsent)
  }, [])

  return null
}
