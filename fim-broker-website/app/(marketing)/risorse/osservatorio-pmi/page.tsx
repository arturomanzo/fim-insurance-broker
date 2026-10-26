import type { Metadata } from 'next'
import Link from 'next/link'
import FaqSection from '@/components/ui/FaqSection'
import { osservatorioPmiFaq } from '@/lib/faq/osservatorio-pmi'
import { OG_BASE } from '@/lib/seo'
import { SCADENZE_CATASTROFALE, CHI_E_ESCLUSO, CONSEGUENZA_CATASTROFALE } from '@/lib/catastrofale'

export const metadata: Metadata = {
  title: 'Osservatorio PMI Assicurazioni | Cosa pesa sul premio di un\'impresa',
  description:
    'Le coperture che contano per le PMI italiane, settore per settore, e le voci che fanno salire o scendere il premio: RC, all risk, cyber, catastrofale.',
  keywords: [
    'assicurazioni pmi per settore',
    'premio assicurazione impresa',
    'rc impresa cosa copre',
    'assicurazioni artigiani',
    'polizza aziendale preventivo',
    'osservatorio assicurazioni pmi italia',
  ],
  alternates: { canonical: '/risorse/osservatorio-pmi' },
  openGraph: {
    ...OG_BASE,
    url: '/risorse/osservatorio-pmi',
    title: 'Osservatorio PMI Assicurazioni',
    description: 'Le coperture che contano per le PMI italiane, settore per settore, e cosa pesa sul premio.',
    type: 'article',
  },
}

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Report',
  name: 'Osservatorio PMI Assicurazioni',
  description: 'Le coperture che contano per le PMI italiane, settore per settore, e le voci che pesano sul premio.',
  publisher: {
    '@type': 'Organization',
    name: 'FIM Insurance Broker',
    url: 'https://www.fimbroker.it',
  },
  datePublished: '2025-01-15',
  dateModified: '2026-10-26',
  inLanguage: 'it',
  about: {
    '@type': 'Thing',
    name: 'Assicurazioni PMI Italia',
  },
}

// Niente fasce di premio (decisione di Arturo, 26/10/2026): erano valori di
// orientamento, non misurati, e un numero pubblicato si legge come un'offerta.
// Restano le coperture che contano e le voci che muovono il premio.
const sectorData = [
  { sector: 'Edilizia & Costruzioni', coperture: 'RC, CAR, infortuni, postuma', pesa: 'cantieri aperti, subappalti, tipo di lavori', risk: 'alto' },
  { sector: 'Manifatturiero / Industria', coperture: 'RC prodotti, all risk, interruzione di esercizio', pesa: 'valore di impianti e macchinari, mercati di vendita, protezioni antincendio', risk: 'alto' },
  { sector: 'Ristorazione & Hotellerie', coperture: 'RC verso i clienti, incendio, furto', pesa: 'superficie, coperti o camere, impianti di cucina', risk: 'medio' },
  { sector: 'Commercio al Dettaglio', coperture: 'RC, furto, incendio', pesa: 'valore delle merci, zona, sistemi antifurto', risk: 'medio' },
  { sector: 'IT & Servizi Digitali', coperture: 'RC professionale, cyber', pesa: 'dati trattati, clienti serviti, misure di sicurezza', risk: 'medio-alto' },
  { sector: 'Studi Professionali', coperture: 'RC professionale, cyber, tutela legale', pesa: 'categoria, fatturato, massimale, retroattività', risk: 'medio' },
  { sector: 'Trasporti & Logistica', coperture: 'RC vettoriale, flotta, merci trasportate', pesa: 'numero di mezzi, tratte, valore delle merci', risk: 'alto' },
  { sector: 'Sanità & Welfare Privato', coperture: 'RC sanitaria, cyber, tutela legale', pesa: 'specialità, volume di prestazioni, dati sanitari', risk: 'alto' },
]

const sizeData = [
  { size: 'Micro (1–4 dip.)', note: 'RC e tutela di base: spesso basta una multirischio ben costruita.' },
  { size: 'Piccola (5–19 dip.)', note: 'RC, all risk e cyber. Con i dipendenti entrano gli infortuni.' },
  { size: 'Media (20–49 dip.)', note: 'Pacchetto completo: conviene un programma unico con le scadenze allineate.' },
  { size: 'Grande (50–249 dip.)', note: 'Programma integrato, con analisi dei rischi e polizze dedicate.' },
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
                📋 Guida FIM per settore
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Osservatorio PMI<br />
              <span className="text-accent">Cosa pesa sul premio di un&apos;impresa</span>
            </h1>
            <p className="text-xl text-white/80 mb-6">
              Settore per settore, le coperture che contano e le voci che fanno salire o scendere il premio. Il numero per la tua impresa lo dà un preventivo.
            </p>
            <p className="text-white/60 text-sm">
              Compilato dai broker FIM · Testo aggiornato il 26/10/2026
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
                Coperture e premio, settore per settore
              </h2>
              <p className="text-gray-600 mb-6">
                Per una PMI con 5–20 dipendenti: le coperture che contano di più in ogni settore e le voci che la compagnia guarda per calcolare il premio.
              </p>
              <div className="overflow-x-auto rounded-2xl shadow-sm">
                <table className="w-full bg-white text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="text-left px-4 py-3 font-semibold rounded-tl-2xl">Settore</th>
                      <th className="text-left px-4 py-3 font-semibold">Coperture chiave</th>
                      <th className="text-left px-4 py-3 font-semibold">Cosa pesa sul premio</th>
                      <th className="text-left px-4 py-3 font-semibold rounded-tr-2xl">Rischio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectorData.map((row, i) => (
                      <tr key={row.sector} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-semibold text-primary">{row.sector}</td>
                        <td className="px-4 py-3 text-gray-700">{row.coperture}</td>
                        <td className="px-4 py-3 text-gray-600">{row.pesa}</td>
                        <td className="px-4 py-3"><RiskBadge level={row.risk} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-400 text-xs mt-3">
                La catastrofale non è in tabella perché l&apos;obbligo vale in ogni settore, con la sola eccezione delle imprese agricole: ne parliamo più sotto.
              </p>
            </div>

            {/* Benchmark per dimensione */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">
                Cosa cambia con le dimensioni
              </h2>
              <p className="text-gray-600 mb-6">
                Con le dimensioni crescono le coperture da mettere in fila. Conta però anche come è costruito il pacchetto: doppioni e scoperture si trovano in imprese di ogni taglia.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sizeData.map((item) => (
                  <div key={item.size} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="font-bold text-primary mb-2">{item.size}</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{item.note}</div>
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
                Quali coperture servono alla tua impresa?
              </h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Il calcolatore gratuito ti dice in due minuti quali coperture guardare per prime, in base a settore, dimensione e rischi. Nessun impegno.
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
                Qui non trovi prezzi, e non è una dimenticanza. Il premio lo calcola la compagnia sulla singola impresa: una fascia valida per tutte finirebbe per sembrare un&apos;offerta, e non lo è.
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
