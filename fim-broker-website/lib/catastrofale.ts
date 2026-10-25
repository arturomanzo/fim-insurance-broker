/**
 * L'obbligo di assicurazione catastrofale per le imprese, detto in un posto solo.
 *
 * Fino al 25/10/2026 il sito lo raccontava con quattro date diverse (1° gennaio,
 * 31 marzo, 1° aprile 2025, "per tutte le imprese") e un articolo metteva fra gli
 * obbligati anche le aziende agricole, che la legge esclude. È materiale che un
 * cliente usa per decidere e che IVASS può leggere: le pagine prendono il testo da
 * qui e non lo riscrivono a mano.
 *
 * Fonti: L. 213/2023, art. 1, commi 101-111 (comma 101 obbligo, beni ed eventi;
 * comma 102 conseguenze; comma 110 esclusione delle imprese agricole); DL 31 marzo
 * 2025, n. 39, convertito con L. 27 maggio 2025, n. 78 (scadenze per dimensione);
 * FAQ MIMIT https://www.mimit.gov.it/it/assistenza/domande-frequenti/polizze-catastrofali-risposte-alle-domande-frequenti-faq
 * Riscontrato il 25/10/2026 su FAQ MIMIT e testi pubblicati della legge; prima di
 * cambiare una data, rileggere la norma su Normattiva.
 */

export const NORMA_CATASTROFALE = 'L. 213/2023, art. 1, commi 101-111'

export const SCADENZE_CATASTROFALE =
  'dal 31 marzo 2025 per le grandi imprese, dal 1° ottobre 2025 per le medie, dal 31 dicembre 2025 per le piccole e le micro (DL 39/2025)'

export const CHI_E_OBBLIGATO =
  "le imprese con sede legale in Italia, o con una stabile organizzazione in Italia, tenute all'iscrizione nel Registro delle imprese"

export const CHI_E_ESCLUSO = "le imprese agricole (art. 2135 c.c., escluse dal comma 110), per le quali la polizza resta facoltativa"

export const BENI_DA_ASSICURARE = 'terreni, fabbricati, impianti, macchinari e attrezzature industriali e commerciali'

export const EVENTI_CATASTROFALI = 'sismi, alluvioni, frane, inondazioni ed esondazioni'

export const CONSEGUENZA_CATASTROFALE =
  "non è prevista una multa: chi non si assicura se ne vede tenere conto quando si assegnano contributi, sovvenzioni e agevolazioni pubbliche, anche dopo un evento calamitoso (comma 102)"

/** La frase completa, per FAQ e risposte. */
export const OBBLIGO_CATASTROFALE =
  `Sì. La ${NORMA_CATASTROFALE} obbliga ${CHI_E_OBBLIGATO} ad assicurare ${BENI_DA_ASSICURARE} contro ${EVENTI_CATASTROFALI}. ` +
  `L'obbligo è scattato a scaglioni, ${SCADENZE_CATASTROFALE}: oggi vale per tutte. Restano fuori ${CHI_E_ESCLUSO}. ` +
  `Per chi non è in regola ${CONSEGUENZA_CATASTROFALE}.`
