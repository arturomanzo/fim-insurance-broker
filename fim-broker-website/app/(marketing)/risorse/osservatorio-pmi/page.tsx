import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Osservatorio PMI Assicurazioni 2025 | Costi e Benchmark per Settore',
  description:
    'Dati aggiornati 2025 sui costi delle assicurazioni per PMI italiane: benchmark per settore, analisi dei rischi, confronto spesa media. Report esclusivo FIM Insurance Broker.',
  keywords: [
    'costo assicurazione pmi',
    'benchmark assicurazioni aziendali',
    'rc impresa costo medio',
    'assicurazioni artigiani prezzi 2025',
    'polizza aziendale quanto costa',
    'osservatorio assicurazioni pmi italia',
  ],
  openGraph: {
    title: 'Osservatorio PMI Assicurazioni 2025',
    description: 'Benchmark esclusivi sui costi assicurativi per le PMI italiane: dati per settore, dimensione aziendale e tipologia di copertura.',
    type: 'article',
  },
}

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Report',
  name: 'Osservatorio PMI Assicurazioni 2025',
  description: 'Analisi dei costi e benchmark assicurativi per le PMI italiane per settore e dimensione',
  publisher: {
    '@type': 'Organization',
    name: 'FIM Insurance Broker',
    url: 'https://www.fimbroker.it',
  },
  datePublished: '2025-01-15',
  dateModified: '2025-03-01',
  inLanguage: 'it',
  about: {
    '@type': 'Thing',
    name: 'Assicurazioni PMI Italia',
  },
}

const faqs = [
  {
    q: 'Quanto costa in media un pacchetto assicurativo per una PMI?',
    a: 'Il costo medio annuo per una PMI con 5–20 dipendenti varia tra €2.800 e €12.000 a seconda del settore e delle coperture scelte. Le imprese manifatturiere e costruzioni pagano di più (rischio fisico elevato), mentre il terziario tende a spendere meno per i rischi materiali ma di più per RC e cyber.',
  },
  {
    q: 'La polizza catastrofale è obbligatoria per le imprese nel 2025?',
    a: 'Sì. Il D.L. 18/2023 convertito con L. 17/2024 ha introdotto l\'obbligo di assicurazione contro le calamità naturali (alluvioni, terremoti, frane, inondazioni) per tutte le imprese con sede legale in Italia a partire dal 1° aprile 2025. Le imprese non in regola rischiano sanzioni e l\'esclusione da contributi pubblici.',
  },
  {
    q: 'Cosa include la RC Impresa e quanto costa?',
    a: 'La RC Impresa copre i danni causati a terzi nell\'esercizio dell\'attività. Il costo dipende dal fatturato, numero di dipendenti e settore: per una PMI con fatturato fino a €500K si parte da €600–1.200/anno per la sola RC. Molte imprese la integrano con polizze All-Risk per una copertura completa.',
  },
  {
    q: 'Il Cyber Risk Insurance è necessario per le PMI?',
    a: 'Con l\'entrata in vigore del Regolamento NIS2 (ottobre 2024), migliaia di PMI italiane rientrano nell\'ambito di applicazione. Anche senza obbligo diretto, il costo medio di un attacco ransomware per una PMI italiana è di €85.000 tra fermo operativo, recupero dati e danni reputazionali. Una polizza cyber entry-level parte da €800–1.500/anno.',
  },
  {
    q: 'Come si calcola il premio di un\'assicurazione aziendale?',
    a: 'I fattori principali sono: settore di attività (codice ATECO), fatturato annuo, numero di dipendenti, presenza di impianti/macchinari, storico sinistri, e coperture richieste. Un broker indipendente come FIM può confrontare le offerte di 30+ compagnie per trovare il miglior rapporto qualità-prezzo.',
  },
]

