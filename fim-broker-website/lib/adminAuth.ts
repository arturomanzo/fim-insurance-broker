/**
 * Admin portal authentication — same HMAC-SHA256 mechanism as clientAuth.ts
 * but with a separate secret env var and cookie name.
 */

export const ADMIN_SESSION_COOKIE = 'fim_admin_session'
export const ADMIN_SESSION_TTL = 4 * 60 * 60 // 4 hours

function getSecret(): string {
  const envSecret = process.env.ADMIN_AUTH_SECRET || process.env.CLIENT_AUTH_SECRET
  if (envSecret) return envSecret
  if (process.env.NODE_ENV === 'production') {
    throw new Error('ADMIN_AUTH_SECRET non configurato in produzione')
  }
  return 'fim-admin-dev-secret-DO-NOT-USE-IN-PRODUCTION'
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

export async function generateAdminToken(): Promise<string> {
  const payload = b64urlEncode(JSON.stringify({ role: 'admin', exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL }))
  const key = await getKey()
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const sig = b64urlEncode(String.fromCharCode(...new Uint8Array(sigBuf)))
  return `${payload}.${sig}`
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payload, sig] = parts
  try {
    const key = await getKey()
    const sigBytes = Uint8Array.from(b64urlDecode(sig), (c) => c.charCodeAt(0))
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload))
    if (!valid) return false
    const { role, exp } = JSON.parse(b64urlDecode(payload)) as { role: string; exp: number }
    if (role !== 'admin') return false
    if (exp < Math.floor(Date.now() / 1000)) return false
    return true
  } catch {
    return false
  }
}

export function hasAdminTokenFormat(token: string): boolean {
  return token.split('.').length === 2
}

export function verifyAdminPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD || ''
  if (!password) return false
  // Constant-time comparison to prevent timing attacks
  if (input.length !== password.length) return false
  let diff = 0
  for (let i = 0; i < input.length; i++) {
    diff |= input.charCodeAt(i) ^ password.charCodeAt(i)
  }
  return diff === 0
}
