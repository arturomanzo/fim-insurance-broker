import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

const BASE_URL = 'https://www.fimbroker.it'

const ITALIAN_MONTHS: Record<string, string> = {
  Gennaio: '01', Febbraio: '02', Marzo: '03', Aprile: '04',
  Maggio: '05', Giugno: '06', Luglio: '07', Agosto: '08',
  Settembre: '09', Ottobre: '10', Novembre: '11', Dicembre: '12',
}

function parseItalianDate(dateStr: string): string {
  if (!dateStr) return new Date().toISOString()
  try {
    const parts = dateStr.trim().split(' ')
    if (parts.length === 3) {
      const [day, monthIt, year] = parts
      const month = ITALIAN_MONTHS[monthIt]
      if (month) return new Date(`${year}-${month}-${day.padStart(2, '0')}`).toISOString()
    }
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) return d.toISOString()
  } catch {}
  return new Date().toISOString()
}

interface Props {
  params: Promise<{ slug: string }>
}

const categoryColors: Record<string, 'primary' | 'accent' | 'success' | 'warning'> = {
  Auto: 'primary',
  Vita: 'success',
  Aziendale: 'warning',
  Casa: 'accent',
  Salute: 'accent',
  Viaggio: 'primary',
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Articolo non trovato' }
  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(post.category)}&sub=${encodeURIComponent(post.excerpt.slice(0, 90))}`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      images: [ogImageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const allPosts = getAllPosts()

  const title = post?.title ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  const category = post?.category ?? 'Assicurazioni'
  const date = post?.date ?? ''
  const readTime = post?.readTime ?? '5 min'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: post?.excerpt ?? '',
    image: post?.image ? [post.image] : [`${BASE_URL}/opengraph-image`],
    datePublished: parseItalianDate(date),
    dateModified: parseItalianDate(date),
    author: {
      '@type': 'Organization',
      name: 'FIM Insurance Broker',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FIM Insurance Broker',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/icon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${slug}` },
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: category, href: `/blog` },
          { name: title, href: `/blog/${slug}` },
        ]}
      />
      {/* Hero */}
      <section className="gradient-primary py-16 text-white">
        <div className="container-custom">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Link href="/blog" className="text-white/60 hover:text-white transition-colors">Blog</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/80">{category}</span>
          </div>
          <div className="max-w-3xl">
            <Badge variant={categoryColors[category] ?? 'primary'} className="mb-4">{category}</Badge>
            <h1 className="text-3xl md:text-4xl font-black mb-4">{title}</h1>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span>FIM Insurance Team</span>
              <span>•</span>
              <span>{date}</span>
              <span>•</span>
              <span>{readTime} di lettura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post?.image && (
        <div className="container-custom pt-8">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9]">
            <Image
              src={post.image}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      )}

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article */}
            <div className="lg:col-span-2">
              <Card padding="lg">
                {post?.excerpt && (
                  <p className="text-lg text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-100 font-medium">
                    {post.excerpt}
                  </p>
                )}

                <div className="space-y-6">
                  {post?.sections ? (
                    post.sections.map((section, i) => (
                      <div key={i}>
                        {section.heading && (
                          <h2 className="text-xl font-black text-primary mb-3">{section.heading}</h2>
                        )}
                        <p className="text-gray-700 leading-relaxed">{section.body}</p>
                        {section.list && (
                          <ul className="mt-3 space-y-2">
                            {section.list.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-gray-700">
                                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      Contenuto in arrivo. Contatta il nostro team per informazioni su questo argomento.
                    </p>
                  )}
                </div>

                {/* CTA inline */}
                <div className="mt-10 p-6 bg-primary/5 border border-primary/10 rounded-xl">
                  <h3 className="font-bold text-primary mb-2">Hai bisogno di una consulenza?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Il nostro team di esperti è a tua disposizione per una consulenza gratuita e senza impegno.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/preventivo" className="btn-primary text-sm px-5 py-2.5">
                      Richiedi Preventivo Gratuito
                    </Link>
                    <a href="tel:+390696883381" className="btn-secondary text-sm px-5 py-2.5">
                      📞 06 96883381
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="gradient-primary text-white" padding="lg">
                <h3 className="font-bold mb-3">Hai domande?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Il nostro team risponde gratuitamente entro 24 ore.
                </p>
                <Link href="/preventivo" className="btn-primary w-full text-center block mb-3 text-sm">
                  Richiedi Preventivo
                </Link>
                <a href="tel:+390696883381" className="btn-outline-white w-full text-center block text-sm">
                  📞 06 96883381
                </a>
              </Card>

              <Card>
                <h3 className="font-bold text-primary mb-4">Altri articoli</h3>
                <div className="space-y-3">
                  {allPosts
                    .filter((p) => p.slug !== slug)
                    .slice(0, 4)
                    .map((p) => (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                        <span className="text-sm text-gray-700 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          → {p.title}
                        </span>
                      </Link>
                    ))}
                  <Link href="/blog" className="block text-sm text-primary hover:underline mt-2">
                    Tutti gli articoli →
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
