import type { FaqCategory } from '.'
import { OBBLIGO_CATASTROFALE } from '@/lib/catastrofale'

export const osservatorioPmiFaq: FaqCategory = {
  slug: 'osservatorio-pmi',
  title: 'Osservatorio PMI',
  cta: {
    text: 'Vuoi sapere quali coperture servono alla tua impresa?',
    description: 'Calcolatore di rischio gratuito basato su settore, dimensione ed esposizione reale.',
    primary: { label: '📊 Calcola rischio', href: '/calcolatore-rischi' },
    secondary: { label: 'Richiedi preventivo', href: '/preventivo?profilo=pmi' },
  },
  items: [
    {
      question: 'Quanto costa in media un pacchetto assicurativo per una PMI?',
      answer:
        'Dipende da settore, dimensione e coperture, e una media valida per tutte non esiste. Manifattura e costruzioni pesano di più per il rischio fisico, il terziario spende meno sui beni e di più su RC e cyber. Il numero per la tua impresa lo dà un preventivo, con le offerte di più compagnie a confronto.',
    },
    {
      question: 'La polizza catastrofale è obbligatoria per le imprese?',
      answer: OBBLIGO_CATASTROFALE,
    },
    {
      question: 'Cosa include la RC Impresa e quanto costa?',
      answer:
        "La RC Impresa copre i danni causati a terzi nell'esercizio dell'attività. Il premio lo calcola la compagnia su fatturato, numero di dipendenti, settore e massimale. Molte imprese la affiancano a una polizza All Risk sui beni.",
    },
    {
      question: 'Il Cyber Risk Insurance è necessario per le PMI?',
      answer:
        "Il D.Lgs. 138/2024, che recepisce la direttiva NIS2, si applica a una parte delle imprese italiane e chiede loro di curare anche la sicurezza dei fornitori: chi lavora per loro se lo vede chiedere a cascata. Anche senza obblighi, un attacco informatico costa fermo operativo, recupero dei dati e danni di reputazione.",
    },
    {
      question: "Come si calcola il premio di un'assicurazione aziendale?",
      answer:
        'I fattori principali sono: settore di attività (codice ATECO), fatturato annuo, numero di dipendenti, presenza di impianti/macchinari, storico sinistri, e coperture richieste. Un broker indipendente come FIM può confrontare le offerte di 20 compagnie per trovare il miglior rapporto qualità-prezzo.',
    },
  ],
}
