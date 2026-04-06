import fs from 'fs'
import path from 'path'

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

const DATA_PATH = path.join(process.cwd(), 'data', 'sinistri.json')

function readAll(): SinistroRecord[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as SinistroRecord[]
  } catch {
    return []
  }
}

function writeAll(sinistri: SinistroRecord[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(sinistri, null, 2) + '\n', 'utf-8')
}

export function saveSinistro(sinistro: Omit<SinistroRecord, 'stato'>): void {
  const sinistri = readAll()
  sinistri.unshift({ ...sinistro, stato: 'aperto' })
  writeAll(sinistri)
}

export function getAllSinistri(): SinistroRecord[] {
  return readAll()
}

export function getSinistriStats() {
  const sinistri = readAll()
  return {
    total: sinistri.length,
    aperti: sinistri.filter((s) => s.stato === 'aperto').length,
    inLavorazione: sinistri.filter((s) => s.stato === 'in-lavorazione').length,
    chiusi: sinistri.filter((s) => s.stato === 'chiuso').length,
  }
}

export function updateSinistrStato(id: string, stato: SinistroRecord['stato']): boolean {
  const sinistri = readAll()
  const idx = sinistri.findIndex((s) => s.id === id)
  if (idx === -1) return false
  sinistri[idx].stato = stato
  writeAll(sinistri)
  return true
}
