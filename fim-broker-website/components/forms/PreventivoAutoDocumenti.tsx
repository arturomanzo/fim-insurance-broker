'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import Button from '@/components/ui/Button'
import { trackPreventivoAutoDocsSubmit } from '@/lib/analytics'
import {
  DOC_BUCKET,
  DOC_SLOTS,
  DOC_ACCEPT,
  MAX_DOC_SIZE,
  PREFILL_SESSION_KEY,
  fileTypeAllowed,
  type DocSlot,
  type PreventivoAutoPrefill,
} from '@/lib/preventivoDocumenti'

type Status = 'idle' | 'loading' | 'success' | 'error'

// Client browser per il solo upload diretto verso i signed upload URL.
// L'anon key è pubblica per definizione; il bucket resta privato e l'accesso
// in lettura avviene solo lato server con signed download URL.
let _browserClient: SupabaseClient | null = null
function getBrowserSupabase(): SupabaseClient | null {
  if (_browserClient) return _browserClient
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) return null
  _browserClient = createClient(url, anon, { auth: { persistSession: false } })
  return _browserClient
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ── Slot di upload (drag & drop + click) ──────────────────────────────────────

function SlotUploader({
  slot,
  file,
  error,
  onSelect,
  onClear,
}: {
  slot: DocSlot
  file: File | null
  error: string
  onSelect: (slot: string, file: File | undefined) => void
  onClear: (slot: string) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      onSelect(slot.key, e.dataTransfer.files[0])
    },
    [onSelect, slot.key],
  )

  return (
    <div>
      <label className="block text-sm font-semibold text-primary mb-1">
        {slot.label}
        {slot.required ? <span className="text-red-500"> *</span> : <span className="text-gray-400 font-normal"> (opzionale)</span>}
      </label>

      {file ? (
        <div className="flex items-center gap-3 p-3 border-2 border-accent/40 bg-accent/5 rounded-xl">
          <span className="text-xl flex-shrink-0" aria-hidden="true">📄</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-primary truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => onClear(slot.key)}
            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
            aria-label={`Rimuovi ${slot.label}`}
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          className={`w-full flex items-center gap-3 p-3 border-2 border-dashed rounded-xl text-left transition-colors ${
            isDragging ? 'border-accent bg-accent/5' : error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-accent hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-sm text-gray-500">
            <span className="font-medium text-primary">{slot.hint}</span> — trascina o scegli
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={DOC_ACCEPT}
        className="sr-only"
        onChange={(e) => onSelect(slot.key, e.target.files?.[0])}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}

// ── Componente principale ─────────────────────────────────────────────────────

export default function PreventivoAutoDocumenti() {
  const [files, setFiles] = useState<Record<string, File | null>>({})
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    nome: '', email: '', telefono: '', targa: '', note: '', privacy: false, website: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [utmSource, setUtmSource] = useState<string | undefined>()

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('fim_utm')
      if (raw) setUtmSource(JSON.parse(raw)?.utm_source)
    } catch { /* no-op */ }

    // Pre-riempimento dai dati del wizard /preventivo (copertura auto).
    // Consumato una sola volta: lo rimuoviamo per non riproporlo a visite future.
    try {
      const raw = sessionStorage.getItem(PREFILL_SESSION_KEY)
      if (raw) {
        const p: PreventivoAutoPrefill = JSON.parse(raw)
        setFormData((prev) => ({
          ...prev,
          nome: p.nome ?? prev.nome,
          email: p.email ?? prev.email,
          telefono: p.telefono ?? prev.telefono,
          targa: p.targa ?? prev.targa,
        }))
        sessionStorage.removeItem(PREFILL_SESSION_KEY)
      }
    } catch { /* no-op */ }
  }, [])

  function handleSelect(slot: string, f: File | undefined) {
    setFileErrors((prev) => ({ ...prev, [slot]: '' }))
    if (!f) return
    if (!fileTypeAllowed(f.type)) {
      setFileErrors((prev) => ({ ...prev, [slot]: 'Formato non valido. Usa foto (JPG/PNG) o PDF.' }))
      return
    }
    if (f.size > MAX_DOC_SIZE) {
      setFileErrors((prev) => ({ ...prev, [slot]: 'File troppo grande (max 10 MB).' }))
      return
    }
    setFiles((prev) => ({ ...prev, [slot]: f }))
  }

  function handleClear(slot: string) {
    setFiles((prev) => ({ ...prev, [slot]: null }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    const selected = DOC_SLOTS
      .map((s) => ({ slot: s.key, file: files[s.key] }))
      .filter((x): x is { slot: string; file: File } => !!x.file)

    const missingRequired = DOC_SLOTS.filter((s) => s.required && !files[s.key])
    if (missingRequired.length > 0) {
      setErrorMsg(`Mancano alcuni documenti obbligatori: ${missingRequired.map((s) => s.label).join(', ')}.`)
      return
    }
    if (!formData.nome || !formData.email || !formData.telefono) {
      setErrorMsg('Compila nome, email e telefono.')
      return
    }
    if (!formData.privacy) {
      setErrorMsg('Devi acconsentire al trattamento dei documenti per procedere.')
      return
    }

    const supabase = getBrowserSupabase()
    if (!supabase) {
      setErrorMsg('Caricamento non disponibile al momento. Scrivici a rca@fimbroker.it o chiama il +39 06 96883381.')
      return
    }

    setStatus('loading')

    try {
      // 1) Ottieni i signed upload URL
      const initRes = await fetch('/api/preventivo-auto/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: selected.map((s) => ({ slot: s.slot, name: s.file.name, type: s.file.type, size: s.file.size })),
        }),
      })
      const initData = await initRes.json()
      if (!initRes.ok || !initData.success) {
        throw new Error(initData.error ?? 'Errore nella preparazione del caricamento.')
      }

      // 2) Carica ogni file direttamente su Supabase Storage
      const uploads: { slot: string; token: string; path: string }[] = initData.uploads
      const documenti: { slot: string; path: string }[] = []
      for (const up of uploads) {
        const sel = selected.find((s) => s.slot === up.slot)
        if (!sel) continue
        const { error } = await supabase.storage.from(DOC_BUCKET).uploadToSignedUrl(up.path, up.token, sel.file)
        if (error) throw new Error(`Caricamento di "${up.slot}" non riuscito.`)
        documenti.push({ slot: up.slot, path: up.path })
      }

      // 3) Notifica il team + conferma al cliente
      const completeRes = await fetch('/api/preventivo-auto/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: initData.id,
          nome: formData.nome,
          email: formData.email,
          telefono: formData.telefono,
          targa: formData.targa,
          note: formData.note,
          privacy: formData.privacy,
          website: formData.website,
          utmSource,
          documenti,
        }),
      })
      const completeData = await completeRes.json()
      if (!completeRes.ok || !completeData.success) {
        throw new Error(completeData.error ?? 'Errore nell\'invio dei documenti.')
      }

      trackPreventivoAutoDocsSubmit(documenti.length, utmSource)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Errore nell\'invio. Riprova o contattaci al +39 06 96883381.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-primary mb-2">Documenti inviati!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Abbiamo ricevuto i tuoi documenti in modo sicuro. Ti ricontattiamo entro 24 ore lavorative
          con il preventivo auto più conveniente. Trovi la conferma nella tua email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-gray-600 text-sm">
        Carica i documenti necessari e ti prepariamo il preventivo auto su misura.
        I file viaggiano cifrati e sono conservati in modo sicuro, usati solo per la preventivazione.
      </p>

      {/* Slot documenti */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DOC_SLOTS.map((slot) => (
          <SlotUploader
            key={slot.key}
            slot={slot}
            file={files[slot.key] ?? null}
            error={fileErrors[slot.key] ?? ''}
            onSelect={handleSelect}
            onClear={handleClear}
          />
        ))}
      </div>

      {/* Dati di contatto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pad-nome" className="label-field">Nome e cognome *</label>
          <input id="pad-nome" type="text" required value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className="input-field" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="pad-telefono" className="label-field">Telefono *</label>
          <input id="pad-telefono" type="tel" required value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="input-field" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="pad-email" className="label-field">Email *</label>
          <input id="pad-email" type="email" required value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="pad-targa" className="label-field">Targa veicolo</label>
          <input id="pad-targa" type="text" value={formData.targa}
            onChange={(e) => setFormData({ ...formData, targa: e.target.value })} className="input-field" placeholder="AA000BB" />
        </div>
      </div>

      <div>
        <label htmlFor="pad-note" className="label-field">Note (facoltativo)</label>
        <textarea id="pad-note" rows={2} value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })} className="input-field"
          placeholder="Es. scadenza polizza attuale, esigenze particolari…" />
      </div>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        className="absolute left-[-9999px] w-px h-px" />

      {/* Consenso */}
      <label className="flex items-start gap-3 text-sm text-gray-600">
        <input type="checkbox" required checked={formData.privacy}
          onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
          className="mt-1 w-4 h-4 accent-accent flex-shrink-0" />
        <span>
          Acconsento al trattamento dei documenti caricati (inclusi documenti d&apos;identità) ai soli fini
          della preventivazione assicurativa, secondo la{' '}
          <a href="/privacy" className="text-primary underline hover:text-accent" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. *
        </span>
      </label>

      {errorMsg && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">{errorMsg}</p>
      )}

      <Button type="submit" loading={status === 'loading'} size="lg" className="w-full sm:w-auto">
        {status === 'loading' ? 'Invio in corso…' : 'Invia documenti per il preventivo'}
      </Button>
    </form>
  )
}
