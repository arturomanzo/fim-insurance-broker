'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import ChatBubble from './ChatBubble'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const DEFAULT_QUESTIONS = [
  "Non so da dove iniziare, aiutami",
  "Quali coperture servono alla mia azienda?",
  "Come funziona la RC Professionale?",
  "Posso fare un preventivo online?",
]

// Domande contestuali in base alla pagina visitata
function getSuggestedQuestions(path: string): string[] {
  if (path.includes('professionisti')) return [
    "Cos'è la RC Professionale?",
    "Ho bisogno di RC professionale?",
    "Quanto costa una polizza professionale?",
    "Copre anche i danni ai clienti?",
  ]
  if (path.includes('famiglie')) return [
    "Come proteggo la mia famiglia?",
    "Cosa copre l'assicurazione casa?",
    "Conviene la polizza vita?",
    "Posso assicurare auto e casa insieme?",
  ]
  if (path.includes('artigiani') || path.includes('pmi')) return [
    "Quali polizze servono alla mia impresa?",
    "Cos'è la RC prodotti?",
    "Come mi tutelo dai danni a terzi?",
    "Ho dipendenti, cosa devo assicurare?",
  ]
  if (path.includes('condomini')) return [
    "Cosa copre la polizza condominio?",
    "È obbligatoria l'assicurazione condominio?",
    "Chi paga i danni nelle parti comuni?",
    "Come faccio un preventivo per il mio condominio?",
  ]
  if (path.includes('catastrofi')) return [
    "Cosa copre una polizza catastrofi naturali?",
    "Il terremoto è coperto dalla mia polizza casa?",
    "Come funziona la copertura alluvione?",
    "Quanto costa assicurarsi contro le calamità?",
  ]
  if (path.includes('sinistri')) return [
    "Come denuncio un sinistro?",
    "Quanto tempo ho per segnalare il sinistro?",
    "La compagnia mi ha rifiutato il rimborso, cosa faccio?",
    "Il servizio sinistri ha un costo?",
  ]
  if (path.includes('quiz')) return [
    "Come funziona il quiz?",
    "Il risultato è vincolante?",
    "Posso avere un preventivo dopo il quiz?",
    "Cosa succede se non so rispondere?",
  ]
  if (path.includes('calcolatore')) return [
    "Come interpreto il mio punteggio di rischio?",
    "Quali coperture mi consiglia?",
    "Posso avere un preventivo personalizzato?",
    "Cosa significa 'rischio elevato'?",
  ]
  if (path.includes('preventivo')) return [
    "Come funziona la richiesta preventivo?",
    "Quanto tempo ci vuole per una risposta?",
    "Il preventivo è gratuito?",
    "Posso preventivare più polizze insieme?",
  ]
  return DEFAULT_QUESTIONS
}

// Messaggio proattivo contestuale — specifico per pagina
function getProactiveMessage(path: string): string {
  if (path.includes('preventivo'))
    return 'Stai compilando il preventivo? Se hai dubbi su quale copertura scegliere o vuoi un consiglio rapido, sono qui. Basta scrivere!'
  if (path.includes('sinistri'))
    return 'Devi aprire un sinistro? Posso guidarti passo per passo nella denuncia e dirti esattamente quali documenti servono.'
  if (path.includes('professionisti'))
    return 'Sei un libero professionista? La RC Professionale ti protegge da richieste di risarcimento anche retroattive. Vuoi sapere quanto costa per la tua categoria?'
  if (path.includes('artigiani') || path.includes('pmi'))
    return "Gestisci un'impresa o sei artigiano? Posso aiutarti a capire quali coperture sono obbligatorie e quali proteggono davvero il tuo lavoro."
  if (path.includes('famiglie'))
    return 'Cerchi protezione per la tua famiglia? Posso mostrarti le soluzioni più adatte per casa, vita e salute — anche in bundle conveniente.'
  if (path.includes('condomini'))
    return 'Gestisci un condominio? La polizza condominiale protegge le parti comuni e i condomini da responsabilità civile. Vuoi un preventivo?'
  if (path.includes('catastrofi'))
    return "Dal 2025 la polizza catastrofi è obbligatoria per le imprese. Sei in regola? Posso spiegarti cosa copre e come attivarla velocemente."
  if (path.includes('calcolatore'))
    return 'Hai calcolato il tuo livello di rischio? Posso aiutarti a interpretare il punteggio e suggerirti le coperture più adatte al tuo profilo.'
  if (path.includes('quiz'))
    return 'Hai completato il quiz? Se vuoi, posso approfondire i risultati e indicarti la polizza più adatta a te.'
  if (path.includes('chi-siamo'))
    return 'Hai domande su FIM Insurance Broker? Sono qui per risponderti su chi siamo, come lavoriamo e cosa ci distingue.'
  return 'Ciao! Stai esplorando le nostre soluzioni assicurative? Se hai dubbi o vuoi sapere da dove iniziare, sono qui — basta scrivere.'
}

