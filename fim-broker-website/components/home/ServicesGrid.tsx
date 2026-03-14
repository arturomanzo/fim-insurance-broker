import Link from 'next/link';
import { services } from '@/lib/services';
import { ArrowRight } from 'lucide-react';

export default function ServicesGrid() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-fim-primary/10 text-fim-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            I Nostri Servizi
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-fim-primary mb-4">
            Copertura completa per ogni esigenza
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dalla RC auto alle polizze vita, dall&apos;assicurazione casa ai rischi aziendali: FIM copre tutti i rami assicurativi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/servizi/${service.slug}`}
              className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-3xl mb-3">{service.icona}</div>
              <h3 className="font-semibold text-fim-primary text-base mb-2 group-hover:text-fim-light transition-colors">
                {service.nome}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                {service.descrizione}
              </p>
              <span className="inline-flex items-center gap-1 text-fim-accent text-sm font-medium group-hover:gap-2 transition-all">
                Scopri di più <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/servizi"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-fim-primary text-fim-primary font-semibold rounded-xl hover:bg-fim-primary hover:text-white transition-all duration-200"
          >
            Tutti i servizi <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
