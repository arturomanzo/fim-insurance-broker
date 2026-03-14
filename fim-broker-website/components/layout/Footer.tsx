import Link from 'next/link';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const services = [
  { href: '/servizi/rca', label: 'RC Auto' },
  { href: '/servizi/vita', label: 'Polizze Vita' },
  { href: '/servizi/casa', label: 'Casa e Patrimonio' },
  { href: '/servizi/aziende', label: 'Rischi Aziendali' },
  { href: '/servizi/rc-professionale', label: 'RC Professionale' },
  { href: '/servizi/trasporti', label: 'Trasporti' },
];

const legal = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookie', label: 'Cookie Policy' },
  { href: '/note-legali', label: 'Note Legali' },
];

export default function Footer() {
  return (
    <footer className="bg-fim-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <span className="text-fim-primary font-bold text-sm">FIM</span>
              </div>
              <span className="font-bold text-lg">FIM Insurance Broker</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Intermediario assicurativo professionale iscritto al RUI Sez. B n. B000405449 con oltre 30 anni di esperienza.
            </p>
            <p className="text-blue-300 text-xs">
              Compagnie partner: Allianz, Prima, Bene Assicurazioni, DUAL/Arch e altre.
            </p>
          </div>

          {/* Servizi */}
          <div>
            <h3 className="font-semibold text-fim-accent mb-4">Servizi</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sedi */}
          <div>
            <h3 className="font-semibold text-fim-accent mb-4">Le Nostre Sedi</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <MapPin size={16} className="text-fim-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Cisterna di Latina</p>
                  <p className="text-blue-200 text-sm">Via Roma 41</p>
                </div>
              </div>
              <div className="flex gap-2">
                <MapPin size={16} className="text-fim-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Firenze</p>
                  <p className="text-blue-200 text-sm">Contattaci per l&apos;indirizzo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="font-semibold text-fim-accent mb-4">Contatti</h3>
            <div className="space-y-3">
              <a
                href="tel:+390773123456"
                className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
              >
                <Phone size={15} />
                +39 0773 123456
              </a>
              <a
                href="mailto:info@fimbroker.it"
                className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
              >
                <Mail size={15} />
                info@fimbroker.it
              </a>
              <a
                href="https://www.fimbroker.it"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
              >
                <ExternalLink size={15} />
                www.fimbroker.it
              </a>
            </div>
            <div className="mt-4">
              <Link
                href="/preventivo"
                className="inline-flex items-center px-4 py-2 bg-fim-accent text-fim-primary text-sm font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Richiedi Preventivo
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-blue-300 text-sm">
            © {new Date().getFullYear()} FIM Insurance Broker. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-4">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-blue-300 hover:text-white text-sm transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
