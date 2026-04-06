'use client'

import { useState } from 'react'

const TIPI_SINISTRO = [
  'RC Auto / Incidente stradale',
  'Furto / Furto con scasso',
  'Incendio',
  'Danni acqua / Allagamento',
  'Infortuni / Responsabilità civile',
  'Altro',
]

interface FormState {
  nome: string
  cognome: string
  email: string
  telefono: string
  tipo_sinistro: string
  data_evento: string
  numero_polizza: string
  compagnia: string
  descrizione: string
  privacy: boolean
  website: string // honeypot
}

const INITIAL: FormState = {
  nome: '', cognome: '', email: '', telefono: '',
  tipo_sinistro: '', data_evento: '', numero_polizza: '',
  compagnia: '', descrizione: '', privacy: false, website: '',
}

export default function SinistriForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [praticaId, setPraticaId] = useState('')

  function set(field: keyof FormState, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/sinistri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Errore durante l\'invio.')
        setStatus('error')
        return
      }
      setPraticaId(data.id || '')
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setErrorMsg('Errore di rete. Riprova o contattaci direttamente.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Pratica aperta con successo</h3>
        {praticaId && (
          <p className="text-sm text-green-700 mb-2">
            Riferimento: <strong>{praticaId}</strong>
          </p>
        )}
        <p className="text-green-700 mb-6">
          Ti abbiamo inviato una conferma via email. Il nostro team ti contatterà entro 24 ore lavorative.
        </p>
        <a
          href="tel:+390696883381"
          className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          📞 Vuoi parlare subito? 06 96883381
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={e => set('website', e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Dati personali */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nome *</label>
          <input
            type="text"
            required
            value={form.nome}
            onChange={e => set('nome', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="Mario"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Cognome *</label>
          <input
            type="text"
            required
            value={form.cognome}
            onChange={e => set('cognome', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="Rossi"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => set('email', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="mario@esempio.it"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Telefono *</label>
          <input
            type="tel"
            required
            value={form.telefono}
            onChange={e => set('telefono', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="+39 06 1234567"
          />
        </div>
      </div>

      {/* Dati sinistro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo sinistro *</label>
          <select
            required
            value={form.tipo_sinistro}
            onChange={e => set('tipo_sinistro', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
          >
            <option value="">Seleziona...</option>
            {TIPI_SINISTRO.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Data dell&apos;evento *</label>
          <input
            type="date"
            required
            value={form.data_evento}
            onChange={e => set('data_evento', e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">N° polizza <span className="text-gray-400 font-normal">(opzionale)</span></label>
          <input
            type="text"
            value={form.numero_polizza}
            onChange={e => set('numero_polizza', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="es. 1234567"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Compagnia assicuratrice <span className="text-gray-400 font-normal">(opzionale)</span></label>
          <input
            type="text"
            value={form.compagnia}
            onChange={e => set('compagnia', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="es. Allianz, Generali..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Descrizione dell&apos;evento *</label>
        <textarea
          required
          rows={4}
          value={form.descrizione}
          onChange={e => set('descrizione', e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          placeholder="Descrivi brevemente cosa è successo, dove e come..."
        />
      </div>

      {/* Privacy */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={form.privacy}
          onChange={e => set('privacy', e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <span className="text-sm text-gray-600">
          Acconsento al trattamento dei miei dati personali ai sensi del{' '}
          <a href="/privacy-policy" className="text-primary underline">Reg. UE 679/2016 (GDPR)</a>.
        </span>
      </label>

      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-4 px-8 rounded-xl transition-colors text-base"
      >
        {status === 'loading' ? 'Invio in corso...' : 'Apri pratica sinistro →'}
      </button>
    </form>
  )
}
