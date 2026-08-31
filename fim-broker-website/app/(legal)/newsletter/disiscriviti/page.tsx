import type { Metadata } from 'next'
import DisiscrivitiForm from './DisiscrivitiForm'

export const metadata: Metadata = {
  title: 'Cancella iscrizione newsletter',
  description: 'Cancella la tua iscrizione alla newsletter di FIM Insurance Broker.',
  robots: { index: false, follow: false },
}

export default async function DisiscrivitiPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>
}) {
  const { t } = await searchParams

  return (
    <div className="container-custom py-20 max-w-xl">
      <h1 className="text-3xl font-black text-primary mb-4">Cancella l&apos;iscrizione</h1>
      <DisiscrivitiForm token={t ?? ''} />
    </div>
  )
}
