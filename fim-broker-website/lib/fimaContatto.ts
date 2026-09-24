import type Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'

// Il salvataggio dei recapiti lasciati in chat a FIMA.
//
// Fino alla #138 la chat chiedeva nome ed email e diceva «ho preso nota», ma
// non scriveva da nessuna parte. Ora i recapiti fanno la stessa strada del
// modulo /preventivo: `/api/website/lead` del gestionale (pagina /lead, lead
// scoring, alert) più una mail a info@, perché qualcuno se ne accorga subito.

const GESTIONALE_URL = process.env.GESTIONALE_API_URL || 'https://fim-gestionale-next.vercel.app'
const GESTIONALE_SECRET = process.env.WEBSITE_API_SECRET
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

/**
 * La frase con cui FIMA conferma il salvataggio. Il server la cerca nella
 * storia per non salvare due volte la stessa conversazione: la chat non ha
 * memoria lato server e il widget rimanda solo il testo.
 */
export const FRASE_SALVATAGGIO = 'Ho passato i tuoi recapiti a FIM'

export const SALVA_CONTATTO_TOOL: Anthropic.Beta.BetaTool = {
  name: 'salva_contatto',
  description:
    "Passa a FIM i recapiti di un visitatore che vuole essere ricontattato: finiscono nell'archivio lead del gestionale e in una mail al team, come quelli del modulo preventivo. " +
    "Si usa una volta sola per conversazione, solo dopo che il visitatore ha visto il link all'informativa privacy e ha detto sì con parole sue. " +
    "Servono il nome, almeno un recapito (telefono o email) e cosa gli serve. " +
    "Risponde {ok: true} se i dati sono arrivati, altrimenti {ok: false, motivo}: in quel caso non dire che sono arrivati e manda il visitatore al modulo /preventivo. " +
    "Non manda niente al visitatore e non fissa appuntamenti.",
  strict: true,
  input_schema: {
    type: 'object',
    additionalProperties: false,
    required: ['nome', 'cognome', 'telefono', 'email', 'tipo', 'riepilogo', 'frase_consenso'],
    properties: {
      nome: { type: 'string', description: 'Il nome come lo ha scritto il visitatore.' },
      cognome: { type: 'string', description: 'Il cognome, se lo ha dato. Stringa vuota se no.' },
      telefono: { type: 'string', description: 'Il telefono, se lo ha dato. Stringa vuota se no.' },
      email: { type: 'string', description: "L'email, se l'ha data. Stringa vuota se no." },
      tipo: {
        type: 'string',
        description: 'La copertura che gli interessa, in poche parole (es. "RC auto", "RC professionale avvocato", "Casa").',
      },
      riepilogo: {
        type: 'string',
        description:
          'Quello che il consulente deve sapere per richiamarlo: chi è (privato, professionista, azienda, scuola), cosa vuole assicurare, i dati emersi in chat. Solo fatti detti dal visitatore.',
      },
      frase_consenso: {
        type: 'string',
        description: 'Copiata alla lettera dal messaggio del visitatore in cui ha detto sì al trattamento dei dati.',
      },
    },
  },
}

type Input = {
  nome: string
  cognome: string
  telefono: string
  email: string
  tipo: string
  riepilogo: string
  frase_consenso: string
}

