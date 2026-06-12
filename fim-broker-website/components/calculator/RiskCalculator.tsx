'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  PROFILES,
  SECTORS,
  QUESTIONS,
  PROFILE_LABELS,
  calcola,
  type Profile,
  type RiskResult,
} from '@/lib/calculatorData'

interface FormState {
  profile: Profile | null
  settore: string | null
  answers: Record<string, boolean>
  nome: string
  email: string
  telefono: string
  messaggio: string
  privacy: boolean
  website: string // honeypot
}

const PRIORITY_CONFIG = {
  urgente: { label: 'Urgente', color: 'bg-red-50 border-red-200', badge: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  alta: { label: 'Alta priorità', color: 'bg-amber-50 border-amber-200', badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  consigliata: { label: 'Consigliata', color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
}

const LEVEL_CONFIG = {
  basso: { label: 'Basso', color: 'text-green-700', bg: 'bg-green-50 border-green-200', bar: 'bg-green-500', desc: 'Il tuo profilo assicurativo è relativamente semplice. Alcune coperture di base sono comunque consigliate.' },
  medio: { label: 'Medio', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', bar: 'bg-amber-500', desc: 'Hai un profilo di rischio moderato. Alcune coperture sono prioritarie per proteggere il tuo patrimonio.' },
  alto: { label: 'Alto', color: 'text-red-700', bg: 'bg-red-50 border-red-200', bar: 'bg-red-500', desc: 'Hai un profilo di rischio elevato. Alcune coperture sono urgenti e non vanno trascurate.' },
}

export default function RiskCalculator() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [form, setForm] = useState<FormState>({
    profile: null,
    settore: null,
    answers: {},
    nome: '',
    email: '',
    telefono: '',
    messaggio: '',
    privacy: false,
    website: '',
  })
  const [result, setResult] = useState<RiskResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const questions = form.profile ? QUESTIONS[form.profile] : []
  const sectors = form.profile ? SECTORS[form.profile] : []

  const allAnswered = form.profile ? questions.every((q) => q.id in form.answers) : false

  const handleProfileSelect = (p: Profile) => {
    setForm((prev) => ({ ...prev, profile: p, settore: null, answers: {} }))
    setStep(2)
  }

  const handleSectorSelect = (s: string) => {
    setForm((prev) => ({ ...prev, settore: s }))
    setStep(3)
  }

  const handleAnswer = (id: string, value: boolean) => {
    setForm((prev) => ({ ...prev, answers: { ...prev.answers, [id]: value } }))
  }

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return // honeypot
    if (!form.nome.trim() || form.nome.trim().length < 2) { setError('Inserisci il tuo nome.'); return }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Inserisci un'email valida."); return }
    if (form.telefono.trim() && !/^[+\d\s().-]{6,30}$/.test(form.telefono.trim())) { setError('Inserisci un numero di telefono valido.'); return }
    if (!form.privacy) { setError('Accetta la privacy policy per continuare.'); return }

    setIsSubmitting(true)
    setError('')
    if (!form.profile) { setError('Profilo mancante.'); setIsSubmitting(false); return }
    const res = calcola({ profile: form.profile, settore: form.settore, answers: form.answers })
    setResult(res)

    try {
      await fetch('/api/calcolatore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          messaggio: form.messaggio.trim(),
          profile: form.profile,
          settore: form.settore,
          answers: form.answers,
          website: form.website,
        }),
      })
    } catch {
      // Non bloccare l'UX se l'API fallisce
    } finally {
      setIsSubmitting(false)
      setStep(5)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      {step < 5 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {['Profilo', 'Settore', 'Situazione', 'Contatto'].map((label, i) => {
              const s = (i + 1) as 1 | 2 | 3 | 4
              const active = step === s
              const done = step > s
              return (
                <div key={label} className="flex items-center gap-1 flex-1">
                  <div className={`flex items-center gap-1.5 ${i < 3 ? 'flex-1' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${done ? 'bg-accent text-white' : active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {done ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : s}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${active ? 'text-primary' : done ? 'text-accent' : 'text-gray-400'}`}>{label}</span>
                    {i < 3 && <div className={`flex-1 h-0.5 mx-2 rounded ${done ? 'bg-accent' : 'bg-gray-200'}`} />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 1 — Profilo */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-black text-primary mb-2">Chi sei?</h2>
          <p className="text-gray-600 mb-6">Seleziona il profilo che ti descrive meglio.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROFILES.map((p) => (
              <button
                key={p.id}
                onClick={() => handleProfileSelect(p.id)}
                className="group text-left p-5 rounded-2xl border-2 border-gray-100 hover:border-primary/40 bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="text-3xl mb-3">{p.emoji}</div>
                <div className="font-bold text-primary text-lg mb-1 group-hover:text-primary-light transition-colors">{p.label}</div>
                <div className="text-gray-500 text-sm">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Settore */}
      {step === 2 && form.profile && (
        <div className="animate-fade-in">
          <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Indietro
          </button>
          <h2 className="text-2xl font-black text-primary mb-2">
            {form.profile === 'privato' ? 'Cosa vuoi proteggere?' : 'In quale settore operi?'}
          </h2>
          <p className="text-gray-600 mb-6">Seleziona l&apos;opzione più vicina alla tua situazione.</p>
          <div className="flex flex-wrap gap-3">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => handleSectorSelect(s)}
                className="px-5 py-3 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 text-gray-700 hover:text-primary font-medium text-sm transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — Domande */}
      {step === 3 && form.profile && (
        <div className="animate-fade-in">
          <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Indietro
          </button>
          <h2 className="text-2xl font-black text-primary mb-2">La tua situazione</h2>
          <p className="text-gray-600 mb-6">3 domande rapide per personalizzare l&apos;analisi.</p>
          <div className="space-y-5">
            {questions.map((q, i) => (
              <div key={q.id} className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-gray-800 font-medium">{q.label}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswer(q.id, true)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold border-2 transition-all ${form.answers[q.id] === true ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-700 hover:border-primary/50'}`}
                  >
                    {q.yesLabel}
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, false)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold border-2 transition-all ${form.answers[q.id] === false ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-700 hover:border-primary/50'}`}
                  >
                    {q.noLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStep(4)}
            disabled={!allAnswered}
            className="w-full mt-6 btn-primary py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Vedi la mia analisi →
          </button>
        </div>
      )}

      {/* Step 4 — Contatto */}
      {step === 4 && (
        <div className="animate-fade-in">
          <button onClick={() => setStep(3)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Indietro
          </button>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-6 flex items-start gap-3">
            <div className="text-2xl flex-shrink-0">📊</div>
            <div>
              <div className="font-bold text-primary mb-1">La tua analisi è pronta!</div>
              <p className="text-gray-600 text-sm">Inserisci i tuoi dati per visualizzare il profilo di rischio personalizzato e le coperture raccomandate.</p>
            </div>
          </div>
          <form onSubmit={handleSubmitContact} className="space-y-4">
            {/* Honeypot */}
            <input type="text" name="website" value={form.website} onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))} className="hidden" tabIndex={-1} autoComplete="off" />

            <div>
              <label className="label-field">Nome *</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
                placeholder="Il tuo nome"
                className="input-field"
                maxLength={100}
              />
            </div>
            <div>
              <label className="label-field">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="tua@email.com"
                className="input-field"
                maxLength={200}
              />
            </div>
            <div>
              <label className="label-field">
                Telefono <span className="text-gray-400 font-normal">(opzionale, ma velocizza il contatto)</span>
              </label>
              <input
                type="tel"
                value={form.telefono}
                onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))}
                placeholder="+39 333 1234567"
                className="input-field"
                maxLength={30}
                autoComplete="tel"
              />
            </div>
            <div>
              <label className="label-field">
                Note o richieste specifiche <span className="text-gray-400 font-normal">(opzionale)</span>
              </label>
              <textarea
                value={form.messaggio}
                onChange={(e) => setForm((p) => ({ ...p, messaggio: e.target.value }))}
                placeholder="Es. ho già una polizza casa in scadenza, vorrei capire le opzioni per la previdenza, preferisco essere richiamato in orario serale…"
                className="input-field min-h-[100px]"
                maxLength={1000}
                rows={4}
              />
            </div>
            <div className="flex items-start gap-3">
              <input
                id="calc-privacy"
                type="checkbox"
                checked={form.privacy}
                onChange={(e) => setForm((p) => ({ ...p, privacy: e.target.checked }))}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary accent-primary cursor-pointer"
              />
              <label htmlFor="calc-privacy" className="text-sm text-gray-600 cursor-pointer">
                Acconsento al trattamento dei dati personali secondo la{' '}
                <Link href="/privacy-policy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link>. Riceverò via email il riepilogo dell&apos;analisi.
              </label>
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-3">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Elaborazione…
                </span>
              ) : (
                'Visualizza la mia analisi del rischio →'
              )}
            </button>
            <p className="text-xs text-gray-400 text-center">Nessun impegno. La consulenza iniziale è sempre gratuita.</p>
          </form>
        </div>
      )}

      {/* Step 5 — Risultati */}
      {step === 5 && result && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Analisi completata per {form.nome}
            </div>
            <h2 className="text-2xl font-black text-primary mb-2">Il tuo profilo di rischio</h2>
            <p className="text-gray-600 text-sm">
              {form.profile ? PROFILE_LABELS[form.profile] : ''} · {form.settore}
            </p>
          </div>

          {/* Risk Score */}
          <div className={`rounded-2xl border-2 p-6 mb-6 ${LEVEL_CONFIG[result.livello].bg}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">Livello di esposizione al rischio</div>
                <div className={`text-3xl font-black ${LEVEL_CONFIG[result.livello].color}`}>
                  {LEVEL_CONFIG[result.livello].label}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-black ${LEVEL_CONFIG[result.livello].color}`}>{result.punteggio}</div>
                <div className="text-xs text-gray-500">/100</div>
              </div>
            </div>
            {/* Score bar */}
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-amber-400 to-red-500 rounded-full" />
              <div
                className="absolute top-0 bottom-0 right-0 bg-gray-200 rounded-r-full transition-all duration-700"
                style={{ width: `${100 - result.punteggio}%` }}
              />
            </div>
            <p className="text-sm text-gray-700">{LEVEL_CONFIG[result.livello].desc}</p>
          </div>

          {/* Coperture raccomandate */}
          <h3 className="font-bold text-primary text-lg mb-4">Coperture raccomandate</h3>
          <div className="space-y-3 mb-6">
            {result.coperture.map((c) => {
              const cfg = PRIORITY_CONFIG[c.priorita]
              return (
                <div key={c.nome} className={`rounded-xl border p-4 ${cfg.color}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${cfg.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-gray-800 text-sm">{c.nome}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label}</span>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed">{c.motivo}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Range costo */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6">
            <div className="text-xs text-gray-500 mb-1">Investimento annuo stimato (tutte le coperture)</div>
            <div className="text-2xl font-black text-primary">
              €{result.prezzoMin.toLocaleString('it-IT')} – €{result.prezzoMax.toLocaleString('it-IT')}
              <span className="text-sm font-normal text-gray-500 ml-1">/anno</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Stima indicativa basata sul profilo. Il preventivo reale può variare in base a compagnia e condizioni specifiche.</p>
          </div>

          {/* CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/preventivo?profilo=${form.profile}&settore=${encodeURIComponent(form.settore ?? '')}`}
              className="btn-primary py-4 text-center"
            >
              Richiedi preventivo gratuito
            </Link>
            <Link href="/prenota-consulenza" className="btn-secondary py-4 text-center">
              Prenota consulenza
            </Link>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Un consulente FIM analizzerà il tuo profilo e ti presenterà le migliori offerte di mercato. Nessun impegno.
          </p>

          {/* Restart */}
          <div className="text-center mt-6">
            <button
              onClick={() => { setStep(1); setForm({ profile: null, settore: null, answers: {}, nome: '', email: '', telefono: '', messaggio: '', privacy: false, website: '' }); setResult(null) }}
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              ↺ Ricomincia l&apos;analisi
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
