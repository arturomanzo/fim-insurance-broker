// Punto unico di verità per i modelli Claude del sito.
//
// Due famiglie, con regole di chiamata diverse:
//
// - `chat` e `analysis` girano su Opus 5. Il thinking è acceso di default e
//   `max_tokens` copre thinking + testo, quindi i tetti stanno larghi. I
//   classificatori possono rifiutare (HTTP 200 con stop_reason "refusal"), per
//   questo passano da `client.beta.messages` con `fallbacks: 'default'`.
// - `draft` gira su Haiku 4.5, che non pensa e **non accetta** `output_config.effort`
//   (400): lì si usa il solo `format` per il JSON, sul client non-beta.
export const AI_MODELS = {
  chat: 'claude-opus-5', // FIMA e Agente Sinistri
  analysis: 'claude-opus-5', // analizza-polizza, blog
  draft: 'claude-haiku-4-5', // lead scoring, triage IVASS, rinnovi
} as const

/** Il beta che abilita `fallbacks`. Vale solo per i modelli con i classificatori. */
export const FALLBACK_BETA = 'server-side-fallback-2026-07-01'
