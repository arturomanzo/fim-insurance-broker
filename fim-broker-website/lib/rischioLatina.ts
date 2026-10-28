/**
 * Rischio idrogeologico dei 33 comuni della provincia di Latina, come lo
 * pubblica ISPRA sulla piattaforma IdroGEO (indicatori del rapporto «Dissesto
 * idrogeologico in Italia: pericolosità e indicatori di rischio», Edizione 2024).
 * Scaricati il 28/10/2026 da https://idrogeo.isprambiente.it/api/pir/comuni/<ISTAT>.
 *
 * Le percentuali sono quelle calcolate da ISPRA sui residenti del censimento
 * ISTAT: non ricalcolarle qui, perché alluvioni e frane usano basi di censimento
 * diverse. Le imprese sono unità locali contate da ISPRA, in numero.
 *
 * Scenari di alluvione dell'art. 6, c. 2, D.Lgs. 49/2010 (letto su normattiva il
 * 28/10/2026): P3 frequenti (ritorno fra 20 e 50 anni), P2 poco frequenti (fra
 * 100 e 200 anni), P1 scarsa probabilità o eventi estremi. Frane: pericolosità
 * elevata (P3) e molto elevata (P4) dei Piani di assetto idrogeologico.
 *
 * Il terremoto non c'è: IdroGEO non lo misura. Prima di aggiornare i numeri,
 * riscaricali tutti e cambia FONTE_RISCHIO_LATINA.
 */

export type RischioComune = {
  nome: string
  /** % residenti in area allagabile, scenario P3 (alluvioni frequenti) */
  alluvioneP3: number
  /** % residenti in area allagabile, scenario P2 (alluvioni poco frequenti) */
  alluvioneP2: number
  /** % residenti in area allagabile, scenario P1 (eventi estremi) */
  alluvioneP1: number
  /** % residenti in area a pericolosità da frana elevata o molto elevata */
  franaP3P4: number
  /** unità locali di impresa in area allagabile P2 */
  impreseP2: number
  /** unità locali di impresa in area a pericolosità da frana P3 o P4 */
  impreseFrana: number
  istat?: string
}

export const FONTE_RISCHIO_LATINA =
  "ISPRA, piattaforma IdroGEO, indicatori di rischio dell'Edizione 2024 del rapporto sul dissesto idrogeologico, consultati il 28/10/2026"

export const PROVINCIA_LATINA: RischioComune = { nome: 'Latina', alluvioneP3: 1.0, alluvioneP2: 1.6, alluvioneP1: 7.3, franaP3P4: 1.8, impreseP2: 776, impreseFrana: 805 }

export const LAZIO: RischioComune = { nome: 'Lazio', alluvioneP3: 1.7, alluvioneP2: 3.2, alluvioneP1: 10.6, franaP3P4: 1.5, impreseP2: 15921, impreseFrana: 5164 }

