/**
 * Approvazione e invio della newsletter — POST /api/newsletter/invia
 *
 * Il token firmato è l'unica chiave: chi ha il link approva. Vive 14 giorni e
 * vale per un solo periodo, e l'invio controlla che la riga sia ancora in stato
 * `bozza`, quindi ricaricare la pagina non spedisce due volte.
 *
 * Nessun GET che spedisce, per lo stesso motivo della disiscrizione: i filtri
 * antispam aprono i link da soli, e qui il link fa partire un invio a tutta la
 * lista.
 */
import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { verificaTokenApprovazione, inviaNewsletter } from '@/lib/newsletterInvio'

export const maxDuration = 60

export async function POST(req: Request) {
  const { ok, retryAfter } = await rateLimit(req, { limit: 5, windowMs: 60 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche ora.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  const body = await req.json().catch(() => null)
  const token = typeof body?.t === 'string' ? body.t : ''

  const periodo = await verificaTokenApprovazione(token)
  if (!periodo) {
    return NextResponse.json({ error: 'Link non valido o scaduto.' }, { status: 400 })
  }

  try {
    const esito = await inviaNewsletter(periodo)
    return NextResponse.json({ ok: true, ...esito })
  } catch (err) {
    const messaggio = err instanceof Error ? err.message : String(err)
    console.error('[newsletter/invia] errore:', messaggio)
    return NextResponse.json({ error: messaggio }, { status: 500 })
  }
}
