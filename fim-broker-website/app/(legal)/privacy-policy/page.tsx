import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali di FIM Insurance Broker ai sensi del GDPR – Regolamento UE 2016/679.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-16">
      <div className="bg-fim-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-blue-200">
            Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">1. Titolare del Trattamento</h2>
            <p className="text-gray-700 leading-relaxed">
              Il Titolare del trattamento dei dati personali è <strong>FIM Insurance Broker</strong>,
              con sede principale in Via Roma 41, Cisterna di Latina (LT), iscritto al Registro Unico
              degli Intermediari assicurativi tenuto dall&apos;IVASS, Sezione B, n. B000405449.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Per qualsiasi informazione relativa al trattamento dei tuoi dati personali puoi contattarci
              all&apos;indirizzo email: <a href="mailto:privacy@fimbroker.it" className="text-fim-light hover:underline">privacy@fimbroker.it</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">2. Tipologie di Dati Trattati</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Attraverso questo sito web raccogliamo e trattiamo le seguenti categorie di dati:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li><strong>Dati di navigazione</strong>: indirizzo IP, tipo di browser, pagine visitate, orario di accesso</li>
              <li><strong>Dati forniti volontariamente</strong>: nome, cognome, indirizzo email, numero di telefono e qualsiasi altra informazione inserita nei moduli di contatto o di richiesta preventivo</li>
              <li><strong>Dati di comunicazione</strong>: messaggi inviati tramite i form del sito o tramite l&apos;assistente FIMA</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">3. Finalità e Base Giuridica del Trattamento</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">3.1 Gestione delle richieste di contatto e preventivo</h3>
                <p className="text-gray-700 leading-relaxed">
                  I dati forniti tramite i moduli di contatto vengono trattati per rispondere alle tue
                  richieste di informazioni e per elaborare le richieste di preventivo assicurativo.
                  Base giuridica: esecuzione di misure precontrattuali su richiesta dell&apos;interessato (art. 6(1)(b) GDPR).
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">3.2 Obblighi legali e normativi</h3>
                <p className="text-gray-700 leading-relaxed">
                  In qualità di intermediario assicurativo regolamentato, siamo tenuti a conservare
                  determinati dati in adempimento di obblighi normativi (antiriciclaggio, obblighi IVASS, ecc.).
                  Base giuridica: obbligo legale (art. 6(1)(c) GDPR).
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">3.3 Marketing e comunicazioni commerciali</h3>
                <p className="text-gray-700 leading-relaxed">
                  Con il tuo consenso esplicito possiamo inviarti comunicazioni commerciali relative
                  ai nostri servizi assicurativi. Base giuridica: consenso (art. 6(1)(a) GDPR).
                  Puoi revocare il consenso in qualsiasi momento.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">4. Conservazione dei Dati</h2>
            <p className="text-gray-700 leading-relaxed">
              I dati personali vengono conservati per il tempo strettamente necessario al conseguimento
              delle finalità per le quali sono stati raccolti, e comunque non oltre:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside mt-3">
              <li>10 anni per i dati relativi a contratti assicurativi conclusi (obbligo normativo)</li>
              <li>2 anni per le richieste di preventivo non andate a buon fine</li>
              <li>1 anno per i dati di navigazione aggregati</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">5. Condivisione dei Dati</h2>
            <p className="text-gray-700 leading-relaxed">
              I tuoi dati personali non vengono venduti a terzi. Possono essere condivisi con:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside mt-3">
              <li>Compagnie assicurative partner (Allianz, Prima, Bene Assicurazioni, DUAL/Arch) per l&apos;elaborazione dei preventivi e la gestione dei contratti</li>
              <li>IVASS e altri enti di vigilanza in adempimento di obblighi normativi</li>
              <li>Fornitori di servizi tecnici (hosting, email) vincolati da accordi di trattamento dati</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">6. I Tuoi Diritti</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Ai sensi del GDPR, hai diritto di:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li><strong>Accesso</strong>: ottenere conferma del trattamento e copia dei tuoi dati</li>
              <li><strong>Rettifica</strong>: correggere dati inesatti o incompleti</li>
              <li><strong>Cancellazione</strong>: richiedere la cancellazione dei tuoi dati</li>
              <li><strong>Limitazione</strong>: limitare il trattamento in determinate circostanze</li>
              <li><strong>Portabilità</strong>: ricevere i tuoi dati in formato strutturato</li>
              <li><strong>Opposizione</strong>: opporti al trattamento per fini di marketing</li>
              <li><strong>Reclamo</strong>: presentare reclamo al Garante per la Protezione dei Dati Personali</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Per esercitare i tuoi diritti contattaci a:{' '}
              <a href="mailto:privacy@fimbroker.it" className="text-fim-light hover:underline">
                privacy@fimbroker.it
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">7. Sicurezza dei Dati</h2>
            <p className="text-gray-700 leading-relaxed">
              Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati
              personali da accessi non autorizzati, divulgazione, alterazione o distruzione,
              in conformità agli standard di sicurezza richiesti dal GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">8. Aggiornamenti</h2>
            <p className="text-gray-700 leading-relaxed">
              La presente informativa può essere aggiornata periodicamente. Ti invitiamo a
              consultarla regolarmente. La data dell&apos;ultimo aggiornamento è indicata in calce.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Ultimo aggiornamento: gennaio 2025
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
