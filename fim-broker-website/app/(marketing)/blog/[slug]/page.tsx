import type { Metadata } from 'next'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

interface Props {
  params: Promise<{ slug: string }>
}

interface BlogPost {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  sections: Array<{ heading?: string; body: string; list?: string[] }>
}

const blogPosts: Record<string, BlogPost> = {
  'come-scegliere-polizza-auto': {
    title: 'Come scegliere la polizza auto giusta nel 2024',
    excerpt: 'Una guida completa per orientarsi tra RC Auto, Kasko e garanzie accessorie. Ecco cosa valutare prima di firmare.',
    category: 'Auto',
    date: '15 Novembre 2024',
    readTime: '5 min',
    sections: [
      {
        heading: "La RC Auto: l'unica obbligatoria per legge",
        body: "La Responsabilità Civile Auto è l'unica polizza obbligatoria per circolare su strada in Italia. Copre i danni causati a terzi (persone e cose) in caso di sinistro di cui sei responsabile. Il massimale minimo per legge è di 6,45 milioni di euro per danni a persone e 1,22 milioni per danni a cose.",
      },
      {
        heading: 'Kasko completa o parziale?',
        body: 'La Kasko copre i danni al tuo veicolo indipendentemente da chi ha causato il sinistro. Esistono due varianti principali:',
        list: [
          'Kasko completa: copre qualsiasi danno al veicolo, inclusi grandine, incidenti colpa tua e atti vandalici',
          'Mini Kasko o Kasko parziale: copre solo i danni da collisione con un altro veicolo identificato',
          'Collisione: variante economica che copre solo gli urti con altri veicoli',
        ],
      },
      {
        heading: 'Garanzie accessorie da valutare',
        body: "Oltre alla RC obbligatoria, valuta queste garanzie in base all'uso del veicolo e al suo valore:",
        list: [
          'Furto e incendio: fondamentale per auto di valore medio-alto o parcheggiate in zone a rischio',
          'Infortuni del conducente: copre le lesioni fisiche del guidatore in caso di incidente',
          'Assistenza stradale: soccorso H24 in caso di guasto o incidente',
          'Tutela legale: supporto legale in caso di contenzioso con terze parti',
          'Cristalli: riparazione o sostituzione del parabrezza senza franchigia',
        ],
      },
      {
        heading: 'Come risparmiare senza rinunciare alla protezione',
        body: "Il mercato della RC Auto è molto competitivo. FIM confronta le offerte di oltre 50 compagnie per trovare la polizza più conveniente in base al tuo profilo. In media i nostri clienti risparmiano il 25% rispetto al preventivo precedente, mantenendo le stesse coperture o migliorandole.",
      },
      {
        heading: 'Classe di merito e bonus-malus',
        body: "Il sistema bonus-malus italiano prevede 18 classi di merito. Più anni passano senza sinistri, più la classe scende e il premio diminuisce. Un sinistro causa invece un avanzamento di 2 classi. Con FIM puoi verificare la tua classe attuale e capire come ottimizzarla nel tempo.",
      },
    ],
  },
  'assicurazione-vita-guida': {
    title: "Assicurazione vita: perché è importante e quando stipularla",
    excerpt: "Scopri come una polizza vita può proteggere la tua famiglia e garantire serenità finanziaria nel lungo periodo.",
    category: 'Vita',
    date: '8 Novembre 2024',
    readTime: '7 min',
    sections: [
      {
        heading: "Cos'è e come funziona",
        body: "Un'assicurazione vita è un contratto con cui la compagnia si impegna a pagare un capitale o una rendita al verificarsi di un evento legato alla vita dell'assicurato (morte, sopravvivenza a una certa età, invalidità). È uno strumento di pianificazione finanziaria, non solo di protezione.",
      },
      {
        heading: 'Le principali tipologie',
        body: 'Esistono diverse tipologie di polizze vita, ciascuna adatta a esigenze diverse:',
        list: [
          'Temporanea caso morte (TCM): paga il capitale solo in caso di morte nel periodo di copertura. Ideale per proteggere il mutuo o la famiglia',
          'Vita intera: copre per tutta la vita, con accumulo di un valore di riscatto crescente',
          'Mista: combina protezione caso morte e accumulo di capitale a scadenza',
          'Unit-linked: il capitale è investito in fondi. Maggiore potenziale di rendimento ma anche più rischio',
          'Index-linked: rendimento agganciato a un indice di mercato con capitale spesso garantito',
        ],
      },
      {
        heading: 'Quando stipulare una polizza vita',
        body: "Il momento migliore per stipulare una polizza vita è quando si hanno persone a carico o obbligazioni finanziarie importanti:",
        list: [
          'Hai un mutuo acceso: una TCM garantisce che il mutuo venga estinto in caso di tua prematura scomparsa',
          'Hai figli piccoli: proteggi il loro futuro garantendo loro un capitale anche in tua assenza',
          'Sei un lavoratore autonomo: senza copertura INPS completa, hai bisogno di protezione aggiuntiva',
          'Vuoi integrare la pensione: i piani vita con accumulo sono uno strumento efficace di previdenza complementare',
        ],
      },
      {
        heading: 'Vantaggi fiscali',
        body: "I premi versati per polizze caso morte e invalidità permanente sono detraibili al 19% fino a un massimo di 530 euro annui. Per le polizze previdenziali, la deducibilità arriva fino a 5.164,57 euro all'anno. Il capitale percepito in caso di morte è esente da IRPEF e non è soggetto a successione.",
      },
    ],
  },
  'cyber-risk-pmi': {
    title: 'Cyber risk: perché le PMI devono assicurarsi contro gli attacchi informatici',
    excerpt: "Il 40% delle PMI italiane ha subito un attacco informatico. Scopri come proteggere la tua azienda.",
    category: 'Aziendale',
    date: '1 Novembre 2024',
    readTime: '6 min',
    sections: [
      {
        heading: 'Il rischio informatico per le PMI italiane',
        body: "Secondo il Rapporto Clusit 2024, gli attacchi informatici in Italia sono aumentati del 65% in due anni. Le PMI sono le più colpite perché spesso mancano di risorse dedicate alla sicurezza IT. Il costo medio di un data breach per una PMI italiana è stimato in 170.000 euro.",
      },
      {
        heading: 'Cosa copre una polizza cyber risk',
        body: 'Una polizza cyber risk ben strutturata copre molteplici scenari:',
        list: [
          'Ripristino dei sistemi informatici dopo un attacco ransomware',
          'Perdita di ricavi durante il blocco operativo (Business Interruption)',
          'Costi di notifica alle autorità e agli interessati (obbligatoria per GDPR entro 72h)',
          'Spese legali e sanzioni per violazioni del Regolamento Europeo sulla Privacy',
          'Richieste di risarcimento da clienti o fornitori danneggiati',
          'Estorsione informatica e costi di negoziazione',
        ],
      },
      {
        heading: 'GDPR e obblighi di notifica',
        body: "Dal 2018 il GDPR impone alle aziende di notificare i data breach al Garante entro 72 ore e, se vi è rischio elevato per gli interessati, anche alle persone coinvolte. Le sanzioni possono arrivare al 4% del fatturato globale annuo o 20 milioni di euro. La polizza cyber copre sia i costi di gestione della crisi che le eventuali sanzioni.",
      },
      {
        heading: 'Come valutare il rischio della tua azienda',
        body: "Prima di acquistare una polizza, FIM effettua una valutazione gratuita del profilo di rischio informatico della tua impresa. I fattori chiave sono: il tipo di dati trattati, le misure di sicurezza già in atto, il settore di attività e il grado di dipendenza dai sistemi IT. Il premio varia molto in base a questi elementi.",
      },
    ],
  },
  'novita-rc-auto-2024': {
    title: 'Novità RC Auto 2024: cosa cambia con il nuovo regolamento europeo',
    excerpt: "Il nuovo regolamento UE introduce importanti modifiche alla RC Auto. Ecco tutto quello che devi sapere.",
    category: 'Auto',
    date: '25 Ottobre 2024',
    readTime: '4 min',
    sections: [
      {
        heading: 'Il nuovo regolamento europeo 2021/2118',
        body: "Il Regolamento UE 2021/2118, recepito in Italia nel 2023, ha introdotto significative novità nel sistema della RC Auto. L'obiettivo è armonizzare la normativa in tutta l'Unione Europea e rafforzare la tutela delle vittime degli incidenti stradali.",
      },
      {
        heading: 'Le principali novità',
        body: 'Ecco i cambiamenti più rilevanti per gli assicurati italiani:',
        list: [
          'Estensione della copertura ai veicoli in aree private (cortili, parcheggi privati)',
          'Copertura obbligatoria per i veicoli elettrici e ibridi in ricarica',
          'Innalzamento dei massimali minimi a livello UE',
          'Maggiori tutele per le vittime in caso di insolvenza della compagnia',
          'Nuove regole sulla portabilità del certificato di assicurazione tra Stati membri',
        ],
      },
      {
        heading: 'Cosa fare alla prossima scadenza',
        body: "Alla scadenza della tua polizza RC Auto è il momento giusto per confrontare le offerte di mercato. Con le nuove normative alcune compagnie hanno rivisto le tariffe. FIM ti aiuta a verificare che la tua polizza rispetti i nuovi requisiti e che tu stia pagando il prezzo giusto.",
      },
    ],
  },
  'polizza-casa-alluvioni': {
    title: 'Polizza casa e rischio alluvioni: sei davvero coperto?',
    excerpt: "Con i cambiamenti climatici, le inondazioni sono sempre più frequenti. Verifica se la tua polizza casa ti protegge davvero.",
    category: 'Casa',
    date: '18 Ottobre 2024',
    readTime: '5 min',
    sections: [
      {
        heading: "L'emergenza climatica e il rischio allagamenti",
        body: "Negli ultimi anni l'Italia ha vissuto eventi alluvionali sempre più frequenti e intensi. Secondo ANIA, solo nel 2023 i danni da eventi atmosferici assicurati hanno superato 5 miliardi di euro. Eppure, secondo le stime, meno del 5% delle abitazioni italiane è coperto da polizze contro i rischi climatici.",
      },
      {
        heading: 'Cosa copre (e cosa non copre) la tua polizza casa',
        body: "La maggior parte delle polizze casa standard copre incendio, furto e RC del proprietario. I danni da acqua sono spesso inclusi solo parzialmente:",
        list: [
          'Danni da acqua condutture: generalmente coperti (rottura tubi, infiltrazioni)',
          'Alluvioni e inondazioni: spesso ESCLUSI o soggetti a franchigie elevate',
          'Grandine: coperta nelle polizze più complete, spesso con scoperto',
          'Frane e smottamenti: raramente inclusi nelle polizze base',
          'Neve e ghiaccio: copertura variabile a seconda della compagnia',
        ],
      },
      {
        heading: "La nuova legge sull'assicurazione catastrofale per le imprese",
        body: "Dal gennaio 2025, la legge italiana ha reso obbligatoria per le imprese la stipula di polizze contro i rischi catastrofali (alluvioni, terremoti, frane). Per le abitazioni private non è ancora obbligatoria, ma il governo sta valutando misure incentivanti.",
      },
      {
        heading: 'Come verificare la tua copertura',
        body: "FIM offre una revisione gratuita della tua polizza casa per verificare l'effettivo livello di copertura per i rischi climatici. In molti casi è possibile estendere la polizza esistente con garanzie aggiuntive per alluvioni e eventi atmosferici a costi contenuti.",
      },
    ],
  },
  'previdenza-complementare': {
    title: 'Previdenza complementare: come integrare la pensione pubblica',
    excerpt: "Il sistema pensionistico italiano non sarà sufficiente. Scopri come costruire una pensione integrativa efficace.",
    category: 'Vita',
    date: '10 Ottobre 2024',
    readTime: '8 min',
    sections: [
      {
        heading: 'Il problema della pensione pubblica italiana',
        body: "Con il sistema contributivo, chi inizia a lavorare oggi può aspettarsi una pensione pari al 55-65% dell'ultimo stipendio. Per i lavoratori autonomi e freelance la situazione è ancora più critica. Iniziare presto a costruire una pensione integrativa è essenziale per mantenere il tenore di vita in pensione.",
      },
      {
        heading: 'Gli strumenti della previdenza complementare',
        body: 'Il sistema italiano offre diverse forme di previdenza complementare:',
        list: [
          'Fondi pensione chiusi (negoziali): riservati a specifiche categorie di lavoratori, spesso con contributo del datore',
          'Fondi pensione aperti: accessibili a tutti, gestiti da banche e assicurazioni',
          'PIP (Piano Individuale Pensionistico): polizze vita previdenziali individuali',
          'Fondi pensione per lavoratori autonomi e liberi professionisti',
        ],
      },
      {
        heading: 'I vantaggi fiscali del secondo pilastro',
        body: "La previdenza complementare gode di un regime fiscale molto favorevole:",
        list: [
          'Contributi deducibili dal reddito imponibile fino a 5.164,57 euro/anno',
          'Rendimenti tassati all\'11% invece dell\'ordinario 26%',
          'Prestazione finale tassata al 15% (scende fino al 9% dopo 35 anni di adesione)',
          'In caso di morte, il capitale va agli eredi senza tasse di successione',
        ],
      },
      {
        heading: 'Il TFR: lasciarlo in azienda o versarlo nel fondo pensione?',
        body: "Per i lavoratori dipendenti, conferire il TFR (Trattamento di Fine Rapporto) a un fondo pensione è quasi sempre conveniente. Il TFR rivalutato in azienda perde valore in termini reali con l'inflazione, mentre investito in un fondo pensione può crescere significativamente nel lungo periodo.",
      },
      {
        heading: 'Quando iniziare',
        body: "Prima si inizia, meglio è. Grazie alla capitalizzazione composta, versare 100 euro al mese a 30 anni può valere molto di più di versarne 200 a 45 anni. FIM ti aiuta a costruire un piano previdenziale personalizzato in base alla tua età, reddito e obiettivi pensionistici.",
      },
    ],
  },
}

const categoryColors: Record<string, 'primary' | 'accent' | 'success' | 'warning'> = {
  Auto: 'primary',
  Vita: 'success',
  Aziendale: 'warning',
  Casa: 'accent',
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]
  if (!post) return { title: 'Articolo non trovato' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts[slug]

  const title = post?.title ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  const category = post?.category ?? 'Assicurazioni'
  const date = post?.date ?? 'Ottobre 2024'
  const readTime = post?.readTime ?? '5 min'

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
                  {Object.entries(blogPosts)
                    .filter(([s]) => s !== slug)
                    .slice(0, 4)
                    .map(([s, p]) => (
                      <Link key={s} href={`/blog/${s}`} className="block group">
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
