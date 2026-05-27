import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Trasparenza — Informativa precontrattuale IDD',
  description: 'Allegato 3 (informativa sull\'intermediario) e Allegato 4 (informativa sulla distribuzione) ai sensi del Regolamento IVASS 40/2018 come modificato dal Provv. n. 163/2025. FIM Insurance Broker — RUI Sez. B n. B000405449.',
  alternates: { canonical: '/trasparenza' },
}

const sectionsAll3 = [
  {
    n: 'Sez. I',
    title: 'Informazioni generali sull\'intermediario',
    body: (
      <>
        <p><strong>Denominazione:</strong> FIM Insurance Broker S.a.s. di Manzo Arturo & C.</p>
        <p><strong>Sede legale:</strong> Via Roma 41, 04012 Cisterna di Latina (LT) — Italia</p>
        <p><strong>P.IVA / C.F.:</strong> 02637640596 — <strong>REA:</strong> LT - 187466</p>
        <p><strong>Telefono:</strong> +39 06 96883381 — <strong>Email:</strong> info@fimbroker.it — <strong>PEC:</strong> fiminsurancebrokersas@pec.it</p>
        <p><strong>Sito web:</strong> www.fimbroker.it</p>
        <p><strong>Iscrizione al Registro Unico degli Intermediari (RUI):</strong> Sezione B (broker), numero <strong>B000405449</strong>, decorrenza iscrizione consultabile sul portale IVASS.</p>
        <p><strong>Autorità di vigilanza:</strong> IVASS — Istituto per la Vigilanza sulle Assicurazioni, Via del Quirinale 21, 00187 Roma — www.ivass.it. La verifica dell&apos;iscrizione è effettuabile su servizi.ivass.it/RuirPubblica.</p>
        <p><strong>Legale rappresentante:</strong> Arturo Manzo (socio accomandatario).</p>
      </>
    ),
  },
  {
    n: 'Sez. II',
    title: 'Informazioni sulle remunerazioni e sull\'eventuale possesso di partecipazioni',
    body: (
      <>
        <p>
          <strong>Natura del compenso.</strong> FIM Insurance Broker è remunerata mediante <strong>provvigione</strong>
          corrisposta dall&apos;impresa di assicurazione, già compresa nel premio pagato dal cliente. In
          casi specifici, e previo accordo scritto con il cliente, può essere previsto un <strong>onorario</strong>
          (fee) per attività di consulenza qualificata, risk management o assistenza per polizze complesse.
        </p>
        <p>
          <strong>Trasparenza.</strong> Su richiesta del cliente, l&apos;intermediario fornisce informazioni sulla
          natura e sull&apos;ammontare del compenso percepito in relazione al contratto proposto, ai sensi
          dell&apos;art. 119-bis del Codice delle Assicurazioni Private.
        </p>
        <p>
          <strong>Partecipazioni.</strong> FIM Insurance Broker <strong>non detiene</strong> alcuna partecipazione,
          diretta o indiretta, pari o superiore al 10% del capitale sociale o dei diritti di voto in alcuna
          impresa di assicurazione. Allo stesso modo, nessuna impresa di assicurazione o sua controllante
          detiene una partecipazione pari o superiore al 10% del capitale sociale o dei diritti di voto di
          FIM Insurance Broker S.a.s.
        </p>
      </>
    ),
  },
  {
    n: 'Sez. III',
    title: 'Strumenti di tutela del cliente',
    body: (
      <>
        <p>
          <strong>Polizza RC professionale.</strong> L&apos;attività di FIM Insurance Broker è coperta da
          polizza di Responsabilità Civile Professionale conforme ai requisiti previsti dall&apos;art. 112,
          c. 3 del CAP e dal Reg. IVASS 40/2018, con <strong>massimale unico di € 2.500.000</strong>
          (sia per singolo sinistro sia in aggregato annuo) — superiore ai minimi normativi richiesti.
          Estremi identificativi della polizza (compagnia, numero, decorrenza) disponibili su richiesta
          scritta del cliente.
        </p>
        <p>
          <strong>Separazione patrimoniale.</strong> I premi pagati dal cliente all&apos;intermediario costituiscono
          patrimonio separato rispetto a quello del broker, ai sensi dell&apos;art. 117 del CAP. Tali somme
          sono accantonate su conto corrente bancario dedicato e non sono aggredibili dai creditori
          dell&apos;intermediario.
        </p>
        <p>
          <strong>Fondo di garanzia per l&apos;attività dei broker.</strong> L&apos;intermediario aderisce al
          Fondo di Garanzia istituito presso CONSAP, a tutela dei clienti per gli importi versati
          all&apos;intermediario e non riversati alle imprese, e per gli indennizzi non corrisposti agli
          aventi diritto.
        </p>
      </>
    ),
  },
  {
    n: 'Sez. IV',
    title: 'Reclami e risoluzione alternativa delle controversie',
    body: (
      <>
        <p>
          <strong>Reclami all&apos;intermediario.</strong> Eventuali reclami relativi al comportamento di
          FIM Insurance Broker devono essere inoltrati per iscritto a:
        </p>
        <ul className="list-disc pl-5 space-y-1 my-2">
          <li>PEC: <a href="mailto:fiminsurancebrokersas@pec.it" className="text-primary hover:underline">fiminsurancebrokersas@pec.it</a></li>
          <li>Raccomandata A/R: Ufficio Reclami — FIM Insurance Broker S.a.s., Via Roma 41, 04012 Cisterna di Latina (LT)</li>
          <li>Email: <a href="mailto:info@fimbroker.it" className="text-primary hover:underline">info@fimbroker.it</a></li>
        </ul>
        <p>L&apos;intermediario risponde entro <strong>45 giorni</strong> dalla ricezione, ai sensi del Reg. IVASS 40/2018 (mod. Provv. 163/2025).</p>
        <p>
          <strong>Reclami all&apos;impresa.</strong> I reclami relativi al comportamento dell&apos;impresa o alla
          gestione del contratto vanno inoltrati direttamente all&apos;Ufficio Reclami della compagnia,
          i cui recapiti sono indicati nel DIP Aggiuntivo e nelle Condizioni di Assicurazione.
        </p>
        <p>
          <strong>Arbitro Assicurativo.</strong> Dal <strong>15 gennaio 2026</strong> è operativo l&apos;Arbitro
          Assicurativo (D.Lgs. 215/2024): in caso di mancata risposta entro 45 giorni o di risposta
          non soddisfacente, il cliente può presentare ricorso gratuito entro 12 mesi sul portale{' '}
          <a href="https://www.arbitroassicurativo.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">arbitroassicurativo.it</a>.
        </p>
        <p>
          <strong>Segnalazioni a IVASS</strong> per violazioni della normativa di settore:{' '}
          <a href="https://www.ivass.it/consumatori/reclami/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ivass.it/consumatori/reclami</a>.
        </p>
        <p>
          <strong>Mediazione obbligatoria.</strong> In materia di contratti assicurativi (D.Lgs. 28/2010),
          presso un Organismo di Mediazione iscritto al Ministero della Giustizia. Resta in ogni caso
          ferma la facoltà di adire l&apos;Autorità Giudiziaria.
        </p>
        <p className="text-sm bg-accent/10 border-l-4 border-accent p-3 rounded-r">
          Procedura dettagliata, modulistica e canali di contatto sulla pagina{' '}
          <Link href="/reclami" className="text-primary hover:underline font-semibold">Reclami e Arbitro Assicurativo</Link>.
        </p>
      </>
    ),
  },
] as const

