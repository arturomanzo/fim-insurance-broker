'use client'

import { useState } from 'react'

interface Esito {
  periodo: string
  destinatari: number
  inviati: number
  falliti: number
}

export default function ApprovaInvio({ token }: { token: string }) {
  const [stato, setStato] = useState<'idle' | 'loading' | 'fatto' | 'errore'>('idle')
  const [errore, setErrore] = useState('')
  const [esito, setEsito] = useState<Esito | null>(null)

  if (!token) {
    return (
      <p className="text-slate-600 leading-relaxed">
        Il link non è completo. Aprilo dall&apos;email di anteprima.
      </p>
    )
  }

  if (stato === 'fatto' && esito) {
    return (
      <div>
        <p className="text-slate-700 leading-relaxed mb-4">
          Partita. Periodo <strong>{esito.periodo}</strong>: {esito.inviati} su {esito.destinatari}{' '}
          destinatari.
        </p>
        {esito.falliti > 0 && (
          <p className="text-amber-700 text-sm">
            {esito.falliti} invii non sono andati a buon fine. I dettagli sono nei log della funzione.
          </p>
        )}
      </div>
    )
  }

  async function approva() {
    setStato('loading')
    setErrore('')
    try {
      const res = await fetch('/api/newsletter/invia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ t: token }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrore(data.error || 'Invio non riuscito.')
        setStato('errore')
        return
      }
      setEsito(data as Esito)
      setStato('fatto')
    } catch {
      setErrore('Errore di rete. Riprova.')
      setStato('errore')
    }
  }

  return (
    <div>
      <p className="text-slate-600 leading-relaxed mb-6">
        Questo bottone fa partire la newsletter verso tutti gli iscritti attivi. Non si annulla.
      </p>
      {stato === 'errore' && <p className="text-red-600 text-sm mb-4">{errore}</p>}
      <button
        type="button"
        onClick={approva}
        disabled={stato === 'loading'}
        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {stato === 'loading' ? 'Invio in corso…' : 'Approva e invia'}
      </button>
    </div>
  )
}
