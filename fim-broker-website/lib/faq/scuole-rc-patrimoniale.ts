import type { FaqCategory } from '.'
import { SCUOLE_EMAIL } from '@/lib/scuole'

// Domande della pagina P12 (/soluzioni/scuole/rc-patrimoniale-dirigente-dsga).
// Norme lette su normattiva il 28/10/2026: L. 20/1994 art. 1 (commi 1, 1-octies,
// 2, 4-bis, testo vigente dopo la L. 1/2026), D.L. 200/2025 art. 1 c. 19-quinquies
// (4-bis dal 1° gennaio 2027), L. 244/2007 art. 3 c. 59, L. 312/1980 art. 61.
// Restano fuori da ALL_FAQS come le altre FAQ delle sottopagine scuole.
// Niente premi, massimali o compagnie (regole del Dipartimento Scuole).
export const scuoleRcPatrimonialeFaq: FaqCategory = {
  slug: 'scuole-rc-patrimoniale',
  title: 'RC patrimoniale di Dirigente e D.S.G.A.',
  cta: {
    text: 'Vuoi arrivare al 2027 con la polizza giusta?',
    description:
      'Mandaci la polizza che hai, se ce l\'hai. Ti diciamo in modo riservato se regge: retroattività, postuma, cosa esclude. È una questione tua, non della scuola.',
    primary: { label: 'Scrivi al Dipartimento Scuole', href: `mailto:${SCUOLE_EMAIL}` },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'Dal 2027 la RC patrimoniale è obbligatoria per Dirigenti e D.S.G.A.?',
      answer:
        "La riforma della Corte dei conti (L. 7 gennaio 2026, n. 1) ha aggiunto all'art. 1 della L. 20/1994 il comma 4-bis: chi assume un incarico che comporta la gestione di risorse pubbliche, e per questo risponde davanti alla Corte dei conti, deve stipulare prima dell'incarico una polizza per i danni patrimoniali causati all'amministrazione per colpa grave. Il D.L. 200/2025 ne ha spostato l'applicazione al 1° gennaio 2027. Dirigente e D.S.G.A. gestiscono risorse pubbliche: la nostra raccomandazione è arrivare a quella data con la polizza già in mano.",
    },
    {
      question: 'Può pagarla la scuola?',
      answer:
        "No. L'art. 3, comma 59, della L. 244/2007 rende nullo il contratto con cui un ente pubblico assicura i propri amministratori per la responsabilità verso lo Stato e per quella contabile, e prevede il rimborso di dieci volte i premi come danno erariale. La nuova norma mette l'obbligo in capo a chi assume l'incarico. La polizza la intesta e la paga la persona.",
    },
    {
      question: 'La legge fissa un massimale minimo?',
      answer:
        "No, il comma 4-bis non indica massimali né altre condizioni. Il massimale si sceglie guardando quanto puoi essere chiamato a pagare: per la colpa grave la Corte dei conti mette a carico del responsabile non più del 30 per cento del danno accertato e comunque non più del doppio della retribuzione lorda annua (art. 1, comma 1-octies, L. 20/1994). Se c'è dolo o illecito arricchimento quel limite non vale, e nessuna polizza copre il dolo.",
    },
    {
      question: 'Perché conta la retroattività?',
      answer:
        "Perché queste polizze sono quasi sempre claims made: pagano le richieste che arrivano mentre il contratto è attivo, per fatti avvenuti dopo la data di retroattività. Il diritto al risarcimento del danno erariale si prescrive in cinque anni dal fatto. Una polizza che parte oggi senza retroattività lascia scoperti gli atti che hai già firmato.",
    },
    {
      question: 'E quando vado in pensione o cambio scuola?',
      answer:
        "La richiesta della Procura contabile può arrivare anni dopo. Serve una garanzia postuma, che tenga coperti i fatti del periodo di servizio anche dopo la fine dell'incarico. Va chiesta prima, non quando arriva l'invito a dedurre.",
    },
    {
      question: 'Se un alunno si fa male, il Dirigente risponde di tasca propria?',
      answer:
        "Verso la famiglia risponde l'amministrazione, che si surroga al personale nelle azioni dei terzi. Poi può rivalersi su chi doveva vigilare, ma solo per dolo o colpa grave (art. 61 della L. 312/1980). È uno dei casi in cui la RC patrimoniale lavora, insieme agli atti di gestione: contratti, pagamenti, procedure del personale.",
    },
  ],
}
