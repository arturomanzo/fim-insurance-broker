import type { Metadata } from 'next'
import MagicLinkForm from '@/components/area-cliente/MagicLinkForm'

export const metadata: Metadata = {
  title: 'Area Cliente | FIM Insurance Broker',
  description: 'Accedi alla tua area personale per visualizzare le tue polizze, le date di scadenza e i documenti assicurativi.',
  robots: { index: false },
}

interface PageProps {
  searchParams: Promise<{ next?: string; expired?: string; sent?: string }>
}

export default async function AreaClientePage({ searchParams }: PageProps) {
  const params = await searchParams

  return (
    <div className="min-h-[80vh] flex items-center bg-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-primary mb-2">Area Cliente</h1>
            <p className="text-gray-500 text-sm">
              Inserisci la tua email. Ti invieremo un link di accesso sicuro, nessuna password da ricordare.
            </p>
          </div>

          {/* Alerts */}
          {params.expired && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
              La sessione è scaduta. Richiedi un nuovo link di accesso.
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <MagicLinkForm nextPath={params.next} />
          </div>

          {/* Info */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-gray-400 text-xs">
              Non riesci ad accedere?{' '}
              <a href="tel:+390696883381" className="text-primary hover:underline">
                Chiamaci al 06 96883381
              </a>
            </p>
            <p className="text-gray-400 text-xs">
              L&apos;Area Cliente è disponibile per i clienti FIM con polizze attive.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
