/**
 * Costanti Open Graph condivise.
 *
 * Perché esiste: in Next il campo `openGraph` di una pagina **sostituisce**
 * quello del root layout, non ci si fonde. Le 34 pagine che dichiaravano il
 * proprio `openGraph` per cambiare l'immagine perdevano così `og:type`,
 * `og:locale`, `og:site_name` e `og:url`, che stavano solo nel layout —
 * mentre le pagine che non lo dichiaravano li avevano tutti (audit 13/08/2026).
 *
 * Uso: `openGraph: { ...OG_BASE, url: '/servizi', ... }`.
 * L'`url` è per pagina e coincide con il canonical; `metadataBase` la risolve.
 *
 * Guardia: `npm run validate-canonical` controlla anche questo.
 */
export const OG_BASE = {
  type: 'website',
  locale: 'it_IT',
  siteName: 'FIM Insurance Broker',
} as const
