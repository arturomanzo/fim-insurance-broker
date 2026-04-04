'use client'

import { useState } from 'react'
import Link from 'next/link'

type Profile = 'privato' | 'professionista' | 'pmi' | 'impresa'

interface FormState {
  profile: Profile | null
  settore: string | null
  answers: Record<string, boolean>
  nome: string
  email: string
  privacy: boolean
  website: string // honeypot
}

interface Copertura {
  nome: string
  priorita: 'urgente' | 'alta' | 'consigliata'
  motivo: string
  slug: string
}

interface RiskResult {
  livello: 'basso' | 'medio' | 'alto'
  punteggio: number
  coperture: Copertura[]
  prezzoMin: number
  prezzoMax: number
}

const PROFILES = [
  {
    id: 'privato' as Profile,
    emoji: '👤',
    label: 'Privato',
    desc: 'Proteggere me stesso e la mia famiglia',
  },
  {
    id: 'professionista' as Profile,
    emoji: '💼',
    label: 'Libero Professionista',
    desc: 'Consulente, medico, avvocato, ingegnere…',
  },
  {
    id: 'pmi' as Profile,
    emoji: '🏢',
    label: 'PMI / Artigiano',
    desc: 'Azienda con 1–50 dipendenti',
  },
  {
    id: 'impresa' as Profile,
    emoji: '🏭',
    label: 'Grande Impresa',
    desc: 'Struttura con 50+ dipendenti',
  },
]

const SECTORS: Record<Profile, string[]> = {
  privato: ['Casa e Famiglia', 'Auto e Mobilità', 'Salute e Previdenza', 'Copertura completa'],
  professionista: ['Consulente / Manager', 'Medico / Sanitario', 'Avvocato / Notaio', 'Ingegnere / Architetto', 'IT / Tecnologia', 'Commercialista / Fiscalista', 'Altro'],
  pmi: ['Commercio / Retail', 'Artigianato / Produzione', 'Servizi Professionali', 'Edilizia / Costruzioni', 'Tecnologia / IT', 'Ristorazione / Turismo', 'Altro'],
  impresa: ['Manifatturiero / Industria', 'Commercio / GDO', 'Servizi / Consulting', 'Tecnologia / Software', 'Edilizia / Infrastrutture', 'Sanità / Pharma', 'Altro'],
}

const QUESTIONS: Record<Profile, Array<{ id: string; label: string; yesLabel: string; noLabel: string }>> = {
  privato: [
    { id: 'casa', label: 'Sei proprietario di casa o hai un mutuo?', yesLabel: 'Sì, sono proprietario', noLabel: 'No, sono in affitto' },
    { id: 'auto', label: "Utilizzi l'auto anche per esigenze lavorative?", yesLabel: 'Sì, anche per lavoro', noLabel: 'Solo uso personale' },
    { id: 'carico', label: 'Hai familiari a carico (figli, coniuge)?', yesLabel: 'Sì', noLabel: 'No' },
  ],
  professionista: [
    { id: 'clienti', label: "Gestisci più di 20 clienti o commesse all'anno?", yesLabel: 'Sì, oltre 20', noLabel: 'No, meno di 20' },
    { id: 'rc', label: 'Hai già una polizza RC Professionale attiva?', yesLabel: "Sì, ce l'ho", noLabel: 'No / scaduta' },
    { id: 'dati', label: 'Nel tuo lavoro tratti dati sensibili (salute, legale, finanziario)?', yesLabel: 'Sì', noLabel: 'No / marginalmente' },
  ],
  pmi: [
    { id: 'dipendenti', label: "La tua azienda ha dipendenti (oltre al titolare)?", yesLabel: 'Sì, ho dipendenti', noLabel: 'No, solo io' },
    { id: 'veicoli', label: 'Utilizzi veicoli aziendali o hai una flotta?', yesLabel: 'Sì', noLabel: 'No' },
    { id: 'coperture', label: 'Hai già coperture assicurative aziendali?', yesLabel: 'Sì, alcune', noLabel: 'No / incomplete' },
  ],
  impresa: [
    { id: 'sedi', label: 'Hai sedi operative in più città o regioni?', yesLabel: 'Sì, più sedi', noLabel: 'Sede unica' },
    { id: 'dati', label: 'Gestisci dati digitali di clienti o fornitori?', yesLabel: 'Sì', noLabel: 'Limitatamente' },
    { id: 'manager', label: 'Hai già un risk manager o consulente assicurativo dedicato?', yesLabel: 'Sì', noLabel: 'No' },
  ],
}

