import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Note Legali',
  description: 'Note legali e informazioni societarie di FIM Insurance Broker S.a.s. — iscrizione RUI, attività svolta, risoluzione alternativa delle controversie e Arbitro Assicurativo.',
  alternates: { canonical: '/note-legali' },
}

export default function NoteLegaliPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <Card padding="lg" className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-primary mb-2">Note Legali</h1>
          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: agosto 2026 — Modulo Unico Precontrattuale (Provv. IVASS n. 147/2024) aggiornato ai Provv. n. 163/2025 (Arbitro Assicurativo) e n. 169/2026 (diritto all&apos;oblio oncologico)</p>

          <div className="prose-fim space-y-8">
            <section>
              <h2>Informazioni societarie</h2>
              <p>
                <strong>FIM Insurance Broker S.a.s. di Manzo Arturo & C.</strong><br />
                Sede legale: Via Roma 41, 04012 Cisterna di Latina (LT)<br />
                P.IVA e C.F.: 02637640596<br />
                REA: LT - 187466<br />
                PEC: fiminsurancebrokersas@pec.it<br />
                Email: info@fimbroker.it<br />
                Telefono: +39 06 96883381
              </p>
            </section>

            <section>
              <h2>Iscrizione al Registro Unico degli Intermediari (RUI)</h2>
              <p>
                FIM Insurance Broker S.a.s. di Manzo Arturo & C. è iscritta alla <strong>Sezione B (broker)</strong> del Registro Unico degli
                Intermediari assicurativi e riassicurativi tenuto dall&apos;IVASS (Istituto per la
                Vigilanza sulle Assicurazioni) con il numero <strong>B000405449</strong>.
              </p>
              <p>
                L&apos;iscrizione è verificabile sul sito IVASS:{' '}
                <a href="https://servizi.ivass.it/RuirPubblica/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  servizi.ivass.it/RuirPubblica
                </a>.
              </p>
              <p className="text-sm text-gray-600">
                L&apos;attività dell&apos;intermediario è soggetta alla vigilanza di IVASS — Via del Quirinale 21, 00187 Roma — www.ivass.it.
              </p>
            </section>

            <section>
              <h2>Attività svolta</h2>
              <p>
                FIM Insurance Broker S.a.s. di Manzo Arturo & C. svolge attività di distribuzione assicurativa in
                qualità di <strong>broker</strong> ai sensi del D.Lgs. 209/2005 (Codice delle Assicurazioni Private) e del
                D.Lgs. 68/2018 (recepimento Direttiva IDD). Non rappresenta alcuna compagnia assicurativa: agisce
                nell&apos;esclusivo interesse dei propri clienti nella ricerca, comparazione e negoziazione di
                coperture assicurative su un&apos;ampia analisi del mercato.
              </p>
              <p>
                L&apos;informativa precontrattuale completa &mdash; il <strong>Modulo Unico Precontrattuale
                (MUP)</strong> previsto dall&apos;Allegato 3 al Regolamento IVASS n. 40/2018, che dal
                Provvedimento n. 147/2024 ha sostituito i precedenti Allegati 3, 4, 4-bis e 4-ter &mdash;
                è disponibile nella sezione{' '}
                <Link href="/trasparenza" className="text-primary hover:underline font-medium">Trasparenza</Link>{' '}
                e viene consegnata al cliente prima della sottoscrizione di ogni contratto.
              </p>
            </section>

            <section>
              <h2>Proprietà intellettuale</h2>
              <p>
                Tutti i contenuti del presente sito web (testi, immagini, loghi, grafica) sono
                di proprietà esclusiva di FIM Insurance Broker S.a.s. di Manzo Arturo & C. o dei rispettivi titolari
                e sono protetti dalle norme vigenti in materia di diritto d&apos;autore.
              </p>
              <p>
                È vietata la riproduzione, anche parziale, senza previa autorizzazione scritta.
              </p>
            </section>

            <section>
              <h2>Limitazione di responsabilità</h2>
              <p>
                Le informazioni contenute in questo sito hanno carattere puramente indicativo
                e non costituiscono offerta contrattuale. Le condizioni definitive delle polizze
                assicurative sono quelle contenute nei contratti sottoscritti e nei relativi
                DIP, DIP Aggiuntivo e Condizioni di Assicurazione consegnati dall&apos;impresa.
              </p>
              <p>
                FIM Insurance Broker S.a.s. di Manzo Arturo & C. non è responsabile per eventuali danni derivanti
                dall&apos;uso del sito o dall&apos;inaccessibilità temporanea dello stesso.
              </p>
            </section>

            <section>
              <h2>Legge applicabile e foro competente</h2>
              <p>
                Le presenti note legali sono regolate dalla legge italiana. Per qualsiasi
                controversia con il cliente consumatore è competente il foro di residenza o di domicilio
                del consumatore stesso; in tutti gli altri casi è competente il Foro di Latina.
              </p>
            </section>

            <section>
              <h2>Reclami e Arbitro Assicurativo</h2>
              <p>
                Ai sensi del Regolamento IVASS n. 40/2018 (come modificato dal Provv. n. 163/2025) e del
                Decreto interministeriale MIMIT 6 novembre 2024, n. 215, che disciplina
                l&apos;<strong>Arbitro Assicurativo</strong>, operativo dal{' '}
                <strong>15 gennaio 2026</strong>, il cliente che ritenga di aver subito un disservizio o un
                comportamento non conforme da parte dell&apos;intermediario o della compagnia ha diritto a una
                procedura strutturata su tre livelli.
              </p>
              <ol className="list-decimal pl-5 space-y-2 my-4">
                <li>
                  <strong>Reclamo all&apos;intermediario.</strong> Il cliente invia reclamo scritto a
                  FIM Insurance Broker S.a.s. — PEC{' '}
                  <a href="mailto:fiminsurancebrokersas@pec.it" className="text-primary hover:underline">fiminsurancebrokersas@pec.it</a>{' '}
                  o raccomandata A/R a Via Roma 41, 04012 Cisterna di Latina (LT). Riscontro entro{' '}
                  <strong>45 giorni</strong> dalla ricezione.
                </li>
                <li>
                  <strong>Reclamo all&apos;impresa di assicurazione.</strong> Se il reclamo riguarda il comportamento
                  della compagnia (gestione del sinistro, liquidazione, condizioni contrattuali), va inviato
                  direttamente all&apos;Ufficio Reclami dell&apos;impresa; i relativi recapiti sono indicati nel
                  DIP Aggiuntivo e nelle Condizioni di Assicurazione. Anche in questo caso, riscontro entro{' '}
                  <strong>45 giorni</strong>.
                </li>
                <li>
                  <strong>Ricorso all&apos;Arbitro Assicurativo.</strong> Decorsi i 45 giorni senza riscontro o in
                  caso di risposta ritenuta non soddisfacente, il cliente può presentare ricorso
                  all&apos;Arbitro Assicurativo entro <strong>12 mesi</strong> dalla data del reclamo all&apos;impresa.
                  Il ricorso si presenta online (contributo di 20 euro, rimborsato in caso di
                  accoglimento) sul portale{' '}
                  <a href="https://www.arbitroassicurativo.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">arbitroassicurativo.org</a>.
                  La decisione dell&apos;Arbitro non è vincolante per il cliente, che resta libero di
                  adire l&apos;Autorità Giudiziaria.
                </li>
              </ol>
              <p>
                In alternativa o in aggiunta, il cliente può:
              </p>
              <ul className="list-disc pl-5 space-y-1 my-3">
                <li>
                  Presentare segnalazione a IVASS per violazioni della normativa di settore —{' '}
                  <a href="https://www.ivass.it/consumatori/reclami/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ivass.it/consumatori/reclami</a>.
                </li>
                <li>
                  Attivare la <strong>mediazione obbligatoria</strong> ex D.Lgs. 28/2010 in materia di contratti assicurativi,
                  presso un organismo iscritto al Ministero della Giustizia.
                </li>
                <li>
                  Adire l&apos;<strong>Autorità Giudiziaria ordinaria</strong>. Il ricorso preventivo all&apos;Arbitro
                  Assicurativo assolve alla condizione di procedibilità prevista per la mediazione assicurativa.
                </li>
              </ul>
              <p className="bg-accent/10 border-l-4 border-accent p-4 rounded-r">
                Per la procedura completa, la modulistica e i riferimenti normativi visita la pagina dedicata{' '}
                <Link href="/reclami" className="text-primary hover:underline font-semibold">Reclami e Arbitro Assicurativo</Link>.
              </p>
            </section>

            <section>
              <h2>Contatti</h2>
              <p>
                Per qualsiasi informazione:{' '}
                <a href="mailto:info@fimbroker.it" className="text-primary hover:underline">info@fimbroker.it</a>{' '}
                | <a href="tel:+390696883381" className="text-primary hover:underline">+39 06 96883381</a>
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
