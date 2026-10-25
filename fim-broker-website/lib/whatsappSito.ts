/**
 * I link WhatsApp del sito, con la pagina da cui il visitatore scrive.
 *
 * Fino al 25/10/2026 i lead WhatsApp arrivavano nel gestionale senza dire da
 * dove: 459 lead commerciali su 496 con il solo `referrer = whatsapp`. Il link
 * adesso aggiunge al testo precompilato un riferimento leggibile, per esempio
 * "(rif. fimbroker.it/soluzioni/scuole)". Il gestionale lo riconosce nel primo
 * messaggio (`paginaDaMessaggio` in src/lib/marketing/canali.ts) e lo salva
 * come pagina d'arrivo del lead, così il cruscotto «Canali e ritorno» sa quali
 * pagine portano contatti.
 *
 * Il formato del riferimento va tenuto uguale nei due repository.
 */

export const NUMERO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393473312330'

const MAX_PERCORSO = 80

/** Solo il percorso, senza query né ancora: niente UTM o dati del visitatore nel testo. */
export function percorsoPulito(percorso: string | null | undefined): string | null {
  const p = String(percorso ?? '').split(/[?#]/)[0].trim().toLowerCase()
  if (!p.startsWith('/') || !/^\/[a-z0-9\-/]*$/.test(p)) return null
  return p.length > MAX_PERCORSO ? p.slice(0, MAX_PERCORSO) : p
}

export function testoConPagina(testo: string, percorso?: string | null): string {
  const p = percorsoPulito(percorso)
  return p ? `${testo} (rif. fimbroker.it${p})` : testo
}

export function linkWhatsApp(testo: string, percorso?: string | null): string {
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(testoConPagina(testo, percorso))}`
}
