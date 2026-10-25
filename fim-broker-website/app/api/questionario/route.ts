import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { chiamaGestionale, tokenValido } from '@/lib/questionario'

/**
 * POST /api/questionario — dal modulo del questionario richieste ed esigenze.
 *   { azione: 'compila', token, risposte, dichiarazioni } → codice da mandare su WhatsApp
 *   { azione: 'stato', token }                            → per sapere quando è arrivata la conferma
 * Le risposte le controlla il gestionale: qui passano solo token valido, IP e browser.
 */
export async function POST(req: NextRequest) {
  const { ok, retryAfter } = await rateLimit(req, { limit: 60, windowMs: 15 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppi tentativi. Riprova tra qualche minuto.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body || !tokenValido(body.token)) {
    return NextResponse.json({ error: 'Link non valido.' }, { status: 400 })
  }

  const corpo =
    body.azione === 'compila'
      ? {
          azione: 'compila',
          token: body.token,
          risposte: body.risposte,
          dichiarazioni: body.dichiarazioni,
          ip: (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || null,
          browser: req.headers.get('user-agent'),
        }
      : body.azione === 'stato'
        ? { azione: 'apri', token: body.token }
        : null
  if (!corpo) return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 })

  const res = await chiamaGestionale(corpo)
  if (!res) {
    return NextResponse.json(
      { error: "In questo momento non riusciamo a salvare il questionario. Riprova tra qualche minuto o chiamaci al +39 06 96883381." },
      { status: 503 },
    )
  }
  const dati = (await res.json().catch(() => ({}))) as Record<string, unknown>
  if (!res.ok) {
    return NextResponse.json({ error: typeof dati.error === 'string' ? dati.error : "Errore nell'invio. Riprova o contattaci al +39 06 96883381." }, { status: res.status })
  }
  // Allo stato serve solo sapere se è firmato: le domande la pagina le ha già.
  if (body.azione === 'stato') return NextResponse.json({ stato: dati.stato })
  return NextResponse.json(dati)
}
