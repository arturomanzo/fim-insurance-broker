import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { ediliziaFaq } from '@/lib/faq/edilizia'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { OG_BASE } from '@/lib/seo'
import { notaPremio } from '@/lib/prezzi'

const SETTORE_QS = '?profilo=pmi&settore=Edilizia'

export const metadata: Metadata = {
  title: 'Assicurazioni Edilizia — CAR, Fideiussioni, Infortuni Operai',
  description:
    'Polizze per imprese edili, costruzioni e installatori: CAR (Contractors All Risk), fideiussioni cauzionali, infortuni operai integrativa INAIL, RC subappaltatori e decennale postuma. Preventivo in 24 ore.',
  alternates: { canonical: '/soluzioni/settori/edilizia' },
  openGraph: {
    ...OG_BASE,
    url: '/soluzioni/settori/edilizia',
    images: [{ url: '/api/og?title=Edilizia&tag=Soluzioni+per+settore&sub=CAR%2C+fideiussioni%2C+infortuni+operai%2C+RC+subappaltatori.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Edilizia&tag=Soluzioni+per+settore&sub=CAR%2C+fideiussioni%2C+infortuni+operai%2C+RC+subappaltatori.'],
  },
}

const painPoints = [
  { icon: '⚠️', title: 'Cantiere bloccato', desc: 'Furto materiali, danni atmosferici, incendio: ogni giorno di fermo cantiere costa migliaia di euro in penali e ritardi sul SAL.' },
  { icon: '📋', title: 'Fideiussioni richieste', desc: 'Se il bando chiede la garanzia provvisoria o il contratto la definitiva, senza fideiussione non entri in gara, non firmi e non incassi l\'anticipazione.' },
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
    desc: 'Garanzia provvisoria e definitiva, anticipazione, buona esecuzione: per le gare pubbliche secondo il D.Lgs. 36/2023 (Codice dei contratti pubblici) e per i contratti privati. Premio e tempi li decide la compagnia dopo aver valutato l\'impresa.',
    price: 'su preventivo',
    highlighted: false,
  },
  {
    icon: '👷',
    title: 'Infortuni Operai (Integrativa INAIL)',
    desc: 'Copre il gap della rendita INAIL: capitali per invalidità permanente calcolati sulla retribuzione reale, diaria per inabilità temporanea, rimborso spese mediche.',
    price: 'su preventivo',
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
    title: 'Decennale Postuma D.M. 154/2022',
    desc: 'Obbligatoria per il costruttore che vende a una persona fisica un immobile da costruire (art. 4 D.Lgs. 122/2005). Copre per 10 anni i danni all\'immobile da rovina totale o parziale e da gravi difetti costruttivi.',
    price: 'su preventivo',
    highlighted: false,
  },
  {
    icon: '🌍',
    title: 'RC Inquinamento Cantiere',
    desc: 'Sversamenti accidentali, contaminazione del suolo, danni ambientali. Copre i danni a terzi e i costi di bonifica che il D.Lgs. 152/2006 (Testo Unico Ambientale) mette a carico di chi inquina.',
    price: 'su preventivo',
    highlighted: false,
  },
]

export default function EdiliziaPage() {
  return (
    <div>
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
                Senza polizza decennale postuma, una perizia tecnica può svuotare il patrimonio dell&apos;impresa.
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
                  {cov.highlighted && <span className="ml-2 text-xs bg-accent-cta text-white px-2 py-0.5 rounded-full align-middle">Più richiesta</span>}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{cov.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            {notaPremio('valore dell\'opera, durata, tipologia di lavori e altri parametri tecnici')}
          </p>
        </div>
      </section>

      {/* Esempio: scenario illustrativo, non il caso di un cliente */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Esempio
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
              Furto in cantiere nel weekend: cosa decide quanto paga la CAR
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Prendiamo un cantiere residenziale in provincia di Latina. Durante un weekend lungo spariscono ponteggi, una piattaforma elevatrice e materiali già in opera. Chi lavora in edilizia sa che non è un&apos;ipotesi di scuola.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Senza CAR il conto lo paga l&apos;impresa: ricompra tutto di tasca propria, perde giorni sul SAL e rischia le penali con il committente.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Con la CAR il furto rientra nella garanzia, ma quanto torna indietro lo decidono le condizioni scritte in polizza. Prima di firmare controlliamo:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                  <li>se il furto è coperto anche di notte e nei festivi, e con quali obblighi di recinzione o custodia;</li>
                  <li>se ponteggi e mezzi sono assicurati come attrezzature, con una somma loro, o restano fuori;</li>
                  <li>quanto pesano franchigia e scoperto sul singolo sinistro;</li>
                  <li>cosa serve per la denuncia, a partire da quella alle autorità.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Il punto
                </p>
                <p className="text-lg font-bold text-white leading-snug">
                  Due CAR con premi simili possono pagare cifre molto diverse sullo stesso furto. La differenza sta nelle condizioni, non nel nome della polizza.
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Cosa facciamo noi
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Leggiamo capitolato e condizioni prima che il cantiere apra. Se il sinistro arriva, prepariamo la denuncia con te e la seguiamo con la compagnia.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-6">
              Scenario costruito a titolo di esempio: non racconta il caso di un cliente FIM.
            </p>
          </div>
        </div>
      </section>

      <FaqSection
        title="Domande frequenti — Edilizia"
        items={ediliziaFaq.items}
        cta={ediliziaFaq.cta}
      />

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
