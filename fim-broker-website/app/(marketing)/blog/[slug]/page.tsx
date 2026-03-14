import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ArrowRight } from 'lucide-react';

const posts: Record<string, { titolo: string; data: string; categoria: string; contenuto: string; lettura: string }> = {
  'cosa-e-un-broker-assicurativo': {
    titolo: "Cos'è un broker assicurativo e perché conviene affidarsi a lui",
    data: '15 Marzo 2025',
    categoria: 'Guida',
    lettura: '5 min',
    contenuto: `Un broker assicurativo è un intermediario professionale iscritto al Registro Unico degli Intermediari Assicurativi (RUI), che opera nell'esclusivo interesse del cliente.

A differenza dell'agente assicurativo, che rappresenta una singola compagnia, il broker è indipendente e può confrontare le offerte di più compagnie per trovare la soluzione migliore in termini di copertura e prezzo.

**Cosa fa il broker per te**

Il broker analizza il tuo profilo di rischio, individua le coperture necessarie, confronta le proposte delle compagnie partner e ti accompagna per tutta la durata del contratto, inclusa la gestione dei sinistri.

**Perché conviene**

Affidarsi a un broker significa avere un consulente dalla propria parte. Il broker lavora per ottimizzare la tua spesa assicurativa, eliminare le coperture superflue e garantire che tu non sia mai scoperto in caso di sinistro.

**FIM Insurance Broker**

Con oltre 30 anni di esperienza e l'iscrizione al RUI Sez. B n. B000405449, FIM Insurance Broker è il tuo punto di riferimento per la gestione del rischio assicurativo. Contattaci per una consulenza gratuita.`,
  },
  'rc-auto-obbligatoria': {
    titolo: "RC Auto: tutto quello che devi sapere sull'assicurazione obbligatoria",
    data: '8 Marzo 2025',
    categoria: 'RC Auto',
    lettura: '7 min',
    contenuto: `La Responsabilità Civile Auto (RCA) è l'assicurazione obbligatoria per tutti i veicoli a motore che circolano su suolo pubblico in Italia. La mancanza di copertura è sanzionata con una multa da 868 a 3.471 euro.

**Cosa copre la RCA**

La polizza RCA copre i danni che potresti causare a terzi (persone e cose) con il tuo veicolo. Non copre i danni al tuo veicolo, né le tue lesioni in qualità di conducente.

**Come risparmiare senza rinunciare alla protezione**

Per risparmiare sulla RCA mantenendo una copertura adeguata:
- Confronta le offerte di più compagnie tramite un broker indipendente
- Valuta le garanzie accessorie in base al reale utilizzo del veicolo
- Considera la classe di merito e la scatola nera
- Verifica i massimali: quelli minimi per legge potrebbero non bastare

**Garanzie aggiuntive**

Oltre alla RCA obbligatoria, valuta:
- Kasko e mini kasko per danni al tuo veicolo
- Furto e incendio
- Assistenza stradale 24/7
- Tutela legale automobilistica
- Infortuni del conducente

Contatta FIM Insurance Broker per un confronto gratuito tra le migliori offerte del mercato.`,
  },
  'polizza-vita-quando-serve': {
    titolo: 'Polizza vita: quando serve davvero e quale scegliere',
    data: '1 Marzo 2025',
    categoria: 'Vita',
    lettura: '6 min',
    contenuto: `La polizza vita è uno strumento fondamentale per garantire la sicurezza economica della famiglia in caso di eventi imprevisti. Ma quando è davvero necessaria e quale tipo scegliere?

**Chi ha bisogno di una polizza vita**

La polizza vita è particolarmente importante se:
- Hai un mutuo o dei debiti significativi
- Hai persone a carico (coniuge, figli, genitori anziani)
- Sei un lavoratore autonomo senza previdenza integrativa
- Vuoi lasciare un'eredità ai tuoi cari

**I principali tipi di polizza vita**

Temporanea caso morte (TCM): paga un capitale ai beneficiari se muori entro la durata contrattuale. È la forma più semplice e più economica.

Polizze rivalutabili (Ramo I): combinano protezione e investimento in gestioni separate con rendimento garantito.

Unit linked (Ramo III): combinano protezione e investimento in fondi, con maggiore potenziale di rendimento ma anche maggiore rischio.

**Come scegliere**

La scelta dipende dal tuo obiettivo: pura protezione o anche investimento. Un broker assicurativo può aiutarti a valutare la soluzione più adeguata alla tua situazione.

FIM Insurance Broker collabora con le principali compagnie vita per offrirti soluzioni personalizzate.`,
  },
  'cyber-risk-pmi': {
    titolo: 'Cyber risk: perché anche le PMI devono assicurarsi contro gli attacchi informatici',
    data: '22 Febbraio 2025',
    categoria: 'Aziende',
    lettura: '8 min',
    contenuto: `Gli attacchi informatici sono diventati una delle principali minacce per le imprese di ogni dimensione. Le PMI sono spesso più vulnerabili delle grandi aziende perché dispongono di meno risorse per la sicurezza informatica.

**Il rischio cyber per le PMI**

Secondo i dati più recenti, oltre il 40% delle PMI italiane ha subito almeno un attacco informatico negli ultimi 12 mesi. Le conseguenze possono essere devastanti: blocco delle attività, perdita di dati sensibili, sanzioni GDPR, danni reputazionali.

**Cosa copre una polizza cyber risk**

Le polizze cyber risk proteggono l'azienda da:
- Danni diretti da attacco informatico (ransomware, data breach)
- Costi di ripristino dei sistemi e dei dati
- Responsabilità verso terzi per violazione dei dati
- Sanzioni amministrative (incluse quelle GDPR)
- Perdita di profitti durante il blocco operativo
- Costi di gestione della crisi e comunicazione

**Come valutare il rischio**

Il primo passo è un'analisi del rischio cyber specifico per la tua impresa. FIM Insurance Broker, in collaborazione con DUAL/Arch, può aiutarti a quantificare l'esposizione e a trovare la copertura cyber più adeguata.

Contattaci per una consulenza gratuita sulla gestione del rischio informatico.`,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts[params.slug];
  if (!post) return {};
  return { title: post.titolo };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) notFound();

  return (
    <article>
      <section className="bg-gradient-to-br from-fim-primary to-fim-light py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-6 transition-colors">
            <ChevronLeft size={16} /> Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 bg-fim-accent text-fim-primary rounded-full">{post.categoria}</span>
            <span className="text-blue-200 text-sm">{post.lettura} di lettura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{post.titolo}</h1>
          <p className="text-blue-300 text-sm">{post.data}</p>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
            {post.contenuto.replace(/\*\*(.*?)\*\*/g, (_, t) => t).split('\n\n').map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>

          <div className="mt-12 bg-fim-primary rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Vuoi saperne di più?</h2>
            <p className="text-blue-200 mb-6">Parla con un nostro broker o usa FIMA per una risposta immediata.</p>
            <Link href="/preventivo" className="inline-flex items-center gap-2 px-7 py-3.5 bg-fim-accent text-fim-primary font-bold rounded-xl hover:bg-yellow-400 transition-colors">
              Richiedi consulenza gratuita <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
