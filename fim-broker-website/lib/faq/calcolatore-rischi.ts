import type { FaqCategory } from '.'
import { OBBLIGO_CATASTROFALE } from '@/lib/catastrofale'

/**
 * Domande frequenti della pagina /calcolatore-rischi.
 *
 * Fino al 31/10/2026 stavano solo nel JSON-LD, invisibili sulla pagina: Google
 * vuole che il markup FAQ corrisponda a testo che il visitatore vede. Ora le
 * mostra FaqSection, che genera anche lo schema. Non è registrata in ALL_FAQS
 * per non cambiare la pagina /faq.
 */
export const calcolatoreRischiFaq: FaqCategory = {
  slug: 'calcolatore-rischi',
  title: 'Analisi del rischio assicurativo',
  cta: {
    text: 'Hai già delle polizze e vuoi sapere se bastano?',
    description:
      'Mandaci i contratti che hai. Li leggiamo per intero e ti diciamo dove sei scoperto e dove paghi due volte la stessa cosa.',
    primary: { label: 'Richiedi la Second Opinion', href: '/seconda-opinione' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: "L'analisi del rischio è davvero gratuita?",
      answer:
        "Sì, per te non costa niente e non ti impegna a nulla. Il calcolatore ti chiede nome ed email solo per mostrarti il risultato e mandartene il riepilogo. Se poi decidi di assicurarti tramite FIM, il nostro compenso lo paga la compagnia con cui colloca il contratto: è il modo in cui lavorano i broker e lo diciamo apertamente.",
    },
    {
      question: 'Come funziona il calcolatore del rischio assicurativo?',
      answer:
        "Scegli il tuo profilo (privato, professionista, PMI o impresa strutturata), il settore e rispondi ad alcune domande sulla tua situazione. Il calcolatore assegna un punteggio di rischio da 0 a 100 e mette in ordine le coperture: prima quelle urgenti, poi quelle importanti, infine quelle consigliate, ognuna con il motivo per cui te la suggerisce.",
    },
    {
      question: 'Il risultato è un preventivo?',
      answer:
        "No. Ti dice quali coperture guardare per prime, non quanto costano. Il premio lo calcola la compagnia sui tuoi dati: settore, dimensione, valori da assicurare e garanzie scelte. Per averlo serve un preventivo, che ti prepariamo gratis con le offerte di più compagnie a confronto.",
    },
    {
      question: 'Quali coperture vengono suggerite?',
      answer:
        "Dipende dal profilo. A un privato di solito casa, vita, salute e auto. A un professionista RC professionale, tutela legale e cyber. A una PMI RC impresa, incendio e furto, cyber, flotta e polizze per i dipendenti. Alle imprese anche la catastrofale, che per quasi tutte è obbligatoria.",
    },
    {
      question: 'La polizza catastrofale è obbligatoria per le imprese?',
      answer: OBBLIGO_CATASTROFALE,
    },
  ],
}
