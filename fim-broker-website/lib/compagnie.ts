/**
 * Elenco delle imprese di assicurazione con cui FIM Insurance Broker opera.
 *
 * Non è solo materiale di marketing: la Sezione IV del MUP (Allegato 3 al
 * Reg. IVASS 40/2018) impone al distributore che NON opera in regime di
 * esclusiva di comunicare al contraente la denominazione delle imprese di cui
 * distribuisce i contratti. La norma consente di assolvere l'obbligo con la
 * pubblicazione sul proprio sito, dandone avviso nel Modulo — che è
 * esattamente quello che fa /trasparenza.
 *
 * Fonte di verità unica: aggiornare QUI, non nelle singole pagine.
 * ⚠️ Dalbogg non è più operativa: non va reinserita.
 */

export type TipoRapporto = 'mandato-diretto' | 'collaborazione-agenzia' | 'partner-prodotto'

export const RAPPORTO_LABELS: Record<TipoRapporto, string> = {
  'mandato-diretto': 'Mandato diretto',
  'collaborazione-agenzia': 'Collaborazione tramite agenzia',
  'partner-prodotto': 'Partner per prodotto',
}

export interface Compagnia {
  name: string
  rapporto: TipoRapporto
  /** Dettaglio operativo, mostrato per le collaborazioni orizzontali. */
  note?: string
}

export const COMPAGNIE: readonly Compagnia[] = [
  { name: 'Generali', rapporto: 'collaborazione-agenzia', note: 'Agenzia di Latina' },
  { name: 'AXA', rapporto: 'collaborazione-agenzia', note: 'Agenzia di Nettuno' },
  { name: 'HDI', rapporto: 'collaborazione-agenzia', note: 'Agenzia di Genzano di Roma' },
  { name: 'Bene.it', rapporto: 'collaborazione-agenzia', note: 'Agenzia di Velletri' },
  { name: 'Allianz', rapporto: 'collaborazione-agenzia', note: 'Agenzia di Velletri' },
  { name: 'Roland Italia', rapporto: 'mandato-diretto' },
  { name: 'AEC Underwriting', rapporto: 'mandato-diretto' },
  { name: 'MetLife', rapporto: 'mandato-diretto' },
  { name: 'UnipolSai', rapporto: 'partner-prodotto' },
  { name: 'Zurich', rapporto: 'partner-prodotto' },
  { name: 'Groupama', rapporto: 'partner-prodotto' },
  { name: 'Cattolica', rapporto: 'partner-prodotto' },
  { name: 'Reale Mutua', rapporto: 'partner-prodotto' },
  { name: 'Aviva', rapporto: 'partner-prodotto' },
  { name: 'Ergo', rapporto: 'partner-prodotto' },
  { name: 'SACE', rapporto: 'partner-prodotto' },
] as const

/** Solo i nomi, per le vetrine marketing (es. TrustedBrands in home). */
export const COMPAGNIE_NOMI = COMPAGNIE.map((c) => c.name)

/** Imprese distribuite in collaborazione orizzontale con altri intermediari RUI. */
export const COMPAGNIE_COLLABORAZIONE = COMPAGNIE.filter(
  (c) => c.rapporto === 'collaborazione-agenzia',
)
