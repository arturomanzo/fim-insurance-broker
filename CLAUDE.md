# FIM Insurance Broker — Guida per Claude

Sito pubblico di **FIM Insurance Broker S.a.s.** di Manzo Arturo & C. — broker assicurativo italiano indipendente con sede a Cisterna di Latina (LT). Iscrizione RUI Sez. B n. B000405449. P.IVA 02637640596.

Questo file è letto automaticamente da Claude Code all'inizio di ogni sessione e serve a dare contesto sulla struttura, le convenzioni e lo stato corrente del progetto.

---

## Struttura del repository

```
/fim-insurance-broker
├── fim-broker-website/     ← progetto principale (Next.js 15) — LAVORA QUI
├── api/                    ← API legacy (deprecato, NON toccare)
├── index.html, rescue.html ← file legacy (deprecato, NON toccare)
├── fima-chatbot.js         ← widget legacy (deprecato)
├── briefing_patch.js       ← script legacy (deprecato)
└── vercel.json
```

**Regola:** lavora SEMPRE dentro `fim-broker-website/` salvo richiesta esplicita del contrario.

---

## Pattern da seguire (IMPORTANTE)

### Form client-side
Riferimento: `components/forms/ContactForm.tsx` e `components/forms/CollaboraForm.tsx`.

- `'use client'` in cima
- `useState` per `formData` + `status: 'idle' | 'loading' | 'success' | 'error'`
- Campo honeypot `website` nascosto visivamente (anti-bot)
- Lettura UTM da `sessionStorage` key `fim_utm` in `useEffect`
- Submit → `fetch('/api/...')` → success: chiama `track*Submit()` da `lib/analytics.ts` + stato `success`
- Schermata di conferma inline quando `status === 'success'` (no redirect)
- Errori: `errorMsg` state + fallback generico `"Errore nell'invio. Riprova o contattaci al +39 06 96883381."`

### API routes
Riferimento: `app/api/contact/route.ts` e `app/api/collabora/route.ts`.

- Rate limiting con `rateLimit(req, { limit: 5, windowMs: 60 * 60_000 })` da `@/lib/rateLimit`
- Helper locali `validateEmail`, `sanitize` (slice 0–1000), `escapeHtml`
- Honeypot check: se `body.website` è compilato → return `{ success: true }` silenzioso
- Validazione: campi obbligatori, email valida, consenso privacy
- Email via Resend in parallelo con `Promise.all([teamEmail, userConfirmEmail])`
- Env var: `RESEND_API_KEY`, `FIM_EMAIL` (default `info@fimbroker.it`), `FIM_FROM_EMAIL`
- Dev fallback: se `RESEND_API_KEY` assente → `console.log` del payload
- Response: `{ success, message, id }` o `{ error }`

### Pagine marketing
Riferimento: `app/(marketing)/chi-siamo/page.tsx` e `app/(marketing)/collabora-con-noi/page.tsx`.

- Server component con `export const metadata: Metadata`
- Hero: `<section className="gradient-primary py-16 md:py-24 text-white">`
- Sezioni alternate `bg-white` / `bg-gray-50` con `section-padding`
- OG image dinamica via `/api/og?title=...&tag=...&sub=...`
- Riusare `Card` da `@/components/ui/Card` invece di hardcodare markup
- Array di dati a module-level (vantaggi, profili, steps, ecc.) — leggibili e facili da maintenere

### Costanti condivise
Quando un valore è usato in più di un file (form + route + page), estrarre in `lib/<feature>.ts` come `as const` con helper tipizzati. Vedi `lib/collabora.ts` per il pattern: `PROFILI`, `PROFILO_LABELS`, `isValidProfilo()`.

---

## Gestionale esterno (integrazione)

Esiste un **CRM/gestionale separato** deployato su `fim-gestionale-next.vercel.app` (repo diverso) con:

