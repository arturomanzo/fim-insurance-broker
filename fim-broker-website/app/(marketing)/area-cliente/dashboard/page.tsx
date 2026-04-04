import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { verifyToken, SESSION_COOKIE } from '@/lib/clientAuth'
import { getPoliciesForEmail } from '@/lib/policyData'
import type { PolicyWithStatus } from '@/lib/policyData'
import LogoutButton from '@/components/area-cliente/LogoutButton'

export const metadata: Metadata = {
  title: 'Le mie Polizze | Area Cliente FIM',
  robots: { index: false },
}

function StatusBadge({ stato, giorni }: { stato: PolicyWithStatus['stato']; giorni: number }) {
  if (stato === 'scaduta') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        Scaduta
      </span>
    )
  }
  if (stato === 'in-scadenza') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
        ⚠️ Scade tra {giorni} {giorni === 1 ? 'giorno' : 'giorni'}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
      ✓ Attiva
    </span>
  )
}

function PolicyCard({ policy }: { policy: PolicyWithStatus }) {
  const expiryDate = new Date(policy.dataScadenza).toLocaleDateString('it-IT', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
  const startDate = new Date(policy.dataInizio).toLocaleDateString('it-IT', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  return (
    <div className={`bg-white rounded-2xl border p-6 hover:shadow-md transition-shadow ${
      policy.stato === 'scaduta' ? 'border-red-200 opacity-75' :
      policy.stato === 'in-scadenza' ? 'border-orange-200' :
      'border-gray-100'
    }`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-primary text-base truncate">{policy.tipo}</h3>
          <p className="text-gray-500 text-sm">{policy.compagnia} · {policy.numeroPolizza}</p>
        </div>
        <StatusBadge stato={policy.stato} giorni={policy.giorniAllaScadenza} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Decorrenza</span>
          <p className="text-gray-700 font-medium">{startDate}</p>
        </div>
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Scadenza</span>
          <p className={`font-medium ${policy.stato === 'in-scadenza' ? 'text-orange-600' : policy.stato === 'scaduta' ? 'text-red-600' : 'text-gray-700'}`}>
            {expiryDate}
          </p>
        </div>
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Premio annuo</span>
          <p className="text-gray-700 font-medium">€{policy.premioAnnuo.toLocaleString('it-IT')}</p>
        </div>
        {policy.massimale && (
          <div>
            <span className="text-gray-400 text-xs uppercase tracking-wide">Massimale</span>
            <p className="text-gray-700 text-xs leading-snug">{policy.massimale}</p>
          </div>
        )}
      </div>

      {policy.stato !== 'scaduta' && (
        <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
          <Link
            href={`/area-cliente/polizza/${policy.id}`}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Vedi dettagli e documenti →
          </Link>
          {policy.stato === 'in-scadenza' && (
            <Link
              href={`/preventivo?profilo=privato&tipo=${encodeURIComponent(policy.tipo)}`}
              className="ml-auto text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Rinnova
            </Link>
          )}
        </div>
      )}
      {policy.stato === 'scaduta' && (
        <div className="pt-3 border-t border-gray-50">
          <Link
            href={`/preventivo?tipo=${encodeURIComponent(policy.tipo)}`}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Richiedi rinnovo →
          </Link>
        </div>
      )}
    </div>
  )
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)

  if (!session?.value) redirect('/area-cliente?expired=1')

  const email = await verifyToken(session.value)
  if (!email) redirect('/area-cliente?expired=1')

  const policies = getPoliciesForEmail(email)

  const active = policies.filter((p) => p.stato === 'attiva')
  const expiring = policies.filter((p) => p.stato === 'in-scadenza')
  const expired = policies.filter((p) => p.stato === 'scaduta')
  const clientName = policies[0]?.clientName ?? email

  const totalPremio = policies
    .filter((p) => p.stato !== 'scaduta')
    .reduce((sum, p) => sum + p.premioAnnuo, 0)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-white/60 text-sm mb-1">Benvenuto,</p>
              <h1 className="text-2xl font-black">{clientName}</h1>
              <p className="text-white/60 text-sm">{email}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="container-custom py-8">

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Polizze attive', value: active.length + expiring.length, color: 'text-primary' },
            { label: 'In scadenza', value: expiring.length, color: expiring.length > 0 ? 'text-orange-500' : 'text-gray-400' },
            { label: 'Premio annuo totale', value: `€${totalPremio.toLocaleString('it-IT')}`, color: 'text-primary' },
            { label: 'Documenti', value: policies.reduce((s, p) => s + p.documenti.length, 0), color: 'text-primary' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`text-2xl font-black mb-1 ${kpi.color}`}>{kpi.value}</div>
              <div className="text-gray-500 text-sm">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Expiring alert */}
        {expiring.length > 0 && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-start gap-3">
            <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-semibold text-orange-800 text-sm">
                {expiring.length === 1
                  ? `1 polizza in scadenza entro 60 giorni`
                  : `${expiring.length} polizze in scadenza entro 60 giorni`}
              </p>
              <p className="text-orange-700 text-xs mt-0.5">
                Contatta il tuo consulente FIM o richiedi il rinnovo direttamente.{' '}
                <a href="tel:+390696883381" className="underline font-semibold">06 96883381</a>
              </p>
            </div>
          </div>
        )}

        {/* No policies */}
        {policies.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="font-bold text-primary mb-2">Nessuna polizza trovata</h2>
            <p className="text-gray-500 text-sm mb-6">
              Non risultano polizze associate a questo indirizzo email.<br />
              Contattaci per verificare i tuoi dati.
            </p>
            <a href="tel:+390696883381" className="btn-primary">📞 06 96883381</a>
          </div>
        )}

        {/* In-scadenza section */}
        {expiring.length > 0 && (
          <section className="mb-8">
            <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              In scadenza
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expiring.map((p) => <PolicyCard key={p.id} policy={p} />)}
            </div>
          </section>
        )}

        {/* Active policies */}
        {active.length > 0 && (
          <section className="mb-8">
            <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Polizze attive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {active.map((p) => <PolicyCard key={p.id} policy={p} />)}
            </div>
          </section>
        )}

        {/* Expired */}
        {expired.length > 0 && (
          <section className="mb-8">
            <h2 className="font-bold text-gray-400 mb-4 text-sm uppercase tracking-wide">
              Polizze scadute
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expired.map((p) => <PolicyCard key={p.id} policy={p} />)}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="mt-6 gradient-primary rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold mb-1">Hai bisogno di assistenza?</p>
            <p className="text-white/70 text-sm">Il tuo consulente FIM è disponibile Lun–Ven 9:30–13:00 e 15:30–18:30.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="tel:+390696883381" className="bg-white text-primary font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-colors">
              📞 Chiama
            </a>
            <Link href="/prenota-consulenza" className="bg-accent text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-accent/90 transition-colors">
              Prenota
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