const sectionsAll4 = [
  {
    n: '1',
    title: 'Natura del rapporto con le imprese e ampia analisi del mercato',
    body: (
      <>
        <p>
          FIM Insurance Broker opera in qualità di <strong>broker</strong> iscritto alla Sezione B del RUI: agisce
          su incarico del cliente e non per conto di una specifica impresa di assicurazione. La consulenza
          è fornita sulla base di un&apos;<strong>analisi imparziale e personale</strong> di un numero sufficiente
          di contratti disponibili sul mercato, tale da consentire una raccomandazione coerente con le
          richieste ed esigenze del cliente, ai sensi dell&apos;art. 119-ter, c. 3, del CAP.
        </p>
        <p>
          FIM intrattiene rapporti con oltre 30 imprese di assicurazione, italiane ed estere operanti in
          Italia in regime di stabilimento o libera prestazione di servizi, tramite mandati diretti,
          accordi di collaborazione con agenzie generali o partnership di prodotto. L&apos;elenco aggiornato
          è disponibile in ufficio e fornito al cliente su richiesta.
        </p>
      </>
    ),
  },
  {
    n: '2',
    title: 'Demands & Needs — adeguatezza del contratto',
    body: (
      <>
        <p>
          Prima della proposta di ogni contratto, FIM Insurance Broker raccoglie dal cliente — anche
          mediante questionario scritto — le informazioni necessarie a comprendere le sue{' '}
          <strong>richieste ed esigenze</strong> (demands &amp; needs) e, per i prodotti IBIP (a contenuto
          finanziario), a valutare l&apos;<strong>adeguatezza</strong> e l&apos;<strong>appropriatezza</strong> del
          prodotto rispetto a obiettivi di investimento, situazione finanziaria, esperienza e conoscenza
          del cliente, ai sensi degli artt. 119-ter e 121-septies del CAP.
        </p>
        <p>
          Il cliente è tenuto a fornire informazioni accurate, complete e veritiere: dichiarazioni
          inesatte o reticenti possono pregiudicare la valutazione dell&apos;adeguatezza e l&apos;efficacia
          della copertura.
        </p>
      </>
    ),
  },
  {
    n: '3',
    title: 'Conflitti di interesse',
    body: (
      <>
        <p>
          FIM Insurance Broker ha adottato misure organizzative idonee a <strong>identificare, prevenire e
          gestire</strong> i conflitti di interesse che potrebbero insorgere nello svolgimento dell&apos;attività
          di distribuzione, ai sensi degli artt. 119-bis del CAP e 27 del Reg. IVASS 40/2018. Tali misure
          comprendono: separazione delle funzioni, formazione continua del personale, gestione trasparente
          delle remunerazioni e dei rapporti con le imprese.
        </p>
        <p>
          Qualora le misure adottate non siano sufficienti a evitare il rischio di compromettere gli
          interessi del cliente, l&apos;intermediario informa preventivamente e per iscritto il cliente
          sulla natura e fonte del conflitto, consentendogli di assumere una decisione informata.
        </p>
      </>
    ),
  },
  {
    n: '4',
    title: 'Pagamento del premio e separazione patrimoniale',
    body: (
      <>
        <p>
          I premi pagati a FIM Insurance Broker sono <strong>versati su conto corrente bancario separato</strong>{' '}
          (art. 117 CAP) e si considerano riscossi dall&apos;impresa di assicurazione dal momento del pagamento,
          con efficacia liberatoria per il cliente.
        </p>
        <p>
          Modalità di pagamento accettate: bonifico bancario, assegno bancario o circolare intestato a
          FIM Insurance Broker S.a.s., POS/carta di credito, sistemi di pagamento elettronico tracciabili.
          <strong> Non sono accettati pagamenti in contanti</strong> per importi pari o superiori ai limiti
          previsti dalla normativa antiriciclaggio (D.Lgs. 231/2007).
        </p>
      </>
    ),
  },
  {
    n: '5',
    title: 'Documentazione consegnata al cliente',
    body: (
      <>
        <p>Prima della sottoscrizione di ciascun contratto, il cliente riceve la seguente documentazione:</p>
        <ul className="list-disc pl-5 space-y-1 my-2">
          <li>Il presente <strong>Allegato 3</strong> (informativa sull&apos;intermediario) e <strong>Allegato 4</strong> (informativa sulla distribuzione);</li>
          <li><strong>DIP</strong> (Documento Informativo Precontrattuale) e <strong>DIP Aggiuntivo</strong> redatti dall&apos;impresa di assicurazione;</li>
          <li>Per i prodotti IBIP: <strong>KID</strong> (Key Information Document) ai sensi del Reg. (UE) 1286/2014 (PRIIPs);</li>
          <li><strong>Condizioni di Assicurazione</strong> e set informativo dell&apos;impresa;</li>
          <li><strong>Questionario demands &amp; needs</strong> e, per gli IBIP, questionario di adeguatezza;</li>
          <li>Eventuale <strong>relazione di adeguatezza</strong> scritta, su richiesta o per i prodotti complessi.</li>
        </ul>
      </>
    ),
  },
  {
    n: '6',
    title: 'Diritto di recesso e ripensamento',
    body: (
      <>
        <p>
          Per i contratti stipulati a distanza o fuori dai locali commerciali, il cliente consumatore
          ha diritto di recesso entro <strong>14 giorni</strong> dalla conclusione del contratto (30 giorni
          per i contratti vita) senza obbligo di indicare motivazione e senza penali, ai sensi del CAP
          e del Codice del Consumo. Modalità di esercizio del recesso indicate nel contratto e nel DIP
          Aggiuntivo.
        </p>
      </>
    ),
  },
] as const

