/**
 * IVASS Watcher — triage AI per classificare la rilevanza di un nuovo atto
 * normativo o comunicato rispetto al business di FIM Insurance Broker
 * (broker Sez. B RUI n. B000405449).
 *
 * Output strutturato JSON. Modello: Haiku 4.5 (veloce + low-cost: ~$0.001/call).
 */
import { anthropic } from '@/lib/anthropic'
import type { RssItem } from './rss'
import type { Source } from './sources'

export type Relevance = 'high' | 'medium' | 'low' | 'none'

export interface TriageResult {
  /**
   * `high`   = obbligo o adempimento per broker, scadenza vicina o impatto diretto sito.
   * `medium` = norma o linea guida rilevante per la pratica broker (non urgente).
   * `low`    = di settore ma marginale (es. statistiche, dati aggregati).
   * `none`   = non pertinente (es. atto riguarda solo imprese / agenti / IBIP).
   */
  relevance: Relevance
  /** True se richiede aggiornamento del sito pubblico (note legali, allegati IDD, reclami, FAQ ecc.). */
  impactsSite: boolean
  /** Pagine del sito da aggiornare (slug, es. "/note-legali", "/trasparenza", "/reclami"). */
  affectedPages: string[]
  /** 1-3 frasi che spiegano cos'è cambiato e perché conta per FIM. */
  summary: string
  /** Eventuale deadline ("YYYY-MM-DD" o testo libero tipo "entro 6 mesi dalla pubblicazione"). */
  deadline: string | null
  /** Riferimenti normativi citati (es. "Reg. IVASS 40/2018 art. 7-bis"). */
  normativeRefs: string | null
}

const SYSTEM_PROMPT = `Sei un compliance officer esperto in normativa assicurativa italiana ed europea.
Lavori per FIM Insurance Broker S.a.s., broker indipendente iscritto alla Sezione B del RUI IVASS (n. B000405449).

Il tuo compito è classificare una notizia/atto normativo rispetto alla sua rilevanza per FIM.

REGOLE DI CLASSIFICAZIONE:

- "high" = obbligo o adempimento diretto per broker Sez. B con impatto operativo o sul sito pubblico, OPPURE scadenza entro 90 giorni. Esempi:
  • Modifica al Reg. IVASS 40/2018 o 41/2018 (regole su intermediazione / informativa)
  • Nuovo D.Lgs. che recepisce direttive UE rilevanti per la distribuzione assicurativa
  • Provvedimenti IVASS che richiedono aggiornamento di Allegato 3, Allegato 4, procedura reclami, sito pubblico
  • Sanzioni a broker o lettere al mercato vincolanti per intermediari

- "medium" = norma o linea guida che riguarda la pratica broker ma senza scadenza immediata. Esempi:
  • Provvedimenti IVASS su prodotti specifici (es. RC auto, polizze CAT NAT, IBIP) che il broker distribuisce
  • Comunicazioni IVASS o ANIA su orientamenti interpretativi
  • Atti UE (Solvency II, IDD review) ancora da recepire in Italia

- "low" = di settore ma marginale. Esempi:
  • Statistiche, bollettini, dati aggregati IVASS
  • Comunicati ANIA su iniziative culturali, eventi
  • Sanzioni a singole imprese senza valenza generale

- "none" = NON pertinente per un broker Sez. B. Esempi:
  • Provvedimenti che si applicano solo a imprese di assicurazione (Solvency II requirements interni)
  • Atti che riguardano solo agenti monomandatari Sez. A
  • Periti, attuari, riassicuratori puri
  • Trasferimenti di portafoglio tra compagnie
  • Atti non assicurativi finiti nel feed per via di un keyword match (es. "assicurazione" in contesti diversi)

IMPATTO SUL SITO:
"impactsSite" = true SOLO se richiede modifica di testi pubblici del sito FIM (note legali, allegati IDD, procedura reclami, privacy, glossario, FAQ, contenuti commerciali).

Pagine candidate (usa SOLO questi slug se rilevanti):
- "/note-legali"
- "/trasparenza" (Allegato 3 e 4 IDD)
- "/reclami"
- "/privacy-policy"
- "/cookie-policy"
- "/glossario"
- "/faq"
- "/sinistri"
- "/servizi/*" (specificare quale)
- "/soluzioni/*" (specificare quale)

Rispondi SEMPRE e SOLO con un singolo blocco JSON valido, senza testo prima o dopo.`

function buildUserPrompt(item: RssItem, source: Source): string {
  return `FONTE: ${source.label}
TITOLO: ${item.title}
URL: ${item.link}
DATA PUBBLICAZIONE: ${item.pubDate ? item.pubDate.toISOString().slice(0, 10) : 'sconosciuta'}
DESCRIZIONE: ${item.description.slice(0, 1500)}

Classifica questo item e rispondi con JSON nella forma:
{
  "relevance": "high" | "medium" | "low" | "none",
  "impactsSite": boolean,
  "affectedPages": ["/slug", ...],
  "summary": "string (max 350 caratteri)",
  "deadline": "YYYY-MM-DD" | "string libera" | null,
  "normativeRefs": "string" | null
}`
}

const FALLBACK: TriageResult = {
  relevance: 'medium',
  impactsSite: false,
  affectedPages: [],
  summary: 'Triage AI fallito — voce conservata per revisione manuale.',
  deadline: null,
  normativeRefs: null,
}

function parseJsonBlock(text: string): unknown | null {
  // Estrae il primo blocco JSON dal testo (rimuove eventuali ```json fences)
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '')
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start < 0 || end <= start) return null
  try {
    return JSON.parse(cleaned.slice(start, end + 1))
  } catch {
    return null
  }
}

function validateRelevance(v: unknown): Relevance {
  return v === 'high' || v === 'medium' || v === 'low' || v === 'none' ? v : 'low'
}

function validatePages(v: unknown): string[] {
  if (!Array.isArray(v)) return []
  return v.filter((s): s is string => typeof s === 'string' && s.startsWith('/')).slice(0, 10)
}

export async function triageItem(
  item: RssItem,
  source: Source,
): Promise<TriageResult & { error?: string }> {
  try {
    const res = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt(item, source) }],
    })

    const text = res.content
      .flatMap((b) => (b.type === 'text' ? [b.text] : []))
      .join('\n')

    const parsed = parseJsonBlock(text)
    if (!parsed || typeof parsed !== 'object') {
      return { ...FALLBACK, error: 'JSON non parsabile' }
    }
    const p = parsed as Record<string, unknown>
    return {
      relevance: validateRelevance(p.relevance),
      impactsSite: Boolean(p.impactsSite),
      affectedPages: validatePages(p.affectedPages),
      summary: typeof p.summary === 'string' ? p.summary.slice(0, 500) : '',
      deadline: typeof p.deadline === 'string' ? p.deadline.slice(0, 100) : null,
      normativeRefs: typeof p.normativeRefs === 'string' ? p.normativeRefs.slice(0, 300) : null,
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ...FALLBACK, error: msg }
  }
}
