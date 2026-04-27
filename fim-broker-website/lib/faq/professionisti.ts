import type { FaqCategory } from '.'

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
        'Per molte categorie sì: avvocati (L. 247/2012), ingegneri e architetti (D.P.R. 137/2012), medici e sanitari (L. 24/2017), commercialisti (D.Lgs. 139/2005). Anche per i liberi professionisti non soggetti a obbligo di legge, la RC professionale è fortemente raccomandata: una singola contestazione non coperta può azzzerare anni di lavoro.',
    },
    {
      question: 'Cosa succede concretamente se faccio un errore professionale?',
      answer:
        "Il cliente subisce un danno economico per colpa tua (es. un avvocato perde un'udienza per dimenticanza, un commercialista sbaglia una dichiarazione IVA). Il cliente ti chiede un risarcimento. La RC professionale copre: le spese legali per difenderti, l'eventuale risarcimento al cliente fino al massimale della polizza, e il costo peritale per valutare il danno.",
    },
    {
      question: 'Come si calcola il premio della RC professionale?',
      answer:
        "Il premio dipende da: categoria professionale, volume d'affari/fatturato annuo, massimale richiesto (in genere da 500.000€ a 3M€), storico sinistri, e eventuali attività specifiche ad alto rischio. FIM confronta le offerte delle principali compagnie per trovare il miglior rapporto qualità/prezzo per la tua situazione specifica.",
    },
    {
      question: 'Posso stipulare una sola polizza per tutto lo studio?',
      answer:
        'Sì, per studi associati, STP o studi con dipendenti/collaboratori è possibile stipulare una polizza di studio che copra tutti i professionisti. In genere è più economica rispetto a più polizze individuali e semplifica la gestione. Verifichiamo insieme la struttura più adatta al tuo studio.',
    },
    {
      question: 'La polizza copre anche errori commessi in passato?',
      answer:
        "Le RC professionali possono avere clausola 'claims made' (copertura per richieste ricevute durante la validità della polizza) o 'loss occurrence' (copertura per danni avvenuti durante la validità). La scelta influisce significativamente sulla continuità della protezione: ti spieghiamo la differenza e quale conviene nel tuo caso.",
    },
  ],
}
