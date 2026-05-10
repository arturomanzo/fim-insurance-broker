import type { FaqCategory } from '.'

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
        "Non per legge, ma di fatto spesso sì: la maggior parte dei mutui richiede almeno una polizza incendio e scoppio sull'immobile come condizione per l'erogazione. La RC capofamiglia, inclusa nella polizza casa, è invece altamente raccomandata: copre danni causati a terzi da te, dai tuoi figli, dai domestici e dagli animali domestici. I costi di un risarcimento senza copertura possono essere devastanti.",
    },
    {
      question: 'Ho già il Servizio Sanitario Nazionale: perché fare anche la salute integrativa?',
      answer:
        'Il SSN garantisce le cure essenziali, ma con tempi di attesa spesso lunghi (mesi per una risonanza o una visita specialistica) e senza la possibilità di scegliere il medico. La polizza sanitaria integrativa ti permette di accedere a strutture private, scegliere il chirurgo, ed ottenere rimborsi per visite ed esami. In Italia il 70% delle spese sanitarie annue sono out-of-pocket: una polizza salute spesso si ripaga in pochi anni.',
    },
    {
      question: "Quanto costa un'assicurazione vita e quando serve davvero?",
      answer:
        'Una polizza temporanea caso morte (TCM) per un 35enne non fumatore in buona salute parte da circa 100-150€/anno per un capitale assicurato di 100.000€. Serve soprattutto se hai persone economicamente dipendenti da te (figli, coniuge non lavorante), un mutuo in corso, o debiti che ricadrebbero sui tuoi familiari. È uno dei prodotti con il miglior rapporto protezione/costo del mercato assicurativo.',
    },
    {
      question: 'Cosa copre esattamente la polizza casa e cosa non copre?',
      answer:
        "Una polizza casa standard copre: incendio e scoppio, furto e rapina in abitazione, allagamento da impianti interni, danni da eventi atmosferici (grandine, vento), RC capofamiglia. Non copre solitamente: danni da alluvione o terremoto (richiedono copertura catastrofale separata), usura normale, danni dolosi. Le polizze più complete includono anche guasti agli impianti, rottura lastre e assistenza domiciliare urgente.",
    },
    {
      question: 'Come funziona la Long Term Care (LTC) e a chi serve?',
      answer:
        'La LTC eroga una rendita mensile (es. 1.000-2.000€/mese) se il titolare diventa non autosufficiente, ovvero non riesce autonomamente a svolgere almeno 3 delle 6 attività quotidiane di base (lavarsi, vestirsi, mangiare, spostarsi, continuenza, andare in bagno). I costi di una badante o di una RSA in Italia partono da 1.500-2.500€/mese. Stipulare la LTC prima dei 55-60 anni garantisce premi contenuti e una copertura duratura.',
    },
  ],
}