const sectorData = [
  { sector: 'Edilizia & Costruzioni', rc: '€1.800–4.500', allRisk: '€2.500–7.000', cyber: '€800–1.500', catastrofale: '€400–900', total: '€5.500–14.000', risk: 'alto' },
  { sector: 'Manifatturiero / Industria', rc: '€1.500–3.500', allRisk: '€3.000–9.000', cyber: '€900–1.800', catastrofale: '€500–1.200', total: '€6.000–15.500', risk: 'alto' },
  { sector: 'Ristorazione & Hotellerie', rc: '€900–2.000', allRisk: '€1.200–3.500', cyber: '€600–1.200', catastrofale: '€300–700', total: '€3.000–7.400', risk: 'medio' },
  { sector: 'Commercio al Dettaglio', rc: '€700–1.800', allRisk: '€800–2.500', cyber: '€600–1.200', catastrofale: '€250–600', total: '€2.350–6.100', risk: 'medio' },
  { sector: 'IT & Servizi Digitali', rc: '€1.200–3.000', allRisk: '€400–1.000', cyber: '€1.200–3.500', catastrofale: '€150–400', total: '€2.950–7.900', risk: 'medio-alto' },
  { sector: 'Studi Professionali', rc: '€800–2.500', allRisk: '€300–800', cyber: '€900–2.000', catastrofale: '€100–300', total: '€2.100–5.600', risk: 'medio' },
  { sector: 'Trasporti & Logistica', rc: '€2.000–5.500', allRisk: '€1.500–4.000', cyber: '€700–1.400', catastrofale: '€350–800', total: '€4.550–11.700', risk: 'alto' },
  { sector: 'Sanità & Welfare Privato', rc: '€1.800–5.000', allRisk: '€600–1.800', cyber: '€1.200–3.000', catastrofale: '€200–500', total: '€3.800–10.300', risk: 'alto' },
]

const sizeData = [
  { size: 'Micro (1–4 dip.)', spend: '€1.500–4.500', note: 'RC + tutela base' },
  { size: 'Piccola (5–19 dip.)', spend: '€3.500–9.000', note: 'RC + All Risk + cyber' },
  { size: 'Media (20–49 dip.)', spend: '€8.000–22.000', note: 'Pacchetto completo' },
  { size: 'Grande (50–249 dip.)', spend: '€18.000–60.000+', note: 'Programma integrato' },
]

const trends2025 = [
  { icon: '⚠️', title: 'Polizza catastrofale obbligatoria', desc: 'Dal 1° aprile 2025 tutte le imprese devono assicurarsi contro calamità naturali per legge (L. 17/2024). Chi non si adegua rischia esclusione dai fondi pubblici.' },
  { icon: '🔐', title: 'Cyber risk in aumento del +34%', desc: 'Gli attacchi alle PMI italiane sono cresciuti del 34% nel 2024. NIS2 obbliga le aziende in supply chain a rafforzare la sicurezza informatica o perdere contratti.' },
  { icon: '📈', title: 'Premi RC in rialzo del +12% medio', desc: 'L\'inflazione dei materiali e l\'aumento del contenzioso legale hanno spinto i premi RC impresa verso l\'alto. Confrontare offerte di più compagnie è più importante che mai.' },
  { icon: '👥', title: 'Welfare aziendale detraibile', desc: 'I piani di welfare con polizze sanitarie integrative per i dipendenti beneficiano di vantaggi fiscali significativi: deducibilità fino al 5‰ del fatturato per il datore.' },
]

function RiskBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    'basso': 'bg-green-100 text-green-800',
    'medio': 'bg-yellow-100 text-yellow-800',
    'medio-alto': 'bg-orange-100 text-orange-800',
    'alto': 'bg-red-100 text-red-800',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${colors[level] || 'bg-gray-100 text-gray-700'}`}>
      {level}
    </span>
  )
}

export default function OsservatorioPmiPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      {/* Hero */}
      <section className="gradient-primary py-16 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-white/10 border border-white/20 text-sm px-3 py-1 rounded-full">
                📊 Dati aggiornati 2025
              </span>
              <span className="inline-block bg-accent/20 border border-accent/30 text-sm px-3 py-1 rounded-full">
                Report Esclusivo FIM
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Osservatorio PMI<br />
              <span className="text-accent">Assicurazioni 2025</span>
            </h1>
            <p className="text-xl text-white/80 mb-6">
              Benchmark sui costi assicurativi per le imprese italiane: dati reali per settore, dimensione aziendale e tipologia di copertura.
            </p>
            <p className="text-white/60 text-sm">
              Elaborato su un campione di oltre 800 imprese clienti FIM · Aggiornato a marzo 2025
            </p>
          </div>
        </div>
      </section>

      {/* KPI Strip */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '€4.200', label: 'Spesa media PMI/anno', sub: 'Con 5–20 dipendenti' },
              { value: '+34%', label: 'Aumento cyber-attacchi', sub: 'vs 2023, fonte CLUSIT' },
              { value: '01/04/25', label: 'Obbligo catastrofale', sub: 'Per tutte le imprese' },
              { value: '+12%', label: 'Aumento premi RC', sub: 'Media di mercato 2024' },
            ].map((kpi) => (
              <div key={kpi.value}>
                <div className="text-3xl font-black text-primary">{kpi.value}</div>
                <div className="font-semibold text-gray-800 text-sm mt-1">{kpi.label}</div>
                <div className="text-gray-400 text-xs">{kpi.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Benchmark per settore */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">
                Costi assicurativi per settore
              </h2>
              <p className="text-gray-600 mb-6">
                Premio annuo indicativo per una PMI con 5–20 dipendenti e fatturato tra €300K–€2M. I valori includono le coperture più comuni per ogni settore.
              </p>
              <div className="overflow-x-auto rounded-2xl shadow-sm">
                <table className="w-full bg-white text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="text-left px-4 py-3 font-semibold rounded-tl-2xl">Settore</th>
                      <th className="text-left px-4 py-3 font-semibold">RC Impresa</th>
                      <th className="text-left px-4 py-3 font-semibold">All Risk</th>
                      <th className="text-left px-4 py-3 font-semibold">Cyber</th>
                      <th className="text-left px-4 py-3 font-semibold">Catastrofale</th>
                      <th className="text-left px-4 py-3 font-semibold">Totale stimato</th>
                      <th className="text-left px-4 py-3 font-semibold rounded-tr-2xl">Rischio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectorData.map((row, i) => (
                      <tr key={row.sector} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-semibold text-primary">{row.sector}</td>
                        <td className="px-4 py-3 text-gray-700">{row.rc}</td>
                        <td className="px-4 py-3 text-gray-700">{row.allRisk}</td>
                        <td className="px-4 py-3 text-gray-700">{row.cyber}</td>
                        <td className="px-4 py-3 text-gray-700">{row.catastrofale}</td>
                        <td className="px-4 py-3 font-bold text-gray-900">{row.total}</td>
                        <td className="px-4 py-3"><RiskBadge level={row.risk} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-400 text-xs mt-3">
                * Stime basate su campione clienti FIM. I premi effettivi dipendono da sinistrosità storica, massimali scelti e condizioni di polizza. Richiedi un preventivo personalizzato per dati precisi.
              </p>
            </div>

            {/* Benchmark per dimensione */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">
                Spesa per dimensione aziendale
              </h2>
              <p className="text-gray-600 mb-6">
                La spesa assicurativa cresce con le dimensioni, ma il rapporto costo/protezione può migliorare sensibilmente con la giusta struttura del pacchetto.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sizeData.map((item) => (
                  <div key={item.size} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-2 font-medium">{item.size}</div>
                    <div className="text-2xl font-black text-primary mb-1">{item.spend}</div>
                    <div className="text-xs text-gray-400">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend 2025 */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">
                Tendenze e novità 2025
              </h2>
              <p className="text-gray-600 mb-6">
                Quattro fattori che stanno cambiando il mercato assicurativo per le PMI italiane nel 2025.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trends2025.map((trend) => (
                  <div key={trend.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-3xl mb-3">{trend.icon}</div>
                    <h3 className="font-bold text-primary mb-2">{trend.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{trend.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage breakdown chart (CSS-only bar chart) */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">
                Distribuzione della spesa assicurativa
              </h2>
              <p className="text-gray-600 mb-6">
                Come si distribuisce mediamente il budget assicurativo di una PMI italiana (media dei settori).
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                {[
                  { label: 'RC Impresa / Prodotti', pct: 38, color: 'bg-primary' },
                  { label: 'All Risk Aziendale (property)', pct: 28, color: 'bg-accent' },
                  { label: 'Cyber Risk Insurance', pct: 17, color: 'bg-blue-400' },
                  { label: 'Polizza Catastrofale', pct: 9, color: 'bg-orange-400' },
                  { label: 'Altre coperture (tutela legale, welfare…)', pct: 8, color: 'bg-gray-300' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm font-bold text-gray-900">{item.pct}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA banner */}
            <div className="gradient-primary rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-black mb-3">
                Scopri quanto spende la tua impresa
              </h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Usa il nostro calcolatore gratuito per ottenere una stima personalizzata basata sul tuo settore, dimensione e rischi specifici. Nessun impegno.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/calcolatore-rischi" className="btn-primary">
                  📊 Calcola il mio profilo di rischio
                </Link>
                <Link href="/preventivo?profilo=pmi" className="bg-white/10 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors">
                  Richiedi preventivo gratuito
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-6">
                Domande frequenti
              </h2>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqs.map((faq) => ({
                      '@type': 'Question',
                      name: faq.q,
                      acceptedAnswer: { '@type': 'Answer', text: faq.a },
                    })),
                  }),
                }}
              />
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.q} className="bg-white rounded-2xl shadow-sm border border-gray-100 group">
                    <summary className="px-6 py-4 cursor-pointer font-semibold text-primary hover:text-primary-light list-none flex justify-between items-center">
                      {faq.q}
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Methodology note */}
            <div className="bg-gray-100 rounded-2xl p-6 text-sm text-gray-600">
              <h3 className="font-bold text-gray-800 mb-2">Nota metodologica</h3>
              <p className="leading-relaxed">
                I dati presentati in questa pagina sono elaborati da FIM Insurance Broker su un campione anonimizzato di oltre 800 contratti stipulati tra 2023 e 2024 per clienti PMI con sede in Italia. I range di premio sono indicativi e non costituiscono offerta commerciale. I premi effettivi dipendono da fattori individuali (sinistrosità, massimali, franchige) e dalle condizioni aggiornate delle compagnie assicurative. Fonte esterna citata: rapporto CLUSIT 2024 per i dati sul cyber risk.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Related resources */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="container-custom">
          <h2 className="text-xl font-black text-primary mb-6">Risorse correlate</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: '/risorse/guida-pmi', label: '📋 Guida PMI 2025', desc: 'La guida completa alle assicurazioni aziendali obbligatorie e consigliate.' },
              { href: '/calcolatore-rischi', label: '📊 Calcolatore del Rischio', desc: 'Valuta il profilo di rischio della tua impresa in 2 minuti.' },
              { href: '/blog/polizze-obbligatorie-aziende-italia-2025', label: '📰 Polizze Obbligatorie 2025', desc: 'Tutte le assicurazioni obbligatorie per le imprese italiane nel 2025.' },
            ].map((res) => (
              <Link
                key={res.href}
                href={res.href}
                className="p-5 rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="font-bold text-primary mb-1 group-hover:text-accent transition-colors">{res.label}</div>
                <div className="text-gray-500 text-sm">{res.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
