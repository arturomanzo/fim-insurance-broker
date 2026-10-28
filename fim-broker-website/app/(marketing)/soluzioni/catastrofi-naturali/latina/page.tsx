import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { catastrofaleLatinaFaq } from '@/lib/faq/catastrofale-latina'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { OG_BASE } from '@/lib/seo'
import { notaPremio } from '@/lib/prezzi'
import { linkWhatsApp } from '@/lib/whatsappSito'
import { NORMA_CATASTROFALE, CHI_E_OBBLIGATO, BENI_DA_ASSICURARE, EVENTI_CATASTROFALI, CONSEGUENZA_CATASTROFALE } from '@/lib/catastrofale'
import { COMUNI_LATINA, PROVINCIA_LATINA, LAZIO, FONTE_RISCHIO_LATINA, piuEsposti, percentuale } from '@/lib/rischioLatina'

// Pagina P4 del piano SEO (marketing/seo nel gestionale). I numeri vengono tutti
// da lib/rischioLatina.ts (ISPRA IdroGEO, Edizione 2024): non scriverne a mano
// nel testo. Niente prezzi, niente zona sismica (IdroGEO non la misura).

const SLUG = 'soluzioni/catastrofi-naturali/latina'
const PREVENTIVO_QS = '?profilo=pmi&settore=Polizza+Catastrofale'
const OG_IMAGE =
  '/api/og?title=Polizza+catastrofale+in+provincia+di+Latina&tag=Soluzioni&sub=Alluvioni+e+frane+comune+per+comune%2C+dati+ISPRA.'

