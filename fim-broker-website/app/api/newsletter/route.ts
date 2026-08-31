/**
 * Iscrizione newsletter — POST /api/newsletter
 *
 * Ordine delle operazioni, e il perché:
 *   1. Supabase  → è l'iscrizione. Se fallisce, l'utente vede un errore.
 *   2. Resend audience → copia best-effort, salta se non configurata.
 *   3. Email di benvenuto + notifica interna → best-effort, non bloccano.
 *
 * Fino al 31/08/2026 il passo 1 non esisteva e il passo 2 era l'unico: con
 * RESEND_AUDIENCE_ID vuota in produzione la route rispondeva `{ ok: true }` e
 * scartava l'indirizzo, mentre il footer mostrava "Iscrizione confermata".
 * Da qui la regola di questo file: si conferma solo ciò che è stato scritto.
 */
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit, getIp } from '@/lib/rateLimit'
import { iscrivi, generaTokenDisiscrizione, salvaContattoResend } from '@/lib/newsletterStore'

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

function buildWelcomeHtml(email: string, unsubscribeUrl: string): string {
  const safeEmail = escapeHtml(email)
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 32px;">
      <p style="color: white; margin: 0; font-size: 20px; font-weight: 900; letter-spacing: -0.5px;">FIM Insurance Broker</p>
      <p style="color: #2FA36B; margin: 6px 0 0; font-size: 13px; font-weight: 600; letter-spacing: 1px;">CHIAREZZA IN AZIONE.</p>
    </div>
    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 18px; font-weight: 700;">Sei iscritto.</p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 18px;">
        Abbiamo registrato <strong>${safeEmail}</strong>. Ti scriveremo quando c'è qualcosa che cambia
        davvero le carte: una norma nuova, una scadenza che riguarda la tua categoria, un errore
        ricorrente che vediamo nelle polizze che ci passano sotto gli occhi.
      </p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 26px;">
        Niente invii a calendario per riempire la casella. Se in un mese non è successo niente
        di rilevante, quel mese non ricevi niente.
      </p>
      <div style="text-align: center; margin: 0 0 30px;">
        <a href="${BASE_URL}/blog"
           style="display: inline-block; background: #2FA36B; color: white; padding: 15px 34px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px;">
          Intanto leggi il blog →
        </a>
      </div>
      <div style="background: #f8fafc; border-left: 3px solid #0B1F3A; padding: 16px 20px; margin-bottom: 8px;">
        <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">
          Se hai una polizza in mano e non sai se ti copre davvero, mandacela:
          <a href="${BASE_URL}/seconda-opinione" style="color: #0B1F3A; font-weight: 600;">la seconda opinione</a>
          è gratuita e non ti vincola a niente.
        </p>
      </div>
    </div>
    <div style="background: #0B1F3A; padding: 22px 32px;">
      <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.9;">
        FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina<br>
        Iscrizione RUI n. B000405449 — <a href="${BASE_URL}" style="color: rgba(255,255,255,0.5);">www.fimbroker.it</a><br>
        Ricevi questa email perché ti sei iscritto alla newsletter su fimbroker.it.<br>
        <a href="${unsubscribeUrl}" style="color: rgba(255,255,255,0.7); text-decoration: underline;">Cancella l'iscrizione</a>
        &nbsp;·&nbsp;
        <a href="${BASE_URL}/privacy-policy" style="color: rgba(255,255,255,0.4);">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildTeamHtml(email: string, origine: string, esito: string): string {
  return `
<!DOCTYPE html>
<html lang="it"><head><meta charset="UTF-8"></head>
<body style="font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden;">
    <div style="background: #0B1F3A; padding: 18px 24px;">
      <h2 style="color: white; margin: 0; font-size: 16px;">✉️ Nuovo iscritto newsletter</h2>
    </div>
    <div style="padding: 20px 24px;">
      <p style="margin: 0 0 8px; font-size: 14px; color: #64748b;">Email: <a href="mailto:${escapeHtml(email)}" style="color: #0B1F3A;">${escapeHtml(email)}</a></p>
      <p style="margin: 0 0 8px; font-size: 14px; color: #64748b;">Esito: <strong>${escapeHtml(esito)}</strong></p>
      <p style="margin: 0 0 16px; font-size: 14px; color: #64748b;">Da: ${escapeHtml(origine || 'n/d')}</p>
      <p style="margin: 0; font-size: 12px; color: #94a3b8;">${new Date().toLocaleString('it-IT')}</p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: Request) {
  const { ok, retryAfter } = await rateLimit(req, { limit: 3, windowMs: 60 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche ora.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body = await req.json()

    // Honeypot: campo "website" compilato → bot, rispondi OK senza elaborare
    if (body?.website) {
      return NextResponse.json({ ok: true })
    }

    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase().slice(0, 200) : ''

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Inserisci un indirizzo email valido.' }, { status: 400 })
    }

    // Il consenso è la base giuridica dell'invio: senza, non si registra niente.
    if (body?.consenso !== true) {
      return NextResponse.json(
        { error: 'Serve il consenso al trattamento per iscriverti.' },
        { status: 400 },
      )
    }

    // ── 1. L'iscrizione ────────────────────────────────────────────────────────
    let esito: string
    try {
      esito = await iscrivi({
        email,
        ip: getIp(req),
        userAgent: req.headers.get('user-agent')?.slice(0, 300) ?? undefined,
        origine: typeof body?.origine === 'string' ? body.origine.slice(0, 200) : req.headers.get('referer')?.slice(0, 200) ?? undefined,
      })
    } catch (err) {
      console.error('[newsletter] salvataggio fallito:', err)
      return NextResponse.json(
        { error: 'Non siamo riusciti a registrare l\'iscrizione. Riprova tra qualche minuto.' },
        { status: 500 },
      )
    }

    // Chi è già iscritto non riceve un secondo benvenuto, né rigenera una notifica.
    if (esito === 'gia-iscritto') {
      return NextResponse.json({ ok: true, esito })
    }

    // ── 2. Copia su Resend, se l'audience esiste ───────────────────────────────
    // Il SDK Resend non lancia sugli errori dell'API: li restituisce in `error`.
    // Un try/catch da solo qui non vedrebbe niente.
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (resend && audienceId) {
      try {
        const { data, error } = await resend.contacts.create({ audienceId, email, unsubscribed: false })
        if (error) {
          // 409 = contatto già presente; 401 = chiave ristretta al solo invio.
          // In nessuno dei due casi l'iscrizione dell'utente è compromessa.
          console.error('[newsletter] Resend audience non aggiornata:', error.name, error.message)
        } else if (data?.id) {
          await salvaContattoResend(email, data.id)
        }
      } catch (err) {
        console.error('[newsletter] Resend audience irraggiungibile:', err)
      }
    }

    // ── 3. Benvenuto + notifica interna ────────────────────────────────────────
    if (resend) {
      const token = await generaTokenDisiscrizione(email)
      const unsubscribeUrl = `${BASE_URL}/newsletter/disiscriviti?t=${encodeURIComponent(token)}`
      const oneClickUrl = `${BASE_URL}/api/newsletter/disiscriviti?t=${encodeURIComponent(token)}`

      const invii = await Promise.allSettled([
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'Sei iscritto alla newsletter di FIM',
          html: buildWelcomeHtml(email, unsubscribeUrl),
          headers: {
            'List-Unsubscribe': `<${oneClickUrl}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        }),
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Newsletter] Nuovo iscritto — ${email}`,
          html: buildTeamHtml(email, String(body?.origine ?? req.headers.get('referer') ?? ''), esito),
        }),
      ])

      // L'iscrizione è già salvata: un invio fallito si logga, non si ribalta
      // sull'utente. Ma va loggato davvero, `error` compreso.
      const etichette = ['benvenuto', 'notifica interna']
      invii.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`[newsletter] invio ${etichette[i]} fallito:`, r.reason)
        } else if (r.value.error) {
          console.error(`[newsletter] invio ${etichette[i]} rifiutato da Resend:`, r.value.error.name, r.value.error.message)
        }
      })
    }

    return NextResponse.json({ ok: true, esito })
  } catch (err: unknown) {
    console.error('[newsletter] errore:', err)
    return NextResponse.json(
      { error: 'Si è verificato un errore. Riprova tra qualche minuto.' },
      { status: 500 },
    )
  }
}
