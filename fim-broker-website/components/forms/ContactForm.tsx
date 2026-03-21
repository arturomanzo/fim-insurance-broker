'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface FormData {
  nome: string
  email: string
  telefono: string
  oggetto: string
  messaggio: string
  privacy: boolean
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefono: '',
    oggetto: '',
    messaggio: '',
    privacy: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nome || !formData.email || !formData.messaggio || !formData.privacy) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">Messaggio inviato!</h3>
        <p className="text-gray-600">Ti risponderemo il prima possibile.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-nome" className="label-field">Nome e Cognome *</label>
          <input
            id="contact-nome"
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
          <label htmlFor="contact-email" className="label-field">Email *</label>
          <input
            id="contact-email"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-telefono" className="label-field">Telefono</label>
          <input
            id="contact-telefono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+39 333 1234567"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="contact-oggetto" className="label-field">Oggetto</label>
          <input
            id="contact-oggetto"
            type="text"
            name="oggetto"
            value={formData.oggetto}
            onChange={handleChange}
            placeholder="Richiesta informazioni"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-messaggio" className="label-field">Messaggio *</label>
        <textarea
          id="contact-messaggio"
          name="messaggio"
          value={formData.messaggio}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Scrivi il tuo messaggio..."
          className="input-field resize-none"
        />
      </div>

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
          e il trattamento dei dati personali. *
        </span>
      </label>

      {status === 'error' && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          Errore nell&apos;invio. Riprova o contattaci al +39 06 96883381.
        </div>
      )}

      <Button type="submit" loading={status === 'loading'} size="lg" className="w-full">
        Invia Messaggio
      </Button>
    </form>
  )
}
