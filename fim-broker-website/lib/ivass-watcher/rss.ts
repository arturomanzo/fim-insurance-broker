/**
 * Minimal RSS 2.0 parser — niente dipendenze esterne.
 *
 * Estrae da un feed RSS 2.0 i campi che ci servono per ogni `<item>`:
 *   - title, link, pubDate, description, guid
 *
 * Gestisce CDATA e principali entity HTML. Non gestisce Atom (per le nostre
 * fonti basta RSS 2.0). Se in futuro serve Atom, rimpiazzare con
 * `fast-xml-parser` (è la prima dep "giustificata" da aggiungere).
 */

export interface RssItem {
  title: string
  link: string
  pubDate: Date | null
  /** Description già "pulita" da HTML/CDATA. */
  description: string
  /** GUID se presente, altrimenti `link`. */
  guid: string
}

export interface FetchedFeed {
  ok: boolean
  status: number
  items: RssItem[]
  /** Eventuale errore di fetch/parsing. */
  error?: string
}

const ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&nbsp;': ' ',
  '&#39;': "'",
  '&#x27;': "'",
}

function decodeEntities(s: string): string {
  return s.replace(/&(?:amp|lt|gt|quot|apos|nbsp|#39|#x27);/g, (m) => ENTITY_MAP[m] ?? m)
}

/** Rimuove CDATA, tag HTML residui e collassa spazi. */
function cleanText(raw: string): string {
  const noCdata = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  const noTags = noCdata.replace(/<[^>]+>/g, ' ')
  return decodeEntities(noTags).replace(/\s+/g, ' ').trim()
}

/** Estrae il contenuto della prima occorrenza di `<tag>…</tag>` dentro `xml`. */
function pickTag(xml: string, tag: string): string | null {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i')
  const m = xml.match(re)
  return m ? m[1] : null
}

export function parseRss(xml: string): RssItem[] {
  const items: RssItem[] = []
  // Spezziamo sui blocchi <item>...</item>
  const itemRe = /<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi
  let m: RegExpExecArray | null
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1]
    const titleRaw = pickTag(block, 'title') ?? ''
    const linkRaw = pickTag(block, 'link') ?? ''
    const pubRaw = pickTag(block, 'pubDate') ?? pickTag(block, 'dc:date') ?? ''
    const descRaw = pickTag(block, 'description') ?? pickTag(block, 'content:encoded') ?? ''
    const guidRaw = pickTag(block, 'guid') ?? ''

    const title = cleanText(titleRaw)
    const link = cleanText(linkRaw)
    if (!title || !link) continue

    const pubDate = pubRaw ? new Date(pubRaw.trim()) : null
    items.push({
      title,
      link,
      pubDate: pubDate && !isNaN(pubDate.getTime()) ? pubDate : null,
      description: cleanText(descRaw),
      guid: cleanText(guidRaw) || link,
    })
  }
  return items
}

export async function fetchFeed(url: string, userAgent?: string): Promise<FetchedFeed> {
  try {
    const res = await fetch(url, {
      headers: userAgent ? { 'User-Agent': userAgent } : undefined,
      // 25s timeout: Vercel cron ha un hard limit di 60s sui plan Pro
      signal: AbortSignal.timeout(25_000),
      // Niente cache: vogliamo sempre la versione fresca
      cache: 'no-store',
    })
    if (!res.ok) {
      return { ok: false, status: res.status, items: [], error: `HTTP ${res.status}` }
    }
    const xml = await res.text()
    return { ok: true, status: res.status, items: parseRss(xml) }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, status: 0, items: [], error: msg }
  }
}
