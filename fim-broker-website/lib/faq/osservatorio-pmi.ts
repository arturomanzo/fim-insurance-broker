import type { FaqCategory } from '.'

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
        'Il costo medio annuo per una PMI con 5–20 dipendenti varia tra €2.800 e €12.000 a seconda del settore e delle coperture scelte. Le imprese manifatturiere e costruzioni pagano di più (rischio fisico elevato), mentre il terziario tende a spendere meno per i rischi materiali ma di più per RC e cyber.',
    },
    {
      question: 'La polizza catastrofale è obbligatoria per le imprese nel 2025?',
      answer:
        "Sì. Il D.L. 18/2023 convertito con L. 17/2024 ha introdotto l'obbligo di assicurazione contro le calamità naturali (alluvioni, terremoti, frane, inondazioni) per tutte le imprese con sede legale in Italia a partire dal 1° aprile 2025. Le imprese non in regola rischiano sanzioni e l'esclusione da contributi pubblici.",
    },
    {
      question: 'Cosa include la RC Impresa e quanto costa?',
      answer:
        "La RC Impresa copre i danni causati a terzi nell'esercizio dell'attività. Il costo dipende dal fatturato, numero di dipendenti e settore: per una PMI con fatturato fino a €500K si parte da €600–1.200/anno per la sola RC. Molte imprese la integrano con polizze All-Risk per una copertura completa.",
    },
    {
      question: 'Il Cyber Risk Insurance è necessario per le PMI?',
      answer:
        "Con l'entrata in vigore del Regolamento NIS2 (ottobre 2024), migliaia di PMI italiane rientrano nell'ambito di applicazione. Anche senza obbligo diretto, il costo medio di un attacco ransomware per una PMI italiana è di €85.000 tra fermo operativo, recupero dati e danni reputazionali. Una polizza cyber entry-level parte da €800–1.500/anno.",
    },
    {
      question: "Come si calcola il premio di un'assicurazione aziendale?",
      answer:
        'I fattori principali sono: settore di attività (codice ATECO), fatturato annuo, numero di dipendenti, presenza di impianti/macchinari, storico sinistri, e coperture richieste. Un broker indipendente come FIM può confrontare le offerte di 30+ compagnie per trovare il miglior rapporto qualità-prezzo.',
    },
  ],
}
