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

-- RLS: solo il service role può leggere/scrivere (il sito usa SUPABASE_SERVICE_ROLE_KEY)
alter table website_leads enable row level security;
alter table website_sinistri enable row level security;
