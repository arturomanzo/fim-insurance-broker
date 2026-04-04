'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function LegalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[FIM Legal] Runtime error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">Errore nel caricamento</h1>
        <p className="text-gray-500 mb-8">
          Impossibile caricare questa pagina. Riprova o torna alla home.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary px-6 py-2.5 text-sm">
            Riprova
          </button>
          <Link href="/" className="btn-outline px-6 py-2.5 text-sm">
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
