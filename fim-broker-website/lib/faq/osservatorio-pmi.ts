import type { FaqCategory } from '.'
import { OBBLIGO_CATASTROFALE } from '@/lib/catastrofale'

export const osservatorioPmiFaq: FaqCategory = {
  slug: 'osservatorio-pmi',
  title: 'Osservatorio Prezzi PMI',
  cta: {
    text: 'Vuoi una stima personalizzata per la tua impresa?',
    description: 'Calcolatore di rischio gratuito basato su settore, dimensione ed esposizione reale.',
    primary: { label: '📊 Calcola rischio', href: '/calcolatore-rischi' },
    secondary: { label: 'Richiedi preventivo', href: '/preventivo?profilo=pmi' },
  },
  items: [
    {
      question: 'Quanto costa in media un pacchetto assicurativo per una PMI?',
      answer:
        'Come ordine di grandezza, per una PMI con 5–20 dipendenti il pacchetto va da circa €2.000 a €15.000 l\'anno a seconda del settore e delle coperture. Manifattura e costruzioni pagano di più per il rischio fisico, il terziario spende meno sui beni e di più su RC e cyber. Sono valori di orientamento FIM, non una media misurata: il numero vero lo dà un preventivo.',
    },
    {
      question: 'La polizza catastrofale è obbligatoria per le imprese?',
      answer: OBBLIGO_CATASTROFALE,
    },
    {
      question: 'Cosa include la RC Impresa e quanto costa?',
      answer:
        "La RC Impresa copre i danni causati a terzi nell'esercizio dell'attività. Il costo dipende da fatturato, numero di dipendenti e settore: come ordine di grandezza, per una PMI con fatturato fino a €500K la sola RC parte da €600–1.200 l'anno. Molte imprese la affiancano a una polizza All Risk sui beni.",
    },
    {
      question: 'Il Cyber Risk Insurance è necessario per le PMI?',
      answer:
        "Il D.Lgs. 138/2024, che recepisce la direttiva NIS2, si applica a una parte delle imprese italiane e chiede loro di curare anche la sicurezza dei fornitori: chi lavora per loro se lo vede chiedere a cascata. Anche senza obblighi, un attacco informatico costa fermo operativo, recupero dei dati e danni di reputazione. Come ordine di grandezza, una polizza cyber di base parte da €800–1.500 l'anno.",
    },
    {
      question: "Come si calcola il premio di un'assicurazione aziendale?",
      answer:
        'I fattori principali sono: settore di attività (codice ATECO), fatturato annuo, numero di dipendenti, presenza di impianti/macchinari, storico sinistri, e coperture richieste. Un broker indipendente come FIM può confrontare le offerte di 20 compagnie per trovare il miglior rapporto qualità-prezzo.',
    },
  ],
}
