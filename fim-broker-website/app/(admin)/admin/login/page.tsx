import type { Metadata } from 'next'
import AdminLoginForm from '@/components/admin/AdminLoginForm'

export const metadata: Metadata = {
  title: 'Accesso Amministratori — FIM Insurance Broker',
  robots: { index: false },
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-white text-2xl font-black">Pannello Admin</h1>
          <p className="text-white/50 text-sm mt-1">FIM Insurance Broker</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <AdminLoginForm />
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Accesso riservato al personale FIM
        </p>
      </div>
    </div>
  )
}
