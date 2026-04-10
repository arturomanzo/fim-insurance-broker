/**
 * Wrapper GA4 per eventi di funnel e lead attribution.
 * Chiama sempre gtag() in modo safe (undefined se non caricato).
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void
}

function track(eventName: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof gtag === 'undefined') return
  gtag('event', eventName, params)
}

// ── Funnel preventivo ────────────────────────────────────────────────────────

/** Utente seleziona il profilo (step 1 → 2) */
export function trackPreventivoStep1(profile: string) {
  track('preventivo_step1_profile', { profile })
}

/** Utente seleziona la copertura (step 2 → 3) */
export function trackPreventivoStep2(profile: string, copertura: string) {
  track('preventivo_step2_coverage', { profile, copertura })
}

/** Form preventivo inviato con successo */
export function trackPreventivoSubmit(profile: string, copertura: string, utmSource?: string) {
  track('generate_lead', {
    event_category: 'preventivo',
    profile,
    copertura,
    utm_source: utmSource ?? '(direct)',
  })
}

/** Form preventivo — errore di invio */
export function trackPreventivoError() {
  track('preventivo_submit_error')
}

// ── Funnel contatto ──────────────────────────────────────────────────────────

/** Form contatto inviato */
export function trackContactSubmit(utmSource?: string) {
  track('generate_lead', {
    event_category: 'contact',
    utm_source: utmSource ?? '(direct)',
  })
}

// ── Funnel prenotazione ──────────────────────────────────────────────────────

/** Form prenotazione consulenza inviato */
export function trackPrenotazioneSubmit(servizio: string, utmSource?: string) {
  track('generate_lead', {
    event_category: 'prenotazione',
    servizio,
    utm_source: utmSource ?? '(direct)',
  })
}

// ── Funnel collabora con noi ─────────────────────────────────────────────────

/** Form candidatura collabora inviato */
export function trackCollaboraSubmit(profilo: string, utmSource?: string) {
  track('generate_lead', {
    event_category: 'collabora',
    profilo,
    utm_source: utmSource ?? '(direct)',
  })
}

// ── Abbandono funnel ─────────────────────────────────────────────────────────

/**
 * Registra abbandono del funnel preventivo (utente esce senza completare).
 * Chiamare su beforeunload o visibilitychange.
 */
export function trackPreventivoAbandonment(step: number, profile: string | null) {
  track('preventivo_abandoned', { step, profile: profile ?? 'none' })
}
