import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '../page';

interface Props {
  params: { slug: string };
}

const blogContent: Record<string, string> = {
  'guida-rca-2024': `
## Cos'è l'assicurazione RCA?

L'assicurazione per la Responsabilità Civile Auto (RCA) è obbligatoria per legge in Italia per tutti i veicoli a motore che circolano su suolo pubblico. La normativa di riferimento è il Codice delle Assicurazioni Private (D.Lgs. 209/2005).

Essa copre i danni causati a terzi (persone e cose) a seguito di un incidente stradale in cui sei responsabile. Senza di essa non è possibile circolare legalmente: le sanzioni previste includono il ritiro del veicolo e sanzioni pecuniarie significative.

## Cosa copre la RCA?

La RCA copre:

- **Danni a persone**: lesioni fisiche, invalidità temporanea o permanente, decesso di terzi coinvolti nell'incidente
- **Danni a cose**: danni ai veicoli altrui, a proprietà private, a infrastrutture pubbliche

Non copre invece i danni al proprio veicolo né le lesioni del conducente responsabile: per questo esistono le garanzie accessorie.

## Le garanzie accessorie più utili

Una polizza auto completa può includere:

**Kasko**: rimborso dei danni al proprio veicolo indipendentemente dalla responsabilità. È la copertura più completa e anche la più costosa.

**Mini Kasko (Collisione)**: copre i danni al proprio mezzo solo in caso di collisione con altro veicolo identificato.

**Furto e Incendio**: tutela in caso di furto totale o parziale del veicolo e in caso di incendio.

**Cristalli**: rimborso per la sostituzione o riparazione di parabrezza, lunotto e finestrini laterali.

**Assistenza stradale**: soccorso h24 in caso di guasto o incidente, rimpatrio del veicolo, auto sostitutiva.

**Infortuni conducente**: risarcimento per le lesioni subite dal conducente responsabile dell'incidente.

**Tutela legale**: assistenza legale in caso di controversie derivanti da sinistri stradali.

## Come risparmiare sulla RCA senza rinunciare alla copertura

Come broker indipendente, FIM Insurance Broker analizza le offerte di più compagnie per trovare la soluzione più conveniente per il tuo profilo. Ecco alcuni consigli:

1. **Confronta più compagnie**: i prezzi variano significativamente. Un broker lavora su questo per te.
2. **Valuta la franchigia**: accettare una franchigia più alta può ridurre il premio annuale.
3. **Bonus/Malus**: mantieni un buon storico di guida per accedere alle classi più economiche.
4. **Scatola nera (black box)**: per alcuni profili (giovani conducenti) può abbattere il costo.
5. **Pagamento annuale**: il pagamento in un'unica soluzione è generalmente più economico.

## Conclusione

La RCA è molto più di un obbligo legale: è la base della tua protezione su strada. Sceglierla bene, con le garanzie giuste, fa la differenza. Contatta FIM Insurance Broker per un preventivo personalizzato e senza impegno.
  `,
  'polizza-vita-perche-serve': `
## L'importanza della polizza vita in Italia

In Italia la cultura assicurativa vita è ancora poco diffusa rispetto ad altri Paesi europei. Eppure, una polizza vita è uno degli strumenti più efficaci per proteggere la propria famiglia da eventi avversi e pianificare il futuro finanziario.

## Cosa si intende per polizza vita?

Con "polizza vita" si intende una categoria ampia di contratti assicurativi che hanno come oggetto la vita umana. Possiamo distinguere principalmente:

**Temporanee caso morte (TCM)**

La forma più pura di protezione: in caso di decesso dell'assicurato entro il periodo contrattuale, la compagnia eroga il capitale ai beneficiari designati. È lo strumento ideale per garantire continuità economica alla famiglia in caso di prematura scomparsa del capofamiglia.

**Polizze vita rivalutabili (Ramo I)**

Combinano protezione e risparmio. Il capitale cresce nel tempo grazie alla gestione separata (investimenti a basso rischio) e viene garantito alla scadenza o al decesso. Sono considerate un porto sicuro per il risparmio a lungo termine.

**Unit Linked (Ramo III)**

Il capitale è investito in fondi comuni. Il rendimento è legato ai mercati finanziari, quindi potenzialmente più alto ma con maggiore rischio. Adatte a chi vuole un potenziale di crescita maggiore con orizzonte temporale lungo.

**Piani pensione e LTC**

Soluzioni per integrare la pensione pubblica o garantirsi assistenza in caso di perdita di autosufficienza (Long Term Care).

## Quando conviene stipulare una polizza vita?

La risposta più corretta è: prima possibile. I premi sono più bassi in giovane età perché il rischio è minore. Alcune situazioni in cui una polizza vita è particolarmente consigliata:

- Acquisto della prima casa con mutuo
- Nascita di figli
- Avvio di un'attività imprenditoriale
- Avvicinamento alla pensione

## Come scegliere la polizza giusta?

La scelta dipende da molti fattori: età, stato di salute, situazione familiare, obiettivi finanziari, propensione al rischio. Un broker assicurativo indipendente come FIM analizza il tuo profilo completo per guidarti verso la soluzione più adeguata.

Ricorda che i rendimenti passati non garantiscono quelli futuri e che ogni polizza va valutata nella sua interezza, incluse le clausole di esclusione e le condizioni di recesso.
  `,
  'rc-professionale-obbligatoria': `
## Cos'è la RC Professionale?

La Responsabilità Civile Professionale (RCP) è una polizza assicurativa che tutela il professionista nel caso in cui, nell'esercizio della propria attività, causi un danno economico a un cliente o a un terzo per effetto di un errore, un'omissione o una negligenza professionale.

## Per chi è obbligatoria?

In Italia, la RCP è obbligatoria per diverse categorie professionali, in base a normative specifiche:

**Professioni sanitarie**: medici, odontoiatri, infermieri, fisioterapisti e tutte le professioni sanitarie sono obbligati per legge (L. 24/2017 Gelli-Bianco) a stipulare una polizza RC medica.

**Avvocati**: obbligatoria dal 2015 (D.M. 22 settembre 2016) con un massimale minimo di 500.000 euro per sinistro.

**Ingegneri, architetti, geometri**: obbligatoria ai sensi del D.P.R. 137/2012 per tutti gli iscritti agli albi professionali.

**Commercialisti e consulenti del lavoro**: obbligatoria per legge con massimali minimi definiti dagli ordini professionali.

**Agenti immobiliari**: obbligatoria per l'iscrizione al registro degli agenti immobiliari.

## Cosa copre?

Una polizza RCP standard copre:

- Errori e omissioni nell'esercizio dell'attività professionale
- Negligenza, imperizia, imprudenza
- Violazione della riservatezza professionale
- Perdita o distruzione di documenti affidati dai clienti
- Spese legali per la difesa in giudizio
- Rivalse di enti previdenziali e assicurativi

## Come si valuta una polizza RCP?

I parametri principali da considerare sono:

**Massimale**: il limite massimo di indennizzo per sinistro e per anno. Deve essere adeguato al volume d'affari e al tipo di attività svolta.

**Franchigia**: la quota di danno che rimane a carico del professionista. Franchigie più alte abbassano il premio ma espongono maggiormente.

**Retroattività**: molte polizze coprono anche sinistri derivanti da attività svolta prima della stipula. Verificare questo aspetto è fondamentale.

**Estensione geografica**: rilevante per i professionisti che operano a livello europeo o internazionale.

## FIM e la RCP specializzata

FIM Insurance Broker, in collaborazione con DUAL/Arch, offre soluzioni RCP dedicate a diverse categorie professionali, con massimali adeguati e condizioni competitive. Contattaci per un'analisi del tuo profilo e un preventivo su misura.
  `,
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Articolo non trovato' };

  return {
    title: post.titolo,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="text-2xl font-bold text-fim-primary mt-10 mb-4"
        >
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <h3 key={key++} className="text-lg font-bold text-fim-primary mt-6 mb-2">
          {line.replace(/\*\*/g, '')}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-gray-700 leading-relaxed ml-4 list-disc">
          {line.replace('- ', '')}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-gray-700 leading-relaxed mb-3">
          {line}
        </p>
      );
    }
  }

  return elements;
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const content = blogContent[params.slug] || '';
  const altriPost = blogPosts.filter((p) => p.slug !== params.slug);

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-fim-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            Tutti gli articoli
          </Link>

          <div className="mb-4">
            <span className="text-xs bg-fim-accent/20 border border-fim-accent/30 text-fim-accent px-3 py-1 rounded-full font-semibold">
              {post.categoria}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {post.titolo}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm">
            <span className="flex items-center gap-1.5">
              <User size={15} />
              {post.autore}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              {new Date(post.data).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {post.lettura} di lettura
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article content */}
          <article className="lg:col-span-2">
            <p className="text-lg text-gray-600 mb-8 leading-relaxed border-l-4 border-fim-accent pl-5 italic">
              {post.excerpt}
            </p>

            <div className="prose max-w-none">{renderContent(content)}</div>

            <div className="mt-10 p-6 bg-fim-primary/5 border border-fim-primary/10 rounded-2xl">
              <p className="text-sm text-gray-600 italic">
                <strong className="text-fim-primary">Disclaimer:</strong> Le informazioni
                contenute in questo articolo hanno carattere puramente informativo e non
                costituiscono consulenza assicurativa vincolante. Per una proposta
                personalizzata contatta un broker FIM.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-fim-primary rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Hai bisogno di un preventivo?</h3>
              <p className="text-blue-100 text-sm mb-5">
                I nostri broker sono pronti ad aiutarti con una proposta personalizzata.
              </p>
              <Link
                href="/preventivo"
                className="block text-center bg-fim-accent hover:bg-yellow-500 text-fim-primary font-bold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Richiedi Preventivo
              </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-fim-primary text-lg mb-4">
                Altri articoli
              </h3>
              <div className="space-y-4">
                {altriPost.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block hover:bg-gray-50 rounded-lg p-3 transition-colors group"
                  >
                    <div className="text-xs text-fim-accent font-semibold mb-1">
                      {p.categoria}
                    </div>
                    <div className="text-sm font-medium text-gray-700 group-hover:text-fim-primary transition-colors leading-snug">
                      {p.titolo}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
