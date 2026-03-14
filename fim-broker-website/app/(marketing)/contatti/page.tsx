import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Contatta FIM Insurance Broker. Sedi a Cisterna di Latina (Via Roma 41) e Firenze. Siamo qui per aiutarti.',
};

const sedi = [
  {
    citta: 'Cisterna di Latina',
    indirizzo: 'Via Roma 41',
    provincia: 'LT – Lazio',
    tipo: 'Sede Principale',
  },
  {
    citta: 'Firenze',
    indirizzo: 'Sede operativa toscana',
    provincia: 'FI – Toscana',
    tipo: 'Sede Operativa',
  },
];

export default function ContattiPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-fim-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contatti</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Siamo a tua disposizione per qualsiasi domanda, richiesta di informazioni
            o consulenza assicurativa. Contattaci nei modi che preferisci.
          </p>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar info */}
            <div className="space-y-6">
              {/* Sedi */}
              {sedi.map((sede, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 shadow-md p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-fim-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="text-fim-accent" size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-fim-accent font-semibold uppercase tracking-wide mb-0.5">
                        {sede.tipo}
                      </div>
                      <h3 className="font-bold text-fim-primary text-lg">{sede.citta}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm ml-13 pl-1">
                    {sede.indirizzo}
                    <br />
                    {sede.provincia}
                  </p>
                </div>
              ))}

              {/* Telefono */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-fim-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="text-fim-accent" size={20} />
                  </div>
                  <h3 className="font-bold text-fim-primary">Telefono</h3>
                </div>
                <a
                  href="tel:+390123456789"
                  className="text-fim-light hover:text-fim-primary font-semibold transition-colors"
                >
                  +39 0123 456 789
                </a>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-fim-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="text-fim-accent" size={20} />
                  </div>
                  <h3 className="font-bold text-fim-primary">Email</h3>
                </div>
                <a
                  href="mailto:info@fimbroker.it"
                  className="text-fim-light hover:text-fim-primary font-semibold transition-colors"
                >
                  info@fimbroker.it
                </a>
              </div>

              {/* Orari */}
              <div className="bg-fim-primary rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-fim-accent" size={20} />
                  <h3 className="font-bold">Orari di Apertura</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Lunedì – Venerdì</span>
                    <span className="text-white font-medium">9:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Sabato</span>
                    <span className="text-white font-medium">9:00 – 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Domenica</span>
                    <span className="text-blue-200">Chiuso</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-fim-primary mb-2">
                  Inviaci un Messaggio
                </h2>
                <p className="text-gray-600 mb-8">
                  Compila il form e ti risponderemo al più presto.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
