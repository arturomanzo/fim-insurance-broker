import { createHash } from 'crypto'

/**
 * Meta Conversions API (CAPI) — invio server-side dell'evento Standard 'Lead'.
 *
 * Complementa il Meta Pixel browser (components/analytics/MetaPixelLoader.tsx):
 * usando lo STESSO `event_id` sul Pixel e sul server, Meta deduplica i due invii
 * e conta un solo Lead. Il server recupera le conversioni che il browser perde
 * (adblock, iOS/Safari ITP, cookie mancanti) e migliora il match quality con
 * dati utente hashati (SHA-256).
 *
 * GDPR: da chiamare SOLO con consenso marketing prestato (choice === 'all').
 * L'access token è un SEGRETO → esclusivamente env var lato server (mai client).
 * Se `META_CAPI_TOKEN` non è configurato, l'invio viene saltato in silenzio
 * (stesso pattern di RESEND_API_KEY / WEBSITE_API_SECRET nel route del preventivo).
 */

// Deve combaciare con META_PIXEL_ID in components/analytics/MetaPixelLoader.tsx
// (dataset "FIM Broker"). L'ID Pixel è pubblico; il token NO.
const PIXEL_ID = '1271502811523830'
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN
const GRAPH_API_VERSION = 'v21.0'
// Opzionale: se valorizzato, gli eventi finiscono in "Test degli eventi" di
// Events Manager (utile per verificare senza sporcare i dati reali). In prod: vuoto.
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/** Normalizza (trim + lowercase) e hasha email/nome/cognome. */
function hashNormalized(value: string | undefined | null): string | undefined {
  const v = String(value ?? '').trim().toLowerCase()
  return v ? sha256(v) : undefined
}

/**
 * Telefono → solo cifre in formato E.164 senza '+' (default Italia 39), poi hash.
 * Es. "+39 333 1234567", "333 1234567" e "0039 333 1234567" → "393331234567".
 *
 * Due trappole italiane da cui dipende il match quality (un numero normalizzato
 * male produce un hash che non corrisponde a nessun utente su Meta):
 * - i FISSI tengono lo 0 anche in formato internazionale: "06 96883381" va a
 *   "390696883381", non a "39696883381";
 * - "inizia per 39" NON basta a dire che il prefisso paese c'è già, perché i
 *   cellulari Iliad/Wind iniziano per 391/392/393/397. Discriminante la lunghezza:
 *   un numero nazionale italiano arriva al massimo a 11 cifre e i cellulari a 10,
 *   quindi se comincia per 39 ed è lungo almeno 11 il 39 è il prefisso paese.
 */
function hashPhone(raw: string | undefined | null): string | undefined {
  let digits = String(raw ?? '').replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2) // prefisso internazionale 00 → E.164
  if (!digits) return undefined
  const hasCountryCode = digits.startsWith('39') && digits.length >= 11
  if (!hasCountryCode) digits = `39${digits}` // prefisso Italia se assente
  return sha256(digits)
}

export interface MetaLeadEvent {
  /** Condiviso col Pixel browser per la deduplica Meta. Obbligatorio. */
  eventId: string
  eventSourceUrl?: string
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  /** Cookie _fbc (click id Meta), da leggere lato server dalla request. */
  fbc?: string
  /** Cookie _fbp (browser id Meta), da leggere lato server dalla request. */
  fbp?: string
  clientIp?: string
  userAgent?: string
  contentCategory?: string
  /** Secondi Unix; default: ora. */
  eventTimeSec?: number
}

/**
 * Invia l'evento 'Lead' alla Conversions API di Meta.
 * NON lancia mai: logga e ritorna in caso di errore, così non blocca il lead.
 */
export async function sendLeadToMetaCapi(ev: MetaLeadEvent): Promise<void> {
  if (!ACCESS_TOKEN) {
    console.warn('[meta-capi] META_CAPI_TOKEN non configurato — evento Lead server-side saltato')
    return
  }

  // user_data: includi solo i campi valorizzati (Meta rifiuta array con undefined).
  const userData: Record<string, unknown> = {}
  const em = hashNormalized(ev.email); if (em) userData.em = [em]
  const ph = hashPhone(ev.phone); if (ph) userData.ph = [ph]
  const fn = hashNormalized(ev.firstName); if (fn) userData.fn = [fn]
  const ln = hashNormalized(ev.lastName); if (ln) userData.ln = [ln]
  if (ev.fbc) userData.fbc = ev.fbc
  if (ev.fbp) userData.fbp = ev.fbp
  if (ev.clientIp) userData.client_ip_address = ev.clientIp
  if (ev.userAgent) userData.client_user_agent = ev.userAgent

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'Lead',
        event_time: ev.eventTimeSec ?? Math.floor(Date.now() / 1000),
        event_id: ev.eventId,
        action_source: 'website',
        ...(ev.eventSourceUrl ? { event_source_url: ev.eventSourceUrl } : {}),
        user_data: userData,
        custom_data: { content_category: ev.contentCategory ?? 'preventivo' },
      },
    ],
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[meta-capi] Invio Lead fallito: HTTP ${res.status} — ${text}`)
    } else {
      const json = await res.json().catch(() => ({}))
      console.log('[meta-capi] Lead inviato:', json?.events_received ?? json)
    }
  } catch (err) {
    console.error('[meta-capi] Errore di rete invio Lead:', err)
  }
}
