import type { Metadata } from 'next'
import Link from 'next/link'
import { reportData } from '@/lib/osservatorio-data'

export const metadata: Metadata = {
  title: 'Osservatorio Prezzi Assicurativi 2025 — Trend e Analisi del Mercato Italiano',
  description:
    'Dati aggiornati sui prezzi delle polizze assicurative in Italia: RC Auto, casa, vita, salute e aziendali. Report trimestrale con trend, variazioni e previsioni. Curato dai broker FIM.',
  openGraph: {
    title: 'Osservatorio Prezzi Assicurativi 2025 — FIM Insurance Broker',
    description: 'Trend aggiornati sui premi assicurativi italiani. RC Auto, casa, vita, salute, aziendali.',
    images: [{ url: '/api/og?title=Osservatorio+Prezzi+2025&tag=FIM+Insurance+Broker&sub=Trend+e+analisi+del+mercato+assicurativo+italiano', width: 1200, height: 630 }],
  },
}

const trendIcon: Record<string, { icon: string; color: string; label: string }> = {
  up: { icon: '↑', color: 'text-red-600', label: 'In aumento' },
  down: { icon: '↓', color: 'text-green-600', label: 'In calo' },
  stable: { icon: '→', color: 'text-amber-600', label: 'Stabile' },
}

function formatChange(change: number) {
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}

export default function OsservatorioPrezziPage() {
  const { categories, regionData, summary, quarter, lastUpdated, methodology } = reportData

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: `Osservatorio Prezzi Assicurativi ${quarter}`,
    description: summary,
    datePublished: new Date(lastUpdated).toISOString(),
    dateModified: new Date(lastUpdated).toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'FIM Insurance Broker',
      url: 'https://www.fimbroker.it',
    },
    about: { '@type': 'Thing', name: 'Mercato assicurativo italiano' },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="gradient-primary py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            📊 Report {quarter}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Osservatorio Prezzi<br className="hidden sm:block" /> Assicurativi Italia
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-6">{summary}</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
            <span>
              🗓️ Aggiornato al{' '}
              {new Date(lastUpdated).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span>🔄 Aggiornamento trimestrale</span>
            <span>📋 Fonte: IVASS, ANIA, dati FIM</span>
          </div>
        </div>
      </section>

      {/* Price cards */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">Premi medi per categoria</h2>
            <p className="text-gray-500 text-sm">Variazione rispetto al trimestre precedente</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const t = trendIcon[cat.trend]
              return (
                <div key={cat.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{cat.icon}</span>
                      <h3 className="font-bold text-primary">{cat.name}</h3>
                    </div>
                    <span className={`text-sm font-bold ${t.color}`}>
                      {t.icon} {formatChange(cat.change)}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-black text-primary">
                      {cat.avgPremium.toLocaleString('it-IT')}€
                      <span className="text-gray-400 text-base font-normal">
                        /{'priceUnit' in cat && cat.priceUnit ? cat.priceUnit.replace('€/', '') : 'anno'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Media mercato italiano • range {cat.priceRange.min.toLocaleString('it-IT')}–
                      {cat.priceRange.max.toLocaleString('it-IT')}€
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{cat.insight}</p>
                  <div className="space-y-1">
                    {cat.factors.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            ⚠️ Premi indicativi. Il premio effettivo dipende dal profilo individuale del cliente (art. 1882 c.c., D.Lgs. 209/2005).
          </p>
        </div>
      </section>

      {/* Regional data */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">RC Auto per regione</h2>
            <p className="text-gray-500 text-sm">
              Premio medio annuo per profilo standard (30 anni, berlina, città media)
            </p>
          </div>
          <div className="space-y-3">
            {regionData.map((r) => {
              const maxVal = Math.max(...regionData.map((x) => x.rcAuto))
              const pct = (r.rcAuto / maxVal) * 100
              const t = trendIcon[r.trend]
              return (
                <div key={r.region} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-primary w-24">{r.region}</span>
                      <span className={`text-xs font-semibold ${t.color}`}>
                        {t.icon} {t.label}
                      </span>
                    </div>
                    <span className="font-black text-primary">{r.rcAuto}€/anno</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-gray-500">{r.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
              <span>📋</span> Metodologia e fonti
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{methodology}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {['IVASS', 'ANIA', 'Dati FIM proprietari', 'Eurostat'].map((src) => (
                <span key={src} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {src}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-14">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Stai pagando il giusto?</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm">
            Confronta il tuo premio attuale con i dati dell&apos;Osservatorio. I nostri broker analizzano la tua polizza
            gratuitamente e, se puoi risparmiare, ti dicono quanto e come.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/preventivo" className="btn-primary bg-accent hover:bg-accent-dark text-primary font-bold px-6 py-4">
              Confronta il mio premio →
            </Link>
            <a href="tel:+390696883381" className="btn-outline-white px-6 py-4">
              📞 06 96883381
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
