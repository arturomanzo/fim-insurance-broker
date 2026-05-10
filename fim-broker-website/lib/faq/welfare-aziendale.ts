import type { FaqCategory } from '.'

export const welfareAziendaleFaq: FaqCategory = {
  slug: 'welfare-aziendale',
  title: 'Welfare Aziendale',
  cta: {
    text: 'Vuoi disegnare un piano welfare per la tua azienda?',
    description: 'Analisi gratuita del CCNL applicato e simulazione benefici fiscali per dipendente.',
    primary: { label: 'Prenota Consulenza', href: '/prenota-consulenza' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'I premi delle polizze welfare sono davvero deducibili al 100%?',
      answer:
        "I premi delle polizze welfare collettive (salute, infortuni, LTC) sottoscritte dall'azienda a favore della generalità o di categorie omogenee di dipendenti sono integralmente deducibili dal reddito d'impresa ai sensi dell'art. 100 TUIR (entro il limite del 5 per mille dell'ammontare delle spese per prestazioni di lavoro dipendente) o dell'art. 95 TUIR senza limiti se previste da contratto, accordo o regolamento aziendale. Si deducono anche ai fini IRAP. Per la TCM e la previdenza complementare valgono limiti specifici per dipendente. Verifica sempre con il commercialista la modalità più adatta alla tua azienda.",
    },
    {
      question: 'I dipendenti pagano tasse sui benefit welfare?',
      answer:
        "No, se la polizza è strutturata correttamente. L'art. 51 comma 2 TUIR esclude dalla formazione del reddito di lavoro dipendente i contributi versati dal datore a enti o casse aventi finalità assistenziale (lett. a), nonché le erogazioni in natura per finalità di assistenza sociale, educazione, istruzione, ricreazione (lett. f, f-bis, f-ter), purché offerte alla generalità dei dipendenti o a categorie omogenee. La polizza salute, infortuni e LTC rientrano in questo perimetro. Differente trattamento per i fringe benefit (es. auto aziendale): per il 2024-2025 la soglia di esenzione fringe benefit è elevata a 1.000€ (2.000€ con figli a carico).",
    },
    {
      question: 'Devo offrire il welfare a TUTTI i dipendenti?',
      answer:
        'L\'agevolazione fiscale richiede che il welfare sia offerto alla "generalità dei dipendenti" o a "categorie omogenee" (es. tutti i quadri, tutti gli operai, tutti gli impiegati di una sede). Non puoi offrire il benefit solo a singoli dipendenti scelti, pena la riqualificazione fiscale come retribuzione tassata. Puoi però differenziare le categorie (es. salute base per tutti, salute premium solo per i quadri) purché il criterio sia oggettivo e non discrezionale.',
    },
    {
      question: 'Posso introdurre il welfare con un accordo aziendale o serve il CCNL?',
      answer:
        "Puoi introdurre il welfare in tre modi: (1) per obbligo del CCNL applicato (alcuni contratti — metalmeccanici industria, terziario, edili — prevedono già coperture welfare obbligatorie), (2) tramite accordo aziendale o territoriale firmato con i sindacati (con vantaggi fiscali aggiuntivi su premi di risultato convertiti in welfare ex L. 208/2015 commi 182-190), (3) tramite regolamento aziendale unilaterale. Le ultime due modalità danno massima flessibilità. Per piani strutturati e premi di produttività convertibili, l'accordo sindacale è la via più solida.",
    },
    {
      question: 'Quanto costa un piano welfare base per una PMI con 15 dipendenti?',
      answer:
        "Per una PMI con 15 dipendenti, un pacchetto welfare base con polizza salute collettiva (rimborso visite ed esami in network) e infortuni extra-professionali si colloca tipicamente tra 350€ e 600€ per dipendente all'anno, quindi 5.250-9.000€ totali. Considerando la deducibilità IRES + IRAP (27,9%), il costo netto reale per l'azienda scende a 3.785-6.490€. Il calcolatore in pagina ti dà una stima personalizzata. Ricorda che lo stesso valore in stipendio costerebbe all'azienda quasi il doppio.",
    },
  ],
}
