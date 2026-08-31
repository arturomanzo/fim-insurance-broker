-- ============================================================
-- Tabelle per i dati raccolti dal sito FIM Insurance Broker
-- Da eseguire nel SQL Editor di Supabase (stesso progetto del gestionale)
-- ============================================================

-- Lead (richieste preventivo dal form del sito)
create table if not exists website_leads (
  id            text primary key,
  nome          text not null,
  cognome       text not null,
  email         text not null,
  telefono      text not null,
  tipo          text not null,
  profilo       text,
  messaggio     text,
  timestamp     timestamptz not null default now(),
  stato         text not null default 'nuovo'
                  check (stato in ('nuovo', 'contattato', 'chiuso'))
);

-- Indice per visualizzare i lead più recenti per primi
create index if not exists website_leads_timestamp_idx on website_leads (timestamp desc);

-- ── Migrazione: Lead Scoring AI ───────────────────────────────────────────────
-- Da eseguire se la tabella website_leads esiste già
alter table website_leads
  add column if not exists ai_score      integer,
  add column if not exists ai_priority   text check (ai_priority in ('alta', 'media', 'bassa')),
  add column if not exists ai_reason     text,
  add column if not exists ai_scored_at  timestamptz;

-- Indice per filtrare/ordinare per score nell'admin
create index if not exists website_leads_ai_score_idx on website_leads (ai_score desc nulls last);

-- Segnalazioni sinistro dal form del sito
create table if not exists website_sinistri (
  id              text primary key,
  nome            text not null,
  cognome         text not null,
  email           text not null,
  telefono        text not null,
  tipo_sinistro   text not null,
  data_evento     text not null,
  numero_polizza  text,
  compagnia       text,
  descrizione     text not null,
  timestamp       timestamptz not null default now(),
  stato           text not null default 'aperto'
                    check (stato in ('aperto', 'in-lavorazione', 'chiuso'))
);

create index if not exists website_sinistri_timestamp_idx on website_sinistri (timestamp desc);

-- RLS: solo il service role può leggere/scrivere (il sito usa SUPABASE_SERVICE_ROLE_KEY).
-- Il service role bypassa RLS by design; le policy esplicite qui sotto garantiscono
-- deny-all a anon/authenticated anche se l'API expose-schema viene abilitato per errore.
alter table website_leads enable row level security;
alter table website_sinistri enable row level security;

drop policy if exists "deny_all_anon_website_leads" on website_leads;
create policy "deny_all_anon_website_leads"
  on website_leads for all
  to anon, authenticated
  using (false)
  with check (false);

drop policy if exists "deny_all_anon_website_sinistri" on website_sinistri;
create policy "deny_all_anon_website_sinistri"
  on website_sinistri for all
  to anon, authenticated
  using (false)
  with check (false);

