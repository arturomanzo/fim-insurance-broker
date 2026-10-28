import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { scuoleParitarieNidiFaq } from '@/lib/faq/scuole-paritarie-nidi'
import { SCUOLE_EMAIL } from '@/lib/scuole'
import { OG_BASE } from '@/lib/seo'
import { linkWhatsApp } from '@/lib/whatsappSito'

// Pagina P13 del piano SEO (marketing/seo nel gestionale). Norme lette su
// normattiva il 28/10/2026: D.L. 48/2023 art. 18 (INAIL per gli alunni delle
// scuole statali, paritarie e non paritarie, strutturale dal 2025/2026; i nidi
// non sono nominati), L. 62/2000 art. 1, D.Lgs. 65/2017 art. 2.
// Niente premi, massimali o compagnie (regole del Dipartimento Scuole).

const SLUG = 'soluzioni/scuole/paritarie-asili-nido'
const BASE_URL = 'https://www.fimbroker.it'
const OG_IMAGE =
  '/api/og?title=Scuole+paritarie+e+asili+nido&tag=Dipartimento+Scuole&sub=RC%2C+infortuni%2C+edificio+e+tutela+legale+per+chi+gestisce'

export const metadata: Metadata = {
  title: 'Assicurazione scuola paritaria e asilo nido: cosa serve al gestore',
  description:
    'Polizze per chi gestisce una scuola paritaria o un asilo nido: responsabilità civile, infortuni di alunni e bambini, edificio e dotazioni, tutela legale. Cosa copre l\'INAIL e cosa no, spiegato sul testo della legge.',
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
  headline: 'Scuole paritarie e asili nido: le polizze di chi gestisce',
  inLanguage: 'it-IT',
  isPartOf: { '@id': `${BASE_URL}/#website` },
  publisher: { '@id': `${BASE_URL}/#organization` },
  author: { '@id': `${BASE_URL}/#organization` },
  datePublished: '2026-10-28',
  audience: { '@type': 'Audience', audienceType: 'Gestori di scuole paritarie e servizi educativi per l\'infanzia' },
}

const differenze = [
  {
    titolo: 'Niente gara',
    testo: 'Il Codice dei contratti pubblici riguarda le amministrazioni. Il gestore privato sceglie broker e polizze con un atto interno, nei tempi che decide lui.',
  },
  {
    titolo: 'L\'edificio è affar vostro',
    testo: 'Nella statale l\'immobile è dell\'ente locale. Qui è vostro o in affitto: incendio, acqua, furto e danni all\'immobile del proprietario diventano rischi del gestore.',
  },
  {
    titolo: 'Il personale è vostro',
    testo: 'Educatori, insegnanti, cuoche, ausiliari: siete il datore di lavoro. Oltre all\'INAIL dei dipendenti serve la responsabilità civile verso chi lavora con voi.',
  },
  {
    titolo: 'INAIL sì alla paritaria, non al nido',
    testo: 'Gli alunni delle paritarie rientrano nella tutela INAIL dell\'art. 18 del D.L. 48/2023. La norma parla di scuole, e il nido per legge è un servizio educativo: i suoi bambini non sono nominati.',
  },
]

const coperture = [
  {
    titolo: 'Responsabilità civile',
    testo: 'Verso alunni, bambini, famiglie e terzi, e verso il personale. Con tutti gli assicurati dentro: dipendenti, collaboratori, esperti esterni, volontari, tirocinanti.',
  },
  {
    titolo: 'Infortuni di alunni e bambini',
    testo: 'Al nido è la tutela principale. In una paritaria copre quello che l\'INAIL lascia fuori: le invalidità sotto il 6 per cento, le cure private, gli occhiali e l\'apparecchio dei denti.',
  },
  {
    titolo: 'Edificio, arredi e dotazioni',
    testo: 'Incendio, eventi atmosferici, acqua, furto. Se siete in affitto, i danni all\'immobile di cui rispondete verso il proprietario.',
  },
  {
    titolo: 'Catastrofale',
    testo: 'Obbligatoria se il gestore è un\'impresa iscritta al Registro delle imprese, come una cooperativa o una società. Consigliata comunque a chi ha l\'edificio di proprietà.',
  },
  {
    titolo: 'Tutela legale',
    testo: 'Contestazioni delle famiglie, contenziosi con il personale, procedimenti dopo un infortunio. L\'avvocato serve prima che arrivi il conto del danno.',
  },
  {
    titolo: 'Dati e sistemi',
    testo: 'Registro, pagelle, foto, certificati medici dei bambini. Una violazione dei dati di minori va notificata al Garante e, se il rischio è alto, alle famiglie (artt. 33 e 34 GDPR).',
  },
]

