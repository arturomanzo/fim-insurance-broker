import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services, getServiceBySlug } from '@/lib/services';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: 'Servizio non trovato' };

  return {
    title: service.nome,
    description: service.descrizione,
  };
}

export default function ServizioDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  // Other services for suggestions
  const altriServizi = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  // Parse dettaglio for bold markers
  const paragraphs = service.dettaglio.split('\n\n');

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-fim-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/servizi"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            Tutti i servizi
          </Link>
          <div className="flex items-center gap-6">
            <div className="text-6xl">{service.icona}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {service.nome}
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl">{service.descrizione}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              {paragraphs.map((para, i) => {
                if (para.startsWith('**') && para.endsWith('**')) {
                  const text = para.replace(/\*\*/g, '');
                  return (
                    <h3 key={i} className="text-xl font-bold text-fim-primary mt-8 mb-3">
                      {text}
                    </h3>
                  );
                }

                if (para.includes('\n- ')) {
                  const [heading, ...items] = para.split('\n');
                  return (
                    <div key={i} className="mb-6">
                      {heading && (
                        <h3 className="text-xl font-bold text-fim-primary mb-3">
                          {heading.replace(/\*\*/g, '')}
                        </h3>
                      )}
                      <ul className="space-y-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-gray-700">
                            <CheckCircle
                              size={18}
                              className="text-fim-accent shrink-0 mt-0.5"
                            />
                            <span>{item.replace('- ', '')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                return (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4">
                    {para}
                  </p>
                );
              })}
            </div>

            <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
              <p className="text-sm text-gray-600 italic">
                <strong className="text-fim-primary">Nota:</strong> Le informazioni
                contenute in questa pagina hanno carattere puramente informativo e non
                costituiscono consulenza assicurativa vincolante. Per una proposta
                personalizzata contatta un broker FIM.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA preventivo */}
            <div className="bg-fim-primary rounded-2xl p-6 text-white">
              <div className="text-3xl mb-3">{service.icona}</div>
              <h3 className="font-bold text-xl mb-2">
                Vuoi un preventivo per {service.nome}?
              </h3>
              <p className="text-blue-100 text-sm mb-5">
                Compila il modulo e ti contatteremo con una proposta personalizzata
                senza alcun impegno.
              </p>
              <Link
                href="/preventivo"
                className="block text-center bg-fim-accent hover:bg-yellow-500 text-fim-primary font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md"
              >
                Richiedi Preventivo Gratuito
              </Link>
            </div>

            {/* Contatti */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-fim-primary text-lg mb-4">
                Hai domande?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                I nostri broker sono disponibili per rispondere a qualsiasi
                domanda su questa tipologia di polizza.
              </p>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 text-fim-light hover:text-fim-primary font-semibold text-sm transition-colors"
              >
                Contattaci
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Altri servizi */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-fim-primary text-lg mb-4">
                Altri servizi
              </h3>
              <div className="space-y-3">
                {altriServizi.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servizi/${s.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-2xl">{s.icona}</span>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-fim-primary transition-colors">
                      {s.nome}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/servizi"
                  className="flex items-center gap-2 text-fim-light hover:text-fim-primary font-semibold text-sm pt-2 transition-colors"
                >
                  Vedi tutti i servizi
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
