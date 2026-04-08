'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'select' | 'chat' | 'review' | 'success'

interface Message {
  role: 'user' | 'assistant'
  content: string // display text (FORM_DATA tag stripped)
  raw?: string    // original including FORM_DATA tag
}

interface FormData {
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
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CLAIM_TYPES = [
  { id: 'RC Auto / Incidente stradale', icon: '🚗', label: 'Incidente Auto' },
  { id: 'Furto / Furto con scasso', icon: '🔒', label: 'Furto' },
  { id: 'Incendio', icon: '🔥', label: 'Incendio' },
  { id: 'Danni acqua / Allagamento', icon: '💧', label: 'Danni Acqua' },
  { id: 'Infortuni / Responsabilità civile', icon: '🏥', label: 'Infortuni / RC' },
  { id: 'Altro', icon: '📋', label: 'Altro' },
]

const EMPTY_FORM: FormData = {
  nome: '', cognome: '', email: '', telefono: '',
  tipo_sinistro: '', data_evento: '', numero_polizza: '',
  compagnia: '', descrizione: '', privacy: false,
}

const FORM_DATA_REGEX = /\[FORM_DATA\]([\s\S]*?)\[\/FORM_DATA\]/

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractFormData(raw: string): Partial<FormData> | null {
  const match = raw.match(FORM_DATA_REGEX)
  if (!match) return null
  try {
    return JSON.parse(match[1].trim()) as Partial<FormData>
  } catch {
    return null
  }
}

function stripFormDataTag(text: string): string {
  return text.replace(FORM_DATA_REGEX, '').trim()
}

function renderMessageContent(content: string) {
  // Convert markdown-like formatting to simple HTML
  const lines = content.split('\n')
  return lines.map((line, i) => {
    if (line.startsWith('✅') || line.startsWith('⚠️')) {
      return <div key={i} className="flex gap-2 items-start my-0.5">{line}</div>
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-bold mt-2 mb-1">{line.slice(2, -2)}</p>
    }
    if (line === '') return <div key={i} className="h-2" />
    // Bold inline **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return (
      <p key={i} className="leading-relaxed">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    )
  })
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SinistriAIAssistant() {
  const [phase, setPhase] = useState<Phase>('select')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [extractedData, setExtractedData] = useState<Partial<FormData>>({})
  const [hasFormReady, setHasFormReady] = useState(false)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [praticaId, setPraticaId] = useState('')
  const [aiSummary, setAiSummary] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ── Streaming send message ──────────────────────────────────────────────────

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || isStreaming) return
    setInput('')