const steps = [
  {
    n: '1',
    title: 'Ci mandate le polizze che avete',
    desc: 'Tutte, anche quella dell\'edificio e quella del furgone del servizio mensa, se c\'è. Spesso i buchi stanno fra una polizza e l\'altra.',
  },
  {
    n: '2',
    title: 'Le leggiamo sul vostro rischio',
    desc: 'Quanti bambini, quali età, chi lavora con voi, che attività fate fuori sede. Vi diciamo per iscritto cosa copre, cosa manca e cosa pagate due volte.',
  },
  {
    n: '3',
    title: 'Confronto e scelta',
    desc: 'Se serve cambiare, chiediamo le offerte alle compagnie sullo stesso testo e vi consegniamo un confronto motivato. La scelta resta del gestore.',
  },
]

export default function ParitarieAsiliNidoPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Istituti Scolastici', href: '/soluzioni/scuole' },
          { name: 'Paritarie e asili nido', href: `/${SLUG}` },
        ]}
      />

      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/soluzioni/scuole" className="hover:text-white transition-colors">Istituti Scolastici</Link>
            <span>/</span>
            <span className="text-white/80">Paritarie e asili nido</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            Scuole paritarie e asili nido: le polizze le sceglie chi gestisce
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed">
            Niente gara, niente ente locale che assicura l&apos;edificio, e un&apos;INAIL che copre gli alunni della paritaria ma non i
            bambini del nido. Ecco cosa serve a chi gestisce, e dove di solito mancano i pezzi.
          </p>
        </div>
      </section>

      {/* In breve */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl space-y-5 text-gray-700 leading-relaxed text-lg">
          <h2 className="text-3xl font-black text-primary">In breve</h2>
          <p>
            Una scuola statale ha l&apos;edificio del Comune, il personale dello Stato e una gara per le polizze. Una paritaria o un
            nido privato hanno tutto in carico al gestore: immobile, dipendenti, contratti con le famiglie. Le polizze sono di
            più e le decidete voi.
          </p>
          <p>
            Il nostro consiglio è partire dalla responsabilità civile e dagli infortuni, perché è lì che arrivano le richieste
            delle famiglie. Al nido gli infortuni contano ancora di più: la tutela INAIL dell&apos;art. 18 del D.L. 48/2023 parla di alunni delle scuole, e i bambini del nido non li nomina.
          </p>
          <p className="text-base">
            Volete un parere sulle polizze che avete?{' '}
            <a
              href={linkWhatsApp('Buongiorno, gestisco una scuola paritaria o un nido e vorrei far leggere le polizze', `/${SLUG}`)}
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

      {/* Differenze */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-8">Cosa cambia rispetto a una scuola statale</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differenze.map((d) => (
              <Card key={d.titolo}>
                <h3 className="font-bold text-primary mb-2">{d.titolo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{d.testo}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coperture */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-4">Le coperture da guardare</h2>
          <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
            Non tutte servono a tutti: un nido in affitto con dieci bambini non è una paritaria con l&apos;edificio di proprietà e
            i laboratori. Ma queste sono le sei voci che leggiamo ogni volta.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coperture.map((c) => (
              <Card key={c.titolo}>
                <h3 className="font-bold text-primary mb-2">{c.titolo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{c.testo}</p>
              </Card>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Il premio lo calcola la compagnia sul vostro rischio: numero di alunni e bambini, età, attività, edificio. Per questo
            qui non trovate prezzi.
          </p>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">Come lavoriamo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              La lettura delle polizze è gratuita: il nostro compenso arriva dalle compagnie, solo se decidete di assicurarvi con noi.
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
          <p className="text-center text-sm text-gray-600 mt-8">
            <Link href="/soluzioni/scuole" className="text-primary font-semibold underline">
              Come lavora il Dipartimento Scuole di FIM
            </Link>
          </p>
        </div>
      </section>

      <FaqSection items={scuoleParitarieNidiFaq.items} cta={scuoleParitarieNidiFaq.cta} />

      {/* Informativa */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container-custom max-w-4xl">
          <p className="text-xs text-gray-500 leading-relaxed">
            Questa pagina ha valore informativo e non sostituisce la lettura delle condizioni di polizza.
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
