import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { verifyToken, SESSION_COOKIE } from '@/lib/clientAuth'
import { getPolicyById } from '@/lib/policyData'

export const metadata: Metadata = {
  title: 'Dettaglio Polizza | Area Cliente FIM',
  robots: { index: false },
}

interface PageProps {
  params: Promise<{ id: string }>
}

const DOC_TYPE_LABELS: Record<string, string> = {
  polizza: '📄 Polizza',
  appendice: '📎 Appendice',
  quietanza: '🧾 Quietanza',
  altro: '📁 Documento',
}

export default async function PolicyDetailPage({ params }: PageProps) {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  if (!session?.value) redirect('/area-cliente?expired=1')

  const email = await verifyToken(session.value)
  if (!email) redirect('/area-cliente?expired=1')

  const { id } = await params
  const policy = getPolicyById(id, email)
  if (!policy) notFound()

  const expiryDate = new Date(policy.dataScadenza).toLocaleDateString('it-IT', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
  const startDate = new Date(policy.dataInizio).toLocaleDateString('it-IT', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary text-white py-8">
        <div className="container-custom">
          <Link href="/area-cliente/dashboard" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Le mie polizze
          </Link>
          <h1 className="text-2xl font-black">{policy.tipo}</h1>
          <p className="text-white/60 text-sm mt-1">{policy.compagnia} · {policy.numeroPolizza}</p>
        </div>
      </div>

      <div className="container-custom py-8 max-w-3xl">

        {/* Status banner */}
        {policy.stato === 'in-scadenza' && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">⚠️</span>
              <p className="font-semibold text-orange-800 text-sm">
                Questa polizza scade tra <strong>{policy.giorniAllaScadenza} giorni</strong> ({expiryDate})
              </p>
            </div>
            <Link
              href={`/preventivo?tipo=${encodeURIComponent(policy.tipo)}`}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors flex-shrink-0"
            >
              Richiedi rinnovo
            </Link>
          </div>
        )}
        {policy.stato === 'scaduta' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="font-semibold text-red-700 text-sm">Questa polizza è scaduta il {expiryDate}.</p>
            <Link href={`/preventivo?tipo=${encodeURIComponent(policy.tipo)}`} className="text-red-700 text-sm underline mt-1 inline-block">
              Richiedi rinnovo →
            </Link>
          </div>
        )}

        {/* Details card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Dettagli polizza</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { label: 'Contraente', value: policy.clientName },
              { label: 'Compagnia', value: policy.compagnia },
              { label: 'Numero polizza', value: policy.numeroPolizza },
              { label: 'Decorrenza', value: startDate },
              { label: 'Scadenza', value: expiryDate },
              { label: 'Premio annuo', value: `€${policy.premioAnnuo.toLocaleString('it-IT')}` },
              ...(policy.massimale ? [{ label: 'Massimale / Garanzie', value: policy.massimale }] : []),
              ...(policy.note ? [{ label: 'Note', value: policy.note }] : []),
            ].map((row) => (
              <div key={row.label} className="px-6 py-4 grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-400 text-sm">{row.label}</span>
                <span className="col-span-3 text-gray-800 text-sm font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Documenti</h2>
          </div>
          {policy.documenti.length === 0 ? (
            <p className="px-6 py-4 text-gray-400 text-sm">Nessun documento disponibile.</p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {policy.documenti.map((doc, i) => (
                <li key={i} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-800">{doc.nome}</span>
                    <span className="ml-2 text-xs text-gray-400">{DOC_TYPE_LABELS[doc.tipo] ?? doc.tipo}</span>
                  </div>
                  {doc.url && doc.url !== '#' ? (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm font-semibold hover:underline flex-shrink-0"
                    >
                      Scarica
                    </a>
                  ) : (
                    <span className="text-gray-300 text-xs flex-shrink-0">In caricamento</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Contact */}
        <div className="gradient-primary rounded-2xl p-6 text-white">
          <h3 className="font-bold mb-2">Hai domande su questa polizza?</h3>
          <p className="text-white/70 text-sm mb-4">Il nostro team è a tua disposizione per chiarimenti, sinistri o modifiche di copertura.</p>
          <div className="flex gap-3 flex-wrap">
            <a href="tel:+390696883381" className="bg-white text-primary font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-colors">
              📞 06 96883381
            </a>
            <a href="mailto:info@fimbroker.it" className="bg-white/10 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors">
              ✉️ Email
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
