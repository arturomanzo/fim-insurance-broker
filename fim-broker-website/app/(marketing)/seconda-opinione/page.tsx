import type { Metadata } from 'next'
import SecondOpinionForm from '@/components/forms/SecondOpinionForm'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Second Opinion Assicurativa Gratuita per PMI | FIM Insurance Broker',
  description:
    'Inviaci le tue polizze attuali. Faremo una Gap Analysis gratuita per mostrarti i rischi scoperti che la tua compagnia non ti ha mai detto. Risposta in 48 ore.',
  openGraph: {
    title: 'Second Opinion Assicurativa — Gap Analysis Gratuita per PMI',
    description:
      'Scopri i buchi nelle tue coperture assicurative attuali. Analisi gratuita da consulenti indipendenti. Risposta in 48 ore.',
    images: [{ url: '/api/og?title=Second+Opinion+Assicurativa&tag=PMI&sub=Gap+Analysis+gratuita+in+48+ore', width: 1200, height: 630 }],
  },
}

const GAP_EXAMPLES = [
  {
    titolo: 'Danni catastrofali non coperti',
    desc: 'Dal 31 marzo 2025 le imprese devono avere la polizza catastrofale obbligatoria. Molte PMI non lo sanno ancora.',
    badge: 'Obbligo di legge',
    badgeColor: 'bg-red-100 text-red-700',
  },
  {
    titolo: 'Responsabilità civile prodotti sottostimata',
    desc: 'Il massimale RC Prodotti spesso non copre i costi legali e i danni indiretti, lasciando un gap di centinaia di migliaia di euro.',
    badge: 'Rischio alto',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    titolo: 'Zero copertura cyber',
    desc: 'Solo il 21% delle PMI italiane ha una polizza cyber (Cyber Index PMI 2024). Un attacco ransomware costa in media €200k a una PMI.',
    badge: 'Rischio crescente',
    badgeColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    titolo: 'Interruzione attività scoperta',
    desc: 'La polizza incendio copre il danno fisico, non i mancati ricavi mentre ricostruisci. Senza business interruption, sei a rischio fallimento.',
    badge: 'Spesso trascurato',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Carica le tue polizze',
    desc: 'Inviaci i PDF dei tuoi contratti attuali. Puoi oscurare i premi — non ci interessa il costo, ma le coperture.',
  },
  {
    step: '2',
    title: 'Analisi da un consulente FIM',
    desc: 'Un nostro esperto (non un algoritmo) legge ogni clausola, identifica le lacune e confronta con il mercato e gli obblighi di legge.',
  },
  {
    step: '3',
    title: 'Ricevi la Gap Analysis',
    desc: 'Entro 48 ore lavorative: una chiamata con il consulente + report scritto con i rischi scoperti e le priorità di intervento.',
  },
]

const TRUST_POINTS = [
  { label: 'Gratuito', desc: 'Nessun costo, nessun impegno di acquisto' },
  { label: 'Indipendente', desc: 'Non rappresentiamo compagnie, solo i tuoi interessi' },
  { label: '48 ore', desc: 'Risposta garantita entro 2 giorni lavorativi' },
  { label: '30+ compagnie', desc: 'Confronto su tutto il mercato italiano' },
]

export default function SecondaOpinionePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom text-center">
          <span className="inline-block bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            Servizio riservato · Gratuito · Solo per PMI e professionisti
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Sei sicuro che le tue polizze<br />
            <span className="text-accent">ti coprano davvero?</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4">
            Inviaci i tuoi contratti attuali. Faremo una <strong>Gap Analysis gratuita</strong> per
            mostrarti i rischi latenti che la tua compagnia non ti ha mai detto.
          </p>
          <p className="text-white/60 text-sm mb-8">
            Solo 1 PMI su 5 è coperta in caso di alluvione o terremoto — anche dopo l&apos;obbligo del 2025.{' '}
            <span className="text-white/80">(Fonte: ANIA 2024)</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {TRUST_POINTS.map((t) => (
              <div key={t.label} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>{t.label}</strong> — {t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Come funziona ── */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form principale ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Richiedi la tua Second Opinion</h2>
            <p className="text-gray-500">
              Compila il form e allega le polizze. Ti ricontatteremo entro 48 ore lavorative.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
            <SecondOpinionForm />
          </div>
        </div>
      </section>

      {/* ── Gap più comuni ── */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-3">I gap più comuni che troviamo</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Nelle analisi che facciamo ogni settimana, questi sono i rischi scoperti che emergono più spesso.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GAP_EXAMPLES.map((gap) => (
              <Card key={gap.titolo} hover padding="md">
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${gap.badgeColor}`}>
                  {gap.badge}
                </span>
                <h3 className="font-bold text-gray-800 mb-2">{gap.titolo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{gap.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Differenza vs analisi-polizza ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            Second Opinion vs Analisi AI automatica
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-600 border border-gray-200"></th>
                  <th className="text-center p-3 font-semibold text-primary border border-gray-200">Second Opinion</th>
                  <th className="text-center p-3 font-semibold text-gray-600 border border-gray-200">
                    <a href="/analizza-polizza" className="hover:underline">Analisi AI istantanea</a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Chi analizza', 'Consulente umano FIM', 'Intelligenza artificiale'],
                  ['Tempi', '48 ore lavorative', '30 secondi'],
                  ['N° polizze', 'Tutte le tue polizze insieme', '1 polizza alla volta'],
                  ['Output', 'Gap Analysis + chiamata', 'Report sullo schermo'],
                  ['Target ideale', 'PMI, professionisti, portafoglio complesso', 'Tutti (anche privati)'],
                ].map(([label, col1, col2]) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="p-3 font-medium text-gray-700 border border-gray-200">{label}</td>
                    <td className="p-3 text-center text-gray-700 border border-gray-200 bg-primary/5">{col1}</td>
                    <td className="p-3 text-center text-gray-500 border border-gray-200">{col2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="gradient-primary py-14 text-white text-center">
        <div className="container-custom max-w-xl">
          <h2 className="text-2xl font-bold mb-3">Preferisci parlare subito?</h2>
          <p className="opacity-80 mb-6">
            I nostri consulenti sono disponibili per una prima valutazione telefonica gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/prenota-consulenza" className="btn-primary">
              Prenota consulenza gratuita
            </a>
            <a href="tel:+390696883381" className="btn-outline-white">
              Chiama ora: 06 96883381
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
