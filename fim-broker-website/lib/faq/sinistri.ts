import type { FaqCategory } from '.'

export const sinistriFaq: FaqCategory = {
  slug: 'sinistri',
  title: 'Gestione Sinistri',
  cta: {
    text: 'Hai un sinistro aperto adesso?',
    description: 'Contattaci subito — ogni ora conta nella gestione di un sinistro.',
    primary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
    secondary: { label: 'Apri pratica online', href: '/sinistri' },
  },
  items: [
    {
      question: 'Quanto tempo ho per denunciare un sinistro?',
      answer:
        "I tempi variano in base al tipo di polizza, ma in generale è bene denunciare entro 3 giorni dall'evento. Per la RC Auto il termine è di 3 giorni dall'incidente. Contattaci subito: ti diciamo esattamente cosa fare.",
    },
    {
      question: 'Cosa succede se la compagnia non mi vuole risarcire?',
      answer:
        "In caso di diniego o liquidazione parziale ingiusta, FIM può richiedere perizie di parte, attivare la procedura di mediazione assicurativa o supportarti nel ricorso all'IVASS. Non sei solo.",
    },
    {
      question: 'Il servizio di gestione sinistri ha un costo aggiuntivo?',
      answer:
        'No. La gestione del sinistro è inclusa nel servizio di brokeraggio per tutti i clienti FIM. È uno dei principali vantaggi di avere un broker al tuo fianco rispetto ad acquistare direttamente da una compagnia.',
    },
    {
      question: 'Posso gestire il sinistro anche se la polizza non è stata stipulata con FIM?',
      answer:
        'Possiamo affiancarti anche in questo caso. Contattaci per una consulenza: valuteremo insieme la situazione e ti indicheremo il percorso migliore.',
    },
  ],
}
