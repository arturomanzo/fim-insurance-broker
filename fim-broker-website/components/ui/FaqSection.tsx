import Link from 'next/link'
import FaqAccordion from './FaqAccordion'
import { buildFaqSchema, type FaqCta, type FaqItem } from '@/lib/faq'

interface FaqSectionProps {
  items: readonly FaqItem[]
  title?: string
  cta?: FaqCta
  background?: 'gray' | 'white' | 'none'
  withSchema?: boolean
  id?: string
}

function CtaButton({
  href,
  label,
  variant,
}: {
  href: string
  label: string
  variant: 'primary' | 'secondary'
}) {
  const className =
    variant === 'primary'
      ? 'btn-primary px-6 py-3'
      : 'inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors'
  const isExternal = href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')
  if (isExternal) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

export default function FaqSection({
  items,
  title = 'Domande frequenti',
  cta,
  background = 'gray',
  withSchema = true,
  id,
}: FaqSectionProps) {
  const bgClass = background === 'gray' ? 'bg-gray-50' : background === 'white' ? 'bg-white' : ''
  const accordionItems: FaqItem[] = items.map((i) => ({ question: i.question, answer: i.answer }))

  const inner = (
    <div className="container-custom max-w-3xl">
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(items)) }}
        />
      )}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-primary mb-3">{title}</h2>
      </div>
      <FaqAccordion items={accordionItems} />
      {cta && (
        <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{cta.text}</h3>
          {cta.description && <p className="text-gray-600 mb-5 leading-relaxed">{cta.description}</p>}
          <div className="flex flex-wrap gap-3 justify-center">
            <CtaButton href={cta.primary.href} label={cta.primary.label} variant="primary" />
            {cta.secondary && (
              <CtaButton href={cta.secondary.href} label={cta.secondary.label} variant="secondary" />
            )}
          </div>
        </div>
      )}
    </div>
  )

  if (background === 'none') {
    return id ? <div id={id}>{inner}</div> : inner
  }

  return (
    <section id={id} className={`section-padding ${bgClass}`}>
      {inner}
    </section>
  )
}
