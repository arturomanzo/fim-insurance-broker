import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import ServicesGrid from '@/components/home/ServicesGrid'
import TrustedBrands from '@/components/home/TrustedBrands'
import LeadMagnet from '@/components/home/LeadMagnet'
import Link from 'next/link'
import Card from '@/components/ui/Card'

const testimonials = [
  {
    name: 'Marco Bianchi',
    role: 'Imprenditore — Roma',
    initials: 'MB',
    color: 'bg-blue-100 text-blue-700',
    text: 'FIM ha trovato la polizza aziendale perfetta per la mia attività, risparmiando il 25% rispetto al preventivo precedente. Servizio eccellente.',
    rating: 5,
  },
  {
    name: 'Laura Ferretti',
    role: 'Privato — Milano',
    initials: 'LF',
    color: 'bg-rose-100 text-rose-700',
    text: 'Finalmente un broker che spiega tutto in modo chiaro. Ho assicurato casa e auto con FIM e sono molto soddisfatta del servizio.',
    rating: 5,
  },
  {
    name: 'Studio Legale Conti',
    role: 'Studio professionale — Roma',
    initials: 'SL',
    color: 'bg-green-100 text-green-700',
    text: 'Gestiamo tutte le polizze dello studio con FIM da 5 anni. Sempre disponibili, sempre professionali. Altamente raccomandati.',
    rating: 5,
  },
]

const whyFIM = [
  {
    icon: '🔍',
    title: 'Confrontiamo per te',
    desc: 'Analizziamo le offerte delle principali compagnie assicurative per trovare la soluzione migliore al prezzo più competitivo.',
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
      <TrustedBrands />
      <ServicesGrid />

      {/* Audience Split — Privati vs Aziende */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Chi siamo
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Privato o azienda?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Offriamo soluzioni su misura per ogni tipo di cliente. Scegli il tuo profilo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Privati */}
            <div className="group rounded-2xl border-2 border-gray-100 hover:border-primary/30 bg-white p-8 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:bg-primary/15 transition-colors">
                👤
              </div>
              <h3 className="text-2xl font-black text-primary mb-3">Privati</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Proteggi te e la tua famiglia con le polizze più adatte alle tue esigenze, al miglior prezzo di mercato.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'RC Auto e Kasko',
                  'Assicurazione Casa',
                  'Polizze Vita e Previdenza',
                  'Assicurazione Salute',
                  'Copertura Viaggi',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/preventivo?tipo=privato" className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Preventivo per privati
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Aziende */}
            <div className="group rounded-2xl border-2 border-gray-100 hover:border-accent/40 bg-white p-8 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:bg-accent/15 transition-colors">
                🏢
              </div>
              <h3 className="text-2xl font-black text-primary mb-3">Aziende e PMI</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Soluzioni assicurative complete per proteggere la tua attività, i tuoi dipendenti e il tuo patrimonio.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'RC Professionale e Aziendale',
                  'Polizze Cyber e D&O',
                  'Assicurazione Flotta Aziendale',
                  'Tutela Legale',
                  'Welfare aziendale e Salute',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/preventivo?tipo=azienda" className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Preventivo per aziende
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                  desc: 'I nostri consulenti confrontano le offerte delle principali compagnie assicurative per trovare la soluzione ideale.',
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

      {/* Calculator CTA Banner */}
      <section className="py-14 bg-white">
        <div className="container-custom">
          <div className="relative rounded-3xl overflow-hidden gradient-primary p-8 md:p-12">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-accent/10" />
            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block bg-accent/20 text-accent-light text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  Strumento gratuito
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                  Non sai da dove iniziare?
                </h2>
                <p className="text-white/80 text-lg mb-2">
                  Usa il nostro <strong className="text-white">Calcolatore del Rischio</strong> — 2 minuti, nessun impegno.
                </p>
                <ul className="space-y-1.5 text-white/70 text-sm">
                  {[
                    'Scopri il tuo profilo di rischio assicurativo',
                    'Ricevi le coperture raccomandate per la tua situazione',
                    'Ottieni una stima del costo annuo',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-accent-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center text-5xl">
                  📊
                </div>
                <Link
                  href="/calcolatore-rischi"
                  className="btn-primary bg-accent hover:bg-accent-dark text-white px-8 py-4 text-base font-bold shadow-lg"
                >
                  Calcola il mio rischio →
                </Link>
                <span className="text-white/50 text-xs">Gratuito · Nessun impegno · 2 minuti</span>
              </div>
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
              Recensioni verificate
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              I nostri clienti parlano per noi
            </h2>
            {/* Google aggregate rating */}
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-2 mt-2 shadow-sm">
              <svg className="w-5 h-5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700">4.9</span>
              <span className="text-sm text-gray-500">su Google Reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="relative flex flex-col">
                {/* Google badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <svg className="w-4 h-4 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic flex-1">&ldquo;{t.text}&rdquo;</p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-primary text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <LeadMagnet />

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
            <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
              📞 Chiama ora
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
