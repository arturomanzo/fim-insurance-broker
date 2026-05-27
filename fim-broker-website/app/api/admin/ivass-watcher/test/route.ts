/**
 * Trigger manuale del watcher IVASS (solo admin loggato).
 *
 * GET /api/admin/ivass-watcher/test
 *
 * Esegue lo stesso codice del cron giornaliero ma autenticando con sessione admin
 * invece di Bearer CRON_SECRET. Utile per:
 *  - test post-deploy senza aspettare le 06:00 UTC
 *  - verifica configurazione email/Anthropic/Supabase
 *  - debug di un nuovo source o di un nuovo prompt di triage
 *
 * NB: chiama l'endpoint cron internamente per non duplicare la logica.
 */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value) return false
  return verifyAdminToken(session.value)
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }
  const secret = process.env.CRON_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'CRON_SECRET non configurato — impossibile triggerare il watcher.' },
      { status: 503 },
    )
  }

  try {
    const res = await fetch(`${BASE_URL}/api/cron/ivass-watcher`, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: 'no-store',
    })
    const body = await res.json()
    return NextResponse.json({ trigger: 'manual', ok: res.ok, status: res.status, body })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
