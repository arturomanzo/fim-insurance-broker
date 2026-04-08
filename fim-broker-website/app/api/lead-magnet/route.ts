import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildGuideEmailHtml(nome: string, tipo: string): string {
  const safeName = escapeHtml(nome)
  const safeType = escapeHtml(tipo)
  const guideUrl = `${BASE_URL}/risorse/guida-pmi`
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #091d47, #0f2d6b, #1a4a9e); padding: 36px 32px; text-align: center;">
      <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #0f2d6b, #00b4c8); border-radius: 18px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <span style="color: white; font-weight: 900; font-size: 28px;">📋</span>
      </div>
      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900;">La tua guida è pronta!</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px;">Guida alle Assicurazioni per PMI 2025</p>
    </div>
    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 16px;">Ciao <strong>${safeName}</strong>,</p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 20px;">
        Grazie per aver richiesto la <strong>Guida Completa alle Assicurazioni per PMI 2025</strong>.
        ${safeType ? `La guida è pensata per ${safeType} come te, con informazioni pratiche e aggiornate.` : ''}
      </p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 24px;">
        Troverai risposte a domande come:
      </p>
      <ul style="color: #475569; font-size: 14px; line-height: 2; padding-left: 20px; margin: 0 0 28px;">
        <li>Quali assicurazioni sono obbligatorie per la tua attività?</li>
        <li>Come scegliere il giusto massimale?</li>
        <li>Come funziona la gestione sinistri?</li>
        <li>Quanto costano mediamente le polizze principali?</li>
        <li>RC Impresa, All-risk, Cyber: cosa serve davvero?</li>
      </ul>
      <div style="text-align: center; margin: 0 0 32px;">
        <a href="${guideUrl}"
           style="display: inline-block; background: #00b4c8; color: white; padding: 16px 36px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px;">
          📖 Leggi la Guida Completa →
        </a>
      </div>
      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 20px; margin-bottom: 28px;">
        <p style="margin: 0 0 10px; font-size: 14px; color: #0369a1; font-weight: 600;">💡 Un consiglio gratuito da FIM</p>
        <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.6;">
          Dopo aver letto la guida, contattaci per una consulenza gratuita personalizzata.
          Analizziamo i rischi specifici della tua attività e confrontiamo 30+ compagnie per trovare la copertura migliore al prezzo più competitivo.
        </p>
      </div>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <a href="${BASE_URL}/prenota-consulenza"
           style="display: inline-block; background: #0f2d6b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-right: 12px;">
          Prenota consulenza
        </a>
        <a href="${BASE_URL}/preventivo"
           style="display: inline-block; background: #f1f5f9; color: #0f2d6b; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
          Richiedi preventivo
        </a>
      </div>
    </div>
    <div style="background: #0f2d6b; padding: 20px 32px;">
      <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.8;">
        FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina<br>
        Iscrizione RUI n. B000405449 — <a href="${BASE_URL}" style="color: rgba(255,255,255,0.5);">www.fimbroker.it</a><br>
        Hai ricevuto questa email perché hai richiesto la guida PMI. <a href="${BASE_URL}/privacy-policy" style="color: rgba(255,255,255,0.4);">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildTeamNotificationHtml(nome: string, email: string, tipo: string): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.07);">
    <div style="background: #0f2d6b; padding: 20px 24px;">
      <h2 style="color: white; margin: 0; font-size: 16px;">📥 Nuovo Lead Magnet — Guida PMI</h2>
    </div>
    <div style="padding: 20px 24px;">
      <p style="margin: 0 0 8px; font-size: 14px; color: #64748b;">Lead da: <strong style="color: #1e293b;">${escapeHtml(nome)}</strong></p>
      <p style="margin: 0 0 8px; font-size: 14px; color: #64748b;">Email: <a href="mailto:${escapeHtml(email)}" style="color: #0f2d6b;">${escapeHtml(email)}</a></p>
      <p style="margin: 0 0 16px; font-size: 14px; color: #64748b;">Tipo attività: <strong>${escapeHtml(tipo || 'Non specificato')}</strong></p>
      <p style="margin: 0; font-size: 12px; color: #94a3b8;">Ricevuto il ${new Date().toLocaleString('it-IT')}</p>
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
    const body = await req.json()

    // Honeypot
    if (body?.website) return NextResponse.json({ ok: true })

    const nome = String(body?.nome ?? '').trim().slice(0, 100)
    const email = String(body?.email ?? '').trim().toLowerCase().slice(0, 200)
    const tipo = String(body?.tipo ?? '').trim().slice(0, 100)

    if (!nome || nome.length < 2) {
      return NextResponse.json({ error: 'Inserisci il tuo nome.' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Inserisci un indirizzo email valido.' }, { status: 400 })
    }

    // Add to newsletter audience
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (resend && audienceId) {
      await resend.contacts.create({ audienceId, email, firstName: nome, unsubscribed: false }).catch(() => {
        // Ignore 409 (already exists)
      })
    }

    // Send emails
    if (resend) {
      await Promise.all([
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: '📋 La tua Guida Assicurazioni PMI 2025 — FIM Insurance Broker',
          html: buildGuideEmailHtml(nome, tipo),
        }),
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Lead Magnet] ${nome} — ${tipo || 'tipo n/d'}`,
          html: buildTeamNotificationHtml(nome, email, tipo),
        }),
      ])
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Lead magnet request (email non inviata):', { nome, email, tipo })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[lead-magnet] error:', error)
    return NextResponse.json({ error: 'Errore del server. Riprova.' }, { status: 500 })
  }
}
