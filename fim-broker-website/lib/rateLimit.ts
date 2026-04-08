/**
 * Rate limiter con sliding window.
 *
 * Quando le variabili d'ambiente UPSTASH_REDIS_REST_URL e
 * UPSTASH_REDIS_REST_TOKEN sono presenti, usa @upstash/ratelimit con Redis:
 * i contatori sono persistenti tra istanze serverless e cold start.
 *
 * Altrimenti cade in un fallback in-memory (sviluppo locale o ambienti
 * senza Redis). Il fallback è accurato per istanze single-process ma non
 * è condiviso tra istanze Vercel parallele.
 *
 * Uso (identico per entrambe le modalità):
 *   const { ok, retryAfter } = await rateLimit(req, { limit: 5, windowMs: 60_000 })
 *   if (!ok) return NextResponse.json({ error: '...' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } })
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// ─── Types ────────────────────────────────────────────────────────────────────

interface RateLimitOptions {
  /** Numero massimo di richieste nella finestra scorrevole */
  limit: number
  /** Ampiezza della finestra in millisecondi */
  windowMs: number
}

interface RateLimitResult {
  ok: boolean
  /** Secondi da attendere prima di riprovare (solo se ok === false) */
  retryAfter: number
}

// ─── IP extraction ────────────────────────────────────────────────────────────

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

// ─── Upstash Redis (persistente) ─────────────────────────────────────────────

const upstashEnabled = !!(
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
)

let redis: Redis | undefined
const limiterCache = new Map<string, Ratelimit>()

if (upstashEnabled) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

/**
 * Restituisce (e memorizza per warm instances) un Ratelimit per la
 * combinazione limit+window. Le istanze Ratelimit sono stateless —
 * i dati vivono su Redis — quindi ricrearle su cold start è innocuo.
 */
function getLimiter(limit: number, windowMs: number): Ratelimit {
  const key = `${limit}:${windowMs}`
  if (!limiterCache.has(key)) {
    const windowSec = Math.round(windowMs / 1000)
    limiterCache.set(
      key,
      new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
        prefix: '@fim/rl',
        analytics: false,
      }),
    )
  }
  return limiterCache.get(key)!
}

async function rateLimitUpstash(
  request: Request,
  { limit, windowMs }: RateLimitOptions,
): Promise<RateLimitResult> {
  const ip = getIp(request)
  const url = new URL(request.url)
  const identifier = `${url.pathname}::${ip}`

  const limiter = getLimiter(limit, windowMs)
  const { success, reset } = await limiter.limit(identifier)

  if (!success) {
    const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000))
    return { ok: false, retryAfter }
  }

  return { ok: true, retryAfter: 0 }
}

// ─── In-memory fallback ───────────────────────────────────────────────────────

interface Entry {
  timestamps: number[]
}

const memStore = new Map<string, Entry>()
let lastCleanup = Date.now()

function maybeCleanup(windowMs: number) {
  const now = Date.now()
  if (now - lastCleanup < 60_000) return
  lastCleanup = now
  for (const [key, entry] of memStore) {
    const active = entry.timestamps.filter((t) => now - t < windowMs)
    if (active.length === 0) {
      memStore.delete(key)
    } else {
      entry.timestamps = active
    }
  }
}

function rateLimitMemory(
  request: Request,
  { limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  maybeCleanup(windowMs)

  const ip = getIp(request)
  const now = Date.now()
  const url = new URL(request.url)
  const key = `${url.pathname}::${ip}`

  const entry = memStore.get(key) ?? { timestamps: [] }
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs)

  if (entry.timestamps.length >= limit) {
    const oldestInWindow = entry.timestamps[0]
    const retryAfter = Math.ceil((oldestInWindow + windowMs - now) / 1000)
    memStore.set(key, entry)
    return { ok: false, retryAfter: Math.max(1, retryAfter) }
  }

  entry.timestamps.push(now)
  memStore.set(key, entry)
  return { ok: true, retryAfter: 0 }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function rateLimit(
  request: Request,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  if (upstashEnabled) {
    return rateLimitUpstash(request, options)
  }
  return rateLimitMemory(request, options)
}
