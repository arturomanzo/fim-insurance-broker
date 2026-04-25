import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqAccordion from '@/components/ui/FaqAccordion'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

const SETTORE_QS = '?profilo=professionista&settore=RC+Professionale+Medico'

export const metadata: Metadata = {
  title: 'Assicurazione Medici — RC Sanitaria, Colpa Grave, Cyber Studio',
  description:
    'Polizze per medici, odontoiatri, strutture sanitarie e professionisti del settore salute. RC professionale Legge Gelli-Bianco, Colpa Grave SSN, tutela legale e cyber sanitario GDPR. Preventivo in 24 ore.',
  alternates: { canonical: '/soluzioni/settori/medico' },
  openGraph: {
    images: [{ url: '/api/og?title=Settore+Medico&tag=Soluzioni+per+settore&sub=RC+Sanitaria%2C+Colpa+Grave%2C+Cyber+Studio.', width: 1200, height: 630 }],
  },
  twitter: {
    images: ['/api/og?title=Settore+Medico&tag=Soluzioni+per+settore&sub=RC+Sanitaria%2C+Colpa+Grave%2C+Cyber+Studio.'],
  },
}

const painPoints = [
  { icon: '⚖️', title: 'Legge Gelli-Bianco', desc: 'La L. 24/2017 ha aumentato le tutele del paziente e i casi di responsabilità per il sanitario. La RC professionale è obbligatoria.' },
  { icon: '🏥', title: 'Rivalsa della struttura', desc: 'In caso di sinistro, l\'azienda sanitaria può rivalersi sul medico per colpa grave fino a 3 volte la retribuzione lorda annua.' },
  { icon: '💻', title: 'Dati clinici e GDPR', desc: 'I dati sanitari sono "categoria particolare" GDPR. Una violazione comporta sanzioni fino a 20M€ e obbligo di notifica entro 72 ore.' },
  { icon: '📃', title: 'Denunce strumentali', desc: 'Anche un esito clinico avverso senza colpa può generare richieste danni. Servono avvocati e periti specializzati sin da subito.' },
]

const coverages = [
  {
    icon: '⚕️',
    title: 'RC Professionale Sanitaria',
    desc: 'Copertura obbligatoria ex L. 24/2017 (Gelli-Bianco) per attività libero-professionale, intramoenia ed extramoenia. Massimali fino a 5M€, retroattività e ultrattività configurabili.',
    price: 'da 600€/anno',
    highlighted: true,
  },
  {
    icon: '🛡️',
    title: 'Colpa Grave Dipendenti SSN',
    desc: 'Per medici dipendenti del SSN o di strutture private convenzionate: copre la rivalsa dell\'azienda sanitaria per colpa grave (fino a 3 retribuzioni annue).',
    price: 'da 200€/anno',
    highlighted: false,
  },
  {
    icon: '⚖️',
    title: 'Tutela Legale Medica',
    desc: 'Spese di avvocato, perito di parte e consulente medico-legale per procedimenti penali (lesioni colpose, omicidio colposo) e disciplinari (Ordine dei Medici).',
    price: 'da 250€/anno',
    highlighted: false,
  },
  {
    icon: '🔒',
    title: 'Cyber Sanitario & GDPR',
    desc: 'Ransomware sulle cartelle cliniche, furto dati pazienti, sanzioni Garante Privacy. Copre costi di ripristino, notifica obbligatoria, spese legali e indennizzi.',
    price: 'da 400€/anno',
    highlighted: false,
  },
  {
    icon: '🏢',
    title: 'Studio Professionale & Strumenti',
    desc: 'Incendio, furto e all-risk su locali e apparecchiature mediche (ecografi, riuniti odontoiatrici, autoclavi). Copertura anche per perdita di profitto da fermo studio.',
    price: 'da 350€/anno',
    highlighted: false,
  },
  {
    icon: '🩹',
    title: 'Infortuni Professionali',
    desc: 'Punture accidentali, contaminazione biologica, incidenti durante guardia o reperibilità. Diaria da inabilità e capitali per invalidità permanente.',
    price: 'da 180€/anno',
    highlighted: false,
  },
]

