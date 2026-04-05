import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const InsuranceQuiz = dynamic(() => import('@/components/ui/InsuranceQuiz'), {
  loading: () => (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Caricamento quiz...</p>
      </div>
    </div>
  ),
})

export const metadata: Metadata = {
  title: 'Di che polizza hai bisogno? — Quiz Gratuito',
  description: 'Rispondi a 4 domande e scopri quali coperture assicurative ti servono davvero. Quiz gratuito e personalizzato per privati, professionisti e aziende.',
  openGraph: {
    title: 'Di che polizza hai bisogno? — FIM Insurance Broker',
    description: '4 domande per scoprire le coperture giuste per te. Gratis, senza impegno.',
    images: [{ url: '/api/og?title=Di+che+polizza+hai+bisogno%3F&tag=FIM+Insurance+Broker&sub=Quiz+gratuito+in+4+domande', width: 1200, height: 630 }],
  },
}

export default function QuizPolizzaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Quiz gratuito
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Di che polizza hai bisogno?
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto">
            Rispondi a 4 domande e scopri le coperture assicurative su misura per te. Senza impegno, senza costi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-white/70 text-sm">
            {[
              '4 domande',
              '< 1 minuto',
              '100% gratuito',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-2xl">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <InsuranceQuiz />
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🔒', title: 'Dati al sicuro', desc: 'Non chiediamo email o dati personali per il quiz. Il risultato è istantaneo.' },
              { icon: '🤝', title: 'Senza vincoli', desc: 'Il quiz è puramente orientativo. Nessun obbligo di acquisto o contatto.' },
              { icon: '👨‍💼', title: 'Verifica con un esperto', desc: 'Vuoi approfondire? Un broker FIM analizza gratuitamente la tua situazione.' },
            ].map((item) => (
              <div key={item.title} className="p-4">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-primary mb-1 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA alternativa */}
      <section className="gradient-primary py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-black text-white mb-3">Preferisci parlare con un esperto?</h2>
          <p className="text-white/80 mb-6 text-sm">
            I nostri broker analizzano la tua situazione gratuitamente e senza impegno.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+390696883381" className="btn-primary bg-accent hover:bg-accent-dark text-primary font-bold px-6 py-3">
              📞 06 96883381
            </a>
            <Link href="/preventivo" className="btn-outline-white px-6 py-3">
              Preventivo gratuito
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
