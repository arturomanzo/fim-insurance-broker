import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'
import { generateToken, MAGIC_LINK_TTL_SECONDS } from '@/lib/clientAuth'
import { isEmailRegistered } from '@/lib/policyData'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function buildMagicLinkEmail(nome: string, magicLink: string): string {
  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:20px;">
  <div style="max-width:520px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
    <div style="background:linear-gradient(135deg,#091d47,#0f2d6b);padding:32px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:20px;font-weight:900;">Accedi alla tua Area Cliente</h1>
      <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">FIM Insurance Broker</p>
    </div>
    <div style="padding:36px 32px;text-align:center;">
      <p style="font-size:15px;color:#1e293b;margin:0 0 8px;">Ciao${nome ? ` <strong>${nome}</strong>` : ''},</p>
      <p style="font-size:14px;color:#475569;line-height:1.7;margin:0 0 28px;">
        Clicca il pulsante qui sotto per accedere in modo sicuro alla tua area personale.<br>
        Il link è valido per <strong>1 ora</strong> e può essere usato una sola volta.
      </p>
      <a href="${magicLink}"
         style="display:inline-block;background:#0f2d6b;color:white;padding:16px 40px;border-radius:12px;text-decoration:none;font-weight:700;font-size:16px;letter-spacing:0.3px;">
        Accedi all'Area Cliente →
      </a>
      <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">
        Se non hai richiesto questo accesso, ignora questa email.
      </p>
      <p style="margin:8px 0 0;font-size:11px;color:#cbd5e1;word-break:break-all;">
        Link: <a href="${magicLink}" style="color:#94a3b8;">${magicLink}</a>
      </p>
    </div>
    <div style="background:#0f2d6b;padding:16px 32px;">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);text-align:center;">
        FIM Insurance Broker S.r.l. — <a href="${BASE_URL}/privacy-policy" style="color:rgba(255,255,255,0.4);">Privacy Policy</a>
      </p>
    </div>
  </div>
</body></html>`
}

export async function POST(req: NextRequest) {
  const { ok, retryAfter } = rateLimit(req, { limit: 5, windowMs: 15 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppi tentativi. Riprova tra qualche minuto.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body = await req.json()
    const email = String(body.email ?? '').trim().toLowerCase()
    const next = String(body.next ?? '').trim()

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'Indirizzo email non valido.' }, { status: 400 })
    }

    // Always respond with success to avoid email enumeration
    // but only actually send the email if registered
    if (isEmailRegistered(email)) {
      const token = await generateToken(email, MAGIC_LINK_TTL_SECONDS)
      const redirectPath = next && next.startsWith('/area-cliente') ? next : '/area-cliente/dashboard'
      const magicLink = `${BASE_URL}/api/area-cliente/verify?token=${encodeURIComponent(token)}&next=${encodeURIComponent(redirectPath)}`

      if (resend) {
        await resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'Il tuo link di accesso — Area Cliente FIM',
          html: buildMagicLinkEmail('', magicLink),
        })
      } else if (process.env.NODE_ENV !== 'production') {
        console.log('[DEV] Magic link (email non inviata — imposta RESEND_API_KEY):', magicLink)
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Errore interno. Riprova.' }, { status: 500 })
  }
}
