import { NextRequest, NextResponse } from 'next/server'
import { updatePolicy, deletePolicy } from '@/lib/policyStore'

interface Params { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await req.json()

    const updates: Record<string, unknown> = {}
    const allowed = ['clientEmail', 'clientName', 'tipo', 'compagnia', 'numeroPolizza', 'dataInizio', 'dataScadenza', 'premioAnnuo', 'massimale', 'note', 'documenti']
    for (const key of allowed) {
      if (key in body) updates[key] = body[key]
    }
    if ('premioAnnuo' in updates) updates.premioAnnuo = Number(updates.premioAnnuo)
    if ('clientEmail' in updates) updates.clientEmail = String(updates.clientEmail).trim().toLowerCase()

    const ok = updatePolicy(id, updates)
    if (!ok) return NextResponse.json({ error: 'Polizza non trovata.' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Errore interno.' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const ok = deletePolicy(id)
    if (!ok) return NextResponse.json({ error: 'Polizza non trovata.' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Errore interno.' }, { status: 500 })
  }
}
