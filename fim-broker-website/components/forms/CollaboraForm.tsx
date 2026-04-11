'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { trackCollaboraSubmit } from '@/lib/analytics'
import { PROFILI, ESPERIENZE } from '@/lib/collabora'

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
  email: string
  telefono: string
  profilo: string
  iscrizioneRui: string
  numeroRui: string
  esperienza: string
  zona: string
  messaggio: string
  privacy: boolean
  website: string // honeypot
}

export default function CollaboraForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefono: '',
    profilo: '',
    iscrizioneRui: '',
    numeroRui: '',
    esperienza: '',
    zona: '',
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
    if (!formData.nome || !formData.email || !formData.profilo || !formData.messaggio || !formData.privacy) return

    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/collabora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Errore durante l\'invio della candidatura.')
        setStatus('error')
        return
      }
      trackCollaboraSubmit(formData.profilo, utmSource)
      setStatus('success')
    } catch {
      setErrorMsg('Errore di rete. Riprova.')
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
        <h3 className="text-xl font-bold text-primary mb-2">Candidatura ricevuta!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Grazie per il tuo interesse a collaborare con FIM. Esamineremo la tua candidatura
          e ti contatteremo al più presto per un colloquio conoscitivo.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot anti-bot */}
      <div
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <label htmlFor="collabora-website">Non compilare questo campo</label>
        <input
          id="collabora-website"
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
          <label htmlFor="collabora-nome" className="label-field">Nome e Cognome *</label>
          <input
            id="collabora-nome"
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
          <label htmlFor="collabora-email" className="label-field">Email *</label>
          <input
            id="collabora-email"
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
          <label htmlFor="collabora-telefono" className="label-field">Telefono</label>
          <input
            id="collabora-telefono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+39 333 1234567"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="collabora-zona" className="label-field">Zona di operatività</label>
          <input
            id="collabora-zona"
            type="text"
            name="zona"
            value={formData.zona}
            onChange={handleChange}
            placeholder="Es. Roma, Latina, Lazio"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="collabora-profilo" className="label-field">Profilo *</label>
        <select
          id="collabora-profilo"
          name="profilo"
          value={formData.profilo}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="" disabled>Seleziona il tuo profilo</option>
          {PROFILI.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="collabora-esperienza" className="label-field">Esperienza nel settore assicurativo</label>
        <select
          id="collabora-esperienza"
          name="esperienza"
          value={formData.esperienza}
          onChange={handleChange}
          className="input-field"
        >
          <option value="" disabled>Seleziona la tua esperienza</option>
          {ESPERIENZE.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label-field">Sei iscritto al RUI?</label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="iscrizioneRui"
              value="si"
              checked={formData.iscrizioneRui === 'si'}
              onChange={handleChange}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">Sì, sono iscritto</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="iscrizioneRui"
              value="no"
              checked={formData.iscrizioneRui === 'no'}
              onChange={handleChange}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">No, non sono iscritto</span>
          </label>
        </div>
        {formData.iscrizioneRui === 'si' && (
          <input
            type="text"
            name="numeroRui"
            value={formData.numeroRui}
            onChange={handleChange}
            placeholder="Numero di iscrizione RUI (es. B000123456)"
            className="input-field mt-3"
          />
        )}
      </div>

      <div>
        <label htmlFor="collabora-messaggio" className="label-field">
          Raccontaci di te e delle tue motivazioni *
        </label>
        <textarea
          id="collabora-messaggio"
          name="messaggio"
          value={formData.messaggio}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Descrivi brevemente il tuo percorso, i tuoi obiettivi e cosa ti attrae di una collaborazione con FIM..."
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
          e il trattamento dei dati personali ai fini della valutazione della candidatura. *
        </span>
      </label>

      {status === 'error' && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorMsg || 'Errore nell\'invio. Riprova o contattaci al +39 06 96883381.'}
        </div>
      )}

      <Button type="submit" loading={status === 'loading'} size="lg" className="w-full">
        Invia Candidatura
      </Button>
    </form>
  )
}
