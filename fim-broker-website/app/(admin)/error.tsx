'use client'

import { useEffect } from 'react'
import { Icona } from '@/components/icons/TettoIcons'
import { ALLERTA } from '@/lib/icone'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[FIM Admin] Runtime error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-10">
        <Icona forma={ALLERTA} size={64} className="mx-auto mb-6 text-primary" />
        <h1 className="text-2xl font-black text-gray-900 mb-3">Errore Admin</h1>
        <p className="text-gray-500 mb-8">
          Si è verificato un errore nel pannello di amministrazione.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary px-6 py-2.5 text-sm">
            Riprova
          </button>
          <a href="/admin/dashboard" className="btn-outline px-6 py-2.5 text-sm">
            Dashboard
          </a>
        </div>
        {error.digest && (
          <p className="mt-6 text-gray-300 text-xs font-mono">Ref: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
