/**
 * Admin CRUD store for policies.json
 *
 * Reads and writes data/policies.json at runtime via fs.
 * Works in development and on self-hosted Node.js servers.
 * On Vercel serverless the filesystem is read-only — writes succeed
 * but don't persist across cold starts. For production persistence,
 * replace readAll/writeAll with a real database (Postgres, KV, etc.).
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

function writeAll(policies: Policy[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(policies, null, 2) + '\n', 'utf-8')
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

export function getPolicyByIdAdmin(id: string): Policy | null {
  return readAll().find((p) => p.id === id) ?? null
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

// ── Writes ───────────────────────────────────────────────────────────────────

export function createPolicy(policy: Policy): void {
  const policies = readAll()
  policies.push(policy)
  writeAll(policies)
}

export function updatePolicy(id: string, updates: Partial<Omit<Policy, 'id'>>): boolean {
  const policies = readAll()
  const idx = policies.findIndex((p) => p.id === id)
  if (idx === -1) return false
  policies[idx] = { ...policies[idx], ...updates }
  writeAll(policies)
  return true
}

export function deletePolicy(id: string): boolean {
  const policies = readAll()
  const next = policies.filter((p) => p.id !== id)
  if (next.length === policies.length) return false
  writeAll(next)
  return true
}