export default function TrasparenzaPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <Card padding="lg">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-2">Trasparenza · Reg. IVASS 40/2018 mod. Provv. 163/2025</p>
            <h1 className="text-3xl md:text-4xl font-black text-primary mb-3">
              Trasparenza e informativa precontrattuale
            </h1>
            <p className="text-gray-600 leading-relaxed">
              In questa sezione pubblichiamo l&apos;informativa precontrattuale completa che FIM Insurance Broker
              consegna a ciascun cliente prima della sottoscrizione di un contratto assicurativo, ai sensi
              del Regolamento IVASS n. 40/2018 (Allegati 3 e 4) come modificato dal Provv. n. 163/2025 di
              recepimento del D.Lgs. 215/2024 (Arbitro Assicurativo).
            </p>
            <p className="text-gray-500 text-sm mt-4">Ultimo aggiornamento: Maggio 2026</p>
          </Card>

          {/* Allegato 3 */}
          <Card padding="lg">
            <div className="border-l-4 border-primary pl-4 mb-6">
              <p className="text-xs uppercase tracking-wider text-primary font-bold">Allegato 3 — Reg. IVASS 40/2018 (testo vigente)</p>
              <h2 className="text-2xl font-bold text-primary mt-1">Informativa sull&apos;intermediario assicurativo</h2>
            </div>
            <div className="space-y-8">
              {sectionsAll3.map((s) => (
                <div key={s.n}>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">{s.n}</p>
                  <h3 className="text-lg font-semibold text-primary mb-3">{s.title}</h3>
                  <div className="prose-fim text-sm text-gray-700 space-y-2">{s.body}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Allegato 4 */}
          <Card padding="lg">
            <div className="border-l-4 border-primary pl-4 mb-6">
              <p className="text-xs uppercase tracking-wider text-primary font-bold">Allegato 4 — Reg. IVASS 40/2018 (testo vigente)</p>
              <h2 className="text-2xl font-bold text-primary mt-1">Informativa sulla distribuzione del prodotto</h2>
            </div>
            <div className="space-y-8">
              {sectionsAll4.map((s) => (
                <div key={s.n}>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Punto {s.n}</p>
                  <h3 className="text-lg font-semibold text-primary mb-3">{s.title}</h3>
                  <div className="prose-fim text-sm text-gray-700 space-y-2">{s.body}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* DIP / DIP Aggiuntivo */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-3">DIP, DIP Aggiuntivo, KID e CGA</h2>
            <p className="text-gray-700 mb-4">
              Per ogni prodotto assicurativo, l&apos;impresa di assicurazione mette a disposizione del cliente
              i seguenti documenti precontrattuali, che FIM Insurance Broker consegna o rende accessibili
              prima della sottoscrizione:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              <li>
                <strong>DIP — Documento Informativo Precontrattuale</strong> (per prodotti danni non vita):
                scheda sintetica standardizzata UE (Reg. UE 2017/1469).
              </li>
              <li>
                <strong>DIP Vita</strong> (per prodotti vita) e <strong>KID</strong> (Key Information Document)
                per i prodotti IBIP, ai sensi del Reg. (UE) 1286/2014 (PRIIPs).
              </li>
              <li>
                <strong>DIP Aggiuntivo</strong> redatto dall&apos;impresa secondo lo schema IVASS, contenente
                informazioni di dettaglio sul prodotto, esclusioni, franchigie, regole di liquidazione,
                recapiti dell&apos;Ufficio Reclami della compagnia.
              </li>
              <li>
                <strong>Condizioni di Assicurazione (CGA)</strong> integrali, glossario tecnico e set
                informativo dell&apos;impresa.
              </li>
            </ul>
            <p className="text-gray-700 mt-4 text-sm">
              I documenti sono prodotti dall&apos;impresa di assicurazione e personalizzati sulla singola
              proposta. Per ricevere copia dei documenti relativi a una specifica compagnia o prodotto,
              richiedila in fase di preventivo o scrivici a{' '}
              <a href="mailto:info@fimbroker.it" className="text-primary hover:underline">info@fimbroker.it</a>.
            </p>
          </Card>

          {/* Privacy & link finali */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-3">Privacy e trattamento dati</h2>
            <p className="text-gray-700 text-sm mb-3">
              Il trattamento dei dati personali del cliente è disciplinato dal Reg. UE 2016/679 (GDPR) e
              dalla nostra informativa privacy, consegnata al cliente unitamente alla documentazione
              precontrattuale.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/privacy-policy" className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors">
                Privacy Policy
              </Link>
              <Link href="/note-legali" className="inline-flex items-center px-4 py-2 bg-white border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary/5 transition-colors">
                Note Legali
              </Link>
              <Link href="/reclami" className="inline-flex items-center px-4 py-2 bg-white border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary/5 transition-colors">
                Reclami e Arbitro Assicurativo
              </Link>
            </div>
          </Card>

          {/* Nota finale */}
          <Card padding="lg" className="bg-primary/5 border-primary/20">
            <p className="text-sm text-gray-700">
              <strong className="text-primary">Nota.</strong> Il presente documento integra l&apos;informativa
              precontrattuale prevista dal Reg. IVASS 40/2018 (Allegati 3 e 4) come modificato dal
              Provvedimento n. 163/2025 e dal D.Lgs. 215/2024. È messo a disposizione del pubblico in
              forma di consultazione: la versione consegnata al singolo cliente è sottoscritta dalle parti
              e include eventuali specifiche del rapporto. Per la copia controfirmata o per qualsiasi
              chiarimento, scrivere a{' '}
              <a href="mailto:info@fimbroker.it" className="text-primary hover:underline">info@fimbroker.it</a>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
