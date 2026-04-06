import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqAccordion from '@/components/ui/FaqAccordion'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Assicurazione Catastrofi Naturali — Alluvioni, Terremoti, Grandinate',
  description:
    "Polizze per catastrofi naturali: alluvioni, terremoti, grandinate, frane. Dal 2025 obbligatoria per le imprese italiane. Preventivo gratuito da FIM Insurance Broker.",
  openGraph: {
    images: [{ url: '/api/og?title=Catastrofi+Naturali&tag=Soluzioni&sub=Alluvioni%2C+terremoti%2C+grandinate%2C+frane.+Obbligatoria+per+le+imprese+dal+2025.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Catastrofi+Naturali&tag=Soluzioni&sub=Alluvioni%2C+terremoti%2C+grandinate%2C+frane.+Obbligatoria+per+le+imprese+dal+2025.'],
  },
}

const risks = [
  { icon: '🌊', name: 'Alluvione ed esondazione', desc: 'Il rischio più diffuso in Italia' },
  { icon: '🏔️', name: 'Terremoto e sisma', desc: '70% del territorio italiano ad alto rischio sismico' },
  { icon: '⛈️', name: 'Grandine', desc: 'Danni a tetti, veicoli, pannelli solari e colture' },
  { icon: '🪨', name: 'Frana e smottamento', desc: 'Sempre più frequente con i cambiamenti climatici' },
  { icon: '🌪️', name: 'Vento forte e tromba d\'aria', desc: 'Danni strutturali a tetti e facciate' },
  { icon: '❄️', name: 'Nevicate eccezionali', desc: 'Danni per peso neve su strutture e coperture' },
]

const products = [
  {
    icon: '🏠',
    title: 'Estensione Catastrofi su Polizza Casa',
    desc: 'Aggiungi la copertura catastrofi naturali alla tua polizza casa esistente o stipula una nuova polizza multirischio che includa alluvione, terremoto e grandine.',
    price: 'da 80€/anno',
    audience: 'Privati e famiglie',
  },
  {
    icon: '🏭',
    title: 'Polizza Catastrofi per Imprese',
    desc: 'Dal 1° gennaio 2025 le imprese italiane con immobili e macchinari iscritti a bilancio hanno obbligo di legge di assicurarsi contro i rischi catastrofali. FIM ti aiuta a essere in regola.',
    price: 'su preventivo',
    audience: 'PMI e aziende — OBBLIGO 2025',
    urgent: true,
  },
  {
    icon: '🌾',
    title: 'Polizze Agricole per Grandine e Gelo',
    desc: 'Coperture specifiche per il settore agricolo: grandine su colture, gelo su frutteti, alluvione su terreni agricoli. Possibilità di polizze agevolate con contributo AGEA.',
    price: 'su preventivo',
    audience: 'Agricoltori e agriturismo',
  },
  {
    icon: '🚗',
    title: 'Grandine sul Veicolo',
    desc: 'Molte polizze RC auto non coprono la grandine. Verifica la tua copertura attuale e aggiungi la protezione eventi atmosferici al tuo veicolo.',
    price: 'da 30€/anno',
    audience: 'Privati e flotte',
  },
]

const faqs = [
  {
    question: "La polizza casa standard copre già le alluvioni?",
    answer:
      "Generalmente no. Le polizze casa classiche coprono incendio e furto, ma gli eventi atmosferici (alluvione, esondazione, frana) sono spesso esclusi o richiedono un'estensione specifica. Molti italiani lo scoprono solo al momento del sinistro, quando è troppo tardi. Verifica la tua polizza attuale: FIM può fare un'analisi gratuita.",
  },
  {
    question: "Dal 2025 le aziende devono obbligatoriamente assicurarsi per le catastrofi naturali?",
    answer:
      "Sì. La Legge di Bilancio 2024 (L. 213/2023, art. 1 comma 101-111) ha introdotto l'obbligo per tutte le imprese con sede in Italia, iscritte al Registro delle Imprese, di stipulare entro il 31 marzo 2025 una polizza che copra terremoto, alluvione, frana, inondazione ed esondazione sui propri immobili, terreni, impianti e macchinari iscritti in bilancio. Le aziende senza copertura rischiano sanzioni e potrebbero essere escluse da aiuti pubblici post-catastrofe. Contattaci subito se non sei ancora in regola.",
  },
  {
    question: "Cosa si intende esattamente per 'catastrofe naturale' assicurabile?",
    answer:
      "Le coperture catastrofali tipicamente includono: terremoto/sisma, alluvione ed esondazione (tracimazione di fiumi e corsi d'acqua), frana e smottamento, maremoto, eruzione vulcanica, e sinkholes (voragini). La grandine viene solitamente trattata come 'evento atmosferico' e spesso ha una copertura separata. Ogni polizza ha la propria definizione: ti aiutiamo a capire esattamente cosa copre la tua.",
  },
  {
    question: "Come viene calcolato il risarcimento dopo un'alluvione?",
    answer:
      "Il risarcimento dipende da: (1) il valore assicurato (deve corrispondere al valore reale di ricostruzione — occhio alla sottoassicurazione), (2) la franchigia (una parte del danno a carico dell'assicurato, solitamente 2-10%), (3) il massimale della polizza. In caso di sinistro, la compagnia invia un perito per valutare i danni. FIM segue i propri clienti durante tutto il processo liquidativo.",
  },
  {
    question: "Abito in una zona a rischio alluvione: posso comunque assicurarmi?",
    answer:
      "Sì, anche se alcune zone ad alto rischio possono avere premi più elevati o alcune compagnie possono non assicurarle. La buona notizia è che con la nuova legge sulle catastrofi naturali per le imprese, il governo sta lavorando a un sistema di pool assicurativo che garantisca la copertura anche nelle zone più esposte. FIM conosce le compagnie disponibili ad assicurare ogni tipo di zona.",
  },
]


