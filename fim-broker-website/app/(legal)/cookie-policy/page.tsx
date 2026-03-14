import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sull\'utilizzo dei cookie sul sito di FIM Insurance Broker.',
};

export default function CookiePolicyPage() {
  return (
    <div className="pt-16">
      <div className="bg-fim-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Cookie Policy</h1>
          <p className="text-blue-200">
            Informativa sull&apos;utilizzo dei cookie e tecnologie similari
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">Cosa sono i cookie?</h2>
            <p className="text-gray-700 leading-relaxed">
              I cookie sono piccoli file di testo che i siti web inviano al browser dell&apos;utente e
              vengono memorizzati sul dispositivo. Permettono al sito di ricordare le preferenze
              dell&apos;utente e di raccogliere informazioni statistiche anonime sulla navigazione.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">Tipologie di Cookie Utilizzate</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-fim-primary text-lg mb-3">Cookie Tecnici (necessari)</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Questi cookie sono strettamente necessari per il funzionamento del sito web e non
                  possono essere disattivati. Non richiedono il consenso dell&apos;utente.
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-2 text-gray-600 font-semibold">Cookie</th>
                      <th className="text-left pb-2 text-gray-600 font-semibold">Scopo</th>
                      <th className="text-left pb-2 text-gray-600 font-semibold">Durata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 text-gray-700 font-mono text-xs">session_id</td>
                      <td className="py-2 text-gray-600">Gestione sessione utente</td>
                      <td className="py-2 text-gray-600">Sessione</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-mono text-xs">csrf_token</td>
                      <td className="py-2 text-gray-600">Sicurezza dei form</td>
                      <td className="py-2 text-gray-600">Sessione</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-fim-primary text-lg mb-3">Cookie Analitici</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Questi cookie ci permettono di analizzare le modalità di utilizzo del sito,
                  migliorando l&apos;esperienza dell&apos;utente. I dati raccolti sono anonimi e aggregati.
                  Richiedono il tuo consenso.
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-2 text-gray-600 font-semibold">Servizio</th>
                      <th className="text-left pb-2 text-gray-600 font-semibold">Scopo</th>
                      <th className="text-left pb-2 text-gray-600 font-semibold">Durata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 text-gray-700">Google Analytics</td>
                      <td className="py-2 text-gray-600">Statistiche di navigazione</td>
                      <td className="py-2 text-gray-600">2 anni</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-fim-primary text-lg mb-3">Cookie di Marketing</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Il sito attualmente non utilizza cookie di profilazione o di marketing di terze parti.
                  In caso di futura implementazione, la presente policy verrà aggiornata e ti
                  verrà richiesto il consenso esplicito.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">Come Gestire i Cookie</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Puoi gestire le preferenze sui cookie in qualsiasi momento attraverso le impostazioni
              del tuo browser. Di seguito le istruzioni per i principali browser:
            </p>
            <ul className="space-y-2 text-gray-700">
              {[
                { browser: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { browser: 'Firefox', url: 'https://support.mozilla.org/it/kb/Gestione-dei-cookie' },
                { browser: 'Safari', url: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
                { browser: 'Microsoft Edge', url: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
              ].map((b) => (
                <li key={b.browser} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-fim-accent rounded-full shrink-0" />
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fim-light hover:underline"
                  >
                    Gestione cookie su {b.browser}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-sm mt-4">
              Nota: disabilitare i cookie tecnici potrebbe compromettere il funzionamento
              di alcune funzionalità del sito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-fim-primary mb-4">Contatti</h2>
            <p className="text-gray-700 leading-relaxed">
              Per qualsiasi domanda relativa alla presente Cookie Policy puoi contattarci a:{' '}
              <a href="mailto:privacy@fimbroker.it" className="text-fim-light hover:underline">
                privacy@fimbroker.it
              </a>
            </p>
            <p className="text-gray-500 text-sm mt-6">
              Ultimo aggiornamento: gennaio 2025
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
