import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { services } from '@/lib/services'
import Card from '@/components/ui/Card'
import { OG_BASE } from '@/lib/seo'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

// CollectionPage + ItemList — espone i 9 servizi come lista ordinata.
// Google usa ItemList sulle index page per generare carousel rich result
// e per i sitelinks. provider = riferimento all'org globale via @id.
const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${BASE_URL}/servizi`,
  url: `${BASE_URL}/servizi`,
  name: 'Servizi Assicurativi FIM Insurance Broker',
  description:
    'Catalogo completo dei servizi assicurativi: auto, vita, casa, salute, polizze aziendali, viaggio, cauzioni, tutela legale, risk management.',
  inLanguage: 'it-IT',
  isPartOf: { '@id': `${BASE_URL}/#website` },
  about: { '@id': `${BASE_URL}/#organization` },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Servizi Assicurativi',
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE_URL}/servizi/${s.slug}`,
      item: {
        '@type': 'Service',
        '@id': `${BASE_URL}/servizi/${s.slug}`,
        name: s.title,
        description: s.shortDescription,
        url: `${BASE_URL}/servizi/${s.slug}`,
        provider: { '@id': `${BASE_URL}/#organization` },
      },
    })),
  },
}

export const metadata: Metadata = {
  title: 'Servizi Assicurativi',
  description: 'Scopri tutti i servizi assicurativi FIM: auto, vita, casa, salute, polizze aziendali e viaggio. Soluzioni personalizzate per privati e imprese.',
  alternates: { canonical: '/servizi' },
  openGraph: {
    ...OG_BASE,
    url: '/servizi',
    images: [{ url: '/api/og?title=Servizi+Assicurativi&tag=FIM+Insurance+Broker&sub=Auto%2C+vita%2C+casa%2C+salute%2C+polizze+aziendali+e+viaggio.+Soluzioni+personalizzate.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Servizi+Assicurativi&tag=FIM+Insurance+Broker&sub=Auto%2C+vita%2C+casa%2C+salute%2C+polizze+aziendali+e+viaggio.+Soluzioni+personalizzate.'],
  },
}

export default function ServiziPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <span className="inline-block bg-white/10 border border-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
                I Nostri Servizi
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-6">
                Soluzioni assicurative <span className="text-accent">per ogni esigenza</span>
              </h1>
              <p className="text-xl text-white/80">
                Da FIM trovi polizze personalizzate per privati e aziende. Confrontiamo le offerte
                delle principali compagnie assicurative per garantirti il miglior rapporto qualità-prezzo.
              </p>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/visual/broker-scioglie-complessita.png"
                  alt="Broker assicurativo che semplifica la complessità delle polizze per i clienti"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.slug} href={`/servizi/${service.slug}`} className="group">
                <Card hover className="h-full">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h2 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-light transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                      Scopri di più
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-black text-white mb-4">Non trovi quello che cerchi?</h2>
          <p className="text-white/80 mb-8">
            Contattaci per una consulenza gratuita. Troviamo la soluzione giusta per te.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
              Preventivo Gratuito
            </Link>
            <Link href="/contatti" className="btn-outline-white text-lg px-8 py-4">
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
