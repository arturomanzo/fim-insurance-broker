import type { Metadata } from 'next'
import PreventivoForm from '@/components/forms/PreventivoForm'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Richiedi Preventivo Gratuito',
  description: 'Richiedi il tuo preventivo assicurativo gratuito e personalizzato. Risponderemo entro 24 ore con la soluzione migliore per te.',
}

const steps = [
  { n: '1', title: 'Compila il modulo', desc: 'Inserisci le tue informazioni e le tue esigenze assicurative.' },
  { n: '2', title: 'Riceviamo la richiesta', desc: 'Il nostro team analizza la tua richiesta e confronta le offerte.' },
  { n: '3', title: 'Ti contattiamo', desc: 'Entro 24 ore ti presentiamo il preventivo più conveniente.' },
]

export default function PreventivoPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 text-white">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/10 border border-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
              Preventivo Gratuito
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Il tuo preventivo <span className="text-accent">personalizzato</span>
            </h1>
            <p className="text-xl text-white/80">
              Nessun costo, nessun impegno. Confrontiamo le migliori offerte e ti presentiamo la soluzione ideale.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-accent font-black flex-shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black text-primary mb-6">Inserisci i tuoi dati</h2>
              <Card padding="lg">
                <PreventivoForm />
              </Card>
            </div>

            <div className="space-y-6">
              {/* Why FIM */}
              <Card>
                <h3 className="font-bold text-primary mb-4">Perché FIM?</h3>
                <div className="space-y-3">
                  {[
                    '✓ Confronto tra 50+ compagnie',
                    '✓ Consulenza gratuita e senza impegno',
                    '✓ Risposta in 24 ore lavorative',
                    '✓ Assistenza post-vendita inclusa',
                    '✓ Gestione sinistri dedicata',
                    '✓ Nessun costo di intermediazione',
                  ].map((item) => (
                    <div key={item} className="text-gray-700 text-sm">{item}</div>
                  ))}
                </div>
              </Card>

              {/* Contact */}
              <Card className="gradient-primary text-white">
                <h3 className="font-bold mb-3">Preferisci chiamare?</h3>
                <p className="text-white/80 text-sm mb-4">Siamo disponibili dal lunedì al venerdì dalle 9:00 alle 18:00.</p>
                <a href="tel:+390212345678" className="btn-primary w-full text-center block">
                  📞 02 1234567
                </a>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
