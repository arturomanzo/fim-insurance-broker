import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import CollaboraForm from '@/components/forms/CollaboraForm'

export const metadata: Metadata = {
  title: 'Collabora con Noi',
  description: 'Entra a far parte del team FIM Insurance Broker. Cerchiamo subagenti, broker, segnalatori e giovani talenti da inserire in un contesto professionale e dinamico.',
  alternates: { canonical: '/collabora-con-noi' },
  openGraph: {
    images: [{ url: '/api/og?title=Collabora+con+Noi&tag=FIM+Insurance+Broker&sub=Unisciti+al+nostro+team+di+professionisti+indipendenti.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Collabora+con+Noi&tag=FIM+Insurance+Broker&sub=Unisciti+al+nostro+team+di+professionisti+indipendenti.'],
  },
}

const vantaggi = [
  {
    icon: '🎯',
    title: 'Indipendenza',
    desc: 'Lavori con un broker non legato a nessuna compagnia. Solo l\'interesse del cliente guida le scelte.',
  },
  {
    icon: '🏢',
    title: '30+ compagnie partner',
    desc: 'Accesso diretto alle principali compagnie del mercato: Generali, AXA, Allianz, UnipolSai, Zurich e molte altre.',
  },
  {
    icon: '📚',
    title: 'Formazione continua',
    desc: 'Supporto formativo, aggiornamento IVASS obbligatorio e affiancamento per crescere professionalmente.',
  },
  {
    icon: '💻',
    title: 'Strumenti digitali',
    desc: 'CRM, preventivatori multi-compagnia, assistente AI e back-office dedicato per lavorare in modo efficiente.',
  },
  {
    icon: '🤝',
    title: 'Ambiente collaborativo',
    desc: 'Un team che condivide conoscenze e supporto, non competizione interna. Crescere insieme è il nostro metodo.',
  },
  {
    icon: '📈',
    title: 'Portafoglio consolidato',
    desc: 'Oltre 20 anni di attività e 1.200+ polizze attive ti danno una base solida su cui costruire il tuo lavoro.',
  },
]

const profili = [
  {
    icon: '🧑‍💼',
    title: 'Subagenti / Collaboratori',
    subtitle: 'RUI Sez. E',
    desc: 'Per chi ha già esperienza nel settore e vuole operare con mandato di un broker indipendente, mantenendo autonomia e flessibilità.',
    requisiti: [
      'Iscrizione RUI Sez. E',
      'Partita IVA',
      'Esperienza nel settore assicurativo',
    ],
  },
  {
    icon: '🎓',
    title: 'Broker',
    subtitle: 'RUI Sez. B',
    desc: 'Accordi di collaborazione tra broker ai sensi dell\'art. 42 del Regolamento IVASS, per ampliare il portafoglio prodotti dei clienti.',
    requisiti: [
      'Iscrizione RUI Sez. B',
      'Struttura autonoma',
      'Interesse a collaborazioni strutturate',
    ],
  },
  {
    icon: '🏛️',
    title: 'Agenti',
    subtitle: 'RUI Sez. A',
    desc: 'Collaborazioni su prodotti specifici non disponibili nel proprio mandato, nel rispetto della normativa sulle collaborazioni orizzontali.',
    requisiti: [
      'Iscrizione RUI Sez. A',
      'Mandato con compagnia',
      'Prodotti complementari da offrire',
    ],
  },
  {
    icon: '🔗',
    title: 'Segnalatori',
    subtitle: 'Introduttori d\'affari',
    desc: 'Per commercialisti, consulenti, amministratori di condominio e altri professionisti che vogliono segnalare clienti con accordo trasparente.',
    requisiti: [
      'Professione di riferimento',
      'Rete di contatti qualificati',
      'Accordo di segnalazione formalizzato',
    ],
  },
  {
    icon: '🌱',
    title: 'Giovani talenti',
    subtitle: 'Percorsi di inserimento',
    desc: 'Per neolaureati e neodiplomati interessati al mondo assicurativo. Formazione dedicata, affiancamento e percorso verso l\'iscrizione RUI.',
    requisiti: [
      'Diploma o laurea',
      'Buone doti relazionali',
      'Voglia di imparare',
    ],
  },
]

const steps = [
  {
    number: '01',
    title: 'Candidatura',
    desc: 'Compili il form qui sotto raccontandoci chi sei, la tua esperienza e le tue motivazioni.',
  },
  {
    number: '02',
    title: 'Colloquio conoscitivo',
    desc: 'Se il profilo è in linea, ti contattiamo entro 7 giorni per un incontro (in sede o in videocall).',
  },
  {
    number: '03',
    title: 'Onboarding',
    desc: 'Formazione iniziale, accesso agli strumenti, presentazione del team e affiancamento sui primi casi.',
  },
  {
    number: '04',
    title: 'Operatività',
    desc: 'Inizi a lavorare con il supporto continuo del back-office e del team FIM al tuo fianco.',
  },
]

const offriamo = [
  { icon: '💰', text: 'Provvigioni competitive e trasparenti' },
  { icon: '📋', text: 'Back-office dedicato per polizze e sinistri' },
  { icon: '🛠️', text: 'CRM e strumenti digitali professionali' },
  { icon: '🎓', text: 'Formazione IVASS e aggiornamento obbligatorio' },
  { icon: '📣', text: 'Supporto marketing e lead generation' },
  { icon: '🏆', text: 'Brand riconosciuto con 20+ anni di attività' },
]

export default function CollaboraConNoiPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 border border-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
              Collabora con Noi
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Entra a far parte del <span className="text-accent">mondo FIM</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Siamo un broker indipendente con oltre 20 anni di esperienza, 30+ compagnie partner
              e un team che mette le persone al centro. Se cerchi un contesto professionale serio,
              dinamico e orientato alla crescita, parliamone.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#candidatura" className="btn-primary px-6 py-3">
                Invia la tua candidatura
              </a>
              <a href="#profili" className="btn-outline-white px-6 py-3">
                Profili ricercati
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Perché collaborare */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Perché FIM
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Perché collaborare con noi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Un broker indipendente, strumenti moderni e un team che crede nella qualità del lavoro
              prima che nei numeri.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vantaggi.map((v) => (
              <Card key={v.title} hover className="h-full">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-black text-primary text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Profili ricercati */}
      <section id="profili" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Profili ricercati
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Chi stiamo cercando
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Valutiamo diverse tipologie di collaborazione, sia per chi è già nel settore sia per
              chi vuole entrarci con il giusto supporto.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profili.map((p) => (
              <Card key={p.title} hover className="h-full flex flex-col">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="font-black text-primary text-xl mb-1">{p.title}</h3>
                <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide w-fit">
                  {p.subtitle}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">
                    Requisiti
                  </p>
                  <ul className="space-y-1.5">
                    {p.requisiti.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Il percorso
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Come funziona la collaborazione
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Un processo semplice e trasparente, dal primo contatto all&apos;operatività.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={s.number} className="relative">
                <Card className="h-full">
                  <div className="text-accent font-black text-4xl mb-3">{s.number}</div>
                  <h3 className="font-black text-primary text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </Card>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-accent/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosa offriamo */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Cosa offriamo
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
                Un pacchetto completo per la tua crescita professionale
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Lavorare con FIM significa avere al tuo fianco una struttura che ti supporta
                nella gestione operativa, nella formazione e nello sviluppo commerciale — perché tu
                possa concentrarti sulla relazione con il cliente.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Non siamo una rete di vendita: siamo un gruppo di professionisti che collabora per
                offrire il miglior servizio assicurativo possibile.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offriamo.map((o) => (
                <Card key={o.text} className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{o.icon}</span>
                  <p className="text-gray-700 text-sm font-medium">{o.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form candidatura */}
      <section id="candidatura" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Candidatura
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
                Invia la tua candidatura
              </h2>
              <p className="text-gray-600 text-lg">
                Raccontaci chi sei e cosa cerchi. Valutiamo ogni candidatura e rispondiamo entro
                7 giorni lavorativi.
              </p>
            </div>
            <Card padding="lg">
              <CollaboraForm />
            </Card>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Preferisci parlarci direttamente?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Se preferisci un primo contatto telefonico o vuoi fissare un colloquio informale,
            siamo a tua disposizione.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+390696883381" className="btn-primary text-lg px-8 py-4">
              📞 06 96883381
            </a>
            <Link href="/prenota-consulenza" className="btn-outline-white text-lg px-8 py-4">
              Prenota un colloquio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
