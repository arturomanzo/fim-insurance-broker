'use client'

import { useState } from 'react'

interface Props { email: string; clientName: string }

export default function MagicLinkButton({ email, clientName }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  async function handleSend() {
    setStatus('loading')
    try {
      const res = await fetch('/api/admin/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (status === 'sent') setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  const labels = {
    idle: `Invia link accesso a ${clientName.split(' ')[0]}`,
    loading: 'Invio in corso…',
    sent: 'Link inviato!',
    error: 'Errore. Riprova.',
  }

  return (
    <button
      onClick={handleSend}
      disabled={status === 'loading'}
      className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-colors disabled:opacity-50 ${
        status === 'sent' ? 'bg-green-50 border-green-200 text-green-700' :
        status === 'error' ? 'bg-red-50 border-red-200 text-red-700' :
        'bg-white border-gray-200 text-primary hover:border-primary'
      }`}
    >
      {labels[status]}
    </button>
  )
}
