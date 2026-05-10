import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'

interface PrenotaRequest {
  nome: string
  email: string
  telefono: string
  servizio?: string
  data: string
  orario: string
  note?: string
  privacy: boolean
  website?: string // honeypot
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(value: unknown): string {
  return String(value ?? '').trim().slice(0, 500)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

function buildTeamEmailHtml(data: {
  id: string
  nome: string
  email: string
  telefono: string
  servizio: string
  data: string
  orario: string
  note: string
  timestamp: string
}): string {
  const nome = escapeHtml(data.nome)
  const email = escapeHtml(data.email)
  const telefono = escapeHtml(data.telefono)
  const servizio = escapeHtml(data.servizio)
  const nota = escapeHtml(data.note)

  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 28px 32px;">
      <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 900;">📅 Nuova Richiesta di Consulenza</h1>
      <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px;">ID: ${data.id}</p>
    </div>
    <div style="padding: 28px 32px;">
      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px;">
        <p style="margin: 0; font-size: 15px; font-weight: 700; color: #0B1F3A;">
          📅 ${formatDate(data.data)} alle ${data.orario}
          ${servizio ? `&nbsp;·&nbsp; ${servizio}` : ''}
        </p>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 35%;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Cliente</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; font-weight: 700; color: #1e293b;">${nome}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Email</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <a href="mailto:${email}" style="color: #0B1F3A; font-size: 15px;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Telefono</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <a href="tel:${telefono}" style="color: #0B1F3A; font-size: 15px;">${telefono}</a>
          </td>
        </tr>
        ${nota ? `
        <tr>
          <td style="padding: 10px 0;" colspan="2">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Note</span>
            <p style="margin: 8px 0 0; color: #475569; font-size: 14px; line-height: 1.6; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 3px solid #2FA36B;">${nota}</p>
          </td>
        </tr>` : ''}
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
        <p style="margin: 0; font-size: 13px; color: #166534;">
          ⏰ Ricevuto il <strong>${new Date(data.timestamp).toLocaleString('it-IT')}</strong>
        </p>
      </div>

      <div style="margin-top: 20px; display: flex; gap: 12px; text-align: center;">
        <a href="mailto:${email}?subject=Conferma appuntamento ${formatDate(data.data)} ${data.orario} — FIM Insurance Broker"
           style="display: inline-block; background: #0B1F3A; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Conferma appuntamento →
        </a>
      </div>
    </div>
    <div style="background: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
        FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina — info@fimbroker.it
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildClientConfirmHtml(rawNome: string, rawData: string, rawOrario: string, rawServizio: string): string {
  const nome = escapeHtml(rawNome)
  const servizio = escapeHtml(rawServizio)

  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 36px 32px; text-align: center;">
      <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #0B1F3A, #2FA36B); border-radius: 18px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <span style="color: white; font-weight: 900; font-size: 28px;">F</span>
      </div>
      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900;">Richiesta ricevuta!</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px;">FIM Insurance Broker</p>
    </div>
    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 16px;">Gentile <strong>${nome}</strong>,</p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 20px;">
        Abbiamo ricevuto la tua richiesta di consulenza. Ti contatteremo <strong>entro poche ore</strong>
        per confermare l'appuntamento.
      </p>

      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 20px; margin: 0 0 24px;">
        <p style="margin: 0 0 4px; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Appuntamento richiesto</p>
        <p style="margin: 0; font-size: 20px; font-weight: 900; color: #0B1F3A;">
          📅 ${formatDate(rawData)} alle ${rawOrario}
        </p>
        ${servizio ? `<p style="margin: 6px 0 0; font-size: 14px; color: #475569;">${servizio}</p>` : ''}
      </div>

      <p style="font-size: 14px; color: #64748b; margin: 0 0 24px;">
        Hai bisogno di assistenza immediata? Puoi contattarci direttamente:
      </p>
      <div style="text-align: center; margin: 0 0 32px;">
        <a href="tel:+390696883381"
           style="display: inline-block; background: #2FA36B; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px; margin-right: 12px;">
          📞 06 96883381
        </a>
        <a href="https://wa.me/393473312330"
           style="display: inline-block; background: #25d366; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px;">
          WhatsApp
        </a>
      </div>
    </div>
    <div style="background: #0B1F3A; padding: 20px 32px;">
      <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.8;">
        FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina<br>
        Iscrizione RUI n. B000405449 — <a href="https://www.fimbroker.it" style="color: rgba(255,255,255,0.5);">www.fimbroker.it</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const { ok, retryAfter } = await rateLimit(req, { limit: 5, windowMs: 60 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche ora.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body: PrenotaRequest = await req.json()

    const nome = sanitize(body.nome)
    const email = sanitize(body.email)
    const telefono = sanitize(body.telefono)
    const servizio = sanitize(body.servizio)
    const data = sanitize(body.data)
    const orario = sanitize(body.orario)
    const note = sanitize(body.note)

    // Honeypot
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    if (!nome || !email || !telefono || !data || !orario) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Indirizzo email non valido' }, { status: 400 })
    }
    if (!body.privacy) {
      return NextResponse.json({ error: 'Consenso privacy obbligatorio' }, { status: 400 })
    }
    // Valida formato data (YYYY-MM-DD) per evitare injection
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      return NextResponse.json({ error: 'Formato data non valido' }, { status: 400 })
    }
    // Valida orario (HH:MM)
    if (!/^\d{2}:\d{2}$/.test(orario)) {
      return NextResponse.json({ error: 'Formato orario non valido' }, { status: 400 })
    }

    const bookingData = {
      id: `BOOK-${Date.now()}`,
      nome, email, telefono, servizio, data, orario, note,
      timestamp: new Date().toISOString(),
    }

    if (resend) {
      await Promise.all([
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Prenotazione] ${formatDate(data)} ${orario} — ${nome}`,
          html: buildTeamEmailHtml(bookingData),
        }),
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'Richiesta consulenza ricevuta — FIM Insurance Broker',
          html: buildClientConfirmHtml(nome, data, orario, servizio),
        }),
      ])
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Prenotazione ricevuta (email non inviata — imposta RESEND_API_KEY):', bookingData)
    }

    return NextResponse.json(
      { success: true, message: 'Prenotazione inviata con successo.', id: bookingData.id },
      { status: 200 },
    )
  } catch (error) {
    console.error('Prenota API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server. Riprova o contattaci direttamente.' },
      { status: 500 },
    )
  }
}
