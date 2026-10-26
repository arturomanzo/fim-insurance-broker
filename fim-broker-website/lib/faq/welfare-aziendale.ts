import type { FaqCategory } from '.'
import { notaPremio } from '@/lib/prezzi'

export const welfareAziendaleFaq: FaqCategory = {
  slug: 'welfare-aziendale',
  title: 'Welfare Aziendale',
  cta: {
    text: 'Vuoi disegnare un piano welfare per la tua azienda?',
    description: 'Analisi gratuita del CCNL applicato e delle coperture che servono davvero.',
    primary: { label: 'Prenota Consulenza', href: '/prenota-consulenza' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'I premi delle polizze welfare sono deducibili?',
      answer:
        "Per l'azienda le polizze collettive a favore dei dipendenti sono di regola un costo deducibile, ma il quanto e il come dipendono da come è costruito il piano: obbligo di contratto o accordo, regolamento aziendale, generalità o categorie di dipendenti, limiti per persona. Sono regole fiscali, non assicurative: le impostiamo insieme al tuo commercialista prima di scegliere le polizze.",
    },
    {
      question: 'I dipendenti pagano tasse sui benefit welfare?',
      answer:
        "Molte coperture welfare, se offerte alla generalità dei dipendenti o a categorie omogenee, non concorrono al reddito del dipendente entro i limiti di legge. Ci sono però soglie ed eccezioni, e su alcuni contributi resta un prelievo a carico dell'azienda. Per questo ogni piano va verificato con il commercialista o con il consulente del lavoro.",
    },
    {
      question: 'Devo offrire il welfare a TUTTI i dipendenti?',
      answer:
        'L\'agevolazione fiscale richiede che il welfare sia offerto alla "generalità dei dipendenti" o a "categorie omogenee" (es. tutti i quadri, tutti gli operai, tutti gli impiegati di una sede). Non puoi offrire il benefit solo a singoli dipendenti scelti, pena la riqualificazione fiscale come retribuzione tassata. Puoi però differenziare le categorie (es. salute base per tutti, salute premium solo per i quadri) purché il criterio sia oggettivo e non discrezionale.',
    },
    {
      question: 'Posso introdurre il welfare con un accordo aziendale o serve il CCNL?',
      answer:
        "Puoi introdurre il welfare in tre modi: (1) per obbligo del CCNL applicato (alcuni contratti collettivi prevedono già coperture sanitarie o welfare), (2) tramite accordo aziendale o territoriale firmato con i sindacati (che apre anche alla conversione dei premi di risultato in welfare, entro i limiti di legge), (3) tramite regolamento aziendale unilaterale. Le ultime due modalità danno massima flessibilità. Per piani strutturati e premi di produttività convertibili, l'accordo sindacale è la via più solida.",
    },
    {
      question: 'Quanto costa un piano welfare per una PMI?',
      answer:
        notaPremio('numero ed età dei dipendenti, coperture scelte, massimali ed estensione ai familiari'),
    },
  ],
}
