// Il sito promette un solo tempo: quello del ricontatto, che dipende solo da
// FIM (decisione di Arturo, 26/10/2026). I tempi del preventivo li decide la
// compagnia che quota, e su CAR, cyber o catastrofale un preventivo "in un
// giorno" non regge. lib/promesse.test.ts blocca il ritorno dei tempi scritti
// a mano: per dire quando richiamiamo si usa questa costante. Il Dipartimento
// Scuole ha un suo tempo di risposta, scritto nel form e nella route scuole.

export const RICONTATTO = 'entro 1 giorno lavorativo'
