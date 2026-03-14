import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali di FIM Insurance Broker ai sensi del Regolamento UE 2016/679 (GDPR).',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-fim-primary mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: 1 gennaio 2025</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-fim-primary">1. Titolare del trattamento</h2>
          <p>FIM Insurance Broker, iscritto al RUI Sez. B n. B000405449, con sede in Via Roma 41, Cisterna di Latina (LT). Email: info@fimbroker.it</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">2. Dati trattati e finalità</h2>
          <p>FIM Insurance Broker tratta i dati personali degli utenti per le seguenti finalità:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Rispondere alle richieste di contatto e preventivo</li>
            <li>Erogare i servizi assicurativi richiesti</li>
            <li>Adempiere agli obblighi di legge</li>
            <li>Inviare comunicazioni commerciali (previo consenso)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">3. Base giuridica</h2>
          <p>Il trattamento è basato sul consenso dell'interessato, sull'esecuzione di un contratto o sul legittimo interesse del titolare, secondo quanto previsto dal GDPR (Regolamento UE 2016/679).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">4. Conservazione dei dati</h2>
          <p>I dati sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti e comunque nel rispetto degli obblighi di legge applicabili al settore assicurativo.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">5. Diritti dell'interessato</h2>
          <p>Gli interessati possono esercitare i diritti previsti dagli artt. 15-22 del GDPR (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione) inviando una richiesta a info@fimbroker.it.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">6. Reclami</h2>
          <p>È possibile proporre reclamo al Garante per la Protezione dei Dati Personali (www.garanteprivacy.it).</p>
        </section>
      </div>
    </div>
  );
}
