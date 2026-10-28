import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { scuolePctoFaq } from '@/lib/faq/scuole-pcto'
import { SCUOLE_EMAIL } from '@/lib/scuole'
import { OG_BASE } from '@/lib/seo'
import { linkWhatsApp } from '@/lib/whatsappSito'

// Pagina P20 del piano SEO (marketing/seo nel gestionale). Norme lette su
// normattiva il 28/10/2026: D.L. 48/2023 art. 18, D.L. 159/2025 art. 7 (tragitto
// casa-azienda, interpretazione che vale anche per il passato; divieto di
// lavorazioni ad elevato rischio nel comma 784-novies della L. 145/2018),
// D.Lgs. 81/2008 art. 2. Il nome di legge oggi è "percorsi di formazione
// scuola-lavoro": PCTO resta nello slug perché è la parola che le scuole cercano.
// Niente premi, massimali o compagnie (regole del Dipartimento Scuole).

const SLUG = 'soluzioni/scuole/assicurazione-pcto'
const BASE_URL = 'https://www.fimbroker.it'
const OG_IMAGE =
  '/api/og?title=Assicurazione+PCTO+e+scuola-lavoro&tag=Dipartimento+Scuole&sub=Chi+copre+lo+studente+in+azienda+e+nel+tragitto'

export const metadata: Metadata = {
  title: 'Assicurazione PCTO e scuola-lavoro: chi copre lo studente in azienda',
  description:
    'Percorsi di formazione scuola-lavoro, ex PCTO: cosa copre l\'INAIL, il tragitto casa-azienda dopo il D.L. 159/2025, i danni che lo studente causa all\'azienda e le domande da fare prima di firmare la convenzione.',
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    ...OG_BASE,
    url: `/${SLUG}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { images: [OG_IMAGE] },
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${BASE_URL}/${SLUG}`,
  url: `${BASE_URL}/${SLUG}`,
  headline: 'Assicurazione nei percorsi scuola-lavoro: chi copre lo studente in azienda',
  inLanguage: 'it-IT',
  isPartOf: { '@id': `${BASE_URL}/#website` },
  publisher: { '@id': `${BASE_URL}/#organization` },
  author: { '@id': `${BASE_URL}/#organization` },
  datePublished: '2026-10-28',
  audience: { '@type': 'Audience', audienceType: 'Dirigenti scolastici, Direttori S.G.A., tutor scolastici e aziende ospitanti' },
}

const chiCopre = [
  {
    titolo: 'Lo studente si fa male in azienda',
    chi: 'INAIL, poi la polizza infortuni della scuola',
    testo: 'L\'INAIL copre l\'infortunio durante il percorso. Sotto il 6 per cento di invalidità permanente non indennizza il danno: lì lavora la polizza integrativa.',
  },
  {
    titolo: 'Lo studente si fa male andando in azienda',
    chi: 'INAIL',
    testo: 'Dal D.L. 159/2025 il tragitto fra casa e luogo del percorso è coperto, anche per gli infortuni già successi. Il tragitto casa-scuola di ogni giorno no.',
  },
  {
    titolo: 'Lo studente rompe un macchinario',
    chi: 'RC della scuola, se non lo esclude',
    testo: 'È il caso che salta più spesso: molte polizze escludono le cose in uso o in consegna. La convenzione può spostare la responsabilità, la polizza deve seguirla.',
  },
  {
    titolo: 'Lo studente ferisce un cliente o un collega',
    chi: 'RC della scuola, RC dell\'azienda',
    testo: 'Dipende da chi vigilava e da cosa dice la convenzione. Le due polizze devono parlarsi, altrimenti ognuna aspetta che paghi l\'altra.',
  },
]

const norme = [
  {
    rif: 'Art. 18, D.L. 48/2023',
    testo:
      'Estende la tutela INAIL agli alunni per le attività didattiche e per quelle del Piano triennale dell\'offerta formativa. Strutturale dall\'anno scolastico 2025/2026.',
  },
  {
    rif: 'Art. 7, D.L. 159/2025',
    testo:
      'Comma 1: la tutela comprende il tragitto dall\'abitazione o dal domicilio al luogo del percorso scuola-lavoro, e ritorno. Comma 2: le convenzioni non possono adibire gli studenti a lavorazioni ad elevato rischio, come individuate nel documento di valutazione dei rischi dell\'azienda.',
  },
  {
    rif: 'Art. 2, D.Lgs. 81/2008',
    testo:
      'Equipara al lavoratore chi partecipa a iniziative di alternanza tra studio e lavoro: formazione sulla sicurezza e dispositivi di protezione valgono anche per lo studente.',
  },
]

const domande = [
  'La responsabilità civile della scuola nomina i percorsi scuola-lavoro, anche fuori dall\'edificio?',
  'Copre i danni alle attrezzature dell\'azienda che lo studente usa, o li esclude come cose in uso o in consegna?',
  'La polizza infortuni integrativa vale in azienda, nelle trasferte decise dall\'azienda e all\'estero?',
  'Tutor esterni ed esperti aziendali rientrano fra gli assicurati, o restano scoperti?',
  'La convenzione dice chi fa la formazione sulla sicurezza e chi dà i dispositivi di protezione?',
  'Le lavorazioni assegnate allo studente sono fuori da quelle ad elevato rischio del documento di valutazione dei rischi?',
]

