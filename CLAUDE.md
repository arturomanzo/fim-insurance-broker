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

## Stack tecnico

- **Framework**: Next.js 15.5 (App Router) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS 3.4 + design system custom (no librerie UI esterne)
- **DB & Auth**: Supabase (`@supabase/supabase-js`)
- **Email**: Resend (`resend`)
- **AI**: Anthropic SDK (chatbot FIMA)
- **Monitoring**: Sentry (`@sentry/nextjs`)
- **Analytics**: GA4 + Microsoft Clarity
- **Rate limiting**: Upstash Redis (`@upstash/ratelimit`)
- **Utility classi CSS**: `clsx`
- **Deploy**: Vercel

---

## Design system

### Palette (da `tailwind.config.ts`)
| Token | Hex | Uso |
|---|---|---|
| `primary` | `#0f2d6b` | Heading, testo, elementi principali |
| `primary-light` | `#1a4a9e` | Hover primario |
| `primary-dark` | `#091d47` | Gradiente scuro |
| `accent` | `#00b4c8` | CTA, highlight, link attivi |
| `accent-dark` | `#008fa0` | Hover accent |
| `accent-light` | `#33c7d8` | Accento chiaro |

### Utility CSS custom (in `app/globals.css`)
- `.container-custom` — container responsive
- `.section-padding` — padding verticale coerente per sezioni
- `.gradient-primary`, `.gradient-accent`, `.text-gradient`
- `.btn-primary`, `.btn-secondary`, `.btn-outline-white`
- `.input-field`, `.label-field`

### Componenti UI (`components/ui/`)
- **`Button`** — varianti `primary | secondary | outline | ghost | outline-white`, size `sm | md | lg`, supporto `loading`
- **`Card`** — `hover`, `padding: none | sm | md | lg`
- **`Badge`**, **`FaqAccordion`**, **`CookieBanner`**, **`FimLogo`**, **`WhatsAppButton`**, **`InsuranceQuiz`**

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

## Directory chiave

```
fim-broker-website/
├── app/
│   ├── (marketing)/              # Pagine pubbliche
│   │   ├── page.tsx              # Homepage
│   │   ├── chi-siamo/
│   │   ├── contatti/
│   │   ├── collabora-con-noi/    # Sezione collabora (PR #19)
│   │   ├── servizi/[slug]/
│   │   ├── soluzioni/
│   │   ├── blog/[slug]/
│   │   ├── preventivo/
│   │   ├── prenota-consulenza/
│   │   ├── sinistri/
│   │   ├── quiz-polizza/
│   │   ├── calcolatore-rischi/
│   │   ├── analizza-polizza/
│   │   ├── glossario/
│   │   ├── osservatorio-prezzi/
│   │   ├── risorse/              # Guide, PDF, osservatorio PMI
│   │   └── area-cliente/
│   ├── (admin)/                  # Admin panel protetto (clienti, polizze, leads, sinistri)
│   ├── (legal)/                  # Privacy, cookie, note legali
│   ├── api/                      # API routes (contact, collabora, preventivo, prenota, chat FIMA, ...)
│   ├── layout.tsx                # Root layout + metadata globale
│   ├── sitemap.ts                # Sitemap statica
│   └── globals.css               # Tailwind + utility custom
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── home/                     # Sezioni homepage
│   ├── forms/                    # ContactForm, CollaboraForm, PreventivoForm, ...
│   ├── ui/                       # Design system (Button, Card, Badge, ...)
│   ├── admin/                    # Admin-only
│   ├── chatbot/                  # FIMA AI widget
│   └── calculator/               # Calcolatore rischio
├── lib/
│   ├── analytics.ts              # Tracking GA4 (trackContactSubmit, trackCollaboraSubmit, ...)
│   ├── rateLimit.ts              # Rate limiting Upstash
│   ├── supabase.ts               # Client Supabase
│   ├── anthropic.ts              # Client Anthropic per FIMA
│   ├── services.ts               # Lista servizi per sitemap/pagine
│   ├── collabora.ts              # Costanti condivise collabora (PROFILI, ESPERIENZE)
│   └── ...
├── public/
│   ├── images/team/              # Foto team reali (jpg)
│   ├── images/partners/          # Logo compagnie (svg)
│   └── icons/
├── data/                         # JSON statici (blog-posts, policies, leads, sinistri)
├── supabase/                     # Migrations e config
└── tailwind.config.ts
```

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
- **Tono**: professionale, relazionale, trasparente — NON corporate, NON freddo
- **Claim chiave**: "Broker indipendente: non rappresentiamo compagnie ma solo i tuoi interessi"
- **Contatti pubblici**:
  - Sede: Via Roma 41, 04012 Cisterna di Latina (LT)
  - Tel: +39 06 96883381
  - Email: `info@fimbroker.it`
  - PEC: `fiminsurancebrokersas@pec.it`
- **Compliance**: IVASS (RUI Sez. B n. B000405449), GDPR (Reg. UE 2016/679), IDD (D.Lgs 68/2018)
- **Compagnie partner**: 30+ tra cui Generali, AXA, Allianz, UnipolSai, Zurich, Groupama, HDI, Cattolica

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

## Comandi utili

```bash
cd fim-broker-website
npm install           # installa dipendenze
npm run dev           # dev server (http://localhost:3000)
npm run build         # build produzione
npm run lint          # ESLint (next lint)
npx tsc --noEmit      # typecheck (non c'è script dedicato in package.json)
```

---

## Mantenere questo file aggiornato

Quando il progetto evolve in modo non banale (nuovi pattern, nuovi pacchetti, nuove convenzioni, breaking change architetturali), aggiorna questo file nello stesso commit del cambiamento. Le sessioni future avranno sempre il contesto giusto senza dover rifare discovery da zero.
