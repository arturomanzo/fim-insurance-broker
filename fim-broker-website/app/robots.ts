import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

// AI crawler espliciti — permettiamo l'accesso per massimizzare le citazioni
// nelle risposte di ChatGPT, Claude, Perplexity, Google AI Overviews, Bing
// Copilot e Common Crawl. Eccezioni come /api/ e /_next/ restano disallow
// per evitare crawl di endpoint dinamici e bundle interni.
const AI_BOTS = [
  'GPTBot',              // OpenAI training crawler
  'OAI-SearchBot',       // OpenAI search citations
  'ChatGPT-User',        // ChatGPT browsing/citations on-demand
  'ClaudeBot',           // Anthropic training crawler
  'Claude-Web',          // Anthropic browsing/citations on-demand
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
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },

      // Crawler AI espliciti: stesse regole del generico, ma dichiarazione
      // esplicita per massimizzare crawl rate e citabilità.
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/_next/'],
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    // `host` rimosso: direttiva non standard (legacy Yandex) ignorata da Google.
    // Il dominio canonico è già dichiarato dalla sitemap e dal canonical link.
  }
}
