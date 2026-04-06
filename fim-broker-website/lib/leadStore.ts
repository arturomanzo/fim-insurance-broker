import fs from 'fs'
import path from 'path'

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
}

const DATA_PATH = path.join(process.cwd(), 'data', 'leads.json')

function readAll(): Lead[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as Lead[]
  } catch {
    return []
  }
}

function writeAll(leads: Lead[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2) + '\n', 'utf-8')
}

export function saveLead(lead: Omit<Lead, 'stato'>): void {
  const leads = readAll()
  leads.unshift({ ...lead, stato: 'nuovo' })
  writeAll(leads)
}

export function getAllLeads(): Lead[] {
  return readAll()
}

export function getLeadsStats() {
  const leads = readAll()
  return {
    total: leads.length,
    nuovi: leads.filter((l) => l.stato === 'nuovo').length,
    contattati: leads.filter((l) => l.stato === 'contattato').length,
    chiusi: leads.filter((l) => l.stato === 'chiuso').length,
  }
}

export function updateLeadStato(id: string, stato: Lead['stato']): boolean {
  const leads = readAll()
  const idx = leads.findIndex((l) => l.id === id)
  if (idx === -1) return false
  leads[idx].stato = stato
  writeAll(leads)
  return true
}
