import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { scuoleAffidamentoFaq } from '@/lib/faq/scuole-affidamento'
import { SCUOLE_EMAIL } from '@/lib/scuole'
import { OG_BASE } from '@/lib/seo'
import { linkWhatsApp } from '@/lib/whatsappSito'

// Pagina P11 del piano SEO (marketing/seo nel gestionale). Guida informativa,
// senza modelli di atti da scaricare: il broker che fornisce alla scuola gli
// atti con cui viene scelto è in conflitto di interessi (regole del
// Dipartimento Scuole, decisione di Arturo del 25/10/2026). Niente premi,
// massimali o compagnie.

const SLUG = 'soluzioni/scuole/affidamento-diretto-brokeraggio'
const BASE_URL = 'https://www.fimbroker.it'
const OG_IMAGE =
  '/api/og?title=Affidamento+del+broker+nella+scuola&tag=Dipartimento+Scuole&sub=Art.+50+D.Lgs.+36%2F2023%2C+rotazione%2C+requisiti+da+verificare'

export const metadata: Metadata = {
  title: 'Affidamento diretto del brokeraggio a scuola: la guida',
  description:
    'Come una scuola statale affida il servizio di brokeraggio assicurativo: art. 50 del D.Lgs. 36/2023, D.I. 129/2018, valore del servizio, rotazione e requisiti da verificare nel broker.',
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
  headline: 'Affidamento diretto del servizio di brokeraggio nella scuola',
  inLanguage: 'it-IT',
  isPartOf: { '@id': `${BASE_URL}/#website` },
  publisher: { '@id': `${BASE_URL}/#organization` },
  author: { '@id': `${BASE_URL}/#organization` },
  datePublished: '2026-10-25',
  audience: { '@type': 'Audience', audienceType: 'Dirigenti scolastici e Direttori S.G.A.' },
}

const passaggi = [
  {
    n: '01',
    titolo: 'Il fabbisogno',
    testo:
      'La scuola mette per iscritto perché le serve un broker: polizze da rinnovare, sinistri da seguire, capitolato da scrivere sulla gara delle coperture. È la premessa della decisione a contrarre.',
  },
  {
    n: '02',
    titolo: 'L\'indagine di mercato, se la volete',
    testo:
      'L\'art. 50 consente l\'affidamento diretto anche senza consultare più operatori. Molti istituti raccolgono comunque due o tre proposte di servizio: rende più facile motivare la scelta e rispettare la rotazione.',
  },
  {
    n: '03',
    titolo: 'La verifica dei requisiti',
    testo:
      'Iscrizione al RUI, polizza di responsabilità professionale, requisiti generali del Codice, regolarità contributiva, esperienza documentata con istituti scolastici. L\'elenco completo è più sotto.',
  },
  {
    n: '04',
    titolo: 'La decisione a contrarre',
    testo:
      'Il Dirigente adotta la determina: oggetto, durata, valore stimato e criterio usato per stimarlo, motivazione della scelta e della rotazione, CIG. Va pubblicata in amministrazione trasparente.',
  },
  {
    n: '05',
    titolo: 'L\'incarico',
    testo:
      'La lettera d\'incarico fissa compiti, durata, obblighi di riservatezza e la regola sui premi: pagati al broker, con effetto liberatorio per la scuola (art. 118 D.Lgs. 209/2005).',
  },
]

const requisiti = [
  {
    voce: 'Iscrizione al RUI, sezione B',
    come: 'Il Registro unico degli intermediari è pubblico sul sito dell\'IVASS: si cerca per nome o numero e si stampa la visura (art. 109 D.Lgs. 209/2005).',
  },
  {
    voce: 'Polizza di responsabilità civile professionale',
    come: 'Obbligatoria per il broker, con i massimali minimi fissati dalla normativa europea e aggiornati periodicamente. Chiedete compagnia, numero e scadenza.',
  },
  {
    voce: 'Requisiti generali del Codice',
    come: 'Le dichiarazioni sull\'assenza delle cause di esclusione degli artt. 94 e 95 del D.Lgs. 36/2023 e la regolarità contributiva.',
  },
  {
    voce: 'Tracciabilità dei flussi',
    come: 'Il conto dedicato e gli impegni dell\'art. 3 della Legge 136/2010.',
  },
  {
    voce: 'Esperienza con le scuole',
    come: 'L\'art. 50 chiede di scegliere soggetti con documentate esperienze pregresse idonee: istituti seguiti, capitolati scritti, sinistri gestiti.',
  },
  {
    voce: 'Trasparenza sul compenso',
    come: 'Il broker dichiara che è remunerato con la provvigione compresa nel premio e che non chiede altro alla scuola.',
  },
  {
    voce: 'Assenza di conflitti di interessi',
    come: 'Una dichiarazione scritta: il broker non è vincolato a una sola compagnia, quindi può confrontare il mercato, e non ha scritto gli atti della procedura con cui viene scelto.',
  },
]

export default function AffidamentoBrokeraggioPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Istituti Scolastici', href: '/soluzioni/scuole' },
          { name: 'Affidamento del brokeraggio', href: `/${SLUG}` },
        ]}
      />

      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/soluzioni/scuole" className="hover:text-white transition-colors">Istituti Scolastici</Link>
            <span>/</span>
            <span className="text-white/80">Affidamento del brokeraggio</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            Affidare il servizio di brokeraggio: come fa una scuola statale
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed">
            Guida per Dirigenti Scolastici e Direttori S.G.A. La norma, il valore del servizio, la rotazione e quello che
            conviene verificare nel broker prima di firmare la determina.
          </p>
        </div>
      </section>

      {/* In breve */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl space-y-5 text-gray-700 leading-relaxed text-lg">
          <h2 className="text-3xl font-black text-primary">In breve</h2>
          <p>
            Il broker è il consulente che lavora per la scuola sul mercato assicurativo: legge le polizze, scrive il
            capitolato della gara sulle coperture, confronta le offerte e segue i sinistri. Non costa niente
            all&apos;istituto, perché è remunerato dalla provvigione compresa nel premio. Ma resta un contratto di
            servizi, quindi nella scuola statale si affida con le regole del Codice dei contratti pubblici.
          </p>
          <p>
            Per importi come quelli del brokeraggio scolastico la strada è l&apos;affidamento diretto. Gli atti sono della
            scuola dall&apos;inizio alla fine. Il broker porta i propri documenti, non scrive la determina con cui viene
            scelto.
          </p>
          <p className="text-base">
            Una domanda sulla vostra situazione?{' '}
            <a
              href={linkWhatsApp('Buongiorno, scrivo da una scuola per l\'affidamento del broker', `/${SLUG}`)}
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

      {/* La norma */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-3xl font-black text-primary">Le norme che contano</h2>
          <p>
            <strong>Art. 50, comma 1, lett. b), del D.Lgs. 36/2023.</strong> Per i servizi di importo inferiore a
            140.000 euro la stazione appaltante può affidare direttamente, anche senza consultare più operatori,
            scegliendo soggetti con documentate esperienze pregresse idonee all&apos;incarico.
          </p>
          <p>
            <strong>Art. 49 del D.Lgs. 36/2023, il principio di rotazione.</strong> Di regola non si affida di nuovo allo
            stesso contraente uscente quando due affidamenti consecutivi riguardano lo stesso settore di servizi. La
            norma ammette deroghe motivate, legate per esempio alla struttura del mercato, all&apos;accurata esecuzione
            del contratto precedente e alla qualità della prestazione, e prevede una deroga per gli affidamenti diretti
            sotto i 5.000 euro.
          </p>
          <p>
            <strong>D.I. 28 agosto 2018, n. 129.</strong> È il regolamento di contabilità delle scuole. L&apos;attività
            negoziale spetta al Dirigente Scolastico; per gli affidamenti oltre i 10.000 euro il Consiglio
            d&apos;Istituto fissa criteri e limiti (art. 45, comma 2, lett. a). Conviene controllare cosa prevede la
            delibera del vostro istituto prima di stimare il valore.
          </p>
          <p>
            <strong>Art. 118 del D.Lgs. 209/2005.</strong> Il premio pagato al broker libera la scuola come se fosse
            pagato alla compagnia. È la clausola che va scritta nell&apos;incarico e poi ripresa nei documenti della gara
            sulle polizze.
          </p>
        </div>
      </section>

      {/* Il valore */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-3xl font-black text-primary">Quanto vale un servizio che non si paga</h2>
          <p>
            È la domanda che blocca più segreterie. Il servizio non ha un esborso diretto, ma il codice chiede comunque un
            valore stimato: serve per il CIG e per stabilire la procedura. Una formula specifica per il brokeraggio la
            norma non la dà.
          </p>
          <p>
            Nella prassi degli istituti il valore si calcola come provvigione attesa sui premi delle polizze che il broker
            seguirà, per tutta la durata dell&apos;incarico. Quello che conta è scrivere nella determina il criterio
            usato, così chiunque legga l&apos;atto capisce da dove viene il numero.
          </p>
        </div>
      </section>

      {/* Passaggi */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-8">I passaggi, in ordine</h2>
          <div className="space-y-4">
            {passaggi.map((p) => (
              <Card key={p.n} className="flex items-start gap-5">
                <span className="text-2xl font-black text-accent w-10 flex-shrink-0">{p.n}</span>
                <div>
                  <h3 className="font-bold text-primary mb-1">{p.titolo}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.testo}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requisiti */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-4">Cosa verificare nel broker</h2>
          <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
            Sono le carte che qualunque broker serio vi consegna senza che le chiediate due volte. Se una manca, è già una
            risposta.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requisiti.map((r) => (
              <Card key={r.voce}>
                <h3 className="font-bold text-primary mb-2">{r.voce}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{r.come}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Due momenti distinti */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom max-w-3xl space-y-5 leading-relaxed">
          <h2 className="text-3xl font-black">Due momenti da tenere separati</h2>
          <p className="text-white/85">
            Il primo è l&apos;incarico al broker: lo decide la scuola, con atti scritti dalla scuola. Il broker partecipa
            come qualunque candidato e porta i suoi documenti. Per questo su questa pagina non trovate modelli di determina
            o di avviso da scaricare: chi vi propone gli atti con cui sceglierlo sta già mescolando i due ruoli.
          </p>
          <p className="text-white/85">
            Il secondo è la gara sulle polizze, che arriva dopo l&apos;incarico. Qui il broker lavora per la scuola:
            scrive il capitolato sui rischi dell&apos;istituto, raccoglie le offerte sullo stesso testo e consegna al
            Dirigente un confronto motivato. La scelta della compagnia resta un atto della scuola.
          </p>
          <p className="text-white/85">
            <Link href="/soluzioni/scuole" className="underline underline-offset-2 hover:text-accent">
              Come lavora il Dipartimento Scuole di FIM
            </Link>
          </p>
        </div>
      </section>

      <FaqSection items={scuoleAffidamentoFaq.items} cta={scuoleAffidamentoFaq.cta} background="gray" />

      {/* Informativa */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container-custom max-w-4xl">
          <p className="text-xs text-gray-500 leading-relaxed">
            Questa guida ha valore informativo e non sostituisce le valutazioni dell&apos;istituto sugli atti che adotta.
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
