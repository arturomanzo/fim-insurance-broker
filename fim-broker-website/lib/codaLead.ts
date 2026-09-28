import { Redis } from '@upstash/redis'
import { Resend } from 'resend'

// La consegna delle lead al gestionale, con una coda quando non risponde.
//
// Il 28/09/2026 il database del gestionale è rimasto fermo mezz'ora e
// `/api/website/lead` rispondeva 500. Una richiesta arrivata dal calcolatore è
// entrata nell'archivio solo perché qualcuno l'ha rimessa a mano partendo dalla
// mail a info@. Ora una lead che non passa finisce su Redis (Upstash, lo stesso
// del rate limiter) e viene rimandata da `/api/cron/coda-lead`, che n8n chiama
// ogni dieci minuti. Il gestionale riconosce il `lead_id`: se una consegna era
// andata a segno senza che lo sapessimo, la seconda non crea un doppione.

const GESTIONALE_URL = process.env.GESTIONALE_API_URL || 'https://fim-gestionale-next.vercel.app'
const GESTIONALE_SECRET = process.env.WEBSITE_API_SECRET
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FIM_EMAIL = process.env.FIM_EMAIL || 'info@fimbroker.it'
const FIM_FROM = process.env.FIM_FROM_EMAIL || 'FIM Insurance Broker <noreply@fimbroker.it>'

const CODA = 'fim:coda-lead'
const LUCCHETTO = 'fim:coda-lead:lucchetto'
// Quel giorno il gestionale rispondeva 504 dopo molti secondi: senza un tetto
// il visitatore resta davanti al form ad aspettare.
const TIMEOUT_MS = 10_000
// Una lead ferma in coda da due ore vuol dire che il gestionale non è tornato:
// parte una mail a info@, una volta sola per lead.
const AVVISO_DOPO_MS = 2 * 60 * 60 * 1000

export type LeadGestionale = {
  /** Assegnato una volta sola, al form: è la chiave contro i doppioni. */
  lead_id: string
  nome: string
  cognome?: string
  email?: string
  telefono?: string
  tipo: string
  profilo?: string
  messaggio?: string
  referrer?: string
}

/** `salvata` nel gestionale, `in-coda` su Redis, `persa` se nessuna delle due. */
export type EsitoLead = 'salvata' | 'in-coda' | 'persa'

type VoceCoda = {
  lead: LeadGestionale
  origine: string
  creata: number
  tentativi: number
  ultimoErrore: string
  avvisata: boolean
}

type Consegna = { ok: true } | { ok: false; definitivo: boolean; errore: string }

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
    : null

async function consegna(lead: LeadGestionale): Promise<Consegna> {
  if (!GESTIONALE_SECRET) return { ok: false, definitivo: false, errore: 'WEBSITE_API_SECRET non configurata' }
  try {
    const res = await fetch(`${GESTIONALE_URL}/api/website/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GESTIONALE_SECRET}` },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (res.ok) return { ok: true }
    const testo = (await res.text().catch(() => '')).slice(0, 200)
    // 400 = il gestionale rifiuta i dati: riprovare non li cambia. Tutto il
    // resto (500, 504, 401 per un segreto sbagliato) si sistema dall'altra parte.
    return { ok: false, definitivo: res.status === 400, errore: `HTTP ${res.status} ${testo}`.trim() }
  } catch (err) {
    return { ok: false, definitivo: false, errore: err instanceof Error ? err.message : String(err) }
  }
}

/**
 * Manda la lead al gestionale. Se non passa la mette in coda. Non lancia mai:
 * chi chiama decide cosa dire al visitatore in base all'esito.
 */
export async function inviaLead(lead: LeadGestionale, origine: string): Promise<EsitoLead> {
  const r = await consegna(lead)
  if (r.ok) {
    console.log(`[coda-lead] ${origine}: lead ${lead.lead_id} salvata nel gestionale`)
    return 'salvata'
  }
  if (r.definitivo) {
    console.error(`[coda-lead] ${origine}: lead ${lead.lead_id} rifiutata dal gestionale — ${r.errore}`)
    return 'persa'
  }
  if (!redis) {
    console.error(`[coda-lead] ${origine}: lead ${lead.lead_id} non consegnata (${r.errore}) e Redis non configurato`)
    return 'persa'
  }
  try {
    const voce: VoceCoda = { lead, origine, creata: Date.now(), tentativi: 1, ultimoErrore: r.errore, avvisata: false }
    await redis.hset(CODA, { [lead.lead_id]: voce })
    console.warn(`[coda-lead] ${origine}: lead ${lead.lead_id} in coda — ${r.errore}`)
    return 'in-coda'
  } catch (err) {
    console.error(`[coda-lead] ${origine}: lead ${lead.lead_id} non consegnata (${r.errore}) e non accodata:`, err)
    return 'persa'
  }
}

