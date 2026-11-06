// «Verifica i requisiti assicurativi»: il cliente carica un bando, un capitolato
// o un contratto e lo strumento elenca le polizze e le garanzie che il documento
// chiede. Se carica anche la polizza che ha, le mette a confronto.
//
// Nasce il 06/11/2026 dall'analisi «Assicurazione in chat» nel vault (modello
// Brokly: la validazione del requisito, non la vendita). Si parte dagli appalti
// perché portano lavoro al Desk Cauzioni. Come «Analizza la tua polizza», i PDF
// non si salvano: al gestionale arriva solo la sintesi, che basta a fare subito
// un preventivo indicativo.

/** Tetto sui due PDF insieme: in base64 restano sotto i 4,5 MB del corpo Vercel. */
export const MAX_PDF_TOTALE = 3 * 1024 * 1024
export const MAX_BASE64_TOTALE = 4_200_000

export const CATEGORIE_REQUISITO = [
  'garanzia_provvisoria',
  'garanzia_definitiva',
  'altra_cauzione',
  'car_cantiere',
  'rct_rco',
  'rc_professionale',
  'decennale_postuma',
  'altro',
] as const

export type CategoriaRequisito = (typeof CATEGORIE_REQUISITO)[number]

export const CATEGORIA_LABELS: Record<CategoriaRequisito, string> = {
  garanzia_provvisoria: 'Garanzia provvisoria',
  garanzia_definitiva: 'Garanzia definitiva',
  altra_cauzione: 'Altra cauzione o fideiussione',
  car_cantiere: 'CAR / danni al cantiere',
  rct_rco: 'RC verso terzi e dipendenti',
  rc_professionale: 'RC professionale',
  decennale_postuma: 'Decennale postuma',
  altro: 'Altra polizza',
}

/** Le categorie che finiscono al Desk Cauzioni. */
const CAUZIONI: readonly CategoriaRequisito[] = ['garanzia_provvisoria', 'garanzia_definitiva', 'altra_cauzione']

export const ESITI = ['coperto', 'parziale', 'scoperto', 'non_confrontato'] as const
export type Esito = (typeof ESITI)[number]

export const ESITO_LABELS: Record<Esito, string> = {
  coperto: 'Già coperto',
  parziale: 'Coperto in parte',
  scoperto: 'Manca',
  non_confrontato: 'Da procurare',
}

export const URGENZE = ['alta', 'media', 'bassa'] as const
export type Urgenza = (typeof URGENZE)[number]

export interface Requisito {
  categoria: CategoriaRequisito
  garanzia: string
  riferimento: string | null
  importo: string | null
  quando: string | null
  esito: Esito
  nota: string
}

export interface RisultatoVerifica {
  documento: {
    tipo: string
    committente: string | null
    oggetto: string | null
    importo: string | null
    scadenza: string | null
  }
  requisiti: Requisito[]
  lacune: { titolo: string; descrizione: string; urgenza: Urgenza }[]
  puntiDubbi: string[]
  prossimiPassi: { titolo: string; descrizione: string }[]
  sintesi: string
}

// La forma della risposta la garantisce l'API (output_config.format). Le
// description sono il contratto dei campi: niente `minimum`/`maximum`, che
// l'API rifiuta.
export const VERIFICA_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['documento', 'requisiti', 'lacune', 'puntiDubbi', 'prossimiPassi', 'sintesi'],
  properties: {
    documento: {
      type: 'object',
      additionalProperties: false,
      required: ['tipo', 'committente', 'oggetto', 'importo', 'scadenza'],
      properties: {
        tipo: {
          type: 'string',
          description: "Bando o disciplinare di gara, capitolato, contratto d'appalto, subappalto, locazione, fornitura, altro.",
        },
        committente: { type: ['string', 'null'], description: 'Stazione appaltante, committente o controparte.' },
        oggetto: { type: ['string', 'null'], description: "Oggetto dell'appalto o del contratto, una riga." },
        importo: {
          type: ['string', 'null'],
          description: "Valore dell'appalto o del contratto come scritto nel documento, col simbolo dell'euro.",
        },
        scadenza: {
          type: ['string', 'null'],
          description: "Termine per presentare l'offerta o per consegnare le polizze, formato gg/mm/aaaa.",
        },
      },
    },
    requisiti: {
      type: 'array',
      description: 'Ogni polizza o garanzia che il documento chiede. Solo quelle scritte nel documento, nessuna aggiunta.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['categoria', 'garanzia', 'riferimento', 'importo', 'quando', 'esito', 'nota'],
        properties: {
          categoria: { type: 'string', enum: [...CATEGORIE_REQUISITO] },
          garanzia: { type: 'string', description: 'Nome della garanzia come la chiama il documento.' },
          riferimento: {
            type: ['string', 'null'],
            description: 'Articolo, paragrafo o pagina del documento da cui viene il requisito.',
          },
          importo: {
            type: ['string', 'null'],
            description:
              "Importo o massimale richiesto. Se il documento dà una percentuale, scrivi la percentuale e il calcolo sul valore indicato nel documento (es. '2% di 200.000 € = 4.000 €'). Mai un premio.",
          },
          quando: {
            type: ['string', 'null'],
            description: "Quando va consegnata: con l'offerta, alla stipula, prima dell'inizio lavori.",
          },
          esito: {
            type: 'string',
            enum: [...ESITI],
            description:
              "Confronto con la polizza caricata. 'non_confrontato' se il cliente non ha caricato una polizza o se la polizza non riguarda questo requisito.",
          },
          nota: {
            type: 'string',
            description: 'Una o due frasi: condizioni particolari (clausole, vincolo, durata) e, se c\'è una polizza, cosa manca.',
          },
        },
      },
    },
    lacune: {
      type: 'array',
      description: 'Le differenze che possono far escludere dalla gara o lasciare scoperto il cliente.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['titolo', 'descrizione', 'urgenza'],
        properties: {
          titolo: { type: 'string', description: 'Massimo otto parole.' },
          descrizione: { type: 'string', description: 'La differenza e la conseguenza concreta.' },
          urgenza: { type: 'string', enum: [...URGENZE] },
        },
      },
    },
    puntiDubbi: {
      type: 'array',
      items: { type: 'string' },
      description: 'Clausole ambigue o contraddittorie da chiarire col committente, una frase ciascuna.',
    },
    prossimiPassi: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['titolo', 'descrizione'],
        properties: {
          titolo: { type: 'string', description: 'Massimo otto parole.' },
          descrizione: { type: 'string' },
        },
      },
    },
    sintesi: { type: 'string', description: 'Due o tre frasi: cosa chiede il documento e a che punto è il cliente.' },
  },
} as const

