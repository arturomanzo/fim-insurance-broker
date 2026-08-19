import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import { EMAIL_INFO, EMAIL_RECLAMI, PEC, TEL } from '@/lib/contatti'
import { COMPAGNIE, RAPPORTO_LABELS } from '@/lib/compagnie'
import {
  FONDO_GARANZIA_BROKER,
  NORMATIVA_LABEL,
  PROVVEDIMENTO_VIGENTE,
  RC_PROFESSIONALE_MASSIMALE,
  RUI_DATA_ISCRIZIONE,
  RUI_NUMERO,
  ULTIMA_REVISIONE,
} from '@/lib/compliance'

export const metadata: Metadata = {
  title: 'Trasparenza — Modulo Unico Precontrattuale (MUP)',
  description:
    'Modulo Unico Precontrattuale (MUP) per i prodotti assicurativi — Allegato 3 al Regolamento IVASS 40/2018, aggiornato al Provv. 169/2026. FIM Insurance Broker, RUI Sez. B n. B000405449.',
  alternates: { canonical: '/trasparenza' },
}

/**
 * Sezioni del MUP — Modulo Unico Precontrattuale per i prodotti assicurativi
 * (Allegato 3 al Reg. IVASS 40/2018, come modificato dai Provv. 163/2025 e
 * 169/2026). L'ordine e la numerazione seguono il modulo ufficiale IVASS:
 * non riordinare né accorpare le sezioni.
 */
