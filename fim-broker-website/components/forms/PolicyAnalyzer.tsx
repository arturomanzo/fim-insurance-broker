'use client'

import { useState, useRef, useCallback } from 'react'
import Button from '@/components/ui/Button'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Coverage {
  nome: string
  massimale: string
  inclusa: boolean
}

interface Gap {
  titolo: string
  descrizione: string
  urgenza: 'alta' | 'media' | 'bassa'
}

interface CostOptimization {
  voce: string
  suggerimento: string
  risparmioStimato: string
}

interface Recommendation {
  titolo: string
  descrizione: string
  priorita: 'alta' | 'media' | 'bassa'
}

interface AnalysisResult {
  compagnia: string
  tipoPolizza: string
  numPolizza: string | null
  scadenza: string | null
  premio: string | null
  coperture: Coverage[]
  esclusioni: string[]
  lacune: Gap[]
  costiEccessivi: CostOptimization[]
  raccomandazioni: Recommendation[]
  valutazioneGlobale: {
    punteggio: number
    giudizio: string
    sintesi: string
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const MAX_PDF_SIZE = 3 * 1024 * 1024 // 3MB

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      // Strip "data:application/pdf;base64," prefix
      const base64 = dataUrl.split(',')[1]
      if (!base64) reject(new Error('Conversione base64 fallita'))
      else resolve(base64)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function scoreColor(score: number) {
  if (score >= 8) return 'text-green-600'
  if (score >= 5) return 'text-yellow-600'
  return 'text-red-600'
}

function scoreBg(score: number) {
  if (score >= 8) return 'bg-green-50 border-green-200'
  if (score >= 5) return 'bg-yellow-50 border-yellow-200'
  return 'bg-red-50 border-red-200'
}

const urgencyConfig = {
  alta: { label: 'Urgente', cls: 'bg-red-100 text-red-700' },
  media: { label: 'Consigliata', cls: 'bg-yellow-100 text-yellow-700' },
  bassa: { label: 'Opzionale', cls: 'bg-blue-100 text-blue-700' },
}

const LOADING_MESSAGES = [
  'Caricamento del documento...',
  'Identifico il tipo di polizza...',
  'Estraggo coperture e massimali...',
  'Ricerco lacune e rischi scoperti...',
  'Confronto con il mercato italiano...',
  'Preparo il report personalizzato...',
]

// ── Sub-components ────────────────────────────────────────────────────────────

function ScoreCircle({ score }: { score: number }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const progress = (score / 10) * circumference
  const colorClass = scoreColor(score)

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={score >= 8 ? '#16a34a' : score >= 5 ? '#ca8a04' : '#dc2626'}
          strokeWidth="12"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="mt-[-120px] flex flex-col items-center" style={{ marginTop: '-120px' }}>
        <span className={`text-5xl font-bold ${colorClass}`}>{score}</span>
        <span className="text-gray-500 text-sm">/10</span>
      </div>
    </div>
  )
}

function BadgePriority({ level, type }: { level: string; type: 'urgenza' | 'priorita' }) {
  const map = {
    alta: { label: type === 'urgenza' ? 'Urgente' : 'Alta priorità', cls: 'bg-red-100 text-red-700' },
    media: { label: type === 'urgenza' ? 'Importante' : 'Media priorità', cls: 'bg-yellow-100 text-yellow-700' },
    bassa: { label: type === 'urgenza' ? 'Da valutare' : 'Bassa priorità', cls: 'bg-blue-100 text-blue-700' },
  } as const
  const cfg = map[level as keyof typeof map] ?? map.bassa
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PolicyAnalyzer() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form')
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0])
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [nome, setNome] = useState('')

  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({ nome: '', email: '', privacy: false, website: '' })
  const [formError, setFormError] = useState('')

  // Drag & Drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    validateAndSetFile(dropped)
  }, [])

  function validateAndSetFile(f: File | undefined) {
    setFileError('')
    if (!f) return
    if (f.type !== 'application/pdf') {
      setFileError('Formato non supportato. Carica un file PDF.')
      return
    }
    if (f.size > MAX_PDF_SIZE) {
      setFileError('File troppo grande. Dimensione massima: 3 MB.')
      return
    }
    setFile(f)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) { setFileError('Seleziona la tua polizza in formato PDF.'); return }
    if (!formData.nome || !formData.email || !formData.privacy) {
      setFormError('Compila tutti i campi obbligatori e accetta la privacy.')
      return
    }

    setFormError('')
    setStep('loading')

    // Cycle loading messages
    let msgIdx = 0
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length
      setLoadingMsg(LOADING_MESSAGES[msgIdx])
    }, 2500)

    try {
      const pdfBase64 = await readFileAsBase64(file)

      const res = await fetch('/api/analizza-polizza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          pdfBase64,
          website: formData.website,
        }),
      })

      const data = await res.json()
      clearInterval(interval)

      if (!res.ok || !data.success) {
        setFormError(data.error ?? 'Errore durante l\'analisi. Riprova.')
        setStep('form')
        return
      }

      setResult(data.analysis)
      setNome(data.nome)
      setStep('result')
    } catch {
      clearInterval(interval)
      setFormError('Errore di connessione. Controlla la rete e riprova.')
      setStep('form')
    }
  }

  // ── Step: Loading ──────────────────────────────────────────────────────────

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center py-16 gap-6 text-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold text-primary mb-1">Analisi in corso...</p>
          <p className="text-gray-500 text-sm animate-pulse">{loadingMsg}</p>
        </div>
        <div className="w-64 bg-gray-200 rounded-full h-2">
          <div className="bg-accent h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
        </div>
        <p className="text-xs text-gray-400 max-w-xs">
          Il nostro agente AI sta leggendo ogni clausola della tua polizza. Ci vogliono circa 30 secondi.
        </p>
      </div>
    )
  }

  // ── Step: Result ───────────────────────────────────────────────────────────

  if (step === 'result' && result) {
    const score = Math.min(10, Math.max(1, Math.round(result.valutazioneGlobale?.punteggio ?? 5)))
    const lacuneAlte = result.lacune?.filter((l) => l.urgenza === 'alta') ?? []

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-6 text-white">
          <p className="text-sm opacity-75 mb-1">Report per</p>
          <h2 className="text-2xl font-bold mb-1">{nome}</h2>
          <p className="text-sm opacity-75">
            {result.compagnia} · {result.tipoPolizza}
            {result.numPolizza ? ` · N° ${result.numPolizza}` : ''}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {result.scadenza && (
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-xs opacity-75">Scadenza</p>
                <p className="font-semibold text-sm">{result.scadenza}</p>
              </div>
            )}
            {result.premio && (
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-xs opacity-75">Premio annuo</p>
                <p className="font-semibold text-sm">{result.premio}</p>
              </div>
            )}
            {result.coperture?.length > 0 && (
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-xs opacity-75">Coperture</p>
                <p className="font-semibold text-sm">{result.coperture.length} trovate</p>
              </div>
            )}
          </div>
        </div>

        {/* Score */}
        <div className={`border-2 rounded-2xl p-6 ${scoreBg(score)}`}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ScoreCircle score={score} />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{result.valutazioneGlobale?.giudizio}</h3>
              <p className="text-gray-600 leading-relaxed">{result.valutazioneGlobale?.sintesi}</p>
              {lacuneAlte.length > 0 && (
                <p className="mt-3 text-red-600 text-sm font-medium">
                  ⚠ {lacuneAlte.length} lacuna{lacuneAlte.length > 1 ? 'e' : ''} critica{lacuneAlte.length > 1 ? 'e' : ''} rilevata{lacuneAlte.length > 1 ? 'e' : ''}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Coperture incluse */}
        {result.coperture?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs">✓</span>
              Coperture incluse
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.coperture.map((c, i) => (
                <div key={i} className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{c.nome}</p>
                    {c.massimale && <p className="text-gray-500 text-xs mt-0.5">{c.massimale}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lacune */}
        {result.lacune?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs">!</span>
              Cosa ti manca
            </h3>
            <div className="space-y-3">
              {result.lacune.map((l, i) => (
                <div key={i} className="border border-red-200 bg-red-50 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{l.titolo}</h4>
                    <BadgePriority level={l.urgenza} type="urgenza" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{l.descrizione}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Costi eccessivi */}
        {result.costiEccessivi?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs">€</span>
              Dove potresti risparmiare
            </h3>
            <div className="space-y-3">
              {result.costiEccessivi.map((c, i) => (
                <div key={i} className="border border-yellow-200 bg-yellow-50 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{c.voce}</h4>
                    {c.risparmioStimato && (
                      <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {c.risparmioStimato}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{c.suggerimento}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Raccomandazioni */}
        {result.raccomandazioni?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs">→</span>
              Raccomandazioni
            </h3>
            <div className="space-y-3">
              {result.raccomandazioni.map((r, i) => (
                <div key={i} className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{r.titolo}</h4>
                    <BadgePriority level={r.priorita} type="priorita" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.descrizione}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Esclusioni */}
        {result.esclusioni?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Principali esclusioni</h3>
            <ul className="space-y-2">
              {result.esclusioni.map((e, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-gray-400 mt-0.5">•</span>
                  {e}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="gradient-primary rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Vuoi migliorare la tua copertura?</h3>
          <p className="opacity-80 mb-5 text-sm">
            I nostri consulenti possono trovare una polizza che colma le lacune identificate, spesso allo stesso prezzo o meno.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/preventivo"
              className="btn-primary text-center"
            >
              Richiedi preventivo gratuito
            </a>
            <a
              href="/prenota-consulenza"
              className="btn-outline-white text-center"
            >
              Parla con un consulente
            </a>
          </div>
          <p className="text-xs opacity-60 mt-4">Risposta entro 24 ore · Nessun impegno</p>
        </div>

        {/* Restart */}
        <div className="text-center">
          <button
            onClick={() => { setStep('form'); setResult(null); setFile(null) }}
            className="text-sm text-gray-500 hover:text-primary underline underline-offset-2"
          >
            Analizza un&apos;altra polizza
          </button>
        </div>
      </div>
    )
  }

  // ── Step: Form ─────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* File upload area */}
      <div>
        <label className="label-field">La tua polizza (PDF) *</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          className={`
            relative mt-1 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-accent bg-accent/5' : 'border-gray-300 hover:border-primary bg-gray-50 hover:bg-primary/5'}
            ${file ? 'border-green-400 bg-green-50' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => validateAndSetFile(e.target.files?.[0])}
          />
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-left">
                <p className="font-medium text-gray-800 text-sm">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setFile(null) }}
                className="ml-2 text-gray-400 hover:text-red-500"
                aria-label="Rimuovi file"
              >
                ✕
              </button>
            </div>
          ) : (
            <div>
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-700 font-medium mb-1">Trascina qui il PDF della polizza</p>
              <p className="text-gray-400 text-sm">oppure clicca per selezionare il file</p>
              <p className="text-gray-400 text-xs mt-2">PDF · max 3 MB</p>
            </div>
          )}
        </div>
        {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}
      </div>

      {/* Nome & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pa-nome" className="label-field">Nome e Cognome *</label>
          <input
            id="pa-nome"
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData((p) => ({ ...p, nome: e.target.value }))}
            required
            placeholder="Mario Rossi"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="pa-email" className="label-field">Email *</label>
          <input
            id="pa-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            required
            placeholder="mario@email.it"
            className="input-field"
          />
        </div>
      </div>

      {/* Privacy */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.privacy}
          onChange={(e) => setFormData((p) => ({ ...p, privacy: e.target.checked }))}
          required
          className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <span className="text-sm text-gray-600">
          Accetto la{' '}
          <a href="/privacy-policy" className="text-primary hover:underline" target="_blank">
            Privacy Policy
          </a>{' '}
          e il trattamento dei miei dati per l&apos;analisi della polizza. Il documento PDF non viene salvato. *
        </span>
      </label>

      {formError && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {formError}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full">
        Analizza la mia polizza gratis
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Il documento viene analizzato e poi scartato. Non viene salvato sui nostri server.
      </p>
    </form>
  )
}
