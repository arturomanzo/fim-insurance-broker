/**
 * Rate limiter in-memory con algoritmo a finestra scorrevole (sliding window).
 * Più accurato del fixed window: non azzera il contatore all'inizio di ogni
 * finestra, ma considera solo i timestamp degli ultimi windowMs millisecondi.
 *
 * Limitazione nota: su Vercel serverless, il contatore si azzera ad ogni cold
 * start. Per un rate limiting persistente tra istanze, usare @upstash/ratelimit
 * con Redis (richiede UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN).
 *
 * Uso:
 *   const { ok, retryAfter } = rateLimit(request, { limit: 5, windowMs: 60_000 })
 *   if (!ok) return NextResponse.json({ error: '...' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } })
 */

interface RateLimitOptions {
  /** Numero massimo di richieste consentite nella finestra scorrevole */
  limit: number
  /** Ampiezza della finestra scorrevole in millisecondi */
  windowMs: number
}

interface RateLimitResult {
  ok: boolean
  /** Secondi da attendere prima di riprovare (solo se ok === false) */
  retryAfter: number
}

interface Entry {
  /** Timestamp (ms) di ogni richiesta nella finestra corrente */
  timestamps: number[]
}

// Map globale: chiave → lista di timestamp
const store = new Map<string, Entry>()

// Pulizia periodica per evitare memory leak su istanze long-lived
let lastCleanup = Date.now()
function maybeCleanup(windowMs: number) {
  const now = Date.now()
  if (now - lastCleanup < 60_000) return
  lastCleanup = now
  for (const [key, entry] of store) {
    const active = entry.timestamps.filter((t) => now - t < windowMs)
    if (active.length === 0) {
      store.delete(key)
    } else {
      entry.timestamps = active
    }
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
  const forwarded = (request.headers as Headers).get('x-forwarded-for')
  if (forwarded) {
    const candidate = forwarded.split(',')[0].trim()
    if (isValidIp(candidate)) return candidate
  }
  return 'unknown'
}

export function rateLimit(
  request: Request,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  maybeCleanup(windowMs)

  const ip = getIp(request)
  const now = Date.now()
  const url = new URL(request.url)
  const key = `${url.pathname}::${ip}`

  const entry = store.get(key) ?? { timestamps: [] }

  // Mantieni solo i timestamp nella finestra scorrevole corrente
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs)

  if (entry.timestamps.length >= limit) {
    // Il primo timestamp nella finestra indica quando scade il blocco
    const oldestInWindow = entry.timestamps[0]
    const retryAfter = Math.ceil((oldestInWindow + windowMs - now) / 1000)
    store.set(key, entry)
    return { ok: false, retryAfter: Math.max(1, retryAfter) }
  }

  entry.timestamps.push(now)
  store.set(key, entry)
  return { ok: true, retryAfter: 0 }
}
