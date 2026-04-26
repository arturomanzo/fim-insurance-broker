'use client'

import { useState, useEffect, useRef } from 'react'
import Button from '@/components/ui/Button'
import { trackSecondOpinionSubmit } from '@/lib/analytics'

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
  nome: string
  azienda: string
  email: string
  telefono: string
  settore: string
  compagnieAttuali: string
  note: string
  oscuraPremio: boolean
  privacy: boolean
  website: string // honeypot
}

const SETTORI = [
  { value: '', label: 'Seleziona settore...' },
  { value: 'artigianato', label: 'Artigianato / Manifattura' },
  { value: 'commercio', label: 'Commercio / Retail' },
  { value: 'edilizia', label: 'Edilizia / Costruzioni' },
  { value: 'professioni', label: 'Professioni / Studi' },
  { value: 'servizi', label: 'Servizi / Consulenza' },
  { value: 'ristorazione', label: 'Ristorazione / Turismo' },
  { value: 'altro', label: 'Altro' },
]

export default function SecondOpinionForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    azienda: '',
    email: '',
    telefono: '',
    settore: '',
    compagnieAttuali: '',
    note: '',
    oscuraPremio: false,
    privacy: false,
    website: '',
  })
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [utmSource, setUtmSource] = useState<string | undefined>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setUtmSource(getStoredUtmSource())
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? [])
    const valid = selected.filter((f) => f.type === 'application/pdf' && f.size <= 10 * 1024 * 1024)
    setFiles((prev) => {
      const combined = [...prev, ...valid]
      return combined.slice(0, 5) // max 5 file
    })
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nome || !formData.email || !formData.telefono || !formData.privacy) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const payload = new FormData()
      payload.append('nome', formData.nome)
      payload.append('azienda', formData.azienda)
      payload.append('email', formData.email)
      payload.append('telefono', formData.telefono)
      payload.append('settore', formData.settore)
      payload.append('compagnieAttuali', formData.compagnieAttuali)
      payload.append('note', formData.note)
      payload.append('oscuraPremio', String(formData.oscuraPremio))
      payload.append('privacy', String(formData.privacy))
      payload.append('website', formData.website)
      files.forEach((f) => payload.append('polizze', f))

      const res = await fetch('/api/second-opinion', { method: 'POST', body: payload })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error ?? '')

      trackSecondOpinionSubmit(formData.settore, utmSource)
      setStatus('success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      setErrorMsg(msg || "Errore nell'invio. Riprova o contattaci al +39 06 96883381.")
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">Richiesta inviata!</h3>
        <p className="text-gray-600 mb-1">
          Un consulente FIM analizzerà le tue polizze e ti contatterà entro <strong>48 ore lavorative</strong>.
        </p>
        <p className="text-gray-400 text-sm">Controlla anche la casella spam.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
      {/* Honeypot */}
      <div
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <label htmlFor="so-website">Non compilare questo campo</label>
        <input
          id="so-website"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="so-nome" className="label-field">Nome e Cognome *</label>
          <input
            id="so-nome"
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
          <label htmlFor="so-azienda" className="label-field">Azienda / Ragione sociale</label>
          <input
            id="so-azienda"
            type="text"
            name="azienda"
            value={formData.azienda}
            onChange={handleChange}
            placeholder="Rossi Srl"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="so-email" className="label-field">Email *</label>
          <input
            id="so-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="mario@azienda.it"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="so-telefono" className="label-field">Telefono *</label>
          <input
            id="so-telefono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            placeholder="+39 333 1234567"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="so-settore" className="label-field">Settore</label>
          <select
            id="so-settore"
            name="settore"
            value={formData.settore}
            onChange={handleChange}
            className="input-field"
          >
            {SETTORI.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="so-compagnie" className="label-field">Compagnie attuali</label>
          <input
            id="so-compagnie"
            type="text"
            name="compagnieAttuali"
            value={formData.compagnieAttuali}
            onChange={handleChange}
            placeholder="Generali, AXA, ..."
            className="input-field"
          />
        </div>
      </div>

      {/* Upload polizze */}
      <div>
        <label className="label-field">Polizze da analizzare (PDF, max 5 file · 10 MB ciascuno)</label>
        <div
          className="mt-1 border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-primary/40 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Carica PDF polizze"
        >
          <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-primary">Clicca per caricare</span> i PDF delle tue polizze
          </p>
          <p className="text-xs text-gray-400 mt-1">Puoi oscurare i premi prima di inviare — non ci interessa il costo, ma le coperture</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
                <span className="text-gray-700 truncate max-w-xs">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-gray-400 hover:text-red-500 ml-2 transition-colors"
                  aria-label={`Rimuovi ${f.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <label className="flex items-center gap-2 mt-3 cursor-pointer">
          <input
            type="checkbox"
            name="oscuraPremio"
            checked={formData.oscuraPremio}
            onChange={handleChange}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-sm text-gray-500">Ho oscurato i premi nei documenti prima dell'invio</span>
        </label>
      </div>

      <div>
        <label htmlFor="so-note" className="label-field">Note aggiuntive</label>
        <textarea
          id="so-note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows={3}
          placeholder="Specificità del tuo settore, sinistri recenti, coperture che ritieni critiche..."
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
          <a href="/privacy-policy" className="text-primary hover:underline" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>{' '}
          e il trattamento dei dati personali, inclusi i documenti allegati. *
        </span>
      </label>

      {status === 'error' && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorMsg}
        </div>
      )}

      <Button type="submit" loading={status === 'loading'} size="lg" className="w-full">
        Invia richiesta di Second Opinion
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Risposta entro 48 ore lavorative · Servizio gratuito e senza impegno
      </p>
    </form>
  )
}
