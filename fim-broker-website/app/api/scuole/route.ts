import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'
import { sendLeadFromRequest } from '@/lib/metaCapi'
import {
  RUOLO_LABELS,
  SCUOLE_EMAIL,
  SCUOLE_PEC,
  TIPO_ISTITUTO_LABELS,
  isValidRuolo,
  isValidTipoIstituto,
} from '@/lib/scuole'

/**
 * Richiesta di check-up gratuito da un istituto scolastico.
 *
 * Stesso impianto di /api/contact, con due differenze volute:
 * - il destinatario è la casella del Dipartimento Scuole, non info@;
 * - la conferma all'istituto è sobria e non promozionale: una risposta
 *   automatica che vende è una comunicazione commerciale non richiesta.
 */

interface ScuoleRequest {
  istituto: string
  tipoIstituto?: string
  comune: string
  nome: string
  ruolo: string
  email: string
  telefono?: string
  scadenza?: string
  compagnia?: string
  messaggio?: string
  privacy: boolean
  website?: string // honeypot — deve essere assente o vuoto
  // Meta CAPI (vedi lib/metaLead.ts): deduplica col Pixel browser
  eventId?: string
  eventSourceUrl?: string
  marketingConsent?: boolean
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

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const TEAM_EMAIL = process.env.FIM_SCUOLE_EMAIL || SCUOLE_EMAIL
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

interface ScuoleData {
  id: string
  istituto: string
  tipoIstituto: string
  comune: string
  nome: string
  ruolo: string
  email: string
  telefono: string
  scadenza: string
  compagnia: string
  messaggio: string
  timestamp: string
}

function row(label: string, value: string, opts: { link?: string; strong?: boolean } = {}): string {
  if (!value) return ''
  const inner = opts.link
    ? `<a href="${opts.link}" style="color: #0B1F3A; font-size: 15px;">${value}</a>`
    : `<span style="font-size: 15px; color: #1e293b; ${opts.strong ? 'font-weight: 700;' : ''}">${value}</span>`
  return `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 35%; vertical-align: top;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${label}</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${inner}</td>
        </tr>`
}

function buildTeamEmailHtml(d: ScuoleData): string {
  const istituto = escapeHtml(d.istituto)
  const email = escapeHtml(d.email)
  const telefono = escapeHtml(d.telefono)
  const messaggio = escapeHtml(d.messaggio)
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 28px 32px;">
      <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 900;">Richiesta di check-up — Dipartimento Scuole</h1>
      <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px;">ID: ${d.id}</p>
    </div>
    <div style="padding: 28px 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        ${row('Istituto', istituto, { strong: true })}
        ${row('Tipo', escapeHtml(d.tipoIstituto))}
        ${row('Comune', escapeHtml(d.comune))}
        ${row('Referente', escapeHtml(d.nome))}
        ${row('Ruolo', escapeHtml(d.ruolo))}
        ${row('Email', email, { link: `mailto:${email}` })}
        ${row('Telefono', telefono, { link: `tel:${telefono}` })}
        ${row('Scadenza polizza', escapeHtml(d.scadenza))}
        ${row('Compagnia attuale', escapeHtml(d.compagnia))}
        ${messaggio ? `
        <tr>
          <td style="padding: 10px 0;" colspan="2">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Note</span>
            <p style="margin: 8px 0 0; color: #475569; font-size: 14px; line-height: 1.6; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 3px solid #2FA36B;">${messaggio}</p>
          </td>
        </tr>` : ''}
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
        <p style="margin: 0; font-size: 13px; color: #166534;">
          Ricevuta il <strong>${new Date(d.timestamp).toLocaleString('it-IT')}</strong>. Promesso all'istituto: risposta entro due giorni lavorativi.
        </p>
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <a href="mailto:${email}?subject=Re: Check-up assicurativo ${encodeURIComponent(d.istituto)} — FIM Insurance Broker"
           style="display: inline-block; background: #0B1F3A; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Rispondi →
        </a>
      </div>
    </div>
    <div style="background: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
        FIM Insurance Broker S.a.s. — Dipartimento Scuole — ${SCUOLE_EMAIL}
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildConfirmHtml(d: ScuoleData): string {
  const nome = escapeHtml(d.nome)
  const istituto = escapeHtml(d.istituto)
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900;">Richiesta ricevuta</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px;">Dipartimento Scuole — FIM Insurance Broker</p>
    </div>
    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 16px;">Gentile <strong>${nome}</strong>,</p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 16px;">
        la richiesta di check-up assicurativo per <strong>${istituto}</strong> è stata ricevuta dal Dipartimento Scuole
        di FIM Insurance Broker. Le risponderemo entro <strong>due giorni lavorativi</strong>.
      </p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 16px;">
        Per leggere la copertura in essere ci servono i documenti della polizza in corso: può rispondere a questa mail
        allegando polizza e condizioni generali, la determina di affidamento, il capitolato o la scheda tecnica se presenti,
        e la circolare alle famiglie. L'analisi è gratuita, non comporta alcun obbligo per l'Istituto e non costituisce
        proposta contrattuale.
      </p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; font-size: 14px; color: #475569; line-height: 1.7;">
        <p style="margin: 0 0 6px;">Per comunicazioni urgenti: <a href="tel:+390696883381" style="color: #0B1F3A;">+39 06 96883381</a>, dal lunedì al venerdì, 9:00-13:00 e 15:00-18:00.</p>
        <p style="margin: 0;">Per gli atti che richiedono posta elettronica certificata: <a href="mailto:${SCUOLE_PEC}" style="color: #0B1F3A;">${SCUOLE_PEC}</a>.</p>
      </div>
    </div>
    <div style="background: #0B1F3A; padding: 20px 32px;">
      <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.8;">
        FIM Insurance Broker di Manzo Arturo &amp; C. S.a.s. — Via Roma 41, 04012 Cisterna di Latina (LT)<br>
        RUI Sez. B n. B000405449 — soggetta alla vigilanza dell'IVASS<br>
        Informativa precontrattuale: <a href="https://www.fimbroker.it/trasparenza" style="color: rgba(255,255,255,0.5);">fimbroker.it/trasparenza</a>
        — Privacy: <a href="https://www.fimbroker.it/privacy-policy" style="color: rgba(255,255,255,0.5);">fimbroker.it/privacy-policy</a>
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
    const body: ScuoleRequest = await req.json()

    // Honeypot: se il campo "website" è compilato, è quasi certamente un bot
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const istituto = sanitize(body.istituto)
    const tipoIstituto = sanitize(body.tipoIstituto)
    const comune = sanitize(body.comune)
    const nome = sanitize(body.nome)
    const ruolo = sanitize(body.ruolo)
    const email = sanitize(body.email)
    const telefono = sanitize(body.telefono)
    const scadenza = sanitize(body.scadenza)
    const compagnia = sanitize(body.compagnia)
    const messaggio = sanitize(body.messaggio)

    if (!istituto || !comune || !nome || !ruolo || !email) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Indirizzo email non valido' }, { status: 400 })
    }
    if (!isValidRuolo(ruolo)) {
      return NextResponse.json({ error: 'Ruolo non valido' }, { status: 400 })
    }
    if (tipoIstituto && !isValidTipoIstituto(tipoIstituto)) {
      return NextResponse.json({ error: 'Tipo di istituto non valido' }, { status: 400 })
    }
    if (!body.privacy) {
      return NextResponse.json({ error: 'Consenso privacy obbligatorio' }, { status: 400 })
    }

    const data: ScuoleData = {
      id: `SCU-${Date.now()}`,
      istituto,
      tipoIstituto: tipoIstituto && isValidTipoIstituto(tipoIstituto) ? TIPO_ISTITUTO_LABELS[tipoIstituto] : '',
      comune,
      nome,
      ruolo: RUOLO_LABELS[ruolo],
      email,
      telefono,
      scadenza,
      compagnia,
      messaggio,
      timestamp: new Date().toISOString(),
    }

    // Meta Conversions API — Lead server-side, deduplicato col Pixel browser
    // sullo stesso eventId. No-op senza consenso marketing. Non lancia mai.
    await sendLeadFromRequest(req, {
      eventId: body.eventId,
      eventSourceUrl: body.eventSourceUrl,
      marketingConsent: body.marketingConsent,
      email,
      phone: telefono || undefined,
      fullName: nome,
      contentCategory: 'scuole',
    })

    if (resend) {
      await Promise.all([
        resend.emails.send({
          from: FIM_FROM,
          to: [TEAM_EMAIL],
          replyTo: email,
          subject: `[Scuole] Check-up — ${istituto} (${comune})`,
          html: buildTeamEmailHtml(data),
        }),
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          replyTo: SCUOLE_EMAIL,
          subject: 'Richiesta ricevuta — Dipartimento Scuole FIM Insurance Broker',
          html: buildConfirmHtml(data),
        }),
      ])
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Richiesta scuole ricevuta (email non inviata — imposta RESEND_API_KEY):', data)
    }

    return NextResponse.json(
      { success: true, message: 'Richiesta inviata con successo.', id: data.id },
      { status: 200 },
    )
  } catch (error) {
    console.error('Scuole API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server. Riprova o contattaci direttamente.' },
      { status: 500 },
    )
  }
}