- **API pubblica REST v1** autenticata via header `X-API-Key: fim_key_...`
- Endpoint principali:
  - `GET /api/v1/clienti` — lista clienti paginata
  - `GET /api/v1/polizze` — lista polizze con relazioni
  - `GET /api/v1/scadenze` — polizze in scadenza
  - `POST /api/v1/webhooks` — registra webhook esterni
  - `POST /api/v1/ai/portfolio-analysis` — analisi AI del portafoglio
  - `POST /api/v1/solleciti/auto` — cron solleciti 7gg
  - `GET /api/v1/docs` — OpenAPI 3.0 spec
- **Webhook events**: `polizza.creata|rinnovata|scadenza`, `cliente.creato`, `sinistro.aperto|chiuso`, `pagamento.ricevuto|scaduto`
- Firma webhook: header `X-Signature: sha256=...`

**Uso consigliato:** per popolare l'Area Cliente del sito con dati reali (polizze, scadenze, sinistri) invece di mock/JSON statico.

---

## Contesto business

- **Target**: famiglie, professionisti, artigiani, PMI, condomini (mercato italiano)
- **Lingua**: italiano (tutto il sito, tutto il contenuto user-facing, anche i commenti del codice di business)
- **Tono**: professionale, relazionale, trasparente — NON corporate, NON freddo (regole complete in "Stile di scrittura")
- **Claim chiave**: "Broker indipendente: non rappresentiamo compagnie ma solo i tuoi interessi"
- **Contatti pubblici**:
  - Sede: Via Roma 41, 04012 Cisterna di Latina (LT)
  - Tel: +39 06 96883381
  - Email: `info@fimbroker.it`
  - PEC: `fiminsurancebrokersas@pec.it`
- **Compliance**: IVASS (RUI Sez. B n. B000405449), GDPR (Reg. UE 2016/679), IDD (D.Lgs 68/2018)
- **Compagnie partner**: 30+ (elenco mandati completo sotto)

### Mandati e collaborazioni con compagnie — SEMPRE aggiornati

Usare queste informazioni ogni volta che si risponde a domande sulle compagnie con cui FIM collabora.

| Compagnia | Tipo rapporto | Dettagli operativi |
|---|---|---|
| **Generali** | Collaborazione tramite agenzia | Ag. di Latina — P.zza della Libertà 9, Latina |
| **AXA Assicurazioni** | Collaborazione tramite agenzia | Agenzia di Nettuno |
| **HDI Assicurazioni** | Collaborazione tramite agenzia | Agenzia di Genzano di Roma — https://www.hdiassicurazioni.it/it/trova-agenzia |
| **Roland Italia** | Mandato diretto | Agenzia n. 1170 — https://www.roland-italia.it/ |
| **AEC Underwriting** | Mandato diretto | https://www.aecunderwriting.it/ |
| **MetLife** | Mandato diretto | https://www.metlife-per-te.it/ |
| **Bene.it** | Collaborazione tramite agenzia | Agenzia di Velletri — https://www.bene.it/ |
| **Allianz** | Mandato diretto | https://www.allianz.it/ |
| **UnipolSai** | Partner per prodotto | — |
| **Zurich** | Partner per prodotto | — |
| **Groupama** | Partner per prodotto | — |
| **Cattolica** | Partner per prodotto | — |
| **Reale Mutua** | Partner per prodotto | — |
| **Aviva** | Partner per prodotto | — |
| **Ergo** | Partner per prodotto | — |
| **SACE** | Partner per prodotto | — |

> ⚠️ **Dalbogg non è più operativa** — non citarla mai in contenuti, preventivi o comunicazioni.

---

## Stile di scrittura (tutte le risposte e i documenti)

Regole permanenti richieste da Arturo. Valgono per OGNI testo prodotto da Claude — risposte in chat, documenti, paper, articoli, email, contenuti del sito — salvo formule normative obbligatorie (IVASS, IDD, GDPR, CAP, RUI) e dati tecnici, che restano intatti.

