import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/lib/services'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Servizi Assicurativi',
  description: 'Scopri tutti i servizi assicurativi FIM: auto, vita, casa, salute, polizze aziendali e viaggio. Soluzioni personalizzate per privati e imprese.',
}

export default function ServiziPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 border border-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
              I Nostri Servizi
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Soluzioni assicurative <span className="text-accent">per ogni esigenza</span>
            </h1>
            <p className="text-xl text-white/80">
              Da FIM trovi polizze personalizzate per privati e aziende. Confrontiamo le offerte di
              le principali compagnie assicurative per garantirti il miglior rapporto qualità-prezzo.
            </p>
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
