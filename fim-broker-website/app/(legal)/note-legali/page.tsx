import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Note Legali',
  description: 'Note legali, informazioni sull\'intermediario assicurativo e dichiarazioni normative di FIM Insurance Broker.',
};

export default function NoteLegaliPage() {
  return (
    <div className="pt-16">
      <div className="bg-fim-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Note Legali</h1>
          <p className="text-blue-200">
            Informazioni sull&apos;intermediario assicurativo e dichiarazioni normative
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* RUI Card */}
        <div className="bg-fim-primary rounded-2xl p-8 text-white mb-12">
          <div className="flex items-start gap-5">
            <Shield size={40} className="text-fim-accent shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Intermediario Assicurativo Autorizzato</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-blue-200 mb-1">Denominazione</div>
                  <div className="font-semibold">FIM Insurance Broker</div>
                </div>
                <div>
                  <div className="text-blue-200 mb-1">Registro</div>
                  <div className="font-semibold">RUI – Registro Unico Intermediari (IVASS)</div>
                </div>
                <div>
                  <div className="text-blue-200 mb-1">Sezione</div>
                  <div className="font-semibold">B (Broker Assicurativi)</div>
                </div>
                <div>
                  <div className="text-blue-200 mb-1">Numero RUI</div>
                  <div className="font-semibold text-fim-accent">B000405449</div>
                </div>
                <div>
                  <div className="text-blue-200 mb-1">Sede Principale</div>
                  <div className="font-semibold">Via Roma 41 – Cisterna di Latina (LT)</div>
                </div>
                <div>
                  <div className="text-blue-200 mb-1">Sede Operativa</div>
                  <div className="font-semibold">Firenze (FI)</div>
                </div>
              </div>
              <p className="text-blue-200 text-xs mt-4">
                Puoi verificare l&apos;iscrizione al RUI sul sito dell&apos;IVASS:{' '}
                <a
                  href="https://www.ivass.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fim-accent hover:underline"
                >
                  www.ivass.it
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">1. Proprietà del Sito</h2>
            <p className="text-gray-700 leading-relaxed">
              Il presente sito web <strong>www.fimbroker.it</strong> è di proprietà di FIM Insurance
              Broker. Tutti i contenuti presenti (testi, immagini, loghi, grafica) sono protetti da
              copyright. È vietata la riproduzione, anche parziale, senza autorizzazione scritta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">2. Natura dell&apos;Attività</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              FIM Insurance Broker è un intermediario assicurativo iscritto nella Sezione B del
              Registro Unico degli Intermediari assicurativi (Broker), tenuto dall&apos;IVASS ai sensi
              del D.Lgs. 7 settembre 2005, n. 209 (Codice delle Assicurazioni Private) e successive
              modificazioni.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In qualità di broker, FIM agisce nell&apos;esclusivo interesse del cliente e non è
              vincolato da accordi di distribuzione esclusiva con alcuna compagnia assicurativa,
              pur operando in collaborazione con Allianz, Prima Assicurazioni, Bene Assicurazioni,
              DUAL/Arch e altri soggetti.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">3. Limitazione di Responsabilità</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Le informazioni contenute in questo sito hanno carattere puramente informativo e non
              costituiscono consulenza assicurativa vincolante né offerta contrattuale.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              FIM Insurance Broker non è responsabile per eventuali imprecisioni, omissioni o
              aggiornamenti tardivi dei contenuti pubblicati. Si raccomanda di contattare
              direttamente un broker FIM per una consulenza personalizzata e aggiornata.
            </p>
            <p className="text-gray-700 leading-relaxed">
              L&apos;utilizzo dell&apos;assistente AI FIMA ha finalità informative e orientative. Le risposte
              di FIMA non costituiscono consulenza assicurativa professionale e non sostituiscono
              il rapporto diretto con un intermediario autorizzato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">4. Normativa Applicabile e Vigilanza</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              FIM Insurance Broker è soggetto alla vigilanza dell&apos;<strong>IVASS</strong> (Istituto per
              la Vigilanza sulle Assicurazioni), via del Quirinale 21, 00187 Roma.
            </p>
            <p className="text-gray-700 leading-relaxed">
              L&apos;attività è svolta in conformità al D.Lgs. 209/2005 (Codice delle Assicurazioni
              Private), alla Direttiva UE 2016/97 (IDD – Insurance Distribution Directive) e alle
              relative disposizioni di attuazione emanate dall&apos;IVASS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">5. Conflitti di Interesse</h2>
            <p className="text-gray-700 leading-relaxed">
              FIM Insurance Broker adotta una politica di gestione dei conflitti di interesse
              finalizzata a garantire che i clienti siano trattati equamente. Su richiesta, è
              possibile ottenere copia della policy adottata. La remunerazione del broker avviene
              principalmente tramite commissioni corrisposte dalle compagnie assicurative; tale
              informazione viene comunicata al cliente prima della conclusione del contratto,
              ai sensi dell&apos;art. 120-quinquies del Codice delle Assicurazioni.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">6. Reclami</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Il cliente ha diritto di presentare un reclamo a FIM Insurance Broker tramite:
            </p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside mb-4">
              <li>Email: <a href="mailto:reclami@fimbroker.it" className="text-fim-light hover:underline">reclami@fimbroker.it</a></li>
              <li>Posta: Via Roma 41, Cisterna di Latina (LT)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              FIM risponderà al reclamo entro 45 giorni dal ricevimento. In caso di risposta
              insoddisfacente o di mancata risposta, il cliente può rivolgersi all&apos;IVASS
              (www.ivass.it) o ricorrere alla procedura di mediazione obbligatoria prevista dalla legge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">7. Legge Applicabile e Foro Competente</h2>
            <p className="text-gray-700 leading-relaxed">
              Il presente sito e i relativi rapporti giuridici sono regolati dalla legge italiana.
              Per qualsiasi controversia è competente il Foro di Latina, salvo diversa disposizione
              di legge a tutela del consumatore.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
