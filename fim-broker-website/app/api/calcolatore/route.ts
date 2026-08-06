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

const RISK_CONFIG: Record<string, { label: string; emoji: string; gradient: string; bar: string }> = {
  basso:  { label: 'BASSO',  emoji: '🟢', gradient: 'linear-gradient(135deg,#14532d,#16a34a)', bar: '#4ade80' },
  medio:  { label: 'MEDIO',  emoji: '🟡', gradient: 'linear-gradient(135deg,#78350f,#d97706)', bar: '#fbbf24' },
  alto:   { label: 'ALTO',   emoji: '🔴', gradient: 'linear-gradient(135deg,#7f1d1d,#dc2626)', bar: '#f87171' },
}

const PRIORITY_STYLE: Record<string, { bg: string; border: string; badge: string; dot: string }> = {
  urgente:    { bg: '#fff1f2', border: '#fecdd3', badge: '#fee2e2;color:#b91c1c', dot: '#dc2626' },
  alta:       { bg: '#fffbeb', border: '#fde68a', badge: '#fef3c7;color:#b45309', dot: '#d97706' },
  consigliata:{ bg: '#eff6ff', border: '#bfdbfe', badge: '#dbeafe;color:#1d4ed8', dot: '#3b82f6' },
}

const PRIORITY_LABEL: Record<string, string> = {
  urgente: 'URGENTE',
  alta: 'ALTA PRIORITÀ',
  consigliata: 'CONSIGLIATA',
}

interface AnswerDecoded { domanda: string; risposta: string }
interface CoperturaSummary { nome: string; priorita: 'urgente' | 'alta' | 'consigliata'; motivo: string }

