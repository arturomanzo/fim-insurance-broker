import type { Metadata } from 'next';
import { Shield, Award, Users, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'FIM Insurance Broker: oltre 30 anni di esperienza nel settore assicurativo. Iscritti RUI Sez. B n. B000405449. Sedi a Cisterna di Latina e Firenze.',
};

const values = [
  { icon: Shield, title: 'Indipendenza', desc: 'Lavoriamo per i nostri clienti, non per le compagnie. La nostra priorità è trovare la copertura migliore per te.' },
  { icon: Award, title: 'Competenza', desc: 'Oltre 30 anni di esperienza nel settore assicurativo, con aggiornamento professionale continuo.' },
  { icon: Users, title: 'Relazione', desc: 'Costruiamo rapporti duraturi basati sulla fiducia e sulla trasparenza, non su transazioni commerciali.' },
  { icon: Building2, title: 'Presenza', desc: 'Due sedi operative a Cisterna di Latina e Firenze, per un servizio vicino alle esigenze del territorio.' },
];

export default function ChiSiamoPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-fim-primary to-fim-light py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Chi Siamo</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            FIM Insurance Broker è un intermediario assicurativo professionale con oltre 30 anni di esperienza, iscritto al Registro Unico degli Intermediari Assicurativi (RUI) Sezione B con numero B000405449.
          </p>
        </div>
      </section>

      {/* Storia */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-fim-primary/10 text-fim-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">La nostra storia</span>
              <h2 className="text-3xl font-bold text-fim-primary mb-5">Trent&apos;anni al servizio dei clienti</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                FIM Insurance Broker nasce dall&apos;esperienza e dalla passione per il mondo assicurativo. In oltre tre decenni di attività abbiamo costruito un team di professionisti specializzati capaci di analizzare ogni esigenza e proporre la soluzione assicurativa più adeguata.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                La nostra forza è la rete di relazioni con le principali compagnie assicuratrici: Allianz, Prima Assicurazioni, Bene Assicurazioni, DUAL/Arch e altre, che ci consente di offrire condizioni competitive e coperture personalizzate.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Operiamo sia sul mercato privati che sul mercato corporate, con soluzioni per PMI, grandi imprese, professionisti e privati. La nostra presenza a Cisterna di Latina e Firenze ci permette di servire efficacemente clienti in tutto il centro Italia.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '30+', label: 'Anni di esperienza' },
                { value: 'RUI B000405449', label: 'Iscrizione registri' },
                { value: '8', label: 'Rami assicurativi' },
                { value: '2', label: 'Sedi operative' },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-fim-primary mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valori */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-fim-primary mb-4">I Nostri Valori</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">I principi che guidano ogni giorno il nostro lavoro e le nostre relazioni con i clienti.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-fim-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-fim-primary" />
                </div>
                <h3 className="font-bold text-fim-primary mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compagnie partner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-fim-primary mb-4">Le Nostre Compagnie Partner</h2>
          <p className="text-gray-600 mb-10">Collaboriamo con i leader del mercato assicurativo italiano e internazionale.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Allianz', 'Prima Assicurazioni', 'Bene Assicurazioni', 'DUAL/Arch'].map((company) => (
              <div key={company} className="px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 font-semibold text-fim-primary">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
