'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/blog', label: 'Blog' },
  { href: '/contatti', label: 'Contatti' },
]

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
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            {/* Usa /logo.png se disponibile, altrimenti logo SVG inline che rispecchia il brand */}
            <Image
              src="/logo.png"
              alt="FIM Insurance Broker"
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => {
                // Fallback al logo testuale se logo.png non è presente
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = 'flex'
              }}
              priority
            />
            {/* Fallback logo — nascosto se logo.png è disponibile */}
            <div className="hidden items-center gap-2.5" aria-hidden="true">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-logo flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="text-white font-black text-sm md:text-base tracking-tight">FIM</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-black text-primary text-base md:text-lg leading-tight tracking-tight">
                  FIM Insurance
                </div>
                <div className="text-xs text-gray-500 leading-tight font-medium tracking-wide uppercase">
                  Broker Assicurativo
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+390212345678"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              02 1234567
            </a>
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
            aria-label="Menu"
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
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <a
                href="tel:+390212345678"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                02 1234567
              </a>
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
