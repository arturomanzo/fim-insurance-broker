/**
 * L'obbligo di assicurazione catastrofale per le imprese, detto in un posto solo.
 *
 * Fino al 25/10/2026 il sito lo raccontava con quattro date diverse (1° gennaio,
 * 31 marzo, 1° aprile 2025, "per tutte le imprese") e un articolo metteva fra gli
 * obbligati anche le aziende agricole, che la legge esclude. È materiale che un
 * cliente usa per decidere e che IVASS può leggere: le pagine prendono il testo da
 * qui e non lo riscrivono a mano.
 *
 * Fonti: L. 213/2023, art. 1, commi 101-111 (comma 101 obbligo, beni, eventi e
 * valore da assicurare; 102 conseguenze; 104 scoperto o franchigia massimi; 106 e
 * 107 obbligo a contrarre delle compagnie e immobili assicurabili; 111 esclusione
 * delle imprese agricole); DL 31 marzo 2025, n. 39, convertito con L. 27 maggio
 * 2025, n. 78 (scadenze per dimensione); DL 200/2025, art. 16, c. 2 (proroga per
 * somministrazione e turistico-ricettive piccole e micro).
 * Testo vigente letto su normattiva il 29/10/2026. Fino al 28/10 qui l'esclusione
 * delle imprese agricole aveva il numero sbagliato (110 invece di 111). Prima di
 * cambiare una data o un comma, rileggere la norma su Normattiva.
 */

export const NORMA_CATASTROFALE = 'L. 213/2023, art. 1, commi 101-111'

export const SCADENZE_CATASTROFALE =
  'dal 31 marzo 2025 per le grandi imprese, dal 1° ottobre 2025 per le medie, dal 31 dicembre 2025 per le piccole e le micro (DL 39/2025), dal 31 marzo 2026 per bar, ristoranti e strutture ricettive piccole e micro (DL 200/2025)'

export const CHI_E_OBBLIGATO =
  "le imprese con sede legale in Italia, o con una stabile organizzazione in Italia, tenute all'iscrizione nel Registro delle imprese"

export const CHI_E_ESCLUSO = "le imprese agricole (art. 2135 c.c., escluse dal comma 111), per le quali la polizza resta facoltativa"

export const BENI_DA_ASSICURARE = 'terreni, fabbricati, impianti, macchinari e attrezzature industriali e commerciali'

export const EVENTI_CATASTROFALI = 'sismi, alluvioni, frane, inondazioni ed esondazioni'

export const CONSEGUENZA_CATASTROFALE =
  "non è prevista una multa: chi non si assicura se ne vede tenere conto quando si assegnano contributi, sovvenzioni e agevolazioni pubbliche, anche dopo un evento calamitoso (comma 102)"

export const VALORE_DA_ASSICURARE =
  'il valore di ricostruzione a nuovo degli immobili e il costo di rimpiazzo dei beni mobili (comma 101)'

export const FRANCHIGIA_MASSIMA =
  'uno scoperto o una franchigia non superiore al 15 per cento del danno, tranne che per le grandi imprese (comma 104)'

export const OBBLIGO_A_CONTRARRE =
  "la compagnia non può rifiutare il contratto: il rifiuto è punito con una sanzione da 100.000 a 500.000 euro (commi 106 e 107). Restano fuori gli immobili senza un valido titolo edilizio, salvo sanatoria o condono anche in corso, e per quelli non spetta nessun aiuto pubblico (comma 106)"

/** La frase completa, per FAQ e risposte. */
export const OBBLIGO_CATASTROFALE =
  `Sì. La ${NORMA_CATASTROFALE} obbliga ${CHI_E_OBBLIGATO} ad assicurare ${BENI_DA_ASSICURARE} contro ${EVENTI_CATASTROFALI}. ` +
  `L'obbligo è scattato a scaglioni, ${SCADENZE_CATASTROFALE}: oggi vale per tutte. Restano fuori ${CHI_E_ESCLUSO}. ` +
  `Per chi non è in regola ${CONSEGUENZA_CATASTROFALE}.`
