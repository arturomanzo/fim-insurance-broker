import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Blog & News Assicurative',
  description: 'Rimani aggiornato con guide, news e consigli dal mondo delle assicurazioni. FIM Insurance Broker.',
}

const posts = [
  {
    slug: 'come-scegliere-polizza-auto',
    title: 'Come scegliere la polizza auto giusta nel 2024',
    excerpt: 'Una guida completa per orientarsi tra RC Auto, Kasko e garanzie accessorie. Ecco cosa valutare prima di firmare.',
    category: 'Auto',
    date: '15 Novembre 2024',
    readTime: '5 min',
  },
  {
    slug: 'assicurazione-vita-guida',
    title: 'Assicurazione vita: perché è importante e quando stipularla',
    excerpt: 'Scopri come una polizza vita può proteggere la tua famiglia e garantire serenità finanziaria nel lungo periodo.',
    category: 'Vita',
    date: '8 Novembre 2024',
    readTime: '7 min',
  },
  {
    slug: 'cyber-risk-pmi',
    title: 'Cyber risk: perché le PMI devono assicurarsi contro gli attacchi informatici',
    excerpt: 'Il 40% delle PMI italiane ha subito un attacco informatico. Scopri come proteggere la tua azienda.',
    category: 'Aziendale',
    date: '1 Novembre 2024',
    readTime: '6 min',
  },
  {
    slug: 'novita-rc-auto-2024',
    title: 'Novità RC Auto 2024: cosa cambia con il nuovo regolamento europeo',
    excerpt: 'Il nuovo regolamento UE introduce importanti modifiche alla RC Auto. Ecco tutto quello che devi sapere.',
    category: 'Auto',
    date: '25 Ottobre 2024',
    readTime: '4 min',
  },
  {
    slug: 'polizza-casa-alluvioni',
    title: 'Polizza casa e rischio alluvioni: sei davvero coperto?',
    excerpt: 'Con i cambiamenti climatici, le inondazioni sono sempre più frequenti. Verifica se la tua polizza casa ti protegge davvero.',
    category: 'Casa',
    date: '18 Ottobre 2024',
    readTime: '5 min',
  },
  {
    slug: 'previdenza-complementare',
    title: 'Previdenza complementare: come integrare la pensione pubblica',
    excerpt: 'Il sistema pensionistico italiano non sarà sufficiente. Scopri come costruire una pensione integrativa efficace.',
    category: 'Vita',
    date: '10 Ottobre 2024',
    readTime: '8 min',
  },
]

const categoryColors: Record<string, 'primary' | 'accent' | 'success' | 'warning'> = {
  Auto: 'primary',
  Vita: 'success',
  Aziendale: 'warning',
  Casa: 'accent',
}

export default function BlogPage() {
  const [featured, ...rest] = posts

  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 text-white">
        <div className="container-custom">
          <span className="inline-block bg-white/10 border border-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
            Blog & News
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Aggiornamenti dal <span className="text-accent">mondo assicurativo</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Guide pratiche, novità normative e consigli degli esperti FIM per fare scelte assicurative consapevoli.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Featured post */}
          <div className="mb-10">
            <Link href={`/blog/${featured.slug}`} className="group">
              <Card hover className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden" padding="none">
                <div className="bg-primary/10 aspect-video md:aspect-auto min-h-48 flex items-center justify-center">
                  <span className="text-6xl opacity-30">📰</span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={categoryColors[featured.category] || 'primary'}>{featured.category}</Badge>
                    <span className="text-gray-500 text-sm">{featured.readTime} lettura</span>
                  </div>
                  <h2 className="text-2xl font-black text-primary mb-3 group-hover:text-primary-light transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{featured.date}</span>
                    <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                      Leggi
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card hover className="h-full flex flex-col">
                  <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center mb-4">
                    <span className="text-4xl opacity-30">📄</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={categoryColors[post.category] || 'primary'}>{post.category}</Badge>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-primary mb-2 group-hover:text-primary-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                  <div className="text-gray-500 text-xs pt-4 border-t border-gray-100">{post.date}</div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
