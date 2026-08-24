import type { MetadataRoute } from 'next'
import { services } from '@/lib/services'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

const ITALIAN_MONTHS: Record<string, string> = {
  Gennaio: '01', Febbraio: '02', Marzo: '03', Aprile: '04',
  Maggio: '05', Giugno: '06', Luglio: '07', Agosto: '08',
  Settembre: '09', Ottobre: '10', Novembre: '11', Dicembre: '12',
}

function parseBlogDate(dateStr: string): Date | undefined {
  try {
    const parts = dateStr.trim().split(' ')
    if (parts.length === 3) {
      const [day, monthIt, year] = parts
      const month = ITALIAN_MONTHS[monthIt]
      if (month) return new Date(`${year}-${month}-${day.padStart(2, '0')}`)
    }
  } catch {}
  return undefined
}

/**
 * `lastModified` compare SOLO dove c'è una data vera dietro.
 *
 * Prima ogni pagina statica riportava `new Date()`, cioè l'ora del build: la
 * sitemap diceva che tutte e 84 le URL erano cambiate nello stesso istante, a
 * ogni deploy (audit 13/08/2026). Un `lastmod` sempre "adesso" non è un dato
 * impreciso, è un dato falso, e Google che se ne accorge smette di fidarsi del
 * segnale su *tutta* la sitemap — anche sui post del blog, dove la data è
 * corretta. Meglio nessuna data che una inventata: il campo è opzionale.
 */
function lastModifiedOf(dateStr?: string): { lastModified: Date } | undefined {
  if (!dateStr) return undefined
  const d = parseBlogDate(dateStr)
  return d ? { lastModified: d } : undefined
}

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/chi-siamo`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/servizi`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/preventivo`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/prenota-consulenza`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contatti`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/collabora-con-noi`, changeFrequency: 'monthly', priority: 0.6 },
    // Geo-landing pages SEO locale
    { url: `${BASE_URL}/broker-assicurativo-latina`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/broker-assicurativo-cisterna-di-latina`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/broker-assicurativo-aprilia`, changeFrequency: 'monthly', priority: 0.8 },
    // Soluzioni per settore
    { url: `${BASE_URL}/soluzioni`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/famiglie`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/professionisti`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/artigiani-pmi`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/condomini`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/catastrofi-naturali`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/cyber-risk`, changeFrequency: 'monthly', priority: 0.9 },
    // Landing page verticali B2B
    { url: `${BASE_URL}/soluzioni/settori/edilizia`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/settori/medico`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/settori/manifatturiero`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/settori/welfare-aziendale`, changeFrequency: 'monthly', priority: 0.9 },
    // Strumenti & guide
    { url: `${BASE_URL}/sinistri`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/quiz-polizza`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/calcolatore-rischi`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/seconda-opinione`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/osservatorio-prezzi`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/glossario`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.85 },
    // Risorse
    { url: `${BASE_URL}/risorse/guida-pmi`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/risorse/osservatorio-pmi`, changeFrequency: 'monthly', priority: 0.85 },
    // Legal
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookie-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/note-legali`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/trasparenza`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/reclami`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/analizza-polizza`, changeFrequency: 'monthly', priority: 0.85 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/servizi/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    ...(lastModifiedOf(post.date) ?? {}),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
