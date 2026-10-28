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
        "Sì. La L. 24/2017 (Gelli-Bianco) ha reso obbligatoria la copertura assicurativa per tutti gli esercenti professioni sanitarie, sia nell'attività libero-professionale sia in quella in regime di dipendenza (con polizza per colpa grave). L'obbligo è ribadito dal D.M. 232/2023 che ha definito i requisiti minimi delle polizze (massimali, retroattività, ultrattività). Esercitare senza copertura espone a sanzioni disciplinari, rischio penale per l'esercizio dell'attività e responsabilità patrimoniale illimitata.",
    },
    {
      question: 'Cosa cambia tra RC libero-professionale e Colpa Grave per dipendenti SSN?',
      answer:
        "La RC libero-professionale copre l'attività privata del medico (studio, intramoenia, consulenze) e risponde direttamente al paziente per qualsiasi grado di colpa. La Colpa Grave per dipendenti SSN o strutture private convenzionate copre invece la rivalsa che la struttura può esercitare sul medico in caso di colpa grave: la struttura risarcisce il paziente, poi può chiedere al medico fino a 3 volte la retribuzione lorda annua. Sono due polizze distinte e spesso necessarie entrambe per chi svolge attività mista.",
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
