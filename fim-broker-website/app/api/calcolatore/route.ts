import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

const GESTIONALE_URL = process.env.GESTIONALE_API_URL || 'https://fim-gestionale-next.vercel.app'
const GESTIONALE_SECRET = process.env.WEBSITE_API_SECRET

/**
 * Manda la lead al gestionale, come fanno gli altri form del sito.
 *
 * Finché non c'era, il calcolatore era l'unico form che non lasciava traccia
 * da nessuna parte: mail al team e via. Chi non apriva quella mail non sapeva
 * che la lead esisteva, e le tre arrivate da maggio non sono mai entrate in
 * lavorazione.
 *
 * Non blocca la risposta all'utente: se il gestionale è giù, l'analisi la
 * vede lo stesso.
 */
async function syncLeadToGestionale(data: {
  nome: string; cognome: string; email: string
  tipo: string; profilo?: string; messaggio?: string
  lead_id?: string; referrer?: string
}) {
  if (!GESTIONALE_SECRET) {
    console.warn('[gestionale] WEBSITE_API_SECRET non configurata — sync lead saltata')
    return
  }
  try {
    const res = await fetch(`${GESTIONALE_URL}/api/website/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GESTIONALE_SECRET}`,
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[gestionale] Sync lead calcolatore fallita: HTTP ${res.status} — ${text}`)
    } else {
      console.log('[gestionale] Lead calcolatore sincronizzata:', await res.json().catch(() => ({})))
    }
  } catch (err) {
    console.error('[gestionale] Sync lead calcolatore — errore di rete:', err)
  }
}

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

/**
 * Il riepilogo al cliente.
 *
 * La casella che si spunta prima di vedere il risultato dice «Riceverò via
 * email il riepilogo dell'analisi». Questa mail non esisteva: partiva solo
 * quella al team, e chi compilava il calcolatore restava ad aspettare una
 * cosa promessa dal form.
 *
 * Ripete quello che ha già visto a schermo e nient'altro. La stima resta
 * dichiarata per quello che è — una forbice di profilo, non un preventivo —
 * perché è il numero su cui ci si ancora.
 */
function buildClientEmail(data: {
  nome: string
  livello: string
  punteggio: number
  coperture: CoperturaSummary[]
  prezzoMin: number
  prezzoMax: number
}): string {
  const risk = RISK_CONFIG[data.livello] ?? RISK_CONFIG.medio
  const nome = escapeHtml(data.nome.split(/\s+/)[0] ?? data.nome)

  const copertureHtml = data.coperture.length > 0
    ? data.coperture.map((c) => {
        const s = PRIORITY_STYLE[c.priorita] ?? PRIORITY_STYLE.consigliata
        return `
      <div style="background:${s.bg};border:1px solid ${s.border};border-radius:10px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:15px;font-weight:800;color:#0B1F3A;margin-bottom:5px;">${escapeHtml(c.nome)}
          <span style="font-size:10px;font-weight:700;letter-spacing:0.5px;padding:2px 8px;border-radius:100px;background:${s.badge};margin-left:6px;">${PRIORITY_LABEL[c.priorita] ?? c.priorita}</span>
        </div>
        <p style="margin:0;font-size:13px;color:#475569;line-height:1.55;">${escapeHtml(c.motivo)}</p>
      </div>`
      }).join('')
    : ''

  const stimaHtml = data.prezzoMin > 0 && data.prezzoMax > 0
    ? `<p style="margin:0 0 20px;font-size:14px;color:#475569;line-height:1.6;">
         La stima che hai visto, <strong>€${data.prezzoMin.toLocaleString('it-IT')}–€${data.prezzoMax.toLocaleString('it-IT')} l'anno</strong>, è la forbice tipica del tuo tipo di profilo per tutte le coperture messe insieme. Non è un preventivo: quello dipende da cosa fai davvero e da quanto fatturi, e per farlo servono due o tre domande in più.
       </p>`
    : ''

  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;margin:0;padding:24px 16px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;">

    <div style="background:${risk.gradient};padding:28px 32px;text-align:center;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.7);text-transform:uppercase;margin-bottom:8px;">La tua analisi del rischio</div>
      <div style="font-size:30px;font-weight:900;color:white;">${risk.emoji} RISCHIO ${risk.label}</div>
      <div style="color:rgba(255,255,255,0.85);font-size:14px;font-weight:600;margin-top:6px;">${data.punteggio} / 100</div>
    </div>

    <div style="padding:28px 32px;">
      <p style="margin:0 0 16px;font-size:15px;color:#1e293b;line-height:1.6;">Ciao ${nome}, ecco il riepilogo dell'analisi che hai appena fatto sul nostro sito.</p>

      <p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.6;">Il punteggio nasce da tre domande, quindi è un primo orientamento e non una misura del tuo lavoro. Quello che conta davvero sono le coperture che ne escono.</p>

      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin:24px 0 12px;">Le coperture da guardare</div>
      ${copertureHtml}

      <div style="margin-top:24px;"></div>
      ${stimaHtml}

      <p style="margin:0 0 8px;font-size:14px;color:#475569;line-height:1.6;">Se vuoi capire quale di queste ti serve davvero e a che condizioni, rispondi a questa mail e ne parliamo. Confrontiamo le offerte del mercato per te: siamo broker, non agenti di una compagnia, e la consulenza non ha un costo per te.</p>
    </div>

    <div style="padding:0 32px 28px;">
      <a href="https://www.fimbroker.it/preventivo" style="display:inline-block;background:#0B1F3A;color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">Richiedi un preventivo →</a>
      <p style="margin:14px 0 0;font-size:13px;color:#64748b;">Oppure: tel. 06 96883381 · WhatsApp 347 331 2330</p>
    </div>

    <div style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
      <p style="margin:0 0 6px;font-size:11px;color:#94a3b8;line-height:1.5;">FIM Insurance Broker S.a.s. di Manzo Arturo &amp; C. — Via Roma 41, 04012 Cisterna di Latina (LT)<br>Iscrizione RUI Sez. B n. B000405449 — P.IVA 02637640596 — info@fimbroker.it</p>
      <p style="margin:0;font-size:10px;color:#cbd5e1;line-height:1.5;">Ricevi questa mail perché hai richiesto l'analisi sul nostro calcolatore rischi. Messaggio con finalità promozionale: prima della sottoscrizione leggere il set informativo del prodotto scelto, disponibile presso FIM Insurance Broker. Le garanzie operano nei limiti e alle condizioni del contratto sottoscritto.</p>
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
    // Consenso alle comunicazioni commerciali: casella separata e facoltativa,
    // spenta di default. Vale solo se arriva esplicitamente true.
    const marketing = body?.marketing === true
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

    // Il calcolatore chiede un campo solo, «Nome»: ci finisce "Marco" quanto
    // "Marco Lorusso". Prima parola nel nome, il resto nel cognome. Se non c'è
    // un resto il cognome resta vuoto, e il gestionale ci scrive null.
    const [primoNome, ...restoNome] = nome.split(/\s+/)
    const cognome = restoNome.join(' ')

    // Nell'archivio il `tipo` è la cosa su cui si lavora, quindi ci va la
    // copertura più urgente delle tre, non la parola "calcolatore": da dove
    // arriva la lead lo dice il referrer.
    const coperturaPrincipale = coperture[0]?.nome || 'Analisi rischio'

    const riepilogo = [
      `Analisi dal calcolatore rischi — rischio ${livello} (${punteggio}/100)`,
      `Profilo: ${PROFILE_LABELS[profile] || profile}${settore ? ` — ${settore}` : ''}`,
      answersDecoded.length > 0 ? `\nRisposte:\n${answersDecoded.map((a) => `• ${a.domanda} → ${a.risposta}`).join('\n')}` : '',
      coperture.length > 0 ? `\nCoperture segnalate:\n${coperture.map((c) => `• ${c.nome} (${PRIORITY_LABEL[c.priorita] ?? c.priorita})`).join('\n')}` : '',
      prezzoMin > 0 && prezzoMax > 0 ? `\nForbice di profilo: €${prezzoMin}–€${prezzoMax}/anno (stima sul tipo di profilo, non un preventivo)` : '',
      '\nIl calcolatore non chiede il telefono: si ricontatta via mail.',
    ].filter(Boolean).join('\n')

    // Prima l'archivio, poi le mail. Se il gestionale è giù la funzione non
    // lancia e si va avanti lo stesso: l'utente vede l'analisi comunque.
    await syncLeadToGestionale({
      nome: primoNome,
      cognome,
      email,
      tipo: coperturaPrincipale,
      profilo: profile || undefined,
      messaggio: riepilogo,
      lead_id: `CALC-${Date.now()}`,
      referrer: 'calcolatore-rischi',
    })

    // L'indirizzo entra nell'audience Resend solo con il consenso marketing,
    // che è una casella a parte e facoltativa. La casella obbligatoria copre
    // il trattamento dei dati e il riepilogo dell'analisi, non le comunicazioni
    // commerciali future: sono due cose diverse e vanno chieste due volte.
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (resend && audienceId && marketing) {
      await resend.contacts.create({ audienceId, email, firstName: primoNome, unsubscribed: false }).catch(() => {
        // Ignore 409 (already exists)
      })
    }

    if (resend) {
      await Promise.all([
        // Al team
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Calcolatore] ${nome} — ${PROFILE_LABELS[profile] || profile} — Rischio ${livello.toUpperCase()} (${punteggio}/100)`,
          html: buildTeamEmail({ nome, email, profile, settore, livello, punteggio, answersDecoded, coperture, prezzoMin, prezzoMax }),
        }),
        // Al cliente: il riepilogo che la casella privacy gli promette
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'La tua analisi del rischio — FIM Insurance Broker',
          html: buildClientEmail({ nome, livello, punteggio, coperture, prezzoMin, prezzoMax }),
        }),
      ])
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Calcolatore lead:', { nome, email, profile, settore, livello, punteggio })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[calcolatore] error:', error)
    return NextResponse.json({ error: 'Errore del server. Riprova.' }, { status: 500 })
  }
}
