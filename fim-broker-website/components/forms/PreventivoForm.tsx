'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import {
  trackPreventivoStep1,
  trackPreventivoStep2,
  trackPreventivoSubmit,
  trackPreventivoError,
  trackPreventivoAbandonment,
} from '@/lib/analytics'

interface UtmData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  referrer?: string
}

const UTM_SESSION_KEY = 'fim_utm'

function captureUtm(): UtmData {
  if (typeof window === 'undefined') return {}
  // Se già catturati in questa sessione, riusali (l'utente potrebbe aver navigato)
  const stored = sessionStorage.getItem(UTM_SESSION_KEY)
  if (stored) {
    try { return JSON.parse(stored) } catch { /* ignora */ }
  }
  const params = new URLSearchParams(window.location.search)
  const utm: UtmData = {}
  if (params.get('utm_source')) utm.utm_source = params.get('utm_source')!.slice(0, 100)
  if (params.get('utm_medium')) utm.utm_medium = params.get('utm_medium')!.slice(0, 100)
  if (params.get('utm_campaign')) utm.utm_campaign = params.get('utm_campaign')!.slice(0, 150)
  if (params.get('utm_content')) utm.utm_content = params.get('utm_content')!.slice(0, 150)
  if (params.get('utm_term')) utm.utm_term = params.get('utm_term')!.slice(0, 150)
  if (document.referrer) utm.referrer = document.referrer.slice(0, 300)
  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(utm))
  }
  return utm
}

interface Props {
  initialProfile?: string | null
  initialSettore?: string | null
}

type Profile = 'privato' | 'professionista' | 'pmi' | 'impresa'

const PROFILES = [
  { id: 'privato' as Profile, emoji: '👤', label: 'Privato', desc: 'Auto, casa, vita, salute, viaggio' },
  { id: 'professionista' as Profile, emoji: '💼', label: 'Libero Professionista', desc: 'RC professionale, cyber, previdenza' },
  { id: 'pmi' as Profile, emoji: '🏢', label: 'PMI / Artigiano', desc: 'RC impresa, all-risk, flotta, welfare' },
  { id: 'impresa' as Profile, emoji: '🏭', label: 'Grande Impresa', desc: 'Programma assicurativo integrato' },
]

const COPERTURE: Record<Profile, string[]> = {
  privato: ['Assicurazione Auto', 'Assicurazione Casa', 'Assicurazione Vita', 'Assicurazione Salute', 'Assicurazione Viaggio', 'Più coperture / Altro'],
  professionista: ['RC Professionale', 'Polizza Cyber & Privacy', 'Tutela Legale', 'Previdenza Complementare', 'Assicurazione Vita', 'Più coperture / Altro'],
  pmi: ['RC Impresa / Prodotti', 'All Risk Aziendale', 'Flotta Aziendale', 'Cyber Risk Insurance', 'Welfare & Salute Dipendenti', 'Polizza Catastrofale 2025', 'Più coperture / Altro'],
  impresa: ['Programma Assicurativo Integrato', 'Cyber Insurance Enterprise', 'D&O (Directors & Officers)', 'All Risk Multi-Sede', 'Welfare & Benefits Aziendali', 'Altro'],
}

function resolveProfile(raw: string | null | undefined): Profile | null {
  if (!raw) return null
  const map: Record<string, Profile> = {
    privato: 'privato',
    professionista: 'professionista',
    pmi: 'pmi',
    impresa: 'impresa',
    azienda: 'pmi',
  }
  return map[raw.toLowerCase()] ?? null
}

