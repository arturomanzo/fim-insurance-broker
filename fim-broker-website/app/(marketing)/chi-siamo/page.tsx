import type { Metadata } from 'next'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'FIM Insurance Broker: 20 anni di esperienza al servizio di privati e aziende. Scopri la nostra storia, i nostri valori e il nostro team.',
}

const team = [
  {
    name: 'Francesco Mancini',
    role: 'Fondatore & CEO',
    bio: 'Con oltre 25 anni nel settore assicurativo, Francesco ha fondato FIM con la visione di portare trasparenza e professionalità nel brokeraggio.',
    initials: 'FM',
  },
  {
    name: 'Isabella Romano',
    role: 'Responsabile Polizze Vita',
    bio: 'Specializzata in pianificazione previdenziale e protezione familiare, Isabella guida il team vita da 12 anni.',
    initials: 'IR',
  },
  {
    name: 'Marco Tessari',
    role: 'Responsabile Polizze Aziendali',
    bio: 'Esperto di risk management aziendale, Marco gestisce i portafogli corporate e la consulenza per le imprese.',
    initials: 'MT',
  },
  {
    name: 'Giulia Conti',
    role: 'Claims Manager',
    bio: 'Giulia guida il team sinistri garantendo la liquidazione rapida e la tutela dei nostri clienti in ogni fase.',
    initials: 'GC',
  },
]

const milestones = [
  { year: '2004', event: 'Fondazione di FIM Insurance Broker a Milano' },
  { year: '2008', event: 'Apertura ufficio di Roma e ampliamento team' },
  { year: '2012', event: 'Superata quota 1.000 clienti attivi' },
  { year: '2016', event: 'Lancio del portale online per preventivi digitali' },
  { year: '2019', event: 'Partnership con 50+ compagnie assicurative' },
  { year: '2023', event: 'Integrazione assistente AI FIMA per supporto clienti' },
  { year: '2024', event: 'Superata quota 5.000 clienti soddisfatti' },
]

export default function ChiSiamoPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 border border-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
              Chi Siamo
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Il tuo partner assicurativo <span className="text-accent">dal 2004</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              FIM Insurance Broker nasce dalla passione per la protezione delle persone e delle imprese.
              Siamo un broker indipendente: non rappresentiamo nessuna compagnia, ma solo i tuoi interessi.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                La nostra missione
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
                Protezione intelligente, persone al centro
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In FIM crediamo che ogni persona e ogni azienda meriti la copertura assicurativa più adatta
                alle proprie esigenze, al prezzo più competitivo del mercato. Per questo confrontiamo
                le offerte di oltre 50 compagnie per trovare la soluzione perfetta per te.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Come broker indipendente, siamo liberi da vincoli con le compagnie: il nostro unico
                obiettivo è la tua soddisfazione e la tua protezione.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '20+', label: 'Anni' },
                  { value: '5K+', label: 'Clienti' },
                  { value: '50+', label: 'Partner' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-black text-primary">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: '🎯',
                  title: 'Indipendenza',
                  desc: 'Nessun legame con le compagnie. Lavoriamo solo per te.',
                },
                {
                  icon: '💡',
                  title: 'Competenza',
                  desc: 'Team di esperti certificati con esperienza pluriennale.',
                },
                {
                  icon: '🤝',
                  title: 'Fiducia',
                  desc: 'Relazioni durature basate su onestà e trasparenza.',
                },
                {
                  icon: '🔧',
                  title: 'Supporto continuo',
                  desc: 'Presenti in ogni momento, dalla polizza alla liquidazione.',
                },
              ].map((val) => (
                <Card key={val.title} className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{val.icon}</span>
                  <div>
                    <h3 className="font-bold text-primary mb-1">{val.title}</h3>
                    <p className="text-gray-600 text-sm">{val.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">La nostra storia</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20" />
              <div className="space-y-6">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-6 relative">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-accent font-black text-xs z-10">
                      {m.year}
                    </div>
                    <div className="flex-1 pt-3">
                      <p className="text-gray-700">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Il Team
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Professionisti al tuo servizio
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-black text-xl">{member.initials}</span>
                </div>
                <h3 className="font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-black text-white mb-4">Inizia con una consulenza gratuita</h2>
          <p className="text-white/80 mb-8">Parla con il nostro team e scopri come possiamo proteggerti.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
              Richiedi Preventivo
            </Link>
            <Link href="/contatti" className="btn-outline-white text-lg px-8 py-4">
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
