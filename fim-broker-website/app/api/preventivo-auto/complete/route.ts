import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'
import { getSupabase } from '@/lib/supabase'
import {
  DOC_BUCKET,
  DOC_PATH_PREFIX,
  DOC_SLOT_LABELS,
  isValidDocSlot,
} from '@/lib/preventivoDocumenti'

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
const FIM_EMAIL = process.env.FIM_EMAIL || 'rca@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

// I link firmati scadono dopo 7 giorni: tempo sufficiente al team per scaricarli.
const SIGNED_URL_TTL = 60 * 60 * 24 * 7

interface DocInput {
  slot: string
  path: string
}

function buildTeamEmailHtml(data: {
  id: string
  nome: string
  email: string
  telefono: string
  targa: string
  note: string
  utmSource: string
  links: { label: string; url: string }[]
}): string {
  const nome = escapeHtml(data.nome)
  const email = escapeHtml(data.email)
  const telefono = escapeHtml(data.telefono)
  const targa = escapeHtml(data.targa)
  const note = escapeHtml(data.note)

  const rows = data.links
    .map(
      (l) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#1e293b;">${escapeHtml(l.label)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;text-align:right;">
          <a href="${l.url}" style="font-size:13px;font-weight:700;color:#00b4c8;">Scarica →</a>
        </td>
      </tr>`,
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background:#f8fafc; margin:0; padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
    <div style="background:linear-gradient(135deg,#091d47,#0f2d6b);padding:28px 32px;">
      <h1 style="color:white;margin:0;font-size:20px;font-weight:900;">🚗 Documenti preventivo auto</h1>
      <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:13px;">ID: ${escapeHtml(data.id)} · ${data.links.length} documenti</p>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Cliente</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#1e293b;">${nome}</td></tr>
        <tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:6px 0;text-align:right;"><a href="mailto:${email}" style="color:#0f2d6b;">${email}</a></td></tr>
        <tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Telefono</td><td style="padding:6px 0;text-align:right;"><a href="tel:${telefono}" style="color:#0f2d6b;">${telefono}</a></td></tr>
        ${targa ? `<tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Targa</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#1e293b;">${targa}</td></tr>` : ''}
        ${data.utmSource ? `<tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Fonte</td><td style="padding:6px 0;text-align:right;color:#1e293b;">${escapeHtml(data.utmSource)}</td></tr>` : ''}
      </table>
      ${note ? `<p style="background:#f8fafc;border-radius:8px;padding:12px 16px;font-size:14px;color:#475569;margin:0 0 20px;">${note}</p>` : ''}
      <p style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Documenti (link validi 7 giorni)</p>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>
    <div style="padding:16px 32px;background:#f8fafc;">
      <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina — documenti riservati, da non inoltrare.</p>
    </div>
  </div>
</body>
</html>`
}

function buildClientConfirmHtml(nome: string): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, sans-serif; background:#f8fafc; margin:0; padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
    <div style="background:linear-gradient(135deg,#091d47,#0f2d6b);padding:28px 32px;">
      <h1 style="color:white;margin:0;font-size:20px;font-weight:900;">Documenti ricevuti ✓</h1>
    </div>
    <div style="padding:28px 32px;color:#475569;font-size:15px;line-height:1.6;">
      <p style="margin:0 0 16px;">Ciao ${escapeHtml(nome)},</p>
      <p style="margin:0 0 16px;">abbiamo ricevuto i documenti per il preventivo auto. Il nostro team li sta esaminando e ti ricontatterà entro 24 ore lavorative con la soluzione più conveniente.</p>
      <p style="margin:0 0 16px;">I tuoi documenti sono conservati in modo sicuro e protetto, usati solo per la preventivazione e cancellati al termine.</p>
      <p style="margin:0;">Per qualsiasi cosa: <a href="tel:+390696883381" style="color:#0f2d6b;">06 96883381</a> · <a href="mailto:rca@fimbroker.it" style="color:#0f2d6b;">rca@fimbroker.it</a></p>
    </div>
    <div style="padding:16px 32px;background:#f8fafc;">
      <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center;">FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina — info@fimbroker.it</p>
    </div>
  </div>
</body>
</html>`
}

/**
 * Step 2: dopo che il client ha caricato i file sui signed upload URL,
 * il server genera i signed download URL (a scadenza) e notifica il team
 * FIM + invia conferma al cliente. Nessun documento transita da qui.
 */
export async function POST(req: NextRequest) {
  const { ok, retryAfter } = await rateLimit(req, { limit: 10, windowMs: 60 * 60_000 })
  if (!ok) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche ora.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  try {
    const body = await req.json()

    // Honeypot anti-bot
    if (sanitize(body?.website)) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const id = sanitize(body?.id).replace(/[^A-Za-z0-9-]/g, '')
    const nome = sanitize(body?.nome)
    const email = sanitize(body?.email)
    const telefono = sanitize(body?.telefono)
    const targa = sanitize(body?.targa).toUpperCase().slice(0, 12)
    const note = sanitize(body?.note)
    const privacy = body?.privacy === true
    const utmSource = sanitize(body?.utmSource).slice(0, 120)
    const documenti: DocInput[] = Array.isArray(body?.documenti) ? body.documenti : []

    if (!id || !nome || !email || !telefono) {
      return NextResponse.json({ error: 'Compila tutti i campi obbligatori.' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Indirizzo email non valido.' }, { status: 400 })
    }
    if (!privacy) {
      return NextResponse.json({ error: 'Consenso al trattamento dei documenti obbligatorio.' }, { status: 400 })
    }
    if (documenti.length === 0) {
      return NextResponse.json({ error: 'Nessun documento caricato.' }, { status: 400 })
    }

    const sb = getSupabase()
    if (!sb) {
      return NextResponse.json(
        { error: 'Servizio non disponibile. Contattaci al +39 06 96883381.' },
        { status: 503 },
      )
    }

    // Genera i signed download URL solo per i path validi e coerenti con l'ID.
    const expectedPrefix = `${DOC_PATH_PREFIX}/${id}/`
    const links: { label: string; url: string }[] = []
    for (const doc of documenti) {
      if (!isValidDocSlot(doc.slot)) continue
      const path = sanitize(doc.path)
      if (!path.startsWith(expectedPrefix)) continue
      const { data, error } = await sb.storage.from(DOC_BUCKET).createSignedUrl(path, SIGNED_URL_TTL)
      if (error || !data?.signedUrl) continue
      links.push({ label: DOC_SLOT_LABELS[doc.slot] ?? doc.slot, url: data.signedUrl })
    }

    if (links.length === 0) {
      return NextResponse.json({ error: 'Documenti non trovati. Riprova il caricamento.' }, { status: 400 })
    }

    const payload = { id, nome, email, telefono, targa, note, utmSource, links }

    if (resend) {
      await Promise.all([
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Preventivo Auto] ${nome}${targa ? ` — ${targa}` : ''} (${links.length} documenti)`,
          html: buildTeamEmailHtml(payload),
        }),
        resend.emails.send({
          from: FIM_FROM,
          to: [email],
          subject: 'Documenti ricevuti — Preventivo Auto FIM Insurance Broker',
          html: buildClientConfirmHtml(nome),
        }),
      ])
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Preventivo auto documenti (email non inviata — imposta RESEND_API_KEY):', {
        id, nome, email, telefono, targa, numDoc: links.length,
      })
    }

    return NextResponse.json(
      { success: true, message: 'Documenti inviati con successo.', id },
      { status: 200 },
    )
  } catch (error) {
    console.error('[preventivo-auto/complete] error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server. Riprova o contattaci direttamente.' },
      { status: 500 },
    )
  }
}
