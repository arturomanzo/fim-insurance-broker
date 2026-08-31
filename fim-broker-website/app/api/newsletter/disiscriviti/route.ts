/**
 * Disiscrizione dalla newsletter — /api/newsletter/disiscriviti?t=<token>
 *
 * POST: esegue la disiscrizione. Usato sia dal bottone della pagina di conferma
 * sia dal one-click dei client di posta (RFC 8058, header `List-Unsubscribe-Post`).
 *
 * Volutamente NON c'è un GET che disiscrive: i filtri antispam e le anteprime
 * dei client aprono i link delle email da soli, e cancellerebbero iscritti che
 * non hanno chiesto niente. Il link nell'email punta a una pagina, la pagina
 * chiede una conferma, la conferma è questo POST.
 */
import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { disiscrivi, verificaTokenDisiscrizione } from '@/lib/newsletterStore'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

/**
 * I client di posta che non implementano il one-click aprono l'URL di
 * `List-Unsubscribe` in GET. Qui non si disiscrive nessuno: si rimanda alla
 * pagina, che chiede conferma.
 */
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('t') ?? ''
  return NextResponse.redirect(
    `${BASE_URL}/newsletter/disiscriviti?t=${encodeURIComponent(token)}`,
    302,
  )
}

export async function POST(req: Request) {
  const { ok, retryAfter } = await rateLimit(req, { limit: 10, windowMs: 60 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche ora.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  // Il token può arrivare in query (one-click dei client di posta) o nel body.
  const url = new URL(req.url)
  let token = url.searchParams.get('t') ?? ''
  if (!token && (req.headers.get('content-type') ?? '').includes('application/json')) {
    const body = await req.json().catch(() => null)
    token = typeof body?.t === 'string' ? body.t : ''
  }

  const email = await verificaTokenDisiscrizione(token)
  if (!email) {
    return NextResponse.json({ error: 'Link non valido o scaduto.' }, { status: 400 })
  }

  try {
    await disiscrivi(email)
  } catch (err) {
    console.error('[newsletter/disiscriviti] errore:', err)
    return NextResponse.json(
      { error: 'Non siamo riusciti a completare la cancellazione. Scrivi a info@fimbroker.it.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, email })
}
