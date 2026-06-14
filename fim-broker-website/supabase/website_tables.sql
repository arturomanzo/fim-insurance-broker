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
