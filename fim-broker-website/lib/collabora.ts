export const PROFILI = [
  { value: 'subagente', label: 'Subagente / Collaboratore (RUI Sez. E)' },
  { value: 'broker', label: 'Broker (RUI Sez. B)' },
  { value: 'agente', label: 'Agente (RUI Sez. A)' },
  { value: 'segnalatore', label: 'Segnalatore / Introduttore' },
  { value: 'giovane-talento', label: 'Giovane talento / Neolaureato' },
  { value: 'altro', label: 'Altro' },
] as const

export const ESPERIENZE = [
  { value: 'nessuna', label: 'Nessuna esperienza nel settore' },
  { value: '1-3', label: '1 - 3 anni' },
  { value: '3-5', label: '3 - 5 anni' },
  { value: '5-10', label: '5 - 10 anni' },
  { value: '10+', label: 'Oltre 10 anni' },
] as const

export type ProfiloValue = (typeof PROFILI)[number]['value']
export type EsperienzaValue = (typeof ESPERIENZE)[number]['value']

export const PROFILO_LABELS: Record<ProfiloValue, string> = Object.fromEntries(
  PROFILI.map((p) => [p.value, p.label]),
) as Record<ProfiloValue, string>

export const ESPERIENZA_LABELS: Record<EsperienzaValue, string> = Object.fromEntries(
  ESPERIENZE.map((e) => [e.value, e.label]),
) as Record<EsperienzaValue, string>

export function isValidProfilo(value: string): value is ProfiloValue {
  return PROFILI.some((p) => p.value === value)
}
