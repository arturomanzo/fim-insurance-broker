import { NextRequest, NextResponse } from 'next/server'
import { hasTokenFormat, SESSION_COOKIE } from '@/lib/clientAuth'
import { hasAdminTokenFormat, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'

// GET is allowed only for these specific API paths
const API_GET_ALLOWED = new Set([
  '/api/area-cliente/verify',
  '/api/cron/reminder-rinnovi',
])

/**
 * Security middleware
 *
 * 1. Protects /admin/* pages (except /admin/login) with admin session check
 * 2. Protects /area-cliente/dashboard and /area-cliente/polizza with client session check
 * 3. Protects /api/admin/* endpoints (full REST methods, admin session required)
 * 4. Enforces Content-Type, User-Agent and method restrictions on all other /api/* routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method

  // ── Admin page protection ─────────────────────────────────────────────────
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE)
    if (!session?.value || !hasAdminTokenFormat(session.value)) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.next()
  }

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
    return NextResponse.next()
  }

  // ── Not an API route — pass through ──────────────────────────────────────
  if (!pathname.startsWith('/api/')) return NextResponse.next()

  // ── User-Agent check ──────────────────────────────────────────────────────
  const userAgent = request.headers.get('user-agent') ?? ''
  if (!userAgent.trim()) {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
  }

  // ── Admin API: full REST methods, requires admin session ──────────────────
  if (pathname.startsWith('/api/admin/')) {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE)
    if (!session?.value || !hasAdminTokenFormat(session.value)) {
      return NextResponse.json({ error: 'Non autorizzato.' }, { status: 401 })
    }
    const adminAllowed = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD']
    if (!adminAllowed.includes(method)) {
      return NextResponse.json({ error: 'Metodo non consentito.' }, { status: 405 })
    }
    if ((method === 'POST' || method === 'PUT') && !request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type non supportato.' }, { status: 415 })
    }
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  // ── GET whitelisted for specific public API endpoints ─────────────────────
  if (method === 'GET' && API_GET_ALLOWED.has(pathname)) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  // ── Content-Type enforcement for POST ─────────────────────────────────────
  if (method === 'POST') {
    const ct = request.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type non supportato' }, { status: 415 })
    }
  }

  // ── Block non-allowed methods ─────────────────────────────────────────────
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
    '/admin/:path*',
    '/area-cliente/dashboard/:path*',
    '/area-cliente/polizza/:path*',
  ],
}
