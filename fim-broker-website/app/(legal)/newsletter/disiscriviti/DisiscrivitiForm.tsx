'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function DisiscrivitiForm({ token }: { token: string }) {
  const [stato, setStato] = useState<'idle' | 'loading' | 'fatto' | 'errore'>('idle')
  const [errore, setErrore] = useState('')

  if (!token) {
    return (
      <p className="text-slate-600 leading-relaxed">
        Il link non è completo. Aprilo dall&apos;email che hai ricevuto, oppure scrivi a{' '}
        <a href="mailto:info@fimbroker.it" className="text-primary font-semibold underline">
          info@fimbroker.it
        </a>{' '}
        e ti cancelliamo noi.
      </p>
    )
  }

  if (stato === 'fatto') {
    return (
      <div>
        <p className="text-slate-700 leading-relaxed mb-6">
          Fatto. Il tuo indirizzo è stato rimosso dalla newsletter e non riceverai altri invii.
        </p>
        <Link href="/" className="text-primary font-semibold underline">
          Torna al sito
        </Link>
      </div>
    )
  }

  async function conferma() {
    setStato('loading')
    setErrore('')
    try {
      // Il middleware pretende un Content-Type esplicito sulle POST verso /api/*.
      const res = await fetch('/api/newsletter/disiscriviti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ t: token }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrore(data.error || 'Non siamo riusciti a completare la cancellazione.')
        setStato('errore')
        return
      }
      setStato('fatto')
    } catch {
      setErrore('Errore di rete. Riprova.')
      setStato('errore')
    }
  }

  return (
    <div>
      <p className="text-slate-600 leading-relaxed mb-6">
        Un clic e non ti scriviamo più. La cancellazione è immediata e non serve motivarla.
      </p>
      {stato === 'errore' && <p className="text-red-600 text-sm mb-4">{errore}</p>}
      <button
        type="button"
        onClick={conferma}
        disabled={stato === 'loading'}
        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {stato === 'loading' ? 'Cancellazione in corso…' : 'Conferma la cancellazione'}
      </button>
    </div>
  )
}
