import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'
import { saveLead } from '@/lib/leadStore'
import { sendLeadFromRequest } from '@/lib/metaCapi'

interface PreventivoRequest {
  tipo: string
  profilo?: string // privato | professionista | pmi | impresa
  nome: string
  cognome: string
  email: string
  telefono: string
  targa?: string // solo per coperture auto
  messaggio?: string
  oggetto?: string
  privacy: boolean
  website?: string // honeypot — deve essere assente o vuoto
  // Meta Conversions API (deduplica col Pixel browser)
  eventId?: string
  eventSourceUrl?: string
  marketingConsent?: boolean
  // UTM attribution
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  referrer?: string
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
  if (!GESTIONALE_SECRET) {
    console.warn('[gestionale] WEBSITE_API_SECRET non configurata — sync lead saltata')
    return
  }
  const url = `${GESTIONALE_URL}/api/website/lead`
  console.log(`[gestionale] Invio lead a ${url} — ${data.nome} ${data.cognome}`)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GESTIONALE_SECRET}`,
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[gestionale] Sync lead fallita: HTTP ${res.status} — ${text}`)
    } else {
      const result = await res.json().catch(() => ({}))
      console.log(`[gestionale] Lead sincronizzata OK:`, result)
    }
  } catch (err) {
    console.error('[gestionale] Sync lead — errore di rete:', err)
  }
}

const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

const PROFILO_PRIORITY: Record<string, { label: string; color: string; bg: string; border: string; sla: string }> = {
  impresa:      { label: '🔴 Alta priorità', color: '#b91c1c', bg: '#fff1f2', border: '#fecdd3', sla: 'Rispondere entro 4 ore lavorative' },
  pmi:          { label: '🟠 Alta priorità', color: '#b45309', bg: '#fffbeb', border: '#fde68a', sla: 'Rispondere entro 24 ore lavorative' },
  professionista:{ label: '🟡 Media priorità', color: '#854d0e', bg: '#fefce8', border: '#fef08a', sla: 'Rispondere entro 24 ore lavorative' },
  privato:      { label: '🟢 Standard',       color: '#166534', bg: '#f0fdf4', border: '#bbf7d0', sla: 'Rispondere entro 24 ore lavorative' },
}

const PROFILO_LABELS_IT: Record<string, string> = {
  privato: 'Privato',
  professionista: 'Libero Professionista',
  pmi: 'PMI / Artigiano',
  impresa: 'Grande Impresa',
}

function getDocumentiDaRichiedere(tipo: string): string[] {
  const t = tipo.toLowerCase()
  if (t.includes('auto') || t.includes('kasko') || t.includes('flotta')) {
    return ['Targa/targhe veicoli e carta di circolazione', 'Anni di patente e attestato di rischio (per auto)', 'Km annui percorsi / uso (privato o professionale)', 'Polizze RC auto in essere (compagnia + scadenza)']
  }
  if (t.includes('casa') || t.includes('immobil') || t.includes('catastrofi') || t.includes('catastrofal')) {
    return ['Indirizzo immobile e anno di costruzione', 'Valore stimato di ricostruzione (€)', 'Proprietario o conduttore?', 'Polizze casa in essere (compagnia + massimale)']
  }
  if (t.includes('vita') || t.includes('caso morte') || t.includes('previdenza')) {
    return ['Data di nascita e professione', 'Reddito annuo lordo indicativo', 'Familiari a carico e loro età', 'Polizze vita/previdenza già attive']
  }
  if (t.includes('salute') || t.includes('infortun') || t.includes('welfare')) {
    return ['Data di nascita', 'Stato di salute generale (patologie rilevanti)', 'Professione e attività svolta', 'Polizze sanitarie in essere']
  }
  if (t.includes('rc profes') || t.includes('tutela legal')) {
    return ['Ordine/albo professionale di appartenenza', 'Fatturato annuo e numero clienti/commesse', 'Massimale RC richiesto o già in essere', 'Polizze RC in essere (compagnia + scadenza + massimale)']
  }
  if (t.includes('cyber') || t.includes('privacy') || t.includes('gdpr')) {
    return ['Numero dipendenti e fatturato annuo', 'Tipo di dati trattati (clienti, salute, finanziario…)', 'Sistemi IT principali (cloud, server on-premise, ERP)', 'Eventuali incidenti informatici negli ultimi 3 anni']
  }
  if (t.includes('rc impresa') || t.includes('rc prodott') || t.includes('all risk') || t.includes('aziendal') || t.includes('property')) {
    return ['Visura camerale e ATECO', 'Fatturato annuo e numero dipendenti', 'Descrizione attività e prodotti/servizi offerti', 'Valore attrezzature/macchinari e magazzino', 'Polizze aziendali in essere']
  }
  if (t.includes('d&o') || t.includes('directors') || t.includes('officers')) {
    return ['Struttura societaria (SRL, SPA, ecc.) e CDA', 'Fatturato e totale attivo bilancio', 'Settore e mercati in cui opera', 'Eventuali contenziosi societari in corso']
  }
  if (t.includes('condomin')) {
    return ['Numero unità abitative e piano più alto', 'Anno di costruzione e valore stimato dell\'edificio', 'Presenza ascensori, impianti comuni (caldaia, piscina…)', 'Polizza condominiale in essere (massimale + scadenza)']
  }
  // Generico
  return ['Profilo cliente (privato, professionista, azienda)', 'Esigenze specifiche e coperture già attive', 'Budget indicativo annuo', 'Eventuali sinistri negli ultimi 3 anni']
}