export type EsitoSvuotamento = {
  redis: boolean
  occupata?: boolean
  consegnate: number
  scartate: number
  rimaste: number
  avvisate: number
  errore?: string
}

/**
 * Rimanda le lead in coda. Al primo errore di rete o del server si ferma: se il
 * gestionale è giù, insistere con le altre consuma solo tempo della funzione.
 */
export async function svuotaCodaLead(): Promise<EsitoSvuotamento> {
  const esito: EsitoSvuotamento = { redis: !!redis, consegnate: 0, scartate: 0, rimaste: 0, avvisate: 0 }
  if (!redis) return esito

  if ((await redis.hlen(CODA)) === 0) return esito
  // Due svuotamenti insieme (n8n più il giro delle 8) manderebbero due volte
  // la stessa lead: il gestionale reggerebbe, ma è lavoro buttato.
  if (!(await redis.set(LUCCHETTO, '1', { nx: true, ex: 240 }))) return { ...esito, occupata: true }

  try {
    const voci = (await redis.hgetall<Record<string, VoceCoda>>(CODA)) ?? {}
    const ordinate = Object.entries(voci).sort(([, a], [, b]) => a.creata - b.creata)
    let gestionaleGiu = false
    const inCoda: VoceCoda[] = []

    for (const [id, voce] of ordinate) {
      if (!gestionaleGiu) {
        const r = await consegna(voce.lead)
        if (r.ok) {
          await redis.hdel(CODA, id)
          esito.consegnate++
          console.log(`[coda-lead] lead ${id} consegnata al tentativo ${voce.tentativi + 1}`)
          continue
        }
        if (r.definitivo) {
          await redis.hdel(CODA, id)
          esito.scartate++
          console.error(`[coda-lead] lead ${id} rifiutata dal gestionale, tolta dalla coda — ${r.errore}`)
          continue
        }
        gestionaleGiu = true
        voce.tentativi++
        voce.ultimoErrore = r.errore
        await redis.hset(CODA, { [id]: voce })
      }
      esito.rimaste++
      inCoda.push(voce)
    }

    const ferme = inCoda.filter((v) => !v.avvisata && Date.now() - v.creata > AVVISO_DOPO_MS)
    if (gestionaleGiu && ferme.length > 0 && (await avvisa(ferme))) {
      for (const v of ferme) {
        const attuale = await redis.hget<VoceCoda>(CODA, v.lead.lead_id)
        if (attuale) await redis.hset(CODA, { [v.lead.lead_id]: { ...attuale, avvisata: true } })
      }
      esito.avvisate = ferme.length
    }
    return esito
  } catch (err) {
    console.error('[coda-lead] svuotamento fallito:', err)
    return { ...esito, errore: err instanceof Error ? err.message : String(err) }
  } finally {
    await redis.del(LUCCHETTO).catch(() => {})
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

async function avvisa(ferme: VoceCoda[]): Promise<boolean> {
  if (!resend) return false
  const righe = ferme
    .map((v) => {
      const chi = [v.lead.nome, v.lead.cognome].filter(Boolean).join(' ')
      const recapito = [v.lead.email, v.lead.telefono].filter(Boolean).join(' · ')
      const quando = new Date(v.creata).toLocaleString('it-IT', { timeZone: 'Europe/Rome' })
      return `<li><strong>${escapeHtml(chi)}</strong> — ${escapeHtml(v.lead.tipo)} (${escapeHtml(recapito)}), arrivata il ${quando} dal ${escapeHtml(v.origine)}</li>`
    })
    .join('')
  const ultimo = ferme[ferme.length - 1].ultimoErrore
  try {
    await resend.emails.send({
      from: FIM_FROM,
      to: [FIM_EMAIL],
      subject: `[Coda lead] ${ferme.length} ${ferme.length === 1 ? 'lead non entra' : 'lead non entrano'} nel gestionale da oltre due ore`,
      html: `<p>Il gestionale non accetta le lead del sito. Queste sono al sicuro in coda e ci entrano da sole appena torna su:</p>
<ul>${righe}</ul>
<p>Ultimo errore: ${escapeHtml(ultimo)}</p>
<p>Se il gestionale va, il problema è il database Supabase: Project Settings → General → Restart project.</p>`,
    })
    return true
  } catch (err) {
    console.error('[coda-lead] mail di avviso non partita:', err)
    return false
  }
}
