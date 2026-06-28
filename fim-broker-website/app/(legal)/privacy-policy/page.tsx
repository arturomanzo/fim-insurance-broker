import type { Metadata } from 'next'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali di FIM Insurance Broker S.a.s. di Manzo Arturo & C. ai sensi del GDPR.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="gradient-primary py-12">
      <div className="container-custom">
        <Card padding="lg" className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-primary mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: Giugno 2026</p>

          <div className="prose-fim space-y-8">
            <section>
              <h2>1. Titolare del trattamento</h2>
              <p>
                FIM Insurance Broker S.a.s. di Manzo Arturo & C., con sede legale in Via Roma 41, 04012 Cisterna di Latina (LT),
                P.IVA 02637640596, è il Titolare del trattamento dei dati personali degli utenti
                che visitano il presente sito web e che richiedono i nostri servizi.
              </p>
              <p>
                Contatto privacy: privacy@fimbroker.it
              </p>
            </section>

            <section>
              <h2>2. Dati raccolti e finalità</h2>
              <p>Raccogliamo e trattiamo le seguenti categorie di dati personali:</p>
              <ul>
                <li><strong>Dati di navigazione</strong>: indirizzo IP, tipo di browser, pagine visitate, per finalità statistiche anonime</li>
                <li><strong>Dati forniti dall&apos;utente</strong>: nome, cognome, email, telefono, richiesti per l&apos;erogazione dei servizi di preventivazione e consulenza</li>
                <li><strong>Dati di comunicazione</strong>: messaggi inviati tramite form di contatto o tramite l&apos;assistente virtuale FIMA (elaborati da Anthropic AI per generare le risposte)</li>
                <li><strong>Dati di iscrizione alla newsletter</strong>: indirizzo email fornito volontariamente per ricevere comunicazioni commerciali e aggiornamenti assicurativi (solo previo consenso esplicito)</li>
                <li><strong>Documenti caricati per la preventivazione</strong>: documenti che l&apos;utente sceglie volontariamente di caricare (es. carta d&apos;identità, patente, libretto di circolazione, visura), trattati al solo fine di elaborare il preventivo richiesto. I file sono conservati in archivio cifrato ad accesso riservato e cancellati al termine della preventivazione (base giuridica: esecuzione di misure precontrattuali su richiesta dell&apos;interessato)</li>
              </ul>
              <p>Le finalità del trattamento sono:</p>
              <ul>
                <li>Rispondere alle richieste di preventivo e informazioni (base giuridica: esecuzione di misure precontrattuali)</li>
                <li>Gestione del rapporto contrattuale (base giuridica: esecuzione del contratto)</li>
                <li>Adempimento di obblighi di legge (base giuridica: obbligo legale)</li>
                <li>Invio di newsletter e comunicazioni commerciali (base giuridica: consenso)</li>
              </ul>
            </section>

            <section>
              <h2>3. Trattamenti con sistemi di intelligenza artificiale (IA)</h2>
              <p>
                Alcuni strumenti del sito si avvalgono di sistemi di intelligenza artificiale forniti
                da <strong>Anthropic, Inc.</strong> (modello &ldquo;Claude&rdquo;). In conformità al
                Regolamento (UE) 2024/1689 (&ldquo;AI Act&rdquo;) ti informiamo che interagisci con un
                sistema di IA nei seguenti casi:
              </p>
              <ul>
                <li>
                  <strong>Assistente virtuale FIMA</strong>: i messaggi che scrivi in chat sono inviati
                  ad Anthropic per generare la risposta. Le risposte sono indicative e non sostituiscono
                  la consulenza di un broker.
                </li>
                <li>
                  <strong>Agente Sinistri AI</strong>: i dati che inserisci per l&apos;apertura della
                  pratica (tipo di sinistro, data, descrizione, recapiti) sono elaborati dall&apos;IA per
                  guidarti e pre-compilare il modulo. La pratica è sempre verificata da un operatore FIM.
                </li>
                <li>
                  <strong>Analizza Polizza</strong>: il documento PDF che carichi viene trasmesso ad
                  Anthropic per l&apos;analisi e la generazione del report. Il file è elaborato in modo
                  transitorio e non viene conservato sui nostri server al termine dell&apos;analisi. Il
                  report ha valore informativo e non costituisce una valutazione di adeguatezza ai sensi
                  della normativa IVASS.
                </li>
              </ul>
              <p>
                Questi strumenti hanno carattere informativo e di supporto: <strong>non adottano
                decisioni automatizzate che producono effetti giuridici</strong> o incidono in modo
                analogo sulla tua persona ai sensi dell&apos;art. 22 GDPR. Una parte dei contenuti del
                blog è inoltre redatta con il supporto dell&apos;IA e sottoposta a revisione editoriale
                umana; tali articoli riportano un avviso dedicato. Per i trasferimenti di dati verso
                Anthropic (USA) vedi la sezione 6.
              </p>
            </section>

            <section>
              <h2>4. Conservazione dei dati</h2>
              <p>
                I dati personali sono conservati per il tempo strettamente necessario alle finalità
                per cui sono stati raccolti:
              </p>
              <ul>
                <li>Dati contrattuali: 10 anni dall&apos;ultima operazione</li>
                <li>Dati per preventivi non conclusi: 24 mesi</li>
                <li>Documenti caricati per la preventivazione: cancellati al termine della preventivazione (al massimo 30 giorni dal caricamento)</li>
                <li>Dati di navigazione: 13 mesi</li>
                <li>Dati per newsletter: fino alla revoca del consenso</li>
              </ul>
            </section>

            <section>
              <h2>5. Diritti degli interessati</h2>
              <p>Hai diritto di:</p>
              <ul>
                <li>Accedere ai tuoi dati personali (art. 15 GDPR)</li>
                <li>Rettificare i dati inesatti (art. 16 GDPR)</li>
                <li>Cancellare i dati (art. 17 GDPR — &ldquo;diritto all&apos;oblio&rdquo;)</li>
                <li>Limitare il trattamento (art. 18 GDPR)</li>
                <li>Portabilità dei dati (art. 20 GDPR)</li>
                <li>Opporti al trattamento (art. 21 GDPR)</li>
                <li>Revocare il consenso in qualsiasi momento</li>
              </ul>
              <p>
                Per esercitare i tuoi diritti, scrivi a: privacy@fimbroker.it
              </p>
            </section>

            <section>
              <h2>6. Trasferimento dati extra-UE</h2>
              <p>
                Alcuni fornitori di servizi tecnologici utilizzati operano al di fuori dell&apos;Unione Europea:
              </p>
              <ul>
                <li>
                  <strong>Anthropic, Inc.</strong> (San Francisco, USA) — elabora, tramite i sistemi di
                  IA descritti alla sezione 3, i messaggi dell&apos;assistente virtuale FIMA e
                  dell&apos;Agente Sinistri AI nonché i documenti caricati su &ldquo;Analizza
                  Polizza&rdquo;. Il trasferimento avviene sulla base delle Clausole Contrattuali
                  Standard (SCC) approvate dalla Commissione Europea.
                </li>
                <li>
                  <strong>Resend, Inc.</strong> (USA) — gestisce l&apos;invio delle email di conferma
                  per richieste di preventivo e messaggi di contatto, nonché il database degli iscritti
                  alla newsletter (Resend Audiences). Il trasferimento avviene sulla base delle
                  Clausole Contrattuali Standard (SCC).
                </li>
              </ul>
              <p>
                I predetti fornitori garantiscono un livello di protezione adeguato ai sensi dell&apos;art. 46 GDPR.
                Per maggiori informazioni sui trasferimenti puoi scrivere a: privacy@fimbroker.it
              </p>
            </section>

            <section>
              <h2>7. Cookie</h2>
              <p>
                Per informazioni sull&apos;uso dei cookie, consulta la nostra{' '}
                <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
              </p>
            </section>

            <section>
              <h2>8. Reclami</h2>
              <p>
                Hai diritto di proporre reclamo all&apos;Autorità Garante per la Protezione
                dei Dati Personali (www.garanteprivacy.it).
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
