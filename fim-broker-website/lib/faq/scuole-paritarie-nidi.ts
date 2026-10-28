import type { FaqCategory } from '.'
import { SCUOLE_EMAIL } from '@/lib/scuole'
import { BENI_DA_ASSICURARE, CHI_E_OBBLIGATO, EVENTI_CATASTROFALI, NORMA_CATASTROFALE } from '@/lib/catastrofale'

// Domande della pagina P13 (/soluzioni/scuole/paritarie-asili-nido). Norme lette
// su normattiva il 28/10/2026: D.L. 48/2023 art. 18 (commi 2 e 4-bis), L. 62/2000
// art. 1, D.Lgs. 65/2017 art. 2. Restano fuori da ALL_FAQS come le altre FAQ
// delle sottopagine scuole. Niente premi, massimali o compagnie.
export const scuoleParitarieNidiFaq: FaqCategory = {
  slug: 'scuole-paritarie-nidi',
  title: 'Scuole paritarie e asili nido',
  cta: {
    text: 'Gestite una paritaria o un nido?',
    description:
      'Mandateci le polizze che avete. Le leggiamo per intero e vi diciamo per iscritto cosa copre, cosa manca e cosa si paga due volte.',
    primary: { label: 'Scrivi al Dipartimento Scuole', href: `mailto:${SCUOLE_EMAIL}` },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'Per scegliere il broker o la polizza serve una gara?',
      answer:
        "No. Il Codice dei contratti pubblici riguarda le amministrazioni, non il gestore privato di una paritaria o di un nido. Incarico e polizze si decidono con un atto interno del gestore. Conviene comunque mettere per iscritto cosa chiedete alle compagnie, così le offerte si confrontano sullo stesso testo.",
    },
    {
      question: 'Gli alunni di una paritaria sono assicurati dall\'INAIL?',
      answer:
        "Sì, per gli infortuni durante le attività didattiche e quelle del Piano triennale dell'offerta formativa. L'art. 18 del D.L. 48/2023, strutturale dall'anno scolastico 2025/2026, comprende gli alunni delle scuole del sistema nazionale di istruzione, che per la L. 62/2000 sono statali e paritarie, e anche delle non paritarie. Ma l'INAIL indennizza il danno permanente solo dal 6 per cento in su e non rimborsa le cure private: la polizza infortuni della scuola serve ancora.",
    },
    {
      question: 'E i bambini del nido?',
      answer:
        "L'art. 18 parla di alunni delle scuole. I nidi il D.Lgs. 65/2017 li chiama servizi educativi per l'infanzia, distinti dalle scuole dell'infanzia, e la norma non li nomina. Per un bambino che si fa male al nido la tutela da guardare è la polizza infortuni del gestore, insieme alla sua responsabilità civile.",
    },
    {
      question: 'Il gestore risponde anche se il bambino si fa male da solo?',
      answer:
        "Sì. Con l'iscrizione nasce un rapporto contrattuale: la famiglia deve provare che il danno è avvenuto mentre il bambino era affidato alla struttura, il gestore deve provare che l'evento non gli era imputabile. Se il danno lo causa un compagno vale l'art. 2048 c.c., la responsabilità di chi vigila. Per questo la RC del gestore deve coprire tutti e due i casi, e tutto il personale, anche educatori esterni e volontari.",
    },
    {
      question: 'La polizza catastrofale riguarda anche noi?',
      answer: `Se il gestore è un'impresa sì. La ${NORMA_CATASTROFALE} obbliga ${CHI_E_OBBLIGATO} ad assicurare ${BENI_DA_ASSICURARE} contro ${EVENTI_CATASTROFALI}. Una cooperativa o una società che gestisce il nido rientra; un ente non iscritto al Registro delle imprese no, ma i beni restano esposti allo stesso modo.`,
    },
  ],
}
