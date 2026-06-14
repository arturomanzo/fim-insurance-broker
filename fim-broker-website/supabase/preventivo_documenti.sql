-- ─────────────────────────────────────────────────────────────────────────────
-- Bucket privato per i documenti di preventivazione (auto e non).
-- Contiene dati personali sensibili (carta d'identità, patente, libretto, visura):
-- il bucket NON è pubblico e l'accesso avviene solo tramite:
--   • signed upload URL (lato server, service role) per il caricamento del cliente
--   • signed download URL a scadenza breve inviati via email al team FIM
-- Nessuna policy anon/authenticated → nessun accesso pubblico agli oggetti.
--
-- Da applicare una sola volta sul progetto Supabase (SQL editor o CLI).
-- ─────────────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'documenti-preventivo',
  'documenti-preventivo',
  false,                                  -- privato
  10485760,                               -- 10 MB per file
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Nota retention (GDPR — minimizzazione):
-- prevedere un job schedulato che elimini gli oggetti più vecchi di N giorni, es.:
--   delete from storage.objects
--   where bucket_id = 'documenti-preventivo'
--     and created_at < now() - interval '30 days';
