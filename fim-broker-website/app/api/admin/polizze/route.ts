import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { createPolicy } from '@/lib/policyStore'
import type { Policy } from '@/lib/policyData'

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

  try {
    const body = await req.json()

    const required = ['clientEmail', 'clientName', 'tipo', 'compagnia', 'numeroPolizza', 'dataInizio', 'dataScadenza', 'premioAnnuo']
    for (const field of required) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json({ error: `Campo obbligatorio mancante: ${field}` }, { status: 400 })
      }
    }

    const policy: Policy = {
      id: `pol-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      clientEmail: String(body.clientEmail).trim().toLowerCase(),
      clientName: String(body.clientName).trim(),
      tipo: String(body.tipo).trim(),
      compagnia: String(body.compagnia).trim(),
      numeroPolizza: String(body.numeroPolizza).trim(),
      dataInizio: String(body.dataInizio),
      dataScadenza: String(body.dataScadenza),
      premioAnnuo: Number(body.premioAnnuo),
      massimale: body.massimale ? String(body.massimale).trim() : undefined,
      note: body.note ? String(body.note).trim() : undefined,
      documenti: Array.isArray(body.documenti) ? body.documenti : [],
    }

    createPolicy(policy)
    return NextResponse.json({ success: true, id: policy.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Errore interno.' }, { status: 500 })
  }
}
