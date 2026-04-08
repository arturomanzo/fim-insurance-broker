'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SinistroRecord } from '@/lib/sinistriStore'

interface Props {
  sinistri: SinistroRecord[]
  statoColors: Record<string, string>
}

const STATO_LABELS: Record<SinistroRecord['stato'], string> = {
  aperto: 'Aperto',
  'in-lavorazione': 'In lavorazione',
  chiuso: 'Chiuso',
}

export default function SinistriTable({ sinistri, statoColors }: Props) {
  const router = useRouter()
  const [updating, setUpdating] = useState<string | null>(null)

  async function changeStato(id: string, stato: SinistroRecord['stato']) {
    setUpdating(id)
    await fetch('/api/admin/sinistri', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, stato }),
    })
    setUpdating(null)
    router.refresh()
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
        <h2 className="font-bold text-primary">Pratiche sinistro</h2>
        <span className="text-xs text-gray-400">{sinistri.length} totali</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['ID / Data', 'Cliente', 'Contatti', 'Tipo sinistro', 'Data evento', 'Polizza', 'Stato', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sinistri.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3">
                  <div className="font-mono text-xs text-gray-500">{s.id}</div>
                  <div className="text-gray-400 text-xs">
                    {new Date(s.timestamp).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">{s.nome} {s.cognome}</div>
                </td>
                <td className="px-4 py-3">
                  <a href={`mailto:${s.email}`} className="text-primary text-xs hover:underline block">{s.email}</a>
                  <a href={`tel:${s.telefono}`} className="text-gray-500 text-xs hover:underline block">{s.telefono}</a>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-red-700">{s.tipoSinistro}</span>
                  {s.compagnia && <div className="text-xs text-gray-400">{s.compagnia}</div>}
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                  {new Date(s.dataEvento).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {s.numeroPolizza || '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${statoColors[s.stato] ?? ''}`}>
                    {STATO_LABELS[s.stato]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={s.stato}
                    disabled={updating === s.id}
                    onChange={(e) => changeStato(s.id, e.target.value as SinistroRecord['stato'])}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                  >
                    <option value="aperto">Aperto</option>
                    <option value="in-lavorazione">In lavorazione</option>
                    <option value="chiuso">Chiuso</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
