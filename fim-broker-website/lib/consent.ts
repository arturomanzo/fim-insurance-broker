/**
 * Helper condivisi per il consenso cookie.
 *
 * Fonte di verità del consenso: `localStorage['fim-cookie-consent']`, scritto da
 * components/ui/CookieBanner.tsx nella forma descritta da `StoredConsent`.
 *
 * Le due finalità sono INDIPENDENTI, come richiedono le Linee guida del Garante
 * (10 giugno 2021): il consenso deve essere specifico per finalità, quindi chi
 * accetta le statistiche non sta accettando la profilazione pubblicitaria.
 * - `analytics` → Google Analytics 4, Microsoft Clarity
 * - `marketing` → Meta Pixel, Meta Conversions API, Google Ads
 *
 * `choice` resta come etichetta leggibile della scelta complessiva ('all',
 * 'custom', 'essential') ed è utile in fase di audit, ma NON va usata per
 * decidere se attivare un tag: per quello esistono `hasAnalyticsConsent()` e
 * `hasMarketingConsent()`, che leggono i due flag.
 */

export const CONSENT_STORAGE_KEY = 'fim-cookie-consent'

// Evento emesso dal CookieBanner quando la scelta cambia, così i loader
// consent-aware si attivano senza ricaricare la pagina.
export const CONSENT_UPDATED_EVENT = 'fim-consent-updated'

/**
 * Versione del formato di consenso. Va incrementata ogni volta che cambia il
 * SIGNIFICATO di quanto è già salvato nei browser degli utenti: un consenso con
 * versione diversa viene ignorato e il banner torna a chiedere.
 *
 * v2 — separa `marketing` da `analytics`. Prima esisteva il solo `choice`, e il
 * pulsante "Salva preferenze" salvava 'all' (quindi anche pubblicità) a chi
 * aveva acceso il solo interruttore degli analitici. Quei consensi non sono
 * distinguibili da un "Accetta tutti" genuino, quindi vanno tutti richiesti di
 * nuovo invece di essere ereditati.
 */
export const CONSENT_VERSION = 2

export type ConsentChoice = 'all' | 'custom' | 'essential'

export interface StoredConsent {
  version: number
  choice: ConsentChoice
  analytics: boolean
  marketing: boolean
  timestamp: string
}

const VALID_CHOICES: readonly ConsentChoice[] = ['all', 'custom', 'essential']

/**
 * Legge il consenso salvato. Ritorna null se manca, se è corrotto o se è di una
 * versione precedente — in tutti e tre i casi il banner deve tornare a chiedere.
 * Safe lato server: ritorna null se non c'è `window`/`localStorage`.
 */
export function readConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const c = JSON.parse(raw)
    if (c?.version !== CONSENT_VERSION) return null
    if (!VALID_CHOICES.includes(c?.choice)) return null
    return {
      version: CONSENT_VERSION,
      choice: c.choice,
      analytics: c.analytics === true,
      marketing: c.marketing === true,
      timestamp: typeof c.timestamp === 'string' ? c.timestamp : '',
    }
  } catch {
    return null
  }
}

/** True solo con consenso MARKETING esplicito (Meta Pixel, Meta CAPI, Google Ads). */
export function hasMarketingConsent(): boolean {
  return readConsent()?.marketing === true
}

/** True solo con consenso ANALITICO esplicito (GA4, Clarity). */
export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true
}
