/**
 * Lead Scoring AI — FIM Insurance Broker
 *
 * Analizza ogni lead e assegna:
 *  - score: 1–100
 *  - priority: 'alta' | 'media' | 'bassa'
 *  - reason: spiegazione sintetica per il team
 *
 * Logica ibrida:
 *  1. Punteggio deterministico basato su regole (tipo polizza, profilo, dati)
 *  2. Raffinamento AI con Claude che analizza il messaggio e produce il reasoning
 */

import Anthropic from '@anthropic-ai/sdk'
import { AI_MODELS } from './ai-models'
import type { Lead } from './leadStore'

export interface LeadScore {
  score: number                         // 1–100
  priority: 'alta' | 'media' | 'bassa' // alta=80+, media=50-79, bassa<50
  reason: string                        // spiegazione per il team
}

// ── 1. Scoring deterministico ──────────────────────────────────────────────────

/** Valore commerciale stimato per tipo di polizza */
const TIPO_SCORE: Record<string, number> = {
  // Alto valore
  'rc professionale':    35,
  'rischi aziendali':    35,
  'azienda':             35,
  'polizza azienda':     35,
  'corporate':           35,
  'flotta':              32,
  'cyber':               32,
  // Medio-alto
  'vita':                28,
  'salute':              28,
  'infortuni':           25,
  'long term care':      25,
  // Medio
  'casa':                20,
  'condomini':           22,
  'condominio':          22,
  'catastrofi':          20,
  'responsabilità civile': 18,
  // Basso
  'rc auto':             15,
  'auto':                15,
  'moto':                12,
  // Default
  'altro':               10,
}

/** Profilo: azienda vale molto di più di un privato */
const PROFILO_SCORE: Record<string, number> = {
  'azienda':          25,
  'impresa':          25,
  'srl':              25,
  'spa':              25,
  'snc':              22,
  'sas':              22,
  'società':          22,
  'professionista':   20,
  'partita iva':      20,
  'libero professionista': 20,
  'privato':          10,
  'famiglia':         12,
}

function scoreTipo(tipo: string): number {
  const t = tipo.toLowerCase().trim()
  for (const [key, pts] of Object.entries(TIPO_SCORE)) {
    if (t.includes(key)) return pts
  }
  return 10
}

function scoreProfilo(profilo?: string): number {
  if (!profilo) return 8
  const p = profilo.toLowerCase().trim()
  for (const [key, pts] of Object.entries(PROFILO_SCORE)) {
    if (p.includes(key)) return pts
  }
  return 10
}

function scoreRecency(timestamp: string): number {
  const diffMs = Date.now() - new Date(timestamp).getTime()
  const diffH = diffMs / (1000 * 60 * 60)
  if (diffH <= 24)   return 10
  if (diffH <= 168)  return 7   // 1 settimana
  if (diffH <= 720)  return 4   // 1 mese
  return 2
}

function scoreMessaggio(messaggio?: string): number {
  if (!messaggio || messaggio.trim().length === 0) return 0
  const len = messaggio.trim().length
  if (len >= 200) return 15
  if (len >= 80)  return 10
  return 5
}

/** Calcola il punteggio base senza AI (0–90) */
function computeBaseScore(lead: Lead): number {
  const tipoScore     = scoreTipo(lead.tipo)            // 0–35
  const profiloScore  = scoreProfilo(lead.profilo)      // 0–25
  const recencyScore  = scoreRecency(lead.timestamp)    // 0–10
  const messaggioScore = scoreMessaggio(lead.messaggio) // 0–15
  // Max deterministico = 85; normalizza a 90 per lasciare spazio all'AI
  const raw = tipoScore + profiloScore + recencyScore + messaggioScore
  return Math.min(90, raw)
}

// ── 2. Raffinamento AI con Claude ──────────────────────────────────────────────

const AI_SYSTEM = `Leggi la richiesta di un potenziale cliente di FIM Insurance Broker (broker assicurativo, Cisterna di Latina) e di' al team commerciale cosa c'è dentro: se dichiara un'urgenza (una scadenza, un "mi serve subito"), se parla di budget o di importi, quanto è specifica la richiesta, se cita sinistri passati o esigenze particolari.
Il punteggio lo calcola il sistema: tu descrivi quello che vedi. La "reason" è una riga in italiano per chi alzerà il telefono.`

