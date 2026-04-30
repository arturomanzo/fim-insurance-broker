import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { cyberRiskFaq } from '@/lib/faq/cyber-risk'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Assicurazione Cyber Risk — Protezione PMI e Professionisti da Attacchi Informatici',
  description:
    'Polizza cyber risk per PMI, professionisti e studi: ransomware, data breach GDPR, fermo operativo. Copertura DUAL Cyber Smart Plus con retroattività illimitata. Preventivo gratuito FIM.',
  openGraph: {
    images: [{ url: '/api/og?title=Cyber+Risk&tag=Soluzioni&sub=Ransomware%2C+data+breach%2C+NIS2%3A+protezione+completa+per+PMI+e+professionisti.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Cyber+Risk&tag=Soluzioni&sub=Ransomware%2C+data+breach%2C+NIS2%3A+protezione+completa+per+PMI+e+professionisti.'],
  },
}

const threats = [
  { icon: '🔒', name: 'Ransomware', desc: 'Blocca i tuoi sistemi e chiede un riscatto' },
  { icon: '🎣', name: 'Phishing', desc: '+90% degli attacchi inizia da un\'email' },
  { icon: '💾', name: 'Data Breach', desc: 'Furto di dati di clienti e dipendenti' },
  { icon: '🛑', name: 'Fermo operativo', desc: 'Sistemi giù = zero ricavi ogni ora' },
  { icon: '⚖️', name: 'Sanzioni GDPR', desc: 'Fino al 4% del fatturato globale' },
  { icon: '🌐', name: 'Attacchi supply chain', desc: 'Vulnerabilità nei fornitori IT' },
]

const coverages = [
  {
    icon: '💻',
    title: 'Ripristino sistemi e dati',
    desc: 'Copertura dei costi tecnici per recuperare dati criptati o cancellati, ripristinare sistemi e infrastrutture IT compromesse dopo un attacco ransomware o malware.',
    included: true,
  },
  {
    icon: '📉',
    title: 'Interruzione attività (BI Cyber)',
    desc: 'Risarcimento del mancato guadagno durante il periodo di fermo operativo causato da un cyber attacco. Massimale fino a 30 giorni, franchigia temporale di 8 ore.',
    included: true,
  },
  {
    icon: '🛡️',
    title: 'Responsabilità verso terzi',
    desc: 'Copertura per le richieste di risarcimento di clienti, fornitori o dipendenti in seguito a violazione dei loro dati personali. Include spese legali e sanzioni GDPR.',
    included: true,
  },
  {
    icon: '🚨',
    title: 'Gestione crisi e notifiche',
    desc: 'Rimborso dei costi per esperti forensi IT, comunicazione di crisi, notifiche obbligatorie al Garante Privacy e agli interessati entro i 72 ore GDPR.',
    included: true,
  },
  {
    icon: '💰',
    title: 'Estorsione cyber',
    desc: 'Copertura per le spese di gestione di un\'estorsione ransomware: negoziatori specializzati, eventuali pagamenti del riscatto e supporto tecnico per il recovery.',
    included: true,
  },
  {
    icon: '⚡',
    title: 'Retroattività illimitata',
    desc: 'Copertura estesa anche a violazioni avvenute prima della stipula ma scoperte durante la validità della polizza. Fondamentale: gli attacchi restano silenti in media 207 giorni.',
    included: true,
  },
]

const targetProfiles = [
  {
    icon: '🏭',
    title: 'PMI e Aziende',
    subtitle: 'Fatturato fino a 50M€',
    desc: 'Imprese manifatturiere, commerciali, di servizi che gestiscono dati clienti, ordini, fatture. Particolarmente esposte: e-commerce, aziende con ERP/CRM cloud, manifatturiero con sistemi OT.',
    risks: ['Ransomware su server aziendali', 'Furto listini e dati clienti', 'Fermo produzione', 'Violazioni GDPR B2B'],
  },
  {
    icon: '⚖️',
    title: 'Professionisti e Studi',
    subtitle: 'Avvocati, commercialisti, medici, consulenti',
    desc: 'Trattano dati sensibili di clienti e pazienti. Soggetti al GDPR con obblighi specifici. Un data breach può significare revoca dell\'iscrizione all\'albo oltre alle sanzioni.',
    risks: ['Furto cartelle pazienti/clienti', 'Violazione segreto professionale', 'Blocco studio per ransomware', 'Sanzioni Garante Privacy'],
  },
  {
    icon: '🏥',
    title: 'Settori Critici NIS2',
    subtitle: 'Sanità, energia, PA, finanza',
    desc: 'Soggetti alla Direttiva NIS2 (D.Lgs. 138/2024) con obblighi di sicurezza rafforzati. La polizza cyber è lo strumento di compliance più efficace per dimostrare gestione adeguata del rischio.',
    risks: ['Obbligo NIS2 di risk management', 'Notifiche CSIRT obbligatorie', 'Sanzioni fino a €10M o 2% fatturato', 'Responsabilità management'],
  },
]

