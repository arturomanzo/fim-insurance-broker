import Link from 'next/link'
import Image from 'next/image'

const serviceLinks = [
  { href: '/servizi/assicurazione-auto', label: 'Assicurazione Auto' },
  { href: '/servizi/assicurazione-vita', label: 'Assicurazione Vita' },
  { href: '/servizi/assicurazione-casa', label: 'Assicurazione Casa' },
  { href: '/servizi/assicurazione-salute', label: 'Assicurazione Salute' },
  { href: '/servizi/polizze-aziendali', label: 'Polizze Aziendali' },
  { href: '/servizi/assicurazione-viaggio', label: 'Assicurazione Viaggio' },
]

const companyLinks = [
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/servizi', label: 'I Nostri Servizi' },
  { href: '/blog', label: 'Blog & News' },
  { href: '/contatti', label: 'Contatti' },
  { href: '/preventivo', label: 'Richiedi Preventivo' },
]

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/note-legali', label: 'Note Legali' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="FIM Insurance Broker"
                width={160}
                height={48}
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              {/* Fallback */}
              <div className="hidden items-center gap-3" aria-hidden="true">
                <div className="w-12 h-12 gradient-logo rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-base">FIM</span>
                </div>
                <div>
                  <div className="font-black text-lg text-white leading-tight">FIM Insurance</div>
                  <div className="text-xs text-white/60 leading-tight tracking-wide uppercase">Broker Assicurativo</div>
                </div>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Da oltre 20 anni al fianco di privati e aziende per offrire le migliori soluzioni assicurative personalizzate.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+390212345678" className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +39 02 1234567
              </a>
              <a href="mailto:info@fimbroker.it" className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@fimbroker.it
              </a>
              <div className="flex items-start gap-2 text-white/70">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Via Roma 123, 20121 Milano MI
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">Servizi</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">Azienda</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-white/70 text-sm mb-4">
              Rimani aggiornato sulle ultime novità assicurative e offerte esclusive.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="La tua email"
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-accent text-primary font-semibold text-sm rounded-lg hover:bg-accent-dark transition-colors"
              >
                Iscriviti
              </button>
            </form>

            {/* RUI */}
            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/50 text-xs">
                FIM Insurance Broker S.r.l.<br />
                Iscrizione RUI n. B000XXXXX<br />
                P.IVA 12345678901
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} FIM Insurance Broker S.r.l. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/50 hover:text-white/80 text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
