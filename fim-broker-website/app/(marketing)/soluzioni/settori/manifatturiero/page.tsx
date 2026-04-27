import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { manifatturieroFaq } from '@/lib/faq/manifatturiero'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

const SETTORE_QS = '?profilo=pmi&settore=Manifatturiero'

export const metadata: Metadata = {
  title: 'Assicurazioni Manifatturiero — Property, Business Interruption, RC Prodotto',
  description:
    'Polizze per industria manifatturiera e PMI produttive: All Risk Property su capannone e macchinari, Business Interruption, RC Prodotto (anche export USA/UK), Cyber OT/IT e trasporti merci. Preventivo in 24 ore.',
  alternates: { canonical: '/soluzioni/settori/manifatturiero' },
  openGraph: {
    images: [{ url: '/api/og?title=Manifatturiero&tag=Soluzioni+per+settore&sub=Property%2C+Business+Interruption%2C+Cyber%2C+Prodotto.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Manifatturiero&tag=Soluzioni+per+settore&sub=Property%2C+Business+Interruption%2C+Cyber%2C+Prodotto.'],
  },
}

const painPoints = [
  { icon: '🔥', title: 'Fermo produzione', desc: 'Un incendio, un guasto a un macchinario chiave, un evento naturale: ogni giorno di fermo significa ordini persi e clienti che cercano altri fornitori.' },
  { icon: '🌍', title: 'RC prodotto export', desc: 'Vendere un prodotto in USA, UK o UE significa esporsi a richieste danni con criteri di responsabilità più stringenti rispetto all\'Italia.' },
  { icon: '🔐', title: 'Cyber attacchi su OT', desc: 'PLC, SCADA e linee di produzione connesse sono target di ransomware. Un blocco di 7-15 giorni può costare il 5-10% del fatturato annuo.' },
  { icon: '⚠️', title: 'Catastrofi naturali 2025', desc: 'Dal 2025 le imprese italiane hanno l\'obbligo di assicurare immobili e impianti contro alluvioni, terremoti e frane (L. 213/2023, art. 1 comma 101).' },
]

const coverages = [
  {
    icon: '🏭',
    title: 'All Risk Property',
    desc: 'Copertura "all-risk" su capannone, magazzini, scorte, macchinari di produzione e impianti tecnologici. Indennizza tutti i danni salvo le esclusioni espresse.',
    price: 'da 1.500€/anno',
    highlighted: true,
  },
  {
    icon: '⏸️',
    title: 'Business Interruption',
    desc: 'Compensa il margine di contribuzione perso durante il fermo produzione causato da un sinistro indennizzabile. La copertura che più spesso salva l\'azienda.',
    price: 'inclusa in Property',
    highlighted: false,
  },
  {
    icon: '📦',
    title: 'RC Prodotto (con export)',
    desc: 'Risponde dei danni causati a terzi dai prodotti immessi sul mercato, anche dopo la vendita. Estensioni specifiche per export USA, Canada e UK con relativi standard.',
    price: 'da 800€/anno',
    highlighted: false,
  },
  {
    icon: '🛡️',
    title: 'Cyber Risk OT/IT',
    desc: 'Ransomware, business email compromise, blocco linee di produzione, esfiltrazione progetti. Copre ripristino, riscatto (dove consentito), spese legali e BI cyber.',
    price: 'da 1.000€/anno',
    highlighted: false,
  },
  {
    icon: '🚚',
    title: 'Trasporti Merci',
    desc: 'Merci in arrivo (acquisti) e in partenza (vendite), trasporto su gomma, mare, ferrovia o aereo. Copertura "magazzino-magazzino" con clausole Institute Cargo.',
    price: 'da 0,15% del valore',
    highlighted: false,
  },
  {
    icon: '🌪️',
    title: 'Catastrofi Naturali (Obbligo 2025)',
    desc: 'Alluvione, terremoto, frana e smottamento su immobili e impianti. Obbligo di legge per le imprese ex L. 213/2023, con sanzioni per mancata adesione.',
    price: 'da 800€/anno',
    highlighted: false,
  },
]

export default function ManifatturieroPage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Settori', href: '/soluzioni' },
          { name: 'Manifatturiero', href: '/soluzioni/settori/manifatturiero' },
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
            <span className="text-white/80">Manifatturiero</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🏭 Industria, produzione e PMI manifatturiere
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Quando si ferma la produzione<br />
              si <span className="text-accent">ferma l&apos;azienda</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              All Risk capannone, Business Interruption, RC Prodotto con export USA/UK,
              Cyber su OT/IT e nuovo obbligo catastrofi naturali 2025: FIM costruisce
              il programma assicurativo della tua impresa manifatturiera con compagnie corporate.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 max-w-2xl">
              <p className="text-white/90 text-sm">
                <strong className="text-accent">Sapevi che</strong> — il 60% delle PMI italiane che subiscono un incendio grave non riapre entro 6 mesi.
                La Business Interruption è la copertura che più spesso salva l&apos;azienda — e spesso la meno conosciuta.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preventivo${SETTORE_QS}`} className="btn-primary text-lg px-8 py-4">
                Preventivo per la mia azienda
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
              Cosa può paralizzare un&apos;azienda manifatturiera
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quattro scenari concreti — fisici, contrattuali e cyber — dove un singolo evento può azzerare anni di lavoro.
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
              Le polizze su misura per l&apos;industria
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sei coperture pensate per PMI manifatturiere, mid-corporate e aziende con export. Costruiamo il programma in base a fatturato, sedi e mercati.
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
                  {cov.highlighted && <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded-full align-middle">Pilastro</span>}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{cov.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * I prezzi indicati sono puramente orientativi e non costituiscono offerta contrattuale ai sensi del D.Lgs. 209/2005 (Codice delle Assicurazioni Private). Il premio effettivo dipende da fatturato, valori assicurati, mercati di vendita e profilo di rischio. FIM Insurance Broker opera come intermediario assicurativo indipendente iscritto al RUI IVASS.
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
              Incendio capannone: l&apos;azienda riparte grazie alla Business Interruption
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Una PMI manifatturiera del Lazio (lavorazioni meccaniche di precisione, 28 dipendenti, 6,5M€ di fatturato)
                  subisce nel 2024 un incendio originato da un guasto elettrico. Capannone parzialmente compromesso,
                  3 centri di lavoro CNC distrutti, fermo produzione stimato in <strong className="text-primary">4 mesi</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Senza Business Interruption, l&apos;azienda avrebbe ricevuto solo l&apos;indennizzo per la ricostruzione fisica,
                  mentre nel frattempo avrebbe dovuto comunque pagare stipendi, finanziamenti e affitto, perdendo i clienti.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Grazie al programma All Risk + BI 18 mesi attivato da FIM:
                </p>
                <ul className="text-gray-700 leading-relaxed">
                  <li>perizia tecnica e acconto del 30% in 30 giorni;</li>
                  <li>indennizzo macchinari a valore a nuovo (~1,2M€);</li>
                  <li>BI: indennizzo del margine di contribuzione e dei costi fissi per 4 mesi (~480k€);</li>
                  <li>azienda ripartita senza ricorrere a indebitamento o licenziamenti.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Indennizzo totale
                </p>
                <p className="text-5xl font-black text-accent mb-2">~1,7M€</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  tra danni materiali e BI: l&apos;azienda ha conservato margini e occupazione.
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Posti di lavoro salvati
                </p>
                <p className="text-3xl font-black text-accent mb-1">28/28</p>
                <p className="text-white/70 text-xs">nessun licenziamento durante il fermo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Domande frequenti — Manifatturiero"
        items={manifatturieroFaq.items}
        cta={manifatturieroFaq.cta}
      />

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            La tua azienda è pronta al peggior scenario possibile?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Audit gratuito del programma assicurativo: gap di copertura, sotto-assicurazione, allineamento all&apos;obbligo catastrofi 2025.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/preventivo${SETTORE_QS}`} className="btn-primary text-lg px-8 py-4">
              Richiedi preventivo Manifatturiero
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
