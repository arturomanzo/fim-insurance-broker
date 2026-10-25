'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { trackQuestionarioSubmit } from '@/lib/analytics'
import { linkConferma, type Conferma, type Dichiarazione, type Domanda, type Sezione } from '@/lib/questionario'

type Risposte = Record<string, string | string[]>

interface Props {
  token: string
  ramo: string | null
  sezioni: Sezione[]
  dichiarazioni: Dichiarazione[]
  conferma?: Conferma
}

const ERRORE_GENERICO = "Errore nell'invio. Riprova o contattaci al +39 06 96883381."
const OGNI_MS = 4_000

function CampoDomanda({ d, valore, onChange }: { d: Domanda; valore: string | string[] | undefined; onChange: (v: string | string[]) => void }) {
  const etichetta = (
    <span className="block font-semibold text-primary mb-1">
      {d.testo}
      {d.obbligatoria && <span className="text-red-600"> *</span>}
    </span>
  )
  const aiuto = d.aiuto && <span className="block text-xs text-gray-500 mb-2">{d.aiuto}</span>

  if (d.tipo === 'testo') {
    return (
      <label className="block">
        {etichetta}
        {aiuto}
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          rows={2}
          maxLength={1000}
          required={d.obbligatoria}
          value={typeof valore === 'string' ? valore : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    )
  }

  const multipla = d.tipo === 'multipla'
  const scelte = Array.isArray(valore) ? valore : []
  return (
    <fieldset>
      <legend>{etichetta}</legend>
      {aiuto}
      <div className="space-y-2">
        {(d.opzioni ?? []).map((o) => (
          <label key={o.valore} className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type={multipla ? 'checkbox' : 'radio'}
              name={d.id}
              value={o.valore}
              className="mt-0.5"
              required={!multipla && d.obbligatoria}
              checked={multipla ? scelte.includes(o.valore) : valore === o.valore}
              onChange={(e) => {
                if (!multipla) return onChange(o.valore)
                onChange(e.target.checked ? [...scelte, o.valore] : scelte.filter((x) => x !== o.valore))
              }}
            />
            <span>{o.etichetta}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function QuestionarioForm({ token, ramo, sezioni, dichiarazioni, conferma: confermaIniziale }: Props) {
  const [risposte, setRisposte] = useState<Risposte>({})
  const [date, setDate] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(confermaIniziale ? 'success' : 'idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [conferma, setConferma] = useState<Conferma | undefined>(confermaIniziale)
  const [firmato, setFirmato] = useState(false)

  // Dopo l'invio la pagina aspetta il messaggio WhatsApp con il codice: quando il
  // gestionale lo riceve, il questionario risulta firmato.
  useEffect(() => {
    if (status !== 'success' || firmato) return
    const id = setInterval(async () => {
      try {
        const res = await fetch('/api/questionario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ azione: 'stato', token }),
        })
        const d = (await res.json().catch(() => ({}))) as { stato?: string }
        if (d.stato === 'firmato') setFirmato(true)
      } catch { /* riprova al prossimo giro */ }
    }, OGNI_MS)
    return () => clearInterval(id)
  }, [status, firmato, token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    const obbligatorieMultiple = sezioni.flatMap((s) => s.domande).filter((d) => d.tipo === 'multipla' && d.obbligatoria)
    const vuota = obbligatorieMultiple.find((d) => !Array.isArray(risposte[d.id]) || (risposte[d.id] as string[]).length === 0)
    if (vuota) {
      setErrorMsg(`Manca la risposta a: «${vuota.testo}»`)
      setStatus('error')
      return
    }
    try {
      const res = await fetch('/api/questionario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ azione: 'compila', token, risposte, dichiarazioni: date }),
      })
      const d = (await res.json().catch(() => ({}))) as Partial<Conferma> & { error?: string }
      if (!res.ok || !d.codice || !d.testo || !d.numero) {
        setErrorMsg(d.error || ERRORE_GENERICO)
        setStatus('error')
        return
      }
      setConferma({ codice: d.codice, testo: d.testo, numero: d.numero })
      trackQuestionarioSubmit(ramo ?? 'altro')
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setErrorMsg(ERRORE_GENERICO)
      setStatus('error')
    }
  }

  if (firmato) {
    return (
      <Card className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Grazie, è tutto a posto</h2>
        <p className="text-gray-600">
          Abbiamo ricevuto la conferma. Le proponiamo la copertura sulla base di quello che ci ha indicato:
          la ricontattiamo noi.
        </p>
      </Card>
    )
  }

  if (status === 'success' && conferma) {
    return (
      <Card className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Ultimo passo: la conferma</h2>
        <p className="text-gray-600 mb-6">
          Per firmare il questionario ci mandi da WhatsApp questo codice, dal numero che ci ha lasciato.
          Il pulsante apre WhatsApp con il messaggio già scritto: deve solo inviarlo.
        </p>
        <div className="text-4xl font-black tracking-[0.3em] text-primary mb-6">{conferma.codice}</div>
        <Button href={linkConferma(conferma)} external size="lg">
          Conferma su WhatsApp
        </Button>
        <p className="text-xs text-gray-500 mt-6">
          Questa pagina si aggiorna da sola quando arriva il messaggio. Se ha cambiato numero, ci chiami allo 06 96883381.
        </p>
        <button type="button" className="text-xs text-primary underline mt-3" onClick={() => setStatus('idle')}>
          Voglio correggere una risposta
        </button>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {sezioni.map((s) => (
        <Card key={s.titolo}>
          <h2 className="text-lg font-bold text-primary mb-4">{s.titolo}</h2>
          <div className="space-y-5">
            {s.domande.map((d) => (
              <CampoDomanda
                key={d.id}
                d={d}
                valore={risposte[d.id]}
                onChange={(v) => setRisposte((r) => ({ ...r, [d.id]: v }))}
              />
            ))}
          </div>
        </Card>
      ))}

      <Card>
        <h2 className="text-lg font-bold text-primary mb-4">Le sue dichiarazioni</h2>
        <div className="space-y-3">
          {dichiarazioni.map((d) => (
            <label key={d.id} className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5"
                required
                checked={date.includes(d.id)}
                onChange={(e) => setDate((x) => (e.target.checked ? [...x, d.id] : x.filter((y) => y !== d.id)))}
              />
              <span>
                {d.testo}
                {d.link && (
                  <>
                    {' '}
                    <a href={d.link.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      {d.link.etichetta}
                    </a>
                  </>
                )}
              </span>
            </label>
          ))}
        </div>
      </Card>

      {status === 'error' && <p className="text-red-600 text-sm">{errorMsg}</p>}

      <Button type="submit" loading={status === 'loading'} size="lg" className="w-full">
        Invia il questionario
      </Button>
    </form>
  )
}