const SEZIONI_MUP = [
  {
    n: 'Sezione I',
    title: 'Informazioni generali sul distributore che entra in contatto con il contraente',
    body: (
      <>
        <p><strong>Denominazione:</strong> FIM Insurance Broker S.a.s. di Manzo Arturo &amp; C.</p>
        <p><strong>Sede legale:</strong> Via Roma 41, 04012 Cisterna di Latina (LT) — Italia</p>
        <p><strong>P.IVA / C.F.:</strong> 02637640596 — <strong>REA:</strong> LT - 187466</p>
        <p>
          <strong>Recapiti:</strong> tel. {TEL} — email{' '}
          <a href={`mailto:${EMAIL_INFO}`} className="text-primary hover:underline">{EMAIL_INFO}</a>{' '}
          — PEC <a href={`mailto:${PEC}`} className="text-primary hover:underline">{PEC}</a>
        </p>
        <p>
          <strong>Sito internet</strong> attraverso cui avviene la promozione dei contratti di
          assicurazione: www.fimbroker.it
        </p>
        <p>
          <strong>Iscrizione al Registro Unico degli Intermediari (RUI):</strong> Sezione B —
          mediatori di assicurazione e riassicurazione (broker), numero <strong>{RUI_NUMERO}</strong>
          {RUI_DATA_ISCRIZIONE ? <>, iscrizione decorrente dal {RUI_DATA_ISCRIZIONE}</> : null}.
          Gli estremi identificativi e la decorrenza dell&apos;iscrizione possono essere verificati
          consultando il RUI su{' '}
          <a href="https://servizi.ivass.it/RuirPubblica" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">servizi.ivass.it/RuirPubblica</a>.
        </p>
        <p>
          <strong>Tipologia di attività di distribuzione svolta:</strong> distribuzione assicurativa
          e riassicurativa svolta a titolo principale. FIM Insurance Broker non è iscritta alla
          Sezione E del RUI e non opera per conto o su incarico di un altro intermediario.
        </p>
        <p><strong>Legale rappresentante:</strong> Arturo Manzo (socio accomandatario).</p>
        <p>
          <strong>Autorità di vigilanza:</strong> IVASS — Istituto per la Vigilanza sulle
          Assicurazioni, Via del Quirinale 21, 00187 Roma —{' '}
          <a href="https://www.ivass.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ivass.it</a>.
        </p>
      </>
    ),
  },
  {
    n: 'Sezione II',
    title: 'Informazioni sul modello di distribuzione',
    body: (
      <>
        <p>
          FIM Insurance Broker <strong>agisce su incarico del contraente</strong> e non in nome o per
          conto di una o più imprese di assicurazione. È questa la differenza sostanziale fra un
          broker iscritto alla Sezione B e un agente: il mandato ce lo dà il cliente, non la
          compagnia.
        </p>
        <p>
          <strong>Collaborazioni orizzontali.</strong> Una parte dei contratti è distribuita in
          collaborazione con altri intermediari regolarmente iscritti al RUI, ai sensi
          dell&apos;art. 22, comma 10, del D.L. 18 ottobre 2012, n. 179, convertito nella Legge 17
          dicembre 2012, n. 221. Quando il singolo contratto è distribuito in collaborazione,
          l&apos;identità dell&apos;altro intermediario, la sezione del RUI a cui appartiene e il
          ruolo svolto sono indicati nel Modulo consegnato per quel contratto. L&apos;elenco delle
          imprese raggiunte tramite collaborazione è riportato{' '}
          <a href="#imprese" className="text-primary hover:underline">più sotto in questa pagina</a>.
        </p>
      </>
    ),
  },
  {
    n: 'Sezione III',
    title: 'Informazioni relative a potenziali situazioni di conflitto d’interessi',
    body: (
      <>
        <p>
          FIM Insurance Broker <strong>non detiene</strong> una partecipazione diretta o indiretta
          pari o superiore al 10% del capitale sociale o dei diritti di voto di alcuna impresa di
          assicurazione.
        </p>
        <p>
          Nessuna impresa di assicurazione, né alcuna impresa controllante di un&apos;impresa di
          assicurazione, <strong>detiene</strong> una partecipazione diretta o indiretta pari o
          superiore al 10% del capitale sociale o dei diritti di voto di FIM Insurance Broker S.a.s.
        </p>
        <p>
          Il broker ha adottato misure organizzative per identificare, prevenire e gestire i
          conflitti di interesse che possono insorgere nella distribuzione: separazione delle
          funzioni, formazione continua del personale, gestione trasparente delle remunerazioni e
          dei rapporti con le imprese. Se quelle misure non bastassero a evitare il rischio di
          compromettere gli interessi del contraente, il conflitto viene comunicato per iscritto
          prima della conclusione del contratto, con l&apos;indicazione della natura e della fonte,
          così che la decisione resti informata.
        </p>
      </>
    ),
  },
  {
    n: 'Sezione IV',
    title: 'Informazioni sull’attività di distribuzione e consulenza',
    body: (
      <>
        <p>
          FIM Insurance Broker <strong>fornisce consulenza</strong> ai sensi dell&apos;art. 119-ter,
          comma 3, del Codice delle Assicurazioni Private: prima della proposta il contraente riceve
          una raccomandazione personalizzata che spiega i motivi per cui un determinato contratto è
          ritenuto il più indicato a soddisfare le sue richieste ed esigenze.
        </p>
        <p>
          La consulenza è fondata su un&apos;<strong>analisi imparziale e personale</strong> ai sensi
          dell&apos;art. 119-ter, comma 4, del Codice: l&apos;analisi è condotta su un numero
          sufficiente di contratti disponibili sul mercato, tale da consentire una raccomandazione
          formulata secondo criteri professionali.
        </p>
        <p>
          FIM Insurance Broker <strong>non distribuisce in via esclusiva</strong> i contratti di una
          o più imprese di assicurazione e non è vincolata da obblighi contrattuali che le impongano
          di farlo. Per questo motivo la denominazione delle imprese di cui distribuisce i contratti
          è <a href="#imprese" className="text-primary hover:underline">pubblicata in questa pagina</a>{' '}
          e tenuta aggiornata. Il contraente può in ogni momento chiederne la consegna o la
          trasmissione su supporto durevole scrivendo a{' '}
          <a href={`mailto:${EMAIL_INFO}`} className="text-primary hover:underline">{EMAIL_INFO}</a>.
        </p>
        <p>
          Prima di ogni proposta vengono raccolte — anche mediante questionario scritto — le
          informazioni necessarie a comprendere le <strong>richieste ed esigenze</strong> del
          contraente (demands &amp; needs). Il contraente è tenuto a fornire informazioni accurate,
          complete e veritiere: dichiarazioni inesatte o reticenti possono pregiudicare la
          valutazione di adeguatezza e l&apos;efficacia stessa della copertura.
        </p>
      </>
    ),
  },
  {
    n: 'Sezione V',
    title: 'Informazioni sulle remunerazioni',
    body: (
      <>
        <p>
          <strong>Natura del compenso.</strong> FIM Insurance Broker è remunerata mediante{' '}
          <strong>commissione (provvigione) inclusa nel premio</strong> assicurativo e corrisposta
          dall&apos;impresa di assicurazione. In casi specifici, e previo accordo scritto con il
          cliente, può essere previsto un <strong>onorario</strong> corrisposto direttamente dal
          cliente per attività di consulenza qualificata, risk management o assistenza su programmi
          assicurativi complessi. Le due forme possono coesistere sullo stesso rapporto.
        </p>
        <p>
          <strong>Su richiesta del contraente</strong> vengono comunicate la natura e
          l&apos;ammontare del compenso percepito in relazione al contratto proposto, ai sensi
          dell&apos;art. 119-bis del Codice delle Assicurazioni Private.
        </p>
        <p>
          <strong>R.C. auto.</strong> Per i contratti del ramo responsabilità civile auto viene
          comunicata la misura della provvigione percepita, nei termini previsti dall&apos;art. 131
          del Codice delle Assicurazioni Private e dalle relative disposizioni di attuazione.
        </p>
        <p>
          <strong>Collaborazioni orizzontali.</strong> Quando il contratto è distribuito insieme ad
          altri intermediari, l&apos;informativa sul compenso è complessiva: riguarda cioè i
          compensi percepiti da tutti gli intermediari coinvolti nella distribuzione di quel
          prodotto.
        </p>
        <p>
          FIM Insurance Broker non è iscritta alla Sezione D del RUI e non distribuisce polizze
          connesse a mutui o altri finanziamenti in qualità di intermediario bancario o finanziario.
        </p>
      </>
    ),
  },
  {
    n: 'Sezione VI',
    title: 'Informazioni sul pagamento dei premi',
    body: (
      <>
        <p>
          <strong>Separazione patrimoniale.</strong> I premi pagati per il tramite del broker
          costituiscono patrimonio autonomo e separato rispetto a quello dell&apos;intermediario, ai
          sensi dell&apos;art. 117 del Codice delle Assicurazioni Private: sono depositati su un
          conto corrente bancario dedicato e non sono aggredibili dai creditori di FIM Insurance
          Broker.
        </p>
        <p>
          La normativa consente, in alternativa al conto separato, di prestare una fideiussione
          bancaria che attesti una capacità finanziaria permanente pari al 4% dei premi incassati
          (art. 117, comma 3-bis, del Codice). <strong>FIM Insurance Broker non si avvale di questa
          facoltà</strong> e opera con il regime del conto corrente separato.
        </p>
        <p>
          <strong>Efficacia liberatoria.</strong> I premi pagati a FIM Insurance Broker si
          considerano riscossi dall&apos;impresa di assicurazione dal momento del pagamento, con
          effetto liberatorio per il contraente.
        </p>
        <p><strong>Modalità di pagamento ammesse:</strong></p>
        <ol className="list-decimal pl-5 space-y-1 my-2">
          <li>
            assegni bancari, postali o circolari muniti della clausola di non trasferibilità,
            intestati all&apos;impresa di assicurazione oppure all&apos;intermediario espressamente
            in tale qualità;
          </li>
          <li>
            ordini di bonifico e altri mezzi di pagamento bancario o postale, inclusi gli strumenti
            di pagamento elettronici anche on-line, che abbiano come beneficiario uno dei soggetti
            indicati al punto 1;
          </li>
          <li>
            denaro contante, <strong>esclusivamente</strong> per i contratti del ramo responsabilità
            civile auto e per le relative garanzie accessorie riferite allo stesso veicolo assicurato
            per la r.c. auto; per gli altri rami danni il contante è ammesso entro il limite di{' '}
            <strong>750 euro annui per ciascun contratto</strong>.
          </li>
        </ol>
        <p className="text-sm bg-accent/10 border-l-4 border-accent p-3 rounded-r">
          Il limite di 750 euro discende dal Reg. IVASS 40/2018 ed è più stringente della soglia
          antiriciclaggio prevista dal D.Lgs. 231/2007: è quello che vale nel rapporto con noi.
        </p>
      </>
    ),
  },
  {
    n: 'Sezione VII',
    title: 'Informazioni sugli strumenti di tutela del contraente',
    body: (
      <>
        <p>
          <strong>Reclami sul comportamento dell&apos;intermediario.</strong> I reclami relativi al
          comportamento di FIM Insurance Broker vanno inoltrati per iscritto a uno di questi
          recapiti:
        </p>
        <ul className="list-disc pl-5 space-y-1 my-2">
          <li>PEC: <a href={`mailto:${PEC}`} className="text-primary hover:underline">{PEC}</a></li>
          <li>Raccomandata A/R: Ufficio Reclami — FIM Insurance Broker S.a.s., Via Roma 41, 04012 Cisterna di Latina (LT)</li>
          <li>Email: <a href={`mailto:${EMAIL_RECLAMI}`} className="text-primary hover:underline">{EMAIL_RECLAMI}</a></li>
        </ul>
        <p>Il riscontro scritto arriva entro <strong>45 giorni</strong> dalla ricezione del reclamo.</p>
        <p>
          <strong>Reclami sul comportamento dell&apos;impresa.</strong> I reclami che riguardano
          l&apos;impresa di assicurazione o la gestione del contratto vanno inoltrati direttamente
          all&apos;Ufficio Reclami della compagnia, i cui recapiti sono indicati nel DIP Aggiuntivo e
          nelle Condizioni di Assicurazione. Anche in questo caso il termine di riscontro è di 45
          giorni.
        </p>
        <p>
          <strong>Arbitro Assicurativo.</strong> In caso di mancato riscontro entro i 45 giorni o di
          riscontro non soddisfacente, il contraente può presentare ricorso all&apos;Arbitro
          Assicurativo, istituito presso l&apos;IVASS ai sensi dell&apos;art. 187.1 del Codice delle
          Assicurazioni Private e dell&apos;art. 141, comma 7, del Codice del Consumo, e
          disciplinato dal Decreto interministeriale MIMIT 6 novembre 2024, n. 215. Il ricorso si
          presenta esclusivamente online tramite il portale{' '}
          <a href="https://www.arbitroassicurativo.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">arbitroassicurativo.org</a>,
          dove sono consultabili i requisiti di ammissibilità e le modalità di presentazione. La
          procedura è operativa dal 15 gennaio 2026.
        </p>
        <p>
          <strong>Altri rimedi.</strong> Restano disponibili la segnalazione a IVASS per violazioni
          della normativa di settore (
          <a href="https://www.ivass.it/consumatori/reclami/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ivass.it/consumatori/reclami</a>
          ), gli altri sistemi alternativi di risoluzione delle controversie indicati nei DIP
          Aggiuntivi, la mediazione in materia di contratti assicurativi (D.Lgs. 28/2010) e, in ogni
          caso, il ricorso all&apos;Autorità Giudiziaria.
        </p>
        <p>
          <strong>Polizza di responsabilità civile professionale.</strong> L&apos;attività di FIM
          Insurance Broker è coperta da polizza RC professionale conforme ai requisiti dell&apos;art.
          112, comma 3, del Codice e del Reg. IVASS 40/2018, con massimale unico di{' '}
          <strong>{RC_PROFESSIONALE_MASSIMALE}</strong>, sia per singolo sinistro sia in aggregato
          annuo — sopra i minimi di legge. Gli estremi identificativi della polizza sono forniti su
          richiesta scritta.
        </p>
        <p>
          <strong>Fondo di garanzia per i mediatori di assicurazione e riassicurazione.</strong> Se
          il danno patrimoniale causato dall&apos;attività del broker non venisse risarcito
          dall&apos;intermediario né indennizzato attraverso la polizza RC professionale, il
          contraente può rivolgersi al Fondo di garanzia gestito da{' '}
          {FONDO_GARANZIA_BROKER.gestore} — {FONDO_GARANZIA_BROKER.indirizzo}, tel.{' '}
          {FONDO_GARANZIA_BROKER.telefono},{' '}
          <a href={`mailto:${FONDO_GARANZIA_BROKER.email}`} className="text-primary hover:underline">{FONDO_GARANZIA_BROKER.email}</a>{' '}
          (<a href={FONDO_GARANZIA_BROKER.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">consap.it/fondo-brokers</a>).
        </p>
        <p className="text-sm bg-accent/10 border-l-4 border-accent p-3 rounded-r">
          Procedura dettagliata, modulistica e canali di contatto sulla pagina{' '}
          <Link href="/reclami" className="text-primary hover:underline font-semibold">Reclami e Arbitro Assicurativo</Link>.
        </p>
      </>
    ),
  },
  {
    n: 'Sezione VIII',
    title: 'Informazioni sul diritto all’oblio oncologico',
    body: (
      <>
        <p>
          Ai sensi dell&apos;art. 2 della Legge 7 dicembre 2023, n. 193, ai fini della stipulazione
          di un contratto di assicurazione <strong>non possono essere richieste informazioni</strong>{' '}
          relative a patologie oncologiche da cui il contraente o l&apos;assicurato sia stato
          precedentemente affetto e il cui trattamento attivo si sia concluso, senza episodi di
          recidiva, da più di <strong>dieci anni</strong>. Il termine scende a{' '}
          <strong>cinque anni</strong> se la patologia è insorta prima del compimento del
          ventunesimo anno di età. Per alcune patologie il Decreto del Ministero della Salute del 22
          marzo 2024 prevede termini più brevi, indicati nella tabella allegata al decreto stesso.
        </p>
        <p>
          Le stesse informazioni non possono essere acquisite da altre fonti, e{' '}
          <strong>l&apos;assicurato non è tenuto a sottoporsi</strong> a visite mediche di controllo
          o accertamenti sanitari finalizzati a ottenerle.
        </p>
        <p>
          <strong>Cancellazione dei dati.</strong> Quando informazioni di questo tipo siano già
          state acquisite, il contraente o l&apos;assicurato può trasmettere la certificazione
          attestante l&apos;avvenuto oblio oncologico: le informazioni vengono cancellate entro
          trenta giorni dal ricevimento della certificazione, secondo quanto previsto dagli artt.
          56-bis e 56-ter del Reg. IVASS 40/2018.
        </p>
        <p>
          <strong>Clausole nulle.</strong> Le clausole contrattuali in contrasto con l&apos;art. 2,
          commi da 1 a 5, della Legge n. 193 del 2023 sono nulle, e le informazioni eventualmente
          acquisite in violazione del diritto all&apos;oblio non possono incidere sulle condizioni
          del rapporto contrattuale.
        </p>
        <p>
          Le informazioni di dettaglio riferite al singolo prodotto sono riportate nel DIP Aggiuntivo
          redatto dall&apos;impresa di assicurazione.
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
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-2">
              Trasparenza · {NORMATIVA_LABEL}
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-primary mb-3">
              Modulo Unico Precontrattuale
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Qui trovi per intero l&apos;informativa precontrattuale che FIM Insurance Broker
              consegna a ogni cliente prima della sottoscrizione di un contratto assicurativo. Dal
              Provvedimento IVASS n. 147 del 20 giugno 2024 questa informativa si chiama{' '}
              <strong>Modulo Unico Precontrattuale (MUP)</strong> e ha preso il posto dei vecchi
              Allegati 3, 4, 4-bis e 4-ter: un unico documento in otto sezioni al posto di quattro
              moduli separati.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              Il testo che segue è il MUP per i prodotti assicurativi (Allegato 3 al Reg. IVASS
              40/2018), aggiornato al Provvedimento n. {PROVVEDIMENTO_VIGENTE.n} del{' '}
              {PROVVEDIMENTO_VIGENTE.data}. Per i prodotti d&apos;investimento assicurativi (IBIP)
              si applica il MUP dell&apos;Allegato 4, consegnato in aggiunta alla documentazione di
              prodotto.
            </p>
            <p className="text-gray-500 text-sm mt-4">Ultima revisione: {ULTIMA_REVISIONE}</p>
          </Card>

          {/* MUP — otto sezioni */}
          <Card padding="lg">
            <div className="border-l-4 border-primary pl-4 mb-6">
              <p className="text-xs uppercase tracking-wider text-primary font-bold">
                Allegato 3 — Reg. IVASS 40/2018 (testo vigente)
              </p>
              <h2 className="text-2xl font-bold text-primary mt-1">
                Modulo Unico Precontrattuale per i prodotti assicurativi
              </h2>
            </div>
            <div className="space-y-8">
              {SEZIONI_MUP.map((s) => (
                <div key={s.n}>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">{s.n}</p>
                  <h3 className="text-lg font-semibold text-primary mb-3">{s.title}</h3>
                  <div className="prose-fim text-sm text-gray-700 space-y-2">{s.body}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Elenco imprese — assolve l'obbligo della Sezione IV */}
          <Card padding="lg" className="scroll-mt-24" >
            <div id="imprese" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-primary mb-3">
                Imprese di assicurazione di cui distribuiamo i contratti
              </h2>
              <p className="text-gray-700 text-sm mb-4">
                Pubblichiamo questo elenco perché la Sezione IV del MUP lo richiede a chi, come noi,
                non lavora in esclusiva per nessuna compagnia. È aggiornato e puoi chiederne copia su
                supporto durevole in qualsiasi momento.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {COMPAGNIE.map((c) => (
                  <div key={c.name} className="flex items-baseline justify-between gap-3 border-b border-gray-100 py-2">
                    <span className="font-medium text-primary text-sm">{c.name}</span>
                    <span className="text-xs text-gray-500 text-right">
                      {RAPPORTO_LABELS[c.rapporto]}
                      {c.note ? ` · ${c.note}` : ''}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-4">
                Le imprese indicate come &laquo;collaborazione tramite agenzia&raquo; sono raggiunte
                attraverso accordi di collaborazione orizzontale con altri intermediari iscritti al
                RUI: per il singolo contratto gli estremi dell&apos;intermediario coinvolto sono
                indicati nel Modulo che ti consegniamo.
              </p>
            </div>
          </Card>

          {/* DIP / DIP Aggiuntivo */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-3">
              Cosa ricevi oltre al Modulo
            </h2>
            <p className="text-gray-700 mb-4 text-sm">
              Il MUP riguarda noi e il modo in cui lavoriamo. Sul prodotto, la documentazione la
              redige l&apos;impresa di assicurazione e ti viene consegnata o resa accessibile prima
              della sottoscrizione:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              <li>
                <strong>DIP — Documento Informativo Precontrattuale</strong> per i prodotti danni:
                scheda sintetica standardizzata UE (Reg. UE 2017/1469).
              </li>
              <li>
                <strong>DIP Vita</strong> per i prodotti vita e <strong>KID</strong> (Key Information
                Document) per i prodotti d&apos;investimento assicurativi, ai sensi del Reg. UE
                1286/2014 (PRIIPs).
              </li>
              <li>
                <strong>DIP Aggiuntivo</strong> redatto dall&apos;impresa secondo lo schema IVASS:
                dettagli di prodotto, esclusioni, franchigie, regole di liquidazione, recapiti
                dell&apos;Ufficio Reclami della compagnia, informativa sul diritto all&apos;oblio
                oncologico e sulle procedure di ricorso all&apos;Arbitro Assicurativo.
              </li>
              <li>
                <strong>Condizioni di Assicurazione</strong> integrali, glossario tecnico e set
                informativo dell&apos;impresa.
              </li>
              <li>
                <strong>Questionario demands &amp; needs</strong> e, per gli IBIP, questionario di
                adeguatezza e appropriatezza (artt. 119-ter e 121-septies del Codice).
              </li>
              <li>
                Eventuale <strong>relazione di adeguatezza</strong> scritta, su richiesta o per i
                prodotti complessi.
              </li>
            </ul>
            <p className="text-gray-700 mt-4 text-sm">
              Per ricevere copia dei documenti relativi a una specifica compagnia o a un prodotto,
              chiedila in fase di preventivo o scrivici a{' '}
              <a href={`mailto:${EMAIL_INFO}`} className="text-primary hover:underline">{EMAIL_INFO}</a>.
            </p>
          </Card>

          {/* Recesso */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-3">Diritto di recesso</h2>
            <p className="text-gray-700 text-sm">
              Per i contratti stipulati a distanza o fuori dai locali commerciali, il contraente
              consumatore ha diritto di recedere entro <strong>14 giorni</strong> dalla conclusione
              del contratto (<strong>30 giorni</strong> per i contratti vita), senza obbligo di
              motivazione e senza penali, ai sensi del Codice delle Assicurazioni Private e del
              Codice del Consumo. Le modalità di esercizio sono indicate nel contratto e nel DIP
              Aggiuntivo.
            </p>
          </Card>

          {/* Privacy & link finali */}
          <Card padding="lg">
            <h2 className="text-2xl font-bold text-primary mb-3">Privacy e trattamento dati</h2>
            <p className="text-gray-700 text-sm mb-3">
              Il trattamento dei dati personali è disciplinato dal Reg. UE 2016/679 (GDPR) e dalla
              nostra informativa privacy, consegnata insieme alla documentazione precontrattuale.
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
              <strong className="text-primary">Nota.</strong> Questo documento riproduce il Modulo
              Unico Precontrattuale previsto dall&apos;Allegato 3 al Reg. IVASS 40/2018 ed è messo a
              disposizione del pubblico per consultazione. La versione consegnata al singolo cliente
              è datata, sottoscritta dalle parti e integrata con le informazioni specifiche del
              rapporto e del contratto proposto. Per la copia controfirmata o per qualsiasi
              chiarimento, scrivi a{' '}
              <a href={`mailto:${EMAIL_INFO}`} className="text-primary hover:underline">{EMAIL_INFO}</a>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
