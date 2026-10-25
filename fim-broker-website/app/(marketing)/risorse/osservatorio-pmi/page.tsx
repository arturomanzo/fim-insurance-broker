import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSection from '@/components/ui/FaqSection'
import { osservatorioPmiFaq } from '@/lib/faq/osservatorio-pmi'
import { OG_BASE } from '@/lib/seo'
import { SCADENZE_CATASTROFALE, CHI_E_ESCLUSO, CONSEGUENZA_CATASTROFALE } from '@/lib/catastrofale'

export const metadata: Metadata = {
  title: 'Osservatorio PMI Assicurazioni | Quanto costa assicurare un\'impresa',
  description:
    'Ordini di grandezza dei premi assicurativi per PMI italiane, per settore e dimensione: RC, all risk, cyber, catastrofale. Valori di orientamento FIM, non statistiche ufficiali.',
  keywords: [
    'costo assicurazione pmi',
    'benchmark assicurazioni aziendali',
    'rc impresa costo medio',
    'assicurazioni artigiani prezzi',
    'polizza aziendale quanto costa',
    'osservatorio assicurazioni pmi italia',
  ],
  alternates: { canonical: '/risorse/osservatorio-pmi' },
  openGraph: {
    ...OG_BASE,
    url: '/risorse/osservatorio-pmi',
    title: 'Osservatorio PMI Assicurazioni',
    description: 'Ordini di grandezza dei premi assicurativi per le PMI italiane, per settore e dimensione. Valori di orientamento FIM.',
    type: 'article',
  },
}

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Report',
  name: 'Osservatorio PMI Assicurazioni',
  description: 'Ordini di grandezza dei premi assicurativi per le PMI italiane per settore e dimensione. Valori di orientamento, non statistiche ufficiali.',
  publisher: {
    '@type': 'Organization',
    name: 'FIM Insurance Broker',
    url: 'https://www.fimbroker.it',
  },
  datePublished: '2025-01-15',
  dateModified: '2026-10-25',
  inLanguage: 'it',
  about: {
    '@type': 'Thing',
    name: 'Assicurazioni PMI Italia',
  },
}

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

// Solo cose che reggono se qualcuno le contesta. Fino al 25/10/2026 qui c'erano
// "+34% di attacchi", "+12% dei premi RC" e una deducibilità "fino al 5‰ del
// fatturato" (che riguarda le spese per il personale, non il fatturato): numeri
// senza fonte o sbagliati, tolti.
const tendenze = [
  { icon: '⚠️', title: 'Polizza catastrofale obbligatoria', desc: `L'obbligo è scattato ${SCADENZE_CATASTROFALE}. Restano fuori ${CHI_E_ESCLUSO}. Per chi non è in regola ${CONSEGUENZA_CATASTROFALE}.` },
  { icon: '🔐', title: 'Cyber e catena di fornitura', desc: 'Il D.Lgs. 138/2024, che recepisce la direttiva NIS2, chiede alle imprese che ricadono nella norma di curare anche la sicurezza dei fornitori. Per chi lavora con loro, misure informatiche e a volte una polizza cyber entrano fra le richieste.' },
  { icon: '📈', title: 'RC impresa da confrontare', desc: 'Per lo stesso rischio le tariffe RC cambiano parecchio da una compagnia all\'altra. Prima del rinnovo conviene confrontarle e rileggere massimali e franchigie.' },
  { icon: '👥', title: 'Welfare aziendale', desc: 'Le polizze sanitarie e infortuni per i dipendenti dentro un piano di welfare hanno un trattamento fiscale agevolato. Il quanto dipende dal piano: va valutato insieme al commercialista.' },
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
                📋 Valori di orientamento FIM — non statistiche ufficiali
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Osservatorio PMI<br />
              <span className="text-accent">Quanto costa assicurare un&apos;impresa</span>
            </h1>
            <p className="text-xl text-white/80 mb-6">
              Ordini di grandezza dei premi per settore e dimensione, per capire da dove partire. Il numero vero per la tua impresa lo dà solo un preventivo.
            </p>
            <p className="text-white/60 text-sm">
              Valori compilati dai broker FIM su profili standard · Testo aggiornato il 25/10/2026
            </p>
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
                Ordine di grandezza del premio annuo per una PMI con 5–20 dipendenti e fatturato tra €300K e €2M, con le coperture più comuni per ogni settore.
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
                * Valori di orientamento FIM su profili standard, non misurati su un campione di contratti. I premi effettivi dipendono da sinistrosità, massimali, franchigie e condizioni delle compagnie: il numero preciso lo dà un preventivo.
              </p>
            </div>

            {/* Benchmark per dimensione */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">
                Spesa per dimensione aziendale
              </h2>
              <p className="text-gray-600 mb-6">
                La spesa cresce con le dimensioni. Conta però anche come è costruito il pacchetto: doppioni e scoperture si trovano in imprese di ogni taglia.
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

            {/* Cosa sta cambiando */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">
                Cosa sta cambiando
              </h2>
              <p className="text-gray-600 mb-6">
                Quattro fattori che pesano oggi sulle scelte assicurative delle PMI italiane.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tendenze.map((trend) => (
                  <div key={trend.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-3xl mb-3">{trend.icon}</div>
                    <h3 className="font-bold text-primary mb-2">{trend.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{trend.desc}</p>
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

            <FaqSection
              items={osservatorioPmiFaq.items}
              cta={osservatorioPmiFaq.cta}
              background="none"
            />

            {/* Methodology note */}
            <div className="bg-gray-100 rounded-2xl p-6 text-sm text-gray-600">
              <h3 className="font-bold text-gray-800 mb-2">Nota metodologica</h3>
              <p className="leading-relaxed mb-2">
                Questi non sono dati statistici. Le fasce di premio sono valori di orientamento che i broker FIM usano su profili standard di impresa: non vengono da un campione di contratti misurato né da statistiche IVASS o ANIA, e non costituiscono un&apos;offerta commerciale.
              </p>
              <p className="leading-relaxed">
                I premi veri dipendono da sinistrosità, massimali, franchigie, ubicazione dei beni e condizioni aggiornate delle compagnie. Per un numero che valga per la tua impresa serve un preventivo, oppure il check-up gratuito delle polizze che hai già.
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
              { href: '/risorse/guida-pmi', label: '📋 Guida PMI', desc: 'La guida completa alle assicurazioni aziendali obbligatorie e consigliate.' },
              { href: '/calcolatore-rischi', label: '📊 Calcolatore del Rischio', desc: 'Valuta il profilo di rischio della tua impresa in 2 minuti.' },
              { href: '/blog/polizze-obbligatorie-aziende-italia-2025', label: '📰 Polizze obbligatorie per le imprese', desc: 'Le assicurazioni che la legge impone alle imprese italiane.' },
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