function getCoperture(profile: Profile, settore: string | null, answers: Record<string, boolean>): Copertura[] {
  const res: Copertura[] = []

  if (profile === 'privato') {
    if (answers.casa) {
      res.push({ nome: 'Assicurazione Casa', priorita: 'urgente', motivo: 'Protegge il tuo immobile da incendio, furto e responsabilità civile del proprietario.', slug: 'casa' })
    }
    if (answers.carico) {
      res.push({ nome: 'Polizza Vita / Caso Morte', priorita: 'alta', motivo: 'Con familiari a carico, proteggere il reddito familiare è una priorità assoluta.', slug: 'vita' })
    }
    res.push({
      nome: 'RC Auto + Kasko',
      priorita: answers.auto ? 'alta' : 'consigliata',
      motivo: answers.auto
        ? "Usi l'auto per lavoro: verifica che la polizza includa l'uso professionale e non solo privato."
        : 'Ottimizza costo e copertura della tua polizza auto con le migliori offerte di mercato.',
      slug: 'auto',
    })
    res.push({ nome: 'Assicurazione Salute', priorita: 'consigliata', motivo: "Accesso rapido a visite specialistiche e cure private, senza lunghe liste d'attesa del SSN.", slug: 'salute' })
  }

  if (profile === 'professionista') {
    res.push({
      nome: 'RC Professionale',
      priorita: !answers.rc ? 'urgente' : 'alta',
      motivo: !answers.rc
        ? 'Non hai una RC professionale attiva: è obbligatoria per molte categorie e protegge il tuo patrimonio personale da richieste di risarcimento.'
        : 'Ottimizza massimali e condizioni della tua RC professionale in base al volume di attività.',
      slug: 'aziendali',
    })
    if (answers.dati) {
      res.push({ nome: 'Polizza Cyber & Privacy', priorita: 'alta', motivo: 'Tratti dati sensibili: sei esposto a rischi GDPR e data breach. La cyber insurance copre sanzioni, ripristino dati e danni ai clienti.', slug: 'aziendali' })
    }
    res.push({ nome: 'Tutela Legale Professionale', priorita: 'consigliata', motivo: 'Copre le spese legali in caso di controversie con clienti, fornitori o autorità di vigilanza.', slug: 'aziendali' })
    res.push({ nome: 'Previdenza Complementare', priorita: 'consigliata', motivo: 'Da autonomo, la pensione pubblica sarà ridotta. Un piano previdenziale complementare è indispensabile.', slug: 'vita' })
  }

  if (profile === 'pmi') {
    res.push({
      nome: 'RC Impresa / RC Prodotti',
      priorita: !answers.coperture ? 'urgente' : 'alta',
      motivo: !answers.coperture
        ? "Non hai coperture aziendali: la RC impresa è il primo passo per tutelare l'attività da danni causati a terzi."
        : 'Verifica che la RC copra adeguatamente tutti i prodotti e servizi erogati.',
      slug: 'aziendali',
    })
    res.push({ nome: 'All Risk Aziendale (Property)', priorita: 'alta', motivo: 'Protegge locali, macchinari, attrezzature e merci da incendio, furto e danni accidentali.', slug: 'aziendali' })
    if (settore === 'Tecnologia / IT' || settore === 'Servizi Professionali') {
      res.push({ nome: 'Cyber Risk Insurance', priorita: 'alta', motivo: 'Nel tuo settore il rischio informatico è elevato. La cyber insurance è diventata imprescindibile per le PMI digitali.', slug: 'aziendali' })
    }
    if (answers.veicoli) {
      res.push({ nome: 'Flotta Aziendale', priorita: 'alta', motivo: 'Una polizza flotta unica ottimizza i costi e semplifica la gestione di tutti i veicoli aziendali.', slug: 'auto' })
    }
    if (answers.dipendenti) {
      res.push({ nome: 'Welfare & Salute Dipendenti', priorita: 'consigliata', motivo: 'Polizze sanitarie e infortuni per i dipendenti: benefit molto apprezzato e fiscalmente agevolato.', slug: 'salute' })
    }
  }

  if (profile === 'impresa') {
    res.push({ nome: 'Programma Assicurativo Integrato', priorita: 'urgente', motivo: "Un'impresa strutturata necessita di un programma coordinato: property, liability, D&O, cyber, fleet.", slug: 'aziendali' })
    if (answers.dati) {
      res.push({ nome: 'Cyber Insurance Enterprise', priorita: 'urgente', motivo: 'Gestisci dati digitali: il rischio cyber è classificato come top risk globale per le imprese. La copertura deve essere adeguata alla scala.', slug: 'aziendali' })
    }
    res.push({ nome: 'D&O (Directors & Officers)', priorita: 'alta', motivo: 'Protegge dirigenti e amministratori da responsabilità personali per decisioni aziendali e nei confronti di azionisti/terzi.', slug: 'aziendali' })
    if (answers.sedi) {
      res.push({ nome: 'All Risk Property Multi-Sede', priorita: 'alta', motivo: 'Con più sedi, una polizza centralizzata garantisce copertura coerente e riduce i costi complessivi.', slug: 'aziendali' })
    }
    res.push({ nome: 'Welfare & Benefits Aziendali', priorita: 'consigliata', motivo: "Programmi sanitari e previdenziali strutturati: fattore chiave nell'attrarre e trattenere talenti.", slug: 'salute' })
  }

  return res
}

