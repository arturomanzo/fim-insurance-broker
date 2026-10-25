/**
 * Area Cliente: le polizze vere, lette dal gestionale.
 *
 * Fino al 25/10/2026 l'Area Cliente leggeva `data/policies.json`, sei polizze demo
 * di un "Mario Rossi" inventato. Adesso il server del sito chiede al gestionale
 * (`POST /api/website/area-cliente`, Bearer WEBSITE_API_SECRET) il portafoglio
 * dell'email che il cliente ha verificato col magic link. Il browser non parla mai
 * col gestionale e non vede il segreto.
 *
 * Cosa esce dal gestionale lo decide lui (`src/lib/area-cliente/portafoglio.ts` nel
 * repo fim-gestionale-next): polizze attive e sospese, niente subagenti, niente
 * importi, solo i documenti che il cliente può riscaricare.
 */

const GESTIONALE_URL = process.env.GESTIONALE_API_URL || 'https://fim-gestionale-next.vercel.app'
const TIMEOUT_MS = 8_000

export type TipoDocumento = 'contratto' | 'certificato' | 'attestato' | 'quietanza' | 'appendice'

export interface DocumentoCliente {
  id: number
  nome: string
  tipo: TipoDocumento
  data: string | null
}

export interface PolizzaCliente {
  id: number
  numero: string | null
  compagnia: string | null
  ramo: string | null
  contraente: string
  decorrenza: string | null // YYYY-MM-DD
  scadenza: string | null   // YYYY-MM-DD
  frazionamento: string | null
  tacitoRinnovo: boolean
  stato: 'attiva' | 'sospesa'
  targa: string | null
  veicolo: string | null
  garanzie: string[]
  documenti: DocumentoCliente[]
}

export interface PortafoglioCliente {
  nome: string | null
  polizze: PolizzaCliente[]
}

export type EsitoPortafoglio = { ok: true; portafoglio: PortafoglioCliente } | { ok: false }

async function chiama(percorso: string, corpo: unknown): Promise<Response | null> {
  const segreto = process.env.WEBSITE_API_SECRET
  if (!segreto) {
    console.error('[area-cliente] WEBSITE_API_SECRET non configurata')
    return null
  }
  try {
    return await fetch(`${GESTIONALE_URL}${percorso}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${segreto}` },
      body: JSON.stringify(corpo),
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch (err) {
    console.error(`[area-cliente] ${percorso}:`, err instanceof Error ? err.message : err)
    return null
  }
}

/**
 * Il portafoglio dell'email. `ok: false` vuol dire che il gestionale non ha
 * risposto: la pagina lo deve dire, non mostrare "nessuna polizza".
 */
export async function caricaPortafoglio(email: string): Promise<EsitoPortafoglio> {
  const res = await chiama('/api/website/area-cliente', { email })
  if (!res?.ok) {
    if (res) console.error(`[area-cliente] portafoglio: HTTP ${res.status}`)
    return { ok: false }
  }
  return { ok: true, portafoglio: (await res.json()) as PortafoglioCliente }
}

/** Link firmato (pochi secondi) al documento, o null se non è di questa email. */
export async function linkDocumento(email: string, id: number): Promise<string | null> {
  const res = await chiama('/api/website/area-cliente/documento', { email, id })
  if (!res?.ok) {
    if (res && res.status !== 404) console.error(`[area-cliente] documento: HTTP ${res.status}`)
    return null
  }
  const { url } = (await res.json()) as { url?: string }
  return typeof url === 'string' && url.startsWith('https://') ? url : null
}

// ── Stato mostrato al cliente ────────────────────────────────────────────────

export type StatoVisibile = 'attiva' | 'in-scadenza' | 'sospesa' | 'da-aggiornare'

/** Giorni di calendario fra due date YYYY-MM-DD, senza passare dai fusi orari. */
export function giorniFra(da: string, a: string): number {
  const [y1, m1, d1] = da.split('-').map(Number)
  const [y2, m2, d2] = a.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86_400_000)
}

/** Oggi a Roma, come YYYY-MM-DD. */
export function oggiRoma(adesso = new Date()): string {
  return adesso.toLocaleDateString('sv-SE', { timeZone: 'Europe/Rome' })
}

/**
 * Lo stato che il cliente vede.
 *
 * Una polizza attiva con la scadenza già passata non si chiama "scaduta": al
 * 25/10/2026 erano 70, tutte a tacito rinnovo, rinnovate senza che la data in
 * gestionale venisse spostata. Dire "scaduta" a quei clienti sarebbe falso, dire
 * una data nuova sarebbe inventarla: si dice che la data è da aggiornare.
 */
export function statoVisibile(
  p: Pick<PolizzaCliente, 'stato' | 'scadenza'>,
  oggi: string,
): { stato: StatoVisibile; giorni: number | null } {
  if (p.stato === 'sospesa') return { stato: 'sospesa', giorni: null }
  if (!p.scadenza) return { stato: 'attiva', giorni: null }
  const giorni = giorniFra(oggi, p.scadenza)
  if (giorni < 0) return { stato: 'da-aggiornare', giorni }
  if (giorni <= 60) return { stato: 'in-scadenza', giorni }
  return { stato: 'attiva', giorni }
}

const FRAZIONAMENTI: Record<string, string> = {
  annuale: 'Annuale',
  semestrale: 'Semestrale',
  quadrimestrale: 'Quadrimestrale',
  trimestrale: 'Trimestrale',
  mensile: 'Mensile',
}

export function etichettaFrazionamento(f: string | null): string | null {
  if (!f) return null
  return FRAZIONAMENTI[f.toLowerCase()] ?? f
}

export function dataEstesa(iso: string | null): string {
  if (!iso) return '—'
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('it-IT', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
}

/** Il titolo della card: ramo, e per l'auto anche la targa. */
export function titoloPolizza(p: Pick<PolizzaCliente, 'ramo' | 'targa'>): string {
  const ramo = p.ramo ?? 'Polizza'
  return p.targa ? `${ramo} · ${p.targa}` : ramo
}