// Messaggio exit intent contestuale — specifico per pagina
function getExitIntentMessage(path: string): string {
  if (path.includes('preventivo'))
    return 'Stai per uscire senza completare il preventivo! Ci vogliono solo 2 minuti e nessun impegno. Vuoi che ti aiuto a finire?'
  if (path.includes('sinistri'))
    return 'Prima di andare — stai gestendo un sinistro? Posso guidarti subito nella denuncia, senza attese. Dimmi cosa è successo.'
  if (path.includes('prenota'))
    return 'Quasi fatta! Vuoi prenotare una consulenza gratuita prima di uscire? Bastano 2 minuti e un nostro esperto ti richiama.'
  if (path.includes('professionisti') || path.includes('artigiani') || path.includes('pmi'))
    return 'Prima di andare — ti bastano 2 minuti per scoprire se sei adeguatamente coperto. Vuoi un check gratuito della tua situazione?'
  if (path.includes('famiglie'))
    return 'Prima di andare — vuoi proteggere la tua famiglia senza spendere troppo? Posso mostrarti le soluzioni più adatte in meno di 2 minuti.'
  if (path.includes('calcolatore') || path.includes('quiz'))
    return 'Hai già il tuo profilo di rischio — non lasciarlo senza una copertura adeguata! Vuoi un preventivo gratuito adesso?'
  return 'Prima di andare — hai 2 minuti per un preventivo gratuito? Nessun impegno, risposta in 24 ore. Posso aiutarti subito!'
}

// Ritardo proattivo variabile: più basso sulle pagine ad alto intento di acquisto
function getProactiveDelay(path: string): number {
  if (path.includes('sinistri') || path.includes('preventivo') || path.includes('prenota'))
    return 20_000
  if (
    path.includes('quiz') || path.includes('calcolatore') ||
    path.includes('professionisti') || path.includes('famiglie') ||
    path.includes('artigiani') || path.includes('pmi') ||
    path.includes('condomini') || path.includes('catastrofi')
  )
    return 25_000
  return 45_000
}

// Messaggio attivo di FIMA che propone WhatsApp dopo N scambi senza conversione
const WHATSAPP_ESCALATION_MESSAGE =
  'Ho capito che hai qualche domanda in più — posso metterti in contatto diretto con un nostro consulente su WhatsApp. Risponde in pochi minuti e può prepararti un preventivo su misura. Clicca il pulsante qui sotto!'

// URL di conversione: se FIMA li menziona, l'utente è già stato indirizzato correttamente
const CONVERSION_URLS = ['/preventivo', '/prenota-consulenza']

const PROACTIVE_SESSION_KEY = 'fima_proactive_shown'
const EXIT_INTENT_SESSION_KEY = 'fima_exit_intent_shown'
// Proporre WhatsApp dopo questo numero di messaggi utente (se senza conversione)
const WHATSAPP_ESCALATION_AFTER = 3

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393801234567'

