import Link from 'next/link';
import { Shield, ArrowRight, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-fim-primary via-[#1e4a80] to-fim-light overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-fim-accent rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Shield size={14} className="text-fim-accent" />
            <span className="text-white text-sm font-medium">
              Iscritti RUI Sez. B – Oltre 30 anni di esperienza
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            La tua protezione,{' '}
            <span className="text-fim-accent">la nostra missione</span>
          </h1>

          <p className="text-blue-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
            FIM Insurance Broker è il tuo intermediario assicurativo di fiducia. Confrontiamo le migliori
            compagnie del mercato per trovare la soluzione ideale per te, la tua famiglia e la tua impresa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/preventivo"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-fim-accent text-fim-primary font-bold text-lg rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Richiedi Preventivo Gratuito
              <ArrowRight size={20} />
            </Link>
            <a
              href="tel:+390773123456"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold text-lg rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              <Phone size={20} />
              Chiamaci Ora
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-6">
            {[
              'Allianz',
              'Prima Assicurazioni',
              'Bene Assicurazioni',
              'DUAL/Arch',
            ].map((company) => (
              <div key={company} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-fim-accent rounded-full" />
                <span className="text-blue-200 text-sm">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
