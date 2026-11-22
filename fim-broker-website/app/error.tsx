'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import Link from 'next/link'
import { Icona } from '@/components/icons/TettoIcons'
import { ALLERTA } from '@/lib/icone'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Icona forma={ALLERTA} size={72} className="mx-auto mb-6 text-white" />
        <h1 className="text-3xl font-black text-white mb-3">
          Qualcosa è andato storto
        </h1>
        <p className="text-white/70 mb-8 leading-relaxed">
          Si è verificato un errore imprevisto. Prova a ricaricare la pagina o torna alla home.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary px-6 py-3"
          >
            Riprova
          </button>
          <Link href="/" className="btn-outline-white px-6 py-3">
            Torna alla Home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-white/30 text-xs font-mono">
            Ref: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
