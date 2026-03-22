import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import PrenotazioneForm from '@/components/forms/PrenotazioneForm'

export const metadata: Metadata = {
  title: 'Prenota una Consulenza Gratuita | FIM Insurance Broker',
  description:
    'Prenota un appuntamento con un consulente FIM. Consulenza assicurativa gratuita e senza impegno, in ufficio o in videochiamata. Risposta entro poche ore.',
}

const VANTAGGI = [
  {
    icon: '🎯',
    title: 'Analisi personalizzata',
    desc: 'Studiamo la tua situazione e ti proponiamo solo le coperture di cui hai davvero bisogno.',
  },
  {
    icon: '💡',
    title: 'Confronto tra compagnie',
    desc: 'Accediamo alle migliori compagnie del mercato per trovare il rapporto qualità-prezzo ottimale.',
  },
  {
    icon: '🤝',
    title: 'Nessun impegno',
    desc: 'La consulenza è completamente gratuita. Decidi tu se e quando procedere.',
  },
  {
    icon: '📍',
    title: 'In ufficio o online',
    desc: 'Vieni da noi a Cisterna di Latina oppure organizziamo una videochiamata.',
  },
]

export default function PrenotaConsulenzaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-20 text-white">
        <div className="container-custom">
          <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Prenota Consulenza</span>
          </div>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Disponibile Lun – Ven, 9:30 – 13:00 / 15:30 – 18:30
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Consulenza gratuita<br />senza impegno
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Prenota un appuntamento con un nostro consulente esperto.
              Analizziamo le tue esigenze e ti proponiamo la soluzione migliore.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-2xl font-black text-primary mb-1">Scegli data e orario</h2>
                <p className="text-gray-500 text-sm mb-7">
                  Ti contatteremo entro poche ore per confermare l&apos;appuntamento.
                </p>
                <PrenotazioneForm />
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Consulting image */}
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop&auto=format"
                  alt="Consulenza assicurativa personalizzata FIM"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              {/* Vantaggi */}
              <Card>
                <h3 className="font-black text-primary text-lg mb-5">Perché scegliere FIM</h3>
                <div className="space-y-4">
                  {VANTAGGI.map((v) => (
                    <div key={v.title} className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{v.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{v.title}</p>
                        <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Contatti diretti */}
              <Card className="bg-primary text-white" padding="lg">
                <h3 className="font-black text-lg mb-4">Preferisci chiamare?</h3>
                <p className="text-white/70 text-sm mb-5">
                  Il nostro team è disponibile durante gli orari di apertura.
                </p>
                <a
                  href="tel:+390696883381"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3 mb-3"
                >
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold text-sm">06 96883381</span>
                </a>
                <a
                  href="mailto:info@fimbroker.it"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3"
                >
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold text-sm">info@fimbroker.it</span>
                </a>
              </Card>

              {/* Orari */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-primary text-sm mb-3">Orari di apertura</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunedì – Venerdì</span>
                    <span className="font-medium text-gray-800">9:30 – 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600" />
                    <span className="font-medium text-gray-800">15:30 – 18:30</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="text-gray-500">Sabato – Domenica</span>
                    <span className="text-gray-400">Chiuso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
