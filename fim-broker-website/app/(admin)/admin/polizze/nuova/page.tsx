import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth'
import AdminShell from '@/components/admin/AdminShell'
import PolicyForm from '@/components/admin/PolicyForm'

export const metadata: Metadata = { title: 'Nuova Polizza' }

interface PageProps {
  searchParams: Promise<{ email?: string; name?: string }>
}

export default async function NuovaPolizzaPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)
  if (!session?.value || !(await verifyAdminToken(session.value))) redirect('/admin/login')

  const { email, name } = await searchParams

  return (
    <AdminShell title="Nuova Polizza" backHref={email ? `/admin/clienti/${encodeURIComponent(email)}` : '/admin/clienti'}>
      <div className="max-w-3xl">
        <PolicyForm
          mode="create"
          prefillEmail={email}
          prefillName={name}
        />
      </div>
    </AdminShell>
  )
}
