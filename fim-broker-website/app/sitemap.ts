import type { MetadataRoute } from 'next'
import { services } from '@/lib/services'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

const blogSlugs = [
  'assicurazione-condominio-guida-completa',
  'differenza-broker-agente-assicurativo',
  'come-scegliere-polizza-auto',
  'assicurazione-vita-guida',
  'cyber-risk-pmi',
  'novita-rc-auto-2024',
  'polizza-casa-alluvioni',
  'previdenza-complementare',
  'rc-professionale-liberi-professionisti-2025',
  'polizze-obbligatorie-aziende-italia-2025',
  'assicurazioni-pmi-guida-completa',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/chi-siamo`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/servizi`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/preventivo`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/prenota-consulenza`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/area-cliente`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
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
    // Strumenti & guide
    { url: `${BASE_URL}/sinistri`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/quiz-polizza`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/calcolatore-rischi`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/osservatorio-prezzi`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/glossario`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Risorse
    { url: `${BASE_URL}/risorse/guida-pmi`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/risorse/osservatorio-pmi`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    // Legal
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/note-legali`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/servizi/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...blogPages]
}
