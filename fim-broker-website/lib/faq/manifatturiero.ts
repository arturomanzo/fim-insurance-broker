import type { FaqCategory } from '.'

export const manifatturieroFaq: FaqCategory = {
  slug: 'manifatturiero',
  title: 'Polizze per il Manifatturiero',
  cta: {
    text: 'Vuoi una valutazione completa del rischio della tua impresa manifatturiera?',
    description: 'Analisi gap su Property, BI, RC Prodotto e Catastrofale. Senza impegno.',
    primary: { label: 'Prenota Consulenza', href: '/prenota-consulenza' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: "Cos'è la Business Interruption e perché è così importante?",
      answer:
        "La Business Interruption (BI) è la copertura che indennizza il mancato margine di contribuzione e i costi fissi che l'azienda continua a sostenere durante il periodo di fermo produzione causato da un sinistro indennizzabile (incendio, allagamento, danno macchinario, ecc.). Senza BI, anche un'impresa con polizza Property completa rischia di non riprendersi: quando il capannone o le macchine vengono ripristinati, i clienti potrebbero aver già spostato gli ordini su altri fornitori. La BI è la copertura che statisticamente fa la differenza tra le aziende che riaprono dopo un sinistro grave e quelle che chiudono definitivamente.",
    },
    {
      question: 'Vendo i miei prodotti negli Stati Uniti: la mia RC prodotto è valida?',
      answer:
        "La maggior parte delle polizze RC Prodotto italiane esclude espressamente USA, Canada e talvolta UK perché in questi paesi vige un sistema di responsabilità (strict liability, punitive damages, class action) che genera richieste danni di ordini di grandezza superiori a quelli italiani ed europei. Per esportare in sicurezza serve un'estensione territoriale specifica con limiti dedicati e a volte una polizza separata. FIM lavora con compagnie internazionali (AIG, Zurich, Allianz Global Corporate) specializzate nella copertura export USA/UK.",
    },
    {
      question: "L'obbligo catastrofi naturali del 2025 si applica anche alle PMI?",
      answer:
        "Sì. La L. 213/2023 (Legge di Bilancio 2024), art. 1 comma 101, ha introdotto per tutte le imprese iscritte al Registro Imprese — dalle ditte individuali alle grandi società — l'obbligo di stipulare entro il 31/03/2025 (poi prorogato) una copertura assicurativa contro i danni causati da terremoti, alluvioni, frane, inondazioni ed esondazioni su immobili, terreni, impianti e attrezzature. La mancata adesione comporta sanzioni e l'esclusione da contributi e agevolazioni statali. Per le micro e piccole imprese sono previste tempistiche e modalità adattate.",
    },
    {
      question: 'Come si valutano i massimali su una polizza All Risk industriale?',
      answer:
        'I massimali Property si determinano sui valori a nuovo dei beni assicurati: capannone (costo di ricostruzione a regola d\'arte, non valore di mercato), macchinari (valore a nuovo non ammortizzato), scorte (valore di acquisto medio nei 12 mesi). Per la Business Interruption il massimale si calcola sul margine di contribuzione (fatturato meno costi variabili) per il periodo massimo di indennizzo (tipicamente 12-18-24 mesi). Una sotto-assicurazione attiva la "regola proporzionale": il sinistro viene indennizzato in proporzione al rapporto tra valore assicurato e valore reale.',
    },
  ],
}
