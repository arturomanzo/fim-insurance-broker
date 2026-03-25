import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getClientPolicies } from '@/lib/policyStore'
import AdminShell from '@/components/admin/AdminShell'
import MagicLinkButton from '@/components/admin/MagicLinkButton'
import DeletePolicyButton from '@/components/admin/DeletePolicyButton'

export const metadata: Metadata = { title: 'Dettaglio Cliente' }

interface PageProps { params: Promise<{ email: string }> }

export default async function AdminClienteDetailPage({ params }: PageProps) {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value || !(await verifyAdminToken(session.value))) redirect('/admin/login')

  const { email } = await params
  const decodedEmail = decodeURIComponent(email)
  const policies = getClientPolicies(decodedEmail)
  if (policies.length === 0) notFound()

  const clientName = policies[0].clientName

  return (
    <AdminShell title={clientName} backHref="/admin/clienti">

      {/* Client info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-primary">{clientName}</h2>
          <p className="text-gray-500 text-sm">{decodedEmail}</p>
          <p className="text-gray-400 text-xs mt-1">{policies.length} polizze — premio annuo totale: <strong className="text-gray-600">€{policies.filter(p => p.stato !== 'scaduta').reduce((s, p) => s + p.premioAnnuo, 0).toLocaleString('it-IT')}</strong></p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <MagicLinkButton email={decodedEmail} clientName={clientName} />
          <Link
            href={`/admin/polizze/nuova?email=${encodeURIComponent(decodedEmail)}&name=${encodeURIComponent(clientName)}`}
            className="btn-primary text-sm px-4 py-2"
          >
            + Aggiungi polizza
          </Link>
        </div>
      </div>

      {/* Policies */}
      <div className="space-y-4">
        {policies.map((p) => {
          const expiryDate = new Date(p.dataScadenza).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
          const startDate = new Date(p.dataInizio).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
          return (
            <div
              key={p.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                p.stato === 'scaduta' ? 'border-red-200 opacity-75' :
                p.stato === 'in-scadenza' ? 'border-orange-200' :
                'border-gray-100'
              }`}
            >
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-primary">{p.tipo}</h3>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    p.stato === 'attiva' ? 'bg-green-100 text-green-700' :
                    p.stato === 'in-scadenza' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {p.stato === 'attiva' ? 'Attiva' :
                     p.stato === 'in-scadenza' ? `Scade tra ${p.giorniAllaScadenza} giorni` :
                     'Scaduta'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/polizze/${p.id}/modifica`} className="text-xs font-semibold text-primary hover:underline">
                    Modifica
                  </Link>
                  <span className="text-gray-200">|</span>
                  <DeletePolicyButton id={p.id} tipo={p.tipo} />
                </div>
              </div>
              <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {[
                  { label: 'Compagnia', value: p.compagnia },
                  { label: 'N. polizza', value: p.numeroPolizza },
                  { label: 'Decorrenza', value: startDate },
                  { label: 'Scadenza', value: expiryDate },
                  { label: 'Premio annuo', value: `€${p.premioAnnuo.toLocaleString('it-IT')}` },
                  ...(p.massimale ? [{ label: 'Massimale', value: p.massimale }] : []),
                ].map((row) => (
                  <div key={row.label}>
                    <span className="text-gray-400 text-xs uppercase tracking-wide block">{row.label}</span>
                    <span className="text-gray-800 font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
              {p.note && (
                <div className="px-6 pb-4">
                  <span className="text-xs text-gray-400">Note: </span>
                  <span className="text-xs text-gray-600">{p.note}</span>
                </div>
              )}
              {p.documenti.length > 0 && (
                <div className="px-6 pb-4 border-t border-gray-50 pt-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Documenti ({p.documenti.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {p.documenti.map((doc, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">{doc.nome}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </AdminShell>
  )
}
