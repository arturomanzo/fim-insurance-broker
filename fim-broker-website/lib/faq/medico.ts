import type { FaqCategory } from '.'

export const medicoFaq: FaqCategory = {
  slug: 'medico',
  title: 'Polizze per il settore Sanitario',
  cta: {
    text: 'Sei un medico, dentista o struttura sanitaria?',
    description: 'Verifica gratuita della tua RC Gelli-Bianco e analisi completa dei rischi clinici.',
    primary: { label: 'Richiedi verifica', href: '/preventivo?profilo=medico' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'La RC professionale medica è davvero obbligatoria?',
      answer:
        "Sì, in due forme. Chi lavora in libera professione deve avere la propria RC professionale (L. 24/2017, art. 10, c. 2). Chi lavora a qualunque titolo in una struttura pubblica o privata deve avere, a proprie spese, una polizza per colpa grave (art. 10, c. 3): il paziente di solito chiede i danni alla struttura, che poi può rivalersi. Il D.M. 232/2023 fissa i requisiti minimi delle polizze. Lavorare senza la polizza dovuta è un illecito disciplinare (D.P.R. 137/2012, art. 5) e lascia scoperto il patrimonio personale.",
    },
    {
      question: 'Cosa cambia tra RC libero-professionale e polizza per colpa grave?',
      answer:
        "La RC libero-professionale copre l'attività in proprio, nello studio o in una struttura privata dove il paziente ha un contratto con te, per qualsiasi grado di colpa. La polizza per colpa grave serve a chi lavora in struttura: la struttura risarcisce il paziente, poi può rivalersi sul sanitario solo per dolo o colpa grave, e per la colpa grave non oltre il triplo della retribuzione o del reddito professionale annuo (L. 24/2017, art. 9). L'intramoenia la copre la struttura. Chi fa attività mista ha bisogno di tutte e due le polizze.",
    },
    {
      question: 'Quale massimale scegliere per la RC sanitaria?',
      answer:
        'Per il libero professionista il D.M. 232/2023 (art. 4, comma 2) fissa minimi di 1.000.000 € per sinistro, che salgono a 2.000.000 € per chi svolge anche attività chirurgica, ortopedica, anestesiologica o di parto; il massimale per anno deve essere almeno il triplo di quello per sinistro. Per le strutture che fanno chirurgia, ortopedia, anestesia o parto il minimo sale a 5.000.000 € per sinistro. Il minimo di legge è il punto di partenza, non la scelta giusta: guardiamo la tua specialità, il volume di prestazioni e la storia sinistri, perché il danno grave a un paziente giovane può portare richieste molto più alte del minimo.',
    },
    {
      question: 'Sono uno studio dentistico con 3 dipendenti: cosa mi serve davvero?',
      answer:
        'Per uno studio odontoiatrico tipo il pacchetto consigliato è: RC professionale del titolare (e degli altri odontoiatri/igienisti), RC del datore di lavoro per i dipendenti, polizza incendio/furto su locali e riuniti (riuniti, OPT, scanner intraorali sono spesso il bene di valore principale), cyber sanitario per gestione cartelle e fatturazione elettronica, infortuni integrativa per i dipendenti. Il premio dipende da specialità, numero di professionisti, valore delle attrezzature e massimali: lo calcoliamo sul vostro studio.',
    },
  ],
}
