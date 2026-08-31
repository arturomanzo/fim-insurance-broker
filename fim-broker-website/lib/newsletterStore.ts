/**
 * Iscritti alla newsletter — fonte di verità su Supabase (`website_newsletter`).
 *
 * Prima del 31/08/2026 l'iscrizione viveva solo dentro un'audience Resend, e
 * quando la configurazione mancava la route rispondeva comunque "ok": gli
 * indirizzi sparivano senza lasciare traccia. Adesso l'ordine è rovesciato —
 * l'iscrizione è la riga su Supabase, il contatto su Resend è una copia
 * best-effort che può fallire senza portarsi dietro niente.
 *
 * Il token di disiscrizione è un HMAC-SHA256 su Web Crypto (stessa tecnica di
 * lib/clientAuth.ts, così funziona sia in Node che in Edge) e non scade mai:
 * un link "cancellami" che smette di funzionare è un link rotto.
 */

import { getSupabase } from './supabase'

const TABLE = 'website_newsletter'

export type IscrizioneEsito = 'nuovo' | 'gia-iscritto' | 'riattivato'

export interface DatiIscrizione {
  email: string
  ip?: string
  userAgent?: string
  origine?: string
}

// ── Token di disiscrizione ────────────────────────────────────────────────────

function getSecret(): string {
  const envSecret = process.env.CLIENT_AUTH_SECRET
  if (envSecret) return envSecret
  if (process.env.NODE_ENV === 'production') {
    throw new Error('CLIENT_AUTH_SECRET non configurato in produzione')
  }
  return 'fim-dev-secret-DO-NOT-USE-IN-PRODUCTION'
}

function b64urlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function b64urlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/')
  return atob(padded + '==='.slice(0, (4 - (str.length % 4)) % 4))
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

/** Token permanente legato all'indirizzo. `scope` impedisce di riusarlo altrove. */
export async function generaTokenDisiscrizione(email: string): Promise<string> {
  const payload = b64urlEncode(JSON.stringify({ email: email.trim().toLowerCase(), scope: 'newsletter' }))
  const key = await getKey()
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const sig = b64urlEncode(String.fromCharCode(...new Uint8Array(sigBuf)))
  return `${payload}.${sig}`
}

/** Email contenuta nel token, oppure null se la firma non torna. */
export async function verificaTokenDisiscrizione(token: string): Promise<string | null> {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [payload, sig] = parts
  try {
    const key = await getKey()
    const sigBytes = Uint8Array.from(b64urlDecode(sig), (c) => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload))
    if (!valid) return null
    const { email, scope } = JSON.parse(b64urlDecode(payload)) as { email?: string; scope?: string }
    if (scope !== 'newsletter' || !email) return null
    return email
  } catch {
    return null
  }
}

// ── Scrittura ─────────────────────────────────────────────────────────────────

/**
 * Registra l'iscrizione. Solleva se Supabase non è raggiungibile: chi chiama
 * deve poter dire all'utente che l'iscrizione NON è andata a buon fine, invece
 * di mostrargli una conferma che non corrisponde a niente.
 */
export async function iscrivi(dati: DatiIscrizione): Promise<IscrizioneEsito> {
  const sb = getSupabase()
  if (!sb) throw new Error('Supabase non configurato: impossibile registrare l\'iscrizione')

  const email = dati.email.trim().toLowerCase()

  const { data: esistente, error: selectError } = await sb
    .from(TABLE)
    .select('id, stato')
    .eq('email', email)
    .maybeSingle()

  if (selectError) throw new Error(`Supabase select: ${selectError.message}`)

  if (esistente) {
    if (esistente.stato === 'attivo') return 'gia-iscritto'
    // Chi si era disiscritto e torna: si riparte da un consenso nuovo, con data nuova.
    const { error } = await sb
      .from(TABLE)
      .update({
        stato: 'attivo',
        disiscritto_at: null,
        consenso: true,
        consenso_at: new Date().toISOString(),
        consenso_ip: dati.ip ?? null,
        consenso_user_agent: dati.userAgent ?? null,
        origine: dati.origine ?? null,
      })
      .eq('id', esistente.id)
    if (error) throw new Error(`Supabase update: ${error.message}`)
    return 'riattivato'
  }

  const { error } = await sb.from(TABLE).insert({
    id: crypto.randomUUID(),
    email,
    consenso: true,
    consenso_at: new Date().toISOString(),
    consenso_ip: dati.ip ?? null,
    consenso_user_agent: dati.userAgent ?? null,
    origine: dati.origine ?? null,
    stato: 'attivo',
    timestamp: new Date().toISOString(),
  })

  // Corsa tra due invii ravvicinati dello stesso indirizzo: il vincolo unique
  // ha già fatto il suo lavoro, per l'utente il risultato è lo stesso.
  if (error) {
    if (error.code === '23505') return 'gia-iscritto'
    throw new Error(`Supabase insert: ${error.message}`)
  }
  return 'nuovo'
}

/** Marca l'indirizzo come disiscritto. Idempotente. */
export async function disiscrivi(email: string): Promise<void> {
  const sb = getSupabase()
  if (!sb) throw new Error('Supabase non configurato: impossibile registrare la disiscrizione')

  const { error } = await sb
    .from(TABLE)
    .update({ stato: 'disiscritto', disiscritto_at: new Date().toISOString() })
    .eq('email', email.trim().toLowerCase())

  if (error) throw new Error(`Supabase update: ${error.message}`)
}

/** Salva l'id del contatto Resend, quando l'audience è configurata. */
export async function salvaContattoResend(email: string, contactId: string): Promise<void> {
  const sb = getSupabase()
  if (!sb) return
  await sb
    .from(TABLE)
    .update({ resend_contact_id: contactId })
    .eq('email', email.trim().toLowerCase())
}
