'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

/**
 * Ultima rete sotto l'albero React.
 *
 * Gli error boundary di Next fermano gli errori di rendering prima che
 * arrivino a Sentry: senza questo file un crash del layout radice restava
 * invisibile al monitoraggio e visibile solo al visitatore.
 *
 * Deve dichiarare <html> e <body> perché sostituisce il root layout, che in
 * questo scenario è proprio quello che è saltato.
 */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: '#0B1F3A',
          color: '#ffffff',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: '32rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Qualcosa si è rotto da parte nostra
          </h1>
          <p style={{ opacity: 0.8, lineHeight: 1.6, marginBottom: '1.75rem' }}>
            L&apos;errore è stato segnalato e lo stiamo guardando. Se ti serve
            una risposta subito, scrivici a{' '}
            <a href="mailto:info@fimbroker.it" style={{ color: '#4aba83' }}>
              info@fimbroker.it
            </a>{' '}
            o chiama lo{' '}
            <a href="tel:+390696883381" style={{ color: '#4aba83' }}>
              06 9688 3381
            </a>
            .
          </p>
          {/* `<a>` e non `<Link>`: qui l'albero React e' saltato, e next/link
              si appoggia al router che potrebbe essere proprio la cosa rotta.
              Un link normale ricarica la pagina da zero, che e' l'unica uscita
              affidabile da questo stato. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              display: 'inline-block',
              background: '#237A4E',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Torna alla home
          </a>
        </div>
      </body>
    </html>
  )
}
