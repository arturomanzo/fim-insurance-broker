/**
 * Newsletter mensile — composizione e invio.
 *
 * Il giro è in due tempi, di proposito:
 *   1. il cron del giorno 1 raccoglie gli articoli usciti dall'ultimo invio,
 *      salva la bozza e manda l'anteprima ad Arturo;
 *   2. niente parte finché quell'anteprima non viene approvata.
 *
 * È lo stesso schema delle bozze WhatsApp e delle proposte di FIMA: quello che
 * arriva a una persona vera passa da una conferma. Qui conta il doppio, perché
 * un invio sbagliato a una lista non si richiama indietro.
 *
 * Il vincolo `unique` su `periodo` è la seconda rete: la riga si crea prima di
 * spedire, quindi un errore a metà invio lascia il mese già preso.
 */

import { Resend } from 'resend'
import { getSupabase } from './supabase'
import { getPostsSince, parseItalianDate, type BlogPost } from './blog'
import { generaTokenDisiscrizione, getIscrittiAttivi } from './newsletterStore'
import { firma, verifica } from './tokenFirmato'

const TABLE = 'website_newsletter_invii'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'

/** Resend accetta 100 email per chiamata batch. */
const BATCH = 100

/**
 * Tetto di sicurezza per esecuzione. Non è una previsione di crescita: è il
 * limite oltre il quale preferisco che il job si fermi e lo dica, invece di
 * scoprire a cose fatte che ha spedito a una lista che non mi aspettavo.
 */
const MAX_DESTINATARI = 2000

export interface Bozza {
  periodo: string
  oggetto: string
  html: string
  articoli: string[]
  destinatari: number
}

// ── Token di approvazione ─────────────────────────────────────────────────────

const SCOPE = 'newsletter-invio'
const APPROVAZIONE_TTL_GIORNI = 14

export async function generaTokenApprovazione(periodo: string): Promise<string> {
  return firma(SCOPE, { periodo }, APPROVAZIONE_TTL_GIORNI * 24 * 60 * 60)
}

/** Periodo contenuto nel token, oppure null se firma sbagliata o scaduto. */
export async function verificaTokenApprovazione(token: string): Promise<string | null> {
  const body = await verifica<{ periodo?: string }>(SCOPE, token)
  return typeof body?.periodo === 'string' && body.periodo ? body.periodo : null
}

// ── Composizione ──────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function periodoCorrente(now = new Date()): string {
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
}

/** Segnaposto sostituito destinatario per destinatario al momento dell'invio. */
export const UNSUBSCRIBE_PLACEHOLDER = '{{UNSUBSCRIBE_URL}}'

export function buildNewsletterHtml(posts: BlogPost[]): string {
  const articoli = posts
    .map((p) => {
      const data = new Date(parseItalianDate(p.date)).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'long',
      })
      return `
      <div style="border-bottom: 1px solid #e2e8f0; padding: 20px 0;">
        <p style="margin: 0 0 6px; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
          ${escapeHtml(p.category)} · ${escapeHtml(data)}
        </p>
        <p style="margin: 0 0 8px; font-size: 17px; font-weight: 700; color: #0B1F3A; line-height: 1.35;">
          <a href="${BASE_URL}/blog/${encodeURIComponent(p.slug)}" style="color: #0B1F3A; text-decoration: none;">${escapeHtml(p.title)}</a>
        </p>
        <p style="margin: 0 0 10px; font-size: 14px; color: #475569; line-height: 1.65;">${escapeHtml(p.excerpt)}</p>
        <a href="${BASE_URL}/blog/${encodeURIComponent(p.slug)}" style="font-size: 14px; color: #237A4E; font-weight: 600; text-decoration: none;">Leggi &rarr;</a>
      </div>`
    })
    .join('')

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
    <div style="padding: 28px 32px 8px;">
      <p style="font-size: 15px; color: #475569; line-height: 1.7; margin: 0 0 4px;">
        Quello che è uscito dall'ultima volta che ti abbiamo scritto.
      </p>
    </div>
    <div style="padding: 0 32px 24px;">
      ${articoli}
    </div>
    <div style="padding: 0 32px 32px;">
      <div style="background: #f8fafc; border-left: 3px solid #0B1F3A; padding: 16px 20px;">
        <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">
          Hai una polizza e non sai se ti copre davvero?
          <a href="${BASE_URL}/seconda-opinione" style="color: #0B1F3A; font-weight: 600;">Mandacela</a>:
          la leggiamo noi, gratis, e non ti vincola a niente.
        </p>
      </div>
    </div>
    <div style="background: #0B1F3A; padding: 22px 32px;">
      <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5); text-align: center; line-height: 1.9;">
        FIM Insurance Broker S.a.s. — Via Roma 41, 04012 Cisterna di Latina<br>
        Iscrizione RUI n. B000405449 — <a href="${BASE_URL}" style="color: rgba(255,255,255,0.5);">www.fimbroker.it</a><br>
        Ricevi questa email perché ti sei iscritto alla newsletter su fimbroker.it.<br>
        <a href="${UNSUBSCRIBE_PLACEHOLDER}" style="color: rgba(255,255,255,0.7); text-decoration: underline;">Cancella l'iscrizione</a>
        &nbsp;·&nbsp;
        <a href="${BASE_URL}/privacy-policy" style="color: rgba(255,255,255,0.4);">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

