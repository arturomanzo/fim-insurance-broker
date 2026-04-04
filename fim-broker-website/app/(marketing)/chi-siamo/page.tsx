import type { Metadata } from 'next'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'FIM Insurance Broker: 20 anni di esperienza al servizio di privati e aziende. Broker indipendente iscritto RUI IVASS, partner delle principali compagnie assicurative.',
  openGraph: {
    images: [{ url: '/api/og?title=Chi+Siamo&tag=FIM+Insurance+Broker&sub=20+anni+di+esperienza.+Broker+indipendente+iscritto+RUI+IVASS.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Chi+Siamo&tag=FIM+Insurance+Broker&sub=20+anni+di+esperienza.+Broker+indipendente+iscritto+RUI+IVASS.'],
  },
}

const team = [
  {
    name: 'Arturo Manzo',
    role: 'CEO & Fondatore',
    bio: 'Fondatore di FIM nel 2004, Arturo guida l\'azienda con oltre 20 anni di esperienza nel brokeraggio assicurativo. Specializzato in polizze aziendali complesse e risk management per PMI.',
    specializations: ['Polizze Aziendali', 'Risk Management', 'D&O'],
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop&auto=format',
  },
  {
    name: 'Giulia Romano',
    role: 'Consulente Senior — Privati',
    bio: 'Con 12 anni nel settore, Giulia è specializzata nella protezione di famiglie e privati. Dalla casa all\'auto, alla salute: costruisce coperture su misura con attenzione ai dettagli.',
    specializations: ['Auto & Casa', 'Vita & Salute', 'Polizze Viaggio'],
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&fit=crop&auto=format',
  },
  {
    name: 'Marco De Santis',
    role: 'Responsabile Sinistri',
    bio: 'Marco segue i clienti in ogni fase del sinistro: dalla denuncia alla liquidazione. La sua esperienza decennale garantisce gestione rapida e risultati concreti nel momento del bisogno.',
    specializations: ['Gestione Sinistri', 'RC Professionale', 'Tutela Legale'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&auto=format',
  },
  {
    name: 'Sara Conti',
    role: 'Consulente — Aziende & PMI',
    bio: 'Specializzata in soluzioni assicurative per piccole e medie imprese, Sara aiuta gli imprenditori a proteggere il patrimonio aziendale con polizze cyber, RC e welfare per i dipendenti.',
    specializations: ['Polizze Cyber', 'Flotte Aziendali', 'Welfare'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fit=crop&auto=format',
  },
]

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
                  { value: '20+', label: 'Anni di attività' },
                  { value: '1.200+', label: 'Polizze attive' },
                  { value: '30+', label: 'Compagnie partner' },
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

      {/* Team */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Il nostro team
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Persone reali, competenze reali
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Quando chiami FIM, parli con una persona che conosce il tuo nome e la tua situazione.
              Non un call center, non un algoritmo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group">
                {/* Photo */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 shadow-md">
                  <Image
                    src={member.photo}
                    alt={`${member.name} — ${member.role}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="font-black text-lg leading-tight">{member.name}</div>
                    <div className="text-accent text-sm font-semibold">{member.role}</div>
                  </div>
                </div>
                {/* Bio */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                {/* Specializations */}
                <div className="flex flex-wrap gap-2">
                  {member.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* CTA sotto il team */}
          <div className="mt-14 bg-white rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="text-xl font-black text-primary mb-2">Vuoi parlare direttamente con noi?</h3>
              <p className="text-gray-600">Prenota una consulenza gratuita — risponderemo entro 24 ore.</p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link href="/prenota-consulenza" className="btn-primary px-6 py-3">
                Prenota consulenza
              </Link>
              <a
                href="https://wa.me/393473312330?text=Ciao,%20vorrei%20parlare%20con%20un%20consulente"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20c05c] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
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
