import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, generateToken, SESSION_COOKIE, SESSION_TTL_SECONDS } from '@/lib/clientAuth'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const token = searchParams.get('token') ?? ''
  const next = searchParams.get('next') ?? '/area-cliente/dashboard'

  // Validate next path to avoid open redirect
  const safePath = next.startsWith('/area-cliente') ? next : '/area-cliente/dashboard'

  const email = await verifyToken(token)

  if (!email) {
    // Invalid or expired token — redirect to login with error
    return NextResponse.redirect(new URL('/area-cliente?expired=1', BASE_URL))
  }

  // Issue a fresh session token with 30-day TTL
  const sessionToken = await generateToken(email, SESSION_TTL_SECONDS)

  const response = NextResponse.redirect(new URL(safePath, BASE_URL))
  response.cookies.set(SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  })

  return response
}
