import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'

interface PreventivoRequest {
  tipo: string
  profilo?: string // privato | professionista | pmi | impresa
  nome: string
  cognome: string
  email: string
  telefono: string
  messaggio?: string
  oggetto?: string
  privacy: boolean
  website?: string // honeypot — deve essere assente o vuoto
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

// Inizializza Resend solo se la chiave è presente
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const GESTIONALE_URL = process.env.GESTIONALE_API_URL || 'https://fim-gestionale-next.vercel.app'
const GESTIONALE_SECRET = process.env.WEBSITE_API_SECRET

async function syncLeadToGestionale(data: {
  nome: string; cognome: string; email: string; telefono: string
  tipo: string; profilo?: string; messaggio?: string
}) {
  if (!GESTIONALE_SECRET) return
  try {
    await fetch(`${GESTIONALE_URL}/api/website/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GESTIONALE_SECRET}`,
      },
      body: JSON.stringify(data),
    })
  } catch {
    // Non blocca il flusso principale — log silenzioso
  }
}

const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

function buildTeamEmailHtml(data: {
  id: string
  tipo: string
  profilo?: string
  nome: string
  cognome: string
  email: string
  telefono: string
  messaggio: string
  timestamp: string
}): string {
  const tipo = escapeHtml(data.tipo)
  const nome = escapeHtml(data.nome)
  const cognome = escapeHtml(data.cognome)
  const email = escapeHtml(data.email)
  const telefono = escapeHtml(data.telefono)
  const messaggio = escapeHtml(data.messaggio)
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #091d47, #0f2d6b, #1a4a9e); padding: 28px 32px;">
      <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 900;">🔔 Nuova Richiesta Preventivo</h1>
      <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px;">ID: ${data.id}</p>
    </div>

    <!-- Body -->
    <div style="padding: 28px 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        ${data.profilo ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 40%;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Profilo cliente</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; font-weight: 700; color: #0f2d6b;">${escapeHtml(data.profilo)}</span>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 40%;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Tipo polizza</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; font-weight: 700; color: #00b4c8;">${tipo}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Cliente</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; color: #1e293b; font-weight: 600;">${nome} ${cognome}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Email</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <a href="mailto:${email}" style="color: #0f2d6b; font-size: 15px;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Telefono</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <a href="tel:${telefono}" style="color: #0f2d6b; font-size: 15px;">${telefono}</a>
          </td>
        </tr>
        ${messaggio ? `
        <tr>
          <td style="padding: 10px 0;" colspan="2">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Messaggio</span>
            <p style="margin: 8px 0 0; color: #475569; font-size: 14px; line-height: 1.6; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 3px solid #00b4c8;">${messaggio}</p>
          </td>
        </tr>` : ''}
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
        <p style="margin: 0; font-size: 13px; color: #166534;">
          ⏰ Ricevuta il <strong>${new Date(data.timestamp).toLocaleString('it-IT')}</strong> — Rispondere entro 24 ore lavorative.
        </p>
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <a href="mailto:${email}?subject=Preventivo ${tipo} - FIM Insurance Broker&amp;body=Gentile ${nome},"
           style="display: inline-block; background: #0f2d6b; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Rispondi al cliente →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
        FIM Insurance Broker S.r.l. — Via Roma 41, 04012 Cisterna di Latina — info@fimbroker.it
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildClientEmailHtml(rawNome: string, rawTipo: string): string {
  const nome = escapeHtml(rawNome)
  const tipo = escapeHtml(rawTipo)
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #091d47, #0f2d6b, #1a4a9e); padding: 36px 32px; text-align: center;">
      <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #0f2d6b, #00b4c8); border-radius: 18px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <span style="color: white; font-weight: 900; font-size: 28px;">F</span>
      </div>
      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900;">Richiesta ricevuta!</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px;">FIM Insurance Broker</p>
    </div>

    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 16px;">Gentile <strong>${nome}</strong>,</p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 20px;">
        Abbiamo ricevuto la tua richiesta di preventivo per <strong style="color: #0f2d6b;">${tipo}</strong>.
        Il nostro team la analizzerà e ti contatterà entro <strong>24 ore lavorative</strong> con
        la soluzione più adatta alle tue esigenze.
      </p>

      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 20px; margin: 24px 0;">
        <p style="margin: 0 0 12px; font-weight: 700; color: #0f2d6b; font-size: 14px;">Cosa aspettarti:</p>
        <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 2;">
          <li>Analisi personalizzata della tua richiesta</li>
          <li>Confronto tra le offerte delle principali compagnie assicurative</li>
          <li>Preventivo dettagliato e senza impegno</li>
          <li>Supporto di un consulente dedicato</li>
        </ul>
      </div>

      <p style="font-size: 14px; color: #64748b; margin: 0 0 24px;">
        Hai bisogno di assistenza immediata? Chiama subito il nostro team:
      </p>

      <div style="text-align: center; margin: 0 0 32px;">
        <a href="tel:+390696883381"
           style="display: inline-block; background: #00b4c8; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">
          📞 06 96883381
        </a>
      </div>
    </div>

    <div style="background: #0f2d6b; padding: 20px 32px;">
      <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.8;">
        FIM Insurance Broker S.r.l. — Via Roma 41, 04012 Cisterna di Latina<br>
        Iscrizione RUI n. B000405449 — <a href="https://www.fimbroker.it" style="color: rgba(255,255,255,0.5);">www.fimbroker.it</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildFollowUpEmailHtml(rawNome: string, rawTipo: string): string {
  const nome = escapeHtml(rawNome)
  const tipo = escapeHtml(rawTipo)
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'
  const GOOGLE_REVIEW_URL = 'https://g.page/r/CavV7RV_K7S6EBE/review'
  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
    <div style="background:linear-gradient(135deg,#091d47,#0f2d6b,#1a4a9e);padding:32px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:20px;font-weight:900;">Un aggiornamento sulla tua richiesta</h1>
    </div>
    <div style="padding:32px;">
      <p style="font-size:15px;color:#1e293b;margin:0 0 16px;">Ciao <strong>${nome}</strong>,</p>
      <p style="font-size:14px;color:#475569;line-height:1.7;margin:0 0 20px;">
        Ci tenevi al preventivo per <strong>${tipo}</strong> che hai richiesto qualche giorno fa.
        Speriamo che tu abbia già sentito uno dei nostri consulenti!
      </p>
      <p style="font-size:14px;color:#475569;line-height:1.7;margin:0 0 24px;">
        Se non ti abbiamo ancora contattato, o se hai nuove domande, puoi prenotare direttamente
        una consulenza gratuita nel momento che preferisci:
      </p>
      <div style="text-align:center;margin:0 0 28px;">
        <a href="${BASE_URL}/prenota-consulenza"
           style="display:inline-block;background:#00b4c8;color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">
          Prenota consulenza gratuita →
        </a>
      </div>
      <p style="font-size:13px;color:#94a3b8;text-align:center;margin:0 0 32px;">
        Oppure chiamaci: <a href="tel:+390696883381" style="color:#0f2d6b;">06 96883381</a>
        &nbsp;·&nbsp; Lun–Ven 9:30–13:00 e 15:30–18:30
      </p>

      <!-- Review request -->
      <div style="border-top:1px solid #f1f5f9;padding-top:24px;">
        <p style="font-size:14px;color:#475569;margin:0 0 12px;text-align:center;">
          Se hai già avuto modo di parlarci, la tua opinione ci aiuta moltissimo:
        </p>
        <div style="text-align:center;">
          <a href="${GOOGLE_REVIEW_URL}"
             target="_blank"
             style="display:inline-flex;align-items:center;gap:8px;background:#fff;border:2px solid #e2e8f0;color:#1e293b;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">
            ⭐ Lascia una recensione su Google
          </a>
        </div>
        <p style="font-size:12px;color:#cbd5e1;text-align:center;margin:10px 0 0;">
          Ci vogliono meno di 2 minuti — grazie in anticipo!
        </p>
      </div>
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
  const { ok, retryAfter } = rateLimit(req, { limit: 5, windowMs: 60 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche ora.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body: PreventivoRequest = await req.json()

    const nome = sanitize(body.nome)
    const cognome = sanitize(body.cognome)
    const email = sanitize(body.email)
    const telefono = sanitize(body.telefono)
    const tipo = sanitize(body.tipo)
    const messaggio = sanitize(body.messaggio)

    // Honeypot: se il campo "website" è compilato, è quasi certamente un bot
    if (body.website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    if (!nome || !cognome || !email || !telefono || !tipo) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Indirizzo email non valido' }, { status: 400 })
    }
    if (!body.privacy) {
      return NextResponse.json({ error: 'Consenso privacy obbligatorio' }, { status: 400 })
    }

    const profilo = sanitize(body.profilo).slice(0, 50)

    const preventivoData = {
      id: `FIM-${Date.now()}`,
      tipo, profilo: profilo || undefined, nome, cognome, email, telefono, messaggio,
      timestamp: new Date().toISOString(),
    }

    // Follow-up schedulato a 72 ore
    const followUpAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()

    // Sincronizza lead nel gestionale (fire-and-forget)
    syncLeadToGestionale({ nome, cognome, email, telefono, tipo, profilo: profilo || undefined, messaggio: messaggio || undefined })

    // Invia email se Resend è configurato
    if (resend) {
      await Promise.all([
        // Email al team FIM
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Preventivo] ${tipo} — ${nome} ${cognome}${profilo ? ` (${profilo})` : ''}`,
          html: buildTeamEmailHtml(preventivoData),
        }),
        // Email di conferma al cliente
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'Richiesta preventivo ricevuta — FIM Insurance Broker',
          html: buildClientEmailHtml(nome, tipo),
        }),
        // Follow-up schedulato a 72 ore
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: `Aggiornamento preventivo ${tipo} — FIM Insurance Broker`,
          html: buildFollowUpEmailHtml(nome, tipo),
          scheduledAt: followUpAt,
        }),
      ])
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Preventivo ricevuto (email non inviata — imposta RESEND_API_KEY):', preventivoData)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Richiesta ricevuta. Ti contatteremo entro 24 ore lavorative.',
        id: preventivoData.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Preventivo API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server. Riprova o contattaci direttamente.' },
      { status: 500 }
    )
  }
}
