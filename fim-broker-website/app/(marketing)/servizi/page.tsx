import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/services';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Servizi Assicurativi',
  description: 'Scopri tutti i servizi assicurativi di FIM Insurance Broker: RC Auto, vita, infortuni, casa, rischi aziendali, RC professionale, trasporti e agricoltura.',
};

export default function ServiziPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-fim-primary to-fim-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">I Nostri Servizi</h1>
          <p className="text-blue-100 text-lg">
            Copertura assicurativa completa per privati, professionisti e aziende.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/servizi/${service.slug}`}
                className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{service.icona}</div>
                <h2 className="text-xl font-bold text-fim-primary mb-3 group-hover:text-fim-light transition-colors">
                  {service.nome}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.descrizione}</p>
                <span className="inline-flex items-center gap-1.5 text-fim-accent text-sm font-semibold group-hover:gap-2.5 transition-all">
                  Scopri di più <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-fim-primary rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Non sai quale polizza fa per te?</h2>
            <p className="text-blue-200 mb-6">
              FIMA, il nostro assistente AI, può aiutarti a orientarti tra i prodotti assicurativi. Oppure contattaci per una consulenza gratuita.
            </p>
            <Link
              href="/preventivo"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-fim-accent text-fim-primary font-bold rounded-xl hover:bg-yellow-400 transition-colors"
            >
              Richiedi Consulenza Gratuita <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
