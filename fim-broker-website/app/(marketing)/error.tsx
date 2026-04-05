'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Marketing page error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-primary mb-3">Si è verificato un errore</h1>
        <p className="text-gray-600 mb-8">
          La pagina ha riscontrato un problema. Riprova oppure torna alla home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary px-6 py-3"
          >
            Riprova
          </button>
          <Link href="/" className="btn-outline px-6 py-3">
            Torna alla Home
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-8">
          Hai bisogno di aiuto?{' '}
          <a href="tel:+390696883381" className="text-accent hover:underline">
            Chiamaci: +39 06 96883381
          </a>
        </p>
      </div>
    </div>
  )
}
