import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Note Legali',
  description: 'Note legali e disclaimer del sito web di FIM Insurance Broker.',
};

export default function NoteLegaliPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-fim-primary mb-2">Note Legali</h1>
      <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: 1 gennaio 2025</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-fim-primary">Informazioni societarie</h2>
          <p>FIM Insurance Broker è un intermediario assicurativo iscritto al Registro Unico degli Intermediari Assicurativi (RUI) tenuto dall'IVASS, Sezione B, numero B000405449.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">Disclaimer</h2>
          <p>Le informazioni contenute in questo sito hanno carattere puramente illustrativo e non costituiscono offerta al pubblico ai sensi dell'art. 1336 c.c., né consulenza assicurativa vincolante. Per una proposta personalizzata è necessario contattare direttamente FIM Insurance Broker.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">Proprietà intellettuale</h2>
          <p>Tutti i contenuti del presente sito (testi, immagini, loghi, grafica) sono di proprietà di FIM Insurance Broker o dei rispettivi titolari e sono protetti dalle leggi sul diritto d'autore. È vietata la riproduzione senza autorizzazione scritta.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-fim-primary">Legge applicabile</h2>
          <p>Il presente sito e il suo utilizzo sono regolati dalla legge italiana. Per eventuali controversie è competente il Foro di Latina.</p>
        </section>
      </div>
    </div>
  );
}
