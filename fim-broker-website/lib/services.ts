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
        question: 'Cosa include la RC Auto obbligatoria?',
        answer: 'La RC Auto copre i danni causati a terzi (persone e cose) in caso di incidente. Non copre i danni al tuo veicolo: per quello servono garanzie accessorie come la Kasko o la copertura eventi naturali.',
      },
      {
        question: 'Cosa è la polizza Kasko e quando conviene?',
        answer: 'La Kasko copre i danni al tuo veicolo indipendentemente da chi ha causato il sinistro: incidenti colpa tua, grandine, atti vandalici e danni in sosta. Conviene su auto nuove o di valore superiore a 15.000€, o se percorri molti km/anno.',
      },
      {
        question: 'Posso cambiare assicurazione auto a metà anno?',
        answer: 'Sì. Dopo il primo anno puoi disdire la polizza con 15 giorni di preavviso rispetto alla scadenza oppure aspettare la scadenza annuale. In alcuni casi la legge ti consente il recesso anticipato (es. vendita del veicolo, sinistro con liquidazione parziale).',
      },
      {
        question: 'Come funziona la classe di merito bonus/malus?',
        answer: 'La classe di merito va dalla 1 (la migliore) alla 18 (la peggiore). Ogni anno senza sinistri sali di una classe e paghi meno. Ogni sinistro con colpa retrocedi di 2 classi. FIM analizza la tua attestazione di rischio per trovare la compagnia più conveniente per il tuo profilo.',
      },
      {
        question: 'La mia polizza auto copre anche la grandine e gli eventi atmosferici?',
        answer: 'Dipende dalla polizza. La RC Auto base non copre gli eventi atmosferici. Servono garanzie specifiche: "Kasko eventi naturali" o "Furto e incendio con eventi atmosferici". Verifica le condizioni della tua polizza attuale o contattaci per un\'analisi gratuita.',
      },
      {
        question: 'Cosa fare subito dopo un incidente stradale?',
        answer: 'Compila e firma il Modulo CID (Constatazione Amichevole) con l\'altro conducente. Scatta foto ai danni e alla posizione dei veicoli. Entro 3 giorni denuncia il sinistro alla compagnia. Se ci sono feriti, chiama immediatamente il 118 e le forze dell\'ordine. Il nostro team sinistri ti affianca in ogni fase.',
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
        answer: 'Sì. I premi per polizze vita caso morte e invalidità permanente sono detraibili al 19% fino a 530€ annui (art. 15 TUIR). Le polizze previdenziali complementari sono invece deducibili dal reddito fino a 5.164,57€/anno.',
      },
      {
        question: "Cos'è una polizza unit-linked?",
        answer: 'Una unit-linked collega il capitale assicurato alle performance di fondi di investimento, combinando protezione assicurativa e potenziale di crescita finanziaria. Il capitale non è garantito ma offre maggiore rendimento potenziale rispetto alle polizze tradizionali a capitale garantito.',
      },
      {
        question: 'Quanto capitale dovrei assicurare con una polizza vita?',
        answer: 'La regola generale è 5-10 volte il reddito annuo netto, sufficienti a coprire il mutuo residuo, i costi di mantenimento della famiglia per 3-5 anni e le spese di istruzione dei figli. Un consulente FIM calcola con te il capitale necessario senza sovrastimare.',
      },
      {
        question: "Cosa succede se smetto di pagare i premi della polizza vita?",
        answer: 'Dipende dal tipo di polizza. Le temporanee caso morte cessano la copertura. Le polizze miste e le unit-linked possono essere messe "in riduzione" (si mantiene una copertura ridotta senza pagare premi) o riscattate (rimborso del valore accumulato, con possibili penali). Contattaci prima di sospendere i pagamenti.',
      },
      {
        question: "La polizza vita è pignorabile o tassabile in caso di eredità?",
        answer: 'No. Il capitale liquidato ai beneficiari di una polizza vita caso morte è esente dall\'imposta di successione (art. 12 D.Lgs. 346/1990) e non è pignorabile né sequestrabile (art. 1923 Codice Civile). È uno degli strumenti di protezione patrimoniale più efficaci.',
      },
      {
        question: 'Come scelgo i beneficiari della polizza vita?',
        answer: 'Puoi indicare chiunque: coniuge, figli, partner, terzi. I beneficiari non devono necessariamente essere gli eredi legali. Puoi cambiarli in qualsiasi momento, salvo che il beneficiario abbia già accettato per iscritto la designazione. Ti consigliamo di indicare anche un beneficiario secondario.',
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
        answer: 'Le polizze globale fabbricato coprono le parti comuni del condominio (scale, tetto, facciata). Le polizze multirischio abitazione coprono invece il singolo appartamento e il contenuto. Per il condominio esiste una polizza dedicata che va stipulata dall\'amministratore.',
      },
      {
        question: 'Cosa si intende per RC del proprietario?',
        answer: 'Copre i danni accidentali causati a terzi connessi alla proprietà o alla conduzione dell\'abitazione: ad esempio una perdita d\'acqua che danneggia l\'appartamento del vicino, o una tegola che cade su un\'auto in sosta. È fortemente consigliata anche per gli inquilini (RC del conduttore).',
      },
      {
        question: 'Sono in affitto: devo comunque assicurare la casa?',
        answer: 'Il proprietario assicura il fabbricato. Come inquilino dovresti avere almeno la RC del conduttore (copre i danni che causi all\'immobile, es. incendio) e la copertura del contenuto (mobili, elettrodomestici, oggetti di valore). Alcune compagnie offrono polizze dedicate agli affittuari da 50-80€/anno.',
      },
      {
        question: 'La polizza casa copre l\'alluvione e il terremoto?',
        answer: 'Le polizze standard generalmente no: coprono incendio, furto e danni da acqua (rottura tubazioni). Per alluvione, esondazione e terremoto servono estensioni specifiche o una polizza catastrofi naturali. Dal 2025 questa copertura è obbligatoria per le imprese.',
      },
      {
        question: 'Cosa si intende per "sottoassicurazione"?',
        answer: 'Accade quando il valore assicurato è inferiore al valore reale dell\'immobile o del contenuto. In caso di sinistro, la compagnia rimborsa solo proporzionalmente (es. se hai assicurato il 50% del valore, ricevi solo il 50% del danno). FIM verifica che il tuo valore assicurato sia adeguato.',
      },
      {
        question: 'Posso assicurare anche la casa vacanze o un immobile affittato?',
        answer: 'Sì, anche seconde case, case vacanza, B&B e immobili affittati possono essere assicurati. Le tariffe variano in base all\'uso (abitazione principale vs secondaria) e alla presenza continua. Gli immobili in affitto possono avere coperture specifiche per il rischio inquilino.',
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
        answer: 'Sì. Le polizze familiari coprono il nucleo convivente (coniuge/partner, figli) con premi vantaggiosi rispetto alle polizze individuali separate. Alcune compagnie estendono la copertura anche ai genitori conviventi o ai figli studenti fuori sede.',
      },
      {
        question: "Sono coperto anche all'estero?",
        answer: "Molte polizze salute prevedono copertura internazionale per cure urgenti all'estero. Per soggiorni lunghi o trasferimenti, esistono polizze internazionali dedicate. In Europa, la Tessera Europea di Assicurazione Malattia (TEAM) garantisce le cure urgenti nel pubblico, ma non i ricoveri programmati o le strutture private.",
      },
      {
        question: "Cos'è il massimale e perché è importante?",
        answer: 'Il massimale è il limite massimo che la compagnia rimborsa per sinistro o anno. Un massimale basso (es. 50.000€) può essere insufficiente in caso di ricovero in una clinica privata di alto livello o di cure oncologiche. FIM consiglia massimali da 500.000€ in su per una copertura realmente efficace.',
      },
      {
        question: 'La polizza salute vale anche per le visite di prevenzione e i check-up?',
        answer: 'Dipende dalla polizza. Le coperture base rimborsano solo spese a seguito di malattia o infortunio. Le polizze più complete includono anche visite preventive, screening oncologici, odontoiatria e fisioterapia. Ti aiutiamo a scegliere il livello di copertura più adatto al tuo profilo di salute.',
      },
      {
        question: "Cosa succede se mi ammalo prima di stipulare la polizza (malattia preesistente)?",
        answer: 'Le malattie preesistenti alla stipula sono generalmente escluse dalla copertura, o richiedono una dichiarazione nel questionario sanitario. Alcune compagnie le escludono definitivamente, altre le includono dopo un periodo di carenza (solitamente 1-2 anni). È fondamentale compilare il questionario con accuratezza per evitare problemi in caso di sinistro.',
      },
      {
        question: 'Come funziona il rimborso delle spese mediche?',
        answer: 'Ci sono due modalità: rimborso diretto (vai dal medico/clinica convenzionata, la compagnia paga direttamente) oppure rimborso a piè di lista (paghi tu e poi presenti le ricevute alla compagnia). Alcune polizze prevedono una franchigia (quota a tuo carico) e un limite percentuale di rimborso (es. 80% delle spese).',
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
        question: "Cos'è la RC professionale e chi è obbligato ad averla?",
        answer: "Copre i danni causati ai clienti nell'esercizio dell'attività professionale per errori, omissioni o negligenze. È obbligatoria per legge per: medici, avvocati, ingegneri, architetti, notai, revisori contabili, agenti immobiliari, intermediari assicurativi e altre categorie regolamentate. Anche se non obbligatoria, è fortemente consigliata per qualsiasi professionista.",
      },
      {
        question: "Perché un'azienda ha bisogno della cyber risk?",
        answer: 'La cyber risk copre i costi conseguenti a: violazioni di dati personali (data breach), attacchi ransomware con blocco dei sistemi, interruzione dell\'attività digitale, sanzioni GDPR, spese legali e di notifica agli interessati. Con l\'aumento degli attacchi informatici alle PMI (+65% nel 2024), è diventata una copertura essenziale.',
      },
      {
        question: "Cos'è la polizza D&O (Directors & Officers)?",
        answer: 'La D&O protegge gli amministratori e i dirigenti di una società da richieste di risarcimento personali per decisioni prese nell\'esercizio del loro ruolo: errori di gestione, violazioni di normative, contenziosi con soci di minoranza. Senza questa polizza, gli amministratori rischiano il proprio patrimonio personale.',
      },
      {
        question: "Cosa copre l'assicurazione infortuni dipendenti?",
        answer: "Integra l'INAIL (che copre gli infortuni sul lavoro) con indennità aggiuntive: invalidità permanente, morte, diaria da ricovero, rimborso spese mediche. Alcune aziende la estendono anche agli infortuni extralavorativi come benefit ai dipendenti. Rientra spesso nei piani di welfare aziendale con vantaggi fiscali.",
      },
      {
        question: "Dal 2025 le aziende sono obbligate ad assicurarsi contro le catastrofi naturali?",
        answer: "Sì. La Legge di Bilancio 2024 (L. 213/2023) ha introdotto l'obbligo per tutte le imprese italiane di stipulare una polizza catastrofi naturali su immobili, terreni, impianti e macchinari iscritti in bilancio entro il 31 marzo 2025. FIM ha già assistito decine di aziende nell'adeguamento: contattaci subito se non sei in regola.",
      },
      {
        question: "Come funziona il risk management per le PMI?",
        answer: "Il risk management aziendale parte da un'analisi dei rischi specifici dell'attività (operativi, legali, finanziari, reputazionali), poi si costruisce un programma assicurativo che copra i rischi più critici nel modo più efficiente. FIM offre consulenza di risk assessment gratuita per le aziende clienti, con revisione annuale del programma.",
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
        answer: 'No. La polizza viaggio deve essere stipulata prima della partenza per essere valida. L\'acquisto last-minute è possibile fino alla mezzanotte del giorno prima della partenza. Se sei già all\'estero e non hai copertura, alcune compagnie offrono polizze "in viaggio" ma con limitazioni significative.',
      },
      {
        question: 'È obbligatoria la polizza viaggio?',
        answer: 'Non è obbligatoria in generale, ma è richiesta obbligatoriamente per il visto Schengen (minimo 30.000€ di copertura medica). È fortemente consigliata per viaggi extra-UE, dove una sola notte in ospedale può costare migliaia di euro (USA: 5.000-15.000€/notte in media).',
      },
      {
        question: 'La polizza viaggio copre anche la cancellazione per malattia?',
        answer: 'Sì, se hai scelto la garanzia "Annullamento viaggio". Copre il rimborso delle spese non rimborsabili (voli, hotel, tour) se sei costretto ad annullare per malattia, infortunio, lutto o altre cause previste. È fondamentale per viaggi di valore superiore a 1.000€.',
      },
      {
        question: 'La mia carta di credito include già una copertura viaggio?',
        answer: 'Alcune carte di credito premium (Visa Platinum, Mastercard Gold, Amex) includono coperture viaggio di base. Tuttavia, spesso hanno massimali bassi, escludono attività sportive o avventura, e richiedono che il viaggio sia pagato con quella carta. Verifica le condizioni prima di partire: FIM può confrontare la copertura della tua carta con una polizza dedicata.',
      },
      {
        question: 'Sono coperto per attività sportive e avventura?',
        answer: 'Dipende dalla polizza. Le coperture standard escludono sport ad alto rischio (sci fuori pista, alpinismo, immersioni, moto d\'acqua). Esistono estensioni specifiche per sport invernali, trekking, immersioni e altre attività. Se pratichi sport durante il viaggio, comunicalo al momento della stipula.',
      },
      {
        question: 'Come funziona il rimpatrio di emergenza?',
        answer: 'In caso di ricovero grave o decesso all\'estero, la compagnia organizza e paga il rimpatrio sanitario (ambulanza aerea attrezzata) o il trasferimento della salma. Questo servizio può costare 10.000-50.000€ se non assicurato. È attivabile H24 chiamando la centrale operativa della compagnia, disponibile in più lingue.',
      },
    ],
    priceFrom: 'da 15€ a viaggio',
    priceNote: 'Singolo viaggio Europa. Long-stay e polizze annuali disponibili.',
  },
  {
    slug: 'cauzioni-fideiussioni',
    title: 'Cauzioni e Fideiussioni',
    shortDescription: 'Fideiussioni assicurative per appalti, locazioni, doganali, fiscali e molto altro. Emissione in 24-48 ore.',
    description:
      'Le cauzioni e fideiussioni assicurative sostituiscono le garanzie bancarie tradizionali, liberando liquidità e linee di credito per la tua impresa. Come broker indipendente confrontiamo le offerte delle compagnie specializzate per ottenere la cauzione giusta al costo più competitivo, con tempi di emissione rapidi — generalmente entro 24-48 ore lavorative.',
    icon: '🔐',
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&fit=crop&auto=format',
    features: [
      'Cauzioni per appalti pubblici (provvisorie e definitive)',
      'Cauzioni per appalti privati',
      'Cauzioni doganali (IVA, dazi, accise)',
      'Cauzioni fiscali (rateizzazioni Agenzia delle Entrate)',
      'Fideiussioni per locazioni commerciali e abitative',
      'Cauzioni edilizie (oneri urbanistici, scomputo)',
      'Cauzioni giudiziarie',
      'Cauzioni per rimborso IVA',
    ],
    benefits: [
      'Emissione in 24-48 ore lavorative',
      'Importi fino a 500.000€',
      'Nessun blocco di liquidità (a differenza della fideiussione bancaria)',
      'Nessun impatto sulle linee di credito bancarie',
      'Confronto tra compagnie specializzate',
      'Assistenza completa nella documentazione',
    ],
    faq: [
      {
        question: 'Qual è la differenza tra fideiussione bancaria e fideiussione assicurativa?',
        answer: 'La fideiussione bancaria viene emessa dalla banca e blocca una quota del tuo plafond creditizio: in pratica, riduce la capacità della tua azienda di ottenere altri finanziamenti. La fideiussione assicurativa viene emessa da una compagnia assicurativa e non incide sulle tue linee di credito. L\'effetto giuridico è identico — il beneficiario è garantito allo stesso modo — ma quella assicurativa ti lascia libero di usare il credito bancario per il tuo business.',
      },
      {
        question: 'Quanto tempo serve per ottenere una fideiussione assicurativa?',
        answer: 'Con FIM Insurance Broker i tempi di emissione sono generalmente di 24-48 ore lavorative dalla ricezione della documentazione completa. Per importi standard e aziende con bilancio regolare, spesso riusciamo a ottenere la polizza fideiussoria entro la giornata. Per casi complessi (importi elevati, aziende in fase di startup) i tempi possono allungarsi fino a 5-7 giorni lavorativi.',
      },
      {
        question: 'Quanto costa una fideiussione assicurativa?',
        answer: 'Il premio varia in base all\'importo garantito, alla durata, alla tipologia di cauzione e al profilo di rischio dell\'azienda. Indicativamente, per una cauzione di importo medio, il premio annuo oscilla tra l\'1% e il 3% dell\'importo garantito. Ad esempio, per una cauzione di 100.000€ il premio annuo può andare da 1.000 a 3.000€. Come broker confrontiamo più compagnie per trovare la tariffa più competitiva per il tuo caso specifico.',
      },
      {
        question: 'Quali documenti servono per richiedere una fideiussione?',
        answer: 'Generalmente servono: visura camerale aggiornata, ultimi 2-3 bilanci approvati (o dichiarazioni dei redditi per le ditte individuali), copia del contratto o del bando che richiede la garanzia, e un documento di identità del legale rappresentante. Per alcune tipologie (cauzioni doganali, fiscali) possono essere richiesti documenti aggiuntivi specifici. Il nostro team ti guida nella raccolta della documentazione.',
      },
      {
        question: 'La fideiussione assicurativa è accettata dalla Pubblica Amministrazione?',
        answer: 'Sì, assolutamente. Il Codice degli Appalti (D.Lgs. 36/2023) prevede espressamente che le garanzie fideiussorie possano essere rilasciate da imprese di assicurazione autorizzate. La fideiussione assicurativa ha lo stesso valore legale di quella bancaria per gare d\'appalto, concessioni e contratti pubblici.',
      },
    ],
    priceFrom: 'dall\'1% dell\'importo garantito',
    priceNote: 'Premio annuo indicativo. Varia in base a importo, durata e profilo aziendale. Importi fino a 500.000€.',
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
  amber: 'bg-amber-100 text-amber-800',
}
