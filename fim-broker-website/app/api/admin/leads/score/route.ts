/**
 * POST /api/admin/leads/score
 *
 * Calcola (o ricalcola) il Lead Score AI per uno o più lead.
 *
 * Body JSON:
 *   { "id": "abc123" }         → scorea un singolo lead
 *   { "all": true }            → scorea tutti i lead non ancora analizzati
 *   { "all": true, "force": true } → ricalcola tutti (anche già analizzati)
 *
 * Risponde con:
 *   { success: true, scored: number }
 */

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getAllLeads, updateLeadScore } from '@/lib/leadStore'
import { scoreLead } from '@/lib/leadScoring'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value) return false
  return verifyAdminToken(session.value)
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  const body = await req.json() as { id?: string; all?: boolean; force?: boolean }

  const allLeads = await getAllLeads()
  let toScore = allLeads

  if (body.id) {
    // Singolo lead
    const found = allLeads.find((l) => l.id === body.id)
    if (!found) return NextResponse.json({ error: 'Lead non trovato' }, { status: 404 })
    toScore = [found]
  } else if (body.all) {
    // Tutti — se force=false, salta quelli già analizzati
    toScore = body.force ? allLeads : allLeads.filter((l) => !l.ai_score)
  } else {
    return NextResponse.json({ error: 'Specifica "id" o "all"' }, { status: 400 })
  }

  let scored = 0
  for (const lead of toScore) {
    try {
      const result = await scoreLead(lead)
      await updateLeadScore(lead.id, {
        ai_score: result.score,
        ai_priority: result.priority,
        ai_reason: result.reason,
        ai_scored_at: new Date().toISOString(),
      })
      scored++
    } catch (err) {
      console.error(`[lead-score] Errore su lead ${lead.id}:`, err)
    }
  }

  return NextResponse.json({ success: true, scored })
}
