import type { FaqCategory } from '.'
import { SCUOLE_EMAIL } from '@/lib/scuole'

// Domande della pagina P20 (/soluzioni/scuole/assicurazione-pcto). Norme lette
// su normattiva il 28/10/2026: D.L. 48/2023 art. 18, D.L. 159/2025 art. 7
// (tragitto casa-azienda e divieto di lavorazioni ad elevato rischio),
// D.Lgs. 81/2008 art. 2, c. 1, lett. a). Il 6 per cento viene dall'art. 13 del
// D.Lgs. 38/2000, già nel registro delle norme. Restano fuori da ALL_FAQS come
// le altre FAQ delle sottopagine scuole. Niente premi, massimali o compagnie.
export const scuolePctoFaq: FaqCategory = {
  slug: 'scuole-pcto',
  title: 'Assicurazione nei percorsi scuola-lavoro',
  cta: {
    text: 'Prima di firmare le convenzioni di quest\'anno',
    description:
      'Mandateci la polizza della scuola e una convenzione tipo. Vi diciamo per iscritto se gli studenti in azienda sono coperti per quello che può succedere davvero.',
    primary: { label: 'Scrivi al Dipartimento Scuole', href: `mailto:${SCUOLE_EMAIL}` },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'Lo studente che si fa male in azienda è coperto dall\'INAIL?',
      answer:
        "Sì. La tutela dell'art. 18 del D.L. 48/2023, strutturale dall'anno scolastico 2025/2026, comprende le attività del Piano triennale dell'offerta formativa, e i percorsi scuola-lavoro ne fanno parte. Ma l'INAIL indennizza il danno permanente solo dal 6 per cento in su: il braccio rotto che guarisce bene resta alla polizza infortuni della scuola.",
    },
    {
      question: 'E se si fa male andando in azienda?',
      answer:
        "Anche il tragitto è coperto. L'art. 7 del D.L. 159/2025 ha chiarito, con una norma di interpretazione che vale anche per il passato, che la tutela INAIL comprende il percorso dall'abitazione o dal domicilio dello studente al luogo del percorso scuola-lavoro, e ritorno. Il tragitto casa-scuola di tutti i giorni invece resta fuori.",
    },
    {
      question: 'Se lo studente rompe un macchinario dell\'azienda, chi paga?',
      answer:
        "Dipende da due carte: la convenzione e la polizza di responsabilità civile della scuola. Molte RC escludono i danni alle cose che l'assicurato ha in uso o in consegna, e l'attrezzatura dell'azienda è proprio quello. Prima di firmare le convenzioni conviene leggere quella esclusione e, se serve, chiedere un'estensione scritta.",
    },
    {
      question: 'Lo studente in azienda è un lavoratore per la sicurezza?',
      answer:
        "Per il D.Lgs. 81/2008 sì: l'art. 2 equipara al lavoratore chi partecipa a iniziative di alternanza tra studio e lavoro. Vuol dire formazione sulla sicurezza, dispositivi di protezione e, se i rischi lo richiedono, sorveglianza sanitaria, come per i dipendenti. Dal 2025 la legge vieta anche di adibire gli studenti a lavorazioni ad elevato rischio, così come le individua il documento di valutazione dei rischi dell'azienda (art. 7 del D.L. 159/2025).",
    },
    {
      question: 'Siamo l\'azienda che ospita: dobbiamo assicurarci in più?',
      answer:
        "Prima leggete la convenzione, che dice chi assicura cosa. Poi controllate due cose nella vostra polizza: che gli studenti ospitati non siano esclusi dalla responsabilità civile verso terzi o verso i prestatori di lavoro, e che la copertura valga per i danni che subiscono mentre usano le vostre attrezzature. È una telefonata al vostro intermediario, prima di firmare la convenzione.",
    },
  ],
}
