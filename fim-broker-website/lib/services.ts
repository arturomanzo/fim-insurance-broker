export interface Service {
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  color: string
  image: string
  features: string[]
  benefits: string[]
  faq: Array<{ question: string; answer: string }>
  priceFrom: string
  priceNote: string
}

export const services: Service[] = [
  {
    slug: 'assicurazione-auto',
    title: 'Assicurazione Auto',
    shortDescription: 'RC Auto, Kasko, Furto e Incendio. Copertura completa per il tuo veicolo ai migliori prezzi.',
    description:
      'Proteggi il tuo veicolo con le soluzioni assicurative più complete del mercato. Da FIM trovi polizze personalizzate per ogni esigenza, dalla semplice RC obbligatoria fino alla Kasko totale.',
    icon: '🚗',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&fit=crop&auto=format',
    features: [
      'RC Auto obbligatoria',
      'Kasko completa o parziale',
      'Furto e incendio',
      'Assistenza stradale 24/7',
      'Tutela legale',
      'Infortuni del conducente',
    ],
    benefits: [
      'Confronto tra le migliori compagnie',
      'Risparmio fino al 30%',
      'Liquidazione sinistri rapida',
      'Consulente dedicato',
    ],
    faq: [
      {
        question: "Cosa include la RC Auto obbligatoria?",
        answer:
          'La RC Auto copre i danni causati a terzi (persone e cose) in caso di incidente. Non copre i danni al tuo veicolo.',
      },
      {
        question: 'Cosa è la polizza Kasko?',
        answer:
          'La Kasko copre i danni al tuo veicolo indipendentemente da chi ha causato il sinistro, inclusi incidenti colpa tua, grandine e altri eventi.',
      },
    ],
    priceFrom: 'da 250€/anno',
    priceNote: 'RC Auto base. Kasko e garanzie accessorie a partire da 80€ in più.',
  },
  {
    slug: 'assicurazione-vita',
    title: 'Assicurazione Vita e Previdenza',
    shortDescription: 'Proteggi il futuro tuo e della tua famiglia con piani vita e previdenziali su misura.',
    description:
      'Le polizze vita FIM garantiscono serenità finanziaria a te e alla tua famiglia. Offriamo soluzioni temporanee caso morte, miste, unit-linked e piani di accumulo previdenziale.',
    icon: '❤️',
    color: 'red',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&fit=crop&auto=format',
    features: [
      'Vita temporanea caso morte',
      'Polizze miste',
      'Unit-linked e Index-linked',
      'Piani previdenziali integrativi',
      'Invalidità permanente',
      'Gravi malattie (Dread Disease)',
    ],
    benefits: [
      'Pianificazione fiscale vantaggiosa',
      'Deducibilità dei premi',
      'Rendimento garantito',
      'Flessibilità nei versamenti',
    ],
    faq: [
      {
        question: 'Posso dedurre i premi vita dalle tasse?',
        answer:
          'Sì, i premi per polizze vita caso morte e invalidità permanente sono detraibili al 19% fino a 530€ annui.',
      },
      {
        question: "Cos'è una polizza unit-linked?",
        answer:
          'Una unit-linked collega il capitale assicurato alle performance di fondi di investimento, combinando protezione e potenziale di crescita.',
      },
    ],
    priceFrom: 'da 15€/mese',
    priceNote: 'Polizza temporanea caso morte. Piani previdenziali da 50€/mese.',
  },
  {
    slug: 'assicurazione-casa',
    title: 'Assicurazione Casa',
    shortDescription: 'Polizze complete per la tua abitazione: incendio, furto, RC del proprietario e molto altro.',
    description:
      'La tua casa è il tuo bene più prezioso. FIM offre polizze globali fabbricato e multirischio casa che coprono ogni tipo di danno, dal furto agli eventi atmosferici.',
    icon: '🏠',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&fit=crop&auto=format',
    features: [
      'Incendio e scoppio',
      'Furto e rapina',
      'Danni da acqua',
      'Responsabilità civile proprietario',
      'Eventi atmosferici',
      'Assistenza casa 24/7',
    ],
    benefits: [
      'Copertura fabbricato e contenuto',
      'Valore a nuovo per i sinistri',
      'Perizia veloce',
      'Premi competitivi',
    ],
    faq: [
      {
        question: 'La polizza casa copre anche il condominio?',
        answer:
          'Le polizze globale fabbricato coprono le parti comuni del condominio. Le polizze multirischio coprono invece appartamento e contenuto.',
      },
      {
        question: 'Cosa si intende per RC del proprietario?',
        answer:
          "Copre i danni accidentali causati a terzi connessi alla proprietà o alla conduzione dell'abitazione.",
      },
    ],
    priceFrom: 'da 100€/anno',
    priceNote: 'Polizza base incendio e furto. Multirischio completo da 180€/anno.',
  },
  {
    slug: 'assicurazione-salute',
    title: 'Assicurazione Salute',
    shortDescription: 'Polizze sanitarie individuali e collettive per accedere alle migliori cure mediche.',
    description:
      'La salute è il bene più prezioso. Le nostre polizze sanitarie ti garantiscono accesso alle migliori strutture private, rimborso spese mediche e indennità per infortuni.',
    icon: '🏥',
    color: 'teal',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&fit=crop&auto=format',
    features: [
      'Ricoveri ospedalieri',
      'Visite specialistiche',
      'Accertamenti diagnostici',
      'Rimborso farmaci',
      'Indennità da infortuni',
      'Long term care',
    ],
    benefits: [
      'Accesso a strutture private di eccellenza',
      "Nessuna lista d'attesa",
      'Rete di medici convenzionati',
      'Rimborso rapido',
    ],
    faq: [
      {
        question: 'Posso assicurare anche i miei familiari?',
        answer:
          'Sì, offriamo polizze familiari che coprono il nucleo familiare con premi vantaggiosi rispetto alle polizze individuali.',
      },
      {
        question: "Sono coperto anche all'estero?",
        answer:
          "Molte nostre polizze prevedono copertura internazionale, ideale per chi viaggia o vive periodi all'estero.",
      },
    ],
    priceFrom: 'da 25€/mese',
    priceNote: 'Polizza individuale con ricoveri. Piani famiglia da 60€/mese.',
  },
  {
    slug: 'polizze-aziendali',
    title: 'Polizze Aziendali',
    shortDescription: 'Soluzioni assicurative complete per imprese: RC, D&O, cyber risk, property e benefit aziendali.',
    description:
      'FIM è il partner assicurativo di fiducia per le imprese. Dalla RC professionale alla cyber risk, dalle polizze property ai piani welfare aziendale, proteggiamo ogni aspetto della tua attività.',
    icon: '🏢',
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop&auto=format',
    features: [
      'Responsabilità civile professionale',
      'Directors & Officers (D&O)',
      'Cyber risk e data breach',
      'Property e property all-risk',
      'Infortuni dipendenti',
      'Benefit e welfare aziendale',
    ],
    benefits: [
      'Analisi personalizzata dei rischi',
      'Programmi assicurativi dedicati',
      'Claims management',
      'Risk consulting',
    ],
    faq: [
      {
        question: "Cos'è la RC professionale?",
        answer:
          "Copre i danni causati ai clienti nell'esercizio dell'attività professionale, tutelandoti da richieste di risarcimento per errori o omissioni.",
      },
      {
        question: "Perché un'azienda ha bisogno della cyber risk?",
        answer:
          'Copre i costi conseguenti a violazioni di dati, attacchi informatici, interruzioni di business e sanzioni per violazioni del GDPR.',
      },
    ],
    priceFrom: 'su preventivo',
    priceNote: 'RC impresa da 300€/anno. Pacchetti completi da 800€/anno.',
  },
  {
    slug: 'assicurazione-viaggio',
    title: 'Assicurazione Viaggio',
    shortDescription: 'Viaggia sereno con coperture mediche, annullamento viaggio e bagagli in tutto il mondo.',
    description:
      'Parti senza preoccupazioni con le polizze viaggio FIM. Dalla gita in Europa al viaggio intercontinentale, copriamo spese mediche, annullamento, ritardi e perdita bagagli.',
    icon: '✈️',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&fit=crop&auto=format',
    features: [
      'Spese mediche allestero',
      'Rimpatrio durgenza',
      'Annullamento del viaggio',
      'Ritardo volo e bagaglio',
      'Responsabilità civile',
      'Assistenza H24 worldwide',
    ],
    benefits: [
      'Copertura fino a 5 milioni € spese mediche',
      'Assistenza multilingue 24/7',
      'Emissione istantanea online',
      'Polizze individuali e familiari',
    ],
    faq: [
      {
        question: 'Posso stipulare la polizza dopo essere già partito?',
        answer:
          'No, la polizza viaggio deve essere stipulata prima della partenza per essere valida.',
      },
      {
        question: 'È obbligatoria la polizza viaggio?',
        answer:
          'Non è obbligatoria ma è fortemente consigliata, specialmente per viaggi extra-UE dove le spese mediche possono essere molto elevate.',
      },
    ],
    priceFrom: 'da 15€ a viaggio',
    priceNote: 'Singolo viaggio Europa. Long-stay e polizze annuali disponibili.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export const serviceColorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800',
  red: 'bg-red-100 text-red-800',
  green: 'bg-green-100 text-green-800',
  teal: 'bg-teal-100 text-teal-800',
  purple: 'bg-purple-100 text-purple-800',
  orange: 'bg-orange-100 text-orange-800',
}
