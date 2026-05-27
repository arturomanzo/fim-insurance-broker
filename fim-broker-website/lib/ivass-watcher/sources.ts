/**
 * IVASS Watcher — fonti monitorate dal cron giornaliero.
 *
 * Tutte le fonti restituiscono RSS 2.0. Le URL sono verificate manualmente
 * (2026-05-27). Vedi `app/api/cron/ivass-watcher/route.ts` per l'orchestrazione.
 *
 * Per aggiungere una fonte: pusha un nuovo entry qui + assicurati che il triage
 * AI in `triage.ts` riceva la `sourceLabel` corretta nel prompt.
 */

export type SourceId =
  | 'ivass'
  | 'gazzetta-sg'
  | 'gazzetta-s2'
  | 'ania-news'
  | 'ania-comunicati'

export interface Source {
  id: SourceId
  /** Etichetta human-readable usata nelle email e nei prompt di triage. */
  label: string
  /** URL del feed RSS 2.0. */
  url: string
  /** Header User-Agent richiesto (alcuni feed bloccano default UA). */
  userAgent?: string
  /**
   * Pre-filtro keyword applicato sul titolo + description PRIMA del triage AI,
   * per ridurre il numero di chiamate Claude. Se `null`, tutti gli item passano.
   * Confronto case-insensitive su `${title} ${description}`.
   */
  prefilter: RegExp | null
}

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

/**
 * Keyword di pre-filtro per la Gazzetta Ufficiale (decine di atti al giorno,
 * la maggior parte non assicurativi). Conserva tutto ciò che riguarda
 * assicurazioni, IVASS, intermediazione, RC auto, Solvency II, IDD, PRIIPs,
 * Arbitro Assicurativo, antiriciclaggio (D.Lgs. 231/2007).
 */
const GAZZETTA_PREFILTER =
  /\b(assicurat|assicuraz|ivass|intermediar|broker|R\.?C\.?\s*auto|solvency|ID(D|2)|priips?|arbitro\s+assicurativ|antiricicl|D\.?Lgs\.?\s*231\/2007|D\.?Lgs\.?\s*209\/2005|D\.?Lgs\.?\s*68\/2018|D\.?Lgs\.?\s*215\/2024|reg\.?\s*\(UE\)\s*2016\/97|reg\.?\s*\(UE\)\s*1286\/2014)\b/i

export const SOURCES: readonly Source[] = [
  {
    id: 'ivass',
    label: 'IVASS — Sito istituzionale',
    url: 'https://www.ivass.it/util/index.rss.html?lingua=it',
    prefilter: null, // IVASS pubblica poco, teniamo tutto
  },
  {
    id: 'gazzetta-sg',
    label: 'Gazzetta Ufficiale — Serie Generale',
    url: 'https://www.gazzettaufficiale.it/rss/SG',
    prefilter: GAZZETTA_PREFILTER,
  },
  {
    id: 'gazzetta-s2',
    label: 'Gazzetta Ufficiale — 2ª Serie Speciale (UE)',
    url: 'https://www.gazzettaufficiale.it/rss/S2',
    prefilter: GAZZETTA_PREFILTER,
  },
  {
    id: 'ania-news',
    label: 'ANIA — News',
    url: 'https://www.ania.it/news/feed/',
    userAgent: BROWSER_UA,
    prefilter: null,
  },
  {
    id: 'ania-comunicati',
    label: 'ANIA — Comunicati stampa',
    url: 'https://www.ania.it/comunicati/feed/',
    userAgent: BROWSER_UA,
    prefilter: null,
  },
] as const
