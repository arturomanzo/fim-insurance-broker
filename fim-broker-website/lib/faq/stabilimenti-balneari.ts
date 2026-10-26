import type { FaqCategory } from '.'
import { notaPremio } from '@/lib/prezzi'

export const stabilimentiBalneariFaq: FaqCategory = {
  slug: 'stabilimenti-balneari',
  title: 'Stabilimenti balneari',
  cta: {
    text: 'Gestisci uno stabilimento sul litorale?',
    description: 'Mandaci le polizze in corso e l\'atto di concessione: ti diciamo cosa copre davvero, mareggiate comprese.',
    primary: { label: 'Richiedi analisi gratuita', href: '/preventivo?profilo=pmi' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'La polizza RC è obbligatoria per uno stabilimento balneare?',
      answer:
        "Dipende dalla concessione e dalle regole locali: molti atti di concessione e ordinanze la chiedono espressamente, a volte con un massimale minimo. Anche dove nessuno la impone, un bagnante che si fa male sulla passerella chiede i danni al gestore. Controlliamo cosa chiedono i tuoi documenti e se la polizza che hai ci arriva.",
    },
    {
      question: 'Le mareggiate sono coperte dalla polizza eventi atmosferici?',
      answer:
        "Non sempre. Molte polizze escludono le mareggiate o i beni all'aperto, oppure li coprono con un limite basso. Su uno stabilimento passerelle, cabine e chioschi stanno all'aperto e a pochi metri dall'acqua, quindi è la prima clausola che leggiamo.",
    },
    {
      question: 'Posso assicurare lo stabilimento solo per la stagione?',
      answer:
        "Per alcune garanzie sì, per esempio quelle legate all'attività con il pubblico. Le strutture che restano in spiaggia d'inverno vanno coperte tutto l'anno: le mareggiate arrivano proprio quando lo stabilimento è chiuso.",
    },
    {
      question: 'Bagnini e stagionali sono coperti?',
      answer:
        "L'INAIL copre l'infortunio del lavoratore, ma se l'infortunio dipende da una tua responsabilità l'INAIL può rivalersi su di te, e il lavoratore può chiedere il danno che l'INAIL non paga. Per questo serve la RC verso i prestatori di lavoro (RCO), che deve comprendere anche gli stagionali e chi lavora con contratti brevi.",
    },
    {
      question: "Cos'è una polizza parametrica per il meteo?",
      answer:
        "È una polizza che paga un importo stabilito prima quando si verifica un evento misurato in modo oggettivo, per esempio un certo numero di giorni di pioggia in stagione, senza perizia sul danno. Serve a proteggere l'incasso più che le strutture. Non tutte le compagnie la offrono e le condizioni cambiano molto: la valutiamo caso per caso.",
    },
    {
      question: 'Quanto costa assicurare uno stabilimento balneare?',
      answer: notaPremio('dimensione e posizione dello stabilimento, strutture fisse, servizi di bar e ristorazione, numero di addetti e garanzie scelte'),
    },
  ],
}
