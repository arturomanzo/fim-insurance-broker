import type { FaqCategory } from '.'
import { SCUOLE_EMAIL } from '@/lib/scuole'

// Le domande della guida all'affidamento del brokeraggio
// (/soluzioni/scuole/affidamento-diretto-brokeraggio). Restano fuori da
// ALL_FAQS: le domande generali sulle scuole stanno già in scuoleFaq.
export const scuoleAffidamentoFaq: FaqCategory = {
  slug: 'scuole-affidamento-brokeraggio',
  title: 'Affidamento del servizio di brokeraggio',
  cta: {
    text: 'Volete sapere come lavoriamo prima di decidere?',
    description:
      "Vi mandiamo per iscritto chi siamo, l'iscrizione al RUI, la polizza di responsabilità professionale e come siamo remunerati. Gli atti dell'affidamento restano vostri.",
    primary: { label: 'Scrivi al Dipartimento Scuole', href: `mailto:${SCUOLE_EMAIL}` },
    secondary: { label: 'Il check-up delle polizze', href: '/soluzioni/scuole#check-up' },
  },
  items: [
    {
      question: 'Il servizio di brokeraggio costa qualcosa alla scuola?',
      answer:
        "Non c'è un esborso diretto. Il broker è remunerato dalla provvigione che l'impresa di assicurazione riconosce sui contratti collocati, già compresa nel premio e dichiarata nell'offerta. Resta comunque un contratto di servizi, per questo segue le regole del Codice dei contratti pubblici e ha un CIG.",
    },
    {
      question: 'Che valore si indica nella determina?',
      answer:
        "Il codice non dà una formula specifica per il brokeraggio. Nella prassi degli istituti il valore si stima come provvigione attesa sui premi delle polizze per tutta la durata dell'incarico, e la determina spiega il criterio usato. Serve per il CIG e per verificare la soglia della procedura.",
    },
    {
      question: 'Possiamo riconfermare il broker che abbiamo già?',
      answer:
        "Il principio di rotazione dell'art. 49 del D.Lgs. 36/2023 vieta di regola di affidare di nuovo allo stesso contraente uscente due affidamenti consecutivi dello stesso settore di servizi. La norma ammette deroghe motivate, ad esempio per l'accurata esecuzione del contratto precedente e la qualità della prestazione: la motivazione va scritta nella decisione a contrarre.",
    },
    {
      question: "Il broker che scegliamo può prepararci gli atti dell'affidamento?",
      answer:
        "Meglio di no. Chi redige gli atti per la stazione appaltante non dovrebbe essere anche chi ne beneficia. Il broker può fornire i propri documenti (iscrizione RUI, polizza di responsabilità professionale, dichiarazioni sui requisiti), ma determina e lettera d'incarico le scrive la segreteria. Dopo l'incarico, invece, assistere la scuola nella gara sulle polizze è proprio il lavoro del broker.",
    },
    {
      question: 'Siamo una scuola paritaria: vale tutto questo?',
      answer:
        "No. Alle scuole paritarie il Codice dei contratti pubblici non si applica: l'incarico al broker si conferisce con un atto interno del gestore. Restano utili le verifiche sul broker, a partire dall'iscrizione al RUI.",
    },
  ],
}