-- ============================================================
-- IVASS Watcher — stato del cron giornaliero di monitoraggio normativo
-- (vedi /api/cron/ivass-watcher e lib/ivass-watcher/*)
-- ============================================================

create table if not exists ivass_watcher_state (
  id                      text primary key,            -- sha256(source||url)
  source                  text not null,               -- 'ivass' | 'gazzetta-sg' | 'gazzetta-s2' | 'ania-news' | 'ania-comunicati'
  title                   text not null,
  url                     text not null,
  published_at            timestamptz,
  detected_at             timestamptz not null default now(),
  triage_relevance        text check (triage_relevance in ('high', 'medium', 'low', 'none')),
  triage_impacts_site     boolean not null default false,
  triage_summary          text,
  triage_affected_pages   text[],
  triage_deadline         text,
  triage_normative_refs   text,
  triage_error            text,                        -- se il triage AI fallisce
  notified                boolean not null default false,
  notified_at             timestamptz
);

create index if not exists ivass_watcher_state_detected_idx
  on ivass_watcher_state (detected_at desc);
create index if not exists ivass_watcher_state_source_idx
  on ivass_watcher_state (source, detected_at desc);
create index if not exists ivass_watcher_state_relevance_idx
  on ivass_watcher_state (triage_relevance, detected_at desc)
  where triage_relevance in ('high', 'medium');

alter table ivass_watcher_state enable row level security;

drop policy if exists "deny_all_anon_ivass_watcher_state" on ivass_watcher_state;
create policy "deny_all_anon_ivass_watcher_state"
  on ivass_watcher_state for all
  to anon, authenticated
  using (false)
  with check (false);

-- ─────────────────────────────────────────────────────────────────────────────
-- Sorveglianza degli allegati al Reg. IVASS 40/2018 (cron allegati-watcher).
-- Una riga per documento: si confronta l'hash del PDF con l'ultimo salvato.
-- Vedi lib/ivass-watcher/allegati.ts e lib/compliance.ts (ALLEGATI_MONITORATI).
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists ivass_allegati_state (
  id                 text primary key,        -- 'allegato-3' | 'allegato-4' | 'reg-40-consolidato'
  label              text not null,
  url                text not null,
  content_hash       text,                    -- sha256 del PDF scaricato
  etag               text,
  last_modified      text,                    -- header HTTP, non parsato
  content_length     integer,
  first_seen_at      timestamptz not null default now(),
  last_checked_at    timestamptz not null default now(),
  last_changed_at    timestamptz,
  consecutive_errors integer not null default 0,
  check_error        text,
  notified_at        timestamptz              -- valorizzato solo a email spedita
);

create index if not exists ivass_allegati_state_changed_idx
  on ivass_allegati_state (last_changed_at desc);

alter table ivass_allegati_state enable row level security;

drop policy if exists "deny_all_anon_ivass_allegati_state" on ivass_allegati_state;
create policy "deny_all_anon_ivass_allegati_state"
  on ivass_allegati_state for all
  to anon, authenticated
  using (false)
  with check (false);

-- ============================================================
-- Newsletter — iscritti dal form nel footer del sito
--
-- Questa tabella è la FONTE DI VERITÀ dell'iscrizione, non Resend.
-- Motivo: fino al 31/08/2026 la route rispondeva "ok" anche quando Resend non
-- era configurato, e gli indirizzi finivano nel nulla. Adesso l'iscrizione
-- esiste se e solo se c'è una riga qui; l'eventuale contatto su Resend è una
-- copia best-effort.
--
-- `consenso_at`, `consenso_ip` e `consenso_user_agent` servono a dimostrare il
-- consenso richiesto dall'art. 7 GDPR: senza data e provenienza, un consenso
-- raccolto non è documentato.
-- ============================================================

create table if not exists website_newsletter (
  id                   text primary key,
  email                text not null unique,
  consenso             boolean not null default true,
  consenso_at          timestamptz not null default now(),
  consenso_ip          text,
  consenso_user_agent  text,
  origine              text,                      -- pagina da cui è partita l'iscrizione
  resend_contact_id    text,                      -- valorizzato solo se l'audience Resend è configurata
  stato                text not null default 'attivo'
                         check (stato in ('attivo', 'disiscritto')),
  disiscritto_at       timestamptz,
  timestamp            timestamptz not null default now()
);

create index if not exists website_newsletter_timestamp_idx
  on website_newsletter (timestamp desc);

-- Per l'invio: gli attivi, in ordine di iscrizione
create index if not exists website_newsletter_stato_idx
  on website_newsletter (stato, timestamp desc);

alter table website_newsletter enable row level security;

drop policy if exists "deny_all_anon_website_newsletter" on website_newsletter;
create policy "deny_all_anon_website_newsletter"
  on website_newsletter for all
  to anon, authenticated
  using (false)
  with check (false);

-- ============================================================
-- Newsletter — invii mensili
--
-- Una riga per periodo ('YYYY-MM'), con `unique` sul periodo: è il vincolo che
-- impedisce il doppio invio. La riga si crea PRIMA di spedire, non dopo — se la
-- funzione muore a metà, il mese risulta già preso e il giorno dopo non riparte.
-- Si perde un invio, non se ne spediscono due: su una lista di email è il verso
-- giusto in cui sbagliare.
--
-- `html` conserva il corpo esatto approvato, con il segnaposto
-- {{UNSUBSCRIBE_URL}} sostituito per destinatario: quello che Arturo approva è
-- quello che parte, anche se nel frattempo il blog cambia.
-- ============================================================

create table if not exists website_newsletter_invii (
  id            text primary key,
  periodo       text not null unique,          -- 'YYYY-MM'
  stato         text not null default 'bozza'
                  check (stato in ('bozza', 'inviato', 'annullato')),
  articoli      text[] not null default '{}',  -- slug degli articoli inclusi
  oggetto       text not null,
  html          text not null,
  destinatari   integer,
  inviati       integer,
  falliti       integer,
  creato_at     timestamptz not null default now(),
  inviato_at    timestamptz
);

create index if not exists website_newsletter_invii_creato_idx
  on website_newsletter_invii (creato_at desc);

alter table website_newsletter_invii enable row level security;

drop policy if exists "deny_all_anon_website_newsletter_invii" on website_newsletter_invii;
create policy "deny_all_anon_website_newsletter_invii"
  on website_newsletter_invii for all
  to anon, authenticated
  using (false)
  with check (false);
