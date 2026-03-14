import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog Assicurativo',
  description:
    'Articoli, guide e consigli dal team di FIM Insurance Broker su RCA, polizze vita, assicurazione casa, RC professionale e molto altro.',
};

export const blogPosts = [
  {
    slug: 'guida-rca-2024',
    titolo: 'Guida completa all\'assicurazione RCA: tutto quello che devi sapere',
    excerpt:
      'L\'assicurazione RCA è obbligatoria per tutti i veicoli a motore. In questa guida completa scopri come funziona, cosa copre, come risparmiare e quali garanzie accessorie valutare.',
    categoria: 'Auto',
    data: '2024-11-15',
    lettura: '8 min',
    autore: 'Team FIM',
  },
  {
    slug: 'polizza-vita-perche-serve',
    titolo: 'Polizza vita: perché è essenziale per proteggere la tua famiglia',
    excerpt:
      'Molti italiani sottovalutano l\'importanza di una polizza vita. In questo articolo spieghiamo i diversi tipi di copertura vita, quando conviene stipularla e come scegliere quella giusta.',
    categoria: 'Vita',
    data: '2024-10-28',
    lettura: '6 min',
    autore: 'Team FIM',
  },
  {
    slug: 'rc-professionale-obbligatoria',
    titolo: 'RC Professionale: quando è obbligatoria e come sceglierla',
    excerpt:
      'La Responsabilità Civile Professionale tutela il professionista dai rischi di errori e omissioni nel proprio lavoro. Scopri per quali categorie è obbligatoria per legge e come valutare massimali e franchigie.',
    categoria: 'RC Professionale',
    data: '2024-10-10',
    lettura: '7 min',
    autore: 'Team FIM',
  },
];

const categoriaColori: Record<string, string> = {
  Auto: 'bg-blue-100 text-blue-800',
  Vita: 'bg-red-100 text-red-800',
  'RC Professionale': 'bg-purple-100 text-purple-800',
  Casa: 'bg-green-100 text-green-800',
  Aziende: 'bg-yellow-100 text-yellow-800',
};

export default function BlogPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-fim-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog Assicurativo
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Guide, consigli e approfondimenti dal team di FIM Insurance Broker per
            aiutarti a capire il mondo delle assicurazioni e fare scelte consapevoli.
          </p>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Card header color band */}
                <div className="h-2 bg-gradient-to-r from-fim-primary to-fim-light" />

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        categoriaColori[post.categoria] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {post.categoria}
                    </span>
                  </div>

                  <h2 className="font-bold text-fim-primary text-xl mb-3 leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-fim-light transition-colors"
                    >
                      {post.titolo}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {new Date(post.data).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {post.lettura}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-fim-light hover:text-fim-primary font-semibold text-sm transition-colors group"
                  >
                    Leggi l&apos;articolo
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 bg-fim-primary rounded-3xl p-10 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">
              Rimani aggiornato sul mondo assicurativo
            </h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Hai domande su qualche tipologia di polizza? Il nostro team è pronto a
              risponderti. Contattaci o usa FIMA, il nostro assistente AI.
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 bg-fim-accent hover:bg-yellow-500 text-fim-primary font-bold py-3 px-8 rounded-xl transition-all duration-200"
            >
              Contatta un esperto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
