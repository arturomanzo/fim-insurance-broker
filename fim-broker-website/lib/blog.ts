import postsData from '@/data/blog-posts.json'

export interface BlogSection {
  heading?: string
  body: string
  list?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  updatedDate?: string
  readTime: string
  image: string
  sections: BlogSection[]
  /**
   * Slug autore (vedi `lib/authors.ts`). Opzionale a tipo, ma in pratica
   * sempre risolto: i consumer usano `getAuthor()` che applica il fallback
   * al CEO se il campo manca. Critico per E-E-A-T sui contenuti YMYL.
   */
  author?: string
  /**
   * `true` se l'articolo è stato redatto con il supporto di strumenti di IA
   * (vedi `scripts/generate-blog-post.mjs`). Attiva l'avviso di trasparenza
   * richiesto dall'AI Act (art. 50.4) sulla pagina articolo.
   */
  aiAssisted?: boolean
}

export function getAllPosts(): BlogPost[] {
  return postsData.posts as BlogPost[]
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

const MESI_ITALIANI: Record<string, string> = {
  Gennaio: '01', Febbraio: '02', Marzo: '03', Aprile: '04',
  Maggio: '05', Giugno: '06', Luglio: '07', Agosto: '08',
  Settembre: '09', Ottobre: '10', Novembre: '11', Dicembre: '12',
}

/**
 * Le date degli articoli sono stringhe italiane ("27 Agosto 2026").
 * Ritorna ISO 8601; su input non riconosciuto ritorna la data odierna,
 * come faceva la versione che stava dentro la pagina articolo.
 */
export function parseItalianDate(dateStr: string): string {
  if (!dateStr) return new Date().toISOString()
  try {
    const parts = dateStr.trim().split(' ')
    if (parts.length === 3) {
      const [day, monthIt, year] = parts
      const month = MESI_ITALIANI[monthIt]
      if (month) return new Date(`${year}-${month}-${day.padStart(2, '0')}`).toISOString()
    }
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) return d.toISOString()
  } catch {}
  return new Date().toISOString()
}

/**
 * Articoli pubblicati dopo `da`, dal più recente. Usato dalla newsletter per
 * sapere che cosa è uscito dall'invio precedente.
 *
 * Attenzione al fallback di `parseItalianDate`: una data illeggibile diventa
 * "oggi", quindi un articolo con la data scritta male finirebbe in ogni invio.
 * Qui si scartano le date non riconosciute invece di lasciarle passare.
 */
export function getPostsSince(da: Date): BlogPost[] {
  const soglia = da.getTime()
  return getAllPosts()
    .filter((p) => {
      const parts = p.date?.trim().split(' ')
      if (parts?.length !== 3 || !MESI_ITALIANI[parts[1]]) return false
      return new Date(parseItalianDate(p.date)).getTime() > soglia
    })
    .sort((a, b) => new Date(parseItalianDate(b.date)).getTime() - new Date(parseItalianDate(a.date)).getTime())
}
