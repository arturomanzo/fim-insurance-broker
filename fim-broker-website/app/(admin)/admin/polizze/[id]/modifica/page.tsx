import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import { getPolicyByIdAdmin } from '@/lib/policyStore'
import AdminShell from '@/components/admin/AdminShell'
import PolicyForm from '@/components/admin/PolicyForm'

export const metadata: Metadata = { title: 'Modifica Polizza' }

interface PageProps { params: Promise<{ id: string }> }

export default async function ModificaPolizzaPage({ params }: PageProps) {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value || !(await verifyAdminToken(session.value))) redirect('/admin/login')

  const { id } = await params
  const policy = getPolicyByIdAdmin(id)
  if (!policy) notFound()

  return (
    <AdminShell
      title={`Modifica — ${policy.tipo}`}
      backHref={`/admin/clienti/${encodeURIComponent(policy.clientEmail)}`}
    >
      <div className="max-w-3xl">
        <PolicyForm
          mode="edit"
          policyId={id}
          initial={policy}
        />
      </div>
    </AdminShell>
  )
}