function buildTeamEmail(data: {
  nome: string
  email: string
  profile: string
  settore: string
  livello: string
  punteggio: number
  answersDecoded: AnswerDecoded[]
  coperture: CoperturaSummary[]
  prezzoMin: number
  prezzoMax: number
}): string {
  const risk = RISK_CONFIG[data.livello] ?? RISK_CONFIG.medio
  const profileLabel = escapeHtml(PROFILE_LABELS[data.profile] || data.profile)
  const settore = escapeHtml(data.settore || 'n/d')
  const nome = escapeHtml(data.nome)
  const email = escapeHtml(data.email)
  const barWidth = Math.min(Math.max(data.punteggio, 0), 100)

  const answersHtml = data.answersDecoded.length > 0
    ? data.answersDecoded.map((a) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#475569;line-height:1.4;">${escapeHtml(a.domanda)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:#0B1F3A;white-space:nowrap;">${escapeHtml(a.risposta)}</td>
      </tr>`).join('')
    : `<tr><td colspan="2" style="padding:8px 12px;font-size:13px;color:#94a3b8;">Nessuna risposta registrata</td></tr>`

  const coperturHtml = data.coperture.length > 0
    ? data.coperture.map((c) => {
        const s = PRIORITY_STYLE[c.priorita] ?? PRIORITY_STYLE.consigliata
        const pLabel = PRIORITY_LABEL[c.priorita] ?? c.priorita
        return `
      <div style="background:${s.bg};border:1px solid ${s.border};border-radius:10px;padding:12px 14px;margin-bottom:8px;display:flex;align-items:flex-start;gap:10px;">
        <div style="width:10px;height:10px;border-radius:50%;background:${s.dot};flex-shrink:0;margin-top:4px;"></div>
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="font-size:14px;font-weight:800;color:#0B1F3A;">${escapeHtml(c.nome)}</span>
            <span style="font-size:10px;font-weight:700;letter-spacing:0.5px;padding:2px 8px;border-radius:100px;background:${s.badge};">${pLabel}</span>
          </div>
          <p style="margin:0;font-size:12px;color:#475569;line-height:1.5;">${escapeHtml(c.motivo)}</p>
        </div>
      </div>`
      }).join('')
    : `<p style="font-size:13px;color:#94a3b8;margin:0;">Nessuna copertura specifica calcolata.</p>`

  const budgetHtml = data.prezzoMin > 0 && data.prezzoMax > 0
    ? `<div style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
        <div style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">💶 Investimento annuo stimato</div>
        <div style="font-size:26px;font-weight:900;color:#0B1F3A;">€${data.prezzoMin.toLocaleString('it-IT')} – €${data.prezzoMax.toLocaleString('it-IT')} <span style="font-size:14px;font-weight:400;color:#94a3b8;">/anno</span></div>
        <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Stima indicativa sul profilo dichiarato — il preventivo reale può variare.</p>
      </div>`
    : ''

  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;margin:0;padding:24px 16px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">

    <!-- HEADER RISCHIO -->
    <div style="background:${risk.gradient};padding:32px;text-align:center;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.7);text-transform:uppercase;margin-bottom:10px;">📊 Calcolatore Rischi — Nuovo Lead</div>
      <div style="font-size:36px;font-weight:900;color:white;letter-spacing:-0.5px;">${risk.emoji} RISCHIO ${risk.label}</div>
      <div style="margin:16px auto 0;background:rgba(0,0,0,0.2);border-radius:100px;height:10px;overflow:hidden;max-width:280px;">
        <div style="height:100%;width:${barWidth}%;background:${risk.bar};border-radius:100px;transition:width 0.5s;"></div>
      </div>
      <div style="color:rgba(255,255,255,0.85);font-size:14px;font-weight:600;margin-top:8px;">${data.punteggio} / 100</div>
    </div>

    <!-- DATI CLIENTE -->
    <div style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:12px;">Cliente</div>
      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        <div style="flex:1;min-width:180px;">
          <div style="font-size:20px;font-weight:800;color:#0B1F3A;margin-bottom:2px;">${nome}</div>
          <a href="mailto:${email}" style="color:#0B1F3A;font-size:14px;text-decoration:none;">${email}</a>
        </div>
        <div style="flex:1;min-width:160px;">
          <div style="font-size:13px;font-weight:700;color:#1e293b;">${profileLabel}</div>
          <div style="font-size:13px;color:#64748b;margin-top:2px;">${settore}</div>
        </div>
      </div>
    </div>

    <!-- RISPOSTE Q&A -->
    <div style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:12px;">Risposte del cliente</div>
      <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #f1f5f9;">
        <thead>
          <tr style="background:#f8fafc;">
            <th style="padding:8px 12px;font-size:11px;text-align:left;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Domanda</th>
            <th style="padding:8px 12px;font-size:11px;text-align:left;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Risposta</th>
          </tr>
        </thead>
        <tbody>${answersHtml}</tbody>
      </table>
    </div>

    <!-- COPERTURE RACCOMANDATE -->
    <div style="padding:24px 32px;border-bottom:1px solid #f1f5f9;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:12px;">Coperture da preventivare</div>
      ${coperturHtml}
    </div>

    <!-- BUDGET -->
    ${budgetHtml}

    <!-- CTA -->
    <div style="padding:24px 32px;text-align:center;">
      <a href="mailto:${email}?subject=Analisi rischio — FIM Insurance Broker"
         style="display:inline-block;background:#0B1F3A;color:white;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
        Contatta il cliente →
      </a>
      <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">Ricevuto il ${new Date().toLocaleString('it-IT')}</p>
    </div>

    <!-- FOOTER -->
    <div style="background:#f8fafc;padding:14px 32px;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina — info@fimbroker.it</p>
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
    const profile = String(body?.profile ?? '').trim().slice(0, 50)
    const settore = String(body?.settore ?? '').trim().slice(0, 100)
    // Il client manda anche `answers` (le risposte grezze, id → boolean): non serve,
    // perché `answersDecoded` porta la stessa informazione già leggibile ed è quella
    // che finisce nell'email al team.
    const livello = String(body?.livello ?? '').trim().slice(0, 20)
    const punteggio = Number(body?.punteggio ?? 0)
    const prezzoMin = Number(body?.prezzoMin ?? 0)
    const prezzoMax = Number(body?.prezzoMax ?? 0)
    const answersDecoded: AnswerDecoded[] = Array.isArray(body?.answersDecoded)
      ? (body.answersDecoded as unknown[]).slice(0, 10).map((a) => ({
          domanda: String((a as Record<string, unknown>)?.domanda ?? '').slice(0, 200),
          risposta: String((a as Record<string, unknown>)?.risposta ?? '').slice(0, 100),
        }))
      : []
    const coperture: CoperturaSummary[] = Array.isArray(body?.coperture)
      ? (body.coperture as unknown[]).slice(0, 10).map((c) => ({
          nome: String((c as Record<string, unknown>)?.nome ?? '').slice(0, 100),
          priorita: (['urgente', 'alta', 'consigliata'].includes(String((c as Record<string, unknown>)?.priorita ?? ''))
            ? String((c as Record<string, unknown>)?.priorita)
            : 'consigliata') as 'urgente' | 'alta' | 'consigliata',
          motivo: String((c as Record<string, unknown>)?.motivo ?? '').slice(0, 300),
        }))
      : []

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
        subject: `[Calcolatore] ${nome} — ${PROFILE_LABELS[profile] || profile} — Rischio ${livello.toUpperCase()} (${punteggio}/100)`,
        html: buildTeamEmail({ nome, email, profile, settore, livello, punteggio, answersDecoded, coperture, prezzoMin, prezzoMax }),
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
