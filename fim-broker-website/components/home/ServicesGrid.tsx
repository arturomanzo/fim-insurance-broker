import Link from 'next/link'
import { services } from '@/lib/services'
import Card from '@/components/ui/Card'

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            I Nostri Servizi
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
            Soluzioni per ogni esigenza
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Dalla tutela personale alla protezione aziendale, offriamo coperture complete per ogni tipo di rischio.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.slug} href={`/servizi/${service.slug}`} className="group">
              <Card hover className="h-full">
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{service.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-primary-light transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                      Scopri di più
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/servizi" className="btn-secondary">
            Tutti i servizi
          </Link>
        </div>
      </div>
    </section>
  )
}
