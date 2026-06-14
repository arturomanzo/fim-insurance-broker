import type { FaqCategory } from '.'

/*
 * Risposte ottimizzate per Featured Snippet / AI Overviews:
 * - 1ª frase autosufficiente in 40-60 parole (sweet spot snippet di Google)
 * - paragrafo "Approfondimento" con i dettagli tecnici originali
 * Il contenuto tecnico è invariato; cambia solo la struttura per AEO.
 */

export const famiglieFaq: FaqCategory = {
  slug: 'famiglie',
  title: 'Polizze per famiglie',
  cta: {
    text: 'Vuoi una consulenza gratuita sulle coperture della tua famiglia?',
    description: 'Analizziamo insieme polizze attive, gap di copertura e duplicati. Senza impegno.',
    primary: { label: 'Prenota Consulenza', href: '/prenota-consulenza' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'La polizza casa è obbligatoria?',
      answer:
        'No, la polizza casa non è obbligatoria per legge in Italia. Diventa però di fatto obbligatoria se hai un mutuo: la banca richiede sempre una copertura incendio e scoppio sull\'immobile come condizione per l\'erogazione. Tutte le altre garanzie (furto, RC capofamiglia, atti vandalici) restano facoltative ma altamente consigliate.\n\nApprofondimento. La RC capofamiglia, di solito inclusa nella polizza casa, copre i danni causati a terzi da te, dai tuoi figli, dai domestici e dagli animali domestici: un singolo risarcimento può superare facilmente le decine di migliaia di euro. Nei condomini il regolamento può inoltre prevedere una polizza globale fabbricati obbligatoria per i singoli proprietari.',
    },
    {
      question: 'Ho già il Servizio Sanitario Nazionale: perché fare anche la salute integrativa?',
      answer:
        'La polizza sanitaria integrativa serve perché il SSN copre le cure essenziali ma con tempi di attesa spesso di mesi per visite ed esami, e senza poter scegliere il medico. L\'integrativa ti permette di accedere a strutture private, scegliere il chirurgo e ottenere rimborsi rapidi su visite ed esami specialistici.\n\nApprofondimento. In Italia circa il 70% della spesa sanitaria annua delle famiglie è out-of-pocket — pagata direttamente senza rimborso. Una polizza salute, che parte da poche centinaia di euro l\'anno per le coperture base, in molti casi si ripaga in pochi anni anche solo con i rimborsi di una visita specialistica o di un piccolo intervento ambulatoriale.',
    },
    {
      question: "Quanto costa un'assicurazione vita e quando serve davvero?",
      answer:
        'Una polizza Temporanea Caso Morte (TCM) per un 35enne non fumatore in buona salute parte da circa 100-150€ all\'anno per un capitale assicurato di 100.000€. Serve quando ci sono persone economicamente dipendenti da te (figli, coniuge non lavorante), un mutuo in corso, o debiti che ricadrebbero sulla famiglia in caso di decesso.\n\nApprofondimento. La TCM è uno dei prodotti assicurativi con il miglior rapporto protezione/costo del mercato: paghi solo se muori nel periodo di copertura, e in caso di sinistro il capitale è esentasse e fuori dall\'asse ereditario. Il premio dipende da età, sesso, stato di salute, abitudine al fumo e capitale richiesto: prima la stipuli, meno costa.',
    },
    {
      question: 'Cosa copre esattamente la polizza casa e cosa non copre?',
      answer:
        'Una polizza casa standard copre: incendio e scoppio, furto e rapina in abitazione, allagamento da impianti interni, danni da eventi atmosferici (grandine, vento) e RC capofamiglia. NON copre di norma: danni da alluvione o terremoto (richiedono la copertura catastrofale separata), usura normale e danni dolosi commessi dall\'assicurato.\n\nApprofondimento. Le polizze più complete includono anche guasti agli impianti elettrico/idraulico, rottura lastre (vetri e specchi), assistenza domiciliare urgente (idraulico, fabbro, elettricista 24/7), responsabilità civile della proprietà e tutela legale. Per immobili in zone a rischio sismico o idrogeologico è fondamentale aggiungere la garanzia catastrofale: dal 2024 è diventata obbligatoria per le imprese e raccomandata per i privati.',
    },
    {
      question: 'Come funziona la Long Term Care (LTC) e a chi serve?',
      answer:
        'La Long Term Care eroga una rendita mensile vitalizia (tipicamente 1.000-2.000€) se il titolare diventa non autosufficiente, cioè non riesce autonomamente a svolgere almeno 3 delle 6 attività quotidiane di base: lavarsi, vestirsi, mangiare, spostarsi, mantenere la continenza, andare in bagno.\n\nApprofondimento. I costi reali di una badante o di una RSA in Italia partono da 1.500-2.500€ al mese e possono superare i 3.500€ per strutture qualificate. Senza una LTC, il peso economico ricade interamente sulla famiglia. Stipulare la polizza prima dei 55-60 anni garantisce premi contenuti e una copertura duratura: dopo i 65 anni l\'accesso diventa difficile e i premi crescono rapidamente.',
    },
  ],
}
