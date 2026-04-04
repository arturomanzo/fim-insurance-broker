import policiesRaw from '@/data/policies.json'

export interface PolicyDocument {
  nome: string
  url: string
  tipo: 'polizza' | 'appendice' | 'quietanza' | 'altro'
}

export interface Policy {
  id: string
  clientEmail: string
  clientName: string
  tipo: string
  compagnia: string
  numeroPolizza: string
  dataInizio: string   // YYYY-MM-DD
  dataScadenza: string // YYYY-MM-DD
  premioAnnuo: number
  massimale?: string
  note?: string
  documenti: PolicyDocument[]
}

export type PolicyStatus = 'attiva' | 'in-scadenza' | 'scaduta'

export interface PolicyWithStatus extends Policy {
  stato: PolicyStatus
  giorniAllaScadenza: number
}

const policies: Policy[] = policiesRaw as Policy[]

function computeStatus(dataScadenza: string): { stato: PolicyStatus; giorniAllaScadenza: number } {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(dataScadenza)
  expiry.setHours(0, 0, 0, 0)
  const diffMs = expiry.getTime() - today.getTime()
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24))

  let stato: PolicyStatus
  if (days < 0) stato = 'scaduta'
  else if (days <= 60) stato = 'in-scadenza'
  else stato = 'attiva'

  return { stato, giorniAllaScadenza: days }
}

export function getPoliciesForEmail(email: string): PolicyWithStatus[] {
  return policies
    .filter((p) => p.clientEmail.toLowerCase() === email.toLowerCase())
    .map((p) => ({ ...p, ...computeStatus(p.dataScadenza) }))
    .sort((a, b) => new Date(a.dataScadenza).getTime() - new Date(b.dataScadenza).getTime())
}

export function getPolicyById(id: string, email: string): PolicyWithStatus | null {
  const p = policies.find((p) => p.id === id && p.clientEmail.toLowerCase() === email.toLowerCase())
  if (!p) return null
  return { ...p, ...computeStatus(p.dataScadenza) }
}

/** For renewal reminders — returns all policies expiring in exactly N days */
export function getPoliciesExpiringInDays(days: number): Policy[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
  const targetStr = target.toISOString().slice(0, 10)
  return policies.filter((p) => p.dataScadenza === targetStr)
}

export function isEmailRegistered(email: string): boolean {
  return policies.some((p) => p.clientEmail.toLowerCase() === email.toLowerCase())
}
