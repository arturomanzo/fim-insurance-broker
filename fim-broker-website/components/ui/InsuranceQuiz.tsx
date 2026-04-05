'use client'

import { useState } from 'react'
import Link from 'next/link'

type Option = { value: string; label: string; icon: string }
type Step = {
  id: string
  question: string
  subtitle?: string
  options: Option[]
}

const steps: Step[] = [
  {
    id: 'profile',
    question: 'Chi sei?',
    subtitle: 'Seleziona il tuo profilo per ricevere consigli personalizzati.',
    options: [
      { value: 'privato', label: 'Privato / Famiglia', icon: '👨‍👩‍👧' },
      { value: 'professionista', label: 'Libero Professionista', icon: '💼' },
      { value: 'pmi', label: 'PMI / Imprenditore', icon: '🏭' },
      { value: 'grande-impresa', label: 'Grande Impresa', icon: '🏢' },
    ],
  },
  {
    id: 'priority',
    question: 'Qual è la tua priorità principale?',
    subtitle: 'Cosa vuoi proteggere prima di tutto?',
    options: [
      { value: 'patrimonio', label: 'Patrimonio e beni', icon: '🏠' },
      { value: 'reddito', label: 'Reddito e lavoro', icon: '💰' },
      { value: 'salute', label: 'Salute e famiglia', icon: '❤️' },
      { value: 'responsabilita', label: 'Responsabilità civile', icon: '⚖️' },
    ],
  },
  {
    id: 'concern',
    question: 'Qual è la tua preoccupazione maggiore?',
    options: [
      { value: 'incidente', label: 'Incidenti stradali', icon: '🚗' },
      { value: 'furto', label: 'Furto o danni alla proprietà', icon: '🔐' },
      { value: 'malattia', label: 'Malattia o infortuni', icon: '🏥' },
      { value: 'causa-legale', label: 'Cause legali o sanzioni', icon: '📋' },
    ],
  },
  {
    id: 'current',
    question: 'Hai già una copertura assicurativa?',
    options: [
      { value: 'no', label: 'No, parto da zero', icon: '🆕' },
      { value: 'parziale', label: 'Solo RC Auto obbligatoria', icon: '🟡' },
      { value: 'alcune', label: 'Ho alcune polizze', icon: '🟢' },
      { value: 'completa', label: 'Credo di essere ben coperto', icon: '✅' },
    ],
  },
]

type Answers = Record<string, string>

type Result = {
  title: string
  desc: string
  polizze: { name: string; urgency: 'alta' | 'media' | 'bassa'; reason: string }[]
  cta: string
}

function getResult(answers: Answers): Result {
  const { profile, priority, concern, current } = answers

  const isPrivato = profile === 'privato'
  const isProfessionista = profile === 'professionista'
  const isPMI = profile === 'pmi' || profile === 'grande-impresa'

  const polizze: Result['polizze'] = []

  // Always suggest RC Auto if concern is accidents
  if (concern === 'incidente') {
    polizze.push({ name: 'RC Auto + Kasko', urgency: 'alta', reason: 'Protegge da danni a terzi e al tuo veicolo in caso di sinistro.' })
  }

  // Health/income
  if (priority === 'salute' || concern === 'malattia') {
    polizze.push({ name: 'Polizza Salute / Infortuni', urgency: 'alta', reason: 'Copre spese mediche, ricoveri e perdita di reddito da infortunio.' })
  }

  // Property
  if (priority === 'patrimonio' || concern === 'furto') {
    polizze.push({ name: 'Polizza Casa / All Risk', urgency: 'alta', reason: 'Tutela la tua abitazione da furto, incendio, allagamento ed eventi atmosferici.' })
  }

  // Liability
  if (priority === 'responsabilita' || concern === 'causa-legale') {
    if (isProfessionista) {
      polizze.push({ name: 'RC Professionale', urgency: 'alta', reason: 'Obbligatoria per molte categorie: copre i danni causati ai clienti nell\'esercizio della professione.' })
    } else if (isPMI) {
      polizze.push({ name: 'RC Impresa', urgency: 'alta', reason: 'Protegge l\'azienda da richieste di risarcimento di terzi.' })
    } else {
      polizze.push({ name: 'RC Famiglia', urgency: 'media', reason: 'Copre danni involontari causati a terzi da te o dai tuoi familiari.' })
    }
  }

  // Business-specific
  if (isPMI) {
    polizze.push({ name: 'Polizza Catastrofale (obbligatoria dal 2025)', urgency: 'alta', reason: 'Dal 1° aprile 2025 obbligatoria per tutte le imprese italiane (D.L. 18/2023).' })
    polizze.push({ name: 'Cyber Risk', urgency: 'media', reason: 'Protegge da attacchi informatici, data breach e interruzione dell\'attività digitale.' })
  }

  // Professional income protection
  if (isProfessionista && priority === 'reddito') {
    polizze.push({ name: 'Previdenza Complementare', urgency: 'media', reason: 'Integra la pensione pubblica e protegge il reddito futuro.' })
  }

  // If coverage is incomplete
  if (current === 'no' || current === 'parziale') {
    if (!polizze.find((p) => p.name.includes('Casa'))) {
      polizze.push({ name: 'Polizza Casa', urgency: 'media', reason: 'Spesso sottovalutata: copre l\'80% degli eventi dannosi più comuni.' })
    }
  }

  // Deduplicate and limit to top 4
  const unique = polizze.filter((p, i, arr) => arr.findIndex((x) => x.name === p.name) === i).slice(0, 4)

  const profileLabel: Record<string, string> = {
    privato: 'Privato / Famiglia',
    professionista: 'Libero Professionista',
    pmi: 'PMI / Imprenditore',
    'grande-impresa': 'Grande Impresa',
  }

  return {
    title: `Risultato per: ${profileLabel[profile] ?? 'il tuo profilo'}`,
    desc:
      current === 'completa'
        ? 'Hai già una buona base. Ti consigliamo una revisione professionale gratuita per verificare eventuali lacune e ottimizzare i premi.'
        : 'Basandoci sulle tue risposte, queste sono le coperture più urgenti per il tuo profilo. Un broker FIM può aiutarti a trovare le soluzioni migliori al prezzo giusto.',
    polizze: unique.length > 0
      ? unique
      : [
          { name: 'Consulenza Personalizzata', urgency: 'alta', reason: 'Ogni profilo è unico. Un nostro esperto analizza la tua situazione e costruisce il piano assicurativo su misura.' },
        ],
    cta: current === 'completa' ? 'Richiedi revisione gratuita' : 'Ottieni preventivo gratuito',
  }
}

