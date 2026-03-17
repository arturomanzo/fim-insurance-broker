'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface FormData {
  tipo: string
  nome: string
  cognome: string
  email: string
  telefono: string
  messaggio: string
  privacy: boolean
}

type FormErrors = Partial<Record<keyof FormData, string>>

const TIPI_POLIZZA = [
  'Assicurazione Auto',
  'Assicurazione Vita',
  'Assicurazione Casa',
  'Assicurazione Salute',
  'Polizze Aziendali',
  'Assicurazione Viaggio',
  'Altro',
]

export default function PreventivoForm() {
  const [formData, setFormData] = useState<FormData>({
    tipo: '',
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    messaggio: '',
    privacy: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.tipo) newErrors.tipo = 'Seleziona il tipo di polizza'
    if (!formData.nome.trim()) newErrors.nome = 'Il nome è obbligatorio'
    if (!formData.cognome.trim()) newErrors.cognome = 'Il cognome è obbligatorio'
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida"
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'Il telefono è obbligatorio'
    if (!formData.privacy) newErrors.privacy = 'Devi accettare la privacy policy'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/preventivo', {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">Richiesta inviata!</h3>
        <p className="text-gray-600 mb-6">
          Ti contatteremo entro 24 ore lavorative per il tuo preventivo personalizzato.
        </p>
        <Button onClick={() => setStatus('idle')} variant="outline">
          Invia un&apos;altra richiesta
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Tipo polizza */}
      <div>
        <label className="label-field">Tipo di assicurazione *</label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Seleziona il tipo...</option>
          {TIPI_POLIZZA.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
      </div>

      {/* Nome e cognome */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-field">Nome *</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Mario"
            className="input-field"
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>
        <div>
          <label className="label-field">Cognome *</label>
          <input
            type="text"
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            placeholder="Rossi"
            className="input-field"
          />
          {errors.cognome && <p className="text-red-500 text-sm mt-1">{errors.cognome}</p>}
        </div>
      </div>

      {/* Email e telefono */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-field">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mario.rossi@email.it"
            className="input-field"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="label-field">Telefono *</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+39 333 1234567"
            className="input-field"
          />
          {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
        </div>
      </div>

      {/* Messaggio */}
      <div>
        <label className="label-field">Informazioni aggiuntive</label>
        <textarea
          name="messaggio"
          value={formData.messaggio}
          onChange={handleChange}
          rows={4}
          placeholder="Descrivi brevemente le tue esigenze assicurative..."
          className="input-field resize-none"
        />
      </div>

      {/* Privacy */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="privacy"
            checked={formData.privacy}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-sm text-gray-600">
            Ho letto e accetto la{' '}
            <a href="/privacy-policy" className="text-primary hover:underline" target="_blank">
              Privacy Policy
            </a>{' '}
            e acconsento al trattamento dei miei dati personali per ricevere il preventivo. *
          </span>
        </label>
        {errors.privacy && <p className="text-red-500 text-sm mt-1">{errors.privacy}</p>}
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          Si è verificato un errore. Riprova o contattaci direttamente.
        </div>
      )}

      <Button type="submit" loading={status === 'loading'} size="lg" className="w-full">
        {status === 'loading' ? 'Invio in corso...' : 'Richiedi Preventivo Gratuito'}
      </Button>
    </form>
  )
}
