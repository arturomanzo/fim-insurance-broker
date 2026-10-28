import type { FaqCategory } from '.'
import { notaPremio } from '@/lib/prezzi'

// Obblighi letti sull'art. 13-ter del D.L. 18 ottobre 2023, n. 145, testo
// vigente su normattiva al 28/10/2026: CIN, dispositivi di sicurezza, SCIA per
// chi affitta in forma d'impresa. Nessun obbligo di polizza.

export const affittiBreviFaq: FaqCategory = {
  slug: 'affitti-brevi',
  title: 'Affitti brevi',
  cta: {
    text: 'Affitti casa per pochi giorni sul litorale?',
    description: 'Mandaci la polizza casa che hai e dicci quante notti affitti all\'anno: ti diciamo cosa copre davvero quando ci sono gli ospiti.',
    primary: { label: 'Richiedi analisi gratuita', href: '/preventivo?profilo=privato' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'Per affittare casa ai turisti la polizza è obbligatoria?',
      answer:
        "La norma nazionale sugli affitti brevi, l'art. 13-ter del D.L. 145/2023, non impone una polizza: chiede il CIN, i dispositivi di sicurezza e, a chi affitta in forma d'impresa, la SCIA. La polizza però può chiederla il regolamento del condominio o la piattaforma, e soprattutto serve a te: se un ospite si fa male o allaga il piano di sotto, la richiesta di danni arriva al proprietario.",
    },
    {
      question: 'Cos\'è il CIN e cosa rischio se non ce l\'ho?',
      answer:
        "È il codice identificativo nazionale che assegna il Ministero del turismo a ogni appartamento affittato per brevi periodi o per finalità turistiche. Va esposto all'esterno dello stabile e indicato in ogni annuncio. Senza CIN la sanzione va da 800 a 8.000 euro; se non lo esponi o non lo indichi negli annunci, da 500 a 5.000 euro e l'annuncio viene rimosso.",
    },
    {
      question: 'Rilevatori di gas ed estintori sono obbligatori anche per chi affitta da privato?',
      answer:
        "Sì. Ogni appartamento deve avere rilevatori funzionanti di gas combustibili e di monossido di carbonio ed estintori portatili a norma, in posizione visibile e accessibile: uno ogni 200 metri quadrati di pavimento, con almeno uno per piano. Chi affitta in forma d'impresa deve avere anche gli impianti a norma. Se mancano i dispositivi la sanzione va da 600 a 6.000 euro per ogni violazione.",
    },
    {
      question: 'La mia polizza casa copre anche quando affitto?',
      answer:
        "Spesso no, o non del tutto. Molte polizze casa sono scritte per un'abitazione usata dal proprietario o affittata con un contratto lungo. Se l'uso cambia e la compagnia non lo sa, dopo un sinistro può contestare la copertura. È la prima cosa che controlliamo, e va dichiarata prima, non dopo.",
    },
    {
      question: 'Le protezioni di Airbnb e Booking non bastano?',
      answer:
        "Possono aiutare, ma le decide la piattaforma, con limiti, esclusioni e tempi di richiesta suoi. Non sono un contratto intestato a te. Le leggiamo come leggeremmo una polizza e ti diciamo cosa lasciano scoperto.",
    },
    {
      question: 'Quanto costa assicurare un appartamento in affitto breve?',
      answer: notaPremio('valore dell\'immobile e degli arredi, zona, notti affittate in un anno, modalità di gestione e garanzie scelte'),
    },
  ],
}
