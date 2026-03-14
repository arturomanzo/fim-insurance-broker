import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sull\'uso dei cookie nel sito di FIM Insurance Broker.',
};

export default function CookiePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-fim-primary mb-2">Cookie Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: 1 gennaio 2025</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-fim-primary">Cosa sono i cookie</h2>
          <p>I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell'utente durante la navigazione. Vengono utilizzati per far funzionare correttamente il sito, migliorare l'esperienza utente e raccogliere informazioni statistiche.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">Cookie utilizzati</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border border-gray-200">Nome</th>
                <th className="text-left p-3 border border-gray-200">Tipo</th>
                <th className="text-left p-3 border border-gray-200">Durata</th>
                <th className="text-left p-3 border border-gray-200">Finalità</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200">_session</td>
                <td className="p-3 border border-gray-200">Tecnico</td>
                <td className="p-3 border border-gray-200">Sessione</td>
                <td className="p-3 border border-gray-200">Funzionamento del sito</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">Come gestire i cookie</h2>
          <p>È possibile disabilitare i cookie nelle impostazioni del browser. La disabilitazione di alcuni cookie potrebbe influire sul corretto funzionamento del sito. Per maggiori informazioni, consulta la guida del tuo browser.</p>
        </section>
      </div>
    </div>
  );
}
