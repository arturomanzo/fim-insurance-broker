import { NextRequest, NextResponse } from 'next/server'
import { hasTokenFormat, SESSION_COOKIE } from '@/lib/clientAuth'

// GET is allowed only for these specific API paths
const API_GET_ALLOWED = new Set([
  '/api/area-cliente/verify',
  '/api/cron/reminder-rinnovi',
])

/**
 * Security middleware
 *
 * 1. Protects /area-cliente/dashboard and /area-cliente/polizza with session check
 * 2. Enforces Content-Type, User-Agent and method restrictions on /api/* routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method

  // ── Area Cliente auth protection ──────────────────────────────────────────
  if (
    pathname.startsWith('/area-cliente/dashboard') ||
    pathname.startsWith('/area-cliente/polizza')
  ) {
    const session = request.cookies.get(SESSION_COOKIE)
    if (!session?.value || !hasTokenFormat(session.value)) {
      const loginUrl = new URL('/area-cliente', request.url)
      loginUrl.searchParams.set('expired', '1')
      return NextResponse.redirect(loginUrl)
    }
    // Full cryptographic verify happens in the server component
    return NextResponse.next()
  }

  // ── API security ───────────────────────────────────────────────────────────
  if (!pathname.startsWith('/api/')) return NextResponse.next()

  // User-Agent check — blocks basic automated tools without UA
  const userAgent = request.headers.get('user-agent') ?? ''
  if (!userAgent.trim()) {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
  }

  // Allow GET for specific whitelisted API endpoints
  if (method === 'GET' && API_GET_ALLOWED.has(pathname)) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  // Content-Type enforcement for POST
  if (method === 'POST') {
    const ct = request.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type non supportato' }, { status: 415 })
    }
  }

  // Block any other non-allowed methods
  const allowedMethods = ['POST', 'OPTIONS', 'HEAD']
  if (!allowedMethods.includes(method)) {
    return NextResponse.json(
      { error: 'Metodo non consentito' },
      { status: 405, headers: { Allow: 'POST' } },
    )
  }

  const response = NextResponse.next()
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  response.headers.set('Cache-Control', 'no-store')
  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/area-cliente/dashboard/:path*',
    '/area-cliente/polizza/:path*',
  ],
}