function calcola(form: FormState): RiskResult {
  const { profile, settore, answers } = form
  let score = 0
  const base: Record<Profile, number> = { privato: 18, professionista: 38, pmi: 55, impresa: 75 }
  score += base[profile!]

  if (profile === 'privato') {
    if (answers.casa) score += 10
    if (answers.auto) score += 8
    if (answers.carico) score += 7
  } else if (profile === 'professionista') {
    if (answers.clienti) score += 12
    if (!answers.rc) score += 18
    if (answers.dati) score += 15
  } else if (profile === 'pmi') {
    if (answers.dipendenti) score += 8
    if (answers.veicoli) score += 6
    if (!answers.coperture) score += 14
  } else if (profile === 'impresa') {
    if (answers.sedi) score += 8
    if (answers.dati) score += 10
    if (!answers.manager) score += 5
  }

  score = Math.min(score, 100)
  const livello: 'basso' | 'medio' | 'alto' = score < 36 ? 'basso' : score < 66 ? 'medio' : 'alto'
  const coperture = getCoperture(profile!, settore, answers)

  const ranges: Record<Profile, [number, number]> = {
    privato: [500, 1800],
    professionista: [700, 3500],
    pmi: [1500, 9000],
    impresa: [6000, 30000],
  }
  const [rMin, rMax] = ranges[profile!]
  const f = score / 100
  const prezzoMin = Math.round((rMin * (0.8 + f * 0.3)) / 100) * 100
  const prezzoMax = Math.round((rMax * (0.7 + f * 0.4)) / 100) * 100

  return { livello, punteggio: score, coperture, prezzoMin, prezzoMax }
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
    if (!form.privacy) { setError('Accetta la privacy policy per continuare.'); return }

    setIsSubmitting(true)
    setError('')
    const res = calcola(form)
    setResult(res)

    try {
      await fetch('/api/calcolatore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome.trim(),
          email: form.email.trim(),
          profile: form.profile,
          settore: form.settore,
          answers: form.answers,
          livello: res.livello,
          punteggio: res.punteggio,
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

  const profileLabel: Record<Profile, string> = {
    privato: 'Privato',
    professionista: 'Libero Professionista',
    pmi: 'PMI / Artigiano',
    impresa: 'Grande Impresa',
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
              {form.profile ? profileLabel[form.profile] : ''} · {form.settore}
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
              onClick={() => { setStep(1); setForm({ profile: null, settore: null, answers: {}, nome: '', email: '', privacy: false, website: '' }); setResult(null) }}
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
