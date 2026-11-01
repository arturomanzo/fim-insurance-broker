// Il lead che lo strumento «Analizza la tua polizza» manda al gestionale.
//
// Fino al 01/11/2026 il modulo chiedeva nome ed email e l'API li buttava:
// nessun lead, nessuna mail. Scelta di Arturo: il lead va nel gestionale come
// quelli degli altri moduli. Il PDF continua a non essere salvato: nel lead
// finisce solo una sintesi del report, quanto basta per richiamare il cliente
// sapendo di cosa parlare. Niente numero di polizza: per ricontattare non serve.

/** I campi del report che servono al riepilogo. Gli altri non entrano nel lead. */
export type ReportPerLead = {
  compagnia?: string | null
  tipoPolizza?: string | null
  scadenza?: string | null
  premio?: string | null
  lacune?: { titolo: string; urgenza: string }[] | null
  raccomandazioni?: { titolo: string; priorita: string }[] | null
  valutazioneGlobale?: { punteggio?: number | null; giudizio?: string | null } | null
}

// Il gestionale tronca `messaggio` a 2.000 caratteri e `tipo` a 100
// (src/app/api/website/lead/route.ts): meglio tagliare qui, in modo leggibile.
const MAX_MESSAGGIO = 2000
const MAX_TIPO = 100
const MAX_VOCI = 5

const pulito = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
const nonRilevato = (v: string) => !v || /^non rilevat/i.test(v)

/** `tipo` del lead: la polizza analizzata, che è la cosa su cui si lavora. */
export function tipoLeadAnalisi(report: ReportPerLead): string {
  const tipo = pulito(report.tipoPolizza)
  return (nonRilevato(tipo) ? 'Analisi polizza' : `Analisi polizza ${tipo}`).slice(0, MAX_TIPO)
}

/** Il testo che l'operatore legge nel gestionale prima di richiamare. */
export function riepilogoAnalisi(report: ReportPerLead): string {
  const compagnia = pulito(report.compagnia)
  const v = report.valutazioneGlobale
  const punteggio = typeof v?.punteggio === 'number' ? `${v.punteggio}/10` : ''
  const giudizio = pulito(v?.giudizio)

  const dati = [
    !nonRilevato(compagnia) && `Compagnia: ${compagnia}`,
    pulito(report.scadenza) && `Scadenza: ${pulito(report.scadenza)}`,
    pulito(report.premio) && `Premio indicato nel documento: ${pulito(report.premio)}`,
    (punteggio || giudizio) && `Valutazione AI: ${[punteggio, giudizio].filter(Boolean).join(' — ')}`,
  ].filter(Boolean)

  const elenco = (titolo: string, voci: { titolo: string; livello: string }[]) =>
    voci.length === 0
      ? ''
      : `\n${titolo}:\n${voci.slice(0, MAX_VOCI).map((x) => `• ${pulito(x.titolo)} (${x.livello})`).join('\n')}`

  const testo = [
    'Analisi dallo strumento «Analizza la tua polizza» del sito. Il PDF non è stato salvato: qui c\'è solo la sintesi del report.',
    ...dati,
    elenco('Lacune', (report.lacune ?? []).map((l) => ({ titolo: l.titolo, livello: `urgenza ${l.urgenza}` }))),
    elenco('Raccomandazioni', (report.raccomandazioni ?? []).map((r) => ({ titolo: r.titolo, livello: `priorità ${r.priorita}` }))),
    '\nLo strumento non chiede il telefono: si ricontatta via mail.',
  ]
    .filter(Boolean)
    .join('\n')

  return testo.length > MAX_MESSAGGIO ? `${testo.slice(0, MAX_MESSAGGIO - 1)}…` : testo
}
