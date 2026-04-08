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

const PRIORITY_CONFIG = {
  alta:   { label: 'Priorità alta',   cls: 'bg-red-100 text-red-700 border border-red-200' },
  media:  { label: 'Priorità media',  cls: 'bg-orange-100 text-orange-700 border border-orange-200' },
  bassa:  { label: 'Priorità bassa',  cls: 'bg-gray-100 text-gray-500 border border-gray-200' },
}

function ScoreBadge({ lead }: { lead: Lead }) {
  if (!lead.ai_score) {
    return <span className="text-gray-300 text-xs">—</span>
  }
  const score = lead.ai_score
  const ringColor =
    score >= 80 ? 'bg-red-500' :
    score >= 50 ? 'bg-orange-400' :
    'bg-gray-400'

  return (
    <div className="flex flex-col gap-1 items-start">
      {/* Cerchio score */}
      <span
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white text-xs font-black shadow-sm ${ringColor}`}
        title={lead.ai_reason ?? ''}
      >
        {score}
      </span>
      {/* Badge priorità */}
      {lead.ai_priority && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${PRIORITY_CONFIG[lead.ai_priority].cls}`}>
          {lead.ai_priority.toUpperCase()}
        </span>
      )}
    </div>
  )
}

export default function LeadsTable({ leads, statoColors }: Props) {
  const router = useRouter()
  const [updating, setUpdating] = useState<string | null>(null)
  const [scoring, setScoring] = useState(false)
  const [tooltip, setTooltip] = useState<string | null>(null)
  const [filter, setFilter] = useState<'tutti' | 'alta' | 'media' | 'bassa'>('tutti')

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

  async function scoreAll(force = false) {
    setScoring(true)
    const res = await fetch('/api/admin/leads/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ all: true, force }),
    })
    const data = await res.json() as { scored?: number }
    setScoring(false)
    if (data.scored !== undefined) {
      router.refresh()
    }
  }

  async function scoreSingle(id: string) {
    setUpdating(id)
    await fetch('/api/admin/leads/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setUpdating(null)
    router.refresh()
  }

  const filtered = filter === 'tutti'
    ? leads
    : leads.filter((l) => l.ai_priority === filter)

  const unscoredCount = leads.filter((l) => !l.ai_score).length
  const altaCount = leads.filter((l) => l.ai_priority === 'alta').length

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-50 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-primary">Richieste ricevute</h2>
          <span className="text-xs text-gray-400">{leads.length} totali</span>
          {altaCount > 0 && (
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full border border-red-200">
              {altaCount} ad alta priorità
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Filtro priorità */}
          <div className="flex gap-1">
            {(['tutti', 'alta', 'media', 'bassa'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-2.5 py-1 rounded-full font-medium border transition-colors ${
                  filter === f
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                {f === 'tutti' ? 'Tutti' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Pulsante scoring */}
          <button
            onClick={() => scoreAll(false)}
            disabled={scoring || unscoredCount === 0}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Analizza con AI i lead non ancora valutati"
          >
            {scoring ? (
              <span className="inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <span>✦</span>
            )}
            {scoring ? 'Analisi in corso…' : `Scorea AI (${unscoredCount})`}
          </button>

          {unscoredCount < leads.length && (
            <button
              onClick={() => scoreAll(true)}
              disabled={scoring}
              className="text-xs px-2.5 py-1.5 rounded-xl border border-gray-200 text-gray-500 hover:border-gray-300 disabled:opacity-50 transition-colors"
              title="Ricalcola il punteggio AI per tutti i lead"
            >
              Ricalcola tutti
            </button>
          )}
        </div>
      </div>

      {/* Legenda score */}
      <div className="px-6 py-2 bg-gray-50/60 border-b border-gray-50 flex gap-4 text-[11px] text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" /> 80–100 · Alta priorità
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-orange-400" /> 50–79 · Media priorità
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-gray-400" /> &lt;50 · Bassa priorità
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Score AI', 'Data', 'Cliente', 'Contatti', 'Tipo', 'Messaggio', 'Stato', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-400 text-sm">
                  Nessun lead con priorità «{filter}».
                </td>
              </tr>
            ) : filtered.map((lead) => (
              <tr
                key={lead.id}
                className={`hover:bg-gray-50/50 ${lead.ai_priority === 'alta' ? 'bg-red-50/30' : ''}`}
              >
                {/* Score */}
                <td className="px-4 py-3">
                  <div className="relative">
                    <div
                      className="cursor-help"
                      onMouseEnter={() => setTooltip(lead.id)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <ScoreBadge lead={lead} />
                    </div>
                    {/* Tooltip reasoning */}
                    {tooltip === lead.id && lead.ai_reason && (
                      <div className="absolute left-12 top-0 z-50 w-56 bg-gray-900 text-white text-xs rounded-xl p-3 shadow-xl leading-relaxed">
                        <div className="font-semibold mb-1 text-indigo-300">Analisi AI</div>
                        {lead.ai_reason}
                        {lead.ai_scored_at && (
                          <div className="mt-1.5 text-gray-500 text-[10px]">
                            {new Date(lead.ai_scored_at).toLocaleDateString('it-IT')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </td>

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
                  <div className="flex flex-col gap-1.5">
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
                    {!lead.ai_score && (
                      <button
                        onClick={() => scoreSingle(lead.id)}
                        disabled={updating === lead.id}
                        className="text-[10px] text-indigo-600 hover:text-indigo-800 font-medium disabled:opacity-40"
                      >
                        ✦ Scorea
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
