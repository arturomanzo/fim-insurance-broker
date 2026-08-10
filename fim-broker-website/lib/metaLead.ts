import { hasMarketingConsent } from '@/lib/consent'

/**
 * Campi che ogni form di lead allega al proprio POST per far arrivare la
 * conversione anche alla Conversions API server-side (lib/metaCapi.ts).
 *
 * Il Pixel browser e il server inviano lo STESSO `event_id`: Meta deduplica i
 * due invii e conta un solo Lead. Il server recupera le conversioni che il
 * browser perde (adblock, iOS/Safari ITP, cookie mancanti) e alza il match
 * quality con i dati utente hashati.
 *
 * GDPR: `marketingConsent` replica lato server lo stesso gate del Pixel, cioè
 * il flag `marketing` di lib/consent.ts — indipendente da quello analitico, che
 * da solo non autorizza la profilazione. Senza quel consenso il route non invia
 * nulla a Meta.
 */

/** event_id univoco per la deduplica Meta (Pixel browser + CAPI server). */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export interface MetaLeadFields {
  eventId: string
  eventSourceUrl?: string
  marketingConsent: boolean
}

/**
 * Genera i campi Meta da allegare al payload del form. Da chiamare al submit
 * (non al mount): l'event_id deve essere quello dell'invio andato a buon fine.
 */
export function metaLeadFields(): MetaLeadFields {
  return {
    eventId: newEventId(),
    eventSourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    marketingConsent: hasMarketingConsent(),
  }
}
