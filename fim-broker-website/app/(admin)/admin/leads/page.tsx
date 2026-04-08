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

  const rawLeads = await getAllLeads()
  // Ordina: prima per priorità (alta > media > bassa > non analizzato), poi per timestamp
  const PRIORITY_ORDER = { alta: 0, media: 1, bassa: 2 }
  const leads = [...rawLeads].sort((a, b) => {
    const pa = a.ai_priority ? PRIORITY_ORDER[a.ai_priority] : 3
    const pb = b.ai_priority ? PRIORITY_ORDER[b.ai_priority] : 3
    if (pa !== pb) return pa - pb
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
  const stats = await getLeadsStats()

  return (
    <AdminShell title="Lead — Richieste Preventivo">
      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
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
        <div className="bg-red-50 rounded-2xl border border-red-100 p-5 shadow-sm">
          <div className="text-2xl font-black mb-1 text-red-600">
            {leads.filter((l) => l.ai_priority === 'alta').length}
          </div>
          <div className="text-sm font-medium text-red-700">🔴 Alta priorità</div>
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
