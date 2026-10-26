import type { FaqCategory } from '.'
import { notaPremio } from '@/lib/prezzi'

export const flottaAziendaleFaq: FaqCategory = {
  slug: 'flotta-aziendale',
  title: 'Flotta aziendale e libro matricola',
  cta: {
    text: 'Hai più mezzi aziendali con polizze e scadenze diverse?',
    description: 'Mandaci le polizze che hai: le mettiamo in fila mezzo per mezzo e ti diciamo cosa allineare.',
    primary: { label: 'Richiedi preventivo flotta', href: '/preventivo?profilo=pmi&settore=Flotta+Aziendale' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'Da quanti veicoli si parla di flotta?',
      answer:
        "Non c'è un numero fissato per legge. Il libro matricola le compagnie lo propongono da un certo numero di veicoli in su, e la soglia cambia da compagnia a compagnia. Sotto quella soglia si lavora con polizze singole, che possiamo comunque allineare su scadenze e garanzie.",
    },
    {
      question: "Cos'è il libro matricola?",
      answer:
        "È un contratto unico che assicura più veicoli della stessa azienda. Ogni mezzo è iscritto nel contratto con la sua targa e le sue garanzie; quando ne compri uno lo si aggiunge con un'appendice, quando lo vendi lo si toglie. La scadenza è una sola per tutti, e il premio dei mezzi entrati o usciti in corso d'anno di solito si conteggia per il periodo in cui sono stati assicurati.",
    },
    {
      question: 'Nello stesso contratto posso mettere auto, furgoni e camion?',
      answer:
        "Spesso sì, se la compagnia assicura tutte le categorie di veicoli che hai. Per alcuni mezzi, come i camion pesanti o le macchine operatrici, può servire un contratto a parte. Lo vediamo sull'elenco reale dei tuoi veicoli, prima di chiedere le quotazioni.",
    },
    {
      question: 'Cosa succede alla classe di merito se passo al libro matricola?',
      answer:
        "Dipende dal contratto, e va chiarito prima di spostare i veicoli. Su molti libri matricola il premio dell'anno dopo guarda i sinistri della flotta nel suo insieme e non la classe del singolo mezzo. Prima di proporti il passaggio verifichiamo con la compagnia come vengono trattati gli attestati di rischio, così sai cosa succede anche se un giorno torni alle polizze singole.",
    },
    {
      question: 'Le auto dei dipendenti usate per lavoro sono coperte?',
      answer:
        "No, la polizza RC auto di un'auto privata la paga il proprietario, e la flotta copre solo i veicoli dell'azienda. Se i dipendenti usano l'auto propria per le trasferte, l'azienda può valutare una polizza per i danni a quei veicoli durante le missioni. Ne parliamo quando facciamo l'elenco dei mezzi.",
    },
    {
      question: 'Quanto costa assicurare una flotta?',
      answer: notaPremio('numero e tipo dei veicoli, uso, zona di circolazione, sinistri degli ultimi anni e garanzie scelte'),
    },
  ],
}
