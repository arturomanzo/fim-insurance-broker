/**
 * Token firmati HMAC-SHA256 su Web Crypto — funzionano sia in Node che in Edge.
 *
 * Stessa tecnica di `lib/clientAuth.ts`, che resta separato: quello ha una
 * semantica sua (cookie di sessione, formato letto anche dal middleware) e non
 * conviene piegarlo. Questo serve ai link firmati che finiscono dentro le email
 * — disiscrizione, approvazione dell'invio — dove il payload cambia di volta in
 * volta e la scadenza a volte non deve esserci affatto.
 *
 * `scope` non è decorativo: impedisce che un token nato per cancellare
 * un'iscrizione valga per approvare un invio a tutta la lista.
 */

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

/**
 * Firma un payload. `ttlSeconds` omesso = token che non scade (serve ai link di
 * disiscrizione: un "cancellami" che smette di funzionare è un link rotto).
 */
export async function firma(
  scope: string,
  dati: Record<string, unknown>,
  ttlSeconds?: number,
): Promise<string> {
  const body: Record<string, unknown> = { ...dati, scope }
  if (ttlSeconds !== undefined) body.exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const payload = b64urlEncode(JSON.stringify(body))
  const key = await getKey()
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const sig = b64urlEncode(String.fromCharCode(...new Uint8Array(sigBuf)))
  return `${payload}.${sig}`
}

/**
 * Verifica firma, scope e scadenza. Ritorna il payload o null — mai un errore
 * parlante: da fuori un token manomesso e uno scaduto devono somigliarsi.
 */
export async function verifica<T extends Record<string, unknown>>(
  scope: string,
  token: string,
): Promise<T | null> {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [payload, sig] = parts
  try {
    const key = await getKey()
    const sigBytes = Uint8Array.from(b64urlDecode(sig), (c) => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload))
    if (!valid) return null

    const body = JSON.parse(b64urlDecode(payload)) as Record<string, unknown>
    if (body.scope !== scope) return null
    if (typeof body.exp === 'number' && body.exp < Math.floor(Date.now() / 1000)) return null
    return body as T
  } catch {
    return null
  }
}
