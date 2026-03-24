/**
 * Client portal authentication — Web Crypto API (HMAC-SHA256)
 * Works in both Edge runtime (middleware) and Node.js (API routes).
 *
 * Token format: base64url(JSON payload) + "." + base64url(HMAC signature)
 * Payload: { email: string, exp: number (unix seconds) }
 */

const SECRET = process.env.CLIENT_AUTH_SECRET || 'fim-dev-secret-CHANGE-IN-PRODUCTION'

export const SESSION_COOKIE = 'fim_session'
export const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60 // 30 days
export const MAGIC_LINK_TTL_SECONDS = 60 * 60         // 1 hour

function b64urlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function b64urlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/')
  return atob(padded + '==='.slice(0, (4 - (str.length % 4)) % 4))
}

async function getKey(): Promise<CryptoKey> {
  const enc = new TextEncoder()
  return crypto.subtle.importKey(
    'raw',
    enc.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function generateToken(email: string, ttlSeconds = SESSION_TTL_SECONDS): Promise<string> {
  const payload = b64urlEncode(JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + ttlSeconds }))
  const key = await getKey()
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const sig = b64urlEncode(String.fromCharCode(...new Uint8Array(sigBuf)))
  return `${payload}.${sig}`
}

/**
 * Returns the email embedded in the token if valid and not expired, otherwise null.
 */
export async function verifyToken(token: string): Promise<string | null> {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [payload, sig] = parts
  try {
    const key = await getKey()
    const sigBytes = Uint8Array.from(b64urlDecode(sig), (c) => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload))
    if (!valid) return null

    const { email, exp } = JSON.parse(b64urlDecode(payload)) as { email: string; exp: number }
    if (exp < Math.floor(Date.now() / 1000)) return null
    return email
  } catch {
    return null
  }
}

/**
 * Lightweight format check only (no crypto) — for use in Edge middleware
 * where we want a fast pre-flight before the full verify in the server component.
 */
export function hasTokenFormat(token: string): boolean {
  return token.split('.').length === 2
}
