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
  readTime: string
  image: string
  sections: BlogSection[]
}

export function getAllPosts(): BlogPost[] {
  return postsData.posts as BlogPost[]
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