const faqs = [
  {
    question: 'La RC professionale medica è davvero obbligatoria?',
    answer:
      'Sì. La L. 24/2017 (Gelli-Bianco) ha reso obbligatoria la copertura assicurativa per tutti gli esercenti professioni sanitarie, sia nell\'attività libero-professionale sia in quella in regime di dipendenza (con polizza per colpa grave). L\'obbligo è ribadito dal D.M. 232/2023 che ha definito i requisiti minimi delle polizze (massimali, retroattività, ultrattività). Esercitare senza copertura espone a sanzioni disciplinari, rischio penale per l\'esercizio dell\'attività e responsabilità patrimoniale illimitata.',
  },
  {
    question: 'Cosa cambia tra RC libero-professionale e Colpa Grave per dipendenti SSN?',
    answer:
      'La RC libero-professionale copre l\'attività privata del medico (studio, intramoenia, consulenze) e risponde direttamente al paziente per qualsiasi grado di colpa. La Colpa Grave per dipendenti SSN o strutture private convenzionate copre invece la rivalsa che la struttura può esercitare sul medico in caso di colpa grave: la struttura risarcisce il paziente, poi può chiedere al medico fino a 3 volte la retribuzione lorda annua. Sono due polizze distinte e spesso necessarie entrambe per chi svolge attività mista.',
  },
  {
    question: 'Quale massimale scegliere per la RC sanitaria?',
    answer:
      'Il D.M. 232/2023 ha fissato massimali minimi diversi per specialità: 1M€ per professioni a basso rischio (es. nutrizionista), fino a 4-5M€ per chirurgie ad alta complessità (ortopedia, chirurgia generale, ginecologia ostetricia). FIM analizza la tua specialità, il volume di prestazioni e la storia sinistri per consigliare il massimale adeguato — ricordando che in caso di danno grave a un paziente giovane le richieste possono superare i 2-3M€.',
  },
  {
    question: 'Sono uno studio dentistico con 3 dipendenti: cosa mi serve davvero?',
    answer:
      'Per uno studio odontoiatrico tipo il pacchetto consigliato è: RC professionale del titolare (e degli altri odontoiatri/igienisti), RC del datore di lavoro per i dipendenti, polizza incendio/furto su locali e riuniti (riuniti, OPT, scanner intraorali sono spesso il bene di valore principale), cyber sanitario per gestione cartelle e fatturazione elettronica, infortuni integrativa per i dipendenti. Il pacchetto base completo per uno studio standard si colloca tipicamente tra 1.500€ e 3.000€/anno.',
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

export default function MedicoPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Soluzioni', href: '/soluzioni' },
          { name: 'Settori', href: '/soluzioni' },
          { name: 'Medico', href: '/soluzioni/settori/medico' },
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
            <span className="text-white/80">Settore Medico</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              ⚕️ Medici, odontoiatri e strutture sanitarie
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Per chi cura,<br />
              una <span className="text-accent">protezione completa</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              RC sanitaria Legge Gelli-Bianco, Colpa Grave per dipendenti SSN, tutela legale, cyber GDPR
              e copertura dello studio: FIM costruisce il pacchetto su misura per la tua specialità,
              con compagnie specializzate nel rischio sanitario.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 max-w-2xl">
              <p className="text-white/90 text-sm">
                <strong className="text-accent">Sapevi che</strong> — il D.M. 232/2023 ha definito massimali minimi obbligatori per la RC sanitaria, da 1M€ fino a 4-5M€ per le chirurgie.
                Polizze sottodimensionate non rispettano l&apos;obbligo di legge e lasciano scoperte le richieste danni più gravi.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href={`/preventivo${SETTORE_QS}`} className="btn-primary text-lg px-8 py-4">
                Preventivo per la mia specialità
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="tel:+390696883381" className="btn-outline-white text-lg px-8 py-4">
                📞 06 96883381
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-50 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              I rischi del settore
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Cosa espone davvero un sanitario
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quattro aree dove la responsabilità professionale può tradursi in conseguenze patrimoniali, penali e reputazionali.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {painPoints.map((p) => (
              <Card key={p.title} className="border-l-4 border-l-red-400">
                <span className="text-3xl mb-3 block">{p.icon}</span>
                <h3 className="font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverages */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Coperture chiave
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Le polizze su misura per il sanitario
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sei coperture pensate per medici libero-professionisti, dipendenti SSN, odontoiatri e strutture sanitarie.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coverages.map((cov) => (
              <Card key={cov.title} className={`flex flex-col ${cov.highlighted ? 'border-2 border-accent' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cov.icon}</span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                    {cov.price}
                  </span>
                </div>
                <h3 className="font-bold text-primary mb-2">
                  {cov.title}
                  {cov.highlighted && <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded-full align-middle">Obbligatoria</span>}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{cov.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * I prezzi indicati sono puramente orientativi e non costituiscono offerta contrattuale ai sensi del D.Lgs. 209/2005 (Codice delle Assicurazioni Private). Il premio effettivo dipende da specialità, volume prestazioni, massimale, sinistrosità pregressa. FIM Insurance Broker opera come intermediario assicurativo indipendente iscritto al RUI IVASS.
          </p>
        </div>
      </section>

      {/* Case study */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              Caso reale
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
              Denuncia per malpractice: 4 anni di procedimento, paziente assistito sin dal primo giorno
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Un chirurgo ortopedico cliente FIM riceve una richiesta danni dal paziente operato 18 mesi prima per
                  una protesi d&apos;anca, con esiti funzionali ritenuti insoddisfacenti. Richiesta iniziale: <strong className="text-primary">450.000€</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Senza polizza RC sanitaria adeguata, il medico avrebbe dovuto pagare di tasca propria avvocati,
                  consulenti medico-legali, perito di parte e — in caso di soccombenza — l&apos;intero risarcimento.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Grazie alla RC professionale FIM con massimale 3M€ e tutela legale inclusa:
                </p>
                <ul className="text-gray-700 leading-relaxed">
                  <li>denuncia di sinistro alla compagnia in 48 ore;</li>
                  <li>nominato consulente medico-legale di parte specializzato in ortopedia;</li>
                  <li>CTU disposta dal Tribunale, sostenuta dalla compagnia;</li>
                  <li>transazione a 4 anni dalla denuncia per importo &lt;10% della richiesta originale.</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Risparmio per il medico
                </p>
                <p className="text-5xl font-black text-accent mb-2">~400k€</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  tra spese legali, perizie e differenza richiesta vs. transazione.
                </p>
                <div className="border-t border-white/10 my-5"></div>
                <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-3">
                  Out-of-pocket
                </p>
                <p className="text-3xl font-black text-accent mb-1">0€</p>
                <p className="text-white/70 text-xs">tutti i costi a carico della compagnia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-3">Domande frequenti — Settore Medico</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            La tua RC sanitaria è davvero a norma?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Verifica gratuita massimali, retroattività, ultrattività e clausole della tua polizza attuale rispetto al D.M. 232/2023.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/preventivo${SETTORE_QS}`} className="btn-primary text-lg px-8 py-4">
              Richiedi preventivo Sanitario
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
