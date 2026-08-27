/**
 * Wrapper GA4 per eventi di funnel e lead attribution.
 * Chiama sempre gtag() in modo safe (undefined se non caricato).
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void
  interface Window {
    // Meta Pixel: definito SOLO dopo il consenso marketing (vedi
    // components/analytics/MetaPixelLoader.tsx).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void
    // Coda di Google Tag Manager (GTM-T4LC5GFD). Viene inizializzata dallo
    // script inline di app/layout.tsx prima che GTM carichi, quindi qui esiste
    // sempre; il fallback `|| []` resta per sicurezza.
    dataLayer?: unknown[]
  }
}

// ── Google Ads: conversioni dal sito ─────────────────────────────────────────
//
// Google Ads (AW-18034188310) è configurato dentro GTM, non con un tag proprio
// nel layout. Il modo affidabile per farlo scattare è un push esplicito sul
// dataLayer: le chiamate `gtag('event', ...)` finiscono sì nella coda, ma come
// array di argomenti, che i trigger "Evento personalizzato" di GTM non leggono
// in modo pulito. Quindi ogni lead spinge anche un evento nominato.
//
// GDPR: qui non serve nessun gate. Il push in sé non scrive cookie e non parla
// con Google; è il tag dentro GTM a farlo, ed è governato dal Consent Mode v2
// impostato in app/layout.tsx (`ad_storage` / `ad_user_data` su 'denied' finché
// l'utente non dà il consenso MARKETING). Il Pixel Meta invece è caricato solo
// col consenso perché Meta il Consent Mode non lo supporta.
const ADS_LEAD_EVENT = 'fim_lead'

/**
 * Valore economico stimato di un lead, in euro, per tipo di form.
 *
 * Serve a due cose: dare a Google Ads un segnale su cui ottimizzare davvero
 * (invece di contare tutte le conversioni uguali) e permettere di leggere il
 * ritorno, non solo il costo per contatto.
 *
 * ⚠️ NUMERI DA TARARE con i dati reali FIM. La formula è:
 * provvigione media del primo anno × tasso di chiusura di quel canale.
 * Quelli qui sotto sono un punto di partenza prudente, non una misurazione.
 */
const LEAD_VALUES: Record<string, number> = {
  preventivo: 45,
  preventivo_auto_documenti: 45,
  second_opinion: 35,
  prenotazione: 30,
  contact: 20,
  scuole: 40,
  collabora: 0,
}

const DEFAULT_LEAD_VALUE = 20

/**
 * Tipi di lead che contano come CONVERSIONE COMMERCIALE per Google Ads.
 *
 * `collabora` è volutamente fuori: è una candidatura, non una richiesta di
 * polizza. Includerla insegnerebbe all'algoritmo a portare curriculum invece
 * di clienti — lo stesso errore per cui oggi la campagna insegue le "azioni
 * locali" del profilo Google. Su GA4 l'evento continua ad arrivare come prima.
 */
const COMMERCIAL_LEAD_TYPES = new Set([
  'preventivo',
  'preventivo_auto_documenti',
  'second_opinion',
  'prenotazione',
  'contact',
  'scuole',
])

function leadValue(leadType: string): number {
  return LEAD_VALUES[leadType] ?? DEFAULT_LEAD_VALUE
}

/**
 * Spinge la conversione sul dataLayer perché GTM la giri a Google Ads.
 * `eventId` diventa `transaction_id`: Google Ads scarta le conversioni con lo
 * stesso ID, quindi un doppio invio (refresh, doppio click) non conta due volte.
 */
function pushAdsLead(
  leadType: string,
  params: Record<string, string | number | boolean>,
  eventId?: string,
) {
  if (typeof window === 'undefined') return
  if (!COMMERCIAL_LEAD_TYPES.has(leadType)) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: ADS_LEAD_EVENT,
    lead_type: leadType,
    value: leadValue(leadType),
    currency: 'EUR',
    transaction_id: eventId ?? '',
    utm_source: params.utm_source ?? '(direct)',
  })
}

