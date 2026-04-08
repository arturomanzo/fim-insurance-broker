import fs from 'fs'
import path from 'path'
import { getSupabase } from './supabase'
import { scoreLead } from './leadScoring'

export interface Lead {
  id: string
  nome: string
  cognome: string
  email: string
  telefono: string
  tipo: string
  profilo?: string
  messaggio?: string
  timestamp: string
  stato: 'nuovo' | 'contattato' | 'chiuso'
  // Lead Scoring AI
  ai_score?: number                         // 1–100
  ai_priority?: 'alta' | 'media' | 'bassa'
  ai_reason?: string
  ai_scored_at?: string
}

// ── Supabase (primario) ────────────────────────────────────────────────────────

export async function saveLead(lead: Omit<Lead, 'stato'>): Promise<void> {
  const sb = getSupabase()
  if (sb) {
    const { error } = await sb.from('website_leads').insert({
      id: lead.id,
      nome: lead.nome,
      cognome: lead.cognome,
      email: lead.email,
      telefono: lead.telefono,
      tipo: lead.tipo,
      profilo: lead.profilo ?? null,
      messaggio: lead.messaggio ?? null,
      timestamp: lead.timestamp,
      stato: 'nuovo',
    })
    if (error) {
      console.error('[leadStore] Supabase insert error:', error.message)
      return
    }
    // Auto-scoring asincrono: non blocca la risposta al lead
    _autoScore({ ...lead, stato: 'nuovo' }).catch((e) =>
      console.error('[leadStore] Auto-scoring error:', e)
    )
    return
  }
  // Fallback: filesystem (solo sviluppo locale)
  const newLead: Lead = { ...lead, stato: 'nuovo' }
  _saveLeadFs(newLead)
  _autoScore(newLead).catch((e) => console.error('[leadStore] Auto-scoring error:', e))
}

async function _autoScore(lead: Lead): Promise<void> {
  const result = await scoreLead(lead)
  await updateLeadScore(lead.id, {
    ai_score: result.score,
    ai_priority: result.priority,
    ai_reason: result.reason,
    ai_scored_at: new Date().toISOString(),
  })
}

export async function getAllLeads(): Promise<Lead[]> {
  const sb = getSupabase()
  if (sb) {
    const { data, error } = await sb
      .from('website_leads')
      .select('*')
      .order('timestamp', { ascending: false })
    if (error) {
      console.error('[leadStore] Supabase select error:', error.message)
      return []
    }
    return (data ?? []) as Lead[]
  }
  return _readAllFs()
}

export async function getLeadsStats(): Promise<{
  total: number
  nuovi: number
  contattati: number
  chiusi: number
}> {
  const leads = await getAllLeads()
  return {
    total: leads.length,
    nuovi: leads.filter((l) => l.stato === 'nuovo').length,
    contattati: leads.filter((l) => l.stato === 'contattato').length,
    chiusi: leads.filter((l) => l.stato === 'chiuso').length,
  }
}

export async function updateLeadStato(id: string, stato: Lead['stato']): Promise<boolean> {
  const sb = getSupabase()
  if (sb) {
    const { error } = await sb
      .from('website_leads')
      .update({ stato })
      .eq('id', id)
    if (error) {
      console.error('[leadStore] Supabase update error:', error.message)
      return false
    }
    return true
  }
  return _updateLeadStatoFs(id, stato)
}

export async function updateLeadScore(
  id: string,
  score: { ai_score: number; ai_priority: 'alta' | 'media' | 'bassa'; ai_reason: string; ai_scored_at: string }
): Promise<boolean> {
  const sb = getSupabase()
  if (sb) {
    const { error } = await sb
      .from('website_leads')
      .update(score)
      .eq('id', id)
    if (error) {
      console.error('[leadStore] Supabase score update error:', error.message)
      return false
    }
    return true
  }
  return _updateLeadScoreFs(id, score)
}

// ── Fallback filesystem (solo sviluppo locale) ─────────────────────────────────

const DATA_PATH = path.join(process.cwd(), 'data', 'leads.json')

function _readAllFs(): Lead[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as Lead[]
  } catch {
    return []
  }
}

function _writeAllFs(leads: Lead[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2) + '\n', 'utf-8')
}

function _saveLeadFs(lead: Lead): void {
  const leads = _readAllFs()
  leads.unshift(lead)
  _writeAllFs(leads)
}

function _updateLeadStatoFs(id: string, stato: Lead['stato']): boolean {
  const leads = _readAllFs()
  const idx = leads.findIndex((l) => l.id === id)
  if (idx === -1) return false
  leads[idx].stato = stato
  _writeAllFs(leads)
  return true
}

function _updateLeadScoreFs(
  id: string,
  score: { ai_score: number; ai_priority: 'alta' | 'media' | 'bassa'; ai_reason: string; ai_scored_at: string }
): boolean {
  const leads = _readAllFs()
  const idx = leads.findIndex((l) => l.id === id)
  if (idx === -1) return false
  leads[idx] = { ...leads[idx], ...score }
  _writeAllFs(leads)
  return true
}
