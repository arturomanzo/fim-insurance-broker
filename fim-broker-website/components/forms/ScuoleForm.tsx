'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { trackScuoleSubmit } from '@/lib/analytics'
import { metaLeadFields } from '@/lib/metaLead'
import { RUOLI, SCUOLE_EMAIL, TIPI_ISTITUTO } from '@/lib/scuole'

const UTM_SESSION_KEY = 'fim_utm'

function getStoredUtmSource(): string | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = sessionStorage.getItem(UTM_SESSION_KEY)
    if (raw) return JSON.parse(raw)?.utm_source
  } catch { /* ignora */ }
  return undefined
}

interface FormData {
  istituto: string
  tipoIstituto: string
  comune: string
  nome: string
  ruolo: string
  email: string
  telefono: string
  scadenza: string
  compagnia: string
  messaggio: string
  privacy: boolean
  website: string // honeypot — deve restare vuoto
}

/**
 * Richiesta di check-up gratuito da un istituto scolastico.
 * Arriva a dipartimentoscuole@, non a info@: vedi app/api/scuole/route.ts.
 */
export default function ScuoleForm() {
  const [formData, setFormData] = useState<FormData>({
    istituto: '',
    tipoIstituto: '',
    comune: '',
    nome: '',
    ruolo: '',
    email: '',
    telefono: '',
    scadenza: '',
    compagnia: '',
    messaggio: '',
    privacy: false,
    website: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [utmSource, setUtmSource] = useState<string | undefined>()

  useEffect(() => {
    setUtmSource(getStoredUtmSource())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.istituto || !formData.comune || !formData.nome || !formData.ruolo || !formData.email || !formData.privacy) return

    setStatus('loading')
    setErrorMsg('')
    // Stesso event_id per Pixel browser e Conversions API server → Meta deduplica.
    const meta = metaLeadFields()
    try {
      const res = await fetch('/api/scuole', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...meta }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErrorMsg(data?.error || '')
        throw new Error()
      }
      trackScuoleSubmit(formData.ruolo, utmSource, meta.eventId)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  if (status === 'success') {
    return (
      <div className="py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-primary mb-2 text-center">Richiesta ricevuta</h3>
        <p className="text-gray-600 text-center mb-6">
          Vi rispondiamo entro due giorni lavorativi da <strong>{SCUOLE_EMAIL}</strong>.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
          <p className="font-semibold text-primary mb-2">Per il check-up ci servono le polizze in corso.</p>
          <p>
            Potete rispondere alla mail di conferma allegando polizza e condizioni generali, la determina di affidamento,
            il capitolato o la scheda tecnica se c&apos;è, e la circolare alle famiglie. Se avete a portata di mano i sinistri
            degli ultimi tre anni, aggiungete anche quelli: fanno la differenza sulle franchigie.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot anti-bot: nascosto visivamente, mai compilato da utenti reali */}
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="scuole-website">Non compilare questo campo</label>
        <input
          id="scuole-website"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="scuole-istituto" className="label-field">Istituto *</label>
          <input
            id="scuole-istituto"
            type="text"
            name="istituto"
            value={formData.istituto}
            onChange={handleChange}
            required
            placeholder="I.C. Giovanni Pascoli"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="scuole-tipo" className="label-field">Tipo di istituto</label>
          <select
            id="scuole-tipo"
            name="tipoIstituto"
            value={formData.tipoIstituto}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Seleziona</option>
            {TIPI_ISTITUTO.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="scuole-comune" className="label-field">Comune *</label>
          <input
            id="scuole-comune"
            type="text"
            name="comune"
            value={formData.comune}
            onChange={handleChange}
            required
            placeholder="Latina"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="scuole-nome" className="label-field">Nome e Cognome *</label>
          <input
            id="scuole-nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Maria Rossi"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="scuole-ruolo" className="label-field">Ruolo *</label>
          <select
            id="scuole-ruolo"
            name="ruolo"
            value={formData.ruolo}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Seleziona</option>
            {RUOLI.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="scuole-email" className="label-field">Email istituzionale *</label>
          <input
            id="scuole-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="ltic000000@istruzione.it"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="scuole-telefono" className="label-field">Telefono della segreteria</label>
          <input
            id="scuole-telefono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="0773 000000"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="scuole-scadenza" className="label-field">Scadenza della polizza attuale</label>
          <input
            id="scuole-scadenza"
            type="text"
            name="scadenza"
            value={formData.scadenza}
            onChange={handleChange}
            placeholder="es. 31/08/2027"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="scuole-compagnia" className="label-field">Compagnia attuale</label>
          <input
            id="scuole-compagnia"
            type="text"
            name="compagnia"
            value={formData.compagnia}
            onChange={handleChange}
            placeholder="Se la conoscete"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="scuole-messaggio" className="label-field">Note</label>
        <textarea
          id="scuole-messaggio"
          name="messaggio"
          value={formData.messaggio}
          onChange={handleChange}
          rows={4}
          placeholder="Numero di alunni, plessi, laboratori, viaggi previsti: tutto quello che ci aiuta a leggere la polizza nel contesto giusto."
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
          Ho letto la{' '}
          <a href="/privacy-policy" className="text-primary hover:underline" target="_blank">
            Privacy Policy
          </a>{' '}
          e acconsento al trattamento dei dati per la risposta a questa richiesta. *
        </span>
      </label>

      {status === 'error' && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorMsg || 'Errore nell\'invio. Riprova o contattaci al +39 06 96883381.'}
        </div>
      )}

      <Button type="submit" loading={status === 'loading'} size="lg" className="w-full">
        Richiedi il check-up gratuito
      </Button>
      <p className="text-xs text-gray-500 text-center">
        Analisi gratuita e senza impegno. Non costituisce proposta contrattuale.
      </p>
    </form>
  )
}
