import type { FaqCategory } from '.'

export const ediliziaFaq: FaqCategory = {
  slug: 'edilizia',
  title: 'Polizze per l\'Edilizia',
  cta: {
    text: 'Hai un cantiere in partenza o una gara da preparare?',
    description: 'CAR, postuma decennale e fideiussioni: partiamo dal capitolato e ti diciamo cosa serve davvero.',
    primary: { label: 'Richiedi quotazione', href: '/preventivo?profilo=pmi&settore=Edilizia' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'La polizza CAR è obbligatoria per legge?',
      answer:
        "Nei lavori pubblici sì. L'art. 117, comma 10, del D.Lgs. 36/2023 obbliga l'esecutore a consegnare alla stazione appaltante, almeno dieci giorni prima della consegna dei lavori, una polizza che copra i danni a opere e impianti durante l'esecuzione e la responsabilità civile verso terzi. Nei lavori privati non c'è un obbligo di legge, ma la chiedono quasi sempre il committente o la banca che finanzia l'opera. Senza CAR, i danni in cantiere li paga l'impresa.",
    },
    {
      question: 'Quanto costa una polizza CAR per un cantiere medio?',
      answer:
        "Il premio lo calcola la compagnia sul singolo cantiere: valore dell'opera, durata dei lavori, tipologia (nuova costruzione, ristrutturazione, demolizione) e rischi particolari come centri storici, opere preesistenti vicine o scavi profondi. Una percentuale valida per tutti non esiste. Confrontiamo le offerte delle compagnie con cui lavoriamo e ti diamo il premio sul tuo cantiere, insieme alle condizioni che lo giustificano.",
    },
    {
      question: 'Posso ottenere una fideiussione anche se la mia banca dice di no?',
      answer:
        "A volte sì. La fideiussione assicurativa la rilascia una compagnia autorizzata al ramo cauzioni, che valuta l'impresa con criteri suoi: bilanci, regolarità contributiva, lavori già eseguiti. Può accettare un'impresa che la banca ha respinto, ma non è automatico, e i tempi dipendono dall'istruttoria. Noi prepariamo la pratica con i documenti che la compagnia chiederà e controlliamo che il testo della garanzia sia quello richiesto dal bando.",
    },
    {
      question: 'La decennale postuma copre anche le ristrutturazioni?',
      answer:
        "L'obbligo della decennale postuma (art. 4 del D.Lgs. 122/2005, con lo schema tipo del D.M. 20 luglio 2022 n. 154) riguarda il costruttore che vende a una persona fisica un immobile da costruire. Le ristrutturazioni restano fuori da quell'obbligo. Per i lavori importanti esistono però polizze postume volontarie, di durata variabile, che coprono i vizi e i difetti dell'opera di cui l'impresa risponde secondo l'art. 1669 del Codice Civile.",
    },
  ],
}
