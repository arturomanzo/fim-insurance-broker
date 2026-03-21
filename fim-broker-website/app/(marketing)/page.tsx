import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import ServicesGrid from '@/components/home/ServicesGrid'
import Link from 'next/link'
import Card from '@/components/ui/Card'

const testimonials = [
  {
    name: 'Marco Bianchi',
    role: 'Imprenditore',
    text: 'FIM ha trovato la polizza aziendale perfetta per la mia attività, risparmiando il 25% rispetto al preventivo precedente. Servizio eccellente.',
    rating: 5,
  },
  {
    name: 'Laura Ferretti',
    role: 'Privato',
    text: 'Finalmente un broker che spiega tutto in modo chiaro. Ho assicurato casa e auto con FIM e sono molto soddisfatta del servizio.',
    rating: 5,
  },
  {
    name: 'Studio Legale Conti',
    role: 'Studio professionale',
    text: 'Gestiamo tutte le polizze dello studio con FIM da 5 anni. Sempre disponibili, sempre professionali. Altamente raccomandati.',
    rating: 5,
  },
]

const whyFIM = [
  {
    icon: '🔍',
    title: 'Confrontiamo per te',
    desc: 'Analizziamo le offerte di oltre 50 compagnie per trovare la soluzione migliore al prezzo più competitivo.',
  },
  {
    icon: '🤝',
    title: 'Consulenza personalizzata',
    desc: 'Un consulente dedicato analizza le tue esigenze e costruisce la copertura ideale per te.',
  },
  {
    icon: '⚡',
    title: 'Gestione sinistri',
    desc: 'Ti affianchiamo in ogni fase del sinistro, dalla denuncia alla liquidazione, con massima efficienza.',
  },
  {
    icon: '💯',
    title: 'Trasparenza totale',
    desc: 'Nessun costo nascosto, nessuna sorpresa. Ti spieghiamo ogni clausola con chiarezza.',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />

      {/* Come funziona */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Il nostro processo
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Come funziona
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Trovare la polizza giusta non è mai stato così semplice. Seguici in 4 passi.
            </p>
          </div>
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  icon: '📋',
                  title: 'Raccontaci le tue esigenze',
                  desc: 'Compila il form online o chiamaci. Ci dici di cosa hai bisogno e raccogliamo tutte le informazioni necessarie.',
                },
                {
                  step: '02',
                  icon: '🔎',
                  title: 'Analizziamo il mercato',
                  desc: 'I nostri consulenti confrontano le offerte di oltre 50 compagnie assicurative per trovare la soluzione ideale.',
                },
                {
                  step: '03',
                  icon: '📊',
                  title: 'Ricevi il preventivo',
                  desc: 'Entro 24 ore lavorative ti presentiamo un preventivo dettagliato e personalizzato, senza impegno.',
                },
                {
                  step: '04',
                  icon: '✅',
                  title: 'Attivi la polizza',
                  desc: 'Scegli la copertura più adatta e attiviamo la polizza. Ti seguiamo anche dopo, per rinnovi e sinistri.',
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center group">
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-xs font-black flex items-center justify-center shadow">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why FIM */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Perché sceglierci
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Il vantaggio FIM
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Come broker indipendente, lavoriamo esclusivamente nell&apos;interesse dei nostri clienti.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyFIM.map((item) => (
              <Card key={item.title} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Recensioni
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              I nostri clienti parlano per noi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="relative">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-accent text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-primary">{t.name}</div>
                  <div className="text-gray-500 text-sm">{t.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Pronto per il tuo preventivo gratuito?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Compila il modulo o chiama ora. Risponderemo entro 24 ore con un preventivo personalizzato.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
              Richiedi Preventivo
            </Link>
            <a href="tel:+390212345678" className="btn-outline-white text-lg px-8 py-4">
              📞 Chiama ora
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
