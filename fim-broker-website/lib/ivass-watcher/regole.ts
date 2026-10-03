/**
 * IVASS Watcher — regole deterministiche applicate DOPO il triage AI.
 *
 * Stanno qui, senza dipendenze dal client Anthropic, perché si possano testare
 * con `npm test`. Le usa `triage.ts`.
 */
import type { RssItem } from './rss'
import type { Source } from './sources'

export type Relevance = 'high' | 'medium' | 'low' | 'none'

/** Quale regola ha corretto il giudizio del modello. */
export type Elevazione = 'opaco' | 'contributo-rui'

const REL_ORDER: Record<Relevance, number> = { none: 0, low: 1, medium: 2, high: 3 }
function maxRel(a: Relevance, b: Relevance): Relevance {
  return REL_ORDER[a] >= REL_ORDER[b] ? a : b
}

/**
 * Sotto questa lunghezza la descrizione RSS non dice niente sul contenuto
 * dell'atto: vuota, "(aggiornato al 01.10.2026)", "Istruzioni del 30/09/2026".
 */
const DESCRIZIONE_MINIMA = 40

/**
 * Un atto è "opaco" quando il feed dà solo il titolo. Solo in quel caso la rete
 * prudenziale scavalca il modello: se la descrizione spiega di cosa si tratta
 * ("Contributo di vigilanza a carico delle imprese vigilate", "trasferimento del
 * portafoglio di Genertel"), il modello ha gli elementi per giudicare e alzarlo
 * comunque riempie il report di falsi allarmi. Successo il 02/10/2026: due
 * lettere al mercato per le sole compagnie finite tra le URGENTI.
 */
export function isOpaco(item: RssItem): boolean {
  return item.description.trim().length < DESCRIZIONE_MINIMA
}

/**
 * Contributo di vigilanza a carico degli iscritti al RUI: FIM lo paga ogni anno,
 * con un termine stretto (nel 2026 erano 30 giorni dal provvedimento) e la
 * cancellazione dal registro se salta. Restano fuori gli atti per le sole
 * imprese e quelli per gli intermediari SEE che operano in Italia.
 */
const CONTRIBUTO = /contributo\s+di\s+vigilanza/i
const INTERMEDIARI = /intermediari|registro\s+unico/i
const SOLO_SEE = /spazio\s+economico\s+europeo|stati\s+aderenti|\bSEE\b/i

export function isContributoRui(item: RssItem): boolean {
  const testo = `${item.title} ${item.description}`
  return CONTRIBUTO.test(testo) && INTERMEDIARI.test(testo) && !SOLO_SEE.test(testo)
}

/**
 * Rete di sicurezza sulle voci IVASS:
 * - contributo di vigilanza RUI → sempre `high`;
 * - lettera al mercato o regolamento a titolo opaco → `high`;
 * - "Provvedimento n. …" opaco che il modello darebbe `none` → `medium`.
 */
export function applyNormativeFloor(
  item: RssItem,
  source: Source,
  rel: Relevance,
): { relevance: Relevance; elevazione: Elevazione | null } {
  if (source.id !== 'ivass') return { relevance: rel, elevazione: null }

  // Qui la nota nel summary serve anche quando il modello l'aveva già messo
  // `high`: ricorda che il termine sta nel testo e non nel feed.
  if (isContributoRui(item)) {
    return { relevance: maxRel(rel, 'high'), elevazione: 'contributo-rui' }
  }

  if (!isOpaco(item)) return { relevance: rel, elevazione: null }

  const t = item.title
  let floor: Relevance = rel
  if (/lettera al mercato/i.test(t) || /\bregolament[oi]\b/i.test(t)) {
    floor = maxRel(rel, 'high')
  } else if (/provvediment[oi]\s+n/i.test(t) && rel === 'none') {
    floor = 'medium'
  }
  return { relevance: floor, elevazione: floor !== rel ? 'opaco' : null }
}

/**
 * Parole che segnalano un termine scritto nel testo. Senza almeno una di queste
 * nel titolo o nella descrizione la scadenza può venire solo dalla fantasia del
 * modello: il 02/10/2026 ha messo "2026-12-31" su un contributo che andava
 * pagato entro il 2 novembre.
 */
const INDIZIO_TERMINE =
  /\b(entro|termin[ei]|scadenz\w*|giorni|decorr\w*|in\s+vigore|a\s+partire\s+dal|si\s+applica\w*\s+dal)\b/i

export function filtraScadenza(item: RssItem, deadline: unknown): string | null {
  if (typeof deadline !== 'string' || deadline.trim() === '') return null
  if (!INDIZIO_TERMINE.test(`${item.title} ${item.description}`)) return null
  return deadline.slice(0, 100)
}

/** Frase messa in testa al summary quando una regola è intervenuta. */
export const PREFISSO_ELEVAZIONE: Record<Elevazione, string> = {
  opaco: '⚠️ Elevato in via prudenziale (atto normativo a titolo opaco — verificare il testo).',
  'contributo-rui':
    '💶 Contributo di vigilanza a carico degli iscritti al RUI: lo paga anche FIM. Il termine di pagamento è nel testo del provvedimento, aprilo subito.',
}
