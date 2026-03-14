'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/blog', label: 'Blog' },
  { href: '/contatti', label: 'Contatti' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 transition-all duration-200',
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-fim-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FIM</span>
            </div>
            <span className="font-bold text-fim-primary text-lg hidden sm:block">
              FIM Insurance Broker
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-fim-primary/10 text-fim-primary'
                    : 'text-gray-600 hover:text-fim-primary hover:bg-fim-primary/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+390773123456"
              className="hidden sm:flex items-center gap-1.5 text-sm text-fim-primary font-medium hover:text-fim-light transition-colors"
            >
              <Phone size={16} />
              <span>Chiamaci</span>
            </a>
            <Link
              href="/preventivo"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-fim-accent text-fim-primary text-sm font-semibold rounded-lg hover:bg-yellow-400 transition-colors shadow-sm"
            >
              Preventivo Gratuito
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-100 py-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'block px-4 py-2.5 text-sm font-medium rounded-lg mx-1 transition-colors',
                  pathname === link.href
                    ? 'bg-fim-primary/10 text-fim-primary'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 px-1 flex flex-col gap-2">
              <a
                href="tel:+390773123456"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-fim-primary"
              >
                <Phone size={16} /> Chiamaci
              </a>
              <Link
                href="/preventivo"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center px-4 py-2.5 bg-fim-accent text-fim-primary text-sm font-semibold rounded-lg"
              >
                Preventivo Gratuito
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
