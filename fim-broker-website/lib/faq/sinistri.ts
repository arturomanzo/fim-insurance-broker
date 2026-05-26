import type { FaqCategory } from '.'

// FAQ riscritte per AEO: risposta diretta in 40-60 parole + Approfondimento
// Contenuto tecnico/normativo invariato.

export const sinistriFaq: FaqCategory = {
  slug: 'sinistri',
  title: 'Gestione Sinistri',
  cta: {
    text: 'Hai un sinistro aperto adesso?',
    description: 'Contattaci subito — ogni ora conta nella gestione di un sinistro.',
    primary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
    secondary: { label: 'Apri pratica online', href: '/sinistri' },
  },
  items: [
    {
      question: 'Quanto tempo ho per denunciare un sinistro?',
      answer:
        'In generale il sinistro va denunciato entro 3 giorni dall\'evento. Per la RC Auto il termine è fissato per legge a 3 giorni dall\'incidente (art. 1913 c.c.). Per altre polizze (casa, infortuni, vita, professionali) i termini possono variare da 3 a 15 giorni a seconda del contratto.\n\nApprofondimento. Il ritardo nella denuncia può comportare la perdita totale o parziale dell\'indennizzo se la compagnia dimostra di aver subito un pregiudizio (es. impossibilità di accertare i fatti). Contatta FIM subito dopo l\'evento, anche prima della scadenza: ti diciamo esattamente quali documenti raccogliere, come compilare la denuncia e quali errori evitare.',
    },
    {
      question: 'Cosa succede se la compagnia non mi vuole risarcire?',
      answer:
        'In caso di diniego o liquidazione parziale ingiusta, hai 3 strumenti per reagire: perizia di parte (per contestare la valutazione del perito della compagnia), procedura di mediazione assicurativa obbligatoria, e in ultima istanza il ricorso all\'IVASS o l\'azione civile. FIM ti affianca in tutte le fasi.\n\nApprofondimento. La mediazione assicurativa (D.Lgs. 28/2010) è un passaggio obbligatorio prima del ricorso giudiziale per molte controversie. Spesso le compagnie aprono trattative concrete proprio in fase di mediazione per evitare la causa. Il ricorso all\'IVASS è gratuito e si attiva online: l\'autorità di vigilanza valuta il caso e può richiedere chiarimenti formali alla compagnia, che hanno spesso un effetto risolutivo.',
    },
    {
      question: 'Il servizio di gestione sinistri ha un costo aggiuntivo?',
      answer:
        'No. Per tutti i clienti FIM, la gestione del sinistro è inclusa senza costi aggiuntivi nel servizio di brokeraggio. Questo è uno dei principali vantaggi di avere un broker rispetto ad acquistare direttamente da una compagnia o online: ti seguiamo personalmente dalla denuncia alla liquidazione.\n\nApprofondimento. Il valore reale del servizio si misura nei sinistri complessi: perizie contestate, danni rilevanti, controversie con la compagnia. In questi casi la differenza tra una gestione amatoriale e una gestione professionale può tradursi in migliaia di euro recuperati. Per FIM la gestione sinistri è un investimento nella relazione di lungo periodo, non un servizio a parte da fatturare.',
    },
    {
      question: 'Posso gestire il sinistro anche se la polizza non è stata stipulata con FIM?',
      answer:
        'Sì. Possiamo affiancarti anche in questo caso, in particolare quando la compagnia oppone resistenza al pagamento o quando il sinistro è di rilievo. Contattaci per una consulenza preliminare gratuita: valuteremo insieme la situazione e ti indicheremo il percorso più efficace.\n\nApprofondimento. In questi casi possiamo intervenire come consulenti tecnici di parte, predisporre lettere formali, organizzare perizie e gestire la procedura di mediazione. Per situazioni che richiedono assistenza legale ti mettiamo in contatto con avvocati specializzati in diritto assicurativo del nostro network. Se la polizza è recente e male impostata, ti suggeriamo anche se conviene spostarla al rinnovo.',
    },
  ],
}
