import type { FaqCategory } from '.'

// FAQ riscritte per AEO (Featured Snippet ready): risposta diretta in 40-60
// parole + paragrafo "Approfondimento" coi dettagli tecnici. Contenuto
// normativo invariato (NIS2, GDPR), solo struttura più snippet-friendly.

export const cyberRiskFaq: FaqCategory = {
  slug: 'cyber-risk',
  title: 'Cyber Risk',
  cta: {
    text: 'Quant\'è esposta la tua azienda al rischio cyber?',
    description: 'Scarica il Cyber Health Check gratuito o richiedi una consulenza dedicata.',
    primary: { label: 'Richiedi preventivo cyber', href: '/preventivo?profilo=azienda&tipo=cyber' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'Cos\'è una polizza cyber risk e cosa copre esattamente?',
      answer:
        'Una polizza cyber risk copre le perdite economiche derivanti da attacchi informatici, violazioni di dati personali e interruzioni dei sistemi IT. Le 5 coperture tipiche sono: ripristino dati dopo ransomware, business interruption (perdita ricavi durante il fermo), responsabilità GDPR verso terzi, costi di gestione della crisi e estorsione cyber.\n\nApprofondimento. Nel dettaglio, una polizza cyber completa include: (1) ripristino dati e sistemi dopo attacco ransomware o malware; (2) mancato guadagno durante il fermo operativo; (3) responsabilità verso terzi per data breach — sanzioni del Garante, risarcimenti, spese legali; (4) costi di gestione crisi (forensi, comunicazione, notifiche agli interessati); (5) cyber extortion (pagamento riscatto o spese per non pagarlo). Il prodotto DUAL Cyber Smart Plus distribuito da FIM include tutte queste coperture in un unico pacchetto.',
    },
    {
      question: 'La NIS2 mi obbliga ad avere una polizza cyber?',
      answer:
        'No, la Direttiva NIS2 (recepita in Italia con D.Lgs. 138/2024) non obbliga esplicitamente a stipulare una polizza cyber. Impone però misure di sicurezza proporzionate al rischio, inclusa la gestione del rischio finanziario. Circa 66.000 entità italiane tra settori critici ed essenziali devono dimostrare di gestire adeguatamente i rischi informatici.\n\nApprofondimento. Una polizza cyber è uno degli strumenti di compliance più efficaci perché, in caso di ispezione CSIRT, dimostra che l\'azienda ha adottato misure concrete di risk management e di trasferimento del rischio residuo. NIS2 sanziona la mancata adozione di misure adeguate con multe fino a 10 milioni di euro o al 2% del fatturato globale, oltre alla responsabilità personale degli amministratori.',
    },
    {
      question: 'GDPR e polizza cyber: cosa succede in caso di data breach?',
      answer:
        'In caso di data breach il GDPR impone 3 obblighi: notifica al Garante entro 72 ore, comunicazione agli interessati se il rischio è elevato, e documentazione completa dell\'incidente. Le sanzioni possono arrivare fino al 4% del fatturato globale o 20 milioni di euro (il maggiore dei due).\n\nApprofondimento. Una polizza cyber copre: le spese legali per gestire la procedura GDPR, il costo materiale delle notifiche (mailing, call center), l\'eventuale risarcimento agli interessati per il danno subito e — solo su alcune polizze e nei limiti consentiti dalla legge — le sanzioni amministrative del Garante. DUAL Cyber Smart Plus include il supporto di una rete di specialisti cyber che gestiscono l\'incidente al posto dell\'azienda, riducendo drasticamente i tempi di reazione.',
    },
    {
      question: 'Quanto costa una polizza cyber per una PMI?',
      answer:
        'Per una PMI con fatturato fino a 2 milioni di euro il premio cyber parte da circa 800-1.500€ all\'anno. Il prezzo dipende da 5 fattori: fatturato, settore di attività, numero di dipendenti, tipologia di dati trattati e misure di sicurezza già in atto (backup, 2FA, formazione del personale).\n\nApprofondimento. Scegliendo una franchigia più alta (es. 2.500€ invece di 250€) si riduce significativamente il premio annuo — fino al 33% di sconto. Le aziende con buone prassi di sicurezza ottengono inoltre tariffe più competitive. FIM ottiene quotazioni da più compagnie del mercato cyber italiano (DUAL, Hiscox, Chubb, AIG) per individuare il miglior rapporto qualità/prezzo sulla base del profilo di rischio specifico.',
    },
    {
      question: 'Cosa significa "claims made" e "retroattività illimitata"?',
      answer:
        'La "claims made" è la formula contrattuale per cui la polizza copre i sinistri denunciati durante il periodo di validità, indipendentemente da quando l\'evento si è verificato. La retroattività illimitata è un\'opzione premium che estende la copertura anche a violazioni avvenute prima della stipula — cruciale perché un attacco può restare silente per mesi.\n\nApprofondimento. La retroattività illimitata è particolarmente importante nel cyber: secondo le statistiche di settore (IBM Cost of a Data Breach Report 2024), il tempo medio per identificare un breach è di 194 giorni e per contenerlo altri 64. Senza retroattività, un attacco scoperto oggi ma avvenuto due anni fa resterebbe interamente a carico dell\'azienda. DUAL Cyber Smart Plus include la retroattività illimitata come caratteristica standard.',
    },
    {
      question: 'La polizza copre anche il fermo operativo (business interruption)?',
      answer:
        'Sì, la business interruption cyber è una delle coperture più importanti. Copre il mancato guadagno durante il periodo in cui i sistemi sono fermi o degradati a causa di un attacco. Il calcolo si basa sul fatturato giornaliero medio dell\'azienda. Attenzione: c\'è quasi sempre una franchigia temporale e un massimale di giorni.\n\nApprofondimento. La franchigia temporale è il periodo iniziale di fermo NON coperto: tipicamente 8-24 ore. Il massimale di giorni indica fino a quando viene riconosciuto il mancato guadagno: in genere 30-90 giorni. DUAL Cyber Smart Plus copre fino a 30 giorni di fermo con franchigia temporale di 8 ore, ed è uno dei migliori standard del mercato italiano per le PMI. Per importi di fatturato superiori si possono richiedere estensioni dedicate.',
    },
    // Le seguenti sono già concise e mirate (nicchia studi e errore umano):
    // mantenute invariate dopo l'audit AEO.
    {
      question: 'Sono un libero professionista o studio con pochi dipendenti: mi serve una polizza cyber?',
      answer:
        'Sì, forse ancora di più di una grande azienda. I professionisti trattano spesso dati sensibili (medici, avvocati, commercialisti, consulenti) e hanno strutture IT meno protette. Un ransomware che blocca lo studio per una settimana significa zero ricavi, più i costi di ripristino. Per gli studi professionali la polizza cyber copre: interruzione attività, recupero dati, spese legali GDPR, e la responsabilità verso clienti per dati sottratti. Il DUAL Cyber Smart Plus è disponibile anche per studi mono-professionali.',
    },
    {
      question: 'La polizza cyber copre anche l\'errore umano (dipendente che clicca su phishing)?',
      answer:
        'Sì. La grande maggioranza degli incidenti cyber (oltre il 90% secondo le statistiche) inizia da un errore umano — un clic su un link di phishing, una password debole, un allegato infetto aperto da un dipendente. Le polizze cyber moderne coprono esplicitamente questi scenari, purché l\'errore non sia intenzionale o fraudolento. Alcune polizze offrono anche formazione cyber per i dipendenti come servizio accessorio.',
    },
  ],
}