const urgencyColors: Record<string, string> = {
  alta: 'bg-red-50 border-red-200 text-red-700',
  media: 'bg-amber-50 border-amber-200 text-amber-700',
  bassa: 'bg-green-50 border-green-200 text-green-700',
}
const urgencyLabel: Record<string, string> = {
  alta: 'Priorità alta',
  media: 'Priorità media',
  bassa: 'Priorità bassa',
}

export default function InsuranceQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResult, setShowResult] = useState(false)

  const step = steps[currentStep]
  const progress = ((currentStep) / steps.length) * 100

  function handleSelect(value: string) {
    const newAnswers = { ...answers, [step.id]: value }
    setAnswers(newAnswers)
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 200)
    } else {
      setTimeout(() => setShowResult(true), 200)
    }
  }

  function reset() {
    setAnswers({})
    setCurrentStep(0)
    setShowResult(false)
  }

  if (showResult) {
    const result = getResult(answers)
    return (
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-primary mb-2">{result.title}</h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">{result.desc}</p>
        </div>

        <div className="space-y-3 mb-8">
          {result.polizze.map((p) => (
            <div key={p.name} className={`flex items-start gap-4 p-4 rounded-xl border ${urgencyColors[p.urgency]}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">{p.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${urgencyColors[p.urgency]}`}>
                    {urgencyLabel[p.urgency]}
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-80">{p.reason}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/preventivo?ref=quiz&profile=${answers.profile ?? ''}`}
            className="btn-primary flex-1 text-center py-4 text-base font-bold"
          >
            {result.cta}
          </Link>
          <button
            onClick={reset}
            className="btn-outline flex-1 py-4 text-sm"
          >
            Ricomincia il quiz
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Risultato indicativo — un consulente FIM verificherà la tua situazione specifica gratuitamente.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Domanda {currentStep + 1} di {steps.length}</span>
          <span>{Math.round(progress)}% completato</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-black text-primary mb-1">{step.question}</h2>
        {step.subtitle && <p className="text-gray-500 text-sm">{step.subtitle}</p>}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {step.options.map((opt) => {
          const isSelected = answers[step.id] === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-primary hover:bg-primary/5 ${
                isSelected ? 'border-primary bg-primary/10' : 'border-gray-200'
              }`}
            >
              <span className="text-3xl flex-shrink-0">{opt.icon}</span>
              <span className="font-semibold text-gray-700 text-sm leading-tight">{opt.label}</span>
            </button>
          )
        })}
      </div>

      {/* Back */}
      {currentStep > 0 && (
        <button
          onClick={() => setCurrentStep((s) => s - 1)}
          className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Torna indietro
        </button>
      )}
    </div>
  )
}
