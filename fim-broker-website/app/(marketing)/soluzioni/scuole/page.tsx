import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ScuoleChecklist from '@/components/ui/ScuoleChecklist'
import ScuoleForm from '@/components/forms/ScuoleForm'
import { scuoleFaq } from '@/lib/faq/scuole'
import { SCUOLE_DOCS, SCUOLE_EMAIL, SCUOLE_PEC } from '@/lib/scuole'
import { OG_BASE } from '@/lib/seo'

const SLUG = 'soluzioni/scuole'
const BASE_URL = 'https://www.fimbroker.it'
const OG_IMAGE =
  '/api/og?title=Dipartimento+Scuole&tag=Istituti+scolastici&sub=Check-up+gratuito+delle+polizze%2C+capitolato+e+confronto+delle+offerte.+Il+broker+della+scuola.'

export const metadata: Metadata = {
  title: 'Assicurazione Scuola e Broker per Istituti Scolastici — Dipartimento Scuole | FIM',
  description:
    'Check-up gratuito delle polizze in essere, capitolato tecnico, confronto delle offerte e assistenza sui sinistri per istituti statali e paritari. FIM è il broker della scuola: nessun onere per l\'istituto.',
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    ...OG_BASE,
    url: `/${SLUG}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { images: [OG_IMAGE] },
}

// Solo una WebPage con il servizio come mainEntity: l'organizzazione è già
// dichiarata nel root layout e va referenziata via @id, non ridichiarata.
const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/${SLUG}`,
  url: `${BASE_URL}/${SLUG}`,
  name: 'Dipartimento Scuole — FIM Insurance Broker',
  inLanguage: 'it-IT',
  isPartOf: { '@id': `${BASE_URL}/#website` },
  about: { '@id': `${BASE_URL}/#organization` },
  mainEntity: {
    '@type': 'Service',
    name: 'Brokeraggio assicurativo per istituzioni scolastiche',
    serviceType: 'Brokeraggio assicurativo',
    provider: { '@id': `${BASE_URL}/#organization` },
    audience: { '@type': 'Audience', audienceType: 'Istituzioni scolastiche statali e paritarie' },
    areaServed: { '@type': 'Country', name: 'Italia' },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Il broker è remunerato dalla provvigione compresa nel premio, dichiarata al contraente. Nessun onere per l\'istituto.',
    },
  },
}

const figure = [
  {
    ruolo: 'Il Dirigente Scolastico',
    titolo: 'Consapevolezza del rischio e capacità di decidere',
    testo:
      'Non basta sapere che la scuola è assicurata. Bisogna sapere quanto è esposta. Il Dirigente riceve una fotografia scritta dei rischi dell\'istituto, delle priorità e delle criticità del programma assicurativo, e decide su un\'analisi invece che sulla scelta di una polizza.',
  },
  {
    ruolo: 'Il Direttore S.G.A.',
    titolo: 'Meno carico operativo e burocratico',
    testo:
      'Confrontare le proposte, leggere clausole e condizioni, verificare le coperture, gestire la documentazione, coordinare le comunicazioni con compagnia e famiglie. FIM prende in carico questa complessità e resta un solo interlocutore per tutta la durata del contratto.',
  },
]

const rischi = [
  { area: 'Infortuni degli alunni', cosa: 'Cadute in palestra e nei cortili, incidenti nei laboratori, gruppo sportivo, tragitto casa-scuola nelle attività organizzate.' },
  { area: 'Responsabilità civile verso terzi', cosa: 'Danni causati da un alunno a un compagno o a cose altrui, danni durante uscite e manifestazioni, danni causati dal personale nell\'esercizio delle funzioni.' },
  { area: 'Uscite, viaggi e PCTO', cosa: 'Infortuni fuori sede, in Italia e all\'estero; spese sanitarie e rimpatrio; annullamento del viaggio; eventi presso le aziende ospitanti.' },
  { area: 'Responsabilità del Dirigente e del D.S.G.A.', cosa: 'Azione di responsabilità amministrativo-contabile davanti alla Corte dei conti per danno erariale, con esposizione del patrimonio personale.' },
  { area: 'Sicurezza sul lavoro', cosa: 'Il Dirigente è datore di lavoro ai sensi del D.Lgs. 81/2008. Gli alunni sono equiparati a lavoratori quando usano laboratori e attrezzature.' },
  { area: 'Patrimonio e dotazioni', cosa: 'Furto e danneggiamento di dotazioni informatiche, strumenti di laboratorio, attrezzature sportive e beni affidati alla custodia dell\'istituto.' },
  { area: 'Dati e sistemi', cosa: 'Violazione dei dati trattati dal registro elettronico e dalla segreteria, con obblighi di notifica (artt. 33 e 34 GDPR) e possibili richieste delle famiglie.' },
  { area: 'Personale e volontari', cosa: 'Infortuni del personale docente e ATA; posizione di genitori, esperti esterni e volontari che collaborano alle attività dell\'istituto.' },
]

