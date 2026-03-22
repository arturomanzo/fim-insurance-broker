'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'

const SERVIZI = [
  'Assicurazione Auto',
  'Assicurazione Vita e Previdenza',
  'Assicurazione Casa',
  'Assicurazione Salute',
  'Polizze Aziendali',
  'Assicurazione Viaggio',
  'Altro / Non so ancora',
]

const ORARI = [
  '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
]

interface FormData {
  nome: string
  email: string
  telefono: string
  servizio: string
  data: string
  orario: string
  note: string
  privacy: boolean
  website: string // honeypot
}

export default function PrenotazioneForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefono: '',
    servizio: '',
    data: '',
    orario: '',
    note: '',
    privacy: false,
    website: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [minDate, setMinDate] = useState('')

  useEffect(() => {
    // Calcola il giorno lavorativo successivo
    const d = new Date()
    d.setDate(d.getDate() + 1)
    // Salta weekend
    if (d.getDay() === 6) d.setDate(d.getDate() + 2)
    if (d.getDay() === 0) d.setDate(d.getDate() + 1)
    setMinDate(d.toISOString().split('T')[0])
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nome || !formData.email || !formData.telefono || !formData.data || !formData.orario || !formData.privacy) return

    setStatus('loading')
    try {
      const res = await fetch('/api/prenota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-primary mb-3">Appuntamento richiesto!</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Abbiamo ricevuto la tua richiesta. Ti contatteremo entro poche ore per confermare l&apos;appuntamento.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <div
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <label htmlFor="prenota-website">Non compilare</label>
        <input
          id="prenota-website"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Nome e Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prenota-nome" className="label-field">Nome e Cognome *</label>
          <input
            id="prenota-nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Mario Rossi"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="prenota-email" className="label-field">Email *</label>
          <input
            id="prenota-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="mario@email.it"
            className="input-field"
          />
        </div>
      </div>

      {/* Telefono e Servizio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prenota-telefono" className="label-field">Telefono *</label>
          <input
            id="prenota-telefono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            placeholder="+39 333 1234567"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="prenota-servizio" className="label-field">Tipo di polizza</label>
          <select
            id="prenota-servizio"
            name="servizio"
            value={formData.servizio}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">— Seleziona —</option>
            {SERVIZI.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Data e Orario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prenota-data" className="label-field">Data preferita *</label>
          <input
            id="prenota-data"
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            min={minDate}
            required
            className="input-field"
          />
          <p className="text-xs text-gray-400 mt-1">Lun – Ven, giorni lavorativi</p>
        </div>
        <div>
          <label htmlFor="prenota-orario" className="label-field">Orario preferito *</label>
          <select
            id="prenota-orario"
            name="orario"
            value={formData.orario}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">— Seleziona —</option>
            <optgroup label="Mattina">
              {ORARI.filter((o) => o < '13:00').map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </optgroup>
            <optgroup label="Pomeriggio">
              {ORARI.filter((o) => o >= '15:00').map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Note */}
      <div>
        <label htmlFor="prenota-note" className="label-field">Note aggiuntive</label>
        <textarea
          id="prenota-note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows={3}
          placeholder="Descrivi brevemente la tua situazione o le tue esigenze..."
          className="input-field resize-none"
        />
      </div>

      {/* Privacy */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="privacy"
          checked={formData.privacy}
          onChange={handleChange}
          required
          className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <span className="text-sm text-gray-600">
          Accetto la{' '}
          <a href="/privacy-policy" className="text-primary hover:underline" target="_blank">
            Privacy Policy
          </a>{' '}
          e il trattamento dei dati personali per la gestione della prenotazione. *
        </span>
      </label>

      {status === 'error' && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          Errore nell&apos;invio. Riprova o chiamaci al +39 06 96883381.
        </div>
      )}

      <Button type="submit" loading={status === 'loading'} size="lg" className="w-full">
        Prenota la Consulenza
      </Button>
    </form>
  )
}
