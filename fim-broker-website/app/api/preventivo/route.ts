import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface PreventivoRequest {
  tipo: string
  nome: string
  cognome: string
  email: string
  telefono: string
  messaggio?: string
  oggetto?: string
  privacy: boolean
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(value: unknown): string {
  return String(value ?? '').trim().slice(0, 1000)
}

// Inizializza Resend solo se la chiave è presente
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

function buildTeamEmailHtml(data: {
  id: string
  tipo: string
  nome: string
  cognome: string
  email: string
  telefono: string
  messaggio: string
  timestamp: string
}): string {
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
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; width: 40%;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Tipo polizza</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; font-weight: 700; color: #00b4c8;">${data.tipo}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Cliente</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 15px; color: #1e293b; font-weight: 600;">${data.nome} ${data.cognome}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Email</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <a href="mailto:${data.email}" style="color: #0f2d6b; font-size: 15px;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Telefono</span>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
            <a href="tel:${data.telefono}" style="color: #0f2d6b; font-size: 15px;">${data.telefono}</a>
          </td>
        </tr>
        ${data.messaggio ? `
        <tr>
          <td style="padding: 10px 0;" colspan="2">
            <span style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Messaggio</span>
            <p style="margin: 8px 0 0; color: #475569; font-size: 14px; line-height: 1.6; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 3px solid #00b4c8;">${data.messaggio}</p>
          </td>
        </tr>` : ''}
      </table>

      <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
        <p style="margin: 0; font-size: 13px; color: #166534;">
          ⏰ Ricevuta il <strong>${new Date(data.timestamp).toLocaleString('it-IT')}</strong> — Rispondere entro 24 ore lavorative.
        </p>
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <a href="mailto:${data.email}?subject=Preventivo ${data.tipo} - FIM Insurance Broker&body=Gentile ${data.nome},"
           style="display: inline-block; background: #0f2d6b; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Rispondi al cliente →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
        FIM Insurance Broker S.r.l. — Via Roma 123, 20121 Milano — info@fimbroker.it
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildClientEmailHtml(nome: string, tipo: string): string {
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
          <li>Confronto tra le offerte di oltre 50 compagnie</li>
          <li>Preventivo dettagliato e senza impegno</li>
          <li>Supporto di un consulente dedicato</li>
        </ul>
      </div>

      <p style="font-size: 14px; color: #64748b; margin: 0 0 24px;">
        Hai bisogno di assistenza immediata? Chiama subito il nostro team:
      </p>

      <div style="text-align: center; margin: 0 0 32px;">
        <a href="tel:+390212345678"
           style="display: inline-block; background: #00b4c8; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">
          📞 02 1234567
        </a>
      </div>
    </div>

    <div style="background: #0f2d6b; padding: 20px 32px;">
      <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.8;">
        FIM Insurance Broker S.r.l. — Via Roma 123, 20121 Milano<br>
        Iscrizione RUI n. B000XXXXX — <a href="https://www.fimbroker.it" style="color: rgba(255,255,255,0.5);">www.fimbroker.it</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body: PreventivoRequest = await req.json()

    const nome = sanitize(body.nome)
    const cognome = sanitize(body.cognome)
    const email = sanitize(body.email)
    const telefono = sanitize(body.telefono)
    const tipo = sanitize(body.tipo)
    const messaggio = sanitize(body.messaggio)

    if (!nome || !cognome || !email || !telefono || !tipo) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Indirizzo email non valido' }, { status: 400 })
    }
    if (!body.privacy) {
      return NextResponse.json({ error: 'Consenso privacy obbligatorio' }, { status: 400 })
    }

    const preventivoData = {
      id: `FIM-${Date.now()}`,
      tipo, nome, cognome, email, telefono, messaggio,
      timestamp: new Date().toISOString(),
    }

    // Invia email se Resend è configurato
    if (resend) {
      await Promise.all([
        // Email al team FIM
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Preventivo] ${tipo} — ${nome} ${cognome}`,
          html: buildTeamEmailHtml(preventivoData),
        }),
        // Email di conferma al cliente
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'Richiesta preventivo ricevuta — FIM Insurance Broker',
          html: buildClientEmailHtml(nome, tipo),
        }),
      ])
    } else {
      // Modalità sviluppo: log in console
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