const scoperture = [
  { punto: 'PCTO e stage presso terzi', perche: 'Gli studenti operano in azienda, spesso con attrezzature non scolastiche. Molte polizze non estendono la copertura fuori dai locali dell\'istituto.' },
  { punto: 'RC patrimoniale di Dirigente e D.S.G.A.', perche: 'Spesso assente, oppure presente con massimali che non reggono il valore di una contestazione erariale.' },
  { punto: 'Massimali della culpa in vigilando', perche: 'Adeguati vent\'anni fa, non oggi. Un danno grave a un minore supera con facilità i massimali storici.' },
  { punto: 'Viaggi d\'istruzione all\'estero', perche: 'Spese sanitarie, rimpatrio e annullamento richiedono garanzie specifiche che la polizza base non contiene.' },
  { punto: 'Alunni con disabilità e assistenza', perche: 'Attività di assistenza specialistica e personale educativo esterno restano talvolta fuori dal perimetro degli assicurati.' },
  { punto: 'Dotazioni informatiche', perche: 'Notebook, tablet e strumenti di laboratorio acquistati con fondi dedicati, spesso non censiti nella polizza danni.' },
  { punto: 'Tutela legale', perche: 'Presente, ma con limiti di spesa che non coprono un procedimento reale, e talvolta senza libera scelta del legale.' },
  { punto: 'Violazione dei dati', perche: 'Rischio recente e quasi mai coperto, in un contesto che tratta ogni giorno dati di minori e categorie particolari.' },
]

const passaggi = [
  {
    n: '01',
    titolo: 'Check-up delle polizze in essere',
    chi: 'FIM, gratis e senza impegno',
    testo: 'Leggiamo per intero i contratti attivi, condizioni generali comprese: garanzie, esclusioni, franchigie, scoperti, limiti di indennizzo. Consegniamo un documento scritto, non un parere a voce.',
  },
  {
    n: '02',
    titolo: 'Incarico di brokeraggio',
    chi: 'L\'istituto, con atto proprio',
    testo: 'Se l\'istituto decide di andare avanti, conferisce l\'incarico con un atto suo. Da quel momento FIM agisce per conto della scuola. Nessun costo: il broker è remunerato dalla provvigione compresa nel premio.',
  },
  {
    n: '03',
    titolo: 'Capitolato e richiesta di quotazione',
    chi: 'FIM, su mandato dell\'istituto',
    testo: 'Scriviamo il capitolato sui rischi reali della scuola e lo trasmettiamo agli operatori che dispongono di prodotti scolastici, tutti sullo stesso testo e sugli stessi dati. Chi risponde dichiara la provvigione riconosciuta a FIM.',
  },
  {
    n: '04',
    titolo: 'Relazione comparativa al Dirigente',
    chi: 'FIM',
    testo: 'Le offerte a confronto sui requisiti del capitolato, garanzia per garanzia, con una raccomandazione motivata. È il documento che il Dirigente si porta agli atti.',
  },
  {
    n: '05',
    titolo: 'Affidamento e assistenza',
    chi: 'L\'istituto decide, FIM resta accanto',
    testo: 'L\'affidamento è un atto della scuola: nella statale determina e CIG, nella paritaria un atto interno. Poi restiamo accanto alla segreteria per sinistri, scadenze e adeguamento delle coperture quando cambiano attività o normativa.',
  },
]

const consegne = [
  'Il documento di analisi delle coperture in essere, con le criticità in colonna: coperto, non coperto, coperto due volte',
  'Il capitolato tecnico scritto sull\'istituto',
  'Il prospetto comparativo delle offerte ricevute',
  'Un referente unico raggiungibile per telefono',
  'Il riepilogo delle scadenze, aggiornato',
]

