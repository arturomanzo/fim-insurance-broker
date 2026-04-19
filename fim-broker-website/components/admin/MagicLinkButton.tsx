'use client'

import { useEffect, useRef, useState } from 'react'

interface Props { email: string; clientName: string }

export default function MagicLinkButton({ email, clientName }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (status === 'sent' || status === 'error') {
      resetTimerRef.current = setTimeout(() => setStatus('idle'), status === 'sent' ? 4000 : 5000)
    }
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [status])

  async function handleSend() {
    setStatus('loading')
    try {
      const res = await fetch('/api/admin/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
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
