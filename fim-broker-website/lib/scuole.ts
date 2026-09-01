/**
 * Dipartimento Scuole — costanti condivise fra pagina, form e route.
 *
 * Il progetto scuole ha una casella propria: tutto ciò che arriva dal sito
 * per gli istituti scolastici va lì, non su info@. La casella è su Aruba,
 * attiva dal 21/08/2026.
 */

export const SCUOLE_EMAIL = 'dipartimentoscuole@fimbroker.it'
export const SCUOLE_PEC = 'fiminsurancebrokersas@pec.it'

export const SCUOLE_DOCS = {
  dieciDomande: {
    href: '/docs/scuole-dieci-domande.pdf',
    label: 'Dieci domande sulla polizza della vostra scuola',
    desc: 'La checklist in PDF, da compilare a matita e tenere in segreteria.',
  },
  brochure: {
    href: '/docs/scuole-la-scuola-e-i-suoi-rischi.pdf',
    label: 'La scuola e i suoi rischi',
    desc: 'Guida per Dirigenti Scolastici e Direttori S.G.A.: la mappa dei rischi, la norma, le scoperture, il metodo.',
  },
} as const

export const RUOLI = [
  { value: 'dirigente', label: 'Dirigente Scolastico' },
  { value: 'dsga', label: 'Direttore S.G.A.' },
  { value: 'segreteria', label: 'Assistente amministrativo / segreteria' },
  { value: 'docente', label: 'Docente o altro personale' },
  { value: 'altro', label: 'Altro' },
] as const

export const TIPI_ISTITUTO = [
  { value: 'comprensivo', label: 'Istituto comprensivo' },
  { value: 'superiore', label: 'Istituto superiore o liceo' },
  { value: 'paritaria', label: 'Scuola paritaria' },
  { value: 'altro', label: 'Altro (convitto, CPIA, ...)' },
] as const

export type RuoloValue = (typeof RUOLI)[number]['value']
export type TipoIstitutoValue = (typeof TIPI_ISTITUTO)[number]['value']

export const RUOLO_LABELS: Record<RuoloValue, string> = Object.fromEntries(
  RUOLI.map((r) => [r.value, r.label]),
) as Record<RuoloValue, string>

export const TIPO_ISTITUTO_LABELS: Record<TipoIstitutoValue, string> = Object.fromEntries(
  TIPI_ISTITUTO.map((t) => [t.value, t.label]),
) as Record<TipoIstitutoValue, string>

export function isValidRuolo(value: string): value is RuoloValue {
  return RUOLI.some((r) => r.value === value)
}

export function isValidTipoIstituto(value: string): value is TipoIstitutoValue {
  return TIPI_ISTITUTO.some((t) => t.value === value)
}

