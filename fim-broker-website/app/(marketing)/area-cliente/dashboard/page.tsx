import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { verifyToken, SESSION_COOKIE } from '@/lib/clientAuth'
import {
  caricaPortafoglio,
  dataEstesa,
  etichettaFrazionamento,
  oggiRoma,
  statoVisibile,
  titoloPolizza,
  type PolizzaCliente,
  type StatoVisibile,
} from '@/lib/areaCliente'
import LogoutButton from '@/components/area-cliente/LogoutButton'
import StatoPolizza from '@/components/area-cliente/StatoPolizza'

export const metadata: Metadata = {
  title: 'Le mie Polizze | Area Cliente FIM',
  robots: { index: false },
}

type PolizzaConStato = PolizzaCliente & { visibile: StatoVisibile; giorni: number | null }

interface PageProps {
  searchParams: Promise<{ documento?: string }>
}

function PolicyCard({ policy }: { policy: PolizzaConStato }) {
  const frazionamento = etichettaFrazionamento(policy.frazionamento)

  return (
    <div className={`bg-white rounded-2xl border p-6 hover:shadow-md transition-shadow ${
      policy.visibile === 'in-scadenza' ? 'border-orange-200' : 'border-gray-100'
    }`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-primary text-base truncate">{titoloPolizza(policy)}</h3>
          <p className="text-gray-500 text-sm">
            {[policy.compagnia, policy.numero && `n. ${policy.numero}`].filter(Boolean).join(' · ')}
          </p>
        </div>
        <StatoPolizza stato={policy.visibile} giorni={policy.giorni} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Decorrenza</span>
          <p className="text-gray-700 font-medium">{dataEstesa(policy.decorrenza)}</p>
        </div>
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Scadenza</span>
          <p className={`font-medium ${policy.visibile === 'in-scadenza' ? 'text-orange-600' : 'text-gray-700'}`}>
            {policy.visibile === 'da-aggiornare' ? 'In aggiornamento' : dataEstesa(policy.scadenza)}
          </p>
        </div>
        {frazionamento && (
          <div>
            <span className="text-gray-400 text-xs uppercase tracking-wide">Pagamento</span>
            <p className="text-gray-700 font-medium">{frazionamento}</p>
          </div>
        )}
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Contraente</span>
          <p className="text-gray-700 font-medium truncate">{policy.contraente || '—'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
        <Link
          href={`/area-cliente/polizza/${policy.id}`}
          className="text-sm text-primary font-semibold hover:underline"
        >
          {policy.documenti.length > 0 ? 'Dettagli e documenti →' : 'Vedi dettagli →'}
        </Link>
        {policy.visibile === 'in-scadenza' && (
          <Link
            href="/prenota-consulenza"
            className="ml-auto text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Parliamo del rinnovo
          </Link>
        )}
      </div>
    </div>
  )
}

function Sezione({ titolo, colore, polizze }: { titolo: string; colore: string; polizze: PolizzaConStato[] }) {
  if (polizze.length === 0) return null
  return (
    <section className="mb-8">
      <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${colore}`}></span>
        {titolo}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {polizze.map((p) => <PolicyCard key={p.id} policy={p} />)}
      </div>
    </section>
  )
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)

  if (!session?.value) redirect('/area-cliente?expired=1')

  const email = await verifyToken(session.value)
  if (!email) redirect('/area-cliente?expired=1')

  const params = await searchParams
  const esito = await caricaPortafoglio(email)
  const oggi = oggiRoma()

  const policies: PolizzaConStato[] = esito.ok
    ? esito.portafoglio.polizze.map((p) => {
        const { stato, giorni } = statoVisibile(p, oggi)
        return { ...p, visibile: stato, giorni }
      })
    : []

  const expiring = policies.filter((p) => p.visibile === 'in-scadenza')
  const active = policies.filter((p) => p.visibile === 'attiva' || p.visibile === 'da-aggiornare')
  const suspended = policies.filter((p) => p.visibile === 'sospesa')
  const clientName = (esito.ok && esito.portafoglio.nome) || email
  const documenti = policies.reduce((s, p) => s + p.documenti.length, 0)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-white/60 text-sm mb-1">Benvenuto,</p>
              <h1 className="text-2xl font-black">{clientName}</h1>
              {clientName !== email && <p className="text-white/60 text-sm">{email}</p>}
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="container-custom py-8">

        {params.documento && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-sm text-yellow-800">
            Il documento non si è aperto. Riprova tra qualche minuto, oppure chiamaci al{' '}
            <a href="tel:+390696883381" className="underline font-semibold">06 96883381</a> e te lo mandiamo noi.
          </div>
        )}

        {!esito.ok && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <h2 className="font-bold text-primary mb-2">Non riusciamo a caricare le tue polizze</h2>
            <p className="text-gray-500 text-sm mb-6">
              È un problema nostro, non del tuo accesso. Riprova tra qualche minuto<br />
              oppure chiamaci: ti diciamo noi tutto quello che ti serve.
            </p>
            <a href="tel:+390696883381" className="btn-primary">Chiama lo 06 96883381</a>
          </div>
        )}

        {esito.ok && (
          <>
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Polizze in corso', value: active.length + expiring.length, color: 'text-primary' },
                { label: 'In scadenza', value: expiring.length, color: expiring.length > 0 ? 'text-orange-500' : 'text-gray-400' },
                { label: 'Documenti', value: documenti, color: 'text-primary' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className={`text-2xl font-black mb-1 ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-gray-500 text-sm">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Expiring alert */}
            {expiring.length > 0 && (
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
                <p className="font-semibold text-orange-800 text-sm">
                  {expiring.length === 1
                    ? '1 polizza scade nei prossimi 60 giorni'
                    : `${expiring.length} polizze scadono nei prossimi 60 giorni`}
                </p>
                <p className="text-orange-700 text-xs mt-0.5">
                  Vuoi parlarne adesso? Chiamaci allo{' '}
                  <a href="tel:+390696883381" className="underline font-semibold">06 96883381</a>.
                </p>
              </div>
            )}

            {/* No policies */}
            {policies.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <h2 className="font-bold text-primary mb-2">Nessuna polizza trovata</h2>
                <p className="text-gray-500 text-sm mb-6">
                  Non risultano polizze in corso legate a questo indirizzo email.<br />
                  Se ne hai con noi, forse abbiamo in archivio un&apos;altra email: chiamaci e la sistemiamo.
                </p>
                <a href="tel:+390696883381" className="btn-primary">Chiama lo 06 96883381</a>
              </div>
            )}

            <Sezione titolo="In scadenza" colore="bg-orange-500" polizze={expiring} />
            <Sezione titolo="Polizze in corso" colore="bg-green-500" polizze={active} />
            <Sezione titolo="Polizze sospese" colore="bg-gray-400" polizze={suspended} />

            {policies.length > 0 && (
              <p className="text-gray-400 text-xs mb-6">
                Qui vedi le polizze che seguiamo direttamente. Se manca qualcosa, o un dato non ti torna, dicci pure: lo controlliamo insieme.
              </p>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-6 gradient-primary rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold mb-1">Hai bisogno di assistenza?</p>
            <p className="text-white/70 text-sm">Il tuo consulente FIM è disponibile Lun–Ven 9:30–13:00 e 15:30–18:30.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="tel:+390696883381" className="bg-white text-primary font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-colors">
              Chiama
            </a>
            <Link href="/prenota-consulenza" className="bg-accent-cta text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-accent/90 transition-colors">
              Prenota
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
