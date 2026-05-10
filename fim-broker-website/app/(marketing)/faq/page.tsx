import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSection from '@/components/ui/FaqSection'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { ALL_FAQS, buildFaqSchema } from '@/lib/faq'

export const metadata: Metadata = {
  title: 'Domande frequenti — Tutte le risposte sulle assicurazioni | FIM',
  description:
    'Tutte le domande frequenti sulle polizze assicurative: famiglie, professionisti, PMI, condomini, sinistri, catastrofi naturali, welfare aziendale e settori specifici. Risposte chiare dal broker indipendente FIM.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Domande frequenti — FIM Insurance Broker',
    description:
      'Tutte le risposte sulle polizze assicurative italiane: famiglie, PMI, professionisti, condomini, sinistri.',
    images: [
      {
        url: '/api/og?title=Domande+frequenti&tag=FAQ&sub=Risposte+chiare+sulle+polizze+assicurative+italiane.',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    images: [
      '/api/og?title=Domande+frequenti&tag=FAQ&sub=Risposte+chiare+sulle+polizze+assicurative+italiane.',
    ],
  },
}

const allItems = ALL_FAQS.flatMap((c) => c.items)

export default function FaqIndexPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(allItems)) }}
      />
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'FAQ', href: '/faq' }]} />

      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom max-w-4xl">
          <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Domande frequenti sulle assicurazioni
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
            Tutte le risposte alle domande più comuni sulle polizze: famiglie, professionisti, PMI,
            condomini, sinistri e settori specifici. Se non trovi quello che cerchi,{' '}
            <Link href="/contatti" className="underline hover:no-underline">
              scrivici
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-bold text-primary mb-6">Indice categorie</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALL_FAQS.map((cat) => (
              <li key={cat.slug}>
                <a
                  href={`#${cat.slug}`}
                  className="flex items-center justify-between bg-gray-50 hover:bg-accent/10 border border-gray-200 hover:border-accent rounded-xl px-5 py-3 transition-colors"
                >
                  <span className="font-semibold text-primary">{cat.title}</span>
                  <span className="text-sm text-gray-500">{cat.items.length} risposte</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {ALL_FAQS.map((cat, idx) => (
        <FaqSection
          key={cat.slug}
          id={cat.slug}
          title={cat.title}
          items={cat.items}
          cta={cat.cta}
          background={idx % 2 === 0 ? 'gray' : 'white'}
          withSchema={false}
        />
      ))}

      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Non hai trovato la tua risposta?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Scrivici o chiamaci: parli direttamente con un consulente, senza moduli automatici.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/prenota-consulenza" className="btn-primary text-lg px-8 py-4">
              Prenota Consulenza Gratuita
            </Link>
            <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
              📞 06 96883381
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
