import postsData from '@/data/blog-posts.json'

export interface BlogSection {
  heading?: string
  body: string
  list?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  updatedDate?: string
  readTime: string
  image: string
  sections: BlogSection[]
  /**
   * Slug autore (vedi `lib/authors.ts`). Opzionale a tipo, ma in pratica
   * sempre risolto: i consumer usano `getAuthor()` che applica il fallback
   * al CEO se il campo manca. Critico per E-E-A-T sui contenuti YMYL.
   */
  author?: string
  /**
   * `true` se l'articolo è stato redatto con il supporto di strumenti di IA
   * (vedi `scripts/generate-blog-post.mjs`). Attiva l'avviso di trasparenza
   * richiesto dall'AI Act (art. 50.4) sulla pagina articolo.
   */
  aiAssisted?: boolean
}

export function getAllPosts(): BlogPost[] {
  return postsData.posts as BlogPost[]
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
