export interface Service {
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  color: string
  features: string[]
  benefits: string[]
  faq: Array<{ question: string; answer: string }>
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
  },
  {
    slug: 'assicurazione-vita',
    title: 'Assicurazione Vita e Previdenza',
    shortDescription: 'Proteggi il futuro tuo e della tua famiglia con piani vita e previdenziali su misura.',
    description:
      'Le polizze vita FIM garantiscono serenità finanziaria a te e alla tua famiglia. Offriamo soluzioni temporanee caso morte, miste, unit-linked e piani di accumulo previdenziale.',
    icon: '❤️',
    color: 'red',
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
  },
  {
    slug: 'assicurazione-casa',
    title: 'Assicurazione Casa',
    shortDescription: 'Polizze complete per la tua abitazione: incendio, furto, RC del proprietario e molto altro.',
    description:
      'La tua casa è il tuo bene più prezioso. FIM offre polizze globali fabbricato e multirischio casa che coprono ogni tipo di danno, dal furto agli eventi atmosferici.',
    icon: '🏠',
    color: 'green',
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
  },
  {
    slug: 'assicurazione-salute',
    title: 'Assicurazione Salute',
    shortDescription: 'Polizze sanitarie individuali e collettive per accedere alle migliori cure mediche.',
    description:
      'La salute è il bene più prezioso. Le nostre polizze sanitarie ti garantiscono accesso alle migliori strutture private, rimborso spese mediche e indennità per infortuni.',
    icon: '🏥',
    color: 'teal',
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
        question: 'Sono coperto anche allestero?',
        answer:
          "Molte nostre polizze prevedono copertura internazionale, ideale per chi viaggia o vive periodi all'estero.",
      },
    ],
  },
  {
    slug: 'polizze-aziendali',
    title: 'Polizze Aziendali',
    shortDescription: 'Soluzioni assicurative complete per imprese: RC, D&O, cyber risk, property e benefit aziendali.',
    description:
      'FIM è il partner assicurativo di fiducia per le imprese. Dalla RC professionale alla cyber risk, dalle polizze property ai piani welfare aziendale, proteggiamo ogni aspetto della tua attività.',
    icon: '🏢',
    color: 'purple',
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
  },
  {
    slug: 'assicurazione-viaggio',
    title: 'Assicurazione Viaggio',
    shortDescription: 'Viaggia sereno con coperture mediche, annullamento viaggio e bagagli in tutto il mondo.',
    description:
      'Parti senza preoccupazioni con le polizze viaggio FIM. Dalla gita in Europa al viaggio intercontinentale, copriamo spese mediche, annullamento, ritardi e perdita bagagli.',
    icon: '✈️',
    color: 'orange',
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
