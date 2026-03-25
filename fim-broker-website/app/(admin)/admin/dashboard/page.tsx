import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getDashboardStats, getAllPolicies } from '@/lib/policyStore'
import AdminShell from '@/components/admin/AdminShell'

export const metadata: Metadata = { title: 'Dashboard' }

function KpiCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className={`text-2xl font-black mb-1 ${color ?? 'text-primary'}`}>{value}</div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value || !(await verifyAdminToken(session.value))) redirect('/admin/login')

  const stats = getDashboardStats()
  const allPolicies = getAllPolicies()
  const expiring = allPolicies
    .filter((p) => p.stato === 'in-scadenza')
    .sort((a, b) => a.giorniAllaScadenza - b.giorniAllaScadenza)
    .slice(0, 8)

  return (
    <AdminShell title="Dashboard">

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Clienti totali" value={stats.totalClients} />
        <KpiCard label="Polizze attive" value={stats.activePolicies + stats.expiringIn30 + stats.expiringIn60} sub={`${stats.totalPolicies} totali`} />
        <KpiCard
          label="In scadenza (30 gg)"
          value={stats.expiringIn30}
          color={stats.expiringIn30 > 0 ? 'text-red-500' : 'text-gray-400'}
        />
        <KpiCard
          label="Premio annuo totale"
          value={`€${stats.totalPremioAnnuo.toLocaleString('it-IT')}`}
          sub="polizze attive e in-scadenza"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <KpiCard label="In scadenza (30–60 gg)" value={stats.expiringIn60} color={stats.expiringIn60 > 0 ? 'text-orange-500' : 'text-gray-400'} />
        <KpiCard label="Scadute" value={stats.expiredPolicies} color={stats.expiredPolicies > 0 ? 'text-red-400' : 'text-gray-400'} />
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between">
          <p className="text-sm text-gray-500 mb-3">Azioni rapide</p>
          <div className="space-y-2">
            <Link href="/admin/polizze/nuova" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Aggiungi polizza
            </Link>
            <Link href="/admin/clienti" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Gestisci clienti
            </Link>
          </div>
        </div>
      </div>

      {/* Expiring policies table */}
      {expiring.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-primary">Polizze in scadenza</h2>
            <span className="text-xs text-gray-400">{expiring.length} risultati</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Cliente', 'Tipo', 'Compagnia', 'Scadenza', 'Giorni', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {expiring.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{p.clientName}</div>
                      <div className="text-gray-400 text-xs">{p.clientEmail}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{p.tipo}</td>
                    <td className="px-4 py-3 text-gray-500">{p.compagnia}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(p.dataScadenza).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                        p.giorniAllaScadenza <= 30 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {p.giorniAllaScadenza} gg
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/clienti/${encodeURIComponent(p.clientEmail)}`} className="text-primary text-xs font-semibold hover:underline">
                        Vedi →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {expiring.length === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <p className="font-semibold text-green-700">Nessuna polizza in scadenza nei prossimi 60 giorni.</p>
        </div>
      )}

    </AdminShell>
  )
}
