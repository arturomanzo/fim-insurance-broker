import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getLeadsStats } from '@/lib/leadStore'
import { getSinistriStats } from '@/lib/sinistriStore'
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

  const leadsStats = await getLeadsStats()
  const sinistriStats = await getSinistriStats()

  return (
    <AdminShell title="Dashboard">

      {/* Lead e Sinistri */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Lead nuovi" value={leadsStats.nuovi} sub={`${leadsStats.total} totali`} color={leadsStats.nuovi > 0 ? 'text-blue-600' : 'text-gray-400'} />
        <KpiCard label="Lead contattati" value={leadsStats.contattati} color="text-yellow-600" />
        <KpiCard label="Sinistri aperti" value={sinistriStats.aperti} sub={`${sinistriStats.total} totali`} color={sinistriStats.aperti > 0 ? 'text-red-600' : 'text-gray-400'} />
        <KpiCard label="Sinistri in lavorazione" value={sinistriStats.inLavorazione} color={sinistriStats.inLavorazione > 0 ? 'text-orange-600' : 'text-gray-400'} />
      </div>

      {/* Polizze e clienti stanno nel gestionale: qui c'era un elenco demo. */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-bold text-primary mb-1">Polizze, clienti e scadenze</h2>
        <p className="text-sm text-gray-500 mb-4">
          Si lavorano nel gestionale. L&apos;Area Cliente del sito legge da lì, in sola lettura.
        </p>
        <a
          href="https://fim-gestionale-next.vercel.app/scadenzario"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Apri lo scadenzario nel gestionale →
        </a>
      </div>

    </AdminShell>
  )
}
