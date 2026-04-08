import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getAllSinistri, updateSinistrStato } from '@/lib/sinistriStore'
import type { SinistroRecord } from '@/lib/sinistriStore'

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
  return NextResponse.json(await getAllSinistri())
}

export async function PATCH(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }
  const { id, stato } = await req.json() as { id: string; stato: SinistroRecord['stato'] }
  const ok = await updateSinistrStato(id, stato)
  if (!ok) return NextResponse.json({ error: 'Sinistro non trovato' }, { status: 404 })
  return NextResponse.json({ success: true })
}
