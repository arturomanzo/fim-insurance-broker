import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getAllLeads, updateLeadStato } from '@/lib/leadStore'
import type { Lead } from '@/lib/leadStore'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value) return false
  return verifyAdminToken(session.value)
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }
  return NextResponse.json(getAllLeads())
}

export async function PATCH(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }
  const { id, stato } = await req.json() as { id: string; stato: Lead['stato'] }
  const ok = updateLeadStato(id, stato)
  if (!ok) return NextResponse.json({ error: 'Lead non trovato' }, { status: 404 })
  return NextResponse.json({ success: true })
}
