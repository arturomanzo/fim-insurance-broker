import type { FaqCategory } from '.'

// FAQ riscritte per Featured Snippet / AEO: risposta diretta 40-60 parole
// + "Approfondimento" con dettagli tecnici. Contenuto giuridico invariato.

export const professionistiFaq: FaqCategory = {
  slug: 'professionisti',
  title: 'RC Professionale',
  cta: {
    text: 'Hai dubbi sulla tua RC professionale?',
    description: 'Confrontiamo le offerte delle principali compagnie e ti diciamo se sei davvero coperto.',
    primary: { label: 'Richiedi preventivo', href: '/preventivo?profilo=professionista' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'La RC professionale è obbligatoria per tutti i professionisti?',
      answer:
        'Sì, la RC professionale è obbligatoria per legge per la maggior parte degli iscritti agli Ordini: avvocati, ingegneri, architetti, medici e sanitari, commercialisti, notai, geometri e altri. Per i liberi professionisti non soggetti a obbligo, resta fortemente raccomandata: una singola contestazione non coperta può azzerare anni di lavoro.\n\nApprofondimento. I riferimenti normativi principali sono: avvocati (L. 247/2012), ingegneri e architetti (D.P.R. 137/2012), medici e personale sanitario (L. 24/2017 — c.d. legge Gelli-Bianco), commercialisti, geometri, consulenti del lavoro e tutte le altre professioni ordinistiche (art. 5 D.P.R. 137/2012, in vigore dal 15 agosto 2013). Lo stesso articolo obbliga il professionista a comunicare al cliente gli estremi della polizza e il massimale. L\'iscrizione all\'Albo è subordinata alla copertura RC, e l\'Ordine può richiedere la prova della polizza in fase di controllo.',
    },
    {
      question: 'Cosa succede concretamente se faccio un errore professionale?',
      answer:
        'Se commetti un errore professionale che causa un danno economico al cliente (es. un avvocato perde un\'udienza per dimenticanza, un commercialista sbaglia una dichiarazione IVA), il cliente può richiederti il risarcimento. La RC professionale copre: spese legali per difenderti, risarcimento al cliente fino al massimale, costo peritale per valutare il danno.\n\nApprofondimento. La gestione del sinistro segue tipicamente questo flusso: ricezione della richiesta di risarcimento, segnalazione immediata alla compagnia, nomina del legale incaricato dalla compagnia, perizia tecnica per quantificare il danno, eventuale trattativa stragiudiziale o causa civile. Senza polizza, tutti questi costi (anche le sole spese legali) ricadono interamente sul professionista.',
    },
    {
      question: 'Come si calcola il premio della RC professionale?',
      answer:
        'Il premio della RC professionale dipende da 5 fattori: categoria professionale, volume d\'affari/fatturato annuo, massimale richiesto (in genere 500.000€-3M€), storico sinistri, ed eventuali attività specifiche ad alto rischio. Per un libero professionista la fascia base parte da circa 300-600€ l\'anno, ma può salire molto per studi medici, ingegneri strutturisti o RC con massimali alti.\n\nApprofondimento. FIM confronta le offerte delle principali compagnie del mercato per trovare il miglior rapporto qualità/prezzo. La stessa categoria professionale può avere preventivi anche del 50% di differenza tra una compagnia e l\'altra, soprattutto in base al modo in cui le compagnie modellano il rischio della specifica attività e dell\'eventuale storico.',
    },
    {
      question: 'Posso stipulare una sola polizza per tutto lo studio?',
      answer:
        'Sì. Per studi associati, Società tra Professionisti (STP) o studi con dipendenti e collaboratori è possibile stipulare un\'unica polizza di studio che copra tutti i professionisti coinvolti. In genere è più economica rispetto a polizze individuali separate e semplifica la gestione amministrativa e i rinnovi.\n\nApprofondimento. La polizza di studio può essere strutturata con un massimale aggregato (condiviso tra tutti gli assicurati) o con massimali individuali per professionista. Va valutata caso per caso in base a tipologia di attività, numero di professionisti e ripartizione delle quote di responsabilità. FIM verifica la struttura più adatta al tuo studio durante la consulenza iniziale.',
    },
    {
      question: 'La polizza copre anche errori commessi in passato?',
      answer:
        'Dipende dalla clausola della polizza. La RC professionale può essere "claims made" (copre le richieste di risarcimento ricevute durante la validità, indipendentemente da quando è stato commesso l\'errore) oppure "loss occurrence" (copre solo i danni avvenuti durante la validità). La scelta influisce in modo significativo sulla continuità della protezione.\n\nApprofondimento. Le "claims made" sono oggi la formula prevalente nel mercato italiano. È fondamentale verificare due elementi: la retroattività (quanti anni indietro copre per fatti passati) e la postuma (per quanto tempo copre dopo la scadenza, importante in caso di cessazione attività o pensionamento). Senza una postuma adeguata, contestazioni che arrivano dopo la chiusura dello studio restano scoperte.',
    },
  ],
}
