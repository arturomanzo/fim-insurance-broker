'use client'

import { useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import AiNotice from '@/components/ui/AiNotice'
import { AI_DISCLOSURE } from '@/lib/ai-disclosure'
import { RICONTATTO } from '@/lib/tempi'
import { campagnaPerInvio } from '@/lib/campagnaBrowser'
import { trackVerificaRequisitiSubmit } from '@/lib/analytics'
import {
  CATEGORIA_LABELS,
  ESITO_LABELS,
  MAX_PDF_TOTALE,
  tipoLeadRequisiti,
  type Esito,
  type RisultatoVerifica,
} from '@/lib/verificaRequisiti'

const ERRORE_INVIO = "Errore nell'invio. Riprova o contattaci al +39 06 96883381."

const MESSAGGI_ATTESA = [
  'Carico il documento...',
  'Cerco le clausole sulle garanzie...',
  'Calcolo importi e massimali richiesti...',
  'Confronto con la tua polizza...',
  'Segno i punti da chiarire...',
  'Preparo il riepilogo...',
]

const ESITO_STILE: Record<Esito, string> = {
  coperto: 'bg-green-100 text-green-700',
  parziale: 'bg-yellow-100 text-yellow-700',
  scoperto: 'bg-red-100 text-red-700',
  non_confrontato: 'bg-blue-100 text-blue-700',
}

const URGENZA_STILE = {
  alta: { label: 'Urgente', cls: 'bg-red-100 text-red-700' },
  media: { label: 'Importante', cls: 'bg-yellow-100 text-yellow-700' },
  bassa: { label: 'Da valutare', cls: 'bg-blue-100 text-blue-700' },
} as const

function leggiBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = String(reader.result).split(',')[1]
      if (!base64) reject(new Error('Conversione base64 fallita'))
      else resolve(base64)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function CaricaPdf({
  etichetta,
  invito,
  file,
  onFile,
}: {
  etichetta: string
  invito: string
  file: File | null
  onFile: (f: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [trascina, setTrascina] = useState(false)

  return (
    <div>
      <label className="label-field">{etichetta}</label>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault()
          setTrascina(false)
          onFile(e.dataTransfer.files[0] ?? null)
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setTrascina(true)
        }}
        onDragLeave={() => setTrascina(false)}
        className={`mt-1 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          file
            ? 'border-green-400 bg-green-50'
            : trascina
              ? 'border-accent bg-accent/5'
              : 'border-gray-300 hover:border-primary bg-gray-50 hover:bg-primary/5'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <div className="text-left">
              <p className="font-medium text-gray-800 text-sm break-all">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onFile(null)
              }}
              className="ml-2 text-gray-400 hover:text-red-500"
              aria-label="Rimuovi file"
            >
              ✕
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 font-medium mb-1">{invito}</p>
            <p className="text-gray-500 text-xs">Trascina qui il PDF o clicca per sceglierlo</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VerificaRequisiti() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form')
  const [messaggio, setMessaggio] = useState(MESSAGGI_ATTESA[0])
  const [risultato, setRisultato] = useState<RisultatoVerifica | null>(null)
  const [conPolizza, setConPolizza] = useState(false)

  const [documento, setDocumento] = useState<File | null>(null)
  const [polizza, setPolizza] = useState<File | null>(null)
  const [formData, setFormData] = useState({ nome: '', email: '', telefono: '', privacy: false, website: '' })
  const [errorMsg, setErrorMsg] = useState('')

  function scegliFile(set: (f: File | null) => void) {
    return (f: File | null) => {
      setErrorMsg('')
      if (f && f.type !== 'application/pdf') {
        setErrorMsg('Formato non supportato. Carica un file PDF.')
        return
      }
      set(f)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!documento) {
      setErrorMsg('Carica il bando, il capitolato o il contratto in PDF.')
      return
    }
    if ((documento.size ?? 0) + (polizza?.size ?? 0) > MAX_PDF_TOTALE) {
      setErrorMsg('File troppo grandi. I due PDF insieme non devono superare i 3 MB.')
      return
    }
    if (!formData.nome || !formData.email || !formData.privacy) {
      setErrorMsg('Compila nome ed email e accetta la privacy.')
      return
    }

    setErrorMsg('')
    setStep('loading')
    let i = 0
    const timer = setInterval(() => {
      i = (i + 1) % MESSAGGI_ATTESA.length
      setMessaggio(MESSAGGI_ATTESA[i])
    }, 2500)

    try {
      const [documentoBase64, polizzaBase64] = await Promise.all([
        leggiBase64(documento),
        polizza ? leggiBase64(polizza) : Promise.resolve(''),
      ])

      const res = await fetch('/api/verifica-requisiti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefono: formData.telefono,
          privacy: formData.privacy,
          documentoBase64,
          polizzaBase64: polizzaBase64 || undefined,
          website: formData.website,
          campagna: campagnaPerInvio(),
        }),
      })
      const data = await res.json()
      clearInterval(timer)

      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? ERRORE_INVIO)
        setStep('form')
        return
      }

      trackVerificaRequisitiSubmit(tipoLeadRequisiti(data.risultato), data.conPolizza)
      setRisultato(data.risultato)
      setConPolizza(Boolean(data.conPolizza))
      setStep('result')
    } catch {
      clearInterval(timer)
      setErrorMsg(ERRORE_INVIO)
      setStep('form')
    }
  }

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center py-16 gap-6 text-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <div>
          <p className="text-lg font-semibold text-primary mb-1">Verifica in corso...</p>
          <p className="text-gray-500 text-sm animate-pulse">{messaggio}</p>
        </div>
        <p className="text-xs text-gray-500 max-w-xs">
          Leggiamo ogni clausola sulle garanzie. Ci vuole circa un minuto, qualcosa in più con due documenti.
        </p>
      </div>
    )
  }

  if (step === 'result' && risultato) {
    const d = risultato.documento
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-6 text-white">
          <p className="text-sm opacity-75 mb-1">{d.tipo}</p>
          <h2 className="text-xl font-bold mb-1">{d.oggetto ?? 'Documento analizzato'}</h2>
          {d.committente && <p className="text-sm opacity-75">{d.committente}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {d.importo && (
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-xs opacity-75">Valore</p>
                <p className="font-semibold text-sm">{d.importo}</p>
              </div>
            )}
            {d.scadenza && (
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-xs opacity-75">Scadenza</p>
                <p className="font-semibold text-sm">{d.scadenza}</p>
              </div>
            )}
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-xs opacity-75">Polizze richieste</p>
              <p className="font-semibold text-sm">{risultato.requisiti.length}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{risultato.sintesi}</p>

        <AiNotice text={AI_DISCLOSURE.requisiti} variant="box" />

        {risultato.requisiti.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Cosa chiede il documento</h3>
            <div className="space-y-3">
              {risultato.requisiti.map((q, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-xs font-semibold text-accent-cta uppercase tracking-wide">
                        {CATEGORIA_LABELS[q.categoria]}
                      </p>
                      <h4 className="font-semibold text-gray-800">{q.garanzia}</h4>
                    </div>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${ESITO_STILE[q.esito]}`}>
                      {ESITO_LABELS[q.esito]}
                    </span>
                  </div>
                  <dl className="text-sm text-gray-600 space-y-0.5 mt-2">
                    {q.importo && (
                      <div>
                        <dt className="inline font-medium">Importo: </dt>
                        <dd className="inline">{q.importo}</dd>
                      </div>
                    )}
                    {q.quando && (
                      <div>
                        <dt className="inline font-medium">Quando: </dt>
                        <dd className="inline">{q.quando}</dd>
                      </div>
                    )}
                    {q.riferimento && (
                      <div>
                        <dt className="inline font-medium">Dove: </dt>
                        <dd className="inline">{q.riferimento}</dd>
                      </div>
                    )}
                  </dl>
                  {q.nota && <p className="text-sm text-gray-500 mt-2">{q.nota}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {risultato.lacune.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Cosa manca</h3>
            <div className="space-y-3">
              {risultato.lacune.map((l, i) => {
                const u = URGENZA_STILE[l.urgenza] ?? URGENZA_STILE.bassa
                return (
                  <div key={i} className="border border-red-200 bg-red-50 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-gray-800">{l.titolo}</h4>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${u.cls}`}>{u.label}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{l.descrizione}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {risultato.puntiDubbi.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Da chiarire col committente</h3>
            <ul className="space-y-2">
              {risultato.puntiDubbi.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-gray-400 mt-0.5">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>
        )}

        {risultato.prossimiPassi.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Prossimi passi</h3>
            <div className="space-y-3">
              {risultato.prossimiPassi.map((p, i) => (
                <div key={i} className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">{p.titolo}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.descrizione}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="gradient-primary rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Il preventivo te lo facciamo noi</h3>
          <p className="opacity-90 mb-5 text-sm">
            Abbiamo ricevuto la sintesi della verifica
            {conPolizza ? ' e del confronto con la tua polizza' : ''}. Ti scriviamo {RICONTATTO} con un preventivo
            indicativo per le garanzie che mancano, soggetto alla conferma della compagnia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/prenota-consulenza" className="btn-primary text-center">
              Prenota una telefonata
            </a>
            <a href="tel:+390696883381" className="btn-outline-white text-center">
              Chiama ora: 06 96883381
            </a>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setStep('form')
              setRisultato(null)
              setDocumento(null)
              setPolizza(null)
            }}
            className="text-sm text-gray-500 hover:text-primary underline underline-offset-2"
          >
            Verifica un altro documento
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <CaricaPdf
        etichetta="Bando, capitolato o contratto (PDF) *"
        invito="Il documento che chiede le polizze"
        file={documento}
        onFile={scegliFile(setDocumento)}
      />
      <CaricaPdf
        etichetta="La tua polizza attuale (PDF, facoltativa)"
        invito="Se la carichi, la confrontiamo coi requisiti"
        file={polizza}
        onFile={scegliFile(setPolizza)}
      />
      <p className="text-xs text-gray-500 -mt-3">I due PDF insieme fino a 3 MB.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vr-nome" className="label-field">Nome e cognome o ragione sociale *</label>
          <input
            id="vr-nome"
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData((p) => ({ ...p, nome: e.target.value }))}
            required
            placeholder="Mario Rossi"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="vr-email" className="label-field">Email *</label>
          <input
            id="vr-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            required
            placeholder="mario@impresa.it"
            className="input-field"
          />
        </div>
      </div>
      <div>
        <label htmlFor="vr-telefono" className="label-field">Telefono (facoltativo, per le gare in scadenza)</label>
        <input
          id="vr-telefono"
          type="tel"
          value={formData.telefono}
          onChange={(e) => setFormData((p) => ({ ...p, telefono: e.target.value }))}
          placeholder="333 1234567"
          className="input-field"
        />
      </div>

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
          <a href="/privacy-policy" className="text-primary underline" target="_blank">
            Privacy Policy
          </a>{' '}
          e il trattamento dei miei dati per la verifica e per essere ricontattato da FIM con un preventivo. I PDF non
          vengono salvati. *
        </span>
      </label>

      {errorMsg && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full">
        Verifica i requisiti
      </Button>
      <p className="text-xs text-gray-500 text-center">I documenti vengono letti e poi scartati: non restano sui nostri server.</p>
    </form>
  )
}
