import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'
import {
  QUESTIONS,
  PROFILE_LABELS,
  LEVEL_LABELS,
  calcola,
  isProfile,
  type Profile,
  type Copertura,
} from '@/lib/calculatorData'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function nl2br(str: string): string {
  return escapeHtml(str).replace(/\r?\n/g, '<br>')
}

const PRIORITY_STYLE: Record<Copertura['priorita'], { label: string; bg: string; color: string }> = {
  urgente: { label: 'Urgente', bg: '#fee2e2', color: '#b91c1c' },
  alta: { label: 'Alta', bg: '#fef3c7', color: '#b45309' },
  consigliata: { label: 'Consigliata', bg: '#dbeafe', color: '#1d4ed8' },
}

function buildTeamEmail(data: {
  nome: string
  email: string
  telefono: string
  messaggio: string
  profile: Profile
  settore: string
  answers: Record<string, boolean>
  livello: 'basso' | 'medio' | 'alto'
  punteggio: number
  coperture: Copertura[]
}): string {
  const questionMap = new Map(QUESTIONS[data.profile].map((q) => [q.id, q]))
  const answersRows = Object.entries(data.answers)
    .map(([id, value]) => {
      const q = questionMap.get(id)
      const domanda = q ? q.label : id
      const risposta = q ? (value ? q.yesLabel : q.noLabel) : (value ? 'Sì' : 'No')
      return `<tr>
        <td style="padding:8px 10px;color:#475569;font-size:13px;border-bottom:1px solid #e2e8f0;vertical-align:top;">${escapeHtml(domanda)}</td>
        <td style="padding:8px 10px;font-size:13px;font-weight:600;color:#0f172a;border-bottom:1px solid #e2e8f0;white-space:nowrap;">${escapeHtml(risposta)}</td>
      </tr>`
    })
    .join('')

  const copertureHtml = data.coperture
    .map((c) => {
      const s = PRIORITY_STYLE[c.priorita]
      return `<div style="border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;margin-bottom:8px;background:#ffffff;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="font-weight:700;color:#0f172a;font-size:13px;">${escapeHtml(c.nome)}</span>
          <span style="background:${s.bg};color:${s.color};font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px;">${s.label}</span>
        </div>
        <div style="color:#64748b;font-size:12px;line-height:1.5;">${escapeHtml(c.motivo)}</div>
      </div>`
    })
    .join('')

  const contattoRapidoTel = data.telefono
    ? `<a href="tel:${escapeHtml(data.telefono)}" style="color:#0f2d6b;text-decoration:none;">${escapeHtml(data.telefono)}</a>`
    : '<span style="color:#94a3b8;">non fornito</span>'

  const messaggioBlock = data.messaggio
    ? `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 14px;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">📝 Messaggio del cliente</div>
        <div style="color:#1e293b;font-size:14px;line-height:1.5;white-space:pre-wrap;">${nl2br(data.messaggio)}</div>
      </div>`
    : ''

  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"></head>
<body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#f8fafc;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
    <div style="background:#0f2d6b;padding:20px 24px;">
      <h2 style="color:white;margin:0;font-size:16px;font-weight:700;">📊 Nuovo Lead — Calcolatore Rischi</h2>
      <div style="color:#cbd5e1;font-size:13px;margin-top:4px;">${escapeHtml(PROFILE_LABELS[data.profile])} · ${escapeHtml(data.settore || 'settore non specificato')}</div>
    </div>
    <div style="padding:20px 24px;">

      <div style="background:#f1f5f9;border-radius:8px;padding:12px 14px;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Contatto</div>
        <p style="margin:0 0 4px;font-size:14px;color:#1e293b;"><strong>${escapeHtml(data.nome)}</strong></p>
        <p style="margin:0 0 4px;font-size:14px;color:#475569;">📧 <a href="mailto:${escapeHtml(data.email)}" style="color:#0f2d6b;text-decoration:none;">${escapeHtml(data.email)}</a></p>
        <p style="margin:0;font-size:14px;color:#475569;">📞 ${contattoRapidoTel}</p>
      </div>

      ${messaggioBlock}

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Livello di rischio</div>
        <div style="font-size:18px;font-weight:700;color:#0f172a;">${LEVEL_LABELS[data.livello]} <span style="color:#64748b;font-size:14px;font-weight:500;">(${data.punteggio}/100)</span></div>
      </div>

      <div style="font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Risposte al questionario</div>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:20px;">
        <tbody>${answersRows}</tbody>
      </table>

      <div style="font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Coperture raccomandate dal sistema</div>
      ${copertureHtml}

      <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">Ricevuto il ${new Date().toLocaleString('it-IT')}</p>
    </div>
  </div>
</body></html>`
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
    const telefono = String(body?.telefono ?? '').trim().slice(0, 30)
    const messaggio = String(body?.messaggio ?? '').trim().slice(0, 1000)
    const profileRaw = String(body?.profile ?? '').trim()
    const settore = String(body?.settore ?? '').trim().slice(0, 100)
    const answersRaw = body?.answers && typeof body.answers === 'object' ? body.answers as Record<string, unknown> : {}

    if (!nome || nome.length < 2) {
      return NextResponse.json({ error: 'Nome non valido.' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email non valida.' }, { status: 400 })
    }
    if (telefono && !/^[+\d\s().-]{6,30}$/.test(telefono)) {
      return NextResponse.json({ error: 'Telefono non valido.' }, { status: 400 })
    }
    if (!isProfile(profileRaw)) {
      return NextResponse.json({ error: 'Profilo non valido.' }, { status: 400 })
    }
    const profile: Profile = profileRaw

    // Normalizza answers: tieni solo gli id previsti dal profilo, con valori booleani
    const allowedIds = new Set(QUESTIONS[profile].map((q) => q.id))
    const answers: Record<string, boolean> = {}
    for (const [k, v] of Object.entries(answersRaw)) {
      if (allowedIds.has(k)) answers[k] = Boolean(v)
    }

    // Calcolo server-side (non fidarsi del client per livello/punteggio)
    const result = calcola({ profile, settore: settore || null, answers })

    // Add to Resend audience
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (resend && audienceId) {
      await resend.contacts.create({ audienceId, email, firstName: nome, unsubscribed: false }).catch(() => {
        // Ignore 409 (already exists)
      })
    }

    // Notify team
    if (resend) {
      await resend.emails.send({
        from: FIM_FROM,
        to: [FIM_EMAIL],
        replyTo: email,
        subject: `[Calcolatore] ${nome} — ${PROFILE_LABELS[profile]} — ${settore || 'n/d'} — Rischio ${result.livello}`,
        html: buildTeamEmail({
          nome,
          email,
          telefono,
          messaggio,
          profile,
          settore,
          answers,
          livello: result.livello,
          punteggio: result.punteggio,
          coperture: result.coperture,
        }),
      })
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Calcolatore lead:', { nome, email, telefono, profile, settore, livello: result.livello, punteggio: result.punteggio })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[calcolatore] error:', error)
    return NextResponse.json({ error: 'Errore del server. Riprova.' }, { status: 500 })
  }
}
