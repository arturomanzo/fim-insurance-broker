import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqSection from '@/components/ui/FaqSection'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { scuoleRcPatrimonialeFaq } from '@/lib/faq/scuole-rc-patrimoniale'
import { SCUOLE_EMAIL } from '@/lib/scuole'
import { OG_BASE } from '@/lib/seo'
import { linkWhatsApp } from '@/lib/whatsappSito'

// Pagina P12 del piano SEO (marketing/seo nel gestionale). Norme lette su
// normattiva il 28/10/2026: L. 20/1994 art. 1 nel testo dopo la L. 1/2026
// (commi 1, 1-octies, 2, 4-bis), D.L. 200/2025 art. 1 c. 19-quinquies (il 4-bis
// vale dal 1° gennaio 2027), L. 244/2007 art. 3 c. 59, L. 312/1980 art. 61.
// Niente premi, massimali o compagnie (regole del Dipartimento Scuole).

const SLUG = 'soluzioni/scuole/rc-patrimoniale-dirigente-dsga'
const BASE_URL = 'https://www.fimbroker.it'
const OG_IMAGE =
  '/api/og?title=RC+patrimoniale+di+Dirigente+e+DSGA&tag=Dipartimento+Scuole&sub=Dal+1%C2%B0+gennaio+2027+la+polizza+diventa+un+obbligo'

export const metadata: Metadata = {
  title: 'RC patrimoniale Dirigente scolastico e DSGA: obbligatoria dal 2027',
  description:
    'Dal 1° gennaio 2027 chi gestisce risorse pubbliche deve avere una polizza per la colpa grave (art. 1, c. 4-bis, L. 20/1994). Cosa cambia per Dirigenti e D.S.G.A., perché la paga la persona e cosa guardare nel contratto.',
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
  headline: 'RC patrimoniale di Dirigente Scolastico e D.S.G.A.: dal 2027 è un obbligo',
  inLanguage: 'it-IT',
  isPartOf: { '@id': `${BASE_URL}/#website` },
  publisher: { '@id': `${BASE_URL}/#organization` },
  author: { '@id': `${BASE_URL}/#organization` },
  datePublished: '2026-10-28',
  audience: { '@type': 'Audience', audienceType: 'Dirigenti scolastici e Direttori S.G.A.' },
}

const norme = [
  {
    rif: 'Art. 1, comma 4-bis, L. 20/1994',
    testo:
      'Chi assume un incarico che comporta la gestione di risorse pubbliche, e per questo è sottoposto alla giurisdizione della Corte dei conti, deve stipulare prima dell\'incarico una polizza per i danni patrimoniali causati all\'amministrazione per colpa grave. Nel giudizio la compagnia è litisconsorte necessario.',
    nota: 'Introdotto dalla L. 7 gennaio 2026, n. 1. Si applica dal 1° gennaio 2027 (D.L. 200/2025, convertito dalla L. 26/2026).',
  },
  {
    rif: 'Art. 3, comma 59, L. 244/2007',
    testo:
      'È nullo il contratto con cui un ente pubblico assicura i propri amministratori per la responsabilità verso lo Stato e per quella contabile. Chi lo firma o lo proroga, e chi ne beneficia, rimborsa dieci volte i premi come danno erariale.',
    nota: 'Per questo la polizza è della persona: la intesta e la paga il Dirigente o il D.S.G.A.',
  },
  {
    rif: 'Art. 1, commi 1, 1-octies e 2, L. 20/1994',
    testo:
      'Si risponde solo per dolo o colpa grave. Per la colpa grave la Corte mette a carico del responsabile non più del 30 per cento del danno accertato e comunque non più del doppio della retribuzione lorda annua. Il diritto al risarcimento si prescrive in cinque anni dal fatto.',
    nota: 'Il limite non vale per il dolo e per l\'illecito arricchimento.',
  },
  {
    rif: 'Art. 61, L. 312/1980',
    testo:
      'Per i danni legati al comportamento degli alunni il personale della scuola risponde verso l\'amministrazione solo per dolo o colpa grave nella vigilanza. Verso i terzi risponde l\'amministrazione, salvo rivalsa.',
    nota: 'È la strada per cui un infortunio in cortile può diventare una questione personale.',
  },
]

const dove = [
  {
    titolo: 'Contratti e affidamenti',
    testo: 'Una procedura sbagliata, un affidamento contestato, un contratto prorogato senza titolo. Sono gli atti che il Dirigente firma più spesso.',
  },
  {
    titolo: 'Programma annuale e pagamenti',
    testo: 'Spese non autorizzate, pagamenti in ritardo con interessi e penali, somme perse per una scadenza mancata. È il terreno del D.S.G.A.',
  },
  {
    titolo: 'Personale',
    testo: 'Un contenzioso perso per un errore di procedura, supplenze o compensi liquidati senza i presupposti.',
  },
  {
    titolo: 'Vigilanza sugli alunni',
    testo: 'L\'amministrazione risarcisce la famiglia e poi può rivalersi su chi doveva vigilare, se c\'è colpa grave.',
  },
]

