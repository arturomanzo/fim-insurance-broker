import { NextRequest, NextResponse } from 'next/server'

/**
 * Security middleware — applicato solo alle route /api/*.
 *
 * Controlli:
 * 1. Content-Type: le richieste POST alle API devono dichiarare application/json
 * 2. User-Agent: blocca richieste prive di User-Agent (automated tool senza header)
 * 3. Aggiunge X-Robots-Tag alle risposte API per impedire indicizzazione
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const method = request.method

  // --- 1. User-Agent vuoto → 400 -----------------------------------------------
  // I bot più elementari non inviano User-Agent.
  // Nota: un attaccante può facilmente falsificarlo, ma filtra la maggior parte
  // dei tool automatizzati non configurati.
  const userAgent = request.headers.get('user-agent') ?? ''
  if (!userAgent.trim()) {
    return NextResponse.json(
      { error: 'Richiesta non valida' },
      { status: 400 },
    )
  }

  // --- 2. Content-Type enforcement per POST ------------------------------------
  // Le API del sito accettano esclusivamente JSON.
  // Un Content-Type errato indica richieste malformate o cross-site (CSRF probe).
  if (method === 'POST') {
    const ct = request.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type non supportato' },
        { status: 415 },
      )
    }
  }

  // --- 3. Blocca metodi non consentiti sulle API --------------------------------
  // Le API del sito usano solo POST. HEAD e OPTIONS sono consentiti dai browser.
  const allowedMethods = ['POST', 'OPTIONS', 'HEAD']
  if (!allowedMethods.includes(method)) {
    return NextResponse.json(
      { error: 'Metodo non consentito' },
      { status: 405, headers: { Allow: 'POST' } },
    )
  }

  // --- Pass-through con header aggiuntivi --------------------------------------
  const response = NextResponse.next()

  // Impedisce ai crawler di indicizzare le risposte API
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')

  // Evita che il browser memorizzi le risposte API
  response.headers.set('Cache-Control', 'no-store')

  return response
}

export const config = {
  // Applica il middleware solo alle route /api/* (non alle pagine)
  matcher: '/api/:path*',
}
