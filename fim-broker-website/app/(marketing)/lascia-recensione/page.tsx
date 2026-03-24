import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lascia una Recensione | FIM Insurance Broker',
  description: 'La tua opinione ci aiuta a migliorare e ad aiutare altri clienti a trovare la soluzione assicurativa giusta. Lascia una recensione su Google.',
  robots: { index: false }, // non vogliamo che questa pagina appaia in SERP
}

const GOOGLE_REVIEW_URL = 'https://g.page/r/CfimbrokerReview/review' // placeholder — da aggiornare con URL reale

const steps = [
  { n: '1', text: 'Clicca il pulsante "Scrivi una recensione"' },
  { n: '2', text: 'Accedi al tuo account Google (se non sei già connesso)' },
  { n: '3', text: 'Assegna le stelle e scrivi la tua esperienza' },
  { n: '4', text: 'Pubblica — ci vogliono meno di 2 minuti!' },
]

export default function LaSciaRecensionePage() {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="container-custom py-16 max-w-2xl mx-auto text-center">

        {/* Gratitude header */}
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⭐</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-primary mb-4">
          Grazie per aver scelto FIM!
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          La tua esperienza vale molto per noi — e per le altre imprese che stanno cercando il broker giusto. Condividere la tua opinione ti richiede solo 2 minuti.
        </p>

        {/* Main CTA */}
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl mb-10"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Scrivi una recensione su Google
        </a>

        {/* Steps */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <h2 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">Come fare</h2>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.n} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {step.n}
                </div>
                <p className="text-gray-700 text-sm pt-0.5">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prompts */}
        <div className="text-left bg-white border border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider">Spunti per la tua recensione</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              'Come ti ha aiutato FIM nella scelta della polizza giusta?',
              'Il team è stato disponibile e professionale?',
              'Hai risparmiato rispetto alla tua polizza precedente?',
              'Consiglieresti FIM a un collega o amico?',
            ].map((prompt) => (
              <li key={prompt} className="flex items-start gap-2">
                <span className="text-accent mt-0.5">→</span>
                {prompt}
              </li>
            ))}
          </ul>
        </div>

        {/* Back link */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="text-primary hover:underline text-sm">
            ← Torna alla home
          </Link>
          <span className="hidden sm:inline text-gray-300">|</span>
          <Link href="/contatti" className="text-primary hover:underline text-sm">
            Hai bisogno di supporto?
          </Link>
        </div>

      </div>
    </div>
  )
}
