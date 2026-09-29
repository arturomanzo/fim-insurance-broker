// Da quale campagna arriva un contatto.
//
// Fino a settembre 2026 nessun modulo diceva al gestionale da dove arrivava il
// visitatore: i 556 € spesi su Google Ads risultavano a zero contatti anche se
// qualcuno, magari, era arrivato proprio da lì. Ora ogni lead porta con sé il
// campo `campagna`, con i parametri del primo arrivo della sessione.
//
// Questo file è puro: niente `window`, niente import con `@/`. Lo usano il
// browser (lib/campagnaBrowser.ts), le API del sito e i test con `node --test`.
//
// Il contratto con il gestionale: tutti i campi facoltativi, stringhe di al
// massimo 200 caratteri, assenti se vuoti.

export const CHIAVE_SESSIONE_CAMPAGNA = 'fim_campagna'
export const MAX_CAMPO_CAMPAGNA = 200

export const CAMPI_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
/** Identificativi di clic pubblicitario: viaggiano solo col consenso marketing. */
export const CAMPI_CLIC = ['gclid', 'fbclid'] as const
export const CAMPI_CAMPAGNA = [
  ...CAMPI_UTM,
  ...CAMPI_CLIC,
  'referrer_esterno',
  'pagina_arrivo',
  'arrivato_il',
] as const

export type CampoCampagna = (typeof CAMPI_CAMPAGNA)[number]
export type Campagna = Partial<Record<CampoCampagna, string>>

const DOMINIO_SITO = 'fimbroker.it'

// Caratteri di controllo: non servono a nessun campo e sporcano log e archivio.
// eslint-disable-next-line no-control-regex
const CONTROLLO = /[\u0000-\u001f\u007f]/g
const HOST = /^[a-z0-9.-]+$/
// gclid e fbclid sono base64 "url-safe": lettere, cifre, trattino, trattino basso.
const ID_CLIC = /^[A-Za-z0-9_-]+$/
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/

function testo(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined
  const t = v.replace(CONTROLLO, '').trim().slice(0, MAX_CAMPO_CAMPAGNA)
  return t || undefined
}

/** Il percorso senza query string né ancora; deve cominciare con `/`. */
function percorso(v: string): string | undefined {
  const p = v.split(/[?#]/)[0]
  return p.startsWith('/') ? p : undefined
}

/**
 * L'host del referrer, solo se è un sito diverso da fimbroker.it. `hostSito` è
 * l'host della pagina corrente: sulle anteprime Vercel e in locale il referrer
 * interno non è fimbroker.it, ma resta interno.
 */
export function hostEsterno(referrer: string | undefined, hostSito?: string): string | undefined {
  if (!referrer) return undefined
  let host: string
  try {
    host = new URL(referrer).hostname.toLowerCase()
  } catch {
    return undefined
  }
  if (!host || !HOST.test(host)) return undefined
  if (host === DOMINIO_SITO || host.endsWith(`.${DOMINIO_SITO}`)) return undefined
  if (hostSito && host === hostSito.toLowerCase()) return undefined
  return host.slice(0, MAX_CAMPO_CAMPAGNA)
}

/**
 * Pulisce un `campagna` arrivato da fuori (il corpo di una richiesta al sito):
 * solo i campi previsti, solo stringhe, al massimo 200 caratteri, formati
 * controllati dove un formato c'è. Ritorna `undefined` se non resta niente,
 * così il campo non viaggia proprio.
 */
export function pulisciCampagna(input: unknown): Campagna | undefined {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return undefined
  // Solo le proprietà proprie: un campo ereditato dal prototipo non è un dato.
  const grezzo: Record<string, unknown> = {}
  for (const campo of CAMPI_CAMPAGNA) {
    if (Object.prototype.hasOwnProperty.call(input, campo)) grezzo[campo] = (input as Record<string, unknown>)[campo]
  }
  const out: Campagna = {}

  for (const campo of CAMPI_UTM) {
    const v = testo(grezzo[campo])
    if (v) out[campo] = v
  }
  for (const campo of CAMPI_CLIC) {
    const v = testo(grezzo[campo])
    if (v && ID_CLIC.test(v)) out[campo] = v
  }

  const ref = testo(grezzo.referrer_esterno)?.toLowerCase()
  if (ref && HOST.test(ref) && ref !== DOMINIO_SITO && !ref.endsWith(`.${DOMINIO_SITO}`)) {
    out.referrer_esterno = ref
  }

  const pagina = testo(grezzo.pagina_arrivo)
  const p = pagina ? percorso(pagina) : undefined
  if (p) out.pagina_arrivo = p

  const quando = testo(grezzo.arrivato_il)
  if (quando && ISO.test(quando)) {
    const t = Date.parse(quando)
    if (!Number.isNaN(t)) out.arrivato_il = new Date(t).toISOString()
  }

  return Object.keys(out).length > 0 ? out : undefined
}

/** Toglie gclid e fbclid: senza consenso marketing non si salvano né si inviano. */
export function senzaClic(c: Campagna): Campagna {
  const out: Campagna = { ...c }
  for (const campo of CAMPI_CLIC) delete out[campo]
  return out
}

/** Solo gclid e fbclid, se ci sono. */
export function soloClic(c: Campagna): Campagna {
  const out: Campagna = {}
  for (const campo of CAMPI_CLIC) if (c[campo]) out[campo] = c[campo]
  return out
}

/**
 * Legge un arrivo sul sito: parametri dell'URL, host del referrer, pagina e
 * ora. Il risultato è già pulito. Contiene anche gclid/fbclid: decide chi
 * chiama se tenerli, in base al consenso.
 */
export function leggiArrivo(arrivo: {
  url: string
  referrer?: string
  adesso: Date
  hostSito?: string
}): Campagna {
  let url: URL
  try {
    url = new URL(arrivo.url)
  } catch {
    return {}
  }
  const grezzo: Record<string, string | undefined> = {
    pagina_arrivo: url.pathname,
    arrivato_il: arrivo.adesso.toISOString(),
    referrer_esterno: hostEsterno(arrivo.referrer, arrivo.hostSito ?? url.hostname),
  }
  for (const campo of [...CAMPI_UTM, ...CAMPI_CLIC]) {
    grezzo[campo] = url.searchParams.get(campo) ?? undefined
  }
  return pulisciCampagna(grezzo) ?? {}
}

/**
 * Aggiunge gclid/fbclid a una sessione già registrata, senza toccare quelli
 * che ci sono: vince sempre il primo. Serve quando il consenso marketing
 * arriva dopo l'atterraggio sulla pagina dell'annuncio.
 */
export function aggiungiClic(sessione: Campagna, clic: Campagna): Campagna {
  const out: Campagna = { ...sessione }
  for (const campo of CAMPI_CLIC) {
    if (!out[campo] && clic[campo]) out[campo] = clic[campo]
  }
  return out
}
