import Link from 'next/link'

export default function Hero() {
  return (
    <section className="gradient-primary text-white py-24 md:py-32 relative overflow-hidden">
      {/* Background — dot grid pattern + gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Soft glowing blobs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/3 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge IVASS */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" aria-hidden="true" />
            Broker autorizzato IVASS — RUI B000405449
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
            La polizza giusta per te,
            <br />
            <span className="text-accent">
              scelta tra 30+ compagnie
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/75 mb-10 leading-relaxed max-w-3xl mx-auto">
            Lavoriamo per te, <strong className="text-white">non per le compagnie</strong>.
            Consulenza gratuita, preventivo in 24 ore, nessuna sorpresa in fattura.
          </p>

          {/* Response time promise */}
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-2 text-sm font-semibold mb-10 backdrop-blur-sm">
            <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Risposta garantita entro 24 ore lavorative
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-14">
            <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
              Preventivo Gratuito
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://wa.me/393473312330?text=Ciao,%20vorrei%20un%20preventivo%20assicurativo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20c05c] text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
              📞 Chiama ora
            </a>
          </div>

          {/* Proof bar — stats + Google rating */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden divide-x divide-y md:divide-y-0 divide-white/10">
              {/* 20+ anni */}
              <div className="p-5 md:p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-accent mb-1">20+</div>
                <div className="text-white/70 text-xs md:text-sm font-medium">Anni di esperienza</div>
              </div>
              {/* 1.200+ polizze */}
              <div className="p-5 md:p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-accent mb-1">1.200+</div>
                <div className="text-white/70 text-xs md:text-sm font-medium">Polizze attive</div>
              </div>
              {/* 30+ compagnie */}
              <div className="p-5 md:p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-accent mb-1">30+</div>
                <div className="text-white/70 text-xs md:text-sm font-medium">Compagnie partner</div>
              </div>
              {/* Google rating */}
              <div className="p-5 md:p-6 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-3xl md:text-4xl font-black text-accent">4.9</span>
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div className="text-white/70 text-xs md:text-sm font-medium flex items-center justify-center gap-1">
                  <svg className="w-3 h-3 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Reviews
                </div>
              </div>
            </div>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center mt-10 text-white/60 text-sm">
            {[
              'Consulenza 100% gratuita',
              'Nessun costo nascosto',
              'Provvigioni trasparenti per legge',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
