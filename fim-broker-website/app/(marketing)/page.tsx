import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import ServicesGrid from '@/components/home/ServicesGrid';
import Link from 'next/link';
import { MapPin, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />

      {/* Why FIM section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-fim-primary/10 text-fim-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Perché sceglierci
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-fim-primary mb-6">
                Un broker al tuo fianco, non solo un venditore
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                FIM Insurance Broker opera come intermediario indipendente: il nostro interesse è trovare la soluzione migliore per te, non per le compagnie. Con oltre 30 anni di esperienza e l&apos;iscrizione al RUI Sez. B, siamo il tuo punto di riferimento per la gestione del rischio.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Analisi gratuita del profilo di rischio',
                  'Confronto tra le migliori compagnie del mercato',
                  'Assistenza dedicata in caso di sinistro',
                  'Consulenza professionale e aggiornata',
                  'Sedi a Cisterna di Latina e Firenze',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={18} className="text-fim-accent flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/chi-siamo"
                className="inline-flex items-center gap-2 text-fim-primary font-semibold hover:text-fim-light transition-colors"
              >
                Scopri chi siamo <ArrowRight size={18} />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-fim-primary to-fim-light rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Contattaci</h3>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin size={20} className="text-fim-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Cisterna di Latina</p>
                    <p className="text-blue-200 text-sm">Via Roma 41</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin size={20} className="text-fim-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Firenze</p>
                    <p className="text-blue-200 text-sm">Contattaci per l&apos;indirizzo</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone size={20} className="text-fim-accent flex-shrink-0" />
                  <a href="tel:+390773123456" className="hover:text-fim-accent transition-colors">
                    +39 0773 123456
                  </a>
                </div>
                <div className="flex gap-3">
                  <Mail size={20} className="text-fim-accent flex-shrink-0" />
                  <a href="mailto:info@fimbroker.it" className="hover:text-fim-accent transition-colors">
                    info@fimbroker.it
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/preventivo"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-fim-accent text-fim-primary font-bold rounded-xl hover:bg-yellow-400 transition-colors"
                >
                  Richiedi Preventivo Gratuito
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
