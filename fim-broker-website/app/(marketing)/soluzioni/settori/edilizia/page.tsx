import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqAccordion from '@/components/ui/FaqAccordion'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

const SETTORE_QS = '?profilo=pmi&settore=Edilizia'

export const metadata: Metadata = {
  title: 'Assicurazioni Edilizia — CAR, Fideiussioni, Infortuni Operai',
  description:
    'Polizze per imprese edili, costruzioni e installatori: CAR (Contractors All Risk), fideiussioni cauzionali, infortuni operai integrativa INAIL, RC subappaltatori e decennale postuma. Preventivo in 24 ore.',
  alternates: { canonical: '/soluzioni/settori/edilizia' },
  openGraph: {
    images: [{ url: '/api/og?title=Edilizia&tag=Soluzioni+per+settore&sub=CAR%2C+fideiussioni%2C+infortuni+operai%2C+RC+subappaltatori.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Edilizia&tag=Soluzioni+per+settore&sub=CAR%2C+fideiussioni%2C+infortuni+operai%2C+RC+subappaltatori.'],
  },
}

const painPoints = [
  { icon: '⚠️', title: 'Cantiere bloccato', desc: 'Furto materiali, danni atmosferici, incendio: ogni giorno di fermo cantiere costa migliaia di euro in penali e ritardi sul SAL.' },
  { icon: '📋', title: 'Fideiussioni richieste', desc: 'Senza polizza fideiussoria cauzionale o di buona esecuzione non puoi partecipare a gare, firmare appalti o ottenere anticipi.' },
  { icon: '👷', title: 'Infortuni operai', desc: 'L\'INAIL copre solo una parte. Una lesione grave a un operaio può portare a richieste di danni che azzerano i margini.' },
  { icon: '🏗️', title: 'Responsabilità decennale', desc: 'Per 10 anni dopo la consegna sei responsabile dei vizi gravi dell\'opera. Una perizia su un edificio nuovo può chiederti centinaia di migliaia di euro.' },
]

const coverages = [
  {
    icon: '🏗️',
    title: 'CAR (Contractors All Risk)',
    desc: 'Copertura "all-risk" del cantiere: opere in costruzione, materiali in magazzino e in opera, attrezzature, danni a terzi e a opere preesistenti. La polizza più richiesta nei capitolati di gara.',
    price: 'su preventivo',
    highlighted: true,
  },
  {
    icon: '📜',
    title: 'Fideiussioni Cauzionali',
    desc: 'Cauzione provvisoria, definitiva, anticipo contrattuale, buona esecuzione. Rilascio rapido per gare pubbliche e private secondo D.Lgs. 36/2023 (Nuovo Codice Appalti).',
    price: 'da 0,8% del valore',
    highlighted: false,
  },
  {
    icon: '👷',
    title: 'Infortuni Operai (Integrativa INAIL)',
    desc: 'Copre il gap della rendita INAIL: capitali per invalidità permanente calcolati sulla retribuzione reale, indennità giornaliera dal primo giorno, rimborso spese mediche.',
    price: 'da 200€/operaio',
    highlighted: false,
  },
  {
    icon: '🤝',
    title: 'RC Subappaltatori e Postuma',
    desc: 'Risponde dei danni causati da subappaltatori in cantiere e copre la responsabilità per vizi e difetti emersi dopo la consegna dell\'opera (postuma 2 o 10 anni).',
    price: 'su preventivo',
    highlighted: false,
  },
  {
    icon: '🏛️',
    title: 'Decennale Postuma D.M. 154/2016',
    desc: 'Obbligatoria per immobili residenziali venduti al consumatore finale. Garantisce per 10 anni rovina, gravi difetti costruttivi e mancata stabilità dell\'edificio.',
    price: 'su preventivo',
    highlighted: false,
  },
  {
    icon: '🌍',
    title: 'RC Inquinamento Cantiere',
    desc: 'Sversamenti accidentali, contaminazione del suolo, danni ambientali. Copre i costi di bonifica e le sanzioni del D.Lgs. 152/2006 (Testo Unico Ambientale).',
    price: 'da 600€/anno',
    highlighted: false,
  },
]

const faqs = [
  {
    question: 'La polizza CAR è obbligatoria per legge?',
    answer:
      'La CAR (Contractors All Risk) non è obbligatoria per legge in senso stretto, ma è quasi sempre richiesta dai capitolati di gara — sia in appalti pubblici (in base al D.Lgs. 36/2023) che privati. Per opere finanziate o vendute al consumatore finale è inoltre prassi consolidata richiederla. Senza CAR, l\'impresa risponde con il proprio patrimonio dei danni in cantiere.',
  },
  {
    question: 'Quanto costa una polizza CAR per un cantiere medio?',
    answer:
      'Il premio dipende dal valore dell\'opera, dalla durata dei lavori, dalla tipologia (nuova costruzione, ristrutturazione, demolizione) e dalla presenza di rischi particolari (cantieri in centri storici, vicino a opere preesistenti, scavi profondi). Indicativamente, per un cantiere residenziale di media complessità, il premio CAR oscilla tra lo 0,3% e l\'1% del valore dell\'opera. Confrontiamo offerte di compagnie specializzate (Generali, AXA, HDI, ITAS) per ottimizzare il rapporto copertura/prezzo.',
  },
  {
    question: 'Posso ottenere una fideiussione anche se la mia banca dice di no?',
    answer:
      'Sì. FIM lavora con compagnie e intermediari fideiussori specializzati che valutano le pratiche con criteri diversi rispetto agli istituti bancari. Spesso accettano imprese edili di piccole e medie dimensioni che faticano a ottenere fidi bancari, basandosi su bilanci, casellario imprese e regolarità contributiva. Tempi di rilascio: tipicamente 48-72 ore per cauzioni standard.',
  },
  {
    question: 'La decennale postuma copre anche le ristrutturazioni?',
    answer:
      'La decennale postuma del D.M. 154/2016 è obbligatoria per gli immobili di nuova costruzione venduti al consumatore. Per le ristrutturazioni rilevanti esistono polizze postume specifiche (2, 5 o 10 anni) che coprono vizi e difetti dell\'opera secondo l\'art. 1669 del Codice Civile. Per interventi del Superbonus 110%, alcune coperture postume sono richieste anche dal protocollo di asseverazione.',
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

export default function EdiliziaPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Settori', href: '/soluzioni' },
          { name: 'Edilizia', href: '/soluzioni/settori/edilizia' },
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
            <span className="text-white/80">Edilizia</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🏗️ Imprese edili, costruzioni e installatori
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              In edilizia un imprevisto<br />
              può <span className="text-accent">fermare il cantiere</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              CAR, fideiussioni cauzionali, infortuni operai, RC subappaltatori, decennale postuma:
              FIM costruisce il pacchetto assicurativo per la tua impresa edile,
              ottimizzando coperture richieste dai capitolati di gara e premi.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 max-w-2xl">
              <p className="text-white/90 text-sm">
                <strong className="text-accent">Sapevi che</strong> — l&apos;art. 1669 del Codice Civile ti rende responsabile per 10 anni dei gravi vizi dell&apos;opera.
                Senza polizza decennale postuma, una perizia tecnica può svuotare il patrimonio dell&apos;impresa e dei soci.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preventivo${SETTORE_QS}`} className="btn-primary text-lg px-8 py-4">
                Preventivo per la mia impresa
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
                📞 06 96883381
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-50 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              I rischi del settore
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Cosa può andare storto in cantiere
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quattro scenari che, senza la giusta copertura, possono compromettere anni di lavoro e mettere a rischio l&apos;impresa.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {painPoints.map((p) => (
              <Card key={p.title} className="border-l-4 border-l-red-400">
                <span className="text-3xl mb-3 block">{p.icon}</span>
                <h3 className="font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverages */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Coperture chiave
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Le polizze su misura per l&apos;edilizia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sei coperture pensate per imprese edili, general contractor e installatori. Costruiamo il pacchetto in base ai tuoi cantieri attivi.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coverages.map((cov) => (
              <Card key={cov.title} className={`flex flex-col ${cov.highlighted ? 'border-2 border-accent' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cov.icon}</span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                    {cov.price}
                  </span>
                </div>
                <h3 className="font-bold text-primary mb-2">
                  {cov.title}
                  {cov.highlighted && <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded-full align-middle">Più richiesta</span>}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{cov.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * I prezzi indicati sono puramente orientativi e non costituiscono offerta contrattuale ai sensi del D.Lgs. 209/2005 (Codice delle Assicurazioni Private). Il premio effettivo dipende da valore opera, durata, tipologia di lavori e altri parametri tecnici. FIM Insurance Broker opera come intermediario assicurativo indipendente iscritto al RUI IVASS.
          </p>
        </div>
      </section>

      {/* Case study */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Caso reale
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
              Furto in cantiere: 80.000€ di danni, zero impatto sull&apos;impresa
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Un&apos;impresa edile cliente FIM con sede in provincia di Latina aveva un cantiere residenziale aperto.
                  Una notte di febbraio, durante un week-end lungo, sono stati rubati ponteggi, una piattaforma elevatrice
                  e materiali in opera per circa <strong className="text-primary">80.000€</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Senza CAR, l&apos;impresa avrebbe dovuto rifornire tutto a proprie spese, con inevitabile ritardo sul SAL e
                  penali contrattuali col committente.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Grazie alla polizza CAR (Contractors All Risk) attiva sul cantiere:
                </p>
                <ul className="text-gray-700 leading-relaxed">
                  <li>denuncia di sinistro inviata da FIM entro 24 ore;</li>
                  <li>perito incaricato dalla compagnia in 48 ore;</li>
                  <li>liquidazione completa dei danni in 21 giorni;</li>
                  <li>cantiere ripartito senza penali, margini protetti.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Il numero chiave
                </p>
                <p className="text-5xl font-black text-accent mb-2">100%</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  dei danni indennizzati al netto della franchigia contrattuale (2.500€).
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Tempo medio gestione
                </p>
                <p className="text-3xl font-black text-accent mb-1">21 giorni</p>
                <p className="text-white/70 text-xs">dalla denuncia alla liquidazione.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-3">Domande frequenti — Edilizia</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Devi presentare un&apos;offerta o aprire un cantiere?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Analisi gratuita dei capitolati di gara e delle polizze richieste. Ti diciamo cosa serve davvero e a quanto.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/preventivo${SETTORE_QS}`} className="btn-primary text-lg px-8 py-4">
              Richiedi preventivo Edilizia
            </Link>
            <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
              📞 06 96883381
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
