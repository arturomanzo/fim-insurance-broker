/**
 * Costanti condivise per il caricamento dei documenti di preventivazione auto.
 * Usate dal componente client (PreventivoAutoDocumenti) e dalle route API
 * (/api/preventivo-auto/init e /complete). Unica fonte di verità per slot,
 * tipi MIME ammessi e dimensioni — vedi pattern lib/collabora.ts.
 */

export const DOC_BUCKET = 'documenti-preventivo'
export const DOC_PATH_PREFIX = 'preventivo-auto'

/**
 * Ponte wizard /preventivo → upload documenti auto. Quando un cliente completa
 * il wizard scegliendo Auto, salviamo i suoi dati di contatto in sessionStorage
 * sotto questa chiave; il componente di upload li pre-compila al mount. Stesso
 * meccanismo usato per gli UTM (chiave fim_utm).
 */
export const PREFILL_SESSION_KEY = 'fim_preventivo_auto_prefill'

export interface PreventivoAutoPrefill {
  nome?: string
  email?: string
  telefono?: string
  targa?: string
}

export const MAX_DOC_SIZE = 10 * 1024 * 1024 // 10 MB per file
export const ALLOWED_DOC_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'] as const
/** Per l'attributo accept dell'input file */
export const DOC_ACCEPT = '.jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf'

export interface DocSlot {
  key: string
  label: string
  hint: string
  required: boolean
}

/** Slot documenti, in ordine di esposizione. Carta d'Identità e Patente
 *  hanno due slot distinti (fronte/retro) come richiesto. */
export const DOC_SLOTS: readonly DocSlot[] = [
  { key: 'libretto', label: 'Libretto di circolazione', hint: 'Carta di circolazione del veicolo', required: true },
  { key: 'ci_fronte', label: "Carta d'Identità — Fronte", hint: 'Lato anteriore', required: true },
  { key: 'ci_retro', label: "Carta d'Identità — Retro", hint: 'Lato posteriore', required: true },
  { key: 'patente_fronte', label: 'Patente — Fronte', hint: 'Lato anteriore', required: true },
  { key: 'patente_retro', label: 'Patente — Retro', hint: 'Lato posteriore', required: true },
  { key: 'visura', label: 'Visura camerale', hint: 'Solo se intestatario è una società (opzionale)', required: false },
] as const

export const DOC_SLOT_KEYS = DOC_SLOTS.map((s) => s.key)
export const DOC_SLOT_LABELS: Record<string, string> = Object.fromEntries(
  DOC_SLOTS.map((s) => [s.key, s.label]),
)

export function isValidDocSlot(key: string): boolean {
  return DOC_SLOT_KEYS.includes(key)
}

export function fileTypeAllowed(type: string): boolean {
  return (ALLOWED_DOC_TYPES as readonly string[]).includes(type)
}

/** Ripulisce il nome file per usarlo come segmento di path storage. */
export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80) || 'file'
}