/** I requisiti si contano e si leggono in codice: un valore fuori elenco diventa `altro`. */
export function normalizzaRisultato(r: RisultatoVerifica, conPolizza: boolean): RisultatoVerifica {
  return {
    ...r,
    requisiti: (r.requisiti ?? []).map((q) => ({
      ...q,
      categoria: (CATEGORIE_REQUISITO as readonly string[]).includes(q.categoria) ? q.categoria : 'altro',
      // Senza polizza non c'è confronto, qualunque cosa abbia scritto il modello.
      esito: !conPolizza || !(ESITI as readonly string[]).includes(q.esito) ? 'non_confrontato' : q.esito,
    })),
  }
}

// Il gestionale tronca `messaggio` a 2.000 caratteri e `tipo` a 100.
const MAX_MESSAGGIO = 2000
const MAX_TIPO = 100
const MAX_VOCI = 8

const pulito = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

/** `tipo` del lead: le cauzioni vanno riconosciute subito, sono il Desk Cauzioni. */
export function tipoLeadRequisiti(r: Pick<RisultatoVerifica, 'requisiti'>): string {
  const categorie = new Set((r.requisiti ?? []).map((q) => q.categoria))
  const cauzioni = CAUZIONI.some((c) => categorie.has(c))
  const altre = [...categorie].filter((c) => !CAUZIONI.includes(c)).map((c) => CATEGORIA_LABELS[c] ?? c)
  const parti = [cauzioni ? 'Cauzioni' : '', ...altre].filter(Boolean)
  const tipo = parti.length ? `Verifica requisiti — ${parti.join(', ')}` : 'Verifica requisiti'
  return tipo.length > MAX_TIPO ? `${tipo.slice(0, MAX_TIPO - 1)}…` : tipo
}

/** Il testo che l'operatore legge nel gestionale: deve bastare per un preventivo indicativo. */
export function riepilogoRequisiti(r: RisultatoVerifica, conPolizza: boolean, telefono?: string): string {
  const d = r.documento ?? ({} as RisultatoVerifica['documento'])
  const dati = [
    pulito(d.tipo) && `Documento: ${pulito(d.tipo)}`,
    pulito(d.committente) && `Committente: ${pulito(d.committente)}`,
    pulito(d.oggetto) && `Oggetto: ${pulito(d.oggetto)}`,
    pulito(d.importo) && `Valore: ${pulito(d.importo)}`,
    pulito(d.scadenza) && `Scadenza: ${pulito(d.scadenza)}`,
  ].filter(Boolean)

  const requisiti = (r.requisiti ?? []).slice(0, MAX_VOCI).map((q) => {
    const importo = pulito(q.importo) ? ` — ${pulito(q.importo)}` : ''
    const quando = pulito(q.quando) ? ` (${pulito(q.quando)})` : ''
    return `• ${pulito(q.garanzia) || CATEGORIA_LABELS[q.categoria]}${importo}${quando}: ${ESITO_LABELS[q.esito] ?? q.esito}`
  })

  const testo = [
    'Dallo strumento «Verifica i requisiti assicurativi» del sito. I PDF non sono stati salvati: qui c\'è solo la sintesi.',
    ...dati,
    requisiti.length ? `\nRequisiti trovati:\n${requisiti.join('\n')}` : '\nNessun requisito assicurativo trovato nel documento.',
    conPolizza ? 'Il cliente ha caricato anche la sua polizza.' : 'Il cliente non ha caricato polizze: confronto non fatto.',
    telefono ? `Telefono: ${telefono}` : 'Telefono non indicato: si ricontatta via mail.',
    'Prossimo passo: preventivo indicativo con i dati qui sopra.',
  ]
    .filter(Boolean)
    .join('\n')

  return testo.length > MAX_MESSAGGIO ? `${testo.slice(0, MAX_MESSAGGIO - 1)}…` : testo
}
