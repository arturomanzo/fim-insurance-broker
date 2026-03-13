import type { Metadata } from 'next'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

interface Props {
  params: Promise<{ slug: string }>
}

// Static blog data
const blogPosts: Record<string, {
  title: string
  category: string
  date: string
  readTime: string
  content: string
}> = {
  'come-scegliere-polizza-auto': {
    title: 'Come scegliere la polizza auto giusta nel 2024',
    category: 'Auto',
    date: '15 Novembre 2024',
    readTime: '5 min',
    content: `
## La RC Auto: l'unica obbligatoria

La Responsabilità Civile Auto (RC Auto) è l'unica polizza obbligatoria per legge in Italia. Copre i danni causati a terze persone o cose in caso di incidente stradale di cui sei responsabile.

Scegliere la RC Auto giusta non significa solo cercare il prezzo più basso: considera il massimale di copertura (minimo 6,45 milioni di euro per danni a persone), la classe di merito e le eventuali garanzie accessorie.

## La Kasko: protezione completa per il tuo veicolo

La Kasko copre i danni al tuo veicolo indipendentemente da chi ha causato l'incidente. Esistono due tipologie:

- **Kasko completa**: copre qualsiasi danno al veicolo
- **Mini Kasko o Kasko parziale**: copre solo danni da urto con altro veicolo identificato

## Garanzie accessorie da valutare

Oltre alla RC obbligatoria, considera:

- **Furto e incendio**: fondamentale per auto di valore medio-alto
- **Infortuni del conducente**: copre lesioni fisiche del guidatore
- **Assistenza stradale**: soccorso in caso di guasto o incidente
- **Tutela legale**: supporto legale in caso di contenzioso

## Come risparmiare senza rinunciare alla protezione

FIM confronta le offerte di oltre 50 compagnie per trovare la polizza più conveniente. In media i nostri clienti risparmiano il 25% rispetto al preventivo precedente.
    `,
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]
  if (!post) return { title: 'Articolo non trovato' }
  return { title: post.title }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts[slug]

  // For slugs without full content, show a generic article structure
  const title = post?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  const category = post?.category || 'Assicurazioni'
  const date = post?.date || 'Novembre 2024'
  const readTime = post?.readTime || '5 min'

  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 text-white">
        <div className="container-custom">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Link href="/blog" className="text-white/60 hover:text-white transition-colors">Blog</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/80">{category}</span>
          </div>
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-4">{category}</Badge>
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

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article */}
            <div className="lg:col-span-2">
              <Card padding="lg">
                <div className="prose-fim prose max-w-none">
                  {post?.content ? (
                    post.content.split('\n').map((line, i) => {
                      if (line.startsWith('## ')) {
                        return <h2 key={i} className="text-primary text-2xl font-bold mt-8 mb-4">{line.slice(3)}</h2>
                      }
                      if (line.startsWith('- **')) {
                        const match = line.match(/- \*\*(.+?)\*\*: (.+)/)
                        if (match) {
                          return (
                            <li key={i} className="text-gray-700 mb-2">
                              <strong>{match[1]}</strong>: {match[2]}
                            </li>
                          )
                        }
                      }
                      if (line.trim() && !line.startsWith('#') && !line.startsWith('-')) {
                        return <p key={i} className="text-gray-700 leading-relaxed mb-4">{line}</p>
                      }
                      return null
                    })
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      Contenuto dell&apos;articolo in arrivo. Nel frattempo, contatta il nostro team per informazioni su questo argomento.
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="gradient-primary text-white" padding="lg">
                <h3 className="font-bold mb-3">Hai domande?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Il nostro team è pronto a risponderti gratuitamente.
                </p>
                <Link href="/preventivo" className="btn-primary w-full text-center block mb-3 text-sm">
                  Richiedi Preventivo
                </Link>
                <a href="tel:+390212345678" className="btn-outline-white w-full text-center block text-sm">
                  📞 02 1234567
                </a>
              </Card>

              <Card>
                <h3 className="font-bold text-primary mb-4">Articoli correlati</h3>
                <div className="space-y-3">
                  <Link href="/blog" className="block text-primary hover:underline text-sm">
                    → Torna al blog
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