export const COMUNI_LATINA: RischioComune[] = [
  { nome: 'Aprilia', alluvioneP3: 0.1, alluvioneP2: 0.1, alluvioneP1: 0.1, franaP3P4: 0.2, impreseP2: 2, impreseFrana: 6, istat: '059001' },
  { nome: 'Bassiano', alluvioneP3: 0.4, alluvioneP2: 0.4, alluvioneP1: 0.4, franaP3P4: 3.0, impreseP2: 0, impreseFrana: 3, istat: '059002' },
  { nome: 'Campodimele', alluvioneP3: 0, alluvioneP2: 0, alluvioneP1: 0, franaP3P4: 33.2, impreseP2: 0, impreseFrana: 8, istat: '059003' },
  { nome: 'Castelforte', alluvioneP3: 0.3, alluvioneP2: 1.0, alluvioneP1: 1.1, franaP3P4: 21.2, impreseP2: 4, impreseFrana: 83, istat: '059004' },
  { nome: 'Cisterna di Latina', alluvioneP3: 1.3, alluvioneP2: 1.9, alluvioneP1: 1.9, franaP3P4: 0.03, impreseP2: 55, impreseFrana: 0, istat: '059005' },
  { nome: 'Cori', alluvioneP3: 0.7, alluvioneP2: 0.7, alluvioneP1: 0.7, franaP3P4: 4.7, impreseP2: 3, impreseFrana: 74, istat: '059006' },
  { nome: 'Fondi', alluvioneP3: 1.7, alluvioneP2: 1.8, alluvioneP1: 6.0, franaP3P4: 0.3, impreseP2: 28, impreseFrana: 6, istat: '059007' },
  { nome: 'Formia', alluvioneP3: 0.3, alluvioneP2: 1.0, alluvioneP1: 1.3, franaP3P4: 3.5, impreseP2: 44, impreseFrana: 108, istat: '059008' },
  { nome: 'Gaeta', alluvioneP3: 0.2, alluvioneP2: 0.2, alluvioneP1: 0.2, franaP3P4: 2.7, impreseP2: 4, impreseFrana: 22, istat: '059009' },
  { nome: 'Itri', alluvioneP3: 0.4, alluvioneP2: 0.5, alluvioneP1: 0.7, franaP3P4: 7.1, impreseP2: 3, impreseFrana: 63, istat: '059010' },
  { nome: 'Latina', alluvioneP3: 1.1, alluvioneP2: 1.7, alluvioneP1: 8.7, franaP3P4: 0.05, impreseP2: 169, impreseFrana: 1, istat: '059011' },
  { nome: 'Lenola', alluvioneP3: 0, alluvioneP2: 0, alluvioneP1: 0, franaP3P4: 2.1, impreseP2: 0, impreseFrana: 10, istat: '059012' },
  { nome: 'Maenza', alluvioneP3: 0.2, alluvioneP2: 0.2, alluvioneP1: 0.2, franaP3P4: 0.7, impreseP2: 0, impreseFrana: 0, istat: '059013' },
  { nome: 'Minturno', alluvioneP3: 1.0, alluvioneP2: 1.8, alluvioneP1: 2.0, franaP3P4: 0.6, impreseP2: 17, impreseFrana: 0, istat: '059014' },
  { nome: 'Monte San Biagio', alluvioneP3: 0.3, alluvioneP2: 0.7, alluvioneP1: 2.2, franaP3P4: 17.9, impreseP2: 2, impreseFrana: 50, istat: '059015' },
  { nome: 'Norma', alluvioneP3: 0, alluvioneP2: 0, alluvioneP1: 0, franaP3P4: 3.0, impreseP2: 0, impreseFrana: 6, istat: '059016' },
  { nome: 'Pontinia', alluvioneP3: 2.3, alluvioneP2: 5.4, alluvioneP1: 37.2, franaP3P4: 0, impreseP2: 29, impreseFrana: 0, istat: '059017' },
  { nome: 'Ponza', alluvioneP3: 0, alluvioneP2: 0, alluvioneP1: 3.7, franaP3P4: 21.8, impreseP2: 0, impreseFrana: 87, istat: '059018' },
  { nome: 'Priverno', alluvioneP3: 3.4, alluvioneP2: 4.8, alluvioneP1: 5.0, franaP3P4: 0.8, impreseP2: 38, impreseFrana: 3, istat: '059019' },
  { nome: 'Prossedi', alluvioneP3: 2.2, alluvioneP2: 2.8, alluvioneP1: 3.0, franaP3P4: 0.5, impreseP2: 2, impreseFrana: 0, istat: '059020' },
  { nome: 'Rocca Massima', alluvioneP3: 0, alluvioneP2: 0, alluvioneP1: 0, franaP3P4: 2.5, impreseP2: 0, impreseFrana: 0, istat: '059022' },
  { nome: 'Roccagorga', alluvioneP3: 0.2, alluvioneP2: 0.2, alluvioneP1: 0.2, franaP3P4: 0.2, impreseP2: 0, impreseFrana: 0, istat: '059021' },
  { nome: 'Roccasecca dei Volsci', alluvioneP3: 1.4, alluvioneP2: 3.2, alluvioneP1: 3.5, franaP3P4: 1.1, impreseP2: 2, impreseFrana: 0, istat: '059023' },
  { nome: 'Sabaudia', alluvioneP3: 0.6, alluvioneP2: 1.4, alluvioneP1: 2.5, franaP3P4: 0.1, impreseP2: 19, impreseFrana: 4, istat: '059024' },
  { nome: 'San Felice Circeo', alluvioneP3: 2.0, alluvioneP2: 2.2, alluvioneP1: 11.2, franaP3P4: 1.4, impreseP2: 17, impreseFrana: 7, istat: '059025' },
  { nome: 'Santi Cosma e Damiano', alluvioneP3: 0.8, alluvioneP2: 2.3, alluvioneP1: 2.7, franaP3P4: 6.7, impreseP2: 38, impreseFrana: 10, istat: '059026' },
  { nome: 'Sermoneta', alluvioneP3: 0.2, alluvioneP2: 1.8, alluvioneP1: 2.9, franaP3P4: 1.9, impreseP2: 6, impreseFrana: 19, istat: '059027' },
  { nome: 'Sezze', alluvioneP3: 1.4, alluvioneP2: 1.7, alluvioneP1: 18.2, franaP3P4: 5.2, impreseP2: 17, impreseFrana: 100, istat: '059028' },
  { nome: 'Sonnino', alluvioneP3: 0.7, alluvioneP2: 1.1, alluvioneP1: 1.3, franaP3P4: 2.0, impreseP2: 5, impreseFrana: 7, istat: '059029' },
  { nome: 'Sperlonga', alluvioneP3: 8.4, alluvioneP2: 8.4, alluvioneP1: 9.2, franaP3P4: 2.6, impreseP2: 31, impreseFrana: 12, istat: '059030' },
  { nome: 'Spigno Saturnia', alluvioneP3: 0, alluvioneP2: 0, alluvioneP1: 0, franaP3P4: 11.4, impreseP2: 0, impreseFrana: 14, istat: '059031' },
  { nome: 'Terracina', alluvioneP3: 1.8, alluvioneP2: 3.3, alluvioneP1: 28.7, franaP3P4: 1.8, impreseP2: 241, impreseFrana: 69, istat: '059032' },
  { nome: 'Ventotene', alluvioneP3: 0, alluvioneP2: 0, alluvioneP1: 0, franaP3P4: 13.9, impreseP2: 0, impreseFrana: 33, istat: '059033' },
]

/** I comuni con la quota più alta di residenti esposti, per l'indicatore scelto. */
export function piuEsposti(
  campo: 'alluvioneP2' | 'alluvioneP1' | 'franaP3P4',
  quanti = 3,
): RischioComune[] {
  return [...COMUNI_LATINA].sort((a, b) => b[campo] - a[campo]).slice(0, quanti)
}

/** Percentuale all'italiana; sotto lo 0,1% lo dice invece di arrotondare a zero. */
export function percentuale(v: number): string {
  if (v === 0) return '0%'
  if (v < 0.1) return 'meno di 0,1%'
  return `${v.toLocaleString('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`
}
