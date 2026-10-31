import type { FaqCategory } from '.'
import { notaPremio } from '@/lib/prezzi'

// Domande della pagina P15 (/soluzioni/aziende-agricole). Norme lette su
// normattiva il 31/10/2026: L. 213/2023, art. 1, c. 111 (esclusione e rinvio alla
// L. 234/2021, art. 1, c. 515 e seguenti), art. 2135 c.c., art. 122 e 122-bis,
// c. 1-ter, CAP. Sul raccolto FIM colloca polizze private, non quelle agevolate con
// contributo pubblico (Arturo, 31/10/2026): niente contributi né consorzi di difesa.
export const aziendeAgricoleFaq: FaqCategory = {
  slug: 'aziende-agricole',
  title: 'Aziende agricole',
  cta: {
    text: 'Hai un\'azienda agricola o un agriturismo?',
    description: 'Mandaci le polizze in corso: ti diciamo cosa copre davvero su serre, fabbricati, mezzi e responsabilità civile.',
    primary: { label: 'Richiedi analisi gratuita', href: '/preventivo?profilo=pmi' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: "La polizza catastrofale è obbligatoria per un'azienda agricola?",
      answer:
        "No. Il comma 111 dell'art. 1 della L. 213/2023 toglie dall'obbligo le imprese agricole dell'art. 2135 c.c. e per loro rinvia alla L. 234/2021 (art. 1, commi 515 e seguenti), che ha istituito un fondo mutualistico nazionale per i danni da alluvione, gelo o brina e siccità alle produzioni agricole, gestito da ISMEA. Quel fondo riguarda il raccolto. Capannoni, stalle, serre e macchinari restano fuori: se un'alluvione li porta via, li paga solo una polizza che hai scelto tu.",
    },
    {
      question: "E un agriturismo?",
      answer:
        "Dipende da chi lo gestisce. L'art. 2135 c.c. conta tra le attività agricole connesse anche la ricezione e l'ospitalità, se le esercita lo stesso imprenditore agricolo con le risorse dell'azienda. In quel caso vale l'esclusione dall'obbligo catastrofale. Se l'ospitalità la gestisce un'impresa diversa, l'esclusione va verificata sulla visura. In tutti e due i casi agli ospiti serve una responsabilità civile che copra camere, ristorazione e attività in azienda.",
    },
    {
      question: 'Il trattore che lavora solo nei campi deve avere la RC auto?',
      answer:
        "Se è immatricolato ed esce su strada, sì, come ogni veicolo a motore (art. 122 del Codice delle Assicurazioni). La legge fa un'eccezione per le macchine agricole non immatricolate o senza certificato di idoneità che lavorano solo dentro fondi, aziende agrarie o spazi non accessibili al pubblico (art. 122-bis, comma 1-ter): per loro non serve la RC auto, ma serve comunque una polizza di responsabilità civile verso terzi. Senza, il danno che fanno resta tuo.",
    },
    {
      question: 'Le serre sono coperte dalla polizza incendio ed eventi atmosferici?',
      answer:
        "Non è detto. Molte polizze trattano serre e tunnel come beni a parte, oppure escludono i danni alle coperture in plastica o in vetro e quelli da peso della neve, o li coprono con un limite basso. Su un'azienda con serre è la prima clausola che leggiamo, insieme a cosa succede alle colture che stanno dentro.",
    },
    {
      question: 'Braccianti e stagionali sono coperti?',
      answer:
        "L'INAIL copre l'infortunio del lavoratore, ma se dipende da una tua responsabilità l'INAIL può rivalersi su di te, e il lavoratore può chiedere il danno che l'INAIL non paga. Per questo serve la responsabilità civile verso i prestatori di lavoro (RCO), che deve comprendere anche chi lavora per la sola stagione.",
    },
    {
      question: 'Assicurate anche il raccolto?',
      answer:
        "Sì, con polizze private sulle colture in campo, contro la grandine e gli altri eventi scritti nel contratto. Non lavoriamo con le polizze agevolate che passano dai consorzi di difesa e prevedono un contributo pubblico. La polizza va firmata prima della stagione: il danno di una grandinata già caduta non si assicura più. Prima di firmare guardiamo con te il valore dichiarato della produzione, la soglia di danno sotto la quale non si paga e la franchigia di ogni coltura.",
    },
    {
      question: "Quanto costa assicurare un'azienda agricola?",
      answer: notaPremio('superficie e tipo di colture, fabbricati e serre, numero di mezzi, addetti, attività connesse come agriturismo o vendita diretta e garanzie scelte'),
    },
  ],
}
