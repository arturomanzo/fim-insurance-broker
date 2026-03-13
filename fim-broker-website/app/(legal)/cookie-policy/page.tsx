import type { Metadata } from 'next'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sull\'uso dei cookie sul sito FIM Insurance Broker.',
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <Card padding="lg" className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-primary mb-2">Cookie Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: Gennaio 2024</p>

          <div className="prose-fim space-y-8">
            <section>
              <h2>Cosa sono i cookie?</h2>
              <p>
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo
                (computer, tablet, smartphone) quando visiti un sito web. Servono a rendere più
                efficiente la navigazione e a fornire informazioni ai gestori del sito.
              </p>
            </section>

            <section>
              <h2>Tipologie di cookie utilizzati</h2>

              <h3>Cookie tecnici (necessari)</h3>
              <p>
                Sono essenziali per il funzionamento del sito e non possono essere disabilitati.
                Includono cookie di sessione e preferenze dell&apos;utente.
              </p>

              <h3>Cookie analitici</h3>
              <p>
                Utilizziamo Google Analytics (con IP anonimizzato) per analizzare il traffico e
                migliorare il sito. I dati sono aggregati e anonimi.
              </p>
              <ul>
                <li><strong>_ga</strong>: identifica gli utenti unici (durata: 2 anni)</li>
                <li><strong>_ga_*</strong>: mantiene lo stato della sessione (durata: 2 anni)</li>
              </ul>

              <h3>Cookie di preferenza</h3>
              <p>
                Memorizzano le tue preferenze (es. lingua, preferenze di cookie) per migliorare
                la tua esperienza nelle visite successive.
              </p>
            </section>

            <section>
              <h2>Come gestire i cookie</h2>
              <p>Puoi gestire le preferenze cookie in diversi modi:</p>
              <ul>
                <li>
                  <strong>Banner cookie</strong>: alla prima visita, puoi accettare o rifiutare
                  i cookie non necessari
                </li>
                <li>
                  <strong>Browser</strong>: ogni browser permette di bloccare o eliminare i cookie
                  nelle impostazioni privacy
                </li>
                <li>
                  <strong>Google Analytics</strong>: puoi disattivarlo con il plugin ufficiale
                  disponibile su google.com/settings/ads
                </li>
              </ul>
            </section>

            <section>
              <h2>Cookie di terze parti</h2>
              <p>
                Il sito può contenere link a siti esterni o widget social che impostano cookie
                propri. FIM non è responsabile dei cookie di terze parti.
              </p>
            </section>

            <section>
              <h2>Aggiornamenti</h2>
              <p>
                Questa Cookie Policy può essere aggiornata. Ti consigliamo di consultarla
                periodicamente. Per informazioni: privacy@fimbroker.it
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
