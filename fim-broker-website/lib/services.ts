import { OBBLIGO_CATASTROFALE } from '@/lib/catastrofale'

export interface Coverage {
  /** Cosa la polizza copre tipicamente. Lista concisa, snippet-friendly. */
  covered: string[]
  /** Esclusioni tipiche / cose che la polizza NON copre. */
  notCovered: string[]
  /** Nota legale/contestuale opzionale mostrata sotto la tabella */
  note?: string
}

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
  /**
   * Tabella comparativa "Cosa copre / Cosa NON copre".
   * Quando presente, viene renderizzata nella pagina servizio come
   * elemento AEO-friendly (forte candidato a Featured Snippet tabellare).
   * Opzionale per backward compatibility.
   */
  coverage?: Coverage
  /** Articoli e guide collegati, mostrati dopo le domande frequenti. */
  approfondimenti?: Array<{ titolo: string; href: string; descrizione: string }>
}

export const services: Service[] = [
  {
    slug: 'assicurazione-auto',
    title: 'Assicurazione Auto',
    shortDescription: 'RC Auto, Kasko, Furto e Incendio. Le offerte di più compagnie a confronto sul tuo veicolo.',
    description:
      'Proteggi il tuo veicolo con le soluzioni assicurative più complete del mercato. Da FIM trovi polizze personalizzate per ogni esigenza, dalla semplice RC obbligatoria fino alla Kasko totale.',
    icon: '🚗',
    color: 'blue',
    image: '/images/brand/auto-road.jpg',
    features: [
      'RC Auto obbligatoria',
      'Kasko completa o parziale',
      'Furto e incendio',
      'Assistenza stradale 24/7',
      'Tutela legale',
      'Infortuni del conducente',
    ],
    benefits: [
      'Confronto tra le compagnie partner',
      'Attestato di rischio controllato prima del rinnovo',
      'Assistenza nella gestione dei sinistri',
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
        answer: 'La classe di merito va dalla 1 (la migliore) alla 18 (la peggiore). Ogni anno senza sinistri migliori di una classe. Ogni sinistro con colpa retrocedi di 2 classi. FIM legge il tuo attestato di rischio e confronta le compagnie sul tuo profilo.',
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
    priceFrom: 'Su preventivo',
    priceNote: 'Il premio lo calcola la compagnia su classe di merito, veicolo, residenza, età del conducente e garanzie scelte.',
    coverage: {
      covered: [
        'RC Auto obbligatoria (danni a terzi)',
        'Kasko collisione e ribaltamento',
        'Furto e incendio del veicolo',
        'Atti vandalici e dolosi di terzi',
        'Eventi atmosferici (grandine, vento)',
        'Rottura cristalli',
        'Assistenza stradale 24/7',
        'Infortuni del conducente',
      ],
      notCovered: [
        'Usura e manutenzione ordinaria',
        'Multe, contravvenzioni e sanzioni amministrative',
        'Sinistri con tasso alcolemico oltre il limite',
        'Danni causati intenzionalmente dall\'assicurato',
        'Guida senza patente o patente sospesa',
        'Trasporto di merci pericolose non dichiarato',
      ],
      note: 'Coperture indicative di una polizza auto completa. Le garanzie specifiche dipendono dalla compagnia e dal pacchetto scelto. FIM analizza le condizioni di ogni offerta per evitare sorprese al momento del sinistro.',
    },
  },
  {
    slug: 'assicurazione-vita',
    title: 'Assicurazione Vita e Previdenza',
    shortDescription: 'Proteggi il futuro tuo e della tua famiglia con piani vita e previdenziali su misura.',
    description:
      'Le polizze vita FIM garantiscono serenità finanziaria a te e alla tua famiglia. Offriamo soluzioni temporanee caso morte, miste, unit-linked e piani di accumulo previdenziale.',
    icon: '❤️',
    color: 'red',
    image: '/images/brand/vita-structure.jpg',
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
      'Prodotti tradizionali o unit-linked, secondo il tuo profilo',
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
    priceFrom: 'Su preventivo',
    priceNote: 'Il premio lo calcola la compagnia su età, capitale assicurato, durata e stato di salute.',
    coverage: {
      covered: [
        'Capitale al beneficiario in caso di decesso',
        'Invalidità permanente da malattia o infortunio (su garanzia)',
        'Rendita Long Term Care in caso di non autosufficienza',
        'Esonero pagamento premi in caso di invalidità totale',
        'Capitale rivalutato per polizze miste/previdenziali',
        'Esenzione fiscale del capitale (artt. 17 e 26-ter D.P.R. 600/73)',
      ],
      notCovered: [
        'Suicidio nei primi 2 anni di polizza',
        'Decesso da malattie preesistenti non dichiarate',
        'Atti di guerra e terrorismo (salvo estensione)',
        'Pratiche sportive estreme non dichiarate (es. paracadutismo, alpinismo)',
        'Abuso di sostanze stupefacenti o alcool',
        'Conseguenze di azioni dolose dell\'assicurato',
      ],
      note: 'Le esclusioni esatte e i periodi di carenza dipendono dalla compagnia e dal tipo di polizza (TCM, mista, unit-linked, LTC). FIM verifica per ogni cliente le condizioni più rilevanti prima della stipula.',
    },
  },
  {
    slug: 'assicurazione-casa',
    title: 'Assicurazione Casa',
    shortDescription: 'Polizze complete per la tua abitazione: incendio, furto, RC del proprietario e molto altro.',
    description:
      'La tua casa è il tuo bene più prezioso. FIM offre polizze globali fabbricato e multirischio casa che coprono ogni tipo di danno, dal furto agli eventi atmosferici.',
    icon: '🏠',
    color: 'green',
    image: '/images/brand/casa-model.jpg',
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
        answer: 'Il proprietario assicura il fabbricato. Come inquilino dovresti avere almeno la RC del conduttore (copre i danni che causi all\'immobile, es. incendio) e la copertura del contenuto (mobili, elettrodomestici, oggetti di valore). Alcune compagnie offrono polizze pensate apposta per chi è in affitto.',
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
    priceFrom: 'Su preventivo',
    priceNote: 'Il premio lo calcola la compagnia su valore dell\'immobile, zona, tipo di costruzione e garanzie scelte.',
    coverage: {
      covered: [
        'Incendio, scoppio ed esplosione',
        'Furto, rapina ed effrazione in abitazione',
        'Allagamenti da impianti interni (rotture tubi, lavatrici)',
        'Eventi atmosferici: grandine, vento forte, neve',
        'RC capofamiglia (danni a terzi)',
        'Atti vandalici e dolosi di terzi',
        'Rottura lastre e cristalli',
        'Assistenza domiciliare 24/7 (idraulico, fabbro, elettricista)',
      ],
      notCovered: [
        'Alluvioni e terremoti (garanzia catastrofale separata)',
        'Usura normale e danni progressivi',
        'Danni dolosi commessi dall\'assicurato',
        'Immobili disabitati oltre 30 giorni senza preavviso',
        'Gioielli, contanti e oggetti d\'arte oltre i limiti di polizza',
        'Danni da animali domestici al proprio immobile',
      ],
      note: 'Per immobili in zone a rischio sismico o idrogeologico la garanzia catastrofale va aggiunta: dal 2025 è obbligatoria per le imprese (L. 213/2023) e fortemente raccomandata per i privati.',
    },
  },
  {
    slug: 'assicurazione-salute',
    title: 'Assicurazione Salute',
    shortDescription: 'Polizze sanitarie individuali e collettive per accedere alle migliori cure mediche.',
    description:
      'La salute è il bene più prezioso. Con una polizza sanitaria accedi alle strutture private convenzionate, hai il rimborso delle spese mediche e un\'indennità in caso di infortunio, nei limiti del contratto.',
    icon: '🏥',
    color: 'teal',
    image: '/images/brand/salute-dna.jpg',
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
        answer: 'Le malattie preesistenti alla stipula sono generalmente escluse dalla copertura, o richiedono una dichiarazione nel questionario sanitario. Alcune compagnie le escludono definitivamente, altre le includono dopo un periodo di carenza (solitamente 1-2 anni). Il questionario sanitario va compilato con cura per evitare problemi in caso di sinistro.',
      },
      {
        question: 'Come funziona il rimborso delle spese mediche?',
        answer: 'Ci sono due modalità: rimborso diretto (vai dal medico/clinica convenzionata, la compagnia paga direttamente) oppure rimborso a piè di lista (paghi tu e poi presenti le ricevute alla compagnia). Alcune polizze prevedono una franchigia (quota a tuo carico) e un limite percentuale di rimborso (es. 80% delle spese).',
      },
    ],
    priceFrom: 'Su preventivo',
    priceNote: 'Il premio lo calcola la compagnia su età, persone assicurate, massimali e tipo di piano.',
    coverage: {
      covered: [
        'Ricoveri con o senza intervento chirurgico',
        'Alta diagnostica: TAC, risonanza magnetica, PET',
        'Visite specialistiche e accertamenti',
        'Parto e degenza per la maternità',
        'Cure oncologiche e terapie radianti',
        'Assistenza sanitaria all\'estero',
        'Lenti correttive e ausili (su garanzia)',
        'Rette di degenza in strutture private convenzionate',
      ],
      notCovered: [
        'Cure estetiche e chirurgia non terapeutica',
        'Malattie pregresse non dichiarate alla stipula',
        'Fecondazione assistita oltre i limiti del piano',
        'Cure dentistiche base (richiedono garanzia dental separata)',
        'Long Term Care e non autosufficienza (polizza separata)',
        'Cure non riconosciute dal SSN o sperimentali',
      ],
      note: 'Periodo di carenza tipico: 30 giorni per malattia, fino a 270 giorni per parto, 180 giorni per intervento chirurgico programmato. FIM verifica carenze e massimali prima della stipula.',
    },
  },
  {
    slug: 'polizze-aziendali',
    title: 'Polizze Aziendali',
    shortDescription: 'Soluzioni assicurative complete per imprese: RC, D&O, cyber risk, property e benefit aziendali.',
    description:
      'FIM è il partner assicurativo di fiducia per le imprese. Dalla RC professionale alla cyber risk, dalle polizze property ai piani welfare aziendale, proteggiamo ogni aspetto della tua attività.',
    icon: '🏢',
    color: 'purple',
    image: '/images/brand/cyber-chain.jpg',
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
        answer: 'La cyber risk copre i costi conseguenti a: violazioni di dati personali (data breach), attacchi ransomware con blocco dei sistemi, interruzione dell\'attività digitale, spese legali e di notifica agli interessati. Le sanzioni del Garante in genere restano a carico dell\'azienda. Con gli attacchi informatici sempre più frequenti anche contro le PMI, è diventata una copertura essenziale.',
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
        answer: `${OBBLIGO_CATASTROFALE} Se non sei sicuro di essere in regola, guardiamo insieme le tue polizze.`,
      },
      {
        question: "Come funziona il risk management per le PMI?",
        answer: "Il risk management aziendale parte da un'analisi dei rischi specifici dell'attività (operativi, legali, finanziari, reputazionali), poi si costruisce un programma assicurativo che copra i rischi più critici nel modo più efficiente. FIM offre consulenza di risk assessment gratuita per le aziende clienti, con revisione annuale del programma.",
      },
    ],
    priceFrom: 'Su preventivo',
    priceNote: 'Il premio lo calcola la compagnia su settore, fatturato, valori assicurati e massimali.',
    coverage: {
      covered: [
        'RC verso terzi e verso prestatori di lavoro (RCT/RCO)',
        'Danni materiali a beni aziendali (incendio, furto, eventi)',
        'Business interruption (mancato guadagno da fermo attività)',
        'Responsabilità prodotti e ritiro dal mercato',
        'Danni indiretti (perdita di clienti, costi straordinari)',
        'Cyber risk e data breach (su garanzia dedicata)',
        'Tutela legale aziendale (su garanzia)',
        'Trasporti e merci in giacenza',
      ],
      notCovered: [
        'Responsabilità di amministratori e sindaci (polizza D&O separata)',
        'Inquinamento ambientale (polizza Environmental separata)',
        'Atti di guerra e terrorismo (estensione opzionale)',
        'Sanzioni amministrative e penali non trasferibili per legge',
        'Errori professionali individuali (RC Professionale separata)',
        'Eventi pregressi alla stipula (no retroattività di default)',
      ],
      note: 'Le polizze aziendali si modellano sulla struttura specifica dell\'impresa (settore, fatturato, asset, personale). FIM costruisce il pacchetto su misura analizzando l\'intero profilo di rischio.',
    },
  },
  {
    slug: 'assicurazione-viaggio',
    title: 'Assicurazione Viaggio',
    shortDescription: 'Viaggia sereno con coperture mediche, annullamento viaggio e bagagli in tutto il mondo.',
    description:
      'Parti senza preoccupazioni con le polizze viaggio FIM. Dalla gita in Europa al viaggio intercontinentale, copriamo spese mediche, annullamento, ritardi e perdita bagagli.',
    icon: '✈️',
    color: 'orange',
    image: '/images/brand/viaggio-bussola.jpg',
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
        answer: 'Sì, se hai scelto la garanzia "Annullamento viaggio". Copre il rimborso delle spese non rimborsabili (voli, hotel, tour) se sei costretto ad annullare per malattia, infortunio, lutto o altre cause previste. Conviene soprattutto quando il viaggio costa molto.',
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
    priceFrom: 'Su preventivo',
    priceNote: 'Il premio lo calcola la compagnia su destinazione, durata, età e garanzie scelte. Ci sono anche polizze annuali per chi viaggia spesso.',
    coverage: {
      covered: [
        'Annullamento del viaggio prima della partenza',
        'Spese mediche e ospedaliere all\'estero',
        'Rimpatrio sanitario con assistenza medica',
        'Smarrimento, furto e ritardata consegna del bagaglio',
        'Ritardi e cancellazioni voli oltre la soglia',
        'Assistenza medica e amministrativa 24/7',
        'Anticipo cauzione penale (per incidenti all\'estero)',
        'Responsabilità civile in viaggio',
      ],
      notCovered: [
        'Viaggi in paesi sconsigliati dal MAE (ministero esteri)',
        'Sport estremi non dichiarati (paracadutismo, alpinismo > 3000m)',
        'Epidemie in paesi con allerta sanitaria conclamata',
        'Danni intenzionali o conseguenti a stato di ebbrezza',
        'Malattie psichiatriche e patologie pregresse non dichiarate',
        'Effetti di guerra, atti terroristici o disordini civili',
      ],
      note: 'Stipula la polizza viaggio appena prenoti, non a ridosso della partenza: solo così l\'annullamento copre eventi imprevisti che possono verificarsi nelle settimane precedenti.',
    },
  },
  {
    // Pagina principale delle cauzioni (P6 del piano SEO, 25/10/2026). Niente
    // tempi di emissione, importi massimi o percentuali di premio: decide la
    // compagnia sul singolo rilascio e FIM non ha dati per documentarli.
    slug: 'cauzioni-fideiussioni',
    title: 'Cauzioni e Fideiussioni',
    shortDescription: 'Cauzioni e fideiussioni assicurative per gare d\'appalto, contratti pubblici e privati, dogane, fisco e locazioni. Dalla richiesta allo svincolo.',
    description:
      'Una gara d\'appalto chiede una garanzia provvisoria per partecipare e una definitiva per firmare il contratto. Fisco e dogana la chiedono per rateizzazioni, rimborsi IVA e dazi, il locatore al posto del deposito in contanti. La fideiussione assicurativa fa lo stesso lavoro di quella bancaria senza toccare il fido in banca. Noi prepariamo la pratica con i documenti che la compagnia chiederà, controlliamo che il testo della garanzia sia quello richiesto dal bando e seguiamo le riduzioni e lo svincolo fino alla fine. Premio e capacità di rilascio li decide la compagnia sul bilancio dell\'impresa: possiamo presentarla al meglio, non promettere l\'esito.',
    icon: '🔐',
    color: 'amber',
    image: '/images/brand/cauzioni-seal.jpg',
    features: [
      'Garanzia provvisoria per la partecipazione alle gare',
      'Garanzia definitiva per l\'esecuzione dei contratti pubblici',
      'Garanzia sull\'anticipazione del prezzo',
      'Cauzioni per appalti privati e subappalti',
      'Cauzioni doganali (IVA, dazi, accise)',
      'Cauzioni fiscali (rateizzazioni, rimborsi IVA)',
      'Fideiussioni per locazioni commerciali e abitative',
      'Cauzioni edilizie (oneri urbanistici, opere a scomputo)',
    ],
    benefits: [
      'Non consuma le linee di credito bancarie dell\'impresa',
      'Il testo della garanzia controllato sul bando prima dell\'emissione: è il primo motivo di esclusione evitabile',
      'La pratica arriva alla compagnia completa, con i documenti che chiede',
      'Le riduzioni dell\'importo previste dal bando, quando ne avete diritto',
      'Scadenze, riduzioni progressive e svincoli seguiti per tutta la durata del contratto',
      'Un referente unico, dalla gara al collaudo',
    ],
    faq: [
      {
        question: 'Qual è la differenza tra fideiussione bancaria e fideiussione assicurativa?',
        answer: 'Per il beneficiario nessuna: è garantito allo stesso modo. Per l\'impresa sì. La fideiussione bancaria la emette la banca e occupa una parte del fido, quindi riduce il credito disponibile per il resto dell\'attività. Quella assicurativa la emette una compagnia autorizzata al ramo cauzioni e non incide sulle linee bancarie.',
      },
      {
        question: 'Quanto tempo serve per ottenere una cauzione?',
        answer: 'Dipende dalla compagnia, dall\'importo e dal bilancio dell\'impresa. Con documenti completi e bilanci in ordine l\'istruttoria è breve; per importi alti, imprese appena costituite o bilanci in perdita si allunga. Per una gara conviene muoversi appena esce il bando, non a ridosso della scadenza delle offerte.',
      },
      {
        question: 'Quanto costa una cauzione assicurativa?',
        answer: 'Il premio lo fissa la compagnia in base a importo garantito, durata, tipo di garanzia e solidità dell\'impresa. Una tariffa valida per tutti non esiste: vi diamo il premio sul vostro caso prima di procedere, insieme alle condizioni della garanzia.',
      },
      {
        question: 'Quali documenti servono?',
        answer: 'Di solito visura camerale aggiornata, ultimi bilanci approvati (o dichiarazioni dei redditi per le ditte individuali), copia del bando o del contratto che chiede la garanzia e documento del legale rappresentante. Per cauzioni doganali e fiscali la compagnia può chiedere documenti specifici. Vi diciamo prima cosa serve, così la pratica parte completa.',
      },
      {
        question: 'La Pubblica Amministrazione accetta la fideiussione assicurativa?',
        answer: 'Sì. Il Codice dei contratti pubblici (D.Lgs. 36/2023) ammette le garanzie fideiussorie rilasciate da imprese di assicurazione autorizzate. Quello che va controllato ogni volta è il testo: clausole, durata e importo devono essere quelli chiesti dal bando.',
      },
      {
        question: 'Quando si libera la cauzione?',
        answer: 'La provvisoria si chiude con l\'aggiudicazione: per chi vince al momento della firma del contratto, per gli altri concorrenti con la comunicazione dell\'esito. La definitiva si riduce man mano che l\'esecuzione avanza e si libera del tutto con il collaudo o la verifica di conformità. Lo svincolo va chiesto e documentato: finché la compagnia non lo riceve, la garanzia resta aperta.',
      },
    ],
    priceFrom: 'Su preventivo',
    priceNote: 'Il premio lo calcola la compagnia sul singolo rilascio, in base a importo, durata, tipo di garanzia e bilancio dell\'impresa.',
    coverage: {
      covered: [
        'Garanzie provvisorie per la partecipazione alle gare',
        'Garanzie definitive per l\'esecuzione di contratti pubblici',
        'Garanzie sull\'anticipazione del prezzo',
        'Garanzie per rimborsi IVA e crediti d\'imposta',
        'Fideiussioni per locazioni commerciali',
        'Garanzie doganali per importazione ed esportazione',
        'Fideiussioni per oneri urbanistici e opere a scomputo',
      ],
      notCovered: [
        'Importi oltre la somma garantita dal singolo rilascio',
        'Il debito dell\'impresa: la cauzione garantisce il beneficiario, non protegge il contraente',
        'Penali o danni che eccedono la quota garantita',
        'Operazioni in paesi soggetti a sanzioni internazionali',
      ],
      note: 'La cauzione è una garanzia, non una polizza che vi risarcisce. Il beneficiario può escuterla alle condizioni scritte nel testo, spesso a prima richiesta, e la compagnia che ha pagato si rivale sull\'impresa per l\'intero importo.',
    },
    approfondimenti: [
      {
        titolo: 'Polizze fideiussorie e cauzioni: come funzionano davvero per una PMI',
        href: '/blog/polizze-fideiussorie-cauzioni-imprese-2026',
        descrizione: 'Perché la cauzione non è una polizza che protegge voi, le clausole che cambiano tutto e cosa succede quando viene escussa.',
      },
    ],
  },
  {
    slug: 'tutela-legale-aziende',
    title: 'Tutela Legale Aziende',
    shortDescription: 'Protezione legale a 360° per imprenditori, amministratori e aziende: tutela penale, D&O e controversie commerciali.',
    description:
      'La RC Azienda copre i danni causati a terzi, ma lascia scoperti i costi legali dell\'imprenditore e dei suoi amministratori. Con la Tutela Legale Aziende completiamo la protezione: spese di avvocato, perito, CTU e consulenti in procedimenti penali, contenziosi con dipendenti, fornitori e clienti, e azioni di responsabilità contro amministratori e sindaci. Una copertura indispensabile in un\'epoca in cui un procedimento penale per reati colposi o la responsabilità amministrativa ex D.Lgs. 231/2001 possono colpire qualsiasi impresa.',
    icon: '⚖️',
    color: 'indigo',
    image: '/images/brand/tutela-legale.jpg',
    features: [
      'Tutela penale per reati colposi (sicurezza sul lavoro, ambientali, fiscali)',
      'Responsabilità amministrativa ex D.Lgs. 231/2001',
      'Danni patrimoniali amministratori e sindaci (D&O)',
      'Controversie con dipendenti e collaboratori',
      'Recupero danni da terzi (fornitori, clienti, vandalismo)',
      'Controversie contrattuali e condizioni di vendita',
      'Conciliazione stragiudiziale e arbitrato',
      'Libera scelta del legale in tutta Italia',
    ],
    benefits: [
      'Completa la RC Azienda: protegge l\'imprenditore oltre i danni a terzi',
      'Massimali fino a 500.000€ per sinistro',
      'Nessuna franchigia sulle spese legali',
      'Rete di studi legali convenzionati o libera scelta',
      'Consulenza legale telefonica illimitata',
    ],
    faq: [
      {
        question: 'Perché la RC Azienda non basta e serve anche la Tutela Legale?',
        answer: 'La RC Azienda copre i danni materiali e corporali causati a terzi nell\'esercizio dell\'attività, ma non copre le spese legali che l\'imprenditore sostiene per difendersi in procedimenti penali, per recuperare crediti da un cliente moroso, per contestare un licenziamento o per azioni di responsabilità contro amministratori. La Tutela Legale completa la protezione pagando avvocati, periti, CTU e spese processuali — anche in caso di esito favorevole, dove altrimenti non c\'è risarcimento a coprire i costi.',
      },
      {
        question: 'Cos\'è la responsabilità ex D.Lgs. 231/2001 e come mi protegge la polizza?',
        answer: 'Il D.Lgs. 231/2001 introduce la responsabilità amministrativa delle società per reati commessi nel loro interesse da amministratori, dirigenti o dipendenti (corruzione, reati societari, ambientali, sicurezza sul lavoro, riciclaggio). Le sanzioni pecuniarie possono arrivare a 1,5 milioni di euro, con possibile interdizione dall\'attività. La Tutela Legale rimborsa le spese di difesa dell\'ente in sede penale e amministrativa, inclusi i costi dei consulenti tecnici per dimostrare l\'adozione di un modello organizzativo 231 idoneo.',
      },
      {
        question: 'La polizza D&O (Directors & Officers) è la stessa cosa della Tutela Legale?',
        answer: 'No, sono complementari. La D&O indennizza i danni patrimoniali che gli amministratori devono risarcire personalmente (es. azione sociale di responsabilità per mala gestio); la Tutela Legale paga invece le spese di difesa legale degli amministratori nei procedimenti penali o civili. FIM costruisce programmi integrati D&O + Tutela Legale per CdA, sindaci e dirigenti di PMI, con un approccio modulare in base alla dimensione aziendale.',
      },
      {
        question: 'La polizza copre le controversie con i dipendenti?',
        answer: 'Sì. La Tutela Legale del datore di lavoro copre le spese per contenziosi in materia di rapporto di lavoro: impugnazione licenziamenti, richieste di differenze retributive, demansionamento, mobbing, trasferimenti contestati, ricorsi contro INPS/INAIL, verifiche ispettive. È una copertura da valutare per PMI con oltre 5 dipendenti, dove il rischio di vertenze è statisticamente alto e un singolo procedimento davanti al Giudice del Lavoro può costare 8.000-15.000€ di sole spese legali.',
      },
      {
        question: 'Posso scegliere liberamente il mio avvocato di fiducia?',
        answer: 'Sì. La normativa europea (Direttiva 87/344/CEE recepita in Italia dall\'art. 164 del Codice delle Assicurazioni) garantisce la libera scelta del legale in caso di procedimento giudiziario o conflitto di interessi. Puoi quindi affidarti all\'avvocato di tua fiducia, che la compagnia liquiderà secondo i parametri forensi vigenti. In alternativa, puoi usare la rete di studi legali convenzionati della compagnia, che offrono condizioni preferenziali.',
      },
      {
        question: 'Quanto costa la Tutela Legale per una PMI?',
        answer: 'Il premio lo calcola la compagnia su fatturato, settore di attività, numero di dipendenti e massimale scelto, e cresce con gli ambiti di tutela inclusi. Come broker indipendenti confrontiamo le offerte delle compagnie specializzate in tutela legale, a partire da Roland, con cui abbiamo un mandato diretto.',
      },
    ],
    priceFrom: 'Su preventivo',
    priceNote: 'Il premio lo calcola la compagnia su fatturato, settore, massimale e ambiti di tutela.',
    coverage: {
      covered: [
        'Spese legali per controversie civili (attive e passive)',
        'Recupero crediti commerciali',
        'Controversie con dipendenti, fornitori e clienti',
        'Onorari di periti e consulenti tecnici di parte',
        'Spese di mediazione e arbitrato',
        'Opposizione a multe e sanzioni amministrative (su garanzia)',
        'Difesa penale del rappresentante legale per fatti d\'impresa',
        'Tutela in materia di sicurezza sul lavoro (su garanzia)',
      ],
      notCovered: [
        'Contenzioso tributario complesso (estensione opzionale)',
        'Cause penali per dolo (sono coperte solo le imputazioni colpose)',
        'Controversie fra soci interni alla società',
        'Fatti antecedenti la stipula (no retroattività di default)',
        'Procedure concorsuali e fallimentari',
        'Multe con sentenza passata in giudicato',
      ],
      note: 'La polizza interviene anticipando le spese: il cliente sceglie il proprio legale (o utilizza la rete della compagnia) e la copertura paga gli onorari fino al massimale. Massimali tipici 25.000-100.000€.',
    },
  },
  {
    slug: 'risk-management',
    title: 'Risk Management',
    shortDescription: 'Analisi dei rischi, programmi assicurativi su misura e monitoraggio continuo. Prima i rischi, poi la copertura.',
    description:
      'Il Risk Management è il cuore del lavoro di un vero broker. Non partiamo dalla polizza ma dall\'analisi dei rischi reali della tua attività: operativi, patrimoniali, legali, reputazionali e di business continuity. Solo dopo aver mappato e pesato ogni esposizione costruiamo il programma assicurativo ottimale — nessuna copertura inutile, nessun gap pericoloso. Questo approccio consulenziale è ciò che distingue FIM da un semplice intermediario: non vendiamo polizze, gestiamo rischi.',
    icon: '🎯',
    color: 'slate',
    image: '/images/brand/shield-craft.jpg',
    features: [
      'Risk assessment: mappatura completa dei rischi aziendali',
      'Analisi di impatto (BIA — Business Impact Analysis)',
      'Progettazione del programma assicurativo ottimale',
      'Selezione e piazzamento presso 20 compagnie partner',
      'Revisione annuale del portafoglio e adeguamento coperture',
      'Claims management: gestione sinistri dalla denuncia alla liquidazione',
      'Business Continuity Planning (BCP)',
      'Compliance assicurativa (catastrofi naturali, D.Lgs. 231, GDPR)',
    ],
    benefits: [
      'Visione d\'insieme dei rischi, polizza per polizza',
      'Premi rivisti: via doppioni e coperture che non servono',
      'Un unico interlocutore per tutte le polizze e tutti i sinistri',
      'Report annuale di risk review con raccomandazioni concrete',
      'Consulenza gratuita: la prima analisi non costa nulla',
    ],
    faq: [
      {
        question: 'Cos\'è il Risk Management assicurativo e perché serve alla mia azienda?',
        answer: 'Il Risk Management assicurativo è un processo strutturato che identifica, valuta e tratta i rischi della tua attività attraverso strumenti assicurativi e non (prevenzione, piani di emergenza, contratti). Serve perché ogni azienda ha un profilo di rischio unico: copiare la polizza di un concorrente significa quasi sempre pagare troppo per coperture inutili e restare scoperti su rischi reali. FIM parte dalla tua attività, non dal listino di una compagnia.',
      },
      {
        question: 'Come funziona il percorso di Risk Management con FIM?',
        answer: 'Il percorso si articola in 4 fasi: 1) Mappatura dei rischi — sopralluogo, intervista con la direzione, analisi bilancio e contratti; 2) Analisi di impatto — ogni rischio viene classificato per probabilità e gravità, con una matrice dei rischi visuale; 3) Programma assicurativo — progettiamo le coperture, chiediamo preventivi alle 20 compagnie partner, ti presentiamo un confronto trasparente; 4) Monitoraggio — ogni anno rivediamo il programma, adeguiamo le coperture all\'evoluzione dell\'azienda e gestiamo i sinistri.',
      },
      {
        question: 'Il Risk Assessment iniziale è gratuito?',
        answer: 'Sì. La prima analisi dei rischi è completamente gratuita e senza impegno. Produciamo un report sintetico con la mappa dei rischi, le eventuali criticità e le raccomandazioni. Se decidi di affidarci il programma assicurativo, la consulenza di risk management resta inclusa nel servizio — non applichiamo compensi separati per la consulenza.',
      },
      {
        question: 'In cosa si differenzia il Risk Management di FIM rispetto a un agente assicurativo?',
        answer: 'Un agente rappresenta una o poche compagnie e propone i prodotti del suo mandato. FIM è un broker indipendente iscritto al RUI (Sez. B n. B000405449): non rappresentiamo nessuna compagnia, ma solo i tuoi interessi. Questo significa che analizziamo i rischi in modo oggettivo, confrontiamo le offerte di 20 compagnie e scegliamo la soluzione migliore per te — non per la compagnia. E in caso di sinistro stiamo dalla tua parte: seguiamo la pratica e trattiamo con la compagnia.',
      },
      {
        question: 'Il Risk Management è utile anche per una piccola impresa?',
        answer: 'Assolutamente sì. Le PMI sono spesso le più esposte perché non hanno un risk manager interno. Un singolo sinistro grave (incendio, causa di lavoro, attacco informatico) può mettere a rischio la sopravvivenza dell\'azienda. Il nostro servizio è calibrato sulla dimensione: per una micro-impresa bastano poche ore di analisi per individuare le 3-4 coperture critiche e ottimizzare la spesa assicurativa. Molti clienti PMI scoprono che stavano pagando troppo per coperture non prioritarie.',
      },
      {
        question: 'Cosa include il report annuale di Risk Review?',
        answer: 'Il report annuale include: aggiornamento della mappa dei rischi (nuove attività, nuovi asset, cambiamenti normativi), verifica dell\'adeguatezza dei massimali e dei valori assicurati, analisi dell\'andamento sinistri, raccomandazioni su coperture da aggiungere, rimuovere o modificare, e un benchmark dei premi rispetto al mercato. Lo presentiamo in un incontro dedicato con la direzione, in modo da prendere decisioni informate.',
      },
    ],
    priceFrom: 'consulenza gratuita',
    priceNote: 'Risk assessment iniziale senza impegno. Il servizio di risk management è incluso nella gestione del portafoglio assicurativo.',
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
  indigo: 'bg-indigo-100 text-indigo-800',
  slate: 'bg-slate-100 text-slate-800',
}
