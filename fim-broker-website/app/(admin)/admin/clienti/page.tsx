import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getAllClients } from '@/lib/policyStore'
import AdminShell from '@/components/admin/AdminShell'

export const metadata: Metadata = { title: 'Clienti' }

export default async function AdminClientiPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value || !(await verifyAdminToken(session.value))) redirect('/admin/login')

  const clients = getAllClients()

  return (
    <AdminShell title="Clienti" backHref="/admin/dashboard">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500">{clients.length} clienti registrati</p>
        <Link href="/admin/polizze/nuova" className="btn-primary text-sm px-4 py-2">
          + Nuova polizza
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400 mb-4">Nessun cliente. Aggiungi la prima polizza.</p>
          <Link href="/admin/polizze/nuova" className="btn-primary">Aggiungi polizza</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Cliente', 'Email', 'Polizze', 'Stato', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {clients.map((c) => (
                  <tr key={c.email} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-gray-800">{c.name}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-500">{c.email}</td>
                    <td className="px-5 py-4 text-gray-700 font-medium">{c.totalPolicies}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {c.activePolicies > 0 && (
                          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                            {c.activePolicies} attive
                          </span>
                        )}
                        {c.expiringPolicies > 0 && (
                          <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">
                            {c.expiringPolicies} in scadenza
                          </span>
                        )}
                        {c.expiredPolicies > 0 && (
                          <span className="text-xs bg-red-100 text-red-400 font-semibold px-2 py-0.5 rounded-full">
                            {c.expiredPolicies} scadute
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/clienti/${encodeURIComponent(c.email)}`}
                        className="text-primary text-xs font-bold hover:underline"
                      >
                        Dettaglio →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
