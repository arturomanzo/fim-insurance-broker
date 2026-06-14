'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import FimLogo from '@/components/ui/FimLogo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/servizi/tutela-legale-aziende', label: 'Tutela Legale', badge: 'Nuovo' },
  { href: '/calcolatore-rischi', label: 'Calcolatore' },
  { href: '/chi-siamo', label: 'Chi Siamo' },
]

const secondaryLinks = [
  { href: '/soluzioni', label: 'Soluzioni', desc: 'Per privati e aziende' },
  { href: '/sinistri', label: 'Sinistri', desc: 'Gestione sinistri' },
  { href: '/quiz-polizza', label: 'Quiz Polizza', desc: 'Trova la polizza giusta' },
  { href: '/blog', label: 'Blog', desc: 'Guide e aggiornamenti' },
  { href: '/contatti', label: 'Contatti', desc: 'Scrivici o chiamaci' },
]

const allNavLinks = [...navLinks, ...secondaryLinks]

const PRENOTA_HREF = '/prenota-consulenza'
const AREA_CLIENTE_HREF = '/area-cliente'

function isNavLinkActive(href: string, pathname: string): boolean {
  if (pathname === href) return true
  if (href === '/') return false
  if (!pathname.startsWith(href + '/')) return false
  // Se esiste un link più specifico che matcha, il parent non è attivo
  const moreSpecific = allNavLinks.some(
    (l) => l.href !== href && l.href.startsWith(href + '/') &&
      (pathname === l.href || pathname.startsWith(l.href + '/'))
  )
  return !moreSpecific
}

function NavDropdown({ links }: { links: { href: string; label: string; desc: string }[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const isAnyActive = links.some(
    (l) => pathname === l.href || pathname.startsWith(l.href + '/')
  )

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Close on Escape
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false)
  }

  // Close when focus leaves the container
  function handleBlur(e: React.FocusEvent) {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        id="altro-menu-button"
        className={clsx(
          'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
          isAnyActive
            ? 'bg-primary/10 text-primary'
            : 'text-gray-600 hover:text-primary hover:bg-gray-100'
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        Altro
        <svg
          className={clsx('w-3.5 h-3.5 transition-transform duration-200', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-labelledby="altro-menu-button"
          className="absolute top-full left-0 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 mt-1"
        >
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className={clsx(
                  'flex flex-col px-4 py-3 transition-colors duration-150',
                  isActive ? 'bg-primary/10' : 'hover:bg-gray-50'
                )}
              >
                <span className={clsx('text-sm font-medium', isActive ? 'text-primary' : 'text-gray-700')}>
                  {link.label}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">{link.desc}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

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
              const isActive = isNavLinkActive(link.href, pathname)
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
            <NavDropdown links={secondaryLinks} />
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={AREA_CLIENTE_HREF}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
              aria-label="Area Cliente"
            >
              <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden lg:inline" aria-hidden="true">Area Cliente</span>
            </Link>
            {/* Contatti rapidi — solo desktop */}
            <div className="hidden md:flex items-center gap-3 text-sm">
              <a
                href="https://wa.me/393473312330?text=Ciao,%20vorrei%20informazioni"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scrivici su WhatsApp"
                className="flex items-center gap-1.5 text-gray-500 hover:text-accent transition-colors duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.882l6.19-1.448A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.214-3.724.871.938-3.63-.235-.374A9.818 9.818 0 1112 21.818z"/>
                </svg>
                WhatsApp
              </a>
              <span className="text-gray-300 select-none" aria-hidden="true">|</span>
              <a
                href="tel:+390696883381"
                aria-label="Chiama il numero 06 96883381"
                className="flex items-center gap-1.5 text-gray-500 hover:text-accent transition-colors duration-200"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                06 96883381
              </a>
            </div>
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
            {allNavLinks.map((link) => {
              const isActive = isNavLinkActive(link.href, pathname)
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
                  {'badge' in link && link.badge && (
                    <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                  {link.label}
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