export default function FIMAWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [pageContext, setPageContext] = useState('')
  const [suggestedQuestions, setSuggestedQuestions] = useState(DEFAULT_QUESTIONS)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Ciao! Sono FIMA, il tuo assistente assicurativo virtuale. Come posso aiutarti oggi?',
    },
  ])
  const [hasProactiveBadge, setHasProactiveBadge] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [userMessageCount, setUserMessageCount] = useState(0)
  // Traccia se FIMA ha già proposto WhatsApp in questa sessione
  const [whatsAppProposalSent, setWhatsAppProposalSent] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isOpenRef = useRef(isOpen)

  // Mantieni ref aggiornato per i listener che non possono dipendere dallo state
  useEffect(() => { isOpenRef.current = isOpen }, [isOpen])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, streamingContent])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Rileva la pagina corrente e aggiorna le domande suggerite
  useEffect(() => {
    const path = window.location.pathname
    setPageContext(path)
    setSuggestedQuestions(getSuggestedQuestions(path))
  }, [])

  // Trigger proattivo: apre dopo PROACTIVE_DELAY_MS se non già mostrato in sessione
  const triggerProactive = useCallback(() => {
    if (isOpenRef.current) return
    const path = window.location.pathname
    setHasProactiveBadge(true)
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: getProactiveMessage(path) },
    ])
    setIsOpen(true)
  }, [])

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return
    if (sessionStorage.getItem(PROACTIVE_SESSION_KEY)) return

    const delay = getProactiveDelay(window.location.pathname)
    const timer = setTimeout(() => {
      triggerProactive()
      sessionStorage.setItem(PROACTIVE_SESSION_KEY, '1')
    }, delay)

    return () => clearTimeout(timer)
  }, [triggerProactive])

  // Exit intent: intercetta il movimento del cursore verso il bordo superiore
  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 10) return // non è uscita verso l'alto
      if (sessionStorage.getItem(EXIT_INTENT_SESSION_KEY)) return
      if (isOpenRef.current) return

      sessionStorage.setItem(EXIT_INTENT_SESSION_KEY, '1')
      sessionStorage.setItem(PROACTIVE_SESSION_KEY, '1') // non mostrare anche il proattivo
      setHasProactiveBadge(true)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: getExitIntentMessage(window.location.pathname) },
      ])
      setIsOpen(true)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setStreamingContent('')
    const newCount = userMessageCount + 1
    setUserMessageCount(newCount)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, pageContext }),
      })

      if (!response.ok) throw new Error('Errore nella risposta')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue
              try {
                const parsed = JSON.parse(data)
                if (parsed.delta) {
                  fullContent += parsed.delta
                  setStreamingContent(fullContent)
                }
              } catch {
                // skip malformed lines
              }
            }
          }
        }
      }

      setMessages((prev) => {
        const withAssistant = [...prev, { role: 'assistant' as const, content: fullContent }]

        // Dopo WHATSAPP_ESCALATION_AFTER scambi, se FIMA non ha ancora indirizzato
        // l'utente a una URL di conversione, propone WhatsApp attivamente
        if (
          newCount >= WHATSAPP_ESCALATION_AFTER &&
          !whatsAppProposalSent
        ) {
          const hasConversion = withAssistant.some(
            (m) => m.role === 'assistant' && CONVERSION_URLS.some((url) => m.content.includes(url))
          )
          if (!hasConversion) {
            setWhatsAppProposalSent(true)
            return [...withAssistant, { role: 'assistant', content: WHATSAPP_ESCALATION_MESSAGE }]
          }
        }

        return withAssistant
      })
      setStreamingContent('')
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Mi dispiace, si è verificato un errore. Riprova o contattaci direttamente al +39 06 96883381.',
        },
      ])
      setStreamingContent('')
    } finally {
      setIsLoading(false)
    }
  }

  // Mostra il CTA WhatsApp dopo WHATSAPP_ESCALATION_AFTER messaggi dell'utente
  const showWhatsAppCta = userMessageCount >= WHATSAPP_ESCALATION_AFTER

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat window */}
      {isOpen && (
        <div
          id="fima-chat-window"
          role="dialog"
          aria-label="Chat con FIMA — assistente virtuale FIM Insurance Broker"
          className="mb-4 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-up"
          style={{ height: '500px' }}
        >
          {/* Header */}
          <div className="gradient-primary px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-logo rounded-full flex items-center justify-center font-black text-white text-sm">
                F
              </div>
              <div>
                <div className="text-white font-bold text-sm">FIMA</div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-white/70 text-xs">Assistente virtuale</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Chiudi chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 chat-messages"
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Messaggi della conversazione"
            aria-busy={isLoading}
          >
            {messages.map((msg, i) => (
              <ChatBubble key={i} role={msg.role} content={msg.content} />
            ))}
            {streamingContent && (
              <ChatBubble role="assistant" content={streamingContent} isStreaming />
            )}
            {isLoading && !streamingContent && (
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full gradient-logo text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  F
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex-shrink-0">
              <p className="text-xs text-gray-500 mb-2">Domande frequenti:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-gray-100 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp escalation CTA — dopo N messaggi */}
          {showWhatsAppCta && (
            <div className="px-4 pb-3 flex-shrink-0 animate-fade-in">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Ciao, vorrei parlare con un consulente FIM Insurance Broker.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Parla con un consulente su WhatsApp
              </a>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrivi un messaggio..."
                disabled={isLoading}
                aria-label="Messaggio per FIMA"
                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Invia"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setHasProactiveBadge(false) }}
        className="relative w-14 h-14 gradient-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label={isOpen ? 'Chiudi chat' : 'Apri chat FIMA'}
        aria-expanded={isOpen}
        aria-controls="fima-chat-window"
      >
        {hasProactiveBadge && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce-slow" />
        )}
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-light rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </div>
  )
}
