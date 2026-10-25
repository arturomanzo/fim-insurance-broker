// Il sito non pubblica prezzi (decisione di Arturo, 25/10/2026): il premio lo
// calcola la compagnia sul singolo cliente, e un "da X€" che nessuno ha
// verificato è una promessa. Al posto del prezzo si dice da cosa dipende.
// lib/promesse.test.ts controlla che i prezzi non rientrino nelle pagine.

/** La nota sotto le coperture: `fattori` sono le voci che muovono il premio. */
export function notaPremio(fattori: string): string {
  return `Il premio lo calcola la compagnia su ${fattori}: per questo qui non trovi prezzi. FIM Insurance Broker è un intermediario assicurativo indipendente iscritto al RUI Sez. B n. B000405449, soggetto alla vigilanza IVASS.`
}
