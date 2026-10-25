import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { verifyToken, SESSION_COOKIE } from '@/lib/clientAuth'
import {
  caricaPortafoglio,
  dataEstesa,
  etichettaFrazionamento,
  oggiRoma,
  statoVisibile,
  titoloPolizza,
  type TipoDocumento,
} from '@/lib/areaCliente'
import StatoPolizza from '@/components/area-cliente/StatoPolizza'

export const metadata: Metadata = {
  title: 'Dettaglio Polizza | Area Cliente FIM',
  robots: { index: false },
}

interface PageProps {
  params: Promise<{ id: string }>
}

const DOC_TYPE_LABELS: Record<TipoDocumento, string> = {
  contratto: 'Contratto',
  certificato: 'Certificato',
  attestato: 'Attestato di rischio',
  quietanza: 'Quietanza',
  appendice: 'Appendice',
}

export default async function PolicyDetailPage({ params }: PageProps) {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  if (!session?.value) redirect('/area-cliente?expired=1')

  const email = await verifyToken(session.value)
  if (!email) redirect('/area-cliente?expired=1')

  const { id } = await params
  const esito = await caricaPortafoglio(email)
  // Se il gestionale non risponde, la dashboard sa dirlo meglio di un 404.
  if (!esito.ok) redirect('/area-cliente/dashboard')

  const policy = esito.portafoglio.polizze.find((p) => String(p.id) === id)
  if (!policy) notFound()

  const { stato, giorni } = statoVisibile(policy, oggiRoma())
  const frazionamento = etichettaFrazionamento(policy.frazionamento)

  const righe = [
    { label: 'Contraente', value: policy.contraente || '—' },
    { label: 'Compagnia', value: policy.compagnia ?? '—' },
    { label: 'Numero polizza', value: policy.numero ?? '—' },
    { label: 'Ramo', value: policy.ramo ?? '—' },
    ...(policy.targa ? [{ label: 'Targa', value: policy.targa }] : []),
    ...(policy.veicolo ? [{ label: 'Veicolo', value: policy.veicolo }] : []),
    { label: 'Decorrenza', value: dataEstesa(policy.decorrenza) },
    { label: 'Scadenza', value: stato === 'da-aggiornare' ? 'In aggiornamento dopo il rinnovo' : dataEstesa(policy.scadenza) },
    ...(frazionamento ? [{ label: 'Pagamento', value: frazionamento }] : []),
    { label: 'Tacito rinnovo', value: policy.tacitoRinnovo ? 'Sì' : 'No' },
    ...(policy.garanzie.length ? [{ label: 'Garanzie', value: policy.garanzie.join(', ') }] : []),
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary text-white py-8">
        <div className="container-custom">
          <Link href="/area-cliente/dashboard" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Le mie polizze
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-black">{titoloPolizza(policy)}</h1>
              <p className="text-white/60 text-sm mt-1">
                {[policy.compagnia, policy.numero && `n. ${policy.numero}`].filter(Boolean).join(' · ')}
              </p>
            </div>
            <StatoPolizza stato={stato} giorni={giorni} />
          </div>
        </div>
      </div>

      <div className="container-custom py-8 max-w-3xl">

        {/* Status banner */}
        {stato === 'in-scadenza' && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
            <p className="font-semibold text-orange-800 text-sm">
              {giorni === 0
                ? <>Questa polizza scade <strong>oggi</strong></>
                : <>Questa polizza scade tra <strong>{giorni} {giorni === 1 ? 'giorno' : 'giorni'}</strong>, il {dataEstesa(policy.scadenza)}</>}
            </p>
            <Link
              href="/prenota-consulenza"
              className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors flex-shrink-0"
            >
              Parliamo del rinnovo
            </Link>
          </div>
        )}
        {stato === 'da-aggiornare' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-sm text-primary">
            La data di scadenza che abbiamo in archivio è già passata: stiamo aggiornando i dati del rinnovo.
            Se hai dubbi sulla copertura chiamaci allo{' '}
            <a href="tel:+390696883381" className="underline font-semibold">06 96883381</a>.
          </div>
        )}
        {stato === 'sospesa' && (
          <div className="mb-6 p-4 bg-gray-100 border border-gray-200 rounded-2xl text-sm text-gray-700">
            Questa polizza risulta sospesa. Per riattivarla, o per capire cosa copre adesso, chiamaci allo{' '}
            <a href="tel:+390696883381" className="underline font-semibold">06 96883381</a>.
          </div>
        )}

        {/* Details card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Dettagli polizza</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {righe.map((row) => (
              <div key={row.label} className="px-6 py-4 grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-400 text-sm">{row.label}</span>
                <span className="col-span-3 text-gray-800 text-sm font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Documenti</h2>
          </div>
          {policy.documenti.length === 0 ? (
            <p className="px-6 py-4 text-gray-500 text-sm">
              Non abbiamo ancora caricato documenti per questa polizza. Se te ne serve uno, chiamaci o scrivici e te lo mandiamo.
            </p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {policy.documenti.map((doc) => (
                <li key={doc.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-gray-800 break-words">{doc.nome}</span>
                    <span className="ml-2 text-xs text-gray-400">{DOC_TYPE_LABELS[doc.tipo] ?? doc.tipo}</span>
                  </div>
                  <a
                    href={`/api/area-cliente/documento?id=${doc.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm font-semibold hover:underline flex-shrink-0"
                  >
                    Scarica
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-gray-400 text-xs mb-6">
          Fanno fede il contratto e le condizioni di polizza della compagnia. Se un dato qui non ti torna, dicci pure: lo controlliamo insieme.
        </p>

        {/* Contact */}
        <div className="gradient-primary rounded-2xl p-6 text-white">
          <h3 className="font-bold mb-2">Hai domande su questa polizza?</h3>
          <p className="text-white/70 text-sm mb-4">Il nostro team è a tua disposizione per chiarimenti, sinistri o modifiche di copertura.</p>
          <div className="flex gap-3 flex-wrap">
            <a href="tel:+390696883381" className="bg-white text-primary font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-colors">
              06 96883381
            </a>
            <a href="mailto:info@fimbroker.it" className="bg-white/10 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors">
              Email
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
