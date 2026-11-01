import type { Campagna } from '@/lib/campagna'
import type { LeadGestionale } from '@/lib/codaLead'

// I lead dei moduli del sito che fino al 01/11/2026 arrivavano solo come mail a
// info@ (o a dipartimentoscuole@): contatti, prenotazione, Dipartimento Scuole,
// seconda opinione, preventivo auto con documenti, guida PMI. Scelta di Arturo
// del 01/11/2026: entrano tutti nel gestionale, come preventivo, calcolatore e
// FIMA, e le mail restano come sono. «Collabora con noi» resta fuori: è una
// candidatura, non un cliente.
//
// Il `lead_id` è lo stesso id che compare nella mail al team (MSG-, BOOK-,
// SCU-, SO-, PA-, GUIDA-): chi ha la mail ritrova il lead, e il gestionale
// scarta il doppione se la coda rimanda una consegna già andata a segno.

// Limiti di /api/website/lead nel gestionale: oltre, tronca lui.
const MAX_TIPO = 100
const MAX_MESSAGGIO = 2000

const t = (v: string | undefined | null) => (v ?? '').trim()

/** «Mario Rossi» → nome «Mario», cognome «Rossi». Un nome solo resta nome. */
export function dividiNome(completo: string): { nome: string; cognome?: string } {
  const [nome, ...resto] = t(completo).split(/\s+/)
  return { nome: nome ?? '', cognome: resto.join(' ') || undefined }
}

/** Righe «Etichetta: valore», saltando i valori vuoti. */
function righe(coppie: [string, string | undefined | null][]): string {
  return coppie
    .filter(([, v]) => t(v))
    .map(([k, v]) => `${k}: ${t(v)}`)
    .join('\n')
}

function messaggio(intestazione: string, corpo: string, coda?: string): string {
  const testo = [intestazione, corpo, coda].filter((x) => t(x)).join('\n\n')
  return testo.length > MAX_MESSAGGIO ? `${testo.slice(0, MAX_MESSAGGIO - 1)}…` : testo
}

type Base = {
  id: string
  nome: string
  email: string
  telefono?: string
  campagna?: Campagna
}

function lead(b: Base, tipo: string, referrer: string, testo: string, profilo?: string): LeadGestionale {
  const { nome, cognome } = dividiNome(b.nome)
  return {
    lead_id: b.id,
    nome,
    cognome,
    email: t(b.email) || undefined,
    telefono: t(b.telefono) || undefined,
    tipo: t(tipo).slice(0, MAX_TIPO) || 'Richiesta dal sito',
    profilo: t(profilo) || undefined,
    messaggio: testo,
    referrer,
    campagna: b.campagna,
  }
}

export function leadContatto(b: Base & { oggetto?: string; messaggio: string }): LeadGestionale {
  return lead(
    b,
    t(b.oggetto) || 'Contatto dal sito',
    'modulo-contatti',
    messaggio('Messaggio dal modulo contatti del sito.', righe([['Oggetto', b.oggetto], ['Messaggio', b.messaggio]])),
  )
}

export function leadPrenotazione(
  b: Base & { servizio?: string; data: string; orario: string; note?: string },
): LeadGestionale {
  return lead(
    b,
    t(b.servizio) ? `Consulenza: ${t(b.servizio)}` : 'Prenotazione consulenza',
    'prenota-consulenza',
    messaggio(
      'Prenotazione di una consulenza dal sito.',
      righe([['Servizio', b.servizio], ['Giorno richiesto', b.data], ['Orario richiesto', b.orario], ['Note', b.note]]),
    ),
  )
}

export function leadScuole(
  b: Base & {
    istituto: string
    tipoIstituto?: string
    comune: string
    ruolo: string
    scadenza?: string
    compagnia?: string
    messaggio?: string
  },
): LeadGestionale {
  return lead(
    b,
    `Scuole: check-up — ${t(b.istituto)}`,
    'dipartimento-scuole',
    messaggio(
      'Richiesta di check-up dal Dipartimento Scuole del sito. La mail è andata anche a dipartimentoscuole@.',
      righe([
        ['Istituto', b.istituto],
        ['Tipo di istituto', b.tipoIstituto],
        ['Comune', b.comune],
        ['Chi scrive', b.ruolo],
        ['Scadenza polizze in essere', b.scadenza],
        ['Compagnia attuale', b.compagnia],
        ['Messaggio', b.messaggio],
      ]),
    ),
    'scuola',
  )
}

export function leadSecondOpinion(
  b: Base & {
    azienda?: string
    settore?: string
    compagnieAttuali?: string
    note?: string
    numPolizze: number
    oscuraPremio: boolean
  },
): LeadGestionale {
  return lead(
    b,
    t(b.settore) ? `Seconda opinione — ${t(b.settore)}` : 'Seconda opinione',
    'seconda-opinione',
    messaggio(
      'Richiesta di seconda opinione dal sito.',
      righe([
        ['Azienda', b.azienda],
        ['Settore', b.settore],
        ['Compagnie attuali', b.compagnieAttuali],
        ['Note', b.note],
        ['Polizze allegate', String(b.numPolizze)],
        ['Premio oscurato dal cliente', b.oscuraPremio ? 'sì' : undefined],
      ]),
      b.numPolizze > 0 ? 'I PDF sono allegati alla mail a info@, non qui.' : undefined,
    ),
    t(b.azienda) ? 'azienda' : undefined,
  )
}

export function leadPreventivoAuto(
  b: Base & { targa?: string; note?: string; documenti: string[] },
): LeadGestionale {
  return lead(
    b,
    'Preventivo auto con documenti',
    'preventivo-auto-documenti',
    messaggio(
      'Richiesta di preventivo auto con i documenti caricati dal sito.',
      righe([
        ['Targa', b.targa],
        ['Documenti caricati', b.documenti.length > 0 ? b.documenti.join(', ') : undefined],
        ['Note', b.note],
      ]),
      b.documenti.length > 0 ? 'I documenti sono nella mail al team, con link validi 7 giorni, e nello storage del sito: non qui.' : undefined,
    ),
    'privato',
  )
}

export function leadGuidaPmi(b: Base & { attivita?: string; marketing: boolean }): LeadGestionale {
  return lead(
    b,
    'Guida assicurazioni PMI',
    'guida-pmi',
    messaggio(
      'Ha scaricato la Guida Assicurazioni PMI dal sito.',
      righe([['Attività', b.attivita]]),
      b.marketing
        ? 'Consenso marketing: sì (guide e aggiornamenti).'
        : 'Consenso marketing: no. Ha chiesto solo la guida: niente proposte commerciali se non le chiede.',
    ),
    'pmi',
  )
}