export default function AssicurazionePctoPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Istituti Scolastici', href: '/soluzioni/scuole' },
          { name: 'Assicurazione PCTO', href: `/${SLUG}` },
        ]}
      />

      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/soluzioni/scuole" className="hover:text-white transition-colors">Istituti Scolastici</Link>
            <span>/</span>
            <span className="text-white/80">Assicurazione PCTO</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            PCTO e scuola-lavoro: chi copre lo studente quando è in azienda
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed">
            Tre soggetti, una convenzione e almeno tre coperture. Cosa paga l&apos;INAIL, cosa cambia per il tragitto dopo il
            D.L. 159/2025, e le sei domande da fare prima di firmare.
          </p>
        </div>
      </section>

      {/* In breve */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl space-y-5 text-gray-700 leading-relaxed text-lg">
          <h2 className="text-3xl font-black text-primary">In breve</h2>
          <p>
            I percorsi per le competenze trasversali e l&apos;orientamento oggi la legge li chiama percorsi di formazione
            scuola-lavoro. Il nome è cambiato, il problema no: lo studente esce dalla scuola, entra in un&apos;azienda, usa
            attrezzature che non sono sue. Se succede qualcosa, la domanda è sempre la stessa: chi paga?
          </p>
          <p>
            Per l&apos;infortunio la risposta è quasi sempre l&apos;INAIL, e dal 2025 anche per il tragitto. Il punto debole sono
            i danni che lo studente causa: lì decidono la convenzione e la responsabilità civile della scuola, e spesso una
            esclusione scritta in piccolo. Il nostro consiglio è leggere le due carte insieme, prima delle firme di inizio anno.
          </p>
          <p className="text-base">
            Volete un controllo prima delle convenzioni?{' '}
            <a
              href={linkWhatsApp('Buongiorno, scrivo da una scuola per la copertura dei percorsi scuola-lavoro', `/${SLUG}`)}
              className="text-primary font-semibold underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Scriveteci su WhatsApp
            </a>{' '}
            o a{' '}
            <a href={`mailto:${SCUOLE_EMAIL}`} className="text-primary font-semibold underline underline-offset-2">
              {SCUOLE_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Chi copre cosa */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-8">Chi copre cosa, caso per caso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chiCopre.map((c) => (
              <Card key={c.titolo}>
                <h3 className="font-bold text-primary mb-1">{c.titolo}</h3>
                <p className="text-xs font-semibold text-accent mb-3">{c.chi}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{c.testo}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Norme */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-8">Le norme che contano</h2>
          <div className="space-y-4">
            {norme.map((n) => (
              <Card key={n.rif}>
                <h3 className="font-bold text-primary mb-2">{n.rif}</h3>
                <p className="text-gray-700 leading-relaxed">{n.testo}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Domande */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-black mb-4">Sei domande prima di firmare le convenzioni</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Se in segreteria nessuno sa rispondere a una di queste, è lì che si apre il buco.
          </p>
          <ol className="space-y-3 list-decimal pl-6 text-white/90 leading-relaxed">
            {domande.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* Aziende ospitanti */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-3xl font-black text-primary">Se siete l&apos;azienda che ospita</h2>
          <p>
            Lo studente che entra nel vostro laboratorio o nel vostro ufficio, per la sicurezza, è un lavoratore: formazione,
            dispositivi di protezione e niente lavorazioni ad elevato rischio. Per la polizza, guardate che la vostra
            responsabilità civile non escluda gli studenti ospitati, né come terzi né come prestatori di lavoro.
          </p>
          <p>
            <Link href="/soluzioni/artigiani-pmi" className="text-primary font-semibold underline">
              Le coperture per artigiani e PMI
            </Link>{' '}
            ·{' '}
            <Link href="/soluzioni/scuole" className="text-primary font-semibold underline">
              Come lavora il Dipartimento Scuole di FIM
            </Link>
          </p>
        </div>
      </section>

      <FaqSection items={scuolePctoFaq.items} cta={scuolePctoFaq.cta} background="gray" />

      {/* Informativa */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container-custom max-w-4xl">
          <p className="text-xs text-gray-500 leading-relaxed">
            Questa pagina ha valore informativo e non sostituisce la lettura delle condizioni di polizza e delle convenzioni.
            FIM Insurance Broker S.a.s. di Manzo Arturo &amp; C., Via Roma 41, 04012 Cisterna di Latina (LT), è iscritta
            al Registro Unico degli Intermediari assicurativi e riassicurativi, Sezione B, al n. B000405449, ed è soggetta
            alla vigilanza dell&apos;IVASS (<a href="https://www.ivass.it" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.ivass.it</a>). Il compenso dell&apos;intermediario è costituito dalle provvigioni corrisposte
            dalle imprese di assicurazione, comprese nel premio. Prima della sottoscrizione leggere la documentazione
            precontrattuale.{' '}
            <Link href="/trasparenza" className="text-primary underline">Informativa precontrattuale</Link> ·{' '}
            <Link href="/privacy-policy" className="text-primary underline">Privacy</Link> ·{' '}
            <Link href="/reclami" className="text-primary underline">Reclami</Link> (in caso di esito insoddisfacente
            è possibile rivolgersi all&apos;IVASS, Via del Quirinale 21, 00187 Roma). Dipartimento Scuole:{' '}
            <a href={`mailto:${SCUOLE_EMAIL}`} className="text-primary underline">{SCUOLE_EMAIL}</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
