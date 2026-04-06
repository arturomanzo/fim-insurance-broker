import type { Metadata } from 'next'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Note Legali',
  description: 'Note legali e informazioni societarie di FIM Insurance Broker S.a.s.',
}

export default function NoteLegaliPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container-custom">
        <Card padding="lg" className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-primary mb-2">Note Legali</h1>
          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: Gennaio 2025</p>

          <div className="prose-fim space-y-8">
            <section>
              <h2>Informazioni societarie</h2>
              <p>
                <strong>FIM Insurance Broker S.a.s. di Manzo Arturo & C.</strong><br />
                Sede legale: Via Roma 41, 04012 Cisterna di Latina (LT)<br />
                P.IVA e C.F.: 02637640596<br />
                REA: LT 187466<br />
                PEC: fiminsurancebrokersas@pec.it<br />
                Email: info@fimbroker.it<br />
                Capitale sociale: € 50.000,00 i.v.
              </p>
            </section>

            <section>
              <h2>Iscrizione al Registro Unico degli Intermediari (RUI)</h2>
              <p>
                FIM Insurance Broker S.a.s. di Manzo Arturo & C. è iscritta alla sezione B del Registro Unico degli
                Intermediari assicurativi e riassicurativi tenuto dall&apos;IVASS (Istituto per la
                Vigilanza sulle Assicurazioni) con il numero <strong>B000405449</strong>.
              </p>
              <p>
                L&apos;iscrizione è verificabile sul sito IVASS: www.ivass.it
              </p>
            </section>

            <section>
              <h2>Attività svolta</h2>
              <p>
                FIM Insurance Broker S.a.s. di Manzo Arturo & C. svolge attività di intermediazione assicurativa in
                qualità di broker. Non rappresenta alcuna compagnia assicurativa: agisce
                nell&apos;esclusivo interesse dei propri clienti nella ricerca e negoziazione di
                coperture assicurative.
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
                assicurative sono quelle contenute nei contratti sottoscritti.
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
                controversia è competente il Foro di Latina.
              </p>
            </section>

            <section>
              <h2>Risoluzione alternativa delle controversie (ADR)</h2>
              <p>
                In caso di controversie con i clienti, FIM Insurance Broker S.a.s. di Manzo Arturo & C. aderisce
                alle procedure di risoluzione alternativa delle controversie previste dalla
                normativa IVASS. Per informazioni: www.ivass.it/consumatori/reclami
              </p>
            </section>

            <section>
              <h2>Contatti</h2>
              <p>
                Per qualsiasi informazione: info@fimbroker.it | +39 06 96883381
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  )
}
