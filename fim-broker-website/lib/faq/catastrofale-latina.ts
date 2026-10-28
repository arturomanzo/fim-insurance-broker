import type { FaqCategory } from '.'
import { OBBLIGO_CATASTROFALE } from '@/lib/catastrofale'

// Pagina P4. I numeri del rischio vengono da lib/rischioLatina.ts (ISPRA
// IdroGEO): qui non si ripetono cifre per comune, così non vanno fuori sincrono.

export const catastrofaleLatinaFaq: FaqCategory = {
  slug: 'catastrofale-latina',
  title: 'Catastrofale in provincia di Latina',
  cta: {
    text: 'Hai un\'impresa o una casa in provincia di Latina?',
    description: 'Mandaci le polizze che hai e l\'indirizzo dei beni: guardiamo insieme mappe ISPRA e condizioni, prima che serva.',
    primary: { label: 'Richiedi analisi gratuita', href: '/preventivo?profilo=pmi&settore=Polizza+Catastrofale' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'Ho un\'impresa in provincia di Latina: la polizza catastrofale è obbligatoria anche per me?',
      answer: `${OBBLIGO_CATASTROFALE} Il comune in cui stai non cambia l'obbligo: cambia quanto rischi e come va scritta la polizza.`,
    },
    {
      question: 'Nella tabella il mio comune ha zero: posso fare a meno della copertura?',
      answer:
        "Lo zero dice che le mappe ufficiali non segnano aree allagabili o franose dove vivono i residenti del tuo comune. Non dice che l'acqua non può arrivare. Se hai un'impresa l'obbligo resta, e comprende anche il terremoto, che queste mappe non misurano.",
    },
    {
      question: 'Per la casa la polizza catastrofale è obbligatoria?',
      answer:
        "No. L'obbligo della legge di bilancio 2024 riguarda le imprese iscritte al Registro delle imprese. Per la casa resta una scelta. Proprio per questo va controllata: molte polizze casa coprono l'incendio ma non alluvione, frana e terremoto, e lo si scopre al primo sinistro.",
    },
    {
      question: 'Cosa vuol dire scenario P1, P2 e P3?',
      answer:
        "Sono gli scenari di alluvione dell'art. 6 del D.Lgs. 49/2010. P3 sono le alluvioni frequenti, con un tempo di ritorno fra 20 e 50 anni. P2 quelle poco frequenti, fra 100 e 200 anni. P1 gli eventi rari o estremi. La polizza si compra proprio per l'evento raro: quello frequente, di solito, lo conosci già.",
    },
    {
      question: 'Dove vedo se il mio indirizzo è in un\'area a rischio?',
      answer:
        "Sulla piattaforma IdroGEO di ISPRA, idrogeo.isprambiente.it, cerchi il comune e guardi le mappe di pericolosità per alluvioni e frane. Se ci mandi l'indirizzo dei beni lo guardiamo insieme, e capiamo quali garanzie servono davvero.",
    },
    {
      question: 'E il terremoto? La provincia di Latina è a rischio?',
      answer:
        "Le mappe ISPRA di questa pagina non lo misurano: la zona sismica di ogni comune la stabilisce la Regione Lazio. Per le imprese il terremoto è dentro l'obbligo, insieme ad alluvioni, frane, inondazioni ed esondazioni. Per la casa è una garanzia da chiedere a parte, e si sceglie leggendo franchigie e limiti di indennizzo.",
    },
  ],
}
