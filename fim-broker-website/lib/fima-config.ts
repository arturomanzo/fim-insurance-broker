import { AI_MODELS } from './ai-models'

export const FIMA_CONFIG = {
  model: AI_MODELS.chat,
  // Il tetto copre anche il thinking, che su Opus 5 è acceso di default.
  maxTokens: 8192,
  maxMessages: 20,
  rui: 'Sez. B n. B000405449',
  email: 'info@fimbroker.it',
  telefono: '+39 06 96883381',
  whatsapp: '393473312330',
  sede: 'Via Roma 41, 04012 Cisterna di Latina (LT)',
  sito: 'https://www.fimbroker.it',
} as const
