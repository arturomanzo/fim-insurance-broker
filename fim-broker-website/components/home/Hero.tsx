import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="gradient-primary text-white py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Broker autorizzato IVASS — RUI B000405449
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              La tua{' '}
              <span className="text-accent">protezione</span>
              <br />
              su misura
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed">
              FIM Insurance Broker confronta per te le migliori offerte del mercato assicurativo.
              Risparmia tempo, risparmia denaro, vivi sereno.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
                Preventivo Gratuito
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/servizi" className="btn-outline-white text-lg px-8 py-4">
                Scopri i Servizi
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 text-white/70 text-sm">
              {[
                { icon: '✓', label: 'Consulenza gratuita' },
                { icon: '✓', label: 'Nessun costo aggiuntivo' },
                { icon: '✓', label: 'Oltre 20 anni di esperienza' },
                { icon: '✓', label: 'Clienti soddisfatti' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-accent font-bold">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Hero image — visible solo su desktop */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1000&q=80&fit=crop&auto=format"
                alt="Consulente FIM Insurance Broker con cliente"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
              />
              {/* Overlay gradient per integrare col background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Polizze attive</p>
                <p className="text-primary font-black text-lg leading-none">+1.200</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
