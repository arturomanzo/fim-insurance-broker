import type { FaqCategory } from '.'

export const artigianiPmiFaq: FaqCategory = {
  slug: 'artigiani-pmi',
  title: 'Polizze per Artigiani e PMI',
  cta: {
    text: 'Non sai quali coperture servono davvero alla tua attività?',
    description: 'Analisi gratuita dei rischi e proposta su misura, senza impegno.',
    primary: { label: 'Prenota Consulenza', href: '/prenota-consulenza' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'Quali assicurazioni sono obbligatorie per un datore di lavoro?',
      answer:
        "Per i datori di lavoro con dipendenti, la principale assicurazione obbligatoria è quella INAIL (Infortuni sul Lavoro), gestita direttamente dall'ente. A questa si aggiunge la RC auto per i veicoli aziendali (obbligatoria per legge). Per alcune attività specifiche (es. impianti termici, ascensori, gru) ci sono ulteriori obblighi. Molte altre coperture (RC impresa, incendio, ecc.) non sono obbligatorie per legge ma sono prassi comune e spesso richieste da clienti/appaltanti.",
    },
    {
      question: "Ho già l'INAIL: perché dovrei fare anche la polizza infortuni integrativa?",
      answer:
        "L'INAIL copre solo gli infortuni sul lavoro e le malattie professionali, ma con limiti importanti: la rendita INAIL per invalidità permanente è calcolata sulla retribuzione dichiarata (spesso bassa per molti artigiani), non copre le prime 3 giorni di inabilità temporanea, e non copre le spese mediche eccedenti il Servizio Sanitario. La polizza integrativa colma questi gap: indennità giornaliera sin dal primo giorno, rimborso spese mediche private, e capitali aggiuntivi per invalidità grave.",
    },
    {
      question: 'Cosa copre esattamente la RC impresa e quanto costa?',
      answer:
        "La RC impresa copre i danni causati a terzi (clienti, fornitori, passanti) connessi allo svolgimento dell'attività: un cliente scivolato nel tuo negozio, un prodotto venduto che si rivela difettoso, danni causati da tuoi dipendenti durante il lavoro. Il costo dipende dal settore di attività, dal fatturato e dal massimale scelto. Per una piccola attività commerciale o artigianale si parte da circa 300€/anno.",
    },
    {
      question: 'Come funziona la polizza all-risk capannone?',
      answer:
        "La polizza all-risk (o multirischio) per attività copre la struttura fisica (muri, tetto, impianti fissi), le attrezzature e i macchinari, le merci e le scorte, e spesso include anche la copertura per interruzione di esercizio. Si tratta di una copertura 'a tutto rischio' che indennizza tutti i danni salvo quelli espressamente esclusi, a differenza delle polizze 'a rischi nominati' che coprono solo i rischi espressamente elencati.",
    },
    {
      question: 'Sono un piccolo artigiano con un solo dipendente: ho bisogno di tutto questo?',
      answer:
        'Non necessariamente tutto insieme. La priorità dipende dalla tua attività. Per un artigiano con un dipendente, il minimo consigliato è: RC impresa (per i danni a terzi) + infortuni integrativa per il dipendente + polizza incendio sul locale e le attrezzature. Insieme, per molte categorie, si parte da circa 800-1.000€/anno. Ti aiutiamo a capire cosa è davvero indispensabile per la tua situazione specifica.',
    },
  ],
}
