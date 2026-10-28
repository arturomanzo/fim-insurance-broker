import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import { affittiBreviFaq } from '@/lib/faq/affitti-brevi'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { OG_BASE } from '@/lib/seo'
import { notaPremio } from '@/lib/prezzi'
import { linkWhatsApp } from '@/lib/whatsappSito'

// Pagina P16 del piano SEO (marketing/seo nel gestionale). Gli obblighi sono
// quelli dell'art. 13-ter del D.L. 145/2023, letto su normattiva il 28/10/2026:
// CIN, dispositivi di sicurezza, SCIA in forma d'impresa. Nessun obbligo di
// polizza: non scriverlo. Niente prezzi.

const SLUG = 'soluzioni/affitti-brevi-litorale-pontino'
const PREVENTIVO_QS = '?profilo=privato'
const OG_IMAGE =
  '/api/og?title=Affitti+brevi+sul+litorale+pontino&tag=Soluzioni&sub=Ospiti%2C+danni+e+obblighi+del+CIN.'

export const metadata: Metadata = {
  title: 'Assicurazione affitti brevi sul litorale pontino: ospiti, danni e CIN',
  description:
    'Affitti casa a Sabaudia, San Felice Circeo, Terracina o Sperlonga? RC verso gli ospiti, danni all\'appartamento e ai vicini, polizza casa che non sa che affitti. E gli obblighi del CIN spiegati sul testo della legge.',
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    ...OG_BASE,
    url: `/${SLUG}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { images: [OG_IMAGE] },
}

const painPoints = [
  { icon: '🩹', title: 'L\'ospite che si fa male', desc: 'Una doccia scivolosa, una scala, un balcone. La richiesta di danni arriva al proprietario, non alla piattaforma.' },
  { icon: '💧', title: 'Il piano di sotto allagato', desc: 'Un rubinetto lasciato aperto la sera del check-out. I danni ai vicini e al condominio li chiedono a te.' },
  { icon: '📄', title: 'La polizza casa che non sa', desc: 'Scritta per chi ci abita o affitta con un contratto lungo. Se l\'uso cambia e non lo dichiari, al sinistro può non rispondere.' },
  { icon: '📅', title: 'Le settimane che saltano', desc: 'Dopo un danno serio l\'appartamento resta chiuso in piena stagione. Le prenotazioni si cancellano, le spese restano.' },
]

const obblighi = [
  {
    title: 'CIN',
    desc: 'Il codice identificativo nazionale del Ministero del turismo. Va esposto all\'esterno dello stabile e indicato in ogni annuncio.',
    sanzione: 'Senza CIN: da 800 a 8.000 euro. CIN non esposto o non indicato: da 500 a 5.000 euro e rimozione dell\'annuncio.',
  },
  {
    title: 'Rilevatori ed estintori',
    desc: 'In ogni appartamento, anche se affitti da privato: rilevatori funzionanti di gas e monossido di carbonio, estintori a norma, uno ogni 200 metri quadrati con almeno uno per piano.',
    sanzione: 'Se mancano: da 600 a 6.000 euro per ogni violazione.',
  },
  {
    title: 'SCIA, se affitti in forma d\'impresa',
    desc: 'Chi gestisce gli affitti in forma imprenditoriale presenta la SCIA al SUAP del comune e deve avere gli impianti a norma.',
    sanzione: 'Senza SCIA: da 2.000 a 10.000 euro.',
  },
]

const coverages = [
  {
    icon: '🤝',
    title: 'RC verso ospiti e terzi',
    desc: 'Lesioni e danni subiti dagli ospiti durante il soggiorno, e i danni che l\'appartamento causa a vicini e passanti.',
    highlighted: true,
  },
  {
    icon: '🏢',
    title: 'Danni a vicini e condominio',
    desc: 'Acqua, fumo, incendio partiti dal tuo appartamento, e i danni che gli ospiti fanno alle parti comuni.',
    highlighted: false,
  },
  {
    icon: '🛋️',
    title: 'Danni all\'immobile e agli arredi',
    desc: 'Rotture, guasti e atti vandalici causati dagli ospiti. Qui contano le esclusioni sull\'uso turistico.',
    highlighted: false,
  },
  {
    icon: '🔒',
    title: 'Furto del contenuto',
    desc: 'Arredi, elettrodomestici e dotazioni dell\'appartamento, con condizioni di custodia che chi affitta può rispettare davvero.',
    highlighted: false,
  },
  {
    icon: '📅',
    title: 'Perdita delle pigioni',
    desc: 'Se dopo un sinistro l\'appartamento non si può affittare, l\'indennizzo per le settimane perse.',
    highlighted: false,
  },
  {
    icon: '⚖️',
    title: 'Tutela legale',
    desc: 'Controversie con ospiti, gestori o vicini: avvocato e spese legali.',
    highlighted: false,
  },
]

const steps = [
  {
    n: '1',
    title: 'Leggiamo la polizza che hai',
    desc: 'Ci mandi la polizza casa e ci dici quante notti affitti e come gestisci le prenotazioni. Vediamo se l\'uso turistico è coperto o escluso.',
  },
  {
    n: '2',
    title: 'Mettiamo in fila gli obblighi',
    desc: 'CIN, dispositivi di sicurezza, eventuale SCIA, regole del condominio. Una polizza scelta senza sapere come gestisci la casa rischia di coprire la cosa sbagliata.',
  },
  {
    n: '3',
    title: 'Proposta e confronto',
    desc: 'Ti diciamo cosa tenere e cosa aggiungere, e confrontiamo le proposte delle compagnie con cui lavoriamo. La scelta resta tua.',
  },
]

export default function AffittiBreviPage() {
  return (
    <div>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Affitti brevi sul litorale pontino', href: `/${SLUG}` },
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
            <span className="text-white/80">Affitti brevi</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🏠 Sabaudia, San Felice Circeo, Terracina, Sperlonga
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Affitti casa per pochi giorni?<br />
              <span className="text-accent">La polizza deve saperlo</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Sul litorale pontino tante case lavorano d&apos;estate con Airbnb e Booking. Ogni settimana entra gente nuova, e la polizza casa
              scritta per chi ci abita spesso non regge. Leggiamo la tua e ti diciamo dove sono i buchi, insieme agli obblighi del CIN.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preventivo${PREVENTIVO_QS}`} className="btn-primary text-lg px-8 py-4">
                Richiedi un preventivo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href={linkWhatsApp('Buongiorno, affitto casa per brevi periodi e vorrei far controllare la polizza', `/${SLUG}`)}
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
              I rischi di chi affitta
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Quattro conti che possono arrivare
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nessuno di questi lo paga la piattaforma da sola.
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

      {/* Obblighi di legge */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Prima della polizza
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Cosa chiede la legge a chi affitta
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Le regole nazionali stanno nell&apos;art. 13-ter del D.L. 18 ottobre 2023, n. 145. Non impongono una polizza: chiedono queste tre cose.
              Le regioni possono avere regole proprie, e il condominio o la piattaforma possono chiedere altro.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {obblighi.map((o) => (
              <Card key={o.title} className="flex flex-col">
                <h3 className="font-bold text-primary mb-2">{o.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{o.desc}</p>
                <p className="text-xs text-red-700 bg-red-50 rounded-lg px-3 py-2 mt-4">{o.sanzione}</p>
              </Card>
            ))}
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
              Cosa deve coprire una polizza per chi affitta
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Non tutte le compagnie mettono queste garanzie nello stesso contratto: per questo si confrontano le condizioni, non il nome del prodotto.
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
            {notaPremio('valore dell\'immobile e degli arredi, zona, notti affittate in un anno, modalità di gestione e garanzie scelte')}
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
              Agosto, piano di sotto allagato: cosa decide se la polizza paga
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Prendiamo un bilocale a Sperlonga affittato a settimane da giugno a settembre. Un sabato gli ospiti partono e lasciano aperto il rubinetto
                  del bagno: l&apos;acqua scende nell&apos;appartamento di sotto. Il proprietario ha una polizza casa con la responsabilità civile e pensa di essere a posto.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Se ci sia un risarcimento lo dicono le condizioni. Sono quelle che leggiamo prima della stagione:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                  <li>se la polizza copre la casa anche quando è affittata a terzi per brevi periodi;</li>
                  <li>se la responsabilità civile vale per i danni causati dagli ospiti, non solo dalla tua famiglia;</li>
                  <li>se i danni da acqua sono coperti e con quale franchigia;</li>
                  <li>se c&apos;è un indennizzo per le settimane in cui non si può affittare.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Il punto
                </p>
                <p className="text-lg font-bold text-white leading-snug">
                  La parola da cercare in polizza è l&apos;uso: se la casa è assicurata come abitazione tua e la affitti ai turisti, va detto alla compagnia prima.
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Cosa facciamo noi
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Leggiamo le condizioni prima della stagione. Se il danno arriva, prepariamo la denuncia con te e la seguiamo con la compagnia.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-6">
              Scenario costruito a titolo di esempio: non racconta il caso di un cliente FIM.{' '}
              Approfondisci nell&apos;articolo{' '}
              <Link href="/blog/assicurazione-rc-locatore-affitti-brevi-2026" className="text-primary underline">
                Affitti brevi e RC del locatore
              </Link>.
            </p>
          </div>
        </div>
      </section>

      <FaqSection
        title="Domande frequenti — Affitti brevi"
        items={affittiBreviFaq.items}
        cta={affittiBreviFaq.cta}
      />

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            La stagione si prepara d&apos;inverno
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Mandaci la polizza casa e dicci come affitti. La lettura è gratuita: il nostro compenso arriva dalle compagnie, solo se scegli di assicurarti con noi.
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
