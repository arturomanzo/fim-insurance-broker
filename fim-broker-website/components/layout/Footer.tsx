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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
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
            <NewsletterForm />

            {/* RUI */}
            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/50 text-xs">
                FIM Insurance Broker S.r.l.<br />
                Iscrizione RUI n. B000405449<br />
                P.IVA 02637640596 — REA LT 187466
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
