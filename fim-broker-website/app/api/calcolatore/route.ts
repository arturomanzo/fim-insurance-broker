import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'

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

const PROFILE_LABELS: Record<string, string> = {
  privato: 'Privato',
  professionista: 'Libero Professionista',
  pmi: 'PMI / Artigiano',
  impresa: 'Grande Impresa',
}

const LEVEL_LABELS: Record<string, string> = {
  basso: '🟢 Basso',
  medio: '🟡 Medio',
  alto: '🔴 Alto',
}

function buildTeamEmail(data: {
  nome: string
  email: string
  profile: string
  settore: string
  answers: Record<string, boolean>
  livello: string
  punteggio: number
}): string {
  const answersHtml = Object.entries(data.answers)
    .map(([k, v]) => `<tr><td style="padding:4px 8px;color:#64748b;font-size:13px;">${escapeHtml(k)}</td><td style="padding:4px 8px;font-size:13px;font-weight:600;">${v ? 'Sì' : 'No'}</td></tr>`)
    .join('')

  return `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"></head>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:20px;">
  <div style="max-width:520px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 4px rgba(0,0,0,0.07);">
    <div style="background:#0f2d6b;padding:20px 24px;">
      <h2 style="color:white;margin:0;font-size:16px;">📊 Nuovo Lead — Calcolatore Rischi</h2>
    </div>
    <div style="padding:20px 24px;">
      <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Nome: <strong style="color:#1e293b;">${escapeHtml(data.nome)}</strong></p>
      <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Email: <a href="mailto:${escapeHtml(data.email)}" style="color:#0f2d6b;">${escapeHtml(data.email)}</a></p>
      <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Profilo: <strong>${escapeHtml(PROFILE_LABELS[data.profile] || data.profile)}</strong></p>
      <p style="margin:0 0 6px;font-size:14px;color:#64748b;">Settore: <strong>${escapeHtml(data.settore || 'n/d')}</strong></p>
      <p style="margin:0 0 16px;font-size:14px;color:#64748b;">Livello rischio: <strong>${LEVEL_LABELS[data.livello] || data.livello}</strong> (${data.punteggio}/100)</p>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;overflow:hidden;margin-bottom:16px;">
        <thead><tr style="background:#e2e8f0;"><th style="padding:6px 8px;font-size:12px;text-align:left;color:#64748b;">Domanda</th><th style="padding:6px 8px;font-size:12px;text-align:left;color:#64748b;">Risposta</th></tr></thead>
        <tbody>${answersHtml}</tbody>
      </table>
      <p style="margin:0;font-size:12px;color:#94a3b8;">Ricevuto il ${new Date().toLocaleString('it-IT')}</p>
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
    const profile = String(body?.profile ?? '').trim().slice(0, 50)
    const settore = String(body?.settore ?? '').trim().slice(0, 100)
    const answers = body?.answers && typeof body.answers === 'object' ? body.answers as Record<string, boolean> : {}
    const livello = String(body?.livello ?? '').trim().slice(0, 20)
    const punteggio = Number(body?.punteggio ?? 0)

    if (!nome || nome.length < 2) {
      return NextResponse.json({ error: 'Nome non valido.' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email non valida.' }, { status: 400 })
    }

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
        subject: `[Calcolatore] ${nome} — ${PROFILE_LABELS[profile] || profile} — Rischio ${livello}`,
        html: buildTeamEmail({ nome, email, profile, settore, answers, livello, punteggio }),
      })
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Calcolatore lead:', { nome, email, profile, settore, livello, punteggio })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[calcolatore] error:', error)
    return NextResponse.json({ error: 'Errore del server. Riprova.' }, { status: 500 })
  }
}
