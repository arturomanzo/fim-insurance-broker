import type { Metadata } from 'next'
import Link from 'next/link'
import { altriRami, ivassLatina, ivassRcAuto } from '@/lib/osservatorio-data'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { OG_BASE } from '@/lib/seo'

// Dal 01/11/2026 l'unica cifra della pagina è quella IVASS sulla RC auto, con
// fonte e periodo accanto (vedi lib/osservatorio-data.ts). Anno e periodo nel
// titolo vengono dal dato: quando si aggiorna il dato, seguono da soli.
const { anno, periodo } = ivassRcAuto

export const metadata: Metadata = {
  title: `Osservatorio Prezzi Assicurativi ${anno} — RC auto secondo IVASS e cosa pesa sugli altri premi`,
  description: `Il prezzo medio della RC auto in Italia secondo l'indagine IPER di IVASS (${periodo}) e, per casa, salute, vita, RC professionale e aziende, da cosa dipende il premio.`,
  alternates: { canonical: '/osservatorio-prezzi' },
  openGraph: {
    ...OG_BASE,
    url: '/osservatorio-prezzi',
    title: `Osservatorio Prezzi Assicurativi ${anno} — FIM Insurance Broker`,
    description: `Prezzo medio RC auto secondo IVASS (${periodo}) e da cosa dipendono gli altri premi.`,
    images: [{ url: `/api/og?title=Osservatorio+Prezzi+${anno}&tag=FIM+Insurance+Broker&sub=RC+auto+secondo+IVASS+e+cosa+pesa+sugli+altri+premi`, width: 1200, height: 630 }],
  },
}