export const metadata: Metadata = {
  title: 'Polizza catastrofale a Latina: alluvioni e frane comune per comune',
  description:
    'Il rischio di alluvioni e frane nei 33 comuni della provincia di Latina letto sui dati ISPRA, l\'obbligo catastrofale per le imprese e cosa controllare nella polizza di capannoni, negozi e strutture ricettive.',
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    ...OG_BASE,
    url: `/${SLUG}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { images: [OG_IMAGE] },
}

const elenco = (comuni: { nome: string }[]) => comuni.map((c) => c.nome).join(', ')

const evidenze = [
  {
    icon: '🌊',
    title: 'Alluvioni poco frequenti (P2)',
    comuni: piuEsposti('alluvioneP2'),
    campo: 'alluvioneP2' as const,
    nota: 'Tempo di ritorno fra 100 e 200 anni.',
  },
  {
    icon: '🌧️',
    title: 'Eventi estremi (P1)',
    comuni: piuEsposti('alluvioneP1'),
    campo: 'alluvioneP1' as const,
    nota: 'Lo scenario raro: quello per cui si compra una polizza.',
  },
  {
    icon: '🪨',
    title: 'Frane, pericolosità elevata o molto elevata',
    comuni: piuEsposti('franaP3P4'),
    campo: 'franaP3P4' as const,
    nota: 'Colline e isole.',
  },
]

const esempi = [
  {
    icon: '🏭',
    title: 'Il capannone in zona industriale',
    luogo: 'Aprilia, Cisterna, Latina',
    desc: 'L\'obbligo c\'è, qualunque sia il comune. Guardiamo che fabbricato, impianti e macchinari siano assicurati per quanto costerebbe rifarli, e che la polizza nomini davvero tutti gli eventi della legge, terremoto compreso.',
  },
  {
    icon: '🏪',
    title: 'Il negozio in pianura',
    luogo: 'Terracina, Fondi, Sezze',
    desc: 'Le aree allagabili poco frequenti sono piccole, quelle dello scenario estremo molto più larghe. Qui contano la merce in magazzino, gli arredi e il fermo dell\'attività: sono le voci che una polizza minima spesso lascia fuori.',
  },
  {
    icon: '🏖️',
    title: 'La struttura ricettiva sulla costa',
    luogo: 'Sperlonga, San Felice Circeo, Ponza',
    desc: 'Acqua da una parte, frana dall\'altra. Guardiamo franchigie e limiti di indennizzo per evento, e se la polizza paga anche le settimane in cui la struttura resta chiusa.',
  },
]

const steps = [
  {
    n: '1',
    title: 'Partiamo dall\'indirizzo',
    desc: 'Ci dici dove sono i beni. Guardiamo le mappe ISPRA del tuo comune e la zona del tuo immobile, non la media della provincia.',
  },
  {
    n: '2',
    title: 'Leggiamo le polizze che hai',
    desc: 'Incendio, multirischio, polizza casa: vediamo quali eventi sono già coperti, con quali franchigie, e dove ci sono buchi o doppioni.',
  },
  {
    n: '3',
    title: 'Proposta e confronto',
    desc: 'Ti diciamo cosa serve e confrontiamo le condizioni delle compagnie con cui lavoriamo. La scelta resta tua.',
  },
]

export default function CatastrofaleLatinaPage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Catastrofi Naturali', href: '/soluzioni/catastrofi-naturali' },
          { name: 'Provincia di Latina', href: `/${SLUG}` },
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
            <Link href="/soluzioni/catastrofi-naturali" className="hover:text-white transition-colors">Catastrofi Naturali</Link>
            <span>/</span>
            <span className="text-white/80">Provincia di Latina</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🗺️ {COMUNI_LATINA.length} comuni, dati ISPRA
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Polizza catastrofale in provincia di Latina:<br />
              <span className="text-accent">il rischio comune per comune</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Prima di parlare di polizza conviene sapere dove l&apos;acqua può arrivare e dove la collina può scendere.
              Le mappe ufficiali di ISPRA lo dicono per ogni comune: le abbiamo messe in una tabella sola.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preventivo${PREVENTIVO_QS}`} className="btn-primary text-lg px-8 py-4">
                Richiedi un preventivo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href={linkWhatsApp('Buongiorno, vorrei verificare la copertura catastrofale per un immobile in provincia di Latina', `/${SLUG}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white text-lg px-8 py-4"
              >
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cosa dicono i numeri */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Cosa dicono i numeri
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              La provincia in tre righe
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              In provincia vive in area allagabile con alluvioni poco frequenti il {percentuale(PROVINCIA_LATINA.alluvioneP2)} dei residenti,
              contro il {percentuale(LAZIO.alluvioneP2)} del Lazio. Nello scenario estremo si sale al {percentuale(PROVINCIA_LATINA.alluvioneP1)}.
              Le sedi d&apos;impresa in area allagabile poco frequente sono {PROVINCIA_LATINA.impreseP2.toLocaleString('it-IT')},
              quelle in area a frana elevata o molto elevata {PROVINCIA_LATINA.impreseFrana.toLocaleString('it-IT')}.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {evidenze.map((e) => (
              <Card key={e.title} className="flex flex-col">
                <span className="text-3xl mb-3 block">{e.icon}</span>
                <h3 className="font-bold text-primary mb-3">{e.title}</h3>
                <ul className="space-y-2 flex-1">
                  {e.comuni.map((c) => (
                    <li key={c.nome} className="flex justify-between gap-3 text-sm">
                      <span className="text-gray-700">{c.nome}</span>
                      <span className="font-bold text-primary">{percentuale(c[e.campo])}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-4">{e.nota} Percentuale dei residenti.</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabella comuni */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Tutti i comuni
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Il tuo comune, in percentuale di residenti esposti
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Gli scenari di alluvione sono quelli dell&apos;art. 6 del D.Lgs. 49/2010: P3 frequenti (ritorno fra 20 e 50 anni),
              P2 poco frequenti (fra 100 e 200 anni), P1 eventi rari o estremi. Le frane contano le aree a pericolosità elevata e molto elevata.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <caption className="sr-only">
                Residenti esposti ad alluvioni e frane nei comuni della provincia di Latina, fonte ISPRA
              </caption>
              <thead className="bg-primary text-white">
                <tr>
                  <th scope="col" className="text-left font-semibold px-4 py-3">Comune</th>
                  <th scope="col" className="text-right font-semibold px-4 py-3">Alluvione P3</th>
                  <th scope="col" className="text-right font-semibold px-4 py-3">Alluvione P2</th>
                  <th scope="col" className="text-right font-semibold px-4 py-3">Alluvione P1</th>
                  <th scope="col" className="text-right font-semibold px-4 py-3">Frana P3-P4</th>
                  <th scope="col" className="text-right font-semibold px-4 py-3">Imprese in P2</th>
                </tr>
              </thead>
              <tbody>
                {COMUNI_LATINA.map((c) => (
                  <tr key={c.nome} className="border-t border-gray-100 even:bg-gray-50">
                    <th scope="row" className="text-left font-medium text-primary px-4 py-2 whitespace-nowrap">{c.nome}</th>
                    <td className="text-right px-4 py-2 tabular-nums">{percentuale(c.alluvioneP3)}</td>
                    <td className="text-right px-4 py-2 tabular-nums">{percentuale(c.alluvioneP2)}</td>
                    <td className="text-right px-4 py-2 tabular-nums">{percentuale(c.alluvioneP1)}</td>
                    <td className="text-right px-4 py-2 tabular-nums">{percentuale(c.franaP3P4)}</td>
                    <td className="text-right px-4 py-2 tabular-nums">{c.impreseP2.toLocaleString('it-IT')}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-gray-200 font-semibold">
                <tr>
                  <th scope="row" className="text-left px-4 py-2">Provincia</th>
                  <td className="text-right px-4 py-2 tabular-nums">{percentuale(PROVINCIA_LATINA.alluvioneP3)}</td>
                  <td className="text-right px-4 py-2 tabular-nums">{percentuale(PROVINCIA_LATINA.alluvioneP2)}</td>
                  <td className="text-right px-4 py-2 tabular-nums">{percentuale(PROVINCIA_LATINA.alluvioneP1)}</td>
                  <td className="text-right px-4 py-2 tabular-nums">{percentuale(PROVINCIA_LATINA.franaP3P4)}</td>
                  <td className="text-right px-4 py-2 tabular-nums">{PROVINCIA_LATINA.impreseP2.toLocaleString('it-IT')}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            Fonte: {FONTE_RISCHIO_LATINA}. Le percentuali sono calcolate da ISPRA sui residenti del censimento ISTAT; le imprese sono unità locali.
            Uno zero vuol dire che le mappe ufficiali non segnano residenti in quelle aree, non che il rischio non esista.
            Le mappe complete, indirizzo per indirizzo, sono su{' '}
            <a href="https://idrogeo.isprambiente.it" target="_blank" rel="noopener noreferrer" className="text-primary underline">idrogeo.isprambiente.it</a>.
          </p>
        </div>
      </section>

      {/* Come si leggono */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-6">Come leggere la tabella senza farsi fregare dalla media</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Guarda la differenza fra P2 e P1. In pianura lo scenario estremo allarga di molto le aree allagabili:
              {elenco(piuEsposti('alluvioneP1'))} sono i casi più forti. Vuol dire che l&apos;evento è raro, non impossibile.
              E una polizza si compra per l&apos;evento raro: quello che capita ogni pochi anni lo conosci già, e di solito hai già spostato la merce.
            </p>
            <p>
              Sulle colline e sulle isole il problema è un altro. A {elenco(piuEsposti('franaP3P4'))} pesano le frane più delle alluvioni,
              e le polizze le trattano con franchigie e limiti propri.
            </p>
            <p>
              Il terremoto qui non c&apos;è, perché IdroGEO non lo misura: la zona sismica di ogni comune la stabilisce la Regione Lazio.
              Non vuol dire che si possa saltare. Per le imprese è dentro l&apos;obbligo, per la casa è una garanzia da chiedere.
            </p>
          </div>
        </div>
      </section>

      {/* Obbligo imprese */}
      <section className="bg-red-50 border-y border-red-200 py-10">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-black text-red-800 mb-3">Se hai un&apos;impresa, la polizza non è una scelta</h2>
          <p className="text-red-900/80 leading-relaxed">
            La {NORMA_CATASTROFALE} obbliga {CHI_E_OBBLIGATO} ad assicurare {BENI_DA_ASSICURARE} contro {EVENTI_CATASTROFALI}.
            Vale in tutti i {COMUNI_LATINA.length} comuni, anche dove la tabella segna zero. Per chi non è in regola {CONSEGUENZA_CATASTROFALE}.{' '}
            <Link href="/blog/polizza-catastrofale-obbligatoria-imprese-2025" className="underline font-semibold">Chi è obbligato e chi è escluso</Link>.
          </p>
        </div>
      </section>

      {/* Esempi */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Esempi
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Tre casi tipici in provincia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Situazioni costruite a titolo di esempio, non casi di clienti: servono a mostrare cosa guardiamo quando leggiamo una polizza.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {esempi.map((e) => (
              <Card key={e.title} className="flex flex-col">
                <span className="text-3xl mb-3 block">{e.icon}</span>
                <h3 className="font-bold text-primary mb-1">{e.title}</h3>
                <p className="text-xs font-semibold text-accent mb-3">{e.luogo}</p>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{e.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            {notaPremio('indirizzo dei beni, valori da assicurare, eventi scelti, franchigie e limiti di indennizzo')}
          </p>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Come lavoriamo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Siamo a Cisterna di Latina: questi comuni li giriamo per lavoro.{' '}
              <Link href="/broker-assicurativo-latina" className="text-primary underline">Il broker in provincia di Latina</Link>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <Card key={s.n}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-black mb-4">
                  {s.n}
                </span>
                <h3 className="font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        title="Domande frequenti — Catastrofale in provincia di Latina"
        items={catastrofaleLatinaFaq.items}
        cta={catastrofaleLatinaFaq.cta}
      />

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Il momento giusto è prima della pioggia
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Mandaci le polizze che hai e l&apos;indirizzo dei beni. La lettura è gratuita: il nostro compenso arriva dalle compagnie, solo se scegli di assicurarti con noi.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/preventivo${PREVENTIVO_QS}`} className="btn-primary text-lg px-8 py-4">
              Richiedi un preventivo
            </Link>
            <Link href="/soluzioni/catastrofi-naturali" className="btn-outline-white text-lg px-8 py-4">
              Tutte le coperture catastrofali
            </Link>
          </div>
        </div>
      </section>

      {/* Informativa */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container-custom max-w-4xl">
          <p className="text-xs text-gray-500 leading-relaxed">
            FIM Insurance Broker S.a.s. di Manzo Arturo &amp; C., Via Roma 41, 04012 Cisterna di Latina (LT), è iscritta
            al Registro Unico degli Intermediari assicurativi e riassicurativi, Sezione B, al n. B000405449, ed è soggetta
            alla vigilanza dell&apos;IVASS (<a href="https://www.ivass.it" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.ivass.it</a>). Il compenso dell&apos;intermediario è costituito dalle provvigioni corrisposte
            dalle imprese di assicurazione, comprese nel premio. Prima della sottoscrizione leggere la documentazione
            precontrattuale.{' '}
            <Link href="/trasparenza" className="text-primary underline">Informativa precontrattuale</Link> ·{' '}
            <Link href="/privacy-policy" className="text-primary underline">Privacy</Link> ·{' '}
            <Link href="/reclami" className="text-primary underline">Reclami</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
