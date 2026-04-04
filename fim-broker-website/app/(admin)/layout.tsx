import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin — FIM Insurance Broker', template: '%s | Admin FIM' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
