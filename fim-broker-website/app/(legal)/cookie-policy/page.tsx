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
          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: Giugno 2026</p>

          <div className="prose-fim space-y-8">
            <section>
              <h2>Cosa sono i cookie?</h2>
              <p>
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo
                (computer, tablet, smartphone) quando visiti un sito web. Insieme a tecnologie
                analoghe (es. pixel, local storage), servono a far funzionare il sito, ricordare
                le tue preferenze e, previo consenso, misurarne l&apos;utilizzo e supportare le
                attività di marketing.
              </p>
              <p>
                Questa informativa è resa ai sensi degli artt. 13 e 14 del Reg. UE 2016/679 (GDPR),
                dell&apos;art. 122 del D.Lgs. 196/2003 (Codice Privacy) e delle Linee guida del
                Garante per la protezione dei dati personali del 10 giugno 2021 sui cookie.
              </p>
            </section>

            <section>
              <h2>Consenso preventivo</h2>
              <p>
                I <strong>cookie tecnici</strong> non richiedono consenso e sono sempre attivi. Tutti
                i cookie <strong>analitici di terze parti</strong> e di <strong>marketing/profilazione</strong>
                vengono installati <strong>solo dopo che hai prestato il consenso</strong> tramite il
                banner che compare alla prima visita. Fino a quel momento, tali strumenti restano
                disattivati (gestiamo i tag Google con la tecnologia Google Consent Mode v2, con
                impostazione predefinita &ldquo;negato&rdquo;).
              </p>
            </section>

            <section>
              <h2>Tipologie di cookie utilizzati</h2>

              <h3>Cookie tecnici e funzionali (necessari)</h3>
              <p>
                Essenziali per il funzionamento del sito e per memorizzare le tue scelte. Non
                possono essere disabilitati e non richiedono consenso.
              </p>
              <ul>
                <li><strong>fim-cookie-consent</strong> (local storage): memorizza le tue preferenze sui cookie (durata: persistente fino a revoca/cancellazione)</li>
                <li>Cookie di sessione e di sicurezza necessari alla navigazione e all&apos;area riservata</li>
              </ul>

              <h3>Cookie analitici (previo consenso)</h3>
              <p>
                Ci aiutano a capire come viene usato il sito per migliorarlo. Vengono attivati solo
                con il tuo consenso.
              </p>
              <ul>
                <li><strong>Google Analytics 4</strong> (_ga, _ga_*) — statistiche di navigazione con IP anonimizzato (durata: fino a 2 anni). Erogato tramite Google Tag Manager.</li>
                <li><strong>Microsoft Clarity</strong> (_clck, _clsk e analoghi) — heatmap e registrazione aggregata delle sessioni per analisi di usabilità (durata: fino a 1 anno). Fornitore: Microsoft Ireland Operations Ltd.</li>
              </ul>

              <h3>Cookie di marketing / profilazione (previo consenso)</h3>
              <p>
                Utilizzati per misurare le campagne pubblicitarie e mostrare annunci pertinenti.
                Vengono attivati solo con il tuo consenso.
              </p>
              <ul>
                <li><strong>Google Ads</strong> (conversion tracking / remarketing) — gestito tramite Google Tag Manager.</li>
                <li><strong>Meta Pixel</strong> (Facebook/Instagram — _fbp e analoghi) — misurazione campagne e remarketing (durata: fino a 3 mesi).</li>
              </ul>

              <h3>Gestione tag</h3>
              <p>
                Per centralizzare e governare i tag utilizziamo <strong>Google Tag Manager</strong>
                (GTM), che non installa di per sé cookie di profilazione ma orchestra i tag sopra
                indicati nel rispetto del consenso prestato.
              </p>
            </section>

            <section>
              <h2>Come gestire o revocare il consenso</h2>
              <p>Puoi modificare o revocare le tue scelte in qualsiasi momento, con la stessa facilità con cui le hai prestate:</p>
              <ul>
                <li>
                  <strong>Link &ldquo;Preferenze cookie&rdquo;</strong>: presente nel footer di ogni pagina,
                  riapre il banner e ti consente di aggiornare o revocare il consenso.
                </li>
                <li>
                  <strong>Browser</strong>: ogni browser permette di bloccare o eliminare i cookie
                  nelle impostazioni privacy.
                </li>
                <li>
                  <strong>Opt-out di terze parti</strong>: Google Ads/Analytics su{' '}
                  <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">adssettings.google.com</a>;
                  preferenze pubblicitarie Meta dalle impostazioni del tuo account Facebook/Instagram.
                </li>
              </ul>
            </section>

            <section>
              <h2>Trasferimenti extra-UE e ulteriori informazioni</h2>
              <p>
                Alcuni fornitori (Google, Microsoft, Meta) possono trattare dati anche al di fuori
                dell&apos;Unione Europea sulla base delle garanzie previste dagli artt. 44 ss. GDPR
                (Clausole Contrattuali Standard ed eventuali certificazioni Data Privacy Framework).
                Per il dettaglio sui trattamenti, le basi giuridiche e i tuoi diritti consulta la
                nostra <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2>Aggiornamenti</h2>
              <p>
                Questa Cookie Policy può essere aggiornata per adeguarla a modifiche normative o agli
                strumenti utilizzati. Ti consigliamo di consultarla periodicamente. Per informazioni:{' '}
                <a href="mailto:privacy@fimbroker.it" className="text-primary hover:underline">privacy@fimbroker.it</a>.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
