import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqAccordion from '@/components/ui/FaqAccordion'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Assicurazione per Professionisti — RC Professionale Obbligatoria',
  description:
    'RC Professionale per avvocati, commercialisti, ingegneri, consulenti e medici. Obbligatoria per legge, personalizzata per la tua categoria. Preventivo gratuito in 24 ore.',
  openGraph: {
    images: [{ url: '/api/og?title=Professionisti&tag=Soluzioni&sub=RC+Professionale+obbligatoria%2C+tutela+legale%2C+cyber+risk.+Personalizzata+per+la+tua+categoria.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Professionisti&tag=Soluzioni&sub=RC+Professionale+obbligatoria%2C+tutela+legale%2C+cyber+risk.+Personalizzata+per+la+tua+categoria.'],
  },
}

const coverages = [
  {
    icon: '⚖️',
    title: 'RC Professionale',
    desc: 'Copre i danni patrimoniali causati ai tuoi clienti per errori, omissioni o negligenze commesse nell\'esercizio della professione. Obbligatoria per la maggior parte delle categorie.',
    price: 'da 200€/anno',
  },
  {
    icon: '🛡️',
    title: 'Tutela Legale',
    desc: 'Copre le spese legali per difenderti da contestazioni ingiuste dei clienti. Fondamentale per professionisti esposti a contenziosi.',
    price: 'da 80€/anno',
  },
  {
    icon: '🔒',
    title: 'Cyber Risk e Data Breach',
    desc: 'Se gestisci dati sensibili (commercialisti, medici, avvocati), un data breach comporta sanzioni GDPR e danni reputazionali. La cyber risk copre sia i costi legali che quelli di ripristino.',
    price: 'da 150€/anno',
  },
  {
    icon: '👔',
    title: 'D&O per STP e Studi Associati',
    desc: 'Directors & Officers per studi strutturati come STP o associazioni professionali. Copre gli amministratori da richieste di risarcimento per decisioni gestionali.',
    price: 'su preventivo',
  },
  {
    icon: '🏥',
    title: 'Infortuni Professionali',
    desc: 'Copre infortuni avvenuti nell\'esercizio della professione: da una caduta in studio a un incidente in sopralluogo. Complementare all\'INAIL per autonomi.',
    price: 'da 100€/anno',
  },
  {
    icon: '💼',
    title: 'Perdita di Documenti',
    desc: 'Copre i costi di ricerca, ricostituzione o ripristino di documenti e archivi perduti o danneggiati. Particolarmente utile per studi legali e notarili.',
    price: 'inclusa in RC Prof.',
  },
]

const categories = [
  { name: 'Avvocati', icon: '⚖️', obligation: 'Obbligatoria ex art. 12 L. 247/2012' },
  { name: 'Commercialisti', icon: '📊', obligation: 'Obbligatoria D.Lgs 139/2005' },
  { name: 'Ingegneri e Architetti', icon: '🏗️', obligation: 'Obbligatoria D.P.R. 137/2012' },
  { name: 'Medici e Professionisti Sanitari', icon: '🏥', obligation: 'Obbligatoria L. 24/2017' },
  { name: 'Consulenti del Lavoro', icon: '👥', obligation: 'Obbligatoria L. 12/1979' },
  { name: 'Psicologi', icon: '🧠', obligation: 'Fortemente raccomandata' },
  { name: 'Geometri e Periti', icon: '📐', obligation: 'Obbligatoria D.P.R. 137/2012' },
  { name: 'Consulenti IT e Digital', icon: '💻', obligation: 'Raccomandata — alta esposizione cyber' },
]

const faqs = [
  {
    question: 'La RC professionale è obbligatoria per tutti i professionisti?',
    answer:
      'Per molte categorie sì: avvocati (L. 247/2012), ingegneri e architetti (D.P.R. 137/2012), medici e sanitari (L. 24/2017), commercialisti (D.Lgs. 139/2005). Anche per i liberi professionisti non soggetti a obbligo di legge, la RC professionale è fortemente raccomandata: una singola contestazione non coperta può azzzerare anni di lavoro.',
  },
  {
    question: 'Cosa succede concretamente se faccio un errore professionale?',
    answer:
      "Il cliente subisce un danno economico per colpa tua (es. un avvocato perde un'udienza per dimenticanza, un commercialista sbaglia una dichiarazione IVA). Il cliente ti chiede un risarcimento. La RC professionale copre: le spese legali per difenderti, l'eventuale risarcimento al cliente fino al massimale della polizza, e il costo peritale per valutare il danno.",
  },
  {
    question: 'Come si calcola il premio della RC professionale?',
    answer:
      "Il premio dipende da: categoria professionale, volume d'affari/fatturato annuo, massimale richiesto (in genere da 500.000€ a 3M€), storico sinistri, e eventuali attività specifiche ad alto rischio. FIM confronta le offerte delle principali compagnie per trovare il miglior rapporto qualità/prezzo per la tua situazione specifica.",
  },
  {
    question: 'Posso stipulare una sola polizza per tutto lo studio?',
    answer:
      "Sì, per studi associati, STP o studi con dipendenti/collaboratori è possibile stipulare una polizza di studio che copra tutti i professionisti. In genere è più economica rispetto a più polizze individuali e semplifica la gestione. Verifichiamo insieme la struttura più adatta al tuo studio.",
  },
  {
    question: 'La polizza copre anche errori commessi in passato?',
    answer:
      "Le RC professionali possono avere clausola 'claims made' (copertura per richieste ricevute durante la validità della polizza) o 'loss occurrence' (copertura per danni avvenuti durante la validità). La scelta influisce significativamente sulla continuità della protezione: ti spieghiamo la differenza e quale conviene nel tuo caso.",
  },
]


