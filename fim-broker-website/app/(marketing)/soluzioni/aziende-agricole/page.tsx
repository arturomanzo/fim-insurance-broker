import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { aziendeAgricoleFaq } from '@/lib/faq/aziende-agricole'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { OG_BASE } from '@/lib/seo'
import { notaPremio } from '@/lib/prezzi'
import { linkWhatsApp } from '@/lib/whatsappSito'

// Pagina P15 del piano SEO (marketing/seo nel gestionale). Sul raccolto FIM colloca
// polizze private, non quelle agevolate con contributo pubblico (Arturo, 31/10/2026):
// la pagina ne parla senza contributi, consorzi di difesa né piani assicurativi. Norme lette su normattiva il 31/10/2026: L. 213/2023, art. 1, c. 111;
// L. 234/2021, art. 1, c. 515; art. 2135 c.c.; artt. 122 e 122-bis CAP.

const SLUG = 'soluzioni/aziende-agricole'
const PREVENTIVO_QS = '?profilo=pmi'
const OG_IMAGE =
  '/api/og?title=Aziende+agricole&tag=Soluzioni&sub=Serre%2C+fabbricati%2C+mezzi+e+responsabilit%C3%A0+civile.'

export const metadata: Metadata = {
  title: 'Assicurazione azienda agricola: serre, fabbricati, mezzi e RC',
  description:
    "Polizze per aziende agricole e agriturismi: serre e strutture, fabbricati e macchinari, trattori e mezzi agricoli, RC verso terzi e verso i braccianti. Perché l'obbligo catastrofale non vale per le imprese agricole e cosa resta scoperto.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    ...OG_BASE,
    url: `/${SLUG}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { images: [OG_IMAGE] },
}

const painPoints = [
  { icon: '🌨️', title: 'La grandinata sulle serre', desc: 'Dieci minuti di ghiaccio e i teli sono da rifare, con le piantine sotto. Molte polizze trattano le serre come beni a parte, o non le coprono.' },
  { icon: '🚜', title: 'Il trattore che esce dal fondo', desc: 'Basta un tratto di strada provinciale tra due appezzamenti. Senza la RC giusta, il danno a chi passa lo paghi tu.' },
  { icon: '🌊', title: "L'alluvione sul capannone", desc: "Per le imprese agricole l'obbligo catastrofale non c'è. Il rischio sì: fabbricati e macchinari restano scoperti se non li assicuri tu." },
  { icon: '👷', title: 'Il bracciante che si fa male', desc: 'Personale stagionale, mezzi, attrezzi. Un infortunio grave può diventare una causa contro di te.' },
]

const coverages = [
  {
    icon: '🤝',
    title: 'RC conduzione dell\'azienda',
    desc: 'Danni a terzi dall\'attività agricola: animali che escono dal recinto, rami che cadono sulla strada, trattamenti che finiscono sul campo del vicino.',
    highlighted: true,
  },
  {
    icon: '👷',
    title: 'RC verso i dipendenti (RCO)',
    desc: 'Copre le richieste di danni dei lavoratori e la rivalsa dell\'INAIL. Deve comprendere braccianti e stagionali.',
    highlighted: false,
  },
  {
    icon: '🏡',
    title: 'Serre e strutture',
    desc: 'Serre, tunnel, ombreggianti, impianti di irrigazione contro grandine, vento e neve. Qui contano le esclusioni sulle coperture in plastica e i limiti per evento.',
    highlighted: false,
  },
  {
    icon: '🏚️',
    title: 'Fabbricati, macchinari e scorte',
    desc: 'Capannoni, stalle, magazzini, celle frigo, prodotti stoccati contro incendio ed eventi atmosferici. Terremoto e alluvione si aggiungono a scelta: per l\'impresa agricola non c\'è obbligo.',
    highlighted: false,
  },
  {
    icon: '🚜',
    title: 'Trattori e mezzi agricoli',
    desc: 'RC auto per i mezzi che vanno su strada, RC verso terzi per quelli che restano nel fondo, danni ai mezzi stessi e furto.',
    highlighted: false,
  },
  {
    icon: '🍽️',
    title: 'Agriturismo e vendita diretta',
    desc: 'RC verso gli ospiti e i clienti, prodotti venduti o serviti in azienda, camere e attività per i visitatori.',
    highlighted: false,
  },
  {
    icon: '🌾',
    title: 'Raccolto: grandine, gelo e altri eventi',
    desc: 'Polizze private sulle colture in campo, da firmare prima della stagione. Contano il valore dichiarato della produzione, le soglie di danno e le franchigie per coltura.',
    highlighted: false,
  },
]

const steps = [
  {
    n: '1',
    title: 'Leggiamo le polizze in corso',
    desc: 'Ci mandi le polizze e una descrizione dell\'azienda: fabbricati, serre, mezzi, persone, attività connesse. Ti diciamo cosa copre davvero quello che paghi.',
  },
  {
    n: '2',
    title: 'Cerchiamo i buchi di campagna',
    desc: 'Serre, mezzi che escono su strada, beni all\'aperto, stagionali, ospiti dell\'agriturismo: i punti dove una polizza pensata per un\'officina non regge.',
  },
  {
    n: '3',
    title: 'Proposta e confronto',
    desc: 'Ti diciamo cosa tenere e cosa cambiare, e confrontiamo le proposte delle compagnie con cui lavoriamo. La scelta resta tua.',
  },
]

export default function AziendeAgricolePage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Aziende agricole', href: `/${SLUG}` },
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
            <span className="text-white/80">Aziende agricole</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🌾 Aziende agricole, serre e agriturismi
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Il raccolto è una cosa,<br />
              <span className="text-accent">l&apos;azienda</span> è un&apos;altra
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Serre, capannoni, trattori, braccianti, ospiti dell&apos;agriturismo. Per le imprese agricole la legge non impone la polizza
              catastrofale, e molte coperture pensate per altre attività lasciano fuori proprio quello che c&apos;è in campagna. Leggiamo le
              tue polizze e ti diciamo dove sono i buchi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preventivo${PREVENTIVO_QS}`} className="btn-primary text-lg px-8 py-4">
                Richiedi un preventivo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href={linkWhatsApp("Buongiorno, ho un'azienda agricola e vorrei far controllare le polizze", `/${SLUG}`)}
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
              I rischi dell&apos;azienda
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Quattro conti che possono arrivare
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nessuno di questi riguarda il raccolto. Tutti riguardano l&apos;azienda.
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
              Le polizze di un&apos;azienda agricola
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Non servono tutte a tutti. Dipende da cosa coltivi o allevi, da quante strutture hai e da cosa fai oltre al lavoro nei campi.
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
            {notaPremio('superficie e tipo di colture, fabbricati e serre, numero di mezzi, addetti, attività connesse e garanzie scelte')}
          </p>
        </div>
      </section>

      {/* Catastrofale e raccolto */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-3xl md:text-4xl font-black text-primary">
            Catastrofale: perché per te non è obbligatoria
          </h2>
          <p>
            Dal 2025 le imprese devono assicurare beni e impianti contro terremoti, alluvioni e frane. Le imprese agricole no: il comma 111
            dell&apos;art. 1 della L. 213/2023 le toglie dall&apos;obbligo e per loro rinvia alla L. 234/2021, che all&apos;art. 1, comma 515,
            ha istituito il Fondo mutualistico nazionale per i danni da alluvione, gelo o brina e siccità alle produzioni agricole, gestito da ISMEA.
          </p>
          <p>
            Quel fondo guarda alle produzioni. Il capannone allagato, la stalla lesionata dal terremoto, la cella frigo finita sott&apos;acqua
            restano fuori. Nessuno ti obbliga ad assicurarli, ed è proprio per questo che spesso non lo sono.
          </p>
          <p>
            Per il raccolto lavoriamo con polizze private, senza contributo pubblico: coprono le colture in campo contro grandine,
            gelo e gli altri eventi scritti nel contratto, e vanno firmate prima che la stagione cominci. Le leggiamo con te coltura per
            coltura, perché soglie di danno e franchigie cambiano molto da una all&apos;altra.
          </p>
          <p>
            Per le altre imprese, scadenze e regole dell&apos;obbligo sono nella pagina{' '}
            <Link href="/soluzioni/catastrofi-naturali" className="text-primary underline">catastrofi naturali</Link>.
          </p>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="section-padding bg-gray-50">
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
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Esempio
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
              Grandinata a maggio: cosa decide se la polizza paga le serre
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Prendiamo un&apos;azienda orticola nella pianura pontina, con tre serre a tunnel e un magazzino. A maggio una grandinata
                  strappa i teli di due serre e rovina le piantine sotto. Il titolare ha una polizza incendio con gli eventi atmosferici e
                  pensa di essere a posto.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Se ci sia un indennizzo, e quanto, lo dicono le condizioni. Sono quelle che leggiamo prima della firma:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                  <li>se le serre sono tra i beni assicurati o vanno assicurate a parte;</li>
                  <li>se la grandine sulle coperture in plastica è coperta o esclusa;</li>
                  <li>se le colture dentro la serra sono comprese o restano fuori;</li>
                  <li>quale limite vale per evento e quale franchigia.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Il punto
                </p>
                <p className="text-lg font-bold text-white leading-snug">
                  Su un&apos;azienda con serre la parola da cercare in polizza è &laquo;serre&raquo;. Se non c&apos;è, o sta tra le esclusioni, i teli li ricompri tu.
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Cosa facciamo noi
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Leggiamo le condizioni prima della stagione, non dopo. Se il danno arriva, prepariamo la denuncia con te e la seguiamo con la compagnia.
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
        title="Domande frequenti — Aziende agricole"
        items={aziendeAgricoleFaq.items}
        cta={aziendeAgricoleFaq.cta}
      />

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Prima della prossima stagione
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Mandaci le polizze in corso. La lettura è gratuita: il nostro compenso arriva dalle compagnie, solo se scegli di assicurarti con noi.
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
