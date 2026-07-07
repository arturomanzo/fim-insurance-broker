/**
 * Helper condivisi per il consenso cookie/marketing.
 *
 * Fonte di verità del consenso: `localStorage['fim-cookie-consent']`, scritto da
 * components/ui/CookieBanner.tsx nella forma `{ choice, analytics, timestamp }`.
 * - choice === 'all'      → consenso pieno (analitici + marketing/pubblicità)
 * - choice === 'essential'→ solo cookie tecnici (nessun tag pubblicitario)
 *
 * Usato da MetaPixelLoader (carica il Pixel solo con consenso marketing) e dai
 * form di lead (per decidere se inviare l'evento alla Conversions API).
 */

export const CONSENT_STORAGE_KEY = 'fim-cookie-consent'

// Evento emesso dal CookieBanner quando la scelta cambia, così i loader
// consent-aware si attivano senza ricaricare la pagina.
export const CONSENT_UPDATED_EVENT = 'fim-consent-updated'

/**
 * True solo se l'utente ha prestato il consenso MARKETING pieno (`choice === 'all'`).
 * Il solo consenso analitico NON abilita i tag pubblicitari (Meta Pixel/CAPI).
 * Safe lato server: ritorna false se non c'è `window`/`localStorage`.
 */
export function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return false
    const c = JSON.parse(raw)
    return c?.choice === 'all'
  } catch {
    return false
  }
}