function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export default function ProfessionistiPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Professionisti', href: '/soluzioni/professionisti' },
        ]}
      />
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
        </div>
        <div className="container-custom relative">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/soluzioni" className="hover:text-white transition-colors">Soluzioni</Link>
            <span>/</span>
            <span className="text-white/80">Professionisti</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              <span className="w-2 h-2 bg-accent rounded-full" />
              Obbligatoria per legge per molte categorie
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              RC Professionale<br />
              <span className="text-accent">su misura</span> per la tua categoria
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Avvocato, commercialista, ingegnere, medico, consulente: un errore professionale può costarti anni di lavoro.
              FIM trova la polizza più adatta alla tua categoria e al tuo volume d&apos;affari — confrontando 30+ compagnie.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
                Preventivo RC Professionale
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="https://wa.me/393473312330?text=Ciao,%20cerco%20una%20RC%20professionale"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20c05c] text-white font-semibold text-lg px-8 py-4 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-custom">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Categorie che proteggiamo
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                <span>{cat.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-700">{cat.name}</div>
                  <div className="text-xs text-gray-500">{cat.obligation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverages */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Cosa copriamo
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Coperture per professionisti
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ogni categoria professionale ha esposizioni specifiche. Costruiamo il pacchetto giusto per la tua attività.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverages.map((cov) => (
              <Card key={cov.title} className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cov.icon}</span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {cov.price}
                  </span>
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">{cov.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{cov.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * I prezzi indicati sono puramente orientativi per professionisti con fatturato fino a 150.000€/anno e non costituiscono offerta contrattuale ai sensi del D.Lgs. 209/2005 (Codice delle Assicurazioni Private). Il premio effettivo è determinato dalla compagnia assicuratrice in base a categoria professionale, massimale scelto e storico sinistri. FIM Insurance Broker opera come intermediario assicurativo indipendente iscritto al RUI IVASS.
          </p>
        </div>
      </section>

      {/* Why FIM for professionals */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Il vantaggio FIM
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
                Perché affidarsi a FIM per la tua RC professionale
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: '📋',
                    title: 'Conosciamo la tua categoria',
                    desc: 'Ogni professione ha norme diverse. Ti guidiamo tra obblighi di legge, massimali minimi e clausole critiche senza che tu debba studiare il codice civile.',
                  },
                  {
                    icon: '🔍',
                    title: 'Confrontiamo 30+ compagnie per te',
                    desc: 'Non rappresentiamo una sola compagnia: confrontiamo AXA, Allianz, Generali, HDI e molte altre per trovare il miglior prezzo con la migliore copertura.',
                  },
                  {
                    icon: '⚡',
                    title: 'Preventivo in 24 ore',
                    desc: 'Compila il form con i tuoi dati: fatturato, categoria e massimale. Entro 24 ore lavorative hai un confronto di offerte personalizzato.',
                  },
                  {
                    icon: '🤝',
                    title: 'Ti seguiamo in caso di sinistro',
                    desc: "Un cliente ti contesta? Non affronti la situazione da solo. Il nostro ufficio sinistri ti supporta dalla denuncia alla liquidazione.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-black mb-6">Preventivo rapido in 3 minuti</h3>
              <div className="space-y-4 mb-8">
                {[
                  'Seleziona la tua categoria professionale',
                  'Indica il tuo fatturato annuo',
                  'Scegli il massimale desiderato',
                  'Ricevi il confronto offerte entro 24 ore',
                ].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-accent text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-white/90 text-sm">{step}</span>
                  </div>
                ))}
              </div>
              <Link href="/preventivo" className="btn-primary w-full text-center block text-lg py-4">
                Inizia il preventivo
              </Link>
              <p className="text-center text-white/60 text-xs mt-3">Gratuito, senza impegno, risposta in 24 ore</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-3">Domande frequenti</h2>
            <p className="text-gray-600">Risposte chiare alle domande più comuni sulla RC professionale.</p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Sei in regola con la tua RC professionale?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Verifica subito la tua copertura attuale o richiedi un preventivo. Risposta in 24 ore, consulenza gratuita.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
              Richiedi Preventivo
            </Link>
            <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
              📞 06 96883381
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
