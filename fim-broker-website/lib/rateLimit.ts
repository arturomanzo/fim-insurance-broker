/**
 * Rate limiter in-memory basato su IP.
 * Adatto per deployment su singola istanza (Vercel serverless con warm instance).
 *
 * Uso:
 *   const { ok, retryAfter } = rateLimit(request, { limit: 5, windowMs: 60_000 })
 *   if (!ok) return NextResponse.json({ error: '...' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } })
 */

interface RateLimitOptions {
  /** Numero massimo di richieste consentite nella finestra */
  limit: number
  /** Finestra temporale in millisecondi */
  windowMs: number
}

interface RateLimitResult {
  ok: boolean
  /** Secondi da attendere prima di riprovare (solo se ok === false) */
  retryAfter: number
}

interface Entry {
  count: number
  resetAt: number
}

// Map globale: chiave → { count, resetAt }
// In produzione (Vercel) sopravvive tra le richieste finché la lambda è "warm".
const store = new Map<string, Entry>()

// Pulizia periodica per evitare memory leak su istanze long-lived
let lastCleanup = Date.now()
function maybeCleanup() {
  const now = Date.now()
  if (now - lastCleanup < 60_000) return
  lastCleanup = now
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}

// Regex per validare IPv4 e IPv6 (previene injection nel key della store)
const IPV4_RE =
  /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)){3}$/
const IPV6_RE = /^[0-9a-fA-F:]{2,39}$/

function isValidIp(ip: string): boolean {
  return IPV4_RE.test(ip) || IPV6_RE.test(ip)
}

function getIp(request: Request): string {
  // Vercel e altri proxy impostano x-forwarded-for.
  // Prendiamo solo il primo indirizzo (client originale) e lo validiamo
  // per prevenire header injection nella chiave della store.
  const forwarded = (request.headers as Headers).get('x-forwarded-for')
  if (forwarded) {
    const candidate = forwarded.split(',')[0].trim()
    if (isValidIp(candidate)) return candidate
  }
  // IP non identificabile → bucket comune (non bypassa il limite)
  return 'unknown'
}

export function rateLimit(
  request: Request,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  maybeCleanup()

  const ip = getIp(request)
  const now = Date.now()
  // Usa solo pathname (non query string o full URL) per evitare bypass tramite URL crafting
  const url = new URL(request.url)
  const key = `${url.pathname}::${ip}`

  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }

  if (entry.count >= limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { ok: false, retryAfter }
  }

  entry.count += 1
  return { ok: true, retryAfter: 0 }
}
