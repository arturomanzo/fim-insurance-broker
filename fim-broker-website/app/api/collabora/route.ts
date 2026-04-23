import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'
import { PROFILO_LABELS, ESPERIENZA_LABELS, isValidProfilo } from '@/lib/collabora'

interface CollaboraRequest {
  nome: string
  email: string
  telefono?: string
  profilo: string
  iscrizioneRui?: string
  numeroRui?: string
  esperienza?: string
  zona?: string
  messaggio: string
  privacy: boolean
  website?: string // honeypot
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(value: unknown): string {
  return String(value ?? '').trim().slice(0, 1000)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getProfiloLabel(value: string): string {
  return isValidProfilo(value) ? PROFILO_LABELS[value] : value
}

function getEsperienzaLabel(value: string): string {
  return (ESPERIENZA_LABELS as Record<string, string>)[value] || value
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

function buildTeamEmailHtml(data: {
  id: string
  nome: string
  email: string
  telefono: string
  profilo: string
  iscrizioneRui: string
  numeroRui: string
  esperienza: string
  zona: string
  messaggio: string
  timestamp: string
}): string {
  const nome = escapeHtml(data.nome)
  const email = escapeHtml(data.email)
  const telefono = escapeHtml(data.telefono)
  const profilo = escapeHtml(getProfiloLabel(data.profilo))
  const iscrizioneRui = escapeHtml(data.iscrizioneRui)
  const numeroRui = escapeHtml(data.numeroRui)
  const esperienza = escapeHtml(getEsperienzaLabel(data.esperienza))
  const zona = escapeHtml(data.zona)
  const messaggio = escapeHtml(data.messaggio)

  const row = (label: string, value: string) => value ? `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 38%;">
        <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${label}</span>
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
        <span style="font-size: 15px; font-weight: 600; color: #1e293b;">${value}</span>
      </td>
    </tr>` : ''

  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 28px 32px;">
      <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 900;">🤝 Nuova Candidatura — Collabora con Noi</h1>
      <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px;">ID: ${data.id}</p>
    </div>
    <div style="padding: 28px 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 38%;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Candidato</span>
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
        ${telefono ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Telefono</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <a href="tel:${telefono}" style="color: #0B1F3A; font-size: 15px;">${telefono}</a>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Profilo</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; font-weight: 600; color: #2FA36B;">${profilo}</span>
          </td>
        </tr>
        ${row('Iscrizione RUI', iscrizioneRui === 'si' ? `Sì${numeroRui ? ` — ${numeroRui}` : ''}` : iscrizioneRui === 'no' ? 'No' : '')}
        ${row('Esperienza', esperienza)}
        ${row('Zona di operatività', zona)}
        <tr>
          <td style="padding: 10px 0;" colspan="2">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Messaggio / Motivazioni</span>
            <p style="margin: 8px 0 0; color: #475569; font-size: 14px; line-height: 1.6; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 3px solid #2FA36B; white-space: pre-wrap;">${messaggio}</p>
          </td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
        <p style="margin: 0; font-size: 13px; color: #166534;">
          ⏰ Ricevuto il <strong>${new Date(data.timestamp).toLocaleString('it-IT')}</strong>
        </p>
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <a href="mailto:${email}?subject=Re: La tua candidatura — FIM Insurance Broker"
           style="display: inline-block; background: #0B1F3A; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Rispondi al candidato →
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

function buildCandidateConfirmHtml(rawNome: string): string {
  const nome = escapeHtml(rawNome)
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
      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900;">Candidatura ricevuta!</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px;">FIM Insurance Broker</p>
    </div>
    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 16px;">Gentile <strong>${nome}</strong>,</p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 20px;">
        Grazie per il tuo interesse a collaborare con <strong>FIM Insurance Broker</strong>.
        Abbiamo ricevuto la tua candidatura e sarà valutata con attenzione dal nostro team.
      </p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 20px;">
        Se il tuo profilo è in linea con le opportunità di collaborazione attualmente disponibili,
        ti contatteremo entro <strong>7 giorni lavorativi</strong> per fissare un colloquio conoscitivo.
      </p>
      <p style="font-size: 14px; color: #64748b; margin: 0 0 24px;">
        Nel frattempo, puoi scoprire di più su di noi:
      </p>
      <div style="text-align: center; margin: 0 0 32px;">
        <a href="https://www.fimbroker.it/chi-siamo"
           style="display: inline-block; background: #2FA36B; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px; margin-right: 12px;">
          Chi Siamo
        </a>
        <a href="tel:+390696883381"
           style="display: inline-block; background: #f1f5f9; color: #0B1F3A; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px;">
          📞 06 96883381
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
    const body: CollaboraRequest = await req.json()

    const nome = sanitize(body.nome)
    const email = sanitize(body.email)
    const telefono = sanitize(body.telefono)
    const profilo = sanitize(body.profilo)
    const iscrizioneRui = sanitize(body.iscrizioneRui)
    const numeroRui = sanitize(body.numeroRui)
    const esperienza = sanitize(body.esperienza)
    const zona = sanitize(body.zona)
    const messaggio = sanitize(body.messaggio)

    // Honeypot: se il campo "website" è compilato, è quasi certamente un bot
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    if (!nome || !email || !profilo || !messaggio) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Indirizzo email non valido' }, { status: 400 })
    }
    if (!body.privacy) {
      return NextResponse.json({ error: 'Consenso privacy obbligatorio' }, { status: 400 })
    }
    if (!isValidProfilo(profilo)) {
      return NextResponse.json({ error: 'Profilo non valido' }, { status: 400 })
    }

    const candidaturaData = {
      id: `COL-${Date.now()}`,
      nome,
      email,
      telefono,
      profilo,
      iscrizioneRui,
      numeroRui,
      esperienza,
      zona,
      messaggio,
      timestamp: new Date().toISOString(),
    }

    if (resend) {
      await Promise.all([
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Collabora con Noi] ${getProfiloLabel(profilo)} — ${nome}`,
          html: buildTeamEmailHtml(candidaturaData),
        }),
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'Candidatura ricevuta — FIM Insurance Broker',
          html: buildCandidateConfirmHtml(nome),
        }),
      ])
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Candidatura collabora ricevuta (email non inviata — imposta RESEND_API_KEY):', candidaturaData)
    }

    return NextResponse.json(
      { success: true, message: 'Candidatura inviata con successo.', id: candidaturaData.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Collabora API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server. Riprova o contattaci direttamente.' },
      { status: 500 }
    )
  }
}
