'use client'

import Link from 'next/link'
import { useState } from 'react'
import FimLogo from '@/components/ui/FimLogo'

const serviceLinks = [
  { href: '/servizi/assicurazione-auto', label: 'Assicurazione Auto' },
  { href: '/servizi/assicurazione-vita', label: 'Assicurazione Vita' },
  { href: '/servizi/assicurazione-casa', label: 'Assicurazione Casa' },
  { href: '/servizi/assicurazione-salute', label: 'Assicurazione Salute' },
  { href: '/servizi/polizze-aziendali', label: 'Polizze Aziendali' },
  { href: '/servizi/assicurazione-viaggio', label: 'Assicurazione Viaggio' },
]

const soluzioniLinks = [
  { href: '/soluzioni/professionisti', label: 'Per Professionisti' },
  { href: '/soluzioni/artigiani-pmi', label: 'Per Artigiani e PMI' },
  { href: '/soluzioni/catastrofi-naturali', label: 'Catastrofi Naturali' },
  { href: '/sinistri', label: '🛡️ Gestione Sinistri' },
  { href: '/quiz-polizza', label: '❓ Quiz: che polizza ti serve?' },
  { href: '/calcolatore-rischi', label: '📊 Calcolatore del Rischio' },
  { href: '/osservatorio-prezzi', label: '📈 Osservatorio Prezzi 2025' },
  { href: '/glossario', label: '📖 Glossario Assicurativo' },
]

const companyLinks = [
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/blog', label: 'Blog & News' },
  { href: '/prenota-consulenza', label: 'Prenota Consulenza' },
  { href: '/preventivo', label: 'Richiedi Preventivo' },
  { href: '/contatti', label: 'Contatti' },
  { href: '/area-cliente', label: '🔐 Area Cliente' },
]

const socialLinks = [
  {
    href: 'https://www.facebook.com/FimInsuranceBroker/',
    label: 'Facebook',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/fiminsurancebroker/',
    label: 'Instagram',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: 'https://x.com/fimbroker',
    label: 'X (Twitter)',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/note-legali', label: 'Note Legali' },
]

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consent) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Errore durante l\'iscrizione.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Errore di rete. Riprova.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-4 bg-accent/20 border border-accent/30 rounded-lg text-sm text-white">
        <p className="font-semibold mb-1">Iscrizione confermata!</p>
        <p className="text-white/70">Riceverai le nostre novità assicurative direttamente nella tua inbox.</p>
      </div>
    )
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="La tua email"
        required
        disabled={status === 'loading'}
        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
      />
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={status === 'loading'}
          className="mt-0.5 w-4 h-4 accent-accent flex-shrink-0"
        />
        <span className="text-white/60 text-xs leading-snug">
          Acconsento al trattamento dei miei dati per ricevere comunicazioni commerciali.{' '}
          <Link href="/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </Link>
        </span>
      </label>
      {status === 'error' && (
        <p className="text-red-300 text-xs">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading' || !consent}
        className="w-full px-4 py-2.5 bg-accent text-primary font-semibold text-sm rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Iscrizione in corso…' : 'Iscriviti'}
      </button>
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex mb-5" aria-label="FIM Insurance Broker — Home">
              <FimLogo variant="full" theme="white" height={44} />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Da oltre 20 anni al fianco di privati e aziende per offrire le migliori soluzioni assicurative personalizzate.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+390696883381" className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +39 06 96883381
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
                Via Roma 41, 04012 Cisterna di Latina (LT)
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/50 hover:text-accent transition-colors"
                >
                  {s.icon}
                </a>
              ))}
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

          {/* Soluzioni */}
          <div>
            <h3 className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">Soluzioni</h3>
            <ul className="space-y-2">
              {soluzioniLinks.map((link) => (
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
            <NewsletterForm />

            {/* RUI */}
            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/50 text-xs">
                FIM Insurance Broker S.a.s. di Manzo Arturo & C.<br />
                Iscrizione RUI n. B000405449<br />
                P.IVA 02637640596 — REA LT 187466<br />
                PEC fiminsurancebrokersas@pec.it — info@fimbroker.it
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} FIM Insurance Broker S.a.s. di Manzo Arturo & C. Tutti i diritti riservati.
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
