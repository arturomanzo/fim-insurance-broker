import type { Metadata } from 'next'
import RiskCalculator from '@/components/calculator/RiskCalculator'

export const metadata: Metadata = {
  title: 'Calcolatore Rischio Assicurativo Gratuito | FIM Insurance Broker',
  description: 'Scopri in 2 minuti il tuo profilo di rischio assicurativo. Analisi gratuita personalizzata per privati, professionisti, PMI e imprese. Coperture raccomandate e preventivo immediato.',
  openGraph: {
    title: 'Calcolatore Rischio Assicurativo Gratuito — FIM Insurance Broker',
    description: 'Analisi del rischio personalizzata in 2 minuti. Scopri quali coperture ti servono davvero.',
  },
}

export default function CalcolatoreRischiPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Strumento gratuito
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Calcolatore del Rischio Assicurativo
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Rispondi a 8 domande e scopri quali polizze ti servono davvero — con una stima del costo. Completamente gratuito, nessun impegno.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              2 minuti
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% gratuito
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Analisi personalizzata
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Nessun impegno
            </span>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <RiskCalculator />
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
            {[
              { icon: '🔍', title: 'Analisi indipendente', desc: 'Non siamo legati a nessuna compagnia. Le nostre raccomandazioni sono basate solo sulle tue esigenze reali.' },
              { icon: '📋', title: '30+ compagnie confrontate', desc: 'I nostri consulenti analizzano le offerte delle principali compagnie italiane per trovare la soluzione migliore.' },
              { icon: '🛡️', title: 'Iscritti al RUI', desc: 'FIM Insurance Broker opera sotto la supervisione IVASS (Reg. RUI n. B000405449). La tua tutela è garantita.' },
            ].map((item) => (
              <div key={item.title} className="p-6">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
