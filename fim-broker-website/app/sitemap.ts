import type { MetadataRoute } from 'next'
import { services } from '@/lib/services'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

const ITALIAN_MONTHS: Record<string, string> = {
  Gennaio: '01', Febbraio: '02', Marzo: '03', Aprile: '04',
  Maggio: '05', Giugno: '06', Luglio: '07', Agosto: '08',
  Settembre: '09', Ottobre: '10', Novembre: '11', Dicembre: '12',
}

function parseBlogDate(dateStr: string): Date {
  try {
    const parts = dateStr.trim().split(' ')
    if (parts.length === 3) {
      const [day, monthIt, year] = parts
      const month = ITALIAN_MONTHS[monthIt]
      if (month) return new Date(`${year}-${month}-${day.padStart(2, '0')}`)
    }
  } catch {}
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/chi-siamo`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/servizi`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/preventivo`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/prenota-consulenza`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contatti`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/collabora-con-noi`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    // Geo-landing pages SEO locale
    { url: `${BASE_URL}/broker-assicurativo-latina`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/broker-assicurativo-cisterna-di-latina`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/broker-assicurativo-aprilia`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Soluzioni per settore
    { url: `${BASE_URL}/soluzioni`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/famiglie`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/professionisti`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/artigiani-pmi`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/condomini`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/catastrofi-naturali`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/cyber-risk`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    // Landing page verticali B2B
    { url: `${BASE_URL}/soluzioni/settori/edilizia`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/settori/medico`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/settori/manifatturiero`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/soluzioni/settori/welfare-aziendale`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    // Strumenti & guide
    { url: `${BASE_URL}/sinistri`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/quiz-polizza`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/calcolatore-rischi`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/seconda-opinione`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/osservatorio-prezzi`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/glossario`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    // Risorse
    { url: `${BASE_URL}/risorse/guida-pmi`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/risorse/osservatorio-pmi`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    // Legal
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/note-legali`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/trasparenza`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/reclami`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/analizza-polizza`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/servizi/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? parseBlogDate(post.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
