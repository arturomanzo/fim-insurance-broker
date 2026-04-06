'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Lead } from '@/lib/leadStore'

interface Props {
  leads: Lead[]
  statoColors: Record<string, string>
}

const STATO_LABELS: Record<Lead['stato'], string> = {
  nuovo: 'Nuovo',
  contattato: 'Contattato',
  chiuso: 'Chiuso',
}

export default function LeadsTable({ leads, statoColors }: Props) {
  const router = useRouter()
  const [updating, setUpdating] = useState<string | null>(null)

  async function changeStato(id: string, stato: Lead['stato']) {
    setUpdating(id)
    await fetch('/api/admin/leads', {
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
        <h2 className="font-bold text-primary">Richieste ricevute</h2>
        <span className="text-xs text-gray-400">{leads.length} totali</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Data', 'Cliente', 'Contatti', 'Tipo', 'Messaggio', 'Stato', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                  {new Date(lead.timestamp).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })}
                  <div className="text-gray-400">{new Date(lead.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">{lead.nome} {lead.cognome}</div>
                  {lead.profilo && <div className="text-xs text-gray-400">{lead.profilo}</div>}
                </td>
                <td className="px-4 py-3">
                  <a href={`mailto:${lead.email}`} className="text-primary text-xs hover:underline block">{lead.email}</a>
                  <a href={`tel:${lead.telefono}`} className="text-gray-500 text-xs hover:underline block">{lead.telefono}</a>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-gray-700">{lead.tipo}</span>
                </td>
                <td className="px-4 py-3 max-w-xs">
                  {lead.messaggio ? (
                    <span className="text-gray-500 text-xs line-clamp-2">{lead.messaggio}</span>
                  ) : (
                    <span className="text-gray-300 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${statoColors[lead.stato] ?? ''}`}>
                    {STATO_LABELS[lead.stato]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.stato}
                    disabled={updating === lead.id}
                    onChange={(e) => changeStato(lead.id, e.target.value as Lead['stato'])}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                  >
                    <option value="nuovo">Nuovo</option>
                    <option value="contattato">Contattato</option>
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
