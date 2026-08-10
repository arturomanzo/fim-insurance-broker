/**
 * Admin read-only store for policies.json
 *
 * Reads data/policies.json at runtime via fs (dati demo/seed).
 * Il pannello admin è di sola lettura: l'anagrafica polizze è di proprietà
 * del gestionale esterno (CRM). Per mostrare dati reali, sostituire readAll()
 * con una chiamata all'API di lettura del gestionale
 * (GET ${GESTIONALE_API_URL}/api/website/...), riusando il pattern Bearer
 * già presente in app/api/preventivo/route.ts.
 */

import fs from 'fs'
import path from 'path'
import type { Policy, PolicyWithStatus } from './policyData'

const DATA_PATH = path.join(process.cwd(), 'data', 'policies.json')

function readAll(): Policy[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as Policy[]
  } catch {
    return []
  }
}

function computeStatus(dataScadenza: string): { stato: PolicyWithStatus['stato']; giorniAllaScadenza: number } {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const expiry = new Date(dataScadenza); expiry.setHours(0, 0, 0, 0)
  const days = Math.round((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return {
    stato: days < 0 ? 'scaduta' : days <= 60 ? 'in-scadenza' : 'attiva',
    giorniAllaScadenza: days,
  }
}

// ── Reads ────────────────────────────────────────────────────────────────────

export function getAllPolicies(): PolicyWithStatus[] {
  return readAll().map((p) => ({ ...p, ...computeStatus(p.dataScadenza) }))
}

export interface ClientSummary {
  email: string
  name: string
  totalPolicies: number
  activePolicies: number
  expiringPolicies: number
  expiredPolicies: number
}

export function getAllClients(): ClientSummary[] {
  const policies = readAll()
  const map = new Map<string, ClientSummary>()
  for (const p of policies) {
    const { stato } = computeStatus(p.dataScadenza)
    const existing = map.get(p.clientEmail) ?? {
      email: p.clientEmail,
      name: p.clientName,
      totalPolicies: 0,
      activePolicies: 0,
      expiringPolicies: 0,
      expiredPolicies: 0,
    }
    existing.totalPolicies++
    if (stato === 'attiva') existing.activePolicies++
    else if (stato === 'in-scadenza') existing.expiringPolicies++
    else existing.expiredPolicies++
    map.set(p.clientEmail, existing)
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export function getClientPolicies(email: string): PolicyWithStatus[] {
  return readAll()
    .filter((p) => p.clientEmail.toLowerCase() === email.toLowerCase())
    .map((p) => ({ ...p, ...computeStatus(p.dataScadenza) }))
    .sort((a, b) => new Date(a.dataScadenza).getTime() - new Date(b.dataScadenza).getTime())
}

export interface DashboardStats {
  totalClients: number
  totalPolicies: number
  activePolicies: number
  expiringIn30: number
  expiringIn60: number
  expiredPolicies: number
  totalPremioAnnuo: number
}

export function getDashboardStats(): DashboardStats {
  const policies = readAll()
  const emails = new Set(policies.map((p) => p.clientEmail))
  let active = 0, exp30 = 0, exp60 = 0, expired = 0, totalPremio = 0
  for (const p of policies) {
    const { stato, giorniAllaScadenza } = computeStatus(p.dataScadenza)
    if (stato === 'attiva') active++
    else if (stato === 'in-scadenza') {
      if (giorniAllaScadenza <= 30) exp30++
      else exp60++
    } else expired++
    if (stato !== 'scaduta') totalPremio += p.premioAnnuo
  }
  return {
    totalClients: emails.size,
    totalPolicies: policies.length,
    activePolicies: active,
    expiringIn30: exp30,
    expiringIn60: exp60,
    expiredPolicies: expired,
    totalPremioAnnuo: totalPremio,
  }
}
