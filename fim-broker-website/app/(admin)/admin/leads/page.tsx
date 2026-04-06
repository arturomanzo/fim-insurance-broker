import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getAllLeads, getLeadsStats } from '@/lib/leadStore'
import AdminShell from '@/components/admin/AdminShell'
import LeadsTable from '@/components/admin/LeadsTable'

export const metadata: Metadata = { title: 'Lead — Richieste Preventivo' }

const STATO_COLORS = {
  nuovo: 'bg-blue-100 text-blue-700',
  contattato: 'bg-yellow-100 text-yellow-700',
  chiuso: 'bg-green-100 text-green-700',
}

export default async function AdminLeadsPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value || !(await verifyAdminToken(session.value))) redirect('/admin/login')

  const leads = getAllLeads()
  const stats = getLeadsStats()

  return (
    <AdminShell title="Lead — Richieste Preventivo">
      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-black mb-1 text-primary">{stats.total}</div>
          <div className="text-sm font-medium text-gray-700">Totali</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className={`text-2xl font-black mb-1 ${stats.nuovi > 0 ? 'text-blue-600' : 'text-gray-400'}`}>{stats.nuovi}</div>
          <div className="text-sm font-medium text-gray-700">Nuovi</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-black mb-1 text-yellow-600">{stats.contattati}</div>
          <div className="text-sm font-medium text-gray-700">Contattati</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="text-2xl font-black mb-1 text-green-600">{stats.chiusi}</div>
          <div className="text-sm font-medium text-gray-700">Chiusi</div>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center">
          <p className="font-semibold text-gray-500">Nessuna richiesta di preventivo ancora ricevuta.</p>
          <p className="text-sm text-gray-400 mt-1">Apparirà qui ogni volta che un utente compila il form sul sito.</p>
        </div>
      ) : (
        <LeadsTable leads={leads} statoColors={STATO_COLORS} />
      )}
    </AdminShell>
  )
}
