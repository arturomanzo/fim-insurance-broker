'use client'

import { useState } from 'react'
import Link from 'next/link'

const tipoOptions = [
  'Artigiano / commerciante',
  'PMI (1-50 dipendenti)',
  'Professionista (avvocato, commercialista, ecc.)',
  'Imprenditore / manager',
  'Privato / famiglia',
]

export default function LeadMagnet() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tipo, setTipo] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, tipo }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Si è verificato un errore.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setError('Errore di rete. Riprova.')
      setStatus('error')
    }
  }

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: offer */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 text-sm font-semibold mb-5 text-accent">
              📋 Guida gratuita — Scarica ora
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
              Guida Completa alle<br />
              Assicurazioni per PMI 2025
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Tutto quello che un imprenditore, artigiano o professionista deve sapere sulle assicurazioni —
              spiegato in modo chiaro, senza gergo tecnico, con prezzi indicativi inclusi.
            </p>
            {/* What's inside */}
            <div className="space-y-3">
              {[
                'Quali polizze sono obbligatorie per legge',
                'Come calcolare i massimali giusti per la tua attività',
                'RC Impresa, Cyber, D&O: quando servono davvero',
                'Come funziona la gestione di un sinistro',
                'Prezzi indicativi per le coperture principali',
                'La checklist dei rischi per PMI italiane',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-white/90 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-primary mb-3">Controlla la tua email!</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Abbiamo inviato il link alla guida a <strong>{email}</strong>.
                  Controlla anche la cartella spam se non la vedi in arrivo.
                </p>
                <Link
                  href="/risorse/guida-pmi"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Leggi la guida direttamente →
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-black text-primary mb-1">Ricevi la guida gratis</h3>
                  <p className="text-gray-500 text-sm">Nessuno spam. Solo risorse utili per la tua attività.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

                  <div>
                    <label htmlFor="lm-nome" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Nome *
                    </label>
                    <input
                      id="lm-nome"
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Il tuo nome"
                      className="input-field"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div>
                    <label htmlFor="lm-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      id="lm-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="la.tua@email.it"
                      className="input-field"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div>
                    <label htmlFor="lm-tipo" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Che tipo di attività hai?
                    </label>
                    <select
                      id="lm-tipo"
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                      className="input-field"
                      disabled={status === 'loading'}
                    >
                      <option value="">Seleziona (facoltativo)</option>
                      {tipoOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Invio in corso…
                      </span>
                    ) : (
                      '📋 Inviami la Guida Gratis'
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 leading-relaxed">
                    Inviando accetti la nostra{' '}
                    <Link href="/privacy-policy" className="underline hover:text-gray-600">
                      Privacy Policy
                    </Link>
                    . Nessuno spam, disiscrizione facile.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
