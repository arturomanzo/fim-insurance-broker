import Link from 'next/link'

export default function Hero() {
  return (
    <section className="gradient-primary text-white py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
      </div>

      <div className="container-custom relative">
        <div className="max-w-3xl">
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

          <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-2xl">
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
      </div>
    </section>
  )
}
