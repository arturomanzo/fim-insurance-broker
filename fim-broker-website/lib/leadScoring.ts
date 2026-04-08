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

const AI_SYSTEM = `Sei un esperto analista di lead per un broker assicurativo italiano (FIM Insurance Broker).
Il tuo compito è analizzare i dati di un lead e produrre:
1. Un bonus di punteggio (0–10) che si aggiunge al punteggio base calcolato dai dati strutturati
2. Una spiegazione sintetica in italiano (max 2 righe) per il team commerciale

Criteri per assegnare il bonus:
- Urgenza esplicita nel messaggio (es. "ho bisogno subito", "scade la polizza") → +8/10
- Budget o importi menzionati → +6/8
- Richiesta specifica e dettagliata → +5/7
- Menzione di sinistri passati, esigenze particolari → +4/6
- Messaggio generico o vuoto → +0/2

Rispondi SOLO con JSON valido, nessun testo fuori dal JSON:
{
  "bonus": <numero 0-10>,
  "reason": "<spiegazione breve in italiano per il team>"
}`

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
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      system: AI_SYSTEM,
      messages: [{ role: 'user', content: leadSummary }],
    })

    const text = msg.content[0].type === 'text' ? msg.content[0].text.trim() : ''
    const parsed = JSON.parse(text) as { bonus: number; reason: string }

    return {
      bonus: Math.max(0, Math.min(10, Math.round(parsed.bonus))),
      reason: parsed.reason ?? buildFallbackReason(lead, baseScore),
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