const controlli = [
  {
    voce: 'Chi è assicurato e per cosa',
    come: 'La polizza deve nominare la tua funzione, Dirigente o D.S.G.A., e coprire la responsabilità amministrativa e contabile per colpa grave. Non la RC verso terzi: quella è un\'altra cosa.',
  },
  {
    voce: 'Retroattività',
    come: 'Con una prescrizione di cinque anni dal fatto, una polizza senza retroattività lascia scoperti gli atti che hai già firmato.',
  },
  {
    voce: 'Garanzia postuma',
    come: 'Per la pensione, il trasferimento o la fine dell\'incarico. La richiesta della Procura contabile può arrivare anni dopo.',
  },
  {
    voce: 'Massimale',
    come: 'La legge non lo fissa. Si sceglie guardando quanto puoi essere chiamato a pagare per colpa grave, che ha un tetto legato alla tua retribuzione.',
  },
  {
    voce: 'Spese di difesa',
    come: 'Avvocato e consulenti davanti alla Corte dei conti, dall\'invito a dedurre in poi. Controlla se sono comprese e con quale limite.',
  },
  {
    voce: 'Esclusioni',
    come: 'Il dolo non è mai assicurabile. Guarda cosa altro esclude il contratto: sanzioni, fatti già noti, incarichi aggiuntivi.',
  },
]

export default function RcPatrimonialeDirigenteDsgaPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Istituti Scolastici', href: '/soluzioni/scuole' },
          { name: 'RC patrimoniale Dirigente e D.S.G.A.', href: `/${SLUG}` },
        ]}
      />

      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/soluzioni/scuole" className="hover:text-white transition-colors">Istituti Scolastici</Link>
            <span>/</span>
            <span className="text-white/80">RC patrimoniale Dirigente e D.S.G.A.</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            Dal 1° gennaio 2027
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            RC patrimoniale di Dirigente e D.S.G.A.: dal 2027 la polizza diventa un obbligo
          </h1>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed">
            La riforma della Corte dei conti chiede a chi gestisce risorse pubbliche di assicurarsi per la colpa grave.
            È una polizza tua, non della scuola. Ecco cosa dice la legge e cosa guardare prima di firmare.
          </p>
        </div>
      </section>

      {/* In breve */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl space-y-5 text-gray-700 leading-relaxed text-lg">
          <h2 className="text-3xl font-black text-primary">In breve</h2>
          <p>
            Fino a oggi la RC patrimoniale era la garanzia che il Dirigente e il D.S.G.A. sapevano di dover avere e
            rimandavano. Dal 1° gennaio 2027 non si rimanda più: la L. 20/1994, come modificata dalla L. 1/2026, chiede a
            chi assume un incarico con gestione di risorse pubbliche di stipulare prima una polizza per i danni causati
            all&apos;amministrazione per colpa grave.
          </p>
          <p>
            La nostra raccomandazione è semplice: arriva a quella data con la polizza già in mano, e con una retroattività
            che copra gli anni in cui hai già firmato. La legge non dice altro, né massimali né regole per chi è già in
            servizio. Le scelte che contano stanno nel contratto.
          </p>
          <p className="text-base">
            Hai già una polizza e vuoi sapere se regge?{' '}
            <a
              href={linkWhatsApp('Buongiorno, vorrei far controllare la mia polizza RC patrimoniale', `/${SLUG}`)}
              className="text-primary font-semibold underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Scrivici su WhatsApp
            </a>{' '}
            o a{' '}
            <a href={`mailto:${SCUOLE_EMAIL}`} className="text-primary font-semibold underline underline-offset-2">
              {SCUOLE_EMAIL}
            </a>
            . Resta una conversazione fra te e noi.
          </p>
        </div>
      </section>

      {/* Le norme */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-8">Le norme che contano</h2>
          <div className="space-y-4">
            {norme.map((n) => (
              <Card key={n.rif}>
                <h3 className="font-bold text-primary mb-2">{n.rif}</h3>
                <p className="text-gray-700 leading-relaxed">{n.testo}</p>
                <p className="text-sm text-gray-500 mt-3">{n.nota}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dove nasce il danno */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-4">Dove nasce, di solito, un danno erariale a scuola</h2>
          <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
            Non servono scandali. Bastano un atto firmato di corsa, una scadenza saltata, una vigilanza organizzata male.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dove.map((d) => (
              <Card key={d.titolo}>
                <h3 className="font-bold text-primary mb-2">{d.titolo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{d.testo}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cosa guardare */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-black text-primary mb-4">Cosa guardare nel contratto</h2>
          <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
            Due polizze con lo stesso nome possono valere cose molto diverse. Queste sono le sei righe che leggiamo per prime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {controlli.map((c) => (
              <Card key={c.voce}>
                <h3 className="font-bold text-primary mb-2">{c.voce}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{c.come}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Polizza personale */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom max-w-3xl space-y-5 leading-relaxed">
          <h2 className="text-3xl font-black">Una polizza tua, fuori dalla gara della scuola</h2>
          <p className="text-white/85">
            La gara sulle polizze dell&apos;istituto riguarda alunni, personale e responsabilità della scuola. La RC
            patrimoniale sta fuori: la scuola non può pagarla e non passa dagli uffici dell&apos;istituto. Ti seguiamo come
            cliente privato, con la riservatezza che si deve a una questione personale.
          </p>
          <p className="text-white/85">
            <Link href="/soluzioni/scuole" className="underline underline-offset-2 hover:text-accent">
              Come lavora il Dipartimento Scuole di FIM
            </Link>
          </p>
        </div>
      </section>

      <FaqSection items={scuoleRcPatrimonialeFaq.items} cta={scuoleRcPatrimonialeFaq.cta} background="gray" />

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
