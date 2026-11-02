import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

// AI crawler espliciti — permettiamo l'accesso per massimizzare le citazioni
// nelle risposte di ChatGPT, Claude, Perplexity, Google AI Overviews, Bing
// Copilot e Common Crawl. /api/ resta disallow per non far chiamare le rotte
// dei moduli ai crawler, tranne /api/og.
//
// Fino al 02/11/2026 era disallow anche /_next/: lì stanno CSS e JavaScript
// (/_next/static) e le immagini ottimizzate (/_next/image). Google chiede di non
// bloccarli, altrimenti rende le pagine senza stile e non indicizza le immagini.
// E /api/og, le anteprime per i social, finiva sotto /api/: LinkedInBot rispetta
// il robots.txt, quindi i link condivisi rischiavano di uscire senza immagine.
// Per Google vince la regola più lunga: Allow /api/og batte Disallow /api/.
const REGOLE = {
  allow: ['/', '/api/og'],
  disallow: ['/api/', '/questionario/'],
}
const AI_BOTS = [
  'GPTBot',              // OpenAI training crawler
  'OAI-SearchBot',       // OpenAI search citations
  'ChatGPT-User',        // ChatGPT browsing/citations on-demand
  'ClaudeBot',           // Anthropic training crawler
  'Claude-SearchBot',    // Anthropic search index
  'Claude-User',         // Claude fetches on-demand (richiesta di un utente)
  'Claude-Web',          // Anthropic, nome precedente
  'PerplexityBot',       // Perplexity AI
  'Perplexity-User',     // Perplexity on-demand fetches
  'Google-Extended',     // Google AI Overviews / Gemini training opt-in
  'Applebot-Extended',   // Apple Intelligence training
  'CCBot',               // Common Crawl (dataset usato da molti LLM)
  'Bytespider',          // ByteDance / Doubao
  'Meta-ExternalAgent',  // Meta AI training
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Crawler generici (Google, Bing, DuckDuckGo, …)
      {
        userAgent: '*',
        ...REGOLE,
      },

      // Crawler AI espliciti: stesse regole del generico, ma dichiarazione
      // esplicita per massimizzare crawl rate e citabilità.
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        ...REGOLE,
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    // `host` rimosso: direttiva non standard (legacy Yandex) ignorata da Google.
    // Il dominio canonico è già dichiarato dalla sitemap e dal canonical link.
  }
}
