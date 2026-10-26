import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { flottaAziendaleFaq } from '@/lib/faq/flotta-aziendale'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { OG_BASE } from '@/lib/seo'
import { notaPremio } from '@/lib/prezzi'
import { linkWhatsApp } from '@/lib/whatsappSito'

// Pagina P18 del piano SEO (marketing/seo nel gestionale). Niente numeri sul
// portafoglio FIM e niente soglie di veicoli: il minimo per il libro matricola
// e le regole di tariffa le decide la compagnia.

const SLUG = 'soluzioni/flotta-aziendale'
const PREVENTIVO_QS = '?profilo=pmi&settore=Flotta+Aziendale'
const OG_IMAGE =
  '/api/og?title=Flotta+aziendale&tag=Soluzioni&sub=Libro+matricola%2C+scadenze+allineate%2C+sinistri+seguiti+da+FIM.'

export const metadata: Metadata = {
  title: 'Assicurazione flotta aziendale e libro matricola',
  description:
    'Auto, furgoni e mezzi da lavoro dell\'azienda: polizze singole allineate o libro matricola, scadenze sotto controllo, entrate e uscite dei veicoli e sinistri seguiti da un broker indipendente.',
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    ...OG_BASE,
    url: `/${SLUG}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { images: [OG_IMAGE] },
}

const painPoints = [
  { icon: '📅', title: 'Scadenze sparse', desc: 'Ogni mezzo ha la sua data. Basta un rinnovo dimenticato e un furgone resta fermo in piazzale, o peggio circola senza copertura.' },
  { icon: '🔁', title: 'Mezzi che entrano ed escono', desc: 'Un\'auto nuova, un furgone venduto, un camion a noleggio. Con le polizze singole ogni cambio è una pratica a sé.' },
  { icon: '🧾', title: 'Garanzie a macchia di leopardo', desc: 'Tre furgoni uguali, tre polizze diverse: uno con furto e incendio, uno con la cristalli, uno con la sola RC auto.' },
  { icon: '🛠️', title: 'Sinistri da rincorrere', desc: 'Denunce, periti, carrozzerie. E intanto il mezzo fermo non lavora e qualcuno in azienda passa le giornate al telefono.' },
]

const coverages = [
  {
    icon: '🚗',
    title: 'RC Auto',
    desc: 'Obbligatoria per ogni veicolo che circola. Su una flotta conta come sono scritti massimali, rivalse e conducenti ammessi, mezzo per mezzo.',
    highlighted: true,
  },
  {
    icon: '🔥',
    title: 'Furto e incendio',
    desc: 'Per i mezzi di valore e per quelli che passano la notte in strada o in cantiere. Si sceglie veicolo per veicolo, non per forza su tutta la flotta.',
    highlighted: false,
  },
  {
    icon: '💥',
    title: 'Kasko e collisione',
    desc: 'Copre i danni al tuo veicolo anche quando la colpa è del tuo autista. Ha senso sui mezzi nuovi o in leasing, meno su quelli a fine carriera.',
    highlighted: false,
  },
  {
    icon: '🪟',
    title: 'Cristalli',
    desc: 'Parabrezza e vetri rotti sono il sinistro più frequente su chi fa tanti chilometri. Contano franchigia e rete di riparatori convenzionati.',
    highlighted: false,
  },
  {
    icon: '🛻',
    title: 'Assistenza stradale',
    desc: 'Soccorso, traino e, dove previsto, veicolo sostitutivo. Per un mezzo da lavoro il giorno di fermo pesa quanto il danno.',
    highlighted: false,
  },
  {
    icon: '🩹',
    title: 'Infortuni del conducente',
    desc: 'La RC auto risarcisce gli altri, non chi guida il veicolo responsabile. Questa garanzia copre l\'autista, dipendente o titolare.',
    highlighted: false,
  },
]

const steps = [
  {
    n: '1',
    title: 'Mettiamo in fila i mezzi',
    desc: 'Ci mandi le polizze in corso, anche in foto. Facciamo l\'elenco veicolo per veicolo: garanzie, scadenze, doppioni e buchi.',
  },
  {
    n: '2',
    title: 'Polizze singole o libro matricola',
    desc: 'Ti diciamo quale strada ha senso per la tua flotta e confrontiamo le proposte delle compagnie con cui lavoriamo. La scelta resta tua.',
  },
  {
    n: '3',
    title: 'Teniamo in ordine la flotta',
    desc: 'Inclusioni ed esclusioni dei mezzi, avvisi prima delle scadenze, denunce di sinistro preparate con te e seguite con la compagnia.',
  },
]

export default function FlottaAziendalePage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Flotta aziendale', href: `/${SLUG}` },
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
            <span className="text-white/80">Flotta aziendale</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🚚 Aziende con auto, furgoni e mezzi da lavoro
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Tanti mezzi,<br />
              <span className="text-accent">una flotta sola</span> da tenere d&apos;occhio
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Quando i veicoli dell&apos;azienda diventano tre, cinque, venti, il problema non è più il premio di un furgone.
              Sono le scadenze sparse, le garanzie diverse su mezzi uguali, i sinistri da seguire uno per uno.
              Noi mettiamo ordine e ti diciamo se ha senso passare a un libro matricola.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preventivo${PREVENTIVO_QS}`} className="btn-primary text-lg px-8 py-4">
                Preventivo per la mia flotta
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href={linkWhatsApp('Buongiorno, vorrei far controllare le polizze dei mezzi aziendali', `/${SLUG}`)}
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
              Quando i mezzi sono tanti
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Dove si perde il controllo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quattro situazioni che chi gestisce i mezzi di un&apos;azienda conosce bene.
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

      {/* Polizze singole o libro matricola */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Le due strade
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Polizze singole o libro matricola
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Non c&apos;è una risposta buona per tutti. Decidono il numero di mezzi, i sinistri degli ultimi anni e quanto spesso cambia la flotta.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-bold text-primary text-xl mb-3">Polizze singole, allineate</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Ogni veicolo ha il suo contratto e la sua classe di merito. Con pochi mezzi resta spesso la strada più semplice.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Il lavoro sta nell&apos;allinearle: stesse garanzie dove servono, scadenze raggruppate, un elenco aggiornato di cosa copre cosa.
              </p>
            </Card>
            <Card className="border-2 border-accent">
              <h3 className="font-bold text-primary text-xl mb-3">Libro matricola</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Un contratto unico per tutti i veicoli. Un mezzo nuovo entra con un&apos;appendice, uno venduto esce; la scadenza è una sola.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                La compagnia lo propone da un certo numero di veicoli in su, e su molti contratti il premio dell&apos;anno dopo guarda i sinistri della flotta nel suo insieme.
                Prima del passaggio verifichiamo come vengono trattati gli attestati di rischio.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Coverages */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Coperture
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Cosa si può assicurare su ogni mezzo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Non tutte le garanzie servono su tutti i veicoli. Le scegliamo mezzo per mezzo, in base a valore, uso e rischio.
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
                  {cov.highlighted && <span className="ml-2 text-xs bg-accent-cta text-white px-2 py-0.5 rounded-full align-middle">Obbligatoria</span>}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{cov.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            {notaPremio('numero e tipo dei veicoli, uso, zona di circolazione, sinistri degli ultimi anni e garanzie scelte')}
          </p>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Come lavoriamo sulla tua flotta
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
              Sei furgoni, sei scadenze, sei polizze diverse
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Prendiamo un&apos;impresa di impianti con sei furgoni, comprati negli anni uno alla volta. Ognuno è stato assicurato quando è arrivato, con la compagnia e le garanzie del momento.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Il risultato è che nessuno in azienda sa dire al volo cosa copre cosa. Mettendo le polizze sul tavolo, di solito viene fuori questo:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                  <li>i due furgoni più nuovi senza furto e incendio, quelli vecchi con;</li>
                  <li>conducenti ammessi scritti in modo diverso da una polizza all&apos;altra;</li>
                  <li>un mezzo venduto mesi fa per cui nessuno ha chiesto alla compagnia cosa fare del contratto;</li>
                  <li>sei rinnovi distribuiti nell&apos;anno, ognuno da ricordare.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Il punto
                </p>
                <p className="text-lg font-bold text-white leading-snug">
                  Con sei mezzi il problema raramente è il premio di un singolo furgone. È non sapere cosa copre cosa.
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Cosa facciamo noi
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Mettiamo tutti i mezzi in un elenco con scadenze e garanzie, e ti diciamo se allineare le polizze o passare a un libro matricola.
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
        title="Domande frequenti — Flotta aziendale"
        items={flottaAziendaleFaq.items}
        cta={flottaAziendaleFaq.cta}
        background="gray"
      />

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Quanti mezzi ha la tua azienda?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Mandaci le polizze che hai. La lettura è gratuita: il nostro compenso arriva dalle compagnie, solo se scegli di assicurarti con noi.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/preventivo${PREVENTIVO_QS}`} className="btn-primary text-lg px-8 py-4">
              Richiedi preventivo flotta
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
