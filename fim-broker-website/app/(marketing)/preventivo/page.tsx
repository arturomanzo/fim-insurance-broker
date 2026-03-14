import { Metadata } from 'next';
import PreventivoForm from '@/components/forms/PreventivoForm';
import { CheckCircle, Clock, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Richiedi Preventivo',
  description:
    'Richiedi un preventivo assicurativo gratuito a FIM Insurance Broker. Compila il modulo e ti contatteremo entro 24 ore.',
};

const vantaggi = [
  {
    icon: <CheckCircle className="text-fim-accent" size={22} />,
    testo: 'Preventivo gratuito e senza impegno',
  },
  {
    icon: <Clock className="text-fim-accent" size={22} />,
    testo: 'Risposta entro 24 ore lavorative',
  },
  {
    icon: <Shield className="text-fim-accent" size={22} />,
    testo: 'Consulenza da broker indipendente certificato IVASS',
  },
  {
    icon: <Users className="text-fim-accent" size={22} />,
    testo: 'Analisi personalizzata del tuo profilo di rischio',
  },
];

export default function PreventivoPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-fim-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Richiedi un Preventivo
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Compila il modulo sottostante e un nostro broker ti contatterà al più presto
            con una proposta assicurativa personalizzata e competitiva.
          </p>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar vantaggi */}
            <div className="space-y-6">
              <div className="bg-fim-primary rounded-2xl p-6 text-white">
                <h2 className="font-bold text-xl mb-5">Perché sceglierci?</h2>
                <div className="space-y-4">
                  {vantaggi.map((v, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="shrink-0">{v.icon}</div>
                      <p className="text-blue-100 text-sm">{v.testo}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
                <h3 className="font-bold text-fim-primary text-lg mb-3">
                  Preferisci chiamarci?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Siamo disponibili dal lunedì al venerdì dalle 9:00 alle 18:00.
                </p>
                <a
                  href="tel:+390123456789"
                  className="block text-center bg-fim-accent hover:bg-yellow-500 text-fim-primary font-bold py-3 px-6 rounded-xl transition-all duration-200 text-sm"
                >
                  +39 0123 456 789
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
                <h3 className="font-bold text-fim-primary text-lg mb-3">
                  RUI B000405449
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  FIM Insurance Broker è iscritto al Registro Unico degli Intermediari
                  assicurativi tenuto dall&apos;IVASS, Sezione B (Broker).
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-fim-primary mb-2">
                  Modulo di Richiesta Preventivo
                </h2>
                <p className="text-gray-600 mb-8">
                  Tutti i campi contrassegnati con * sono obbligatori
                </p>
                <PreventivoForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
