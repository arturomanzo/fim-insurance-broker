/**
 * Paletti condivisi del blog automatico.
 *
 * Nasce da un errore vero: l'articolo del 17/08/2026 sulla RC sportiva attribuiva
 * al D.Lgs. 36/2021 un obbligo che sta nella L. 289/2002. Il prompt che genera gli
 * articoli non aveva nessun vincolo, e quello che esce va online da solo il lunedì
 * mattina su un sito firmato con un numero RUI.
 *
 * Due usi:
 * - `generate-blog-post.mjs` lo chiama in modalità severa sull'articolo appena
 *   generato: qualsiasi violazione è un errore, e il generatore riprova una volta
 *   passando al modello l'elenco di cosa ha sbagliato.
 * - `validate-blog.mjs` lo chiama su tutto il file: una norma sconosciuta resta un
 *   errore che ferma la pubblicazione, mentre l'arretrato ereditato e le parole da
 *   AI degli articoli vecchi escono come avvisi, così restano visibili senza
 *   bloccare la Action per colpa di testi scritti prima del controllo.
 *
 * Quello che questo file NON fa: dimostrare che una frase descriva correttamente la
 * norma che cita. Ferma le norme sconosciute o inventate e obbliga il modello a
 * pescare da un elenco letto sulla fonte primaria. La correttezza di ciò che una
 * frase afferma resta lavoro di chi rilegge.
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REGISTRO = resolve(__dirname, '../../data/norme-citabili.json')

const TIPI_ATTO = String.raw`D\.?\s?Lgs\.?|Decreto\s+Legislativo|D\.?P\.?R\.?|Legge|L\.|Regolamento\s+UE|Reg\.\s*UE|Reg\.\s*IVASS|Direttiva`
const RE_ATTO = new RegExp(String.raw`(?:${TIPI_ATTO})\s*n?\.?\s*(\d+)[/\s](\d{4})`, 'gi')
const RE_CODICE_CIVILE = /art(?:icolo|\.)\s*(\d+)(?:\s*(?:bis|ter|quater))?\s*(?:del\s+)?(?:c\.c\.|codice\s+civile)/gi

// Parole che il CLAUDE.md vieta in qualsiasi testo FIM, più i cloni più frequenti.
const PAROLE_AI = [
  'fondamentale', 'fondamentali', 'inoltre', 'panorama', 'in conclusione',
  'cruciale', 'cruciali', 'in sintesi', 'è importante notare', 'al fine di',
]

// Frasi che prendono un impegno: sono le più pericolose, perché un errore qui
// non è un'imprecisione ma una promessa che il cliente può pretendere.
const PROMESSE = [
  { re: /\bti fa risparmiare\b/i, cosa: 'promessa di risparmio' },
  { re: /\brisparmi(?:are)?\s+fino\s+al\b/i, cosa: 'promessa di risparmio quantificata' },
  { re: /\bgarantisce\s+(?:un\s+)?risparmio\b/i, cosa: 'promessa di risparmio' },
  { re: /\bsenza\s+sorprese\b/i, cosa: 'promessa implicita di copertura' },
  { re: /\bsempre\s+copert[oiae]\b/i, cosa: 'promessa implicita di copertura' },
  { re: /\bnessun\s+rischio\b/i, cosa: 'promessa implicita di copertura' },
  { re: /(?:oltre|più\s+di)\s+(?:30|trenta)\s+compagnie|\b30\+\s*compagnie/i, cosa: 'claim «30+ compagnie» (i mandati e le collaborazioni sono 20)' },
]

export function caricaRegistro(percorso = REGISTRO) {
  const reg = JSON.parse(readFileSync(percorso, 'utf-8'))
  const perChiave = new Map()
  for (const norma of reg.norme) {
    for (const chiave of norma.chiavi) perChiave.set(normalizza(chiave), norma)
  }
  return { ...reg, perChiave }
}

function normalizza(chiave) {
  return String(chiave).trim().toLowerCase()
}

/** Tutto il testo di un post, in un colpo solo. */
export function testoDi(post) {
  const pezzi = [post.title, post.excerpt]
  for (const s of post.sections ?? []) {
    pezzi.push(s.heading, s.body, ...(s.list ?? []))
  }
  return pezzi.filter(Boolean).join('\n')
}

/** Estrae le citazioni normative: estremi di legge e articoli del codice civile. */
export function estraiCitazioni(testo) {
  const trovate = new Map()
  for (const m of testo.matchAll(RE_ATTO)) {
    const chiave = `${m[1]}/${m[2]}`
    if (!trovate.has(chiave)) trovate.set(chiave, m[0].trim())
  }
  for (const m of testo.matchAll(RE_CODICE_CIVILE)) {
    const chiave = `cc-${m[1]}`
    if (!trovate.has(chiave)) trovate.set(chiave, m[0].trim())
  }
  return [...trovate].map(([chiave, come]) => ({ chiave, come }))
}

/**
 * Controlla un post.
 * @param {object} post
 * @param {object} registro  da caricaRegistro()
 * @param {{severo?: boolean}} opzioni  severo = articolo nuovo, tutto è errore
 * @returns {{errori: string[], avvisi: string[]}}
 */
export function controllaPost(post, registro, { severo = false } = {}) {
  const errori = []
  const avvisi = []
  const testo = testoDi(post)
  const dove = post.slug ?? '(articolo nuovo)'

  for (const { chiave, come } of estraiCitazioni(testo)) {
    const norma = registro.perChiave.get(normalizza(chiave))
    if (!norma) {
      errori.push(`"${dove}" — norma non nel registro: «${come}». Va letta sulla fonte primaria e aggiunta a data/norme-citabili.json, oppure tolta dall'articolo.`)
      continue
    }
    if (norma.stato !== 'verificata') {
      const msg = `"${dove}" — «${come}» è nel registro ma ancora da verificare sulla fonte primaria.`
      if (severo) errori.push(`${msg} Un articolo nuovo può citare solo norme verificate.`)
      else avvisi.push(msg)
    }
  }

  const minuscolo = testo.toLowerCase()
  for (const parola of PAROLE_AI) {
    if (new RegExp(`\\b${parola}\\b`, 'i').test(minuscolo)) {
      const msg = `"${dove}" — parola vietata dal CLAUDE.md: «${parola}».`
      if (severo) errori.push(msg)
      else avvisi.push(msg)
    }
  }

  for (const { re, cosa } of PROMESSE) {
    const m = testo.match(re)
    if (m) {
      const msg = `"${dove}" — ${cosa}: «${m[0]}».`
      if (severo) errori.push(msg)
      else avvisi.push(msg)
    }
  }

  return { errori, avvisi }
}

/** Le norme che un articolo nuovo ha il permesso di citare. */
export function normeVerificate(registro) {
  return registro.norme.filter(n => n.stato === 'verificata')
}
