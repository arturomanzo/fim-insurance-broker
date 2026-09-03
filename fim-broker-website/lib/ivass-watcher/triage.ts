/**
 * IVASS Watcher — triage AI per classificare la rilevanza di un nuovo atto
 * normativo o comunicato rispetto al business di FIM Insurance Broker
 * (broker Sez. B RUI n. B000405449).
 *
 * Output strutturato via `output_config.format`. Modello: AI_MODELS.draft.
 */
import { anthropic } from '@/lib/anthropic'
import { AI_MODELS } from '@/lib/ai-models'
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

Atti a titolo opaco. Le voci IVASS hanno spesso titoli generici ("Provvedimento n. 0124143", "Lettera al mercato", "Regolamento n. X") con descrizione RSS assente o inutile: dal solo titolo non puoi escludere un impatto su intermediari e broker.
- "Lettera al mercato" e "Regolamento IVASS" valgono "high" salvo evidenza contraria nella descrizione: sono di norma vincolanti per gli intermediari.
- "Provvedimento n. …" di IVASS senza descrizione utile vale almeno "medium", e nel summary scrivi che il testo va verificato.
È preferibile un falso allarme archiviabile a un obbligo mancato.
Restano "low/none" solo gli atti chiaramente non normativi per un broker: elenchi e registri, statistiche e bollettini, avvisi su singole imprese (anche estere), oscuramento di siti abusivi, procedure di gara interne IVASS.

Vale almeno "medium" (o "high" se c'è un obbligo o una scadenza entro 90 giorni) tutto ciò che tocca:
Reg. IVASS 40/2018 o 41/2018, Allegati IDD (3 e 4), procedura reclami, Arbitro Assicurativo, iscrizione/tenuta RUI e requisiti degli intermediari, obblighi antiriciclaggio per intermediari (D.Lgs. 231/2007), distribuzione assicurativa (IDD, D.Lgs. 68/2018).

IMPATTO SUL SITO:
"impactsSite" è true solo se richiede di modificare testi pubblici del sito FIM (note legali, allegati IDD, procedura reclami, privacy, glossario, FAQ, contenuti commerciali).

Pagine candidate:
- "/note-legali"
- "/trasparenza" (Allegato 3 e 4 IDD)
- "/reclami"
- "/privacy-policy"
- "/cookie-policy"
- "/glossario"
- "/faq"
- "/sinistri"
- "/servizi/*" (specificare quale)
- "/soluzioni/*" (specificare quale)`

// La forma la garantisce l'API. Il tetto di 350 caratteri sul summary resta qui
// perché è un vincolo del riquadro del report, non una preferenza di stile.
const TRIAGE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['relevance', 'impactsSite', 'affectedPages', 'summary', 'deadline', 'normativeRefs'],
  properties: {
    relevance: { type: 'string', enum: ['high', 'medium', 'low', 'none'] },
    impactsSite: { type: 'boolean' },
    affectedPages: {
      type: 'array',
      items: { type: 'string' },
      description: 'Slug che iniziano con "/", presi dalle pagine candidate.',
    },
    summary: { type: 'string', description: 'Al massimo 350 caratteri: entra in un riquadro del report.' },
    deadline: { type: ['string', 'null'], description: 'YYYY-MM-DD, oppure testo libero se la data non è secca.' },
    normativeRefs: { type: ['string', 'null'] },
  },
} as const

function buildUserPrompt(item: RssItem, source: Source): string {
  return `FONTE: ${source.label}
TITOLO: ${item.title}
URL: ${item.link}
DATA PUBBLICAZIONE: ${item.pubDate ? item.pubDate.toISOString().slice(0, 10) : 'sconosciuta'}
DESCRIZIONE: ${item.description.slice(0, 1500)}`
}

const FALLBACK: TriageResult = {
  relevance: 'medium',
  impactsSite: false,
  affectedPages: [],
  summary: 'Triage AI fallito — voce conservata per revisione manuale.',
  deadline: null,
  normativeRefs: null,
}

function validateRelevance(v: unknown): Relevance {
  return v === 'high' || v === 'medium' || v === 'low' || v === 'none' ? v : 'low'
}

const REL_ORDER: Record<Relevance, number> = { none: 0, low: 1, medium: 2, high: 3 }
function maxRel(a: Relevance, b: Relevance): Relevance {
  return REL_ORDER[a] >= REL_ORDER[b] ? a : b
}

/**
 * Rete di sicurezza deterministica per atti normativi IVASS a titolo opaco:
 * impedisce che un atto potenzialmente vincolante (lettera al mercato,
 * regolamento, provvedimento) venga archiviato come none/low solo perché
 * titolo e descrizione RSS non bastano a coglierne la portata.
 * Restituisce la relevance, eventualmente elevata, e se è stata elevata.
 */
export function applyNormativeFloor(
  item: RssItem,
  source: Source,
  rel: Relevance,
): { relevance: Relevance; elevated: boolean } {
  if (source.id !== 'ivass') return { relevance: rel, elevated: false }
  const t = item.title
  let floor: Relevance = rel
  if (/lettera al mercato/i.test(t) || /\bregolament[oi]\b/i.test(t)) {
    floor = maxRel(rel, 'high')
  } else if (/provvediment[oi]\s+n/i.test(t) && rel === 'none') {
    floor = 'medium'
  }
  return { relevance: floor, elevated: REL_ORDER[floor] > REL_ORDER[rel] }
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
      model: AI_MODELS.draft,
      // Il tetto stretto tagliava il JSON in silenzio. Niente `effort`: Haiku 4.5
      // lo rifiuta con un 400.
      max_tokens: 4096,
      output_config: { format: { type: 'json_schema', schema: TRIAGE_SCHEMA } },
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt(item, source) }],
    })

    if (res.stop_reason === 'refusal') {
      return { ...FALLBACK, error: `rifiutata: ${res.stop_details?.category ?? 'n.d.'}` }
    }
    if (res.stop_reason === 'max_tokens') {
      return { ...FALLBACK, error: 'risposta tagliata dal tetto di token' }
    }

    const block = res.content.find((b) => b.type === 'text')
    if (!block || block.type !== 'text') {
      return { ...FALLBACK, error: 'Risposta vuota' }
    }
    const p = JSON.parse(block.text) as Record<string, unknown>
    const modelRel = validateRelevance(p.relevance)
    const { relevance, elevated } = applyNormativeFloor(item, source, modelRel)
    const baseSummary = typeof p.summary === 'string' ? p.summary.slice(0, 480) : ''
    const summary = elevated
      ? `⚠️ Elevato in via prudenziale (atto normativo a titolo opaco — verificare il testo). ${baseSummary}`.slice(0, 500)
      : baseSummary
    return {
      relevance,
      impactsSite: Boolean(p.impactsSite),
      affectedPages: validatePages(p.affectedPages),
      summary,
      deadline: typeof p.deadline === 'string' ? p.deadline.slice(0, 100) : null,
      normativeRefs: typeof p.normativeRefs === 'string' ? p.normativeRefs.slice(0, 300) : null,
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ...FALLBACK, error: msg }
  }
}
