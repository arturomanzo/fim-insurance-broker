import Link from 'next/link'
import Image from 'next/image'
import { services } from '@/lib/services'

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
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Service image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Icon badge */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm text-xl">
                    {service.icon}
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5">
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
