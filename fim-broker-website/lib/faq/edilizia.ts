import type { FaqCategory } from '.'

export const ediliziaFaq: FaqCategory = {
  slug: 'edilizia',
  title: 'Polizze per l\'Edilizia',
  cta: {
    text: 'Hai un cantiere in partenza o una gara da preparare?',
    description: 'Quotazione rapida CAR, postuma decennale e fideiussioni. Tempi 48-72h.',
    primary: { label: 'Richiedi quotazione', href: '/preventivo?profilo=edilizia' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'La polizza CAR è obbligatoria per legge?',
      answer:
        "La CAR (Contractors All Risk) non è obbligatoria per legge in senso stretto, ma è quasi sempre richiesta dai capitolati di gara — sia in appalti pubblici (in base al D.Lgs. 36/2023) che privati. Per opere finanziate o vendute al consumatore finale è inoltre prassi consolidata richiederla. Senza CAR, l'impresa risponde con il proprio patrimonio dei danni in cantiere.",
    },
    {
      question: 'Quanto costa una polizza CAR per un cantiere medio?',
      answer:
        "Il premio dipende dal valore dell'opera, dalla durata dei lavori, dalla tipologia (nuova costruzione, ristrutturazione, demolizione) e dalla presenza di rischi particolari (cantieri in centri storici, vicino a opere preesistenti, scavi profondi). Indicativamente, per un cantiere residenziale di media complessità, il premio CAR oscilla tra lo 0,3% e l'1% del valore dell'opera. Confrontiamo offerte di compagnie specializzate (Generali, AXA, HDI, ITAS) per ottimizzare il rapporto copertura/prezzo.",
    },
    {
      question: 'Posso ottenere una fideiussione anche se la mia banca dice di no?',
      answer:
        'Sì. FIM lavora con compagnie e intermediari fideiussori specializzati che valutano le pratiche con criteri diversi rispetto agli istituti bancari. Spesso accettano imprese edili di piccole e medie dimensioni che faticano a ottenere fidi bancari, basandosi su bilanci, casellario imprese e regolarità contributiva. Tempi di rilascio: tipicamente 48-72 ore per cauzioni standard.',
    },
    {
      question: 'La decennale postuma copre anche le ristrutturazioni?',
      answer:
        "La decennale postuma del D.M. 154/2016 è obbligatoria per gli immobili di nuova costruzione venduti al consumatore. Per le ristrutturazioni rilevanti esistono polizze postume specifiche (2, 5 o 10 anni) che coprono vizi e difetti dell'opera secondo l'art. 1669 del Codice Civile. Per interventi del Superbonus 110%, alcune coperture postume sono richieste anche dal protocollo di asseverazione.",
    },
  ],
}
