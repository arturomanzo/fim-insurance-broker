import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { services, getServiceBySlug } from '@/lib/services'
import Card from '@/components/ui/Card'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Servizio non trovato' }
  return {
    title: service.title,
    description: service.shortDescription,
  }
}

export default async function ServizioPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-20 text-white">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/servizi" className="text-white/60 hover:text-white text-sm transition-colors">
              Servizi
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/80 text-sm">{service.title}</span>
          </div>
          <div className="flex items-start gap-6">
            <span className="text-6xl hidden sm:block">{service.icon}</span>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">{service.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Features */}
              <Card>
                <h2 className="text-2xl font-black text-primary mb-6">Cosa è incluso</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Benefits */}
              <Card>
                <h2 className="text-2xl font-black text-primary mb-6">Perché scegliere FIM</h2>
                <div className="space-y-4">
                  {service.benefits.map((b, i) => (
                    <div key={b} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary text-sm">
                        {i + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{b}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* FAQ */}
              <Card>
                <h2 className="text-2xl font-black text-primary mb-6">Domande frequenti</h2>
                <div className="space-y-5">
                  {service.faq.map((item) => (
                    <div key={item.question} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                      <h3 className="font-bold text-primary mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <Card className="gradient-primary text-white sticky top-24" padding="lg">
                <h3 className="text-xl font-black mb-3">Preventivo gratuito</h3>
                <p className="text-white/80 text-sm mb-6">
                  Ricevi un preventivo personalizzato per {service.title.toLowerCase()} entro 24 ore.
                </p>
                <Link href="/preventivo" className="btn-primary w-full text-center block mb-3">
                  Richiedi Preventivo
                </Link>
                <a href="tel:+390212345678" className="btn-outline-white w-full text-center block text-sm">
                  📞 02 1234567
                </a>
              </Card>

              {/* Other services */}
              <div>
                <h3 className="font-bold text-primary mb-4">Altri servizi</h3>
                <div className="space-y-3">
                  {otherServices.map((s) => (
                    <Link key={s.slug} href={`/servizi/${s.slug}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all">
                      <span className="text-2xl">{s.icon}</span>
                      <span className="font-medium text-gray-700 text-sm">{s.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
