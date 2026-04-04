import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminPassword, generateAdminToken, ADMIN_SESSION_COOKIE, ADMIN_SESSION_TTL } from '@/lib/adminAuth'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  const { ok, retryAfter } = rateLimit(req, { limit: 10, windowMs: 15 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppi tentativi. Riprova tra qualche minuto.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const { password } = await req.json()
    if (!verifyAdminPassword(String(password ?? ''))) {
      return NextResponse.json({ error: 'Password errata.' }, { status: 401 })
    }

    const token = await generateAdminToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_SESSION_TTL,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Errore interno.' }, { status: 500 })
  }
}