type Esito = { ok: true } | { ok: false; motivo: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// A parole intere: «sì» non deve combaciare dentro «così».
const norm = (s: string) => ' ' + s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim() + ' '

function testoDi(m: Anthropic.Beta.BetaMessageParam): string {
  if (typeof m.content === 'string') return m.content
  return m.content.map((b) => (b.type === 'text' ? b.text : '')).join(' ')
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * Salva i recapiti, dopo i controlli che il modello non può saltare.
 *
 * Il consenso non si prende sulla parola del modello: la frase che riporta
 * deve comparire davvero in un messaggio del visitatore, e prima di quel
 * messaggio FIMA deve aver mostrato il link all'informativa.
 */
async function salva(
  raw: unknown,
  ctx: { messaggi: Anthropic.Beta.BetaMessageParam[]; pagina?: string },
): Promise<Esito> {
  const i = (raw ?? {}) as Partial<Input>
  const s = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
  const nome = s(i.nome, 100)
  const cognome = s(i.cognome, 100)
  // Il modello a volte scrive «non fornito» invece della stringa vuota: un
  // telefono senza cifre o un'email senza @ valgono come non dati.
  const telGrezzo = s(i.telefono, 30)
  const telefono = /\d/.test(telGrezzo) ? telGrezzo : ''
  const mailGrezza = s(i.email, 200).toLowerCase()
  const email = mailGrezza.includes('@') ? mailGrezza : ''
  const tipo = s(i.tipo, 100)
  const riepilogo = s(i.riepilogo, 1500)
  const frase = s(i.frase_consenso, 300)

  if (nome.length < 2) return { ok: false, motivo: 'Manca il nome.' }
  if (!tipo) return { ok: false, motivo: 'Manca cosa gli serve.' }
  if (email && !EMAIL_RE.test(email)) return { ok: false, motivo: "L'email non è valida: chiedila di nuovo." }
  if (telefono && telefono.replace(/\D/g, '').length < 6) return { ok: false, motivo: 'Il telefono non è valido: chiedilo di nuovo.' }
  if (!email && !telefono) return { ok: false, motivo: 'Serve almeno un recapito: telefono o email.' }

  const { messaggi } = ctx
  if (messaggi.some((m) => m.role === 'assistant' && testoDi(m).includes(FRASE_SALVATAGGIO))) {
    return { ok: false, motivo: 'I recapiti di questa conversazione sono già stati passati a FIM. Non salvarli di nuovo.' }
  }

  // Il consenso: la frase deve stare in un messaggio del visitatore, e prima
  // di quel messaggio FIMA deve aver linkato l'informativa.
  // Si cerca dall'ultimo messaggio: un «sì» corto compare anche in messaggi
  // scritti prima che l'informativa fosse mostrata.
  const f = norm(frase)
  let idxConsenso = -1
  for (let k = messaggi.length - 1; k >= 0 && f.trim().length >= 2; k--) {
    if (messaggi[k].role === 'user' && norm(testoDi(messaggi[k])).includes(f)) {
      idxConsenso = k
      break
    }
  }
  if (idxConsenso === -1) {
    return { ok: false, motivo: 'Manca il consenso: chiedilo con il link all\'informativa e aspetta un sì del visitatore.' }
  }
  const informativaMostrata = messaggi
    .slice(0, idxConsenso)
    .some((m) => m.role === 'assistant' && testoDi(m).includes('privacy-policy'))
  if (!informativaMostrata) {
    return { ok: false, motivo: "Prima del consenso va mostrato il link all'informativa privacy. Mostralo e richiedi il consenso." }
  }

  if (!GESTIONALE_SECRET) {
    console.error('[FIMA] WEBSITE_API_SECRET non configurata: contatto non salvato')
    return { ok: false, motivo: 'Il salvataggio non è disponibile adesso.' }
  }

  const quando = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })
  const messaggio = [
    riepilogo,
    '',
    `Arrivata dalla chat FIMA${ctx.pagina ? ` (pagina: ${ctx.pagina})` : ''} il ${quando}.`,
    `Consenso privacy dato in chat dopo il link all'informativa, con le parole: «${frase}».`,
  ].join('\n')

  try {
    const res = await fetch(`${GESTIONALE_URL}/api/website/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GESTIONALE_SECRET}` },
      body: JSON.stringify({
        nome,
        cognome,
        email,
        telefono,
        tipo,
        messaggio,
        lead_id: `CHAT-${Date.now()}`,
        referrer: 'chat-fima',
      }),
    })
    if (!res.ok) {
      console.error(`[FIMA] salvataggio contatto fallito: HTTP ${res.status} — ${await res.text().catch(() => '')}`)
      return { ok: false, motivo: 'Il salvataggio non è riuscito.' }
    }
  } catch (err) {
    console.error('[FIMA] salvataggio contatto — errore di rete:', err)
    return { ok: false, motivo: 'Il salvataggio non è riuscito.' }
  }

  // La mail al team è in più: se non parte, la lead è comunque in archivio.
  if (resend) {
    await resend.emails
      .send({
        from: FIM_FROM,
        to: [FIM_EMAIL],
        subject: `[Chat FIMA] ${[nome, cognome].filter(Boolean).join(' ')} — ${tipo}`,
        html: `<p><strong>${escapeHtml([nome, cognome].filter(Boolean).join(' '))}</strong> — ${escapeHtml(tipo)}</p>
<p>Telefono: ${escapeHtml(telefono || '—')}<br>Email: ${escapeHtml(email || '—')}</p>
<p style="white-space:pre-wrap">${escapeHtml(messaggio)}</p>
<p>La trovi anche nella pagina /lead del gestionale.</p>`,
      })
      .catch((err) => console.error('[FIMA] mail al team non partita:', err))
  }

  console.info(`[FIMA] contatto salvato: ${nome} — ${tipo}`)
  return { ok: true }
}

/** Come `salva`, ma lascia nei log il motivo di ogni rifiuto (senza dati
 *  personali): senza, un salvataggio mancato non si distingue da uno mai tentato. */
export async function salvaContatto(
  raw: unknown,
  ctx: { messaggi: Anthropic.Beta.BetaMessageParam[]; pagina?: string },
): Promise<Esito> {
  const esito = await salva(raw, ctx)
  if (!esito.ok) console.info(`[FIMA] salva_contatto rifiutato: ${esito.motivo}`)
  return esito
}
