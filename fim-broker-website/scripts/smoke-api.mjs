#!/usr/bin/env node
// Prova di vita dei moduli del sito: `node scripts/smoke-api.mjs [base]`.
//
// Il 01/11/2026 abbiamo scoperto che il modulo «Seconda opinione» rispondeva
// 415 a chiunque almeno dal 24/08/2026: il middleware rifiutava il multipart.
// Nessun controllo se n'era accorto, perché nessuno mandava il modulo per
// prova. Qui ogni rotta riceve una richiesta vuota, nel formato che usa il suo
// modulo, e deve rispondere con il proprio errore di validazione (400). Una
// richiesta vuota si ferma alla validazione: niente mail, niente lead.
//
// Un 415 vuol dire che il middleware blocca il modulo, un 500 che la rotta si
// rompe prima di validare, un 404 che la rotta non c'è più. Il workflow
// .github/workflows/smoke-api.yml lo lancia ogni mattina.

const BASE = (process.argv[2] || process.env.SMOKE_BASE_URL || 'https://www.fimbroker.it').replace(/\/$/, '')

/** [rotta, formato del modulo] */
const ROTTE = [
  ['/api/contact', 'json'],
  ['/api/prenota', 'json'],
  ['/api/preventivo', 'json'],
  ['/api/calcolatore', 'json'],
  ['/api/scuole', 'json'],
  ['/api/collabora', 'json'],
  ['/api/lead-magnet', 'json'],
  ['/api/newsletter', 'json'],
  ['/api/chat', 'json'],
  ['/api/analizza-polizza', 'json'],
  ['/api/sinistri', 'json'],
  ['/api/sinistri-ai', 'json'],
  ['/api/questionario', 'json'],
  ['/api/preventivo-auto/init', 'json'],
  ['/api/preventivo-auto/complete', 'json'],
  ['/api/area-cliente/request-access', 'json'],
  // Il modulo manda i PDF: deve passare il middleware anche in multipart.
  ['/api/second-opinion', 'multipart'],
]

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; fim-smoke-api)' }

async function prova([rotta, formato]) {
  const init =
    formato === 'multipart'
      ? { method: 'POST', headers: HEADERS, body: new FormData() }
      : { method: 'POST', headers: { ...HEADERS, 'Content-Type': 'application/json' }, body: '{}' }
  try {
    const res = await fetch(BASE + rotta, { ...init, signal: AbortSignal.timeout(30_000) })
    const testo = (await res.text()).slice(0, 120).replace(/\s+/g, ' ')
    return { rotta, formato, stato: res.status, testo, ok: res.status === 400 }
  } catch (err) {
    return { rotta, formato, stato: 0, testo: String(err).slice(0, 120), ok: false }
  }
}

const esiti = []
for (const r of ROTTE) esiti.push(await prova(r)) // in fila: il rate limit è per IP

for (const e of esiti) {
  console.log(`${e.ok ? 'ok ' : 'KO '} ${String(e.stato).padEnd(3)} ${e.rotta} (${e.formato}) — ${e.testo}`)
}
const ko = esiti.filter((e) => !e.ok)
if (ko.length > 0) {
  console.error(`\n${ko.length} rotte non rispondono con la loro validazione (attesa: 400) su ${BASE}.`)
  process.exit(1)
}
console.log(`\nTutte le ${esiti.length} rotte rispondono con la validazione su ${BASE}.`)
