import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: Request) {
  const { ok, retryAfter } = rateLimit(req, { limit: 3, windowMs: 60 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche ora.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body = await req.json()
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Inserisci un indirizzo email valido.' }, { status: 400 })
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!resend || !audienceId) {
      // In sviluppo, logga e rispondi OK per non bloccare il frontend
      console.log('[newsletter] RESEND_API_KEY o RESEND_AUDIENCE_ID non configurati — iscrizione saltata:', email)
      return NextResponse.json({ ok: true })
    }

    await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    // Contatto già esistente (409) — non è un errore per l'utente
    if (
      err &&
      typeof err === 'object' &&
      'statusCode' in err &&
      (err as { statusCode: number }).statusCode === 409
    ) {
      return NextResponse.json({ ok: true })
    }

    console.error('[newsletter] errore:', err)
    return NextResponse.json(
      { error: 'Si è verificato un errore. Riprova tra qualche minuto.' },
      { status: 500 },
    )
  }
}
