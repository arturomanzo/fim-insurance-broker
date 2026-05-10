import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Resend } from 'resend'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { generateToken, MAGIC_LINK_TTL_SECONDS } from '@/lib/clientAuth'
import { getAllClients } from '@/lib/policyStore'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value) return false
  return verifyAdminToken(session.value)
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email mancante.' }, { status: 400 })

    const clients = getAllClients()
    const client = clients.find((c) => c.email.toLowerCase() === String(email).toLowerCase())
    if (!client) return NextResponse.json({ error: 'Nessun cliente trovato con questa email.' }, { status: 404 })

    const token = await generateToken(client.email, MAGIC_LINK_TTL_SECONDS)
    const magicLink = `${BASE_URL}/api/area-cliente/verify?token=${encodeURIComponent(token)}&next=${encodeURIComponent('/area-cliente/dashboard')}`

    if (resend) {
      await resend.emails.send({
        from: FIM_FROM,
        to: [client.email],
        subject: 'Accedi alla tua Area Cliente FIM — link di accesso',
        html: `<!DOCTYPE html><html lang="it"><body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:20px;">
  <div style="max-width:520px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
    <div style="background:linear-gradient(135deg,#060f1d,#0B1F3A);padding:32px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:20px;font-weight:900;">Accedi alla tua Area Cliente</h1>
    </div>
    <div style="padding:36px 32px;text-align:center;">
      <p style="font-size:15px;color:#1e293b;">Ciao <strong>${client.name}</strong>,</p>
      <p style="font-size:14px;color:#475569;line-height:1.7;margin-bottom:28px;">
        Il tuo consulente FIM ti ha inviato un link di accesso sicuro alla tua area personale.<br>
        Valido per <strong>1 ora</strong>.
      </p>
      <a href="${magicLink}" style="display:inline-block;background:#0B1F3A;color:white;padding:16px 40px;border-radius:12px;text-decoration:none;font-weight:700;font-size:16px;">
        Accedi all'Area Cliente →
      </a>
    </div>
  </div>
</body></html>`,
      })
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV ADMIN] Magic link:', magicLink)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Errore interno.' }, { status: 500 })
  }
}
