'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import FimLogo from '@/components/ui/FimLogo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/soluzioni', label: 'Soluzioni' },
  { href: '/calcolatore-rischi', label: 'Calcolatore', badge: 'Nuovo' },
  { href: '/blog', label: 'Blog' },
  { href: '/contatti', label: 'Contatti' },
]

const PRENOTA_HREF = '/prenota-consulenza'
const AREA_CLIENTE_HREF = '/area-cliente'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-white shadow-sm'
      )}
    >
      <nav className="container-custom" aria-label="Navigazione principale">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="FIM Insurance Broker — Home">
            <FimLogo variant="full" theme="color" height={40} className="hidden sm:block" />
            <FimLogo variant="icon" theme="color" height={36} className="sm:hidden" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1.5',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  )}
                >
                  {link.label}
                  {'badge' in link && link.badge && (
                    <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={AREA_CLIENTE_HREF}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
              title="Area Cliente"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden lg:inline">Area Cliente</span>
            </Link>
            <a
              href="tel:+390696883381"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              06 96883381
            </a>
            <Link
              href={PRENOTA_HREF}
              className={clsx(
                'text-sm font-medium px-4 py-2 rounded-lg border border-primary transition-all duration-200',
                pathname.startsWith(PRENOTA_HREF)
                  ? 'bg-primary text-white'
                  : 'text-primary hover:bg-primary hover:text-white'
              )}
            >
              Prenota Consulenza
            </Link>
            <Link
              href="/preventivo"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Preventivo Gratuito
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div id="mobile-nav-menu" className="md:hidden border-t border-gray-100 py-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  )}
                >
                  {link.label}
                  {'badge' in link && link.badge && (
                    <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
            <div className="pt-3 border-t border-gray-100">
              <Link
                href={AREA_CLIENTE_HREF}
                className={clsx(
                  'flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith(AREA_CLIENTE_HREF)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Area Cliente
              </Link>
            </div>
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <a
                href="tel:+390696883381"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                06 96883381
              </a>
              <Link href={PRENOTA_HREF} className="btn-secondary w-full text-center text-sm">
                Prenota Consulenza
              </Link>
              <Link href="/preventivo" className="btn-primary w-full text-center text-sm">
                Preventivo Gratuito
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
