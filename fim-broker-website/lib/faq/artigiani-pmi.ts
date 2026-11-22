import type { FaqCategory } from '.'
import {
  NORMA_CATASTROFALE,
  BENI_DA_ASSICURARE,
  EVENTI_CATASTROFALI,
  CHI_E_ESCLUSO,
} from '@/lib/catastrofale'

export const artigianiPmiFaq: FaqCategory = {
  slug: 'artigiani-pmi',
  title: 'Polizze per Artigiani e PMI',
  cta: {
    text: 'Non sai quali coperture servono davvero alla tua attività?',
    description: 'Analisi gratuita dei rischi e proposta su misura, senza impegno.',
    primary: { label: 'Prenota Consulenza', href: '/prenota-consulenza' },
    secondary: { label: '06 96883381', href: 'tel:+390696883381' },
  },
  items: [
    {
      question: 'Quali assicurazioni sono obbligatorie per un datore di lavoro?',
      answer:
        // Dal 15/11/2026 cita anche la catastrofale, con il testo di lib/catastrofale.ts,
        // come la sezione "Cosa chiede la legge" della stessa pagina.
        `Per i datori di lavoro con dipendenti, la principale assicurazione obbligatoria è quella INAIL (Infortuni sul Lavoro), gestita direttamente dall'ente. A questa si aggiunge la RC auto per i veicoli aziendali (obbligatoria per legge). Quasi tutte le imprese devono poi assicurare ${BENI_DA_ASSICURARE} contro ${EVENTI_CATASTROFALI} (${NORMA_CATASTROFALE}): ne restano fuori ${CHI_E_ESCLUSO}. Molte altre coperture (RC impresa, incendio, ecc.) non sono obbligatorie per legge ma sono prassi comune e spesso richieste da clienti/appaltanti.`,
    },
    {
      question: "Ho già l'INAIL: perché dovrei fare anche la polizza infortuni integrativa?",
      answer:
        // Riscritta il 15/11/2026: prima diceva "non copre le prime 3 giorni" e
        // dava per certa una rendita "calcolata sulla retribuzione dichiarata".
        // Artt. 68 e 73 D.P.R. 1124/1965 letti su normattiva il 15/11/2026.
        "L'INAIL copre gli infortuni sul lavoro e le malattie professionali, con regole che lasciano dei buchi. L'indennità per l'inabilità temporanea parte dal quarto giorno successivo all'infortunio ed è pari al 60% della retribuzione giornaliera (art. 68 D.P.R. 1124/1965). Per un dipendente la giornata dell'infortunio e i giorni di attesa li paga il datore di lavoro (art. 73); l'artigiano titolare un datore di lavoro non ce l'ha, e quei giorni restano scoperti. L'INAIL di regola non rimborsa le visite e le cure private, e i postumi permanenti li indennizza secondo le sue tabelle, che non sempre bastano a coprire il reddito perso. La polizza infortuni integrativa serve a questo: una diaria che può partire dal primo giorno, il rimborso delle spese mediche e un capitale in più se l'invalidità è grave.",
    },
    {
      question: 'Cosa copre esattamente la RC impresa e quanto costa?',
      answer:
        "La RC impresa copre i danni causati a terzi (clienti, fornitori, passanti) connessi allo svolgimento dell'attività: un cliente scivolato nel tuo negozio, un prodotto venduto che si rivela difettoso, danni causati da tuoi dipendenti durante il lavoro. Il premio lo calcola la compagnia su settore di attività, fatturato e massimale scelto: te lo diamo sul tuo caso, con le offerte di più compagnie a confronto.",
    },
    {
      question: 'Come funziona la polizza all-risk capannone?',
      answer:
        "La polizza all-risk (o multirischio) per attività copre la struttura fisica (muri, tetto, impianti fissi), le attrezzature e i macchinari, le merci e le scorte, e spesso include anche la copertura per interruzione di esercizio. Si tratta di una copertura 'a tutto rischio' che indennizza tutti i danni salvo quelli espressamente esclusi, a differenza delle polizze 'a rischi nominati' che coprono solo i rischi espressamente elencati.",
    },
    {
      question: 'Sono un piccolo artigiano con un solo dipendente: ho bisogno di tutto questo?',
      answer:
        'Non necessariamente tutto insieme. La priorità dipende dalla tua attività. Per un artigiano con un dipendente, il minimo consigliato è: RC impresa (per i danni a terzi) + infortuni integrativa per il dipendente + polizza incendio sul locale e le attrezzature. Ti aiutiamo a capire cosa è davvero indispensabile per la tua situazione specifica.',
    },
  ],
}
