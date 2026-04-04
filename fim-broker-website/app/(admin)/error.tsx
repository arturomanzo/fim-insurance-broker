'use client'

import { useEffect } from 'react'

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
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-xl">
          <span className="text-3xl">⚠️</span>
        </div>
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
