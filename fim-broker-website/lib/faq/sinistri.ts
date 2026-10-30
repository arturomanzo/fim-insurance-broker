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
        'La regola del codice civile è tre giorni da quando il sinistro è avvenuto o da quando ne hai avuto notizia (art. 1913 c.c.). È una regola che il contratto può cambiare: alcune polizze casa, infortuni o professionali danno più tempo, e il termine giusto è quello scritto nelle tue condizioni. Per la RC Auto la denuncia si fa con il modulo di constatazione amichevole (art. 143 del Codice delle Assicurazioni) e, se il contratto non dice altro, vale lo stesso termine di tre giorni.\n\nApprofondimento. Il ritardo nella denuncia può comportare la perdita totale o parziale dell\'indennizzo se la compagnia dimostra di aver subito un pregiudizio (es. impossibilità di accertare i fatti). Contatta FIM subito dopo l\'evento, anche prima della scadenza: ti diciamo esattamente quali documenti raccogliere, come compilare la denuncia e quali errori evitare.',
    },
    {
      question: 'Cosa succede se la compagnia non mi vuole risarcire?',
      answer:
        'In caso di diniego o liquidazione parziale ingiusta, hai 4 strumenti per reagire: perizia di parte (per contestare la valutazione del perito della compagnia), reclamo scritto all\'Ufficio Reclami dell\'impresa (risposta entro 45 giorni), ricorso all\'Arbitro Assicurativo, e in ultima istanza la mediazione obbligatoria o l\'azione civile. FIM ti affianca in tutte le fasi.\n\nApprofondimento. Dal 15 gennaio 2026 è operativo l\'Arbitro Assicurativo (arbitroassicurativo.org): se la compagnia non risponde al reclamo entro 45 giorni o risponde in modo insoddisfacente, puoi presentare ricorso online entro 12 mesi, senza avvocato, con un contributo di 20 euro rimborsato in caso di accoglimento. Resta ferma la mediazione assicurativa (D.Lgs. 28/2010), passaggio obbligatorio prima del ricorso giudiziale per molte controversie: spesso le compagnie aprono trattative concrete proprio in questa fase per evitare la causa.',
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
