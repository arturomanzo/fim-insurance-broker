import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'

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
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

const SETTORE_LABELS: Record<string, string> = {
  artigianato: 'Artigianato / Manifattura',
  commercio: 'Commercio / Retail',
  edilizia: 'Edilizia / Costruzioni',
  professioni: 'Professioni / Studi',
  servizi: 'Servizi / Consulenza',
  ristorazione: 'Ristorazione / Turismo',
  altro: 'Altro',
}

function buildTeamEmailHtml(data: {
  id: string
  nome: string
  azienda: string
  email: string
  telefono: string
  settore: string
  compagnieAttuali: string
  note: string
  oscuraPremio: boolean
  numPolizze: number
  timestamp: string
}): string {
  const nome = escapeHtml(data.nome)
  const azienda = escapeHtml(data.azienda)
  const email = escapeHtml(data.email)
  const telefono = escapeHtml(data.telefono)
  const settore = escapeHtml(SETTORE_LABELS[data.settore] ?? data.settore)
  const compagnie = escapeHtml(data.compagnieAttuali)
  const note = escapeHtml(data.note)

  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 28px 32px;">
      <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 900;">🔍 Nuova Richiesta Second Opinion</h1>
      <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px;">ID: ${data.id} · ${data.numPolizze} polizz${data.numPolizze === 1 ? 'a allegata' : 'e allegate'}</p>
    </div>
    <div style="padding: 28px 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 35%;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Richiedente</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; font-weight: 700; color: #1e293b;">${nome}</span>
          </td>
        </tr>
        ${azienda ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Azienda</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; color: #475569;">${azienda}</span>
          </td>
        </tr>` : ''}
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
        ${settore ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Settore</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; color: #475569;">${settore}</span>
          </td>
        </tr>` : ''}
        ${compagnie ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Compagnie attuali</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; color: #475569;">${compagnie}</span>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Premi oscurati</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; color: #475569;">${data.oscuraPremio ? 'Sì' : 'No'}</span>
          </td>
        </tr>
        ${note ? `<tr>
          <td style="padding: 10px 0;" colspan="2">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Note</span>
            <p style="margin: 8px 0 0; color: #475569; font-size: 14px; line-height: 1.6; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 3px solid #00b4c8;">${note}</p>
          </td>
        </tr>` : ''}
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
        <p style="margin: 0; font-size: 13px; color: #1e40af;">
          📎 <strong>${data.numPolizze}</strong> polizz${data.numPolizze === 1 ? 'a allegata' : 'e allegate'} · ricevuto il <strong>${new Date(data.timestamp).toLocaleString('it-IT')}</strong>
        </p>
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <a href="mailto:${email}?subject=Re: Second Opinion assicurativa — FIM Insurance Broker"
           style="display: inline-block; background: #0B1F3A; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Rispondi al cliente →
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

function buildClientConfirmHtml(rawNome: string): string {
  const nome = escapeHtml(rawNome)
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 36px 32px; text-align: center;">
      <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #0B1F3A, #00b4c8); border-radius: 18px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <span style="color: white; font-weight: 900; font-size: 28px;">F</span>
      </div>
      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900;">Richiesta ricevuta!</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px;">Second Opinion Assicurativa — FIM Insurance Broker</p>
    </div>
    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 16px;">Gentile <strong>${nome}</strong>,</p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 20px;">
        Abbiamo ricevuto la tua richiesta di <strong>Second Opinion assicurativa</strong>.
        Un nostro consulente analizzerà le tue polizze e ti contatterà entro <strong>48 ore lavorative</strong>
        con una Gap Analysis dettagliata sui rischi latenti nelle tue coperture attuali.
      </p>
      <div style="background: #f0f9ff; border-radius: 10px; padding: 16px 20px; margin: 0 0 24px; border-left: 4px solid #00b4c8;">
        <p style="margin: 0; font-size: 14px; color: #0369a1; line-height: 1.6;">
          <strong>Cosa aspettarti:</strong><br>
          · Analisi delle coperture presenti e delle lacune<br>
          · Rischi non coperti con impatto concreto in caso di sinistro<br>
          · Esclusioni critiche spesso trascurate<br>
          · Raccomandazioni prioritarie senza obbligo di acquisto
        </p>
      </div>
      <div style="text-align: center;">
        <a href="tel:+390696883381"
           style="display: inline-block; background: #f1f5f9; color: #0B1F3A; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px;">
          📞 Preferisci chiamare? 06 96883381
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
    const formData = await req.formData()

    const website = sanitize(formData.get('website'))
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const nome = sanitize(formData.get('nome'))
    const azienda = sanitize(formData.get('azienda'))
    const email = sanitize(formData.get('email'))
    const telefono = sanitize(formData.get('telefono'))
    const settore = sanitize(formData.get('settore'))
    const compagnieAttuali = sanitize(formData.get('compagnieAttuali'))
    const note = sanitize(formData.get('note'))
    const oscuraPremio = formData.get('oscuraPremio') === 'true'
    const privacy = formData.get('privacy') === 'true'

    if (!nome || !email || !telefono) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Indirizzo email non valido' }, { status: 400 })
    }
    if (!privacy) {
      return NextResponse.json({ error: 'Consenso privacy obbligatorio' }, { status: 400 })
    }

    const rawFiles = formData.getAll('polizze') as File[]
    const validFiles = rawFiles.filter(
      (f) => f instanceof File && f.size > 0 && f.type === 'application/pdf' && f.size <= 10 * 1024 * 1024
    ).slice(0, 5)

    const requestData = {
      id: `SO-${Date.now()}`,
      nome, azienda, email, telefono, settore,
      compagnieAttuali, note, oscuraPremio,
      numPolizze: validFiles.length,
      timestamp: new Date().toISOString(),
    }

    if (resend) {
      const attachments = await Promise.all(
        validFiles.map(async (f) => ({
          filename: f.name.replace(/[^a-zA-Z0-9._-]/g, '_'),
          content: Buffer.from(await f.arrayBuffer()),
        }))
      )

      await Promise.all([
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Second Opinion] ${nome}${azienda ? ` — ${azienda}` : ''} (${validFiles.length} polizze)`,
          html: buildTeamEmailHtml(requestData),
          attachments,
        }),
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'Second Opinion ricevuta — FIM Insurance Broker',
          html: buildClientConfirmHtml(nome),
        }),
      ])
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Second Opinion ricevuta (email non inviata — imposta RESEND_API_KEY):', {
        ...requestData,
        files: validFiles.map((f) => f.name),
      })
    }

    return NextResponse.json(
      { success: true, message: 'Richiesta inviata con successo.', id: requestData.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Second Opinion API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server. Riprova o contattaci direttamente.' },
      { status: 500 }
    )
  }
}