const calendario = [
  { quando: 'Marzo – Maggio', cosa: 'Il momento giusto per leggere le polizze. La segreteria ha il tempo di istruire la pratica senza proroghe tecniche.' },
  { quando: 'Giugno – Settembre', cosa: 'Le determine di affidamento si concentrano qui. Chi arriva a settembre lavora per l\'anno successivo.' },
  { quando: '1° settembre / 31 ottobre', cosa: 'Le decorrenze tipiche delle polizze scolastiche. Con affidamenti triennali, la finestra torna una volta ogni tre anni.' },
]

const documentiCheckup = [
  'Polizza e condizioni generali in vigore',
  'Determina di affidamento',
  'Capitolato o scheda tecnica, se presenti',
  'Circolare alle famiglie sul contributo',
  'Sinistri degli ultimi tre anni, se disponibili',
]

export default function ScuolePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Istituti Scolastici', href: '/soluzioni/scuole' },
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
            <span className="text-white/80">Istituti Scolastici</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              Dipartimento Scuole — per Dirigenti Scolastici e Direttori S.G.A.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Il broker della scuola,{' '}
              <span className="text-accent">senza oneri per l&apos;istituto</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Ogni istituto ha già delle polizze. Quasi nessuno le ha mai lette tutte insieme.
              FIM legge le coperture in essere, scrive il capitolato sui rischi reali della scuola
              e mette le offerte su una griglia comparabile. La scelta resta sempre dell&apos;istituto.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 max-w-2xl">
              <p className="text-white/90 text-sm leading-relaxed">
                <strong className="text-accent">Quanto costa alla scuola: nulla.</strong> Il broker è remunerato dalla
                provvigione riconosciuta dalla compagnia, già compresa nel premio e dichiarata al contraente.
                Se dall&apos;analisi esce che le coperture vanno bene così, ve lo diciamo e finisce lì.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="#check-up" className="btn-primary text-lg px-8 py-4">
                Richiedi il check-up gratuito
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href={SCUOLE_DOCS.dieciDomande.href} className="btn-outline-white text-lg px-8 py-4">
                Scarica le dieci domande (PDF)
              </a>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-2xl">
              <Image
                src="/images/brand/scuole-hero.jpg"
                alt="Dipartimento Scuole FIM Insurance Broker — la protezione dell'istituto scolastico"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 50vw"
                priority
              />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Due figure, un processo */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              A chi ci rivolgiamo
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Due esigenze. Un unico processo.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Il Dirigente firma, ma il contratto lo istruisce e lo gestisce il Direttore S.G.A. Il metodo è costruito
              per le due figure che vivono in prima persona il programma assicurativo dell&apos;istituto.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {figure.map((f) => (
              <Card key={f.ruolo} padding="lg" className="h-full">
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">{f.ruolo}</p>
                <h3 className="text-xl font-black text-primary mb-3">{f.titolo}</h3>
                <p className="text-gray-600 leading-relaxed">{f.testo}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dieci domande */}
      <section className="section-padding bg-gray-50" id="dieci-domande">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Autotest
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Dieci domande sulla polizza della vostra scuola
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Se sapete rispondere a tutte, siete a posto. Se ne restano tre senza risposta, vale la pena parlarne.
              Non è un questionario commerciale: sono le domande a cui, dopo trent&apos;anni di contratti letti,
              sappiamo che quasi nessuna scuola sa rispondere per intero. Nessuna risposta lascia il vostro browser.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ScuoleChecklist />
          </div>
        </div>
      </section>

      {/* Mappa dei rischi */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              La mappa dei rischi
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Una scuola non è un ufficio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ogni giorno centinaia di minori si muovono, usano attrezzature, fanno sport, escono sul territorio e
              talvolta lavorano in azienda. Accanto a loro c&apos;è il personale, e sopra una catena di responsabilità
              che arriva al patrimonio personale di chi dirige.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rischi.map((r) => (
              <Card key={r.area} className="h-full">
                <h3 className="font-bold text-primary mb-2">{r.area}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{r.cosa}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Un chiarimento che fa risparmiare discussioni</p>
            <p className="text-gray-700 leading-relaxed">
              L&apos;edificio scolastico appartiene all&apos;ente locale: il Comune per infanzia, primaria e secondaria di
              primo grado, la Provincia o la Città metropolitana per la secondaria di secondo grado. L&apos;istituto non
              deve assicurare il fabbricato, ma è responsabile del contenuto e delle dotazioni affidate. Confondere i
              due piani porta a pagare per un rischio che non è proprio e a lasciare scoperto quello che lo è.
            </p>
          </div>
        </div>
      </section>

      {/* Otto scoperture */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Quello che troviamo leggendo le polizze
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Le otto scoperture più frequenti
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Non è un elenco teorico. Sono i punti che emergono più spesso quando leggiamo le polizze già in essere di un istituto.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-left">
              <thead className="bg-primary text-white">
                <tr>
                  <th scope="col" className="px-5 py-3 text-sm font-bold w-1/3">Punto critico</th>
                  <th scope="col" className="px-5 py-3 text-sm font-bold">Perché conta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {scoperture.map((s) => (
                  <tr key={s.punto} className="align-top">
                    <th scope="row" className="px-5 py-4 font-bold text-primary text-sm">{s.punto}</th>
                    <td className="px-5 py-4 text-gray-600 text-sm leading-relaxed">{s.perche}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6 max-w-2xl mx-auto">
            Come lo verifichiamo: chiediamo le polizze in corso e le leggiamo per intero. Consegniamo un documento che
            mette in colonna ciò che è coperto, ciò che non lo è e ciò che è coperto due volte. Fino a quel momento non
            c&apos;è nulla da firmare e nulla da pagare.
          </p>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Come lavoriamo
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
                Cinque passaggi, nessuna sorpresa
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                FIM si presenta come analista della scuola, non come partecipante a una gara. L&apos;ordine dei
                passaggi è anche quello che tiene l&apos;affidamento al riparo da contestazioni.
              </p>
              <ol className="space-y-6">
                {passaggi.map((p) => (
                  <li key={p.n} className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      {p.n}
                    </span>
                    <div>
                      <h3 className="font-bold text-primary">{p.titolo}</h3>
                      <p className="text-xs font-semibold text-accent mb-1">{p.chi}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{p.testo}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
                <h3 className="text-lg font-black text-primary mb-3">Statale o paritaria</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Nella scuola statale l&apos;incarico segue il Codice dei contratti pubblici (D.Lgs. 36/2023): per un
                  servizio senza esborso diretto si procede di norma con affidamento diretto, con decisione a contrarre
                  del Dirigente e nel rispetto del D.I. 129/2018. Restano determina, CIG e rotazione: è una procedura,
                  non l&apos;assenza di procedura.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nelle paritarie il Codice non si applica: incarico e polizza si decidono con un atto interno, e il
                  pacchetto è di solito più ampio perché edificio e dotazioni sono spesso della scuola.
                </p>
              </div>
              <div className="bg-primary text-white rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-black mb-3">Un limite che rispettiamo</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Chi redige gli atti di una procedura per conto della stazione appaltante non vi partecipa e non ne
                  trae beneficio diretto (art. 16 D.Lgs. 36/2023). Teniamo separate le due cose e mettiamo per iscritto
                  le dichiarazioni necessarie: è la condizione perché l&apos;affidamento regga a un controllo.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
                <h3 className="text-lg font-black text-primary mb-3">Perché un broker e non un&apos;agenzia</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  La differenza sta da che parte del tavolo si siede. L&apos;agenzia rappresenta la compagnia. Il broker
                  rappresenta la scuola e cerca sul mercato quello che le serve. La relazione comparativa che il Dirigente
                  si porta agli atti è la prova concreta di questa differenza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cosa consegniamo + calendario + download */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Che cosa consegniamo
              </span>
              <h2 className="text-3xl font-black text-primary mb-6">Documenti scritti, non pareri a voce</h2>
              <ul className="space-y-3 mb-8">
                {consegne.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                {[SCUOLE_DOCS.dieciDomande, SCUOLE_DOCS.brochure].map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    className="flex items-start gap-4 bg-white border border-gray-200 hover:border-primary/40 rounded-xl p-4 transition-colors group"
                  >
                    <span className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-black">PDF</span>
                    <span>
                      <span className="block font-bold text-primary group-hover:underline">{d.label}</span>
                      <span className="block text-sm text-gray-600">{d.desc}</span>
                    </span>
                  </a>
                ))}
                <p className="text-xs text-gray-500 leading-relaxed">
                  Capitolato e moduli di gara non sono scaricabili: vengono scritti sull&apos;istituto dopo il conferimento
                  dell&apos;incarico, perché un capitolato generico è la prima cosa che una commissione contesta.
                </p>
              </div>
            </div>
            <div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Quando muoversi
              </span>
              <h2 className="text-3xl font-black text-primary mb-6">Il calendario della polizza scolastica</h2>
              <div className="space-y-4">
                {calendario.map((c) => (
                  <Card key={c.quando} className="flex items-start gap-4">
                    <span className="text-sm font-black text-accent w-36 flex-shrink-0 leading-snug">{c.quando}</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{c.cosa}</p>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-6 leading-relaxed">
                Le determine di affidamento sono pubbliche, in amministrazione trasparente: compagnia, premio pro capite,
                durata e scadenza sono leggibili da chiunque. Se non sapete quando scade la vostra polizza, iniziate da lì.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={scuoleFaq.items} cta={scuoleFaq.cta} background="white" />

      {/* Form check-up */}
      <section id="check-up" className="section-padding bg-gray-50 scroll-mt-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Check-up gratuito
              </span>
              <h2 className="text-3xl font-black text-primary mb-4">Mandateci le polizze, ve le leggiamo</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Compilate il modulo e rispondete alla mail di conferma allegando i documenti. Vi consegniamo una
                lettura scritta della copertura in essere: che cosa protegge davvero e dove lascia scoperti
                l&apos;istituto, il personale e gli alunni. Non contiene offerte e non impegna a niente.
              </p>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <h3 className="font-bold text-primary mb-3">Che cosa serve</h3>
                <ul className="space-y-2">
                  {documentiCheckup.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-primary text-white rounded-2xl p-6">
                <h3 className="font-bold mb-3">Dipartimento Scuole</h3>
                <ul className="space-y-2 text-sm text-white/85">
                  <li>
                    <a href={`mailto:${SCUOLE_EMAIL}`} className="hover:text-white underline underline-offset-2">{SCUOLE_EMAIL}</a>
                  </li>
                  <li>
                    PEC per gli atti formali:{' '}
                    <a href={`mailto:${SCUOLE_PEC}`} className="hover:text-white underline underline-offset-2">{SCUOLE_PEC}</a>
                  </li>
                  <li>
                    <a href="tel:+390696883381" className="hover:text-white underline underline-offset-2">+39 06 96883381</a>
                    {' '}— lun-ven 9:00-13:00 e 15:00-18:00
                  </li>
                  <li className="text-white/60 pt-1">Via Roma 41, 04012 Cisterna di Latina (LT)</li>
                </ul>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                <ScuoleForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informativa */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container-custom">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
            FIM Insurance Broker di Manzo Arturo &amp; C. S.a.s. è iscritta al Registro Unico degli Intermediari
            assicurativi e riassicurativi, Sezione B, al n. B000405449, ed è soggetta alla vigilanza dell&apos;IVASS.
            L&apos;attività è svolta nel rispetto del D.Lgs. 209/2005, della Direttiva (UE) 2016/97 e del Regolamento
            IVASS n. 40/2018. Il compenso dell&apos;intermediario è costituito dalle provvigioni corrisposte dalle imprese
            di assicurazione e comprese nei premi. Questa pagina ha finalità informativa, non costituisce proposta
            contrattuale né sollecitazione all&apos;acquisto e non sostituisce la documentazione precontrattuale e
            contrattuale, alla quale si rinvia per garanzie, esclusioni, franchigie e limiti di indennizzo. Nessun
            risultato economico è garantito: FIM propone, l&apos;istituzione scolastica decide.{' '}
            <Link href="/trasparenza" className="text-primary underline">Informativa precontrattuale</Link> ·{' '}
            <Link href="/privacy-policy" className="text-primary underline">Privacy</Link> ·{' '}
            <Link href="/reclami" className="text-primary underline">Reclami</Link> (in caso di esito insoddisfacente
            è possibile rivolgersi all&apos;IVASS, Via del Quirinale 21, 00187 Roma).
          </p>
        </div>
      </section>
    </div>
  )
}
