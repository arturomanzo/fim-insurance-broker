import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { stabilimentiBalneariFaq } from '@/lib/faq/stabilimenti-balneari'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { OG_BASE } from '@/lib/seo'
import { notaPremio } from '@/lib/prezzi'
import { linkWhatsApp } from '@/lib/whatsappSito'

// Pagina P17 del piano SEO (marketing/seo nel gestionale). Niente prezzi,
// niente obblighi di legge generici sulla RC (li fissano concessione e regole
// locali) e niente promesse sulle parametriche: non tutte le compagnie le offrono.

const SLUG = 'soluzioni/stabilimenti-balneari'
const PREVENTIVO_QS = '?profilo=pmi'
const OG_IMAGE =
  '/api/og?title=Stabilimenti+balneari&tag=Soluzioni&sub=RCT+e+RCO%2C+mareggiate%2C+strutture+e+stagione.'

export const metadata: Metadata = {
  title: 'Assicurazione stabilimento balneare: RC, mareggiate e strutture',
  description:
    'Polizze per stabilimenti balneari e lidi: RC verso bagnanti e dipendenti, strutture in spiaggia, mareggiate ed eventi atmosferici, bar e ristorazione, polizze parametriche sul meteo. Analisi delle polizze in corso.',
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    ...OG_BASE,
    url: `/${SLUG}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { images: [OG_IMAGE] },
}

const painPoints = [
  { icon: '🩼', title: 'Il bagnante che si fa male', desc: 'Una passerella bagnata, un ombrellone che vola con il vento, un lettino che cede. La richiesta di danni arriva al gestore.' },
  { icon: '🌊', title: 'La mareggiata d\'inverno', desc: 'Arriva quando lo stabilimento è chiuso e si porta via passerelle, cabine e pedane. Molte polizze la escludono.' },
  { icon: '🛟', title: 'Bagnini e stagionali', desc: 'Personale che cambia ogni estate, contratti brevi, lavoro in acqua. Un infortunio grave può finire in una causa contro di te.' },
  { icon: '🌧️', title: 'L\'estate che non arriva', desc: 'Un giugno di pioggia pesa sull\'incasso dell\'anno. Le spese fisse restano uguali.' },
]

const coverages = [
  {
    icon: '🤝',
    title: 'RC verso terzi (RCT)',
    desc: 'Danni a bagnanti e clienti: cadute, oggetti che volano, incidenti in acqua nella zona sorvegliata. Va controllato che copra tutte le attività, dal noleggio pedalò all\'animazione.',
    highlighted: true,
  },
  {
    icon: '🛟',
    title: 'RC verso i dipendenti (RCO)',
    desc: 'Copre le richieste di danni di bagnini e personale e la rivalsa dell\'INAIL. Deve comprendere stagionali e contratti brevi.',
    highlighted: false,
  },
  {
    icon: '🏖️',
    title: 'Strutture ed eventi atmosferici',
    desc: 'Cabine, chioschi, passerelle e impianti contro incendio, vento e mareggiate. Qui contano le esclusioni sui beni all\'aperto e i limiti per evento.',
    highlighted: false,
  },
  {
    icon: '🔒',
    title: 'Furto e attrezzature',
    desc: 'Lettini, ombrelloni, pedalò, impianti del bar. Con le condizioni di custodia scritte in modo che si possano rispettare davvero in spiaggia.',
    highlighted: false,
  },
  {
    icon: '🍹',
    title: 'Bar e ristorazione',
    desc: 'RC per i prodotti somministrati, per esempio un\'intossicazione alimentare, e danni alle attrezzature della cucina.',
    highlighted: false,
  },
  {
    icon: '☔',
    title: 'Polizza parametrica sul meteo',
    desc: 'Paga un importo stabilito prima quando si supera una soglia misurata, come i giorni di pioggia in stagione. Protegge l\'incasso; non tutte le compagnie la offrono.',
    highlighted: false,
  },
]

const steps = [
  {
    n: '1',
    title: 'Leggiamo concessione e polizze',
    desc: 'Ci mandi l\'atto di concessione e le polizze in corso. Verifichiamo cosa chiedono i documenti e cosa copre davvero quello che paghi.',
  },
  {
    n: '2',
    title: 'Cerchiamo le clausole da spiaggia',
    desc: 'Mareggiate, beni all\'aperto, stagionali, attività accessorie: i punti dove una polizza pensata per un negozio non regge.',
  },
  {
    n: '3',
    title: 'Proposta e confronto',
    desc: 'Ti diciamo cosa tenere e cosa cambiare, e confrontiamo le proposte delle compagnie con cui lavoriamo. La scelta resta tua.',
  },
]

export default function StabilimentiBalneariPage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Stabilimenti balneari', href: `/${SLUG}` },
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
            <span className="text-white/80">Stabilimenti balneari</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🏖️ Stabilimenti balneari, lidi e chioschi
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              In spiaggia il rischio<br />
              <span className="text-accent">non va in ferie</span> a settembre
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              D&apos;estate ci sono bagnanti, bagnini e il bar pieno. D&apos;inverno le mareggiate arrivano sulle strutture rimaste in spiaggia.
              Su uno stabilimento le polizze pensate per un negozio lasciano buchi proprio dove serve: leggiamo le tue e ti diciamo dove sono.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preventivo${PREVENTIVO_QS}`} className="btn-primary text-lg px-8 py-4">
                Richiedi un preventivo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href={linkWhatsApp('Buongiorno, ho uno stabilimento balneare e vorrei far controllare le polizze', `/${SLUG}`)}
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

      {/* Pain points */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-50 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              I rischi del lido
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Quattro conti che possono arrivare
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Due d&apos;estate, uno d&apos;inverno, uno che dipende dal cielo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {painPoints.map((p) => (
              <Card key={p.title} className="border-l-4 border-l-red-400">
                <span className="text-3xl mb-3 block">{p.icon}</span>
                <h3 className="font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverages */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Coperture
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Le polizze di uno stabilimento
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Non servono tutte a tutti. Dipende da cosa c&apos;è in concessione, da cosa resta montato d&apos;inverno e da quanti servizi offri.
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
                  {cov.highlighted && <span className="ml-2 text-xs bg-accent-cta text-white px-2 py-0.5 rounded-full align-middle">Da avere</span>}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{cov.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            {notaPremio('dimensione e posizione dello stabilimento, strutture fisse, servizi offerti, numero di addetti e garanzie scelte')}
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

      {/* Esempio: scenario illustrativo, non il caso di un cliente */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Esempio
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
              Mareggiata a novembre: cosa decide se la polizza paga
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Prendiamo uno stabilimento sul litorale pontino. A novembre una mareggiata porta via un tratto di passerella e danneggia due file di cabine rimaste montate. Il gestore ha una polizza incendio con gli eventi atmosferici e pensa di essere a posto.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Se ci sia un risarcimento, e quanto, lo dicono le condizioni. Sono quelle che leggiamo prima della firma:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                  <li>se la mareggiata è nominata tra gli eventi coperti o tra le esclusioni;</li>
                  <li>se i beni all&apos;aperto, come passerelle e pedane, sono assicurati o restano fuori;</li>
                  <li>quale limite di indennizzo vale per evento e quale franchigia;</li>
                  <li>se la copertura vale anche nei mesi di chiusura.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Il punto
                </p>
                <p className="text-lg font-bold text-white leading-snug">
                  Su uno stabilimento la parola da cercare in polizza è &laquo;mareggiata&raquo;. Se non c&apos;è, o sta tra le esclusioni, la passerella la ricompri tu.
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Cosa facciamo noi
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Leggiamo le condizioni prima dell&apos;inverno, non dopo. Se il danno arriva, prepariamo la denuncia con te e la seguiamo con la compagnia.
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
        title="Domande frequenti — Stabilimenti balneari"
        items={stabilimentiBalneariFaq.items}
        cta={stabilimentiBalneariFaq.cta}
      />

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            La prossima stagione parte d&apos;inverno
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Mandaci concessione e polizze in corso. La lettura è gratuita: il nostro compenso arriva dalle compagnie, solo se scegli di assicurarti con noi.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/preventivo${PREVENTIVO_QS}`} className="btn-primary text-lg px-8 py-4">
              Richiedi un preventivo
            </Link>
            <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
              📞 06 96883381
            </a>
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
