import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { welfareAziendaleFaq } from '@/lib/faq/welfare-aziendale'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { OG_BASE } from '@/lib/seo'
import { notaPremio } from '@/lib/prezzi'

const SETTORE_QS = '?profilo=pmi&settore=Welfare+Aziendale'

export const metadata: Metadata = {
  title: 'Welfare Aziendale — Polizze Collettive per i Dipendenti',
  description:
    'Polizze collettive salute, vita, infortuni e LTC per i dipendenti: un benefit che le persone usano, con un trattamento fiscale da impostare bene insieme al commercialista. Analisi gratuita del piano.',
  alternates: { canonical: '/soluzioni/settori/welfare-aziendale' },
  openGraph: {
    ...OG_BASE,
    url: '/soluzioni/settori/welfare-aziendale',
    images: [{ url: '/api/og?title=Welfare+Aziendale&tag=Soluzioni+per+settore&sub=Polizze+collettive+salute%2C+vita+e+infortuni+per+i+dipendenti.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Welfare+Aziendale&tag=Soluzioni+per+settore&sub=Polizze+collettive+salute%2C+vita+e+infortuni+per+i+dipendenti.'],
  },
}

const painPoints = [
  { icon: '💸', title: 'Aumenti che si perdono per strada', desc: 'Tra contributi e tasse, di un aumento in busta paga al dipendente arriva molto meno di quanto costa all\'azienda.' },
  { icon: '🚪', title: 'Persone che se ne vanno', desc: 'Sostituire chi lascia costa: ricerca, formazione e mesi in cui il nuovo arrivato non rende ancora come il vecchio.' },
  { icon: '📋', title: 'Un fisco da impostare bene', desc: 'Le polizze collettive hanno un trattamento fiscale di favore, ma solo se il piano è scritto nel modo giusto: regolamento o accordo, categorie di dipendenti, limiti per persona.' },
  { icon: '🏥', title: 'Liste d\'attesa lunghe', desc: 'Visite ed esami nel pubblico richiedono spesso tempi lunghi: i dipendenti chiedono coperture salute come benefit.' },
]

const coverages = [
  {
    icon: '🏥',
    title: 'Polizza Salute Collettiva',
    desc: 'Rimborso visite specialistiche, esami diagnostici, ricoveri e interventi in strutture private convenzionate. Network nazionale, accesso diretto senza anticipare somme.',
    highlighted: true,
  },
  {
    icon: '❤️',
    title: 'TCM Collettiva (Vita)',
    desc: 'Capitale assicurato che la compagnia versa ai familiari in caso di decesso del dipendente. Strumento di tutela e fidelizzazione, particolarmente apprezzato dai quadri.',
    highlighted: false,
  },
  {
    icon: '🦴',
    title: 'Infortuni Professionali ed Extra',
    desc: 'Integrativa INAIL per gli infortuni sul lavoro + estensione al tempo libero (24h/24). Indennizzi per invalidità permanente, ricovero e rimborso spese mediche.',
    highlighted: false,
  },
  {
    icon: '🧓',
    title: 'Long Term Care (LTC)',
    desc: 'Rendita vitalizia in caso di non autosufficienza del dipendente o dei familiari. Un benefit che alcuni contratti collettivi prevedono già.',
    highlighted: false,
  },
  {
    icon: '👶',
    title: 'Welfare Famiglia & Maternità',
    desc: 'Estensione delle coperture salute al nucleo familiare (coniuge e figli), pacchetti maternità, prevenzione pediatrica. Forte impatto sulla retention femminile.',
    highlighted: false,
  },
  {
    icon: '🏛️',
    title: 'Previdenza Complementare',
    desc: 'Versamenti del datore di lavoro a fondi pensione negoziali o aperti. Vantaggi fiscali per azienda e dipendente, integrazione della pensione pubblica.',
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
              con <span className="text-accent">coperture che usano</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Polizze collettive salute, vita, infortuni e LTC: un benefit che le persone sentono,
              con un trattamento fiscale di favore entro i limiti di legge. Come impostarlo lo verifichi
              con il tuo commercialista; le coperture le scegliamo con te.
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
              Perché serve oggi
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Quattro motivi per pensarci
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trattenere le persone, tutelarne la salute e usare bene le regole fiscali che già esistono.
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
              Sei coperture modulari. Si combinano in base al CCNL, alla fascia di reddito dei dipendenti e all&apos;obiettivo: trattenere e attrarre persone, tutelarne la salute.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coverages.map((cov) => (
              <Card key={cov.title} className={`flex flex-col ${cov.highlighted ? 'border-2 border-accent' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cov.icon}</span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                    su preventivo
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
            Il trattamento fiscale e contributivo di un piano welfare dipende da come è strutturato e dai limiti di legge per dipendente: va verificato con il commercialista prima di partire.
            {' '}{notaPremio('numero ed età dei dipendenti, coperture scelte, massimali ed estensione ai familiari')}
          </p>
        </div>
      </section>

      {/* Esempio: scenario illustrativo, non il caso di un cliente */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Esempio
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
              Piano welfare in una software house: come si costruisce
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Prendiamo una software house con una ventina di dipendenti che ogni anno perde qualche sviluppatore e fatica a sostituirlo. Lo stipendio da solo non basta più a trattenere le persone.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Un piano welfare si costruisce di solito su più voci, scelte in base a chi lavora in azienda:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                  <li>polizza salute collettiva con un network di strutture convenzionate;</li>
                  <li>infortuni 24 ore su 24, anche fuori dal lavoro;</li>
                  <li>previdenza complementare con un contributo dell&apos;azienda.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Il vantaggio fiscale c&apos;è, ma dipende da come è scritto il piano: regolamento aziendale o accordo, generalità o categorie di dipendenti. Va verificato con il commercialista prima di partire.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Il punto
                </p>
                <p className="text-lg font-bold text-white leading-snug">
                  Una polizza salute che i dipendenti non usano è solo un costo. Prima di scegliere guardiamo età, famiglie ed esigenze delle persone.
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Cosa facciamo noi
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Mettiamo a confronto le coperture sul mercato e ti diciamo cosa verificare sul piano fiscale con il tuo commercialista.
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
            Analisi gratuita: chi sono le persone, cosa userebbero davvero, quali polizze e come impostarle con il tuo commercialista.
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
