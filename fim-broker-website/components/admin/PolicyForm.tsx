'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Policy } from '@/lib/policyData'

const TIPI_POLIZZA = [
  'Assicurazione Auto',
  'Assicurazione Casa',
  'Assicurazione Vita',
  'RC Professionale',
  'RC Impresa',
  'All Risk Aziendale',
  'Infortuni',
  'Salute Integrativa',
  'Tutela Legale',
  'Polizza Catastrofale',
  'Cyber Risk',
  'Flotta Aziendale',
  'Merci in Transito',
  'Globale Fabbricato',
  'RC Amministratore',
  'Interruzione di Esercizio',
  'Long Term Care',
  'D&O (Directors & Officers)',
  'Altro',
]

interface Props {
  mode: 'create' | 'edit'
  initial?: Partial<Policy>
  policyId?: string
  prefillEmail?: string
  prefillName?: string
}

interface DocRow { nome: string; url: string; tipo: string }

export default function PolicyForm({ mode, initial, policyId, prefillEmail, prefillName }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    clientEmail: initial?.clientEmail ?? prefillEmail ?? '',
    clientName: initial?.clientName ?? prefillName ?? '',
    tipo: initial?.tipo ?? '',
    compagnia: initial?.compagnia ?? '',
    numeroPolizza: initial?.numeroPolizza ?? '',
    dataInizio: initial?.dataInizio ?? '',
    dataScadenza: initial?.dataScadenza ?? '',
    premioAnnuo: String(initial?.premioAnnuo ?? ''),
    massimale: initial?.massimale ?? '',
    note: initial?.note ?? '',
  })

  const [documenti, setDocumenti] = useState<DocRow[]>(
    initial?.documenti?.map((d) => ({ nome: d.nome, url: d.url, tipo: d.tipo })) ?? []
  )

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  function addDoc() {
    setDocumenti((prev) => [...prev, { nome: '', url: '', tipo: 'polizza' }])
  }

  function updateDoc(i: number, field: keyof DocRow, value: string) {
    setDocumenti((prev) => prev.map((d, idx) => idx === i ? { ...d, [field]: value } : d))
  }

  function removeDoc(i: number) {
    setDocumenti((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const body = {
        ...form,
        premioAnnuo: Number(form.premioAnnuo),
        massimale: form.massimale || undefined,
        note: form.note || undefined,
        documenti: documenti.filter((d) => d.nome.trim()),
      }

      const url = mode === 'create' ? '/api/admin/polizze' : `/api/admin/polizze/${policyId}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        const email = form.clientEmail.trim().toLowerCase()
        router.push(`/admin/clienti/${encodeURIComponent(email)}`)
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Errore durante il salvataggio.')
        setLoading(false)
      }
    } catch {
      setError('Errore di rete. Riprova.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Cliente */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wide">Dati cliente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-field">Email cliente *</label>
            <input type="email" value={form.clientEmail} onChange={set('clientEmail')} required className="input-field" placeholder="mario@esempio.it" />
          </div>
          <div>
            <label className="label-field">Nome e cognome / Ragione sociale *</label>
            <input type="text" value={form.clientName} onChange={set('clientName')} required className="input-field" placeholder="Mario Rossi" />
          </div>
        </div>
      </div>

      {/* Polizza */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-bold text-primary mb-4 text-sm uppercase tracking-wide">Dati polizza</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-field">Tipo di polizza *</label>
            <select value={form.tipo} onChange={set('tipo')} required className="input-field">
              <option value="">Seleziona tipo…</option>
              {TIPI_POLIZZA.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label-field">Compagnia assicurativa *</label>
            <input type="text" value={form.compagnia} onChange={set('compagnia')} required className="input-field" placeholder="Generali, AXA, Allianz…" />
          </div>
          <div>
            <label className="label-field">Numero polizza *</label>
            <input type="text" value={form.numeroPolizza} onChange={set('numeroPolizza')} required className="input-field" placeholder="AUT-2024-001234" />
          </div>
          <div>
            <label className="label-field">Premio annuo (€) *</label>
            <input type="number" value={form.premioAnnuo} onChange={set('premioAnnuo')} required min={0} step={0.01} className="input-field" placeholder="850" />
          </div>
          <div>
            <label className="label-field">Data decorrenza *</label>
            <input type="date" value={form.dataInizio} onChange={set('dataInizio')} required className="input-field" />
          </div>
          <div>
            <label className="label-field">Data scadenza *</label>
            <input type="date" value={form.dataScadenza} onChange={set('dataScadenza')} required className="input-field" />
          </div>
          <div className="md:col-span-2">
            <label className="label-field">Massimale / Garanzie</label>
            <input type="text" value={form.massimale} onChange={set('massimale')} className="input-field" placeholder="RCA illimitato + Kasko €35.000" />
          </div>
          <div className="md:col-span-2">
            <label className="label-field">Note</label>
            <textarea value={form.note} onChange={set('note')} rows={2} className="input-field resize-none" placeholder="Targa, indirizzo, note operative…" />
          </div>
        </div>
      </div>

      {/* Documenti */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-primary text-sm uppercase tracking-wide">Documenti</h3>
          <button type="button" onClick={addDoc} className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Aggiungi documento
          </button>
        </div>
        {documenti.length === 0 ? (
          <p className="text-sm text-gray-400 italic">Nessun documento. Clicca &quot;Aggiungi documento&quot; per inserirne uno.</p>
        ) : (
          <div className="space-y-3">
            {documenti.map((doc, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-start">
                <div className="col-span-4">
                  <input
                    type="text"
                    value={doc.nome}
                    onChange={(e) => updateDoc(i, 'nome', e.target.value)}
                    placeholder="Nome documento"
                    className="input-field text-sm"
                  />
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    value={doc.url}
                    onChange={(e) => updateDoc(i, 'url', e.target.value)}
                    placeholder="URL (opzionale)"
                    className="input-field text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    value={doc.tipo}
                    onChange={(e) => updateDoc(i, 'tipo', e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="polizza">Polizza</option>
                    <option value="appendice">Appendice</option>
                    <option value="quietanza">Quietanza</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
                <div className="col-span-1 flex items-center justify-center pt-2">
                  <button type="button" onClick={() => removeDoc(i)} className="text-red-400 hover:text-red-600 transition-colors" aria-label="Rimuovi documento">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvataggio…' : mode === 'create' ? 'Crea polizza' : 'Salva modifiche'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="btn-secondary px-6 py-3"
        >
          Annulla
        </button>
      </div>

    </form>
  )
}
