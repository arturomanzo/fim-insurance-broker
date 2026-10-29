import type { FaqCategory } from '.'
import { OBBLIGO_CATASTROFALE, FRANCHIGIA_MASSIMA, OBBLIGO_A_CONTRARRE, VALORE_DA_ASSICURARE } from '@/lib/catastrofale'

export const catastrofiNaturaliFaq: FaqCategory = {
  slug: 'catastrofi-naturali',
  title: 'Catastrofi Naturali',
  cta: {
    text: 'La tua azienda è in regola con la polizza catastrofale obbligatoria 2025?',
    description: 'Verifica gratuita della tua copertura attuale e quotazione su misura.',
    primary: { label: 'Richiedi verifica', href: '/preventivo?profilo=pmi&settore=Polizza+Catastrofale' },
    secondary: { label: '📞 06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'La polizza casa standard copre già le alluvioni?',
      answer:
        "Generalmente no. Le polizze casa classiche coprono incendio e furto, ma gli eventi atmosferici (alluvione, esondazione, frana) sono spesso esclusi o richiedono un'estensione specifica. Molti italiani lo scoprono solo al momento del sinistro, quando è troppo tardi. Verifica la tua polizza attuale: FIM può fare un'analisi gratuita.",
    },
    {
      question: 'Dal 2025 le aziende devono obbligatoriamente assicurarsi per le catastrofi naturali?',
      answer:
        `${OBBLIGO_CATASTROFALE} Se non sei sicuro di essere in regola, guardiamo insieme le tue polizze.`,
    },
    {
      question: "Cosa si intende esattamente per 'catastrofe naturale' assicurabile?",
      answer:
        "Le coperture catastrofali tipicamente includono: terremoto/sisma, alluvione ed esondazione (tracimazione di fiumi e corsi d'acqua), frana e smottamento, maremoto, eruzione vulcanica, e sinkholes (voragini). La grandine viene solitamente trattata come 'evento atmosferico' e spesso ha una copertura separata. Ogni polizza ha la propria definizione: ti aiutiamo a capire esattamente cosa copre la tua.",
    },
    {
      question: "Come viene calcolato il risarcimento dopo un'alluvione?",
      answer:
        `Contano tre cose: il valore assicurato, che deve corrispondere a quanto costerebbe ricostruire o ricomprare (occhio alla sottoassicurazione); lo scoperto o la franchigia, cioè la parte di danno che resta a te; il massimale. Per le imprese obbligate la legge chiede di assicurare ${VALORE_DA_ASSICURARE} e ammette ${FRANCHIGIA_MASSIMA}. Per la casa decide il contratto. Dopo il sinistro la compagnia manda un perito: FIM segue i propri clienti per tutta la liquidazione.`,
    },
    {
      question: 'Abito in una zona a rischio alluvione: posso comunque assicurarmi?',
      answer:
        `Dipende se sei un'impresa o un privato. Se sei un'impresa obbligata, ${OBBLIGO_A_CONTRARRE}. Il premio però resta proporzionato al rischio. Per la casa l'obbligo a contrarre non c'è: in una zona molto esposta qualche compagnia può non assicurare o chiedere di più, ed è lì che conviene confrontare il mercato.`,
    },
  ],
}
