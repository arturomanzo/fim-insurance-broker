/**
 * Testi di trasparenza sull'uso dell'intelligenza artificiale.
 *
 * Centralizzati qui perché usati in più punti (chatbot FIMA, agente sinistri,
 * analisi polizza, blog). Servono a soddisfare gli obblighi di trasparenza
 * dell'AI Act (Reg. UE 2024/1689, art. 50), che richiede di informare l'utente
 * quando interagisce con un sistema di IA o legge contenuti generati da IA.
 *
 * Nota: non è consulenza legale. Il testo va validato dal consulente compliance.
 */
export const AI_DISCLOSURE = {
  /** Chatbot FIMA — interazione diretta con un sistema di IA (art. 50.1). */
  chat:
    'Stai parlando con un assistente basato su intelligenza artificiale. Le risposte possono contenere imprecisioni e non sostituiscono la consulenza di un nostro broker.',

  /** Agente Sinistri AI — interazione diretta con un sistema di IA (art. 50.1). */
  sinistri:
    'Stai interagendo con un assistente basato su intelligenza artificiale. Le informazioni sono indicative; la tua pratica sarà comunque verificata da un operatore FIM.',

  /** Report "Analizza Polizza" — output generato da IA, non vincolante. */
  report:
    'Report generato automaticamente da un sistema di intelligenza artificiale, a scopo puramente informativo e indicativo. Non costituisce una valutazione di adeguatezza ai sensi della normativa IVASS né una consulenza personalizzata. Per decisioni sulle tue coperture, parla con un nostro consulente.',

  /** Articoli blog redatti con supporto IA e revisione editoriale umana (art. 50.4). */
  blog:
    'Questo articolo è stato redatto con il supporto di strumenti di intelligenza artificiale e revisionato dal team di FIM Insurance Broker. Ha finalità informative e non sostituisce una consulenza assicurativa personalizzata.',
} as const

export type AiDisclosureKey = keyof typeof AI_DISCLOSURE