1. **Mai le parole da AI.** Vietate: "fondamentale", "inoltre", "panorama", "in conclusione" — e i loro cloni ("cruciale", "in sintesi", "in un mondo in cui..."). Se una frase ne ha bisogno, la frase va riscritta.
2. **Tono colloquiale, ironico e diretto.** Scrivi come se stessi parlando a un amico davanti a una birra, non come un ufficio stampa.
3. **Niente struttura rigida.** Evita gli elenchi puntati dove basta il discorso, niente riassunto finale di rito. Frasi brevi, scrittura fluida.
4. **Assumi un ruolo concreto** adatto al testo: il broker che spiega a un cliente, il giornalista di cronaca locale, il blogger esperto — mai la voce neutra da manuale.

Queste regole si sommano alla skill **`fim-humanizer`**, che resta il passaggio finale prima di consegnare qualsiasi testo. Vive in `~/.claude/skills/fim-humanizer/` per Claude Code ed è caricata anche su Claude.ai: le due copie vanno tenute allineate a mano.

---

## Regole operative per Claude

1. **NON** creare file `.md` di documentazione salvo richiesta esplicita (questo `CLAUDE.md` è l'unica eccezione).
2. **NON** committare su `main` direttamente — sempre su un branch dedicato.
3. **NON** aprire PR senza richiesta esplicita dell'utente.
4. **NON** usare `--no-verify`, `--force`, `git reset --hard` e simili senza permesso esplicito.
5. **SEMPRE** seguire i pattern esistenti (vedi sezione "Pattern da seguire") invece di inventare soluzioni nuove.
6. **SEMPRE** riutilizzare `Button`, `Card`, `Badge` da `components/ui/` invece di hardcodare markup.
7. **SEMPRE** estrarre in `lib/` le costanti condivise tra 2+ file.
8. **SEMPRE** aggiungere `track*Submit()` in `lib/analytics.ts` per ogni nuovo form.
9. **NON** installare nuove dipendenze senza giustificazione forte.
10. **NON** usare placeholder Unsplash per foto team in produzione — usare `public/images/team/*.jpg`.
11. **Italiano only** per contenuti user-facing. Inglese OK per identifier, tipi, log tecnici.

---

## Deploy & verifica (lezioni operative)

> Queste regole nascono da problemi realmente accaduti: deploy Vercel falliti in silenzio per un errore TypeScript, dando per "fatto" un fix mai andato in produzione.

- **Verifica che il build passi PRIMA di considerare deployata una fix.** Un `tsc --noEmit` o un `npm run build` rosso = deploy Vercel fallito in silenzio. Typecheck verde non è opzionale. L'hook globale `typecheck-after-edit` lo segnala già durante le modifiche; al rilascio riverifica sull'intero progetto.
- **Non dire "fatto" finché il deploy non è verificato.** Dopo il push, conferma su Vercel che l'ultimo deploy è `READY` (non `ERROR`); se la modifica è user-facing, controlla anche la URL pubblica.
- **Usa la skill `/ship`** per il ciclo completo (typecheck → lint → branch → commit → PR → verifica deploy → log nell'Hub) senza saltare passi.

## Database & asset

- **Prima di ogni insert/update**, conferma lo schema reale (nomi colonne, campi obbligatori, valori enum validi di status) interrogando lo schema — non assumere i nomi. Più volte cron/notifiche sono falliti per colonna sbagliata o status non valido.
- **Prima di generare grafiche o asset brandizzati**, conferma con l'utente logo ufficiale, palette esatta e pagina/sezione di destinazione. Non indovinare i colori (es. navy+gold a caso): ha già causato rigenerazioni complete.

---

## Mantenere questo file aggiornato

Quando il progetto evolve in modo non banale (nuovi pattern, nuovi pacchetti, nuove convenzioni, breaking change architetturali), aggiorna questo file nello stesso commit del cambiamento. Le sessioni future avranno sempre il contesto giusto senza dover rifare discovery da zero.
