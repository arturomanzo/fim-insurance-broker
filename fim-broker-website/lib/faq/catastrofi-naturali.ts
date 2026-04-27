import type { FaqCategory } from '.'

export const catastrofiNaturaliFaq: FaqCategory = {
  slug: 'catastrofi-naturali',
  title: 'Catastrofi Naturali',
  cta: {
    text: 'La tua azienda è in regola con la polizza catastrofale obbligatoria 2025?',
    description: 'Verifica gratuita della tua copertura attuale e quotazione su misura.',
    primary: { label: 'Richiedi verifica', href: '/preventivo?profilo=catastrofale' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'La polizza casa standard copre già le alluvioni?',
      answer:
        "Generalmente no. Le polizze casa classiche coprono incendio e furto, ma gli eventi atmosferici (alluvione, esondazione, frana) sono spesso esclusi o richiedono un'estensione specifica. Molti italiani lo scoprono solo al momento del sinistro, quando è troppo tardi. Verifica la tua polizza attuale: FIM può fare un'analisi gratuita.",
    },
    {
      question: 'Dal 2025 le aziende devono obbligatoriamente assicurarsi per le catastrofi naturali?',
      answer:
        'Sì. La Legge di Bilancio 2024 (L. 213/2023, art. 1 comma 101-111) ha introdotto l\'obbligo per tutte le imprese con sede in Italia, iscritte al Registro delle Imprese, di stipulare entro il 31 marzo 2025 una polizza che copra terremoto, alluvione, frana, inondazione ed esondazione sui propri immobili, terreni, impianti e macchinari iscritti in bilancio. Le aziende senza copertura rischiano sanzioni e potrebbero essere escluse da aiuti pubblici post-catastrofe. Contattaci subito se non sei ancora in regola.',
    },
    {
      question: "Cosa si intende esattamente per 'catastrofe naturale' assicurabile?",
      answer:
        "Le coperture catastrofali tipicamente includono: terremoto/sisma, alluvione ed esondazione (tracimazione di fiumi e corsi d'acqua), frana e smottamento, maremoto, eruzione vulcanica, e sinkholes (voragini). La grandine viene solitamente trattata come 'evento atmosferico' e spesso ha una copertura separata. Ogni polizza ha la propria definizione: ti aiutiamo a capire esattamente cosa copre la tua.",
    },
    {
      question: "Come viene calcolato il risarcimento dopo un'alluvione?",
      answer:
        'Il risarcimento dipende da: (1) il valore assicurato (deve corrispondere al valore reale di ricostruzione — occhio alla sottoassicurazione), (2) la franchigia (una parte del danno a carico dell\'assicurato, solitamente 2-10%), (3) il massimale della polizza. In caso di sinistro, la compagnia invia un perito per valutare i danni. FIM segue i propri clienti durante tutto il processo liquidativo.',
    },
    {
      question: 'Abito in una zona a rischio alluvione: posso comunque assicurarmi?',
      answer:
        'Sì, anche se alcune zone ad alto rischio possono avere premi più elevati o alcune compagnie possono non assicurarle. La buona notizia è che con la nuova legge sulle catastrofi naturali per le imprese, il governo sta lavorando a un sistema di pool assicurativo che garantisca la copertura anche nelle zone più esposte. FIM conosce le compagnie disponibili ad assicurare ogni tipo di zona.',
    },
  ],
}