function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export default function CatastrofiNaturaliPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Catastrofi Naturali', href: '/soluzioni/catastrofi-naturali' },
        ]}
      />
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
        </div>
        <div className="container-custom relative">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/soluzioni" className="hover:text-white transition-colors">Soluzioni</Link>
            <span>/</span>
            <span className="text-white/80">Catastrofi Naturali</span>
          </div>
          <div className="max-w-3xl">
            {/* Urgent alert */}
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/40 rounded-full px-4 py-1.5 text-sm font-semibold mb-5 text-red-200">
              ⚠️ Obbligo di legge per le imprese dal 2025
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Alluvioni, terremoti,<br />
              grandinate:{' '}
              <span className="text-accent">proteggi</span>{' '}
              casa e azienda
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              Il 2023 ha dimostrato che in Italia può succedere ovunque: dall&apos;Emilia-Romagna alla Toscana, dal Lazio alla Sicilia.
              Le polizze standard spesso non coprono le catastrofi naturali.
              Verifica la tua copertura attuale e colma il gap.
            </p>
            {/* Stat box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { value: '94%', label: 'dei comuni italiani ad alto rischio idrogeologico' },
                { value: '80%', label: 'delle case italiane non ha copertura catastrofale' },
                { value: '2025', label: 'anno dell\'obbligo per le imprese italiane' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-accent mb-1">{stat.value}</div>
                  <div className="text-xs text-white/70 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
                Richiedi Preventivo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/prenota-consulenza" className="btn-outline-white text-lg px-8 py-4">
                Verifica la mia copertura
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency banner for companies */}
      <section className="bg-red-50 border-b border-red-200 py-6">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <p className="font-bold text-red-800">Imprenditori: obbligo di legge entro il 31 marzo 2025</p>
                <p className="text-red-700 text-sm">La L. 213/2023 obbliga tutte le imprese italiane ad assicurarsi per catastrofi naturali. Chi non è in regola rischia di essere escluso dagli aiuti pubblici post-catastrofe.</p>
              </div>
            </div>
            <Link href="/preventivo" className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap">
              Metti in regola la tua azienda
            </Link>
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              I rischi in Italia
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Rischi catastrofali che possiamo coprire
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {risks.map((r) => (
              <div key={r.name} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-4xl block mb-3">{r.icon}</span>
                <p className="font-semibold text-primary text-sm mb-1">{r.name}</p>
                <p className="text-gray-500 text-xs">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Le nostre soluzioni
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Coperture per ogni esigenza
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {products.map((p) => (
              <Card key={p.title} className={`flex flex-col relative ${p.urgent ? 'border-2 border-red-200' : ''}`}>
                {p.urgent && (
                  <div className="absolute -top-3 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    OBBLIGO 2025
                  </div>
                )}
                <div className="flex items-start justify-between mb-4 mt-2">
                  <span className="text-3xl">{p.icon}</span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full block">
                      {p.price}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Per: </span>
                  <span className={`text-xs font-bold ${p.urgent ? 'text-red-600' : 'text-primary'}`}>{p.audience}</span>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * I prezzi indicati sono puramente orientativi e non costituiscono offerta contrattuale ai sensi del D.Lgs. 209/2005 (Codice delle Assicurazioni Private). Il premio effettivo è determinato dalla compagnia assicuratrice in base alla zona geografica, al tipo di immobile, ai valori assicurati e al rischio specifico. FIM Insurance Broker opera come intermediario assicurativo indipendente iscritto al RUI IVASS.
          </p>
        </div>
      </section>

      {/* Why act now */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-3">Perché agire adesso</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📈',
                title: 'I sinistri climatici sono in aumento',
                desc: "In Italia, gli eventi meteo estremi sono aumentati del +85% negli ultimi 20 anni. Non è più una questione di 'se' ma di 'quando'.",
              },
              {
                icon: '💸',
                title: 'Il danno medio è elevato',
                desc: "Un'alluvione in casa causa danni medi tra 30.000€ e 80.000€. Un terremoto può distruggere il 100% del valore dell'immobile. La polizza costa poche centinaia di euro.",
              },
              {
                icon: '🏛️',
                title: 'Gli aiuti pubblici non bastano',
                desc: "I risarcimenti dello Stato dopo le catastrofi sono spesso parziali, tardivi e subordinati a dichiarazioni di stato di emergenza. Non fare affidamento solo su di essi.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-3">Domande frequenti</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Sei coperto per le catastrofi naturali?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Analisi gratuita della tua copertura attuale. Preventivo personalizzato entro 24 ore.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
              Richiedi Preventivo
            </Link>
            <Link href="/prenota-consulenza" className="btn-outline-white text-lg px-8 py-4">
              Prenota consulenza gratuita
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