function buildTeamEmailHtml(data: {
  id: string
  tipo: string
  profilo?: string
  nome: string
  cognome: string
  email: string
  telefono: string
  targa?: string
  messaggio: string
  timestamp: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
}): string {
  const tipo = escapeHtml(data.tipo)
  const nome = escapeHtml(data.nome)
  const cognome = escapeHtml(data.cognome)
  const email = escapeHtml(data.email)
  const telefono = escapeHtml(data.telefono)
  const targa = data.targa ? escapeHtml(data.targa) : ''
  const messaggio = escapeHtml(data.messaggio)

  const profiloKey = (data.profilo ?? '').toLowerCase()
  const priority = PROFILO_PRIORITY[profiloKey] ?? PROFILO_PRIORITY.privato
  const profiloLabel = escapeHtml(PROFILO_LABELS_IT[profiloKey] || data.profilo || 'n/d')
  const documenti = getDocumentiDaRichiedere(data.tipo)
  const documentiHtml = documenti
    .map((d) => `<li style="margin-bottom:5px;font-size:13px;color:#374151;">${escapeHtml(d)}</li>`)
    .join('')

  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; margin: 0; padding: 24px 16px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 28px 32px;">
      <div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; color: rgba(255,255,255,0.6); text-transform: uppercase; margin-bottom: 8px;">🔔 Nuova Richiesta Preventivo</div>
      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900;">${tipo}</h1>
      <p style="color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 12px;">ID: ${data.id}</p>
    </div>

    <!-- Badge priorità -->
    <div style="padding: 14px 32px; background: ${priority.bg}; border-bottom: 1px solid ${priority.border};">
      <span style="font-size: 13px; font-weight: 700; color: ${priority.color};">${priority.label}</span>
      <span style="font-size: 13px; color: ${priority.color}; margin-left: 8px;">— ${priority.sla}</span>
    </div>

    <!-- Dati cliente e polizza -->
    <div style="padding: 24px 32px; border-bottom: 1px solid #f1f5f9;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc; width: 38%;">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Cliente</span>
          </td>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc;">
            <span style="font-size: 16px; color: #0B1F3A; font-weight: 800;">${nome} ${cognome}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc;">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Profilo</span>
          </td>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc;">
            <span style="font-size: 14px; font-weight: 700; color: #1e293b;">${profiloLabel}</span>
          </td>
        </tr>
        ${targa ? `
        <tr>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc;">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Targa</span>
          </td>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc;">
            <span style="font-size: 15px; font-weight: 800; color: #0B1F3A; letter-spacing: 1px; font-family: ui-monospace, monospace;">${targa}</span>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc;">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Email</span>
          </td>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc;">
            <a href="mailto:${email}" style="color: #0B1F3A; font-size: 14px; text-decoration: none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc;">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Telefono</span>
          </td>
          <td style="padding: 9px 0; border-bottom: 1px solid #f8fafc;">
            <a href="tel:${telefono}" style="color: #0B1F3A; font-size: 14px; text-decoration: none; font-weight: 600;">${telefono}</a>
          </td>
        </tr>
        ${messaggio ? `
        <tr>
          <td style="padding: 10px 0;" colspan="2">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Note cliente</span>
            <p style="margin: 8px 0 0; color: #475569; font-size: 14px; line-height: 1.6; background: #f8fafc; padding: 12px 14px; border-radius: 8px; border-left: 3px solid #0B1F3A;">${messaggio}</p>
          </td>
        </tr>` : ''}
      </table>
    </div>

    <!-- Documenti da richiedere -->
    <div style="padding: 20px 32px; border-bottom: 1px solid #f1f5f9; background: #fafafa;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 10px;">📋 Documenti / dati da richiedere al cliente</div>
      <ul style="margin: 0; padding-left: 18px; line-height: 1.8;">
        ${documentiHtml}
      </ul>
    </div>

    <!-- Timestamp + UTM -->
    <div style="padding: 16px 32px; border-bottom: 1px solid #f1f5f9;">
      <p style="margin: 0; font-size: 13px; color: #64748b;">
        ⏰ Ricevuta il <strong>${new Date(data.timestamp).toLocaleString('it-IT')}</strong>
      </p>
      ${(data.utm_source || data.utm_medium || data.utm_campaign || data.referrer) ? `
      <div style="margin-top: 10px; font-size: 12px; color: #94a3b8; line-height: 1.8;">
        ${data.utm_source ? `📌 Fonte: <strong>${escapeHtml(data.utm_source)}</strong>&nbsp;&nbsp;` : ''}
        ${data.utm_medium ? `📣 Mezzo: <strong>${escapeHtml(data.utm_medium)}</strong>&nbsp;&nbsp;` : ''}
        ${data.utm_campaign ? `🎯 Campagna: <strong>${escapeHtml(data.utm_campaign)}</strong>` : ''}
        ${data.referrer ? `<br>🔗 Referrer: ${escapeHtml(data.referrer)}` : ''}
      </div>` : ''}
    </div>

    <!-- CTA -->
    <div style="padding: 24px 32px; text-align: center;">
      <a href="mailto:${email}?subject=Preventivo ${tipo} — FIM Insurance Broker&amp;body=Gentile ${nome},"
         style="display: inline-block; background: #0B1F3A; color: white; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">
        Rispondi al cliente →
      </a>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 14px 32px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 11px; color: #94a3b8; text-align: center;">
        FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina — info@fimbroker.it
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
    <div style="background: linear-gradient(135deg, #060f1d, #0B1F3A, #132d52); padding: 36px 32px; text-align: center;">
      <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #0B1F3A, #2FA36B); border-radius: 18px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <span style="color: white; font-weight: 900; font-size: 28px;">F</span>
      </div>
      <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900;">Richiesta ricevuta!</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px;">FIM Insurance Broker</p>
    </div>

    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 16px;">Gentile <strong>${nome}</strong>,</p>
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 20px;">
        Abbiamo ricevuto la tua richiesta di preventivo per <strong style="color: #0B1F3A;">${tipo}</strong>.
        Il nostro team la analizzerà e ti contatterà entro <strong>24 ore lavorative</strong> con
        la soluzione più adatta alle tue esigenze.
      </p>

      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 20px; margin: 24px 0;">
        <p style="margin: 0 0 12px; font-weight: 700; color: #0B1F3A; font-size: 14px;">Cosa aspettarti:</p>
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
           style="display: inline-block; background: #2FA36B; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">
          📞 06 96883381
        </a>
      </div>
    </div>

    <div style="background: #0B1F3A; padding: 20px 32px;">
      <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.8;">
        FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina<br>
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
    <div style="background:linear-gradient(135deg,#060f1d,#0B1F3A,#132d52);padding:32px;text-align:center;">
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
           style="display:inline-block;background:#2FA36B;color:white;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">
          Prenota consulenza gratuita →
        </a>
      </div>
      <p style="font-size:13px;color:#94a3b8;text-align:center;margin:0 0 32px;">
        Oppure chiamaci: <a href="tel:+390696883381" style="color:#0B1F3A;">06 96883381</a>
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
    <div style="background:#0B1F3A;padding:16px 32px;">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);text-align:center;">
        FIM Insurance Broker S.a.s. — <a href="${BASE_URL}/privacy-policy" style="color:rgba(255,255,255,0.4);">Privacy Policy</a>
      </p>
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
    const body: PreventivoRequest = await req.json()

    const nome = sanitize(body.nome)
    const cognome = sanitize(body.cognome)
    const email = sanitize(body.email)
    const telefono = sanitize(body.telefono)
    const tipo = sanitize(body.tipo)
    const targa = sanitize(body.targa).slice(0, 15)
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

    // UTM attribution — sanitizzati e troncati
    const utm = {
      utm_source: body.utm_source ? sanitize(body.utm_source).slice(0, 100) : undefined,
      utm_medium: body.utm_medium ? sanitize(body.utm_medium).slice(0, 100) : undefined,
      utm_campaign: body.utm_campaign ? sanitize(body.utm_campaign).slice(0, 150) : undefined,
      utm_content: body.utm_content ? sanitize(body.utm_content).slice(0, 150) : undefined,
      utm_term: body.utm_term ? sanitize(body.utm_term).slice(0, 150) : undefined,
      referrer: body.referrer ? sanitize(body.referrer).slice(0, 300) : undefined,
    }

    const preventivoData = {
      id: `FIM-${Date.now()}`,
      tipo, profilo: profilo || undefined, nome, cognome, email, telefono,
      targa: targa || undefined, messaggio,
      timestamp: new Date().toISOString(),
      ...utm,
    }

    // La targa non ha una colonna dedicata in CRM/lead store: la accodiamo al
    // messaggio così resta visibile al broker e all'AI di lead scoring.
    const messaggioPersistito = targa
      ? `Targa: ${targa}${messaggio ? `\n\n${messaggio}` : ''}`
      : messaggio

    // Follow-up schedulato a 72 ore
    const followUpAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()

    // Sincronizza lead nel gestionale esterno (PRIORITÀ — con await)
    try {
      await syncLeadToGestionale({ nome, cognome, email, telefono, tipo, profilo: profilo || undefined, messaggio: messaggioPersistito || undefined })
    } catch (syncErr) {
      console.error('[preventivo] Sync gestionale fallita:', syncErr)
    }

    // Salva lead su Supabase locale del sito (secondario)
    try {
      await saveLead({ id: preventivoData.id, nome, cognome, email, telefono, tipo, profilo: profilo || undefined, messaggio: messaggioPersistito || undefined, timestamp: preventivoData.timestamp })
    } catch { /* non blocca */ }

    // Meta Conversions API — invio server-side dell'evento 'Lead' (deduplicato
    // col Pixel browser via lo stesso eventId). Solo con consenso marketing
    // pieno prestato lato client (stesso gating GDPR del Pixel). Non blocca il
    // lead: sendLeadFromRequest non lancia mai e salta da sé se manca il token.
    await sendLeadFromRequest(req, {
      eventId: body.eventId,
      eventSourceUrl: body.eventSourceUrl,
      marketingConsent: body.marketingConsent,
      email,
      phone: telefono,
      firstName: nome,
      lastName: cognome,
      contentCategory: 'preventivo',
    })

    // Invia email se Resend è configurato
    if (resend) {
      await Promise.all([
        // Email al team FIM
        resend.emails.send({
          from: FIM_FROM,
          to: [FIM_EMAIL],
          subject: `[Preventivo] ${tipo} — ${nome} ${cognome}${profilo ? ` (${profilo})` : ''}`,
          html: buildTeamEmailHtml({
            ...preventivoData,
            utm_source: utm.utm_source,
            utm_medium: utm.utm_medium,
            utm_campaign: utm.utm_campaign,
            referrer: utm.referrer,
          }),
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