// ── Bozza ─────────────────────────────────────────────────────────────────────

/** Data dell'ultimo invio riuscito, o null se non ne esiste ancora uno. */
async function dataUltimoInvio(): Promise<Date | null> {
  const sb = getSupabase()
  if (!sb) throw new Error('Supabase non configurato')
  const { data, error } = await sb
    .from(TABLE)
    .select('inviato_at')
    .eq('stato', 'inviato')
    .order('inviato_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw new Error(`Supabase select ultimo invio: ${error.message}`)
  return data?.inviato_at ? new Date(data.inviato_at as string) : null
}

export type EsitoPreparazione =
  | { stato: 'gia-preso'; periodo: string }
  | { stato: 'niente-da-dire'; periodo: string }
  | { stato: 'nessun-iscritto'; periodo: string }
  | { stato: 'troppi-destinatari'; periodo: string; destinatari: number }
  | { stato: 'bozza-pronta'; bozza: Bozza; token: string }

/**
 * Prepara la bozza del periodo e la registra. Non spedisce niente agli iscritti.
 *
 * Al primo giro non esiste un invio precedente: si guarda indietro di 60 giorni
 * invece di prendere tutti i 39 articoli dell'archivio.
 */
export async function preparaBozza(now = new Date()): Promise<EsitoPreparazione> {
  const sb = getSupabase()
  if (!sb) throw new Error('Supabase non configurato')

  const periodo = periodoCorrente(now)

  const { data: esistente, error: selErr } = await sb
    .from(TABLE)
    .select('id')
    .eq('periodo', periodo)
    .maybeSingle()
  if (selErr) throw new Error(`Supabase select periodo: ${selErr.message}`)
  if (esistente) return { stato: 'gia-preso', periodo }

  const ultimo = await dataUltimoInvio()
  const da = ultimo ?? new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)
  const posts = getPostsSince(da)
  if (posts.length === 0) return { stato: 'niente-da-dire', periodo }

  const iscritti = await getIscrittiAttivi()
  if (iscritti.length === 0) return { stato: 'nessun-iscritto', periodo }
  if (iscritti.length > MAX_DESTINATARI) {
    return { stato: 'troppi-destinatari', periodo, destinatari: iscritti.length }
  }

  const html = buildNewsletterHtml(posts)
  const oggetto =
    posts.length === 1
      ? posts[0].title
      : `${posts.length} cose che potrebbero riguardarti`

  const { error: insErr } = await sb.from(TABLE).insert({
    id: crypto.randomUUID(),
    periodo,
    stato: 'bozza',
    articoli: posts.map((p) => p.slug),
    oggetto,
    html,
  })
  // Due esecuzioni ravvicinate: il vincolo unique ha già deciso chi vince.
  if (insErr) {
    if (insErr.code === '23505') return { stato: 'gia-preso', periodo }
    throw new Error(`Supabase insert bozza: ${insErr.message}`)
  }

  return {
    stato: 'bozza-pronta',
    bozza: { periodo, oggetto, html, articoli: posts.map((p) => p.slug), destinatari: iscritti.length },
    token: await generaTokenApprovazione(periodo),
  }
}

