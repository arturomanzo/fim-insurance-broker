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

function getIp(request: Request): string {
  // Vercel e altri proxy impostano x-forwarded-for
  const forwarded = (request.headers as Headers).get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

export function rateLimit(
  request: Request,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  maybeCleanup()

  const ip = getIp(request)
  const now = Date.now()
  const key = `${request.url}::${ip}`

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
