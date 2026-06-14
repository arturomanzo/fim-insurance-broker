import type { Metadata } from 'next'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Privacy Lead Meta',
  description:
    'Informativa sul trattamento dei dati raccolti tramite i moduli di contatto pubblicati da FIM Insurance Broker su Facebook e Instagram, ai sensi degli articoli 13 e 14 del GDPR.',
}

export default function PrivacyLeadAdsPage() {
  return (
    <div className="gradient-primary py-12">
      <div className="container-custom">
        <Card padding="lg" className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-primary mb-2">Informativa Privacy — Modulo Lead Meta</h1>
          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: Maggio 2026</p>

          <div className="prose-fim space-y-8">
            <section>
              <p>
                Informativa resa ai sensi degli articoli 13 e 14 del Regolamento UE 2016/679 (GDPR)
                e del D.Lgs. 196/2003 e successive modificazioni, per gli utenti che compilano i
                moduli di contatto pubblicati da FIM Insurance Broker sulle piattaforme Meta
                (Facebook e Instagram).
              </p>
            </section>

            <section>
              <h2>1. Titolare del trattamento</h2>
              <p>
                Il Titolare del trattamento è <strong>FIM Insurance Broker S.a.s. di Manzo Arturo &amp; C.</strong>,
                con sede legale in Via Roma 41, 04012 Cisterna di Latina (LT), P.IVA 02637640596,
                iscritta al RUI Sez. B n. B000405449.
              </p>
              <p>
                Contatto privacy: <a href="mailto:privacy@fimbroker.it" className="text-primary hover:underline">privacy@fimbroker.it</a><br />
                PEC: fiminsurancebrokersas@pec.it
              </p>
            </section>

            <section>
              <h2>2. Tipologie di dati raccolti</h2>
              <p>
                Compilando il modulo &ldquo;Audit gratuito polizze PMI&rdquo; o moduli analoghi pubblicati da
                FIM Insurance Broker sulle piattaforme Meta, l&apos;utente fornisce i seguenti dati:
              </p>
              <ul>
                <li>Nome e cognome</li>
                <li>Indirizzo email</li>
                <li>Numero di telefono</li>
                <li>Settore di attività aziendale</li>
                <li>Numero di dipendenti dell&apos;azienda</li>
                <li>Eventuale elenco delle polizze già in essere (dato facoltativo)</li>
              </ul>
              <p>
                I dati di contatto possono essere precompilati dalla piattaforma Meta sulla base
                delle informazioni associate al profilo dell&apos;utente.
              </p>
            </section>

            <section>
              <h2>3. Finalità e base giuridica del trattamento</h2>
              <ul>
                <li>
                  <strong>Riscontro alla richiesta di audit o preventivo</strong> tramite contatto telefonico ed email
                  (base giuridica: esecuzione di misure precontrattuali su richiesta dell&apos;interessato, art. 6.1.b GDPR)
                </li>
                <li>
                  <strong>Adempimenti normativi IVASS</strong> (Reg. 40/2018, 41/2018 e successive modifiche)
                  (base giuridica: obbligo di legge, art. 6.1.c GDPR)
                </li>
                <li>
                  <strong>Eventuale invio di comunicazioni commerciali</strong> su servizi assicurativi FIM
                  (base giuridica: consenso esplicito e revocabile, art. 6.1.a GDPR)
                </li>
              </ul>
              <p>
                I dati non sono utilizzati per attività di profilazione automatizzata né per processi
                decisionali automatizzati ai sensi dell&apos;art. 22 GDPR.
              </p>
            </section>

            <section>
              <h2>4. Conservazione dei dati</h2>
              <ul>
                <li>Dati per richieste di preventivo non concluse: 24 mesi dall&apos;ultimo contatto utile</li>
                <li>Dati relativi a contratti sottoscritti: 10 anni dall&apos;ultima operazione</li>
                <li>Dati per finalità di marketing: fino a revoca del consenso</li>
              </ul>
            </section>

            <section>
              <h2>5. Destinatari dei dati</h2>
              <p>I dati possono essere comunicati ai seguenti soggetti:</p>
              <ul>
                <li>
                  <strong>Meta Platforms Ireland Ltd.</strong>, gestore della piattaforma di raccolta
                  contatti (Lead Form Facebook/Instagram), in conformità alla propria informativa
                </li>
                <li>
                  <strong>Compagnie assicurative partner di FIM</strong>, limitatamente ai dati necessari
                  per la formulazione di preventivi richiesti dall&apos;interessato — tra cui Generali, AXA,
                  HDI, Roland Italia, AEC Underwriting, MetLife, Bene, Allianz, UnipolSai, Zurich,
                  Groupama, Cattolica, Reale Mutua, Aviva, Ergo, SACE
                </li>
                <li>
                  <strong>Fornitori IT</strong> (servizi di hosting, CRM, posta elettronica) designati
                  Responsabili del trattamento ex art. 28 GDPR
                </li>
                <li>
                  <strong>Autorità competenti</strong> (IVASS, Garante Privacy, Agenzia delle Entrate,
                  Autorità Giudiziaria) ove richiesto dalla legge
                </li>
              </ul>
              <p>
                I dati non sono diffusi né venduti a terzi per finalità di marketing di soggetti
                diversi da FIM Insurance Broker.
              </p>
            </section>

            <section>
              <h2>6. Trasferimento dati extra-UE</h2>
              <p>
                La piattaforma Meta opera anche su server situati al di fuori dello Spazio Economico
                Europeo. Eventuali trasferimenti avvengono in conformità alle Clausole Contrattuali
                Standard approvate dalla Commissione Europea (Decisione 2021/914/UE) o ad altri
                meccanismi di adeguatezza previsti dagli artt. 44-49 GDPR.
              </p>
            </section>

            <section>
              <h2>7. Diritti degli interessati</h2>
              <p>L&apos;interessato può esercitare in qualsiasi momento i seguenti diritti:</p>
              <ul>
                <li>Accesso ai propri dati personali (art. 15 GDPR)</li>
                <li>Rettifica dei dati inesatti (art. 16 GDPR)</li>
                <li>Cancellazione (art. 17 GDPR — &ldquo;diritto all&apos;oblio&rdquo;)</li>
                <li>Limitazione del trattamento (art. 18 GDPR)</li>
                <li>Portabilità dei dati (art. 20 GDPR)</li>
                <li>Opposizione al trattamento (art. 21 GDPR)</li>
                <li>Revoca del consenso in qualsiasi momento (con effetto non retroattivo)</li>
              </ul>
              <p>
                Per esercitare i propri diritti è sufficiente scrivere a:{' '}
                <a href="mailto:privacy@fimbroker.it" className="text-primary hover:underline">privacy@fimbroker.it</a>{' '}
                indicando in oggetto &ldquo;Richiesta privacy Lead Meta&rdquo;. FIM Insurance Broker
                risponderà entro 30 giorni dalla ricezione.
              </p>
            </section>

            <section>
              <h2>8. Conferimento dei dati</h2>
              <p>
                Il conferimento dei dati richiesti dal modulo è facoltativo. Il mancato conferimento
                dei dati di contatto rende tuttavia impossibile dar seguito alla richiesta di audit
                o preventivo formulata dall&apos;interessato.
              </p>
            </section>

            <section>
              <h2>9. Reclami</h2>
              <p>
                Hai diritto di proporre reclamo all&apos;Autorità Garante per la Protezione dei Dati
                Personali (www.garanteprivacy.it).
              </p>
            </section>

            <section>
              <h2>10. Privacy generale del sito</h2>
              <p>
                Per la disciplina generale del trattamento dei dati raccolti tramite il sito{' '}
                <a href="/privacy-policy" className="text-primary hover:underline">fimbroker.it</a>{' '}
                e per l&apos;uso dei cookie, consulta la{' '}
                <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
