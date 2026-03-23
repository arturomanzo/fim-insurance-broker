import type { Metadata } from 'next'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'FIM Insurance Broker: 20 anni di esperienza al servizio di privati e aziende. Broker indipendente iscritto RUI IVASS, partner delle principali compagnie assicurative.',
}

const partners = [
  { name: 'Generali', logo: '/images/partners/generali.svg' },
  { name: 'AXA', logo: '/images/partners/axa.svg' },
  { name: 'Allianz', logo: '/images/partners/allianz.svg' },
  { name: 'UnipolSai', logo: '/images/partners/unipolsai.svg' },
  { name: 'Zurich', logo: '/images/partners/zurich.svg' },
  { name: 'Groupama', logo: '/images/partners/groupama.svg' },
  { name: 'HDI', logo: '/images/partners/hdi.svg' },
  { name: 'Cattolica', logo: '/images/partners/cattolica.svg' },
]

const certifications = [
  {
    icon: '🏛️',
    title: 'Iscrizione RUI IVASS',
    desc: 'Regolarmente iscritti nel Registro Unico degli Intermediari Assicurativi (RUI) tenuto dall\'IVASS.',
    badge: 'Sezione B',
  },
  {
    icon: '🔒',
    title: 'Garanzia RC Professionale',
    desc: 'Copertura assicurativa per responsabilità civile professionale come previsto dalla normativa vigente.',
    badge: 'D.Lgs 209/2005',
  },
  {
    icon: '🛡️',
    title: 'Conformità GDPR',
    desc: 'Trattamento dei dati personali nel pieno rispetto del Regolamento UE 2016/679 e del Codice Privacy.',
    badge: 'Reg. UE 2016/679',
  },
  {
    icon: '📋',
    title: 'Codice di Condotta IDD',
    desc: 'Distribuzione assicurativa conforme alla Direttiva IDD recepita in Italia con il D.Lgs. 68/2018.',
    badge: 'D.Lgs 68/2018',
  },
]

const milestones = [
  { year: '2004', event: 'Fondazione di FIM Insurance Broker a Cisterna di Latina' },
  { year: '2008', event: 'Ampliamento del team e apertura a nuovi segmenti di mercato' },
  { year: '2012', event: 'Superata quota 1.000 clienti attivi' },
  { year: '2016', event: 'Lancio del portale online per preventivi digitali' },
  { year: '2019', event: 'Espansione delle partnership con le principali compagnie assicurative' },
  { year: '2023', event: 'Integrazione assistente AI FIMA per supporto clienti' },
  { year: '2024', event: 'Crescita continua del portafoglio clienti soddisfatti' },
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
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] order-last lg:order-first">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&fit=crop&auto=format"
                alt="Consulenza assicurativa professionale FIM"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
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
                le offerte delle principali compagnie assicurative per trovare la soluzione perfetta per te.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Come broker indipendente, siamo liberi da vincoli con le compagnie: il nostro unico
                obiettivo è la tua soddisfazione e la tua protezione.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '20+', label: 'Anni' },
                  { value: '✓', label: 'Clienti fidelizzati' },
                  { value: '✓', label: 'Multi-compagnia' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-black text-primary">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mt-6">
                {[
                  { icon: '🎯', title: 'Indipendenza', desc: 'Nessun legame con le compagnie. Lavoriamo solo per te.' },
                  { icon: '💡', title: 'Competenza', desc: 'Team di esperti certificati con esperienza pluriennale.' },
                  { icon: '🤝', title: 'Fiducia', desc: 'Relazioni durature basate su onestà e trasparenza.' },
                  { icon: '🔧', title: 'Supporto continuo', desc: 'Presenti in ogni momento, dalla polizza alla liquidazione.' },
                ].map((val) => (
                  <Card key={val.title} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{val.icon}</span>
                    <div>
                      <h3 className="font-bold text-primary mb-0.5">{val.title}</h3>
                      <p className="text-gray-600 text-sm">{val.desc}</p>
                    </div>
                  </Card>
                ))}
              </div>
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

      {/* Certifications & Compliance */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Autorizzazioni & Conformità
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Professionisti certificati e regolamentati
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Operiamo nel pieno rispetto della normativa italiana ed europea in materia di intermediazione assicurativa.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.title} className="text-center">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                  {cert.badge}
                </span>
                <h3 className="font-bold text-primary mb-2">{cert.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{cert.desc}</p>
              </Card>
            ))}
          </div>
          {/* IVASS verification note */}
          <div className="mt-8 p-5 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-3xl mx-auto">
            <span className="text-3xl flex-shrink-0">ℹ️</span>
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-primary">Verifica la nostra iscrizione:</strong> Puoi controllare i dati di FIM Insurance Broker S.a.s. sul sito ufficiale IVASS all&apos;indirizzo{' '}
                <a
                  href="https://www.ivass.it/consumatori/rui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2 hover:text-primary transition-colors"
                >
                  ivass.it/consumatori/rui
                </a>
                {' '}— P.IVA 02637640596.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Le Nostre Compagnie Partner
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Accesso alle migliori compagnie del mercato
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Come broker indipendente, siamo convenzionati con le principali compagnie assicurative italiane e internazionali. Confrontiamo le offerte per trovare la soluzione più adatta a te.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-2xl px-6 py-8 flex items-center justify-center border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <span className="text-lg font-black text-primary/70 tracking-tight">{partner.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            + molte altre compagnie a seconda del prodotto assicurativo richiesto
          </p>
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