/** Manda ad Arturo l'anteprima esatta, col link per approvare. */
export async function inviaAnteprima(bozza: Bozza, token: string): Promise<void> {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY non configurata')
  const resend = new Resend(key)

  const urlApprova = `${BASE_URL}/newsletter/invia?t=${encodeURIComponent(token)}`
  const anteprima = bozza.html.replace(
    UNSUBSCRIBE_PLACEHOLDER,
    `${BASE_URL}/newsletter/disiscriviti?t=anteprima`,
  )

  const intestazione = `
  <div style="max-width: 600px; margin: 0 auto 20px; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px; padding: 20px 24px; font-family: system-ui, sans-serif;">
    <p style="margin: 0 0 10px; font-size: 15px; font-weight: 700; color: #92400e;">Anteprima — non è ancora partita</p>
    <p style="margin: 0 0 6px; font-size: 14px; color: #78350f; line-height: 1.6;">
      Periodo <strong>${escapeHtml(bozza.periodo)}</strong> · ${bozza.articoli.length} articoli ·
      <strong>${bozza.destinatari} destinatari</strong>
    </p>
    <p style="margin: 0 0 16px; font-size: 14px; color: #78350f; line-height: 1.6;">
      Oggetto: <strong>${escapeHtml(bozza.oggetto)}</strong>
    </p>
    <a href="${urlApprova}" style="display: inline-block; background: #237A4E; color: white; padding: 13px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">
      Approva e invia →
    </a>
    <p style="margin: 14px 0 0; font-size: 13px; color: #92400e; line-height: 1.6;">
      Se non approvi entro ${APPROVAZIONE_TTL_GIORNI} giorni il link scade e questo mese non parte niente.
      Ignorare questa email è un modo valido di dire di no.
    </p>
  </div>`

  const { error } = await resend.emails.send({
    from: FIM_FROM,
    to: [FIM_EMAIL],
    subject: `[Newsletter ${bozza.periodo}] Da approvare — ${bozza.destinatari} destinatari`,
    html: intestazione + anteprima,
  })
  if (error) throw new Error(`Resend anteprima: ${error.name} — ${error.message}`)
}

// ── Invio ─────────────────────────────────────────────────────────────────────

export interface EsitoInvio {
  periodo: string
  destinatari: number
  inviati: number
  falliti: number
}

/**
 * Spedisce la bozza approvata a tutti gli iscritti attivi.
 * Rilancia se il periodo non è in stato `bozza`: una seconda approvazione dello
 * stesso link non deve poter spedire due volte.
 */
export async function inviaNewsletter(periodo: string): Promise<EsitoInvio> {
  const sb = getSupabase()
  if (!sb) throw new Error('Supabase non configurato')
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY non configurata')
  const resend = new Resend(key)

  const { data: riga, error: selErr } = await sb
    .from(TABLE)
    .select('id, stato, oggetto, html')
    .eq('periodo', periodo)
    .maybeSingle()
  if (selErr) throw new Error(`Supabase select invio: ${selErr.message}`)
  if (!riga) throw new Error(`Nessuna bozza per il periodo ${periodo}`)
  if (riga.stato !== 'bozza') throw new Error(`Il periodo ${periodo} è già in stato "${riga.stato}"`)

  const iscritti = await getIscrittiAttivi()
  if (iscritti.length > MAX_DESTINATARI) {
    throw new Error(`${iscritti.length} destinatari, oltre il tetto di ${MAX_DESTINATARI}`)
  }

  // Si marca "inviato" PRIMA di spedire: se la funzione muore a metà, il giro
  // successivo trova lo stato cambiato e non ricomincia da capo. Un invio
  // incompleto è meglio di un invio doppio.
  const { error: lockErr } = await sb
    .from(TABLE)
    .update({ stato: 'inviato', inviato_at: new Date().toISOString(), destinatari: iscritti.length })
    .eq('id', riga.id)
    .eq('stato', 'bozza')
  if (lockErr) throw new Error(`Supabase lock invio: ${lockErr.message}`)

  let inviati = 0
  let falliti = 0

  for (let i = 0; i < iscritti.length; i += BATCH) {
    const fetta = iscritti.slice(i, i + BATCH)
    const messaggi = await Promise.all(
      fetta.map(async (email) => {
        const token = await generaTokenDisiscrizione(email)
        const pagina = `${BASE_URL}/newsletter/disiscriviti?t=${encodeURIComponent(token)}`
        const oneClick = `${BASE_URL}/api/newsletter/disiscriviti?t=${encodeURIComponent(token)}`
        return {
          from: FIM_FROM,
          to: [email],
          subject: riga.oggetto as string,
          html: (riga.html as string).split(UNSUBSCRIBE_PLACEHOLDER).join(pagina),
          headers: {
            'List-Unsubscribe': `<${oneClick}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        }
      }),
    )

    try {
      const { data, error } = await resend.batch.send(messaggi)
      if (error) {
        console.error('[newsletter/invio] batch rifiutato:', error.name, error.message)
        falliti += fetta.length
      } else {
        inviati += data?.data?.length ?? fetta.length
      }
    } catch (err) {
      console.error('[newsletter/invio] batch irraggiungibile:', err)
      falliti += fetta.length
    }
  }

  await sb.from(TABLE).update({ inviati, falliti }).eq('id', riga.id)

  return { periodo, destinatari: iscritti.length, inviati, falliti }
}
