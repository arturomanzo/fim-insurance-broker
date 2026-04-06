import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getAllSinistri, getSinistriStats } from '@/lib/sinistriStore'
import AdminShell from '@/components/admin/AdminShell'
import SinistriTable from '@/components/admin/SinistriTable'

export const metadata: Metadata = { title: 'Sinistri' }

const STATO_COLORS = {
  aperto: 'bg-red-100 text-red-700',
  'in-lavorazione': 'bg-orange-100 text-orange-700',
  chiuso: 'bg-green-100 text-green-700',
}

export default async function AdminSinistriPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value || !(await verifyAdminToken(session.value))) redirect('/admin/login')

  const sinistri = await getAllSinistri()
  const stats = await getSinistriStats()

  return (
    <AdminShell title="Sinistri">
      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-black mb-1 text-primary">{stats.total}</div>
          <div className="text-sm font-medium text-gray-700">Totali</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className={`text-2xl font-black mb-1 ${stats.aperti > 0 ? 'text-red-600' : 'text-gray-400'}`}>{stats.aperti}</div>
          <div className="text-sm font-medium text-gray-700">Aperti</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-black mb-1 text-orange-600">{stats.inLavorazione}</div>
          <div className="text-sm font-medium text-gray-700">In lavorazione</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-black mb-1 text-green-600">{stats.chiusi}</div>
          <div className="text-sm font-medium text-gray-700">Chiusi</div>
        </div>
      </div>

      {sinistri.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center">
          <p className="font-semibold text-gray-500">Nessuna pratica sinistro ancora ricevuta.</p>
          <p className="text-sm text-gray-400 mt-1">Apparirà qui ogni volta che un utente apre una pratica sinistro dal sito.</p>
        </div>
      ) : (
        <SinistriTable sinistri={sinistri} statoColors={STATO_COLORS} />
      )}
    </AdminShell>
  )
}
