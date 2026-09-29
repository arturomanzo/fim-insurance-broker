import { hasMarketingConsent } from '@/lib/consent'
import {
  CHIAVE_SESSIONE_CAMPAGNA,
  aggiungiClic,
  leggiArrivo,
  pulisciCampagna,
  senzaClic,
  soloClic,
  type Campagna,
} from '@/lib/campagna'

// La parte browser dell'attribuzione (le regole stanno in lib/campagna.ts).
//
// Al primo arrivo della sessione salva in sessionStorage da dove arriva il
// visitatore; i moduli che creano un lead lo allegano con `campagnaPerInvio()`.
// Nessun cookie: sessionStorage resta nella scheda e sparisce quando si chiude.
//
// Consenso (lib/consent.ts): utm, sito di provenienza, pagina e ora di arrivo
// non sono dati personali e si salvano sempre. gclid e fbclid sono
// identificativi pubblicitari: si salvano e si inviano solo col consenso
// MARKETING, lo stesso flag che governa Google Ads e il Pixel Meta. Chi atterra
// da un annuncio di solito trova il banner ancora aperto: il gclid della pagina
// d'arrivo resta in memoria (non sul dispositivo) e si salva se il consenso
// arriva dopo; se non arriva, si perde con la pagina.

let clicInAttesa: Campagna = {}

function leggiSessione(): Campagna | null {
  try {
    const raw = sessionStorage.getItem(CHIAVE_SESSIONE_CAMPAGNA)
    if (!raw) return null
    return pulisciCampagna(JSON.parse(raw)) ?? {}
  } catch {
    return null
  }
}

function scriviSessione(c: Campagna): void {
  try {
    sessionStorage.setItem(CHIAVE_SESSIONE_CAMPAGNA, JSON.stringify(c))
  } catch {
    /* navigazione privata o storage pieno: si va avanti senza attribuzione */
  }
}

/**
 * Da chiamare una volta all'avvio della pagina. Primo tocco: se la sessione
 * è già registrata non la sovrascrive, anche se l'URL porta utm o gclid nuovi.
 */
export function registraArrivo(): void {
  if (typeof window === 'undefined') return
  const arrivo = leggiArrivo({
    url: window.location.href,
    referrer: document.referrer,
    adesso: new Date(),
    hostSito: window.location.hostname,
  })
  const sessione = leggiSessione()

  if (!sessione) {
    if (hasMarketingConsent()) {
      scriviSessione(arrivo)
    } else {
      clicInAttesa = soloClic(arrivo)
      scriviSessione(senzaClic(arrivo))
    }
    return
  }

  // Ricarica della pagina d'arrivo prima del consenso: il gclid è ancora
  // nell'URL ed è lo stesso clic, quindi torna in attesa.
  if (arrivo.pagina_arrivo === sessione.pagina_arrivo && !sessione.gclid && !sessione.fbclid) {
    clicInAttesa = soloClic(arrivo)
  }
  aggiornaConsenso()
}

/** Da chiamare quando cambia il consenso (evento del CookieBanner). */
export function aggiornaConsenso(): void {
  if (typeof window === 'undefined') return
  const sessione = leggiSessione()
  if (!sessione) return
  if (hasMarketingConsent()) {
    const conClic = aggiungiClic(sessione, clicInAttesa)
    if (conClic.gclid !== sessione.gclid || conClic.fbclid !== sessione.fbclid) scriviSessione(conClic)
  } else if (sessione.gclid || sessione.fbclid) {
    // Consenso revocato: gli identificativi escono dal dispositivo.
    scriviSessione(senzaClic(sessione))
  }
}

/**
 * Il campo `campagna` da allegare al POST di un modulo. Da chiamare al submit:
 * il consenso si rilegge in quel momento.
 */
export function campagnaPerInvio(): Campagna | undefined {
  if (typeof window === 'undefined') return undefined
  const sessione = leggiSessione()
  if (!sessione) return undefined
  const c = hasMarketingConsent() ? sessione : senzaClic(sessione)
  return Object.keys(c).length > 0 ? c : undefined
}
