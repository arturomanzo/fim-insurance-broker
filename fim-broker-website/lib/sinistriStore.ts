import fs from 'fs'
import path from 'path'
import { getSupabase } from './supabase'

export interface SinistroRecord {
  id: string
  nome: string
  cognome: string
  email: string
  telefono: string
  tipoSinistro: string
  dataEvento: string
  numeroPolizza?: string
  compagnia?: string
  descrizione: string
  timestamp: string
  stato: 'aperto' | 'in-lavorazione' | 'chiuso'
}

// ── Supabase (primario) ────────────────────────────────────────────────────────

export async function saveSinistro(sinistro: Omit<SinistroRecord, 'stato'>): Promise<void> {
  const sb = getSupabase()
  if (sb) {
    const { error } = await sb.from('website_sinistri').insert({
      id: sinistro.id,
      nome: sinistro.nome,
      cognome: sinistro.cognome,
      email: sinistro.email,
      telefono: sinistro.telefono,
      tipo_sinistro: sinistro.tipoSinistro,
      data_evento: sinistro.dataEvento,
      numero_polizza: sinistro.numeroPolizza ?? null,
      compagnia: sinistro.compagnia ?? null,
      descrizione: sinistro.descrizione,
      timestamp: sinistro.timestamp,
      stato: 'aperto',
    })
    if (error) console.error('[sinistriStore] Supabase insert error:', error.message)
    return
  }
  _saveSinistroFs({ ...sinistro, stato: 'aperto' })
}

export async function getAllSinistri(): Promise<SinistroRecord[]> {
  const sb = getSupabase()
  if (sb) {
    const { data, error } = await sb
      .from('website_sinistri')
      .select('*')
      .order('timestamp', { ascending: false })
    if (error) {
      console.error('[sinistriStore] Supabase select error:', error.message)
      return []
    }
    return (data ?? []).map(_mapRow)
  }
  return _readAllFs()
}

export async function getSinistriStats(): Promise<{
  total: number
  aperti: number
  inLavorazione: number
  chiusi: number
}> {
  const sinistri = await getAllSinistri()
  return {
    total: sinistri.length,
    aperti: sinistri.filter((s) => s.stato === 'aperto').length,
    inLavorazione: sinistri.filter((s) => s.stato === 'in-lavorazione').length,
    chiusi: sinistri.filter((s) => s.stato === 'chiuso').length,
  }
}

export async function updateSinistrStato(id: string, stato: SinistroRecord['stato']): Promise<boolean> {
  const sb = getSupabase()
  if (sb) {
    const { error } = await sb
      .from('website_sinistri')
      .update({ stato })
      .eq('id', id)
    if (error) {
      console.error('[sinistriStore] Supabase update error:', error.message)
      return false
    }
    return true
  }
  return _updateSinistrStatoFs(id, stato)
}

// Supabase usa snake_case, JS usa camelCase
function _mapRow(row: Record<string, unknown>): SinistroRecord {
  return {
    id: row.id as string,
    nome: row.nome as string,
    cognome: row.cognome as string,
    email: row.email as string,
    telefono: row.telefono as string,
    tipoSinistro: row.tipo_sinistro as string,
    dataEvento: row.data_evento as string,
    numeroPolizza: row.numero_polizza as string | undefined,
    compagnia: row.compagnia as string | undefined,
    descrizione: row.descrizione as string,
    timestamp: row.timestamp as string,
    stato: row.stato as SinistroRecord['stato'],
  }
}

// ── Fallback filesystem (solo sviluppo locale) ─────────────────────────────────

const DATA_PATH = path.join(process.cwd(), 'data', 'sinistri.json')

function _readAllFs(): SinistroRecord[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as SinistroRecord[]
  } catch {
    return []
  }
}

function _writeAllFs(sinistri: SinistroRecord[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(sinistri, null, 2) + '\n', 'utf-8')
}

function _saveSinistroFs(sinistro: SinistroRecord): void {
  const sinistri = _readAllFs()
  sinistri.unshift(sinistro)
  _writeAllFs(sinistri)
}

function _updateSinistrStatoFs(id: string, stato: SinistroRecord['stato']): boolean {
  const sinistri = _readAllFs()
  const idx = sinistri.findIndex((s) => s.id === id)
  if (idx === -1) return false
  sinistri[idx].stato = stato
  _writeAllFs(sinistri)
  return true
}
