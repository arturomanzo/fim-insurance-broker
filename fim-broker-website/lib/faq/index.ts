import { famiglieFaq } from './famiglie'
import { professionistiFaq } from './professionisti'
import { artigianiPmiFaq } from './artigiani-pmi'
import { condominiFaq } from './condomini'
import { catastrofiNaturaliFaq } from './catastrofi-naturali'
import { manifatturieroFaq } from './manifatturiero'
import { ediliziaFaq } from './edilizia'
import { medicoFaq } from './medico'
import { welfareAziendaleFaq } from './welfare-aziendale'
import { sinistriFaq } from './sinistri'
import { osservatorioPmiFaq } from './osservatorio-pmi'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqCta {
  text: string
  description?: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export interface FaqCategory {
  slug: string
  title: string
  intro?: string
  cta: FaqCta
  items: FaqItem[]
}

export const ALL_FAQS: readonly FaqCategory[] = [
  famiglieFaq,
  professionistiFaq,
  artigianiPmiFaq,
  condominiFaq,
  catastrofiNaturaliFaq,
  manifatturieroFaq,
  ediliziaFaq,
  medicoFaq,
  welfareAziendaleFaq,
  sinistriFaq,
  osservatorioPmiFaq,
] as const

export function getFaqBySlug(slug: string): FaqCategory | undefined {
  return ALL_FAQS.find((c) => c.slug === slug)
}

export function buildFaqSchema(items: readonly FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
