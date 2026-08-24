'use client'

import { useState, useRef, useEffect } from 'react'
import ChatBubble from './ChatBubble'
import AiNotice from '@/components/ui/AiNotice'
import { AI_DISCLOSURE } from '@/lib/ai-disclosure'
import { FIMA_CONFIG } from '@/lib/fima-config'

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
  if (path.includes('cyber')) return [
    "Cos'è una polizza cyber risk?",
    "La NIS2 mi obbliga ad assicurarmi?",
    "Cosa succede se subisco un ransomware?",
    "Quanto costa una polizza cyber per la mia azienda?",
  ]
  if (path.includes('welfare')) return [
    "Cos'è il welfare aziendale assicurativo?",
    "Le polizze welfare sono deducibili?",
    "Quali benefit posso offrire ai miei dipendenti?",
    "Come funziona una polizza sanitaria collettiva?",
  ]
  if (path.includes('seconda-opinione')) return [
    "Come funziona la seconda opinione?",
    "È gratuita l'analisi della mia polizza?",
    "Posso confrontare più polizze insieme?",
    "Cosa succede dopo l'analisi?",
  ]
  if (path.includes('analizza-polizza')) return [
    "Come funziona l'analisi della polizza?",
    "Quali formati di file posso caricare?",
    "L'analisi è riservata?",
    "Cosa trovo nel report finale?",
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

// Mostrare il CTA WhatsApp dopo questo numero di scambi (messaggi utente)
const WHATSAPP_ESCALATION_AFTER = 3

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393801234567'

const MAX_MESSAGES_WARNING = FIMA_CONFIG.maxMessages

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
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [userMessageCount, setUserMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setStreamingContent('')
    setUserMessageCount((c) => c + 1)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], pageContext }),
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

      setMessages((prev) => [...prev, { role: 'assistant', content: fullContent }])
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
  // Avviso limite messaggi vicino (ultimi 3 messaggi disponibili)
  const messagesRemaining = MAX_MESSAGES_WARNING - userMessageCount
  const showLimitWarning = messagesRemaining <= 3 && messagesRemaining > 0
  const showLimitReached = userMessageCount >= MAX_MESSAGES_WARNING

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

          {/* Disclosure IA — AI Act art. 50 */}
          <AiNotice text={AI_DISCLOSURE.chat} variant="bar" className="flex-shrink-0" />

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
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-primary transition-colors"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Parla con un consulente su WhatsApp
              </a>
            </div>
          )}

          {/* Avviso limite messaggi */}
          {showLimitWarning && (
            <div className="px-4 pb-2 flex-shrink-0">
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-center">
                Hai ancora {messagesRemaining} {messagesRemaining === 1 ? 'messaggio' : 'messaggi'} disponibili. Per continuare, contatta un consulente.
              </p>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 flex-shrink-0">
            {showLimitReached ? (
              <div className="text-center py-2">
                <p className="text-xs text-gray-500 mb-2">Hai raggiunto il limite di questa conversazione.</p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Ciao, vorrei continuare la conversazione con un consulente FIM Insurance Broker.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-primary transition-colors"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Continua su WhatsApp
                </a>
              </div>
            ) : (
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
            )}
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 gradient-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label={isOpen ? 'Chiudi chat' : 'Apri chat FIMA'}
        aria-expanded={isOpen}
        aria-controls="fima-chat-window"
      >
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