    const userMsg: Message = { role: 'user', content: userText }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)

    const assistantPlaceholder: Message = { role: 'assistant', content: '', raw: '' }
    setMessages(prev => [...prev, assistantPlaceholder])
    setIsStreaming(true)

    try {
      const res = await fetch('/api/sinistri-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.raw ?? m.content })),
        }),
      })

      if (!res.ok || !res.body) throw new Error('Errore di rete')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let rawAccumulated = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const payload = line.slice(6).trim()
          if (payload === '[DONE]') continue

          try {
            const parsed = JSON.parse(payload)
            if (parsed.delta) {
              rawAccumulated += parsed.delta
              const displayText = stripFormDataTag(rawAccumulated)
              setMessages(prev => {
                const next = [...prev]
                next[next.length - 1] = {
                  role: 'assistant',
                  content: displayText,
                  raw: rawAccumulated,
                }
                return next
              })
            }
          } catch { /* skip malformed chunk */ }
        }
      }

      // After stream: check for FORM_DATA
      const extracted = extractFormData(rawAccumulated)
      if (extracted) {
        const merged = { ...EMPTY_FORM, ...extracted }
        setExtractedData(merged)
        setForm(merged)
        setAiSummary(stripFormDataTag(rawAccumulated))
        setHasFormReady(true)
      }

    } catch {
      setMessages(prev => {
        const next = [...prev]
        next[next.length - 1] = {
          role: 'assistant',
          content: 'Mi dispiace, si è verificato un errore. Riprova o contattaci direttamente al 06 96883381.',
        }
        return next
      })
    } finally {
      setIsStreaming(false)
      inputRef.current?.focus()
    }
  }, [messages, isStreaming])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  // ── Select claim type ────────────────────────────────────────────────────────

  const selectClaimType = (claimType: string) => {
    setPhase('chat')
    // Tiny delay so the UI transitions before the stream starts
    setTimeout(() => {
      sendMessage(`Ho bisogno di aprire un sinistro di tipo: ${claimType}`)
    }, 50)
  }

  // ── Move to review form ──────────────────────────────────────────────────────

  const goToReview = () => {
    setForm(prev => ({ ...prev, ...extractedData }))
    setPhase('review')
  }

  // ── Submit pratica ──────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitStatus('loading')
    setSubmitError('')

    try {
      const res = await fetch('/api/sinistri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: '', ai_summary: aiSummary }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || 'Errore durante l\'invio.')
        setSubmitStatus('error')
        return
      }
      setPraticaId(data.id || '')
      setPhase('success')
    } catch {
      setSubmitError('Errore di rete. Riprova o contattaci direttamente.')
      setSubmitStatus('error')
    }
  }

  function setField(field: keyof FormData, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // ── Renders ─────────────────────────────────────────────────────────────────

  if (phase === 'success') {
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

  if (phase === 'review') {
    return (
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-lg">✅</div>
          <div>
            <h3 className="font-bold text-gray-900">Form pre-compilato dall&apos;AI</h3>
            <p className="text-xs text-gray-500">Verifica i dati, modifica se necessario, poi invia.</p>
          </div>
          <button
            type="button"
            onClick={() => setPhase('chat')}
            className="ml-auto text-sm text-primary underline"
          >
            ← Torna alla chat
          </button>
        </div>

        {/* Dati personali */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { field: 'nome', label: 'Nome', placeholder: 'Mario', type: 'text', required: true },
            { field: 'cognome', label: 'Cognome', placeholder: 'Rossi', type: 'text', required: true },
            { field: 'email', label: 'Email', placeholder: 'mario@esempio.it', type: 'email', required: true },
            { field: 'telefono', label: 'Telefono', placeholder: '+39 06 1234567', type: 'tel', required: true },
          ].map(({ field, label, placeholder, type, required }) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && '*'}</label>
              <input
                type={type}
                required={required}
                value={form[field as keyof FormData] as string}
                onChange={e => setField(field as keyof FormData, e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          ))}
        </div>

        {/* Dati sinistro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo sinistro *</label>
            <select
              required
              value={form.tipo_sinistro}
              onChange={e => setField('tipo_sinistro', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
            >
              <option value="">Seleziona...</option>
              {CLAIM_TYPES.map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
              <option value="RC Auto / Incidente stradale">RC Auto / Incidente stradale</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Data dell&apos;evento *</label>
            <input
              type="date"
              required
              value={form.data_evento}
              onChange={e => setField('data_evento', e.target.value)}
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
              onChange={e => setField('numero_polizza', e.target.value)}
              placeholder="es. 1234567"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Compagnia <span className="text-gray-400 font-normal">(opzionale)</span></label>
            <input
              type="text"
              value={form.compagnia}
              onChange={e => setField('compagnia', e.target.value)}
              placeholder="es. Allianz, Generali..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Descrizione dell&apos;evento *</label>
          <textarea
            required
            rows={4}
            value={form.descrizione}
            onChange={e => setField('descrizione', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            placeholder="Descrivi brevemente cosa è successo, dove e come..."
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.privacy}
            onChange={e => setField('privacy', e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-600">
            Acconsento al trattamento dei miei dati personali ai sensi del{' '}
            <a href="/privacy-policy" className="text-primary underline">Reg. UE 679/2016 (GDPR)</a>.
          </span>
        </label>

        {submitStatus === 'error' && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitStatus === 'loading'}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-4 px-8 rounded-xl transition-colors text-base"
        >
          {submitStatus === 'loading' ? 'Invio in corso...' : 'Invia pratica sinistro →'}
        </button>
      </form>
    )
  }

  // ── PHASE: select ──────────────────────────────────────────────────────────

  if (phase === 'select') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">🤖</div>
          <div>
            <h3 className="font-bold text-white text-base">Agente Sinistri AI</h3>
            <p className="text-white/70 text-xs">Ti guido passo per passo nell&apos;apertura della pratica</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 bg-green-400/20 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Online
          </span>
        </div>

        {/* Greeting */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">🤖</div>
            <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 leading-relaxed">
              Ciao! Sono l&apos;Agente Sinistri di FIM. Sono qui per guidarti nella raccolta della documentazione corretta e nell&apos;apertura della tua pratica.
              <br /><br />
              <strong>Che tipo di sinistro è accaduto?</strong>
            </div>
          </div>
        </div>

        {/* Claim type grid */}
        <div className="px-6 pb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CLAIM_TYPES.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => selectClaimType(id)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-gray-100 hover:border-primary/40 hover:bg-primary/5 transition-all text-center group"
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-primary transition-colors leading-tight">{label}</span>
            </button>
          ))}
        </div>

        {/* Manual fallback */}
        <div className="px-6 pb-5 text-center">
          <button
            onClick={() => {
              setPhase('chat')
              setTimeout(() => sendMessage('Vorrei aprire una pratica sinistro'), 50)
            }}
            className="text-xs text-gray-400 hover:text-primary underline transition-colors"
          >
            Preferisci descrivere liberamente il tuo sinistro?
          </button>
        </div>
      </div>
    )
  }

  // ── PHASE: chat ────────────────────────────────────────────────────────────

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col" style={{ minHeight: '520px' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4 flex items-center gap-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">🤖</div>
        <div>
          <h3 className="font-bold text-white text-sm">Agente Sinistri AI</h3>
          <p className="text-white/70 text-xs">{isStreaming ? 'Sta scrivendo...' : 'Online'}</p>
        </div>
        <button
          onClick={() => setPhase('select')}
          className="ml-auto text-white/60 hover:text-white text-xs underline transition-colors"
        >
          ← Ricomincia
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4" style={{ maxHeight: '420px' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">🤖</div>
            )}
            <div
              className={`
                rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[85%]
                ${msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-sm'
                  : 'bg-gray-50 text-gray-700 rounded-tl-sm'
                }
                ${isStreaming && i === messages.length - 1 && msg.role === 'assistant' && !msg.content
                  ? 'min-w-[60px]'
                  : ''
                }
              `}
            >
              {msg.role === 'assistant' ? (
                msg.content
                  ? renderMessageContent(msg.content)
                  : <span className="inline-flex gap-1 items-center py-1"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></span>
              ) : msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Form ready banner */}
      {hasFormReady && (
        <div className="mx-5 mb-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 flex-shrink-0">
          <span className="text-xl">✅</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-green-800">Form pre-compilato</p>
            <p className="text-xs text-green-700">Ho raccolto tutti i dati. Rivedi e invia la pratica.</p>
          </div>
          <button
            onClick={goToReview}
            className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors flex-shrink-0"
          >
            Rivedi →
          </button>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-100 px-4 py-4 flex gap-3 flex-shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi qui..."
          disabled={isStreaming}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={isStreaming || !input.trim()}
          className="bg-primary hover:bg-primary/90 disabled:opacity-40 text-white px-5 py-3 rounded-xl transition-colors flex-shrink-0"
          aria-label="Invia"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.903 6.557H13.5a.75.75 0 010 1.5H4.182l-1.903 6.557a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