export default function PreventivoForm({ initialProfile, initialSettore }: Props) {
  const resolved = resolveProfile(initialProfile)
  const [step, setStep] = useState<1 | 2 | 3>(resolved ? 2 : 1)
  const [profile, setProfile] = useState<Profile | null>(resolved)
  const [copertura, setCopertura] = useState(initialSettore ?? '')
  const [note, setNote] = useState('')
  const [nome, setNome] = useState('')
  const [cognome, setCognome] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [website, setWebsite] = useState('') // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [utm, setUtm] = useState<UtmData>({})
  // Ref per tracciare l'abbandono senza stale closures
  const abandonRef = useRef({ step, profile })

  useEffect(() => {
    setUtm(captureUtm())
  }, [])

  // Aggiorna il ref ogni volta che step/profile cambiano
  useEffect(() => {
    abandonRef.current = { step, profile }
  }, [step, profile])

  // Traccia abbandono quando l'utente lascia la pagina senza completare
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const { step: s, profile: p } = abandonRef.current
        if (s < 3 || (s === 3 && status !== 'success')) {
          trackPreventivoAbandonment(s, p)
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const profileLabel = profile ? PROFILES.find((p) => p.id === profile)?.label : ''

  const validateStep3 = () => {
    const e: Record<string, string> = {}
    if (!nome.trim()) e.nome = 'Campo obbligatorio'
    if (!cognome.trim()) e.cognome = 'Campo obbligatorio'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email non valida"
    if (!telefono.trim()) e.telefono = 'Campo obbligatorio'
    if (!privacy) e.privacy = 'Accetta la privacy policy per continuare'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (website) return // honeypot
    if (!validateStep3()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/preventivo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: copertura || 'Preventivo generico',
          profilo: profile,
          nome, cognome, email, telefono,
          messaggio: note,
          privacy: true,
          website,
          ...utm,
        }),
      })
      if (!res.ok) throw new Error()
      trackPreventivoSubmit(profile ?? 'unknown', copertura || 'generico', utm.utm_source)
      setStatus('success')
    } catch {
      trackPreventivoError()
      setStatus('error')
    }
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-primary mb-2">Richiesta inviata!</h3>
        <p className="text-gray-600 mb-1">Ciao <strong>{nome}</strong>, abbiamo ricevuto la tua richiesta.</p>
        <p className="text-gray-600 mb-6">Ti contatteremo entro <strong>24 ore lavorative</strong> con il preventivo personalizzato.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:+390696883381" className="btn-primary">📞 Chiama subito: 06 96883381</a>
          <Link href="/prenota-consulenza" className="btn-secondary">Prenota una slot</Link>
        </div>
        <button onClick={() => { setStatus('idle'); setStep(1); setProfile(null); setCopertura(''); setNome(''); setCognome(''); setEmail(''); setTelefono('') }}
          className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ↺ Invia un&apos;altra richiesta
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {([1, 2, 3] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${step === s ? 'bg-primary text-white' : step > s ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step > s ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : s}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${step === s ? 'text-primary' : step > s ? 'text-accent' : 'text-gray-400'}`}>
              {['Profilo', 'Copertura', 'Dati'][i]}
            </span>
            {i < 2 && <div className={`flex-1 h-0.5 mx-1 rounded ${step > s ? 'bg-accent' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 — Profilo */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-black text-primary mb-1">Chi sei?</h2>
          <p className="text-gray-500 text-sm mb-5">Seleziona il profilo che ti descrive meglio.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROFILES.map((p) => (
              <button key={p.id} onClick={() => { setProfile(p.id); setStep(2); trackPreventivoStep1(p.id) }}
                className="group text-left p-4 rounded-xl border-2 border-gray-100 hover:border-primary/40 bg-white hover:shadow-md transition-all duration-200">
                <div className="text-2xl mb-2">{p.emoji}</div>
                <div className="font-bold text-primary text-sm mb-0.5 group-hover:text-primary-light">{p.label}</div>
                <div className="text-gray-400 text-xs">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Copertura */}
      {step === 2 && profile && (
        <div className="animate-fade-in">
          <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary mb-5 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Indietro
          </button>
          <h2 className="text-xl font-black text-primary mb-1">Cosa ti serve?</h2>
          <p className="text-gray-500 text-sm mb-5">
            Profilo selezionato: <span className="font-semibold text-primary">{profileLabel}</span>
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {COPERTURE[profile].map((c) => (
              <button key={c} onClick={() => setCopertura(c)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${copertura === c ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="mb-5">
            <label className="label-field">Note aggiuntive (facoltativo)</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3}
              placeholder="Descrivi brevemente le tue esigenze o situazione attuale..."
              className="input-field resize-none text-sm" maxLength={600} />
          </div>
          <button onClick={() => { setStep(3); trackPreventivoStep2(profile, copertura || 'non selezionata') }}
            className="w-full btn-primary py-3.5">
            Continua →
          </button>
        </div>
      )}

      {/* Step 3 — Dati */}
      {step === 3 && (
        <form onSubmit={handleSubmit} noValidate className="animate-fade-in">
          {/* Honeypot */}
          <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
            <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" />
          </div>
          <button type="button" onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary mb-5 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Indietro
          </button>
          <h2 className="text-xl font-black text-primary mb-1">I tuoi dati</h2>
          <p className="text-gray-500 text-sm mb-5">
            {copertura ? <><span className="font-semibold text-primary">{copertura}</span> · </> : ''}{profileLabel}
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Nome *</label>
                <input type="text" value={nome} onChange={(e) => { setNome(e.target.value); setErrors((p) => ({ ...p, nome: '' })) }}
                  placeholder="Mario" className="input-field" maxLength={100} />
                {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
              </div>
              <div>
                <label className="label-field">Cognome *</label>
                <input type="text" value={cognome} onChange={(e) => { setCognome(e.target.value); setErrors((p) => ({ ...p, cognome: '' })) }}
                  placeholder="Rossi" className="input-field" maxLength={100} />
                {errors.cognome && <p className="text-red-500 text-xs mt-1">{errors.cognome}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Email *</label>
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                  placeholder="mario@email.it" className="input-field" maxLength={200} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="label-field">Telefono *</label>
                <input type="tel" value={telefono} onChange={(e) => { setTelefono(e.target.value); setErrors((p) => ({ ...p, telefono: '' })) }}
                  placeholder="+39 333 1234567" className="input-field" maxLength={30} />
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
              </div>
            </div>
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={privacy} onChange={(e) => { setPrivacy(e.target.checked); setErrors((p) => ({ ...p, privacy: '' })) }}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-primary accent-primary" />
                <span className="text-sm text-gray-600">
                  Ho letto e accetto la{' '}
                  <Link href="/privacy-policy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link>{' '}
                  e acconsento al trattamento dei miei dati per ricevere il preventivo. *
                </span>
              </label>
              {errors.privacy && <p className="text-red-500 text-xs mt-1">{errors.privacy}</p>}
            </div>
            {status === 'error' && (
              <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                Si è verificato un errore. Riprova o contattaci direttamente al 06 96883381.
              </div>
            )}
            <Button type="submit" loading={status === 'loading'} size="lg" className="w-full">
              {status === 'loading' ? 'Invio in corso...' : 'Richiedi Preventivo Gratuito'}
            </Button>
            <p className="text-center text-xs text-gray-400">Risposta garantita entro 24 ore lavorative · Nessun impegno</p>
          </div>
        </form>
      )}
    </div>
  )
}
