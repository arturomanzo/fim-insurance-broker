import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { welfareAziendaleFaq } from '@/lib/faq/welfare-aziendale'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import WelfareCalculator from '@/components/calculator/WelfareCalculator'

const SETTORE_QS = '?profilo=pmi&settore=Welfare+Aziendale'

export const metadata: Metadata = {
  title: 'Welfare Aziendale — Polizze Collettive con Risparmio Fiscale',
  description:
    'Polizze collettive salute, vita e infortuni per i tuoi dipendenti: 100% deducibili IRES + IRAP, esenti da contributi INPS, fidelizzano il personale. Calcola il risparmio fiscale e richiedi un piano su misura.',
  alternates: { canonical: '/soluzioni/settori/welfare-aziendale' },
  openGraph: {
    images: [{ url: '/api/og?title=Welfare+Aziendale&tag=Soluzioni+per+settore&sub=Polizze+collettive+deducibili%2C+fidelizzano+i+dipendenti%2C+abbattono+le+tasse.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Welfare+Aziendale&tag=Soluzioni+per+settore&sub=Polizze+collettive+deducibili%2C+fidelizzano+i+dipendenti%2C+abbattono+le+tasse.'],
  },
}

const painPoints = [
  { icon: '💸', title: 'Aumenti che valgono metà', desc: 'Un aumento lordo di 100€ in busta paga si traduce in ~55€ netti per il dipendente, ma costa ~130€ all\'azienda con i contributi.' },
  { icon: '🚪', title: 'Turnover che brucia margini', desc: 'Sostituire un dipendente costa tra 6 e 12 mesi del suo stipendio tra ricerca, formazione e perdita produttività.' },
  { icon: '📉', title: 'Tassazione su utili', desc: 'Senza pianificazione fiscale ogni euro di utile non distribuito viene tassato al 27,9% (IRES + IRAP). Il welfare lo abbatte legalmente.' },
  { icon: '🏥', title: 'SSN sempre più lento', desc: 'Liste d\'attesa per visite specialistiche fino a 12 mesi: i dipendenti chiedono coperture salute integrative come benefit.' },
]

const coverages = [
  {
    icon: '🏥',
    title: 'Polizza Salute Collettiva',
    desc: 'Rimborso visite specialistiche, esami diagnostici, ricoveri e interventi in strutture private convenzionate. Network nazionale, accesso diretto senza anticipare somme.',
    fiscale: 'Deducibile IRES + IRAP',
    highlighted: true,
  },
  {
    icon: '❤️',
    title: 'TCM Collettiva (Vita)',
    desc: 'Capitale assicurato che la compagnia versa ai familiari in caso di decesso del dipendente. Strumento di tutela e fidelizzazione, particolarmente apprezzato dai quadri.',
    fiscale: 'Deducibile fino a 1.291,14€/dip.',
    highlighted: false,
  },
  {
    icon: '🦴',
    title: 'Infortuni Professionali ed Extra',
    desc: 'Integrativa INAIL per gli infortuni sul lavoro + estensione al tempo libero (24h/24). Indennizzi per invalidità permanente, ricovero e rimborso spese mediche.',
    fiscale: 'Deducibile IRES + IRAP',
    highlighted: false,
  },
  {
    icon: '🧓',
    title: 'Long Term Care (LTC)',
    desc: 'Rendita vitalizia in caso di non autosufficienza del dipendente o dei familiari. Benefit di nuova generazione richiesto dai CCNL più evoluti (es. metalmeccanici).',
    fiscale: 'Deducibile, esente IRPEF dipendente',
    highlighted: false,
  },
  {
    icon: '👶',
    title: 'Welfare Famiglia & Maternità',
    desc: 'Estensione delle coperture salute al nucleo familiare (coniuge e figli), pacchetti maternità, prevenzione pediatrica. Forte impatto sulla retention femminile.',
    fiscale: 'Deducibile, esente IRPEF dipendente',
    highlighted: false,
  },
  {
    icon: '🏛️',
    title: 'Previdenza Complementare',
    desc: 'Versamenti del datore di lavoro a fondi pensione negoziali o aperti. Vantaggi fiscali per azienda e dipendente, integrazione della pensione pubblica.',
    fiscale: 'Deducibile fino a 5.164,57€/dip.',
    highlighted: false,
  },
]

export default function WelfareAziendalePage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Settori', href: '/soluzioni' },
          { name: 'Welfare Aziendale', href: '/soluzioni/settori/welfare-aziendale' },
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
            <span className="text-white/80">Welfare Aziendale</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              💼 PMI, studi professionali e medie imprese
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Premia i dipendenti<br />
              e <span className="text-accent">paga meno tasse</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Polizze collettive salute, vita, infortuni e LTC: 100% deducibili IRES + IRAP,
              esenti dai contributi INPS, esenti IRPEF per il dipendente. Costano metà di un aumento di stipendio
              ma valgono il doppio per chi le riceve.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 max-w-2xl">
              <p className="text-white/90 text-sm">
                <strong className="text-accent">Sapevi che</strong> — un aumento di stipendio lordo di 1.000€ costa all&apos;azienda ~1.300€
                e arriva al dipendente come ~550€ netti. Con 1.000€ di welfare via polizze collettive, l&apos;azienda spende
                ~720€ netti e il dipendente riceve <strong>1.000€ di valore reale</strong>.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preventivo${SETTORE_QS}`} className="btn-primary text-lg px-8 py-4">
                Progetta il mio piano welfare
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="#calcolatore" className="btn-outline-white text-lg px-8 py-4">
                🧮 Calcola il risparmio
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
              Perché serve oggi
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Quattro motivi per cui il welfare conviene
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Non è solo questione di tasse. È leva di retention, immagine, pianificazione fiscale e attrattività.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {painPoints.map((p) => (
              <Card key={p.title} className="border-l-4 border-l-accent">
                <span className="text-3xl mb-3 block">{p.icon}</span>
                <h3 className="font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calcolatore */}
      <section id="calcolatore" className="section-padding bg-gray-50 scroll-mt-20">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Calcolatore di risparmio
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-3">
              Quanto risparmia la tua azienda
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Una stima trasparente del risparmio fiscale e del confronto welfare vs. aumento di stipendio.
              Basata sulle aliquote standard IRES, IRAP e contributi INPS.
            </p>
          </div>
          <WelfareCalculator />
        </div>
      </section>

      {/* Coverages */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Le polizze del piano welfare
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Cosa puoi includere nel piano
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sei coperture modulari. Si combinano in base al CCNL, alla fascia di reddito dei dipendenti e all&apos;obiettivo (retention, attrazione talenti, abbattimento utili).
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coverages.map((cov) => (
              <Card key={cov.title} className={`flex flex-col ${cov.highlighted ? 'border-2 border-accent' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cov.icon}</span>
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                    {cov.fiscale}
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
            * I trattamenti fiscali indicati si riferiscono al regime ordinario. La deducibilità è subordinata al rispetto degli artt. 51 e 100 TUIR e dei limiti per dipendente. Verifica sempre con il commercialista la struttura ottimale del piano per la tua azienda. FIM Insurance Broker opera come intermediario assicurativo indipendente iscritto al RUI IVASS.
          </p>
        </div>
      </section>

      {/* Case study */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Caso reale
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
              PMI servizi IT con 22 dipendenti: turnover dimezzato, 2.400€/anno di risparmio fiscale
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Una software house cliente FIM, 22 dipendenti, fatturato ~3M€, vedeva 4-5 dimissioni l&apos;anno
                  con difficoltà a sostituire profili tecnici (developer e project manager). Costo turnover stimato:
                  <strong className="text-primary"> ~120.000€/anno</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Nel 2024 abbiamo strutturato un piano welfare attorno a tre pilastri:
                </p>
                <ul className="text-gray-700 leading-relaxed">
                  <li>polizza salute collettiva con network nazionale (premio: 400€/dipendente);</li>
                  <li>infortuni 24h/24 anche extra-professionali (premio: 80€/dipendente);</li>
                  <li>previdenza complementare con contributo aziendale dell&apos;1,5% della RAL.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Costo lordo annuo: ~10.560€ per le polizze. Risparmio fiscale IRES + IRAP: ~2.940€.
                  Costo netto azienda: ~7.620€. Per dare lo stesso valore netto in stipendio ne sarebbero servite ~19.500€.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Risultato a 12 mesi: <strong>2 dimissioni invece di 5</strong>, due assunzioni accelerate citando
                  esplicitamente il piano welfare in fase di trattativa, NPS interno passato da 32 a 58.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Risparmio fiscale annuo
                </p>
                <p className="text-5xl font-black text-accent mb-2">~2.940€</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  IRES + IRAP sulla deducibilità del piano welfare.
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Risparmio vs. aumento stipendio
                </p>
                <p className="text-3xl font-black text-accent mb-1">~11.880€</p>
                <p className="text-white/70 text-xs">a parità di valore percepito dai dipendenti.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Domande frequenti — Welfare Aziendale"
        items={welfareAziendaleFaq.items}
        cta={welfareAziendaleFaq.cta}
        background="white"
      />

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Vuoi un piano welfare costruito sul tuo CCNL e sui tuoi numeri?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Analisi gratuita: simulazione fiscale, scelta delle polizze, struttura del regolamento aziendale, tempistiche di attivazione.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/preventivo${SETTORE_QS}`} className="btn-primary text-lg px-8 py-4">
              Progetta il mio piano welfare
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
