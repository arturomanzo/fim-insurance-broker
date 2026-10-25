/**
 * Il questionario richieste ed esigenze (Demands & Needs) sul sito.
 *
 * Domande, stato e firma stanno nel gestionale (src/lib/questionario/ nel repo
 * fim-gestionale-next): il sito non ha una copia delle domande, le riceve con
 * il questionario. Il browser parla solo con fimbroker.it; questo modulo parla
 * con il gestionale dal server, con WEBSITE_API_SECRET, come l'Area Cliente.
 */

const GESTIONALE_URL = process.env.GESTIONALE_API_URL || 'https://fim-gestionale-next.vercel.app'
const TIMEOUT_MS = 10_000

export type Opzione = { valore: string; etichetta: string }
export type Domanda = {
  id: string
  testo: string
  tipo: 'scelta' | 'multipla' | 'testo'
  opzioni?: Opzione[]
  obbligatoria: boolean
  aiuto?: string
}
export type Sezione = { titolo: string; domande: Domanda[] }
export type Dichiarazione = { id: string; testo: string; link?: { etichetta: string; url: string } }
export type Conferma = { codice: string; testo: string; numero: string }

export type VistaQuestionario =
  | { stato: 'non_trovato' | 'scaduto' | 'annullato' }
  | {
      stato: 'da_compilare' | 'da_confermare' | 'firmato'
      nome: string
      ramo: string | null
      riferimento: string
      versione: string
      sezioni: Sezione[]
      dichiarazioni: Dichiarazione[]
      conferma?: Conferma
    }

/** 43 caratteri base64url, come li genera il gestionale. */
export function tokenValido(t: unknown): t is string {
  return typeof t === 'string' && /^[A-Za-z0-9_-]{43}$/.test(t)
}

export async function chiamaGestionale(corpo: Record<string, unknown>): Promise<Response | null> {
  const segreto = process.env.WEBSITE_API_SECRET
  if (!segreto) {
    console.error('[questionario] WEBSITE_API_SECRET non configurata')
    return null
  }
  try {
    return await fetch(`${GESTIONALE_URL}/api/website/questionario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${segreto}` },
      body: JSON.stringify(corpo),
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch (err) {
    console.error('[questionario]', err instanceof Error ? err.message : err)
    return null
  }
}

/** Il questionario per la pagina; null se il gestionale non risponde. */
export async function apriQuestionario(token: string): Promise<VistaQuestionario | null> {
  const res = await chiamaGestionale({ azione: 'apri', token })
  if (!res?.ok) return null
  return (await res.json()) as VistaQuestionario
}

/** Il link per mandare la conferma da WhatsApp, con il testo già scritto. */
export function linkConferma(c: Conferma): string {
  return `https://wa.me/${c.numero}?text=${encodeURIComponent(c.testo)}`
}
