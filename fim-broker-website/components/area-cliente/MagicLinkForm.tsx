'use client'

import { useState } from 'react'

interface Props {
  nextPath?: string
}

export default function MagicLinkForm({ nextPath }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/area-cliente/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, next: nextPath }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Errore durante l\'invio. Riprova.')
        setStatus('error')
      } else {
        setStatus('sent')
      }
    } catch {
      setErrorMsg('Errore di rete. Riprova o contattaci.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-4">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="font-bold text-primary text-lg mb-2">Email inviata!</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Controlla la tua casella <strong>{email}</strong>.<br />
          Il link è valido per <strong>1 ora</strong>.
        </p>
        <p className="text-gray-400 text-xs mt-4">
          Non trovi l&apos;email? Controlla lo spam o{' '}
          <button
            onClick={() => setStatus('idle')}
            className="text-primary hover:underline"
          >
            riprova
          </button>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-field">Email associata alle tue polizze</label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrorMsg('') }}
          placeholder="mario@esempio.it"
          required
          disabled={status === 'loading'}
          className="input-field"
          maxLength={200}
          autoFocus
        />
      </div>
      {status === 'error' && (
        <p className="text-red-500 text-sm">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading' || !email.trim()}
        className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Invio in corso…' : 'Invia link di accesso'}
      </button>
      <p className="text-center text-xs text-gray-400">
        Riceverai un link sicuro valido 1 ora — nessuna password richiesta
      </p>
    </form>
  )
}
