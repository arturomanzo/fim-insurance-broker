import type { FaqCategory } from '.'
import { SCUOLE_EMAIL } from '@/lib/scuole'

export const scuoleFaq: FaqCategory = {
  slug: 'scuole',
  title: 'Assicurazioni per Istituti Scolastici',
  cta: {
    text: 'Volete sapere che cosa copre davvero la polizza della vostra scuola?',
    description:
      'Mandateci le polizze in corso. Le leggiamo per intero, condizioni generali comprese, e vi consegniamo un documento scritto. Nessun costo, nessun impegno.',
    primary: { label: 'Richiedi il check-up gratuito', href: '/soluzioni/scuole#check-up' },
    secondary: { label: 'Scrivi al Dipartimento Scuole', href: `mailto:${SCUOLE_EMAIL}` },
  },
  items: [
    {
      question: "La copertura INAIL non basta per gli alunni?",
      answer:
        "No. L'assicurazione INAIL gestita per conto dello Stato interviene per il personale e per gli alunni solo in attività specifiche (laboratori, educazione fisica, esperienze tecnico-scientifiche) e entro prestazioni delimitate: non rimborsa le spese mediche e non copre la responsabilità civile verso terzi, cioè la culpa in vigilando dell'art. 2048 c.c. Restano scoperti gran parte degli infortuni della vita scolastica: ricreazione, mensa, cortile, uscite. È il motivo per cui quasi tutte le scuole sottoscrivono una polizza integrativa.",
    },
    {
      question: 'Chi paga la polizza integrativa della scuola?',
      answer:
        "Nella scuola statale quasi sempre le famiglie, con un contributo volontario deliberato dal Consiglio d'Istituto e comunicato con circolare; in alcuni istituti la quota del personale passa dal bilancio della scuola. Va verificato istituto per istituto, perché da lì dipendono il capitolato e il modo in cui si comunica il premio alle famiglie, distinguendolo dalle quote obbligatorie.",
    },
    {
      question: 'Quanto costa alla scuola il servizio di brokeraggio?',
      answer:
        "Nulla. Il broker è remunerato dalla provvigione riconosciuta dall'impresa di assicurazione, già compresa nel premio e dichiarata al contraente. L'istituto non sostiene alcun onere per l'analisi delle polizze, per il capitolato, per il confronto delle offerte o per l'assistenza sui sinistri. Se dall'analisi emerge che le coperture in essere vanno bene così, ve lo diciamo e finisce lì.",
    },
    {
      question: 'Serve una gara per nominare un broker?',
      answer:
        "Nella scuola statale l'incarico segue il Codice dei contratti pubblici (D.Lgs. 36/2023): per un servizio senza esborso diretto si procede di norma con affidamento diretto ai sensi dell'art. 50, comma 1, lettera b), con decisione a contrarre motivata del Dirigente Scolastico e nel rispetto del D.I. 129/2018: determina, CIG, principio di rotazione. Nelle scuole paritarie il Codice non si applica e basta un atto interno. In entrambi i casi l'atto è dell'istituto: FIM prepara il supporto documentale, non firma al posto della scuola.",
    },
    {
      question: 'Chi sceglie la compagnia?',
      answer:
        "Sempre e solo l'istituto. FIM trasmette la richiesta di quotazione agli operatori che dispongono di prodotti scolastici, tutti sullo stesso capitolato e sugli stessi dati di rischio, e consegna al Dirigente una relazione comparativa con una raccomandazione motivata. L'affidamento resta un atto della scuola. Chi redige gli atti per conto della stazione appaltante non partecipa alla procedura e non ne trae beneficio diretto (art. 16 D.Lgs. 36/2023): teniamo separate le due cose e lo mettiamo per iscritto.",
    },
    {
      question: 'La responsabilità patrimoniale del Dirigente e del D.S.G.A. è compresa nella polizza della scuola?',
      answer:
        "Di norma no. Dirigente Scolastico e Direttore S.G.A. rispondono in proprio, davanti alla Corte dei conti, del danno erariale causato nell'esercizio delle funzioni: la copertura di responsabilità civile patrimoniale è una polizza della persona, non dell'istituto. Nella nostra esperienza è la garanzia più spesso assente o sottodimensionata. Nel check-up la verifichiamo per prima.",
    },
    {
      question: 'Come funzionano i sinistri con un broker?',
      answer:
        "Il capitolato che scriviamo chiede come requisito minimo la denuncia online accessibile direttamente dalle famiglie, un help desk della compagnia e tempi di liquidazione scritti nel contratto. La segreteria non deve fare da sportello. FIM interviene sui casi che si complicano, sui rapporti con la compagnia e sul controllo che le liquidazioni rispettino quanto pattuito.",
    },
    {
      question: 'Quando conviene muoversi?',
      answer:
        "Le determine di affidamento si concentrano fra giugno e settembre, con decorrenza tipica delle polizze al 1° settembre o al 31 ottobre. Il momento giusto per leggere le polizze è la primavera: da marzo a maggio la segreteria ha il tempo di istruire la pratica senza proroghe tecniche. Con affidamenti triennali la finestra torna una volta ogni tre anni.",
    },
    {
      question: 'Siamo una scuola paritaria: cambia qualcosa?',
      answer:
        "Si semplifica. Non si applica il Codice dei contratti pubblici, quindi incarico e polizza si decidono con un atto interno in tempi brevi. Il pacchetto di solito è più ampio: infortuni, responsabilità civile, incendio e furto sui beni propri, tutela legale, perché edificio e dotazioni sono spesso della scuola e non dell'ente locale.",
    },
  ],
}