function track(
  eventName: string,
  params: Record<string, string | number | boolean> = {},
  options: { eventId?: string } = {},
) {
  const leadType = String(params.event_category ?? '')

  // Sui lead si allega il valore anche all'evento GA4: senza, in GA4 e in
  // qualsiasi importazione verso Ads ogni contatto pesa uguale.
  const gaParams =
    eventName === 'generate_lead'
      ? { ...params, value: leadValue(leadType), currency: 'EUR' }
      : params

  if (typeof gtag !== 'undefined') gtag('event', eventName, gaParams)

  if (eventName === 'generate_lead') pushAdsLead(leadType, params, options.eventId)

  // Mirror dei lead sul Meta Pixel come Standard Event 'Lead'. `window.fbq`
  // esiste SOLO dopo il consenso marketing (MetaPixelLoader), quindi si applica
  // lo stesso gating GDPR: nessuna conversione inviata a Meta senza consenso.
  // Tutti i form di lead del sito passano da 'generate_lead'.
  if (
    eventName === 'generate_lead' &&
    typeof window !== 'undefined' &&
    typeof window.fbq === 'function'
  ) {
    const customData = { content_category: String(params.event_category ?? 'lead') }
    // `eventID` condiviso con l'invio server-side (Conversions API, lib/metaCapi.ts):
    // Meta deduplica browser + server sullo stesso event_name+event_id.
    if (options.eventId) {
      window.fbq('track', 'Lead', customData, { eventID: options.eventId })
    } else {
      window.fbq('track', 'Lead', customData)
    }
  }
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

/**
 * Form preventivo inviato con successo.
 * `eventId` (opz.): stesso ID passato al route `/api/preventivo` per la
 * deduplica col Lead server-side (Conversions API).
 */
export function trackPreventivoSubmit(
  profile: string,
  copertura: string,
  utmSource?: string,
  eventId?: string,
) {
  track(
    'generate_lead',
    {
      event_category: 'preventivo',
      profile,
      copertura,
      utm_source: utmSource ?? '(direct)',
    },
    { eventId },
  )
}

/** Form preventivo — errore di invio */
export function trackPreventivoError() {
  track('preventivo_submit_error')
}

// ── Funnel contatto ──────────────────────────────────────────────────────────

/**
 * Form contatto inviato.
 * `eventId` (opz.): stesso ID passato a `/api/contact` per la deduplica col
 * Lead server-side (Conversions API).
 */
export function trackContactSubmit(utmSource?: string, eventId?: string) {
  track(
    'generate_lead',
    {
      event_category: 'contact',
      utm_source: utmSource ?? '(direct)',
    },
    { eventId },
  )
}

// ── Funnel prenotazione ──────────────────────────────────────────────────────

/**
 * Form prenotazione consulenza inviato.
 * `eventId` (opz.): deduplica col Lead server-side, come sopra.
 */
export function trackPrenotazioneSubmit(servizio: string, utmSource?: string, eventId?: string) {
  track(
    'generate_lead',
    {
      event_category: 'prenotazione',
      servizio,
      utm_source: utmSource ?? '(direct)',
    },
    { eventId },
  )
}

// ── Funnel collabora con noi ─────────────────────────────────────────────────

/**
 * Form candidatura collabora inviato.
 * `eventId` (opz.): deduplica col Lead server-side, come sopra.
 */
export function trackCollaboraSubmit(profilo: string, utmSource?: string, eventId?: string) {
  track(
    'generate_lead',
    {
      event_category: 'collabora',
      profilo,
      utm_source: utmSource ?? '(direct)',
    },
    { eventId },
  )
}

// ── Funnel second opinion ────────────────────────────────────────────────────

/**
 * Richiesta Second Opinion inviata.
 * `eventId` (opz.): deduplica col Lead server-side, come sopra.
 */
export function trackSecondOpinionSubmit(settore: string, utmSource?: string, eventId?: string) {
  track(
    'generate_lead',
    {
      event_category: 'second_opinion',
      settore: settore || '(non specificato)',
      utm_source: utmSource ?? '(direct)',
    },
    { eventId },
  )
}

// ── Funnel scuole (Dipartimento Scuole) ──────────────────────────────────────

/**
 * Richiesta di check-up da un istituto scolastico inviata.
 * `eventId` (opz.): deduplica col Lead server-side, come sopra.
 */
export function trackScuoleSubmit(ruolo: string, utmSource?: string, eventId?: string) {
  track(
    'generate_lead',
    {
      event_category: 'scuole',
      ruolo: ruolo || '(non specificato)',
      utm_source: utmSource ?? '(direct)',
    },
    { eventId },
  )
}

/**
 * Checklist "Dieci domande" completata sulla pagina scuole.
 * `puntiAperti` = risposte "no" + "non so": sopra la soglia scatta l'invito al check-up.
 */
export function trackScuoleChecklist(puntiAperti: number) {
  track('scuole_checklist_complete', {
    event_category: 'scuole',
    punti_aperti: puntiAperti,
  })
}

// ── Funnel preventivo auto — documenti ───────────────────────────────────────

/** Documenti per preventivo auto caricati e inviati */
export function trackPreventivoAutoDocsSubmit(numDocumenti: number, utmSource?: string) {
  track('generate_lead', {
    event_category: 'preventivo_auto_documenti',
    num_documenti: numDocumenti,
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