// Il modello giudica, l'aritmetica sta in codice: un modello che somma punti
// sbaglia in modo invisibile, e la rubrica nel prompt non era verificabile.
const LEAD_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['urgenza', 'budget', 'dettaglio', 'esigenzeParticolari', 'reason'],
  properties: {
    urgenza: { type: 'boolean', description: 'Il messaggio dichiara una scadenza o una fretta esplicita.' },
    budget: { type: 'boolean', description: 'Il messaggio nomina un budget, un premio o un importo.' },
    dettaglio: {
      type: 'string',
      enum: ['alto', 'medio', 'basso', 'vuoto'],
      description: 'Quanto la richiesta è specifica su cosa vuole assicurare.',
    },
    esigenzeParticolari: {
      type: 'boolean',
      description: 'Cita sinistri passati, coperture insolite o vincoli suoi.',
    },
    reason: { type: 'string', description: 'Una riga per il team commerciale, in italiano.' },
  },
} as const

function bonusDa(j: {
  urgenza: boolean
  budget: boolean
  dettaglio: string
  esigenzeParticolari: boolean
}): number {
  let b = 0
  if (j.urgenza) b += 4
  if (j.budget) b += 3
  if (j.dettaglio === 'alto') b += 2
  else if (j.dettaglio === 'medio') b += 1
  if (j.esigenzeParticolari) b += 1
  return Math.min(10, b)
}

async function aiRefine(lead: Lead, baseScore: number): Promise<{ bonus: number; reason: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return {
      bonus: 0,
      reason: buildFallbackReason(lead, baseScore),
    }
  }

  const client = new Anthropic({ apiKey })

  const leadSummary = `
Tipo polizza richiesta: ${lead.tipo}
Profilo cliente: ${lead.profilo ?? 'non specificato'}
Messaggio: ${lead.messaggio ?? '(nessun messaggio)'}
Data richiesta: ${new Date(lead.timestamp).toLocaleDateString('it-IT')}
Punteggio base calcolato: ${baseScore}/90
  `.trim()

  try {
    const msg = await client.messages.create({
      model: AI_MODELS.draft,
      // Haiku 4.5 non pensa, ma il tetto stretto tagliava il JSON senza dirlo.
      // Niente `effort` qui: Haiku 4.5 lo rifiuta con un 400.
      max_tokens: 4096,
      output_config: { format: { type: 'json_schema', schema: LEAD_SCHEMA } },
      system: AI_SYSTEM,
      messages: [{ role: 'user', content: leadSummary }],
    })

    if (msg.stop_reason === 'refusal' || msg.stop_reason === 'max_tokens') {
      console.error('[leadScoring] risposta inutilizzabile:', msg.stop_reason)
      return { bonus: 0, reason: buildFallbackReason(lead, baseScore) }
    }

    const block = msg.content.find((b) => b.type === 'text')
    if (!block || block.type !== 'text') {
      return { bonus: 0, reason: buildFallbackReason(lead, baseScore) }
    }

    const parsed = JSON.parse(block.text) as {
      urgenza: boolean
      budget: boolean
      dettaglio: string
      esigenzeParticolari: boolean
      reason: string
    }

    return {
      bonus: bonusDa(parsed),
      reason: parsed.reason || buildFallbackReason(lead, baseScore),
    }
  } catch (err) {
    console.error('[leadScoring] AI refine error:', err)
    return {
      bonus: 0,
      reason: buildFallbackReason(lead, baseScore),
    }
  }
}

function buildFallbackReason(lead: Lead, score: number): string {
  const tipo = lead.tipo
  const profilo = lead.profilo ? ` — ${lead.profilo}` : ''
  if (score >= 70) return `Lead ad alto valore: ${tipo}${profilo}. Contattare entro oggi.`
  if (score >= 45) return `Lead con buon potenziale: ${tipo}${profilo}. Da contattare questa settimana.`
  return `Lead a bassa priorità: ${tipo}${profilo}. Gestire nei prossimi giorni.`
}

// ── 3. Funzione principale ─────────────────────────────────────────────────────

export async function scoreLead(lead: Lead): Promise<LeadScore> {
  const baseScore = computeBaseScore(lead)
  const { bonus, reason } = await aiRefine(lead, baseScore)

  const score = Math.max(1, Math.min(100, baseScore + bonus))
  const priority: LeadScore['priority'] =
    score >= 80 ? 'alta' :
    score >= 50 ? 'media' :
    'bassa'

  return { score, priority, reason }
}