const fmtPerc = (n: number) => `${n > 0 ? '+' : ''}${n.toLocaleString('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`
const fmtEuro = (n: number) => n.toLocaleString('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const fmtData = (iso: string) => new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })

export default function OsservatorioPrezziPage() {
  const r = ivassRcAuto
  const direzioneAnno = r.variazioneAnnua > 0 ? 'in aumento' : r.variazioneAnnua < 0 ? 'in calo' : 'invariato'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: `Osservatorio Prezzi Assicurativi ${anno}`,
    description: `Prezzo medio della RC auto secondo IVASS (${periodo}) e fattori che determinano gli altri premi.`,
    datePublished: '2026-11-01',
    dateModified: '2026-11-01',
    publisher: { '@type': 'Organization', name: 'FIM Insurance Broker', url: 'https://www.fimbroker.it' },
    citation: r.url,
    about: { '@type': 'Thing', name: 'Prezzi delle assicurazioni in Italia' },
  }

  return (
    <div>
      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Osservatorio Prezzi', href: '/osservatorio-prezzi' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="gradient-primary py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            📊 Dati IVASS, {periodo}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Osservatorio Prezzi<br className="hidden sm:block" /> Assicurativi Italia
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Quanto costa davvero la RC auto lo misura IVASS, e qui trovi il suo dato. Per gli altri rami una media
            nazionale non esiste, e ti diciamo da cosa dipende il premio.
          </p>
        </div>
      </section>

      {/* RC auto: il dato IVASS */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚗</span>
              <h2 className="text-2xl font-black text-primary">RC auto: il prezzo medio in Italia</h2>
            </div>
            <div className="text-5xl font-black text-primary mb-1">
              {r.prezzoMedio} €
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Prezzo medio della garanzia RC auto delle autovetture, {periodo}. Fonte: {r.fonte}, pubblicata il{' '}
              {fmtData(r.pubblicata)}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xl font-black text-primary">{fmtPerc(r.variazioneAnnua)}</div>
                <div className="text-xs text-gray-500">su un anno prima</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xl font-black text-primary">{fmtPerc(r.variazioneTrimestre)}</div>
                <div className="text-xs text-gray-500">sul trimestre prima</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xl font-black text-primary">{r.medianaProvince} €</div>
                <div className="text-xs text-gray-500">metà delle province sta sopra</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Secondo i dati IVASS il prezzo medio è {direzioneAnno} su un anno, e tra una provincia e l&apos;altra la
              differenza resta forte: nel quarto di province più care si superano i {r.quartileAlto} euro.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              È una media sui contratti delle autovetture rilevati da IVASS. Il tuo premio dipende da classe di merito, età, zona, veicolo e
              garanzie scelte, e può stare parecchio sopra o sotto. Se vuoi sapere dove sta il tuo, mandaci la polizza
              in corso.{' '}
              <a href={r.url} className="text-accent-cta font-semibold underline" target="_blank" rel="noopener noreferrer">
                Leggi il report IVASS
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Provincia di Latina: tavole IVASS */}
      <LatinaSezione />

      {/* Altri rami: senza cifre */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">Gli altri rami: da cosa dipende il premio</h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Per casa, salute, vita, RC professionale e aziende non c&apos;è una media nazionale pubblica sul premio
              pagato, e un numero inventato ti porterebbe fuori strada. Ecco cosa guarda la compagnia quando lo calcola.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {altriRami.map((ramo) => (
              <div key={ramo.name} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{ramo.icon}</span>
                  <h3 className="font-bold text-primary">{ramo.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{ramo.testo}</p>
                <div className="space-y-1 mb-4">
                  {ramo.fattori.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href={ramo.href} className="text-accent-cta font-semibold text-sm underline">
                  Vai alla pagina →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metodo */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
              <span>📋</span> Da dove vengono questi numeri
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              L&apos;unica cifra di questa pagina è quella di IVASS: l&apos;indagine IPER rileva ogni trimestre i prezzi
              effettivamente pagati per la RC auto su un campione di contratti, e li pubblica tra le comunicazioni
              statistiche. Noi la riportiamo con la fonte e il periodo, e la aggiorniamo quando esce quella nuova. Per
              gli altri rami non pubblichiamo medie: non c&apos;è una fonte ufficiale sul premio per contratto, e il nostro
              portafoglio è troppo piccolo per dirne una che valga per tutti.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              Per un numero che vale per te, il preventivo è gratuito:{' '}
              <Link href="/preventivo" className="text-accent-cta font-semibold underline">richiedilo qui</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-14">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Vuoi capire dove sta il tuo premio?</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm">
            Mandaci la polizza in corso: la leggiamo, ti diciamo cosa copre davvero e se ci sono voci da rivedere.
            L&apos;analisi è gratuita.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/analizza-polizza" className="btn-primary bg-accent hover:bg-accent-dark text-primary font-bold px-6 py-4">
              Fai analizzare la polizza →
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

function LatinaSezione() {
  const l = ivassLatina
  const differenza = Math.round(l.media - l.mediaItalia)
  const massimo = Math.max(...l.lazio.map((p) => p.media))
  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-primary mb-2">E in provincia di Latina?</h2>
          <p className="text-gray-500 text-sm">
            Autovetture, {l.periodo}. Fonte: {l.fonte}.
          </p>
        </div>
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8 mb-6">
          <div className="text-4xl font-black text-primary mb-1">{fmtEuro(l.media)} €</div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Secondo le tavole IVASS è il premio medio RC auto in provincia di Latina, su {l.contratti.toLocaleString('it-IT')}{' '}
            contratti: {differenza} euro sopra la media nazionale di {fmtEuro(l.mediaItalia)} euro, {fmtPerc(l.variazioneAnnua)}{' '}
            su un anno. Latina è {l.posizione}ª su {l.province} province per premio medio, dalla più cara.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-primary mb-3">Le province del Lazio</h3>
            <div className="space-y-2">
              {l.lazio.map((p) => (
                <div key={p.provincia} className={`rounded-xl p-3 ${p.provincia === 'Latina' ? 'bg-accent/10' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-semibold text-primary">{p.provincia}</span>
                    <span className="font-bold text-primary tabular-nums">{fmtEuro(p.media)} €</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${(p.media / massimo) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-primary mb-3">Latina, per età di chi assicura</h3>
            <div className="space-y-2">
              {l.perEta.map((e) => (
                <div key={e.classe} className="flex items-center justify-between bg-gray-50 rounded-xl p-3 text-sm">
                  <span className="text-gray-600">{e.classe}</span>
                  <span className="font-bold text-primary tabular-nums">{fmtEuro(e.media)} €</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Sono medie: a parità di età contano classe di merito, veicolo, comune e garanzie.{' '}
              <a href={l.url} className="text-accent-cta underline" target="_blank" rel="noopener noreferrer">Tavole IVASS</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