const dualDifferentiators = [
  { label: 'Retroattività illimitata', value: 'Standard inclusa' },
  { label: 'Copertura mondo intero', value: 'Sì, inclusa' },
  { label: 'Doppio binario', value: 'Assistenza + risarcimento' },
  { label: 'Franchigia minima', value: 'da €250' },
  { label: 'Business interruption', value: 'fino a 30 giorni' },
  { label: 'Sconto franchigia alta', value: 'fino al 33%' },
]

const scenarios = [
  {
    icon: '🔓',
    title: 'Ransomware blocca il tuo gestionale',
    context: 'Studio di commercialisti, 5 dipendenti',
    damage: 'Sistemi bloccati per 4 giorni, recupero dati, clienti non serviti',
    covered: 'Ripristino tecnico + 4 giorni di mancato reddito + gestione comunicazione',
    cost: '~18.000€ coperti',
  },
  {
    icon: '📧',
    title: 'Dipendente clicca su email phishing',
    context: 'PMI manifatturiera, 25 dipendenti',
    damage: 'Credenziali rubate, accesso ai dati di 2.000 clienti',
    covered: 'Notifica Garante, comunicazione agli interessati, spese legali, sanzione GDPR',
    cost: '~45.000€ coperti',
  },
  {
    icon: '💳',
    title: 'Attacco al sito e-commerce',
    context: 'Negozio online, 3M€ fatturato',
    damage: 'Sito down 18 ore, dati pagamento clienti esposti',
    covered: 'Mancati ricavi, forensi IT, notifiche PCI DSS e GDPR, PR di crisi',
    cost: '~62.000€ coperti',
  },
]

