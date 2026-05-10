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
        'Il D.M. 232/2023 ha fissato massimali minimi diversi per specialità: 1M€ per professioni a basso rischio (es. nutrizionista), fino a 4-5M€ per chirurgie ad alta complessità (ortopedia, chirurgia generale, ginecologia ostetricia). FIM analizza la tua specialità, il volume di prestazioni e la storia sinistri per consigliare il massimale adeguato — ricordando che in caso di danno grave a un paziente giovane le richieste possono superare i 2-3M€.',
    },
    {
      question: 'Sono uno studio dentistico con 3 dipendenti: cosa mi serve davvero?',
      answer:
        'Per uno studio odontoiatrico tipo il pacchetto consigliato è: RC professionale del titolare (e degli altri odontoiatri/igienisti), RC del datore di lavoro per i dipendenti, polizza incendio/furto su locali e riuniti (riuniti, OPT, scanner intraorali sono spesso il bene di valore principale), cyber sanitario per gestione cartelle e fatturazione elettronica, infortuni integrativa per i dipendenti. Il pacchetto base completo per uno studio standard si colloca tipicamente tra 1.500€ e 3.000€/anno.',
    },
  ],
}
