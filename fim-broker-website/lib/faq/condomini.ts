import type { FaqCategory } from '.'

export const condominiFaq: FaqCategory = {
  slug: 'condomini',
  title: 'Polizze per Condomini',
  cta: {
    text: 'Sei amministratore o consigliere di condominio?',
    description: 'Verifica gratuita della polizza globale fabbricato e della RC amministratore: massimali, esclusioni, coperture mancanti.',
    primary: { label: 'Richiedi verifica', href: '/prenota-consulenza' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'La polizza globale fabbricato è obbligatoria per legge?',
      answer:
        'Non esiste un obbligo di legge generalizzato, ma la polizza incendio fabbricato è quasi sempre prevista dal regolamento condominiale e richiesta dalle banche per i mutui sulle singole unità. In pratica, un condominio senza copertura assicurativa è esposto a rischi enormi: in caso di incendio o crollo strutturale, tutti i condomini risponderebbero in proporzione alle quote millesimali, potenzialmente con il proprio patrimonio personale.',
    },
    {
      question: 'La polizza RC dell\'amministratore è un obbligo di legge?',
      answer:
        "Non per legge in ogni caso. Dopo la riforma del 2012 l'art. 1129 del Codice Civile dice che l'assemblea può subordinare la nomina dell'amministratore a una polizza di responsabilità civile per gli atti compiuti nel mandato; se poi delibera lavori straordinari, l'amministratore deve adeguare il massimale. Conviene chiederla sempre: molti amministratori hanno polizze con massimali bassi o clausole limitative, e quelle le leggiamo noi prima della nomina.",
    },
    {
      question: 'Chi paga la polizza condominiale? Come si ripartisce il costo?',
      answer:
        "Le polizze condominiali (globale fabbricato, RC ascensore, ecc.) sono spese ordinarie di gestione condominiale: si ripartiscono tra i condomini in base alle quote millesimali della tabella generale. La RC Amministratore, invece, viene pagata o dal condominio come spesa di gestione (più comune) oppure direttamente dall'amministratore come costo professionale.",
    },
    {
      question: 'La polizza copre anche i danni ai singoli appartamenti?',
      answer:
        'La globale fabbricato copre le parti comuni (scale, tetto, muri perimetrali, impianti centralizzati) e spesso anche i danni derivanti dalle parti comuni alle proprietà individuali (es. infiltrazioni dal tetto). Non copre i beni personali nelle singole unità abitative né i danni interni causati da eventi all\'interno dell\'appartamento stesso — per questo ogni condomino dovrebbe avere la propria polizza casa individuale.',
    },
    {
      question: 'Come si gestisce un sinistro in un condominio assicurato da FIM?',
      answer:
        "In caso di sinistro, l'amministratore segnala il danno a FIM tramite email o telefono. FIM attiva la compagnia, coordina il sopralluogo del perito e segue l'istruttoria fino alla liquidazione. Il condominio non deve gestire direttamente la trattativa con la compagnia: ci pensiamo noi. Per i sinistri urgenti (es. allagamento, crollo) è disponibile un numero di assistenza H24.",
    },
  ],
}