export default function CyberRiskPage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Cyber Risk', href: '/soluzioni/cyber-risk' },
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
            <span className="text-white/80">Cyber Risk</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 text-sm font-semibold mb-5 text-accent-light">
              🛡️ DUAL Cyber Smart Plus — Mandato diretto FIM
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Un attacco cyber<br />
              può fermare{' '}
              <span className="text-accent">la tua azienda</span>.<br />
              Noi no.
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              Il 68% delle PMI italiane ha subìto almeno un attacco informatico negli ultimi 2 anni.
              Il danno medio supera i 35.000€. La polizza cyber ti protegge da ransomware,
              data breach, sanzioni GDPR e fermo operativo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { value: '207 gg', label: 'tempo medio in cui un attacco resta silente prima di essere scoperto' },
                { value: '90%', label: 'degli attacchi cyber inizia da un errore umano (phishing)' },
                { value: '4%', label: 'del fatturato globale: sanzione massima GDPR per data breach' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-accent mb-1">{stat.value}</div>
                  <div className="text-xs text-white/70 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/preventivo?profilo=azienda&tipo=cyber" className="btn-primary text-lg px-8 py-4">
                Richiedi Preventivo Cyber
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="/docs/cyber-health-check.pdf"
                download
                className="btn-outline-white text-lg px-8 py-4"
              >
                📋 Scarica Cyber Health Check
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Threats */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              I rischi informatici
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Le minacce che copriamo
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {threats.map((t) => (
              <div key={t.name} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-4xl block mb-3">{t.icon}</span>
                <p className="font-semibold text-primary text-sm mb-1">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Cosa copre la polizza
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Copertura completa, senza sorprese
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              DUAL Cyber Smart Plus è il prodotto che FIM ha selezionato per la protezione cyber di PMI e professionisti.
              Mandato diretto con DUAL — otteniamo condizioni migliori rispetto al mercato standard.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coverages.map((c) => (
              <Card key={c.title} className="flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl flex-shrink-0">{c.icon}</span>
                  <div>
                    <h3 className="font-bold text-primary text-base leading-tight">{c.title}</h3>
                    {c.included && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 mt-0.5">
                        ✓ Inclusa
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
              </Card>
            ))}
          </div>

          {/* DUAL differentiators table */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl overflow-hidden">
              <div className="bg-primary px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-black text-lg">DUAL Cyber Smart Plus</p>
                  <p className="text-white/70 text-sm">Mandato diretto FIM Insurance Broker</p>
                </div>
                <div className="text-right">
                  <p className="text-accent font-black text-xl">da 800€/anno</p>
                  <p className="text-white/60 text-xs">indicativo per PMI fino a 2M€</p>
                </div>
              </div>
              <div className="divide-y divide-primary/10">
                {dualDifferentiators.map((d) => (
                  <div key={d.label} className="flex items-center justify-between px-6 py-3">
                    <span className="text-sm text-gray-700">{d.label}</span>
                    <span className="text-sm font-bold text-primary">{d.value}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-accent/5 border-t border-primary/10">
                <p className="text-xs text-gray-500 leading-relaxed">
                  * I premi indicati sono puramente orientativi. Il premio effettivo è determinato da DUAL in base a fatturato, settore, dati trattati e misure di sicurezza in atto. Non costituiscono offerta contrattuale ai sensi del D.Lgs. 209/2005. FIM Insurance Broker opera come intermediario iscritto RUI IVASS Sez. B n. B000405449.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target profiles */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Per chi è
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Chi ha più bisogno di una polizza cyber
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetProfiles.map((p) => (
              <Card key={p.title} className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{p.icon}</span>
                  <div>
                    <h3 className="font-black text-primary text-lg">{p.title}</h3>
                    <p className="text-gray-500 text-sm">{p.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Rischi principali</p>
                  <ul className="space-y-1">
                    {p.risks.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-red-400 mt-0.5 flex-shrink-0">▸</span>
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

      {/* Scenarios */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Scenari reali
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Cosa succederebbe senza copertura
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {scenarios.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-red-50 border-b border-red-100 px-5 py-4">
                  <span className="text-3xl block mb-2">{s.icon}</span>
                  <h3 className="font-black text-primary text-base leading-tight">{s.title}</h3>
                  <p className="text-gray-500 text-xs mt-1">{s.context}</p>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <div>
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Danno subìto</p>
                    <p className="text-sm text-gray-700">{s.damage}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">La polizza copre</p>
                    <p className="text-sm text-gray-700">{s.covered}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="inline-block bg-green-50 text-green-700 font-black text-sm px-3 py-1 rounded-full">
                      {s.cost}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead magnet */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white/10 border border-white/20 rounded-2xl p-8 md:p-10 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              Cyber Health Check — gratuito
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">
              10 domande per scoprire in 5 minuti quanto è esposta la tua azienda al rischio cyber.
              Scopri i gap di sicurezza prima che lo faccia un hacker.
              Checklist immediata, nessun dato richiesto.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/docs/cyber-health-check.pdf"
                download
                className="btn-primary px-8 py-4 text-lg"
              >
                📥 Scarica la Checklist PDF
              </a>
              <Link href="/preventivo?profilo=azienda&tipo=cyber" className="btn-outline-white px-8 py-4 text-lg">
                Richiedi consulenza cyber
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why FIM for cyber */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-3">Perché scegliere FIM per il cyber</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯',
                title: 'Mandato diretto DUAL',
                desc: 'FIM ha un accordo diretto con DUAL — uno dei leader mondiali nel cyber risk. Accediamo a condizioni e massimali non disponibili sul mercato standard.',
              },
              {
                icon: '🔍',
                title: 'Analisi del rischio reale',
                desc: 'Non vendiamo polizze: analizziamo prima il tuo profilo di rischio cyber reale. Valutiamo fatturato, dati trattati, settore, misure in atto e costruiamo la copertura giusta.',
              },
              {
                icon: '🆘',
                title: 'Assistenza al sinistro',
                desc: 'In caso di attacco, siamo il tuo primo punto di contatto. Coordiniamo l\'intervento degli esperti DUAL e seguiamo l\'intero processo liquidativo al posto tuo.',
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

      <FaqSection items={cyberRiskFaq.items} cta={cyberRiskFaq.cta} />

      {/* Final CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            La tua azienda è protetta da un cyber attacco?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Analisi gratuita del rischio cyber. Preventivo DUAL Cyber Smart Plus entro 24 ore.
            Nessun impegno.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/preventivo?profilo=azienda&tipo=cyber" className="btn-primary text-lg px-8 py-4">
              Richiedi Preventivo Cyber
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
