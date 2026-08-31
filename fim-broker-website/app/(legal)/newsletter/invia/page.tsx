import type { Metadata } from 'next'
import ApprovaInvio from './ApprovaInvio'

export const metadata: Metadata = {
  title: 'Approva invio newsletter',
  description: 'Approvazione dell\'invio mensile della newsletter FIM Insurance Broker.',
  robots: { index: false, follow: false },
}

export default async function ApprovaInvioPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>
}) {
  const { t } = await searchParams

  return (
    <div className="container-custom py-20 max-w-xl">
      <h1 className="text-3xl font-black text-primary mb-4">Approva l&apos;invio</h1>
      <ApprovaInvio token={t ?? ''} />
    </div>
  )
}
