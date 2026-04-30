import type { FaqCategory } from '.'

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
        'Una polizza cyber risk copre le perdite economiche derivanti da attacchi informatici, violazioni di dati e interruzioni dei sistemi IT. Le coperture tipiche includono: (1) Ripristino dati e sistemi dopo un attacco ransomware o malware; (2) Perdita di ricavi durante il fermo operativo (business interruption); (3) Responsabilità verso terzi per data breach (GDPR) — sanzioni, risarcimenti, spese legali; (4) Costi di gestione della crisi — esperti forensi, comunicazione, notifiche agli interessati; (5) Estorsione cyber (pagamento riscatto o spese per non pagarlo). Il prodotto DUAL Cyber Smart Plus che proponiamo a FIM include tutte queste coperture in un unico pacchetto.',
    },
    {
      question: 'La NIS2 mi obbliga ad avere una polizza cyber?',
      answer:
        'La Direttiva NIS2 (recepita in Italia con D.Lgs. 138/2024) non obbliga esplicitamente a stipulare una polizza cyber, ma impone misure di sicurezza proporzionate al rischio, inclusa la gestione del rischio finanziario. Le organizzazioni soggette — circa 66.000 entità italiane tra settori critici ed essenziali — devono dimostrare di gestire adeguatamente i rischi informatici. Una polizza cyber è uno degli strumenti di compliance più efficaci, e in caso di ispezione CSIRT può dimostrare che l\'azienda ha adottato misure concrete di risk management.',
    },
    {
      question: 'GDPR e polizza cyber: cosa succede in caso di data breach?',
      answer:
        'In caso di data breach, il GDPR impone: notifica al Garante entro 72 ore, eventuale comunicazione agli interessati, documentazione completa dell\'incidente. Le sanzioni possono arrivare fino al 4% del fatturato globale. Una polizza cyber copre: le spese legali per gestire la procedura, il costo delle notifiche, l\'eventuale risarcimento agli interessati, e le sanzioni del Garante (su alcune polizze, entro i limiti di legge). DUAL Cyber Smart Plus include il supporto di una rete di specialisti cyber che gestiscono l\'incidente al posto tuo.',
    },
    {
      question: 'Quanto costa una polizza cyber per una PMI?',
      answer:
        'Il premio dipende da fatturato, settore, numero di dipendenti, dati trattati e misure di sicurezza già in atto. A titolo indicativo: per una PMI con fatturato fino a 2M€ il premio parte da circa 800-1.500€/anno. Scegliendo una franchigia più alta (es. €2.500 invece di €250) si riduce significativamente il premio annuo — fino al 33% di sconto. Le aziende con buone prassi di sicurezza (backup, 2FA, formazione dipendenti) ottengono premi più competitivi. Richiedi un preventivo personalizzato: FIM ottiene quotazioni da più compagnie per trovare il miglior rapporto qualità/prezzo.',
    },
    {
      question: 'Cosa significa "claims made" e "retroattività illimitata"?',
      answer:
        '"Claims made" significa che la polizza copre i sinistri denunciati durante il periodo di validità, indipendentemente da quando l\'evento si è verificato. La retroattività illimitata è un\'opzione premium che estende la copertura anche a violazioni avvenute prima della stipula — cruciale perché spesso un attacco rimane silente per mesi prima di essere scoperto. DUAL Cyber Smart Plus include la retroattività illimitata come caratteristica standard: significa che se oggi scopri una violazione avvenuta 2 anni fa, sei coperto.',
    },
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
    {
      question: 'La polizza copre anche il fermo operativo (business interruption)?',
      answer:
        'Sì, è una delle coperture più importanti. Il business interruption cyber copre il mancato guadagno durante il periodo in cui i sistemi sono fermi o degradati a causa di un attacco. Il calcolo si basa sul fatturato giornaliero medio. Attenzione: c\'è solitamente una franchigia temporale (12-24 ore prima che scatti la copertura) e un massimale di giorni. DUAL Cyber Smart Plus copre fino a 30 giorni di fermo, con una franchigia temporale di 8 ore.',
    },
  ],
}
