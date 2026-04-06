import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'
import { saveSinistro } from '@/lib/sinistriStore'

interface SinistriRequest {
  nome: string
  cognome: string
  email: string
  telefono: string
  tipo_sinistro: string
  data_evento: string
  numero_polizza?: string
  compagnia?: string
  descrizione: string
  privacy: boolean
  website?: string // honeypot
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(value: unknown): string {
  return String(value ?? '').trim().slice(0, 2000)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'
const GESTIONALE_URL = process.env.GESTIONALE_API_URL || 'https://fim-gestionale-next.vercel.app'
const GESTIONALE_SECRET = process.env.WEBSITE_API_SECRET

async function syncSinistrToGestionale(data: {
  nome: string; cognome: string; email: string; telefono: string
  tipo_sinistro: string; data_evento: string
  numero_polizza?: string; compagnia?: string; descrizione: string
}) {
  if (!GESTIONALE_SECRET) {
    console.warn('[gestionale] WEBSITE_API_SECRET non configurata — sync sinistro saltata')
    return
  }
  try {
    const res = await fetch(`${GESTIONALE_URL}/api/website/sinistro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GESTIONALE_SECRET}`,
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[gestionale] Sync sinistro fallita: HTTP ${res.status} — ${text}`)
    }
  } catch (err) {
    console.error('[gestionale] Sync sinistro — errore di rete:', err)
  }
}

export async function POST(req: NextRequest) {
  const { ok, retryAfter } = rateLimit(req, { limit: 5, windowMs: 60 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche ora.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body: SinistriRequest = await req.json()

    if (body.website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const nome = sanitize(body.nome).slice(0, 100)
    const cognome = sanitize(body.cognome).slice(0, 100)
    const email = sanitize(body.email).slice(0, 254)
    const telefono = sanitize(body.telefono).slice(0, 30)
    const tipoSinistro = sanitize(body.tipo_sinistro).slice(0, 100)
    const dataEvento = sanitize(body.data_evento).slice(0, 20)
    const numeroPolizza = sanitize(body.numero_polizza).slice(0, 100)
    const compagnia = sanitize(body.compagnia).slice(0, 100)
    const descrizione = sanitize(body.descrizione)

    if (!nome || !cognome || !email || !telefono || !tipoSinistro || !dataEvento || !descrizione) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Email non valida' }, { status: 400 })
    }
    if (!body.privacy) {
      return NextResponse.json({ error: 'Consenso privacy obbligatorio' }, { status: 400 })
    }

    const id = `SIN-${Date.now()}`

    // Salva sinistro su Supabase (o fallback JSON locale)
    try {
      await saveSinistro({
        id,
        nome, cognome, email, telefono,
        tipoSinistro, dataEvento,
        numeroPolizza: numeroPolizza || undefined,
        compagnia: compagnia || undefined,
        descrizione,
        timestamp: new Date().toISOString(),
      })
    } catch { /* non blocca */ }

    // Sincronizza nel gestionale esterno (fire-and-forget)
    syncSinistrToGestionale({
      nome, cognome, email, telefono, tipo_sinistro: tipoSinistro,
      data_evento: dataEvento,
      numero_polizza: numeroPolizza || undefined,
      compagnia: compagnia || undefined,
      descrizione,
    })

    if (resend) {
      await Promise.all([
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Sinistro] ${tipoSinistro} — ${nome} ${cognome}`,
          html: `
<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"></head>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
    <div style="background:linear-gradient(135deg,#7c2d12,#dc2626);padding:28px 32px;">
      <h1 style="color:white;margin:0;font-size:20px;font-weight:900;">⚠️ Nuova Apertura Sinistro</h1>
      <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:13px;">ID: ${id}</p>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;width:40%;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;">Cliente</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:15px;font-weight:600;">${escapeHtml(nome)} ${escapeHtml(cognome)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;">Telefono</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;"><a href="tel:${escapeHtml(telefono)}">${escapeHtml(telefono)}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;">Tipo sinistro</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#dc2626;">${escapeHtml(tipoSinistro)}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;">Data evento</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(dataEvento)}</td></tr>
        ${numeroPolizza ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;">N° Polizza</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(numeroPolizza)}</td></tr>` : ''}
        ${compagnia ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;">Compagnia</td>
            <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(compagnia)}</td></tr>` : ''}
      </table>
      <div style="margin-top:16px;padding:16px;background:#fef2f2;border-radius:8px;border-left:4px solid #dc2626;">
        <p style="margin:0 0 8px;font-size:12px;color:#991b1b;font-weight:600;text-transform:uppercase;">Descrizione evento</p>
        <p style="margin:0;color:#475569;font-size:14px;line-height:1.6;">${escapeHtml(descrizione)}</p>
      </div>
      <div style="margin-top:20px;text-align:center;">
        <a href="https://fim-gestionale-next.vercel.app/comunicazioni"
           style="display:inline-block;background:#0f2d6b;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Apri nel gestionale →
        </a>
      </div>
    </div>
    <div style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">FIM Insurance Broker — Ricevuto il ${new Date().toLocaleString('it-IT')}</p>
    </div>
  </div>
</body></html>`,
        }),
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'Pratica sinistro aperta — FIM Insurance Broker',
          html: `
<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"></head>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#091d47,#0f2d6b,#1a4a9e);padding:36px 32px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:22px;font-weight:900;">Pratica ricevuta</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;">FIM Insurance Broker</p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;color:#1e293b;margin:0 0 16px;">Gentile <strong>${escapeHtml(nome)}</strong>,</p>
      <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 20px;">
        Abbiamo ricevuto la segnalazione del sinistro <strong>${escapeHtml(tipoSinistro)}</strong>.
        Il nostro team la prenderà in carico e ti contatterà entro <strong>24 ore lavorative</strong>.
      </p>
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:20px;margin:24px 0;">
        <p style="margin:0 0 8px;font-weight:700;color:#0f2d6b;font-size:14px;">Riferimento pratica: ${id}</p>
        <p style="margin:0;font-size:13px;color:#64748b;">Conserva questo numero per eventuali comunicazioni.</p>
      </div>
      <div style="text-align:center;">
        <a href="tel:+390696883381"
           style="display:inline-block;background:#00b4c8;color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">
          📞 06 96883381
        </a>
      </div>
    </div>
    <div style="background:#0f2d6b;padding:20px 32px;">
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.5);text-align:center;">
        FIM Insurance Broker S.r.l. — Via Roma 41, 04012 Cisterna di Latina — info@fimbroker.it
      </p>
    </div>
  </div>
</body></html>`,
        }),
      ])
    }

    return NextResponse.json({ success: true, id }, { status: 200 })
  } catch (error) {
    console.error('Sinistri API error:', error)
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 })
  }
}
