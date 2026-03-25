import type { Metadata } from 'next'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import FaqAccordion from '@/components/ui/FaqAccordion'
import LeadMagnet from '@/components/home/LeadMagnet'

export const metadata: Metadata = {
  title: 'Assicurazioni per Famiglie e Privati — Casa, Vita, Salute | FIM',
  description:
    'Polizze assicurative per famiglie e privati: casa, vita, infortuni, salute integrativa, tutela legale e viaggi. FIM Insurance Broker: consulenza gratuita a Roma e nel Lazio.',
}

const coverages = [
  {
    icon: '🏠',
    title: 'Casa e Abitazione',
    desc: 'Copre l\'abitazione da incendio, furto, allagamento, danni da eventi atmosferici e guasti agli impianti. Include la RC capofamiglia: i danni causati a terzi da te, dai tuoi familiari o dai tuoi animali domestici.',
    price: 'da 150€/anno',
    mandatory: false,
  },
  {
    icon: '❤️',
    title: 'Assicurazione Vita (TCM)',
    desc: 'La polizza temporanea caso morte garantisce un capitale ai tuoi familiari se dovesse succederti qualcosa. Essenziale se hai un mutuo, figli a carico o un coniuge non autonomo economicamente.',
    price: 'da 100€/anno',
    mandatory: false,
  },
  {
    icon: '🏥',
    title: 'Salute Integrativa',
    desc: 'Copre le spese mediche non rimborsate dal SSN: visite specialistiche, esami diagnostici, interventi chirurgici in cliniche private e degenza ospedaliera. Riduce i tempi di attesa e sceglie il medico.',
    price: 'da 250€/anno',
    mandatory: false,
  },
  {
    icon: '🦺',
    title: 'Infortuni Privati',
    desc: 'Ti protegge 24 ore su 24, anche fuori dal lavoro e nello sport amatoriale: invalidità permanente, diaria da ricovero e rimborso spese mediche per infortuni avvenuti nel tempo libero.',
    price: 'da 80€/anno',
    mandatory: false,
  },
  {
    icon: '⚖️',
    title: 'Tutela Legale',
    desc: 'Copre le spese legali per controversie in ambito stradale, condominiale, lavorativo e dei consumatori. Avere un avvocato dalla propria parte senza costi aggiuntivi cambia la prospettiva in molte dispute.',
    price: 'da 60€/anno',
    mandatory: false,
  },
  {
    icon: '👴',
    title: 'Long Term Care (LTC)',
    desc: 'Eroga una rendita mensile se dovessi diventare non autosufficiente per malattia, infortunio o demenza senile. Tutela il patrimonio familiare dai costi elevatissimi dell\'assistenza continuativa.',
    price: 'da 200€/anno',
    mandatory: false,
  },
  {
    icon: '✈️',
    title: 'Viaggi e Vacanze',
    desc: 'Copre spese mediche all\'estero, rimpatrio, bagaglio smarrito, cancellazione del viaggio e assistenza H24. Indispensabile per chi viaggia fuori dall\'UE o pratica sport in montagna.',
    price: 'da 30€/viaggio',
    mandatory: false,
  },
  {
    icon: '🐾',
    title: 'Animali Domestici',
    desc: 'RC per danni causati dal tuo cane o gatto a terzi, più copertura per spese veterinarie in caso di malattia o infortunio. Per molte razze la RC è raccomandata anche contrattualmente da condomini e affittacamere.',
    price: 'da 50€/anno',
    mandatory: false,
  },
]

const profiles = [
  { name: 'Giovani coppie', icon: '💑' },
  { name: 'Famiglie con figli', icon: '👨‍👩‍👧' },
  { name: 'Proprietari di casa', icon: '🏠' },
  { name: 'Affittuari', icon: '🔑' },
  { name: 'Over 60', icon: '👴' },
  { name: 'Single', icon: '🧑' },
  { name: 'Sportivi amatoriali', icon: '🏃' },
  { name: 'Viaggiatori frequenti', icon: '✈️' },
  { name: 'Proprietari di animali', icon: '🐕' },
]

const faqs = [
  {
    question: "La polizza casa è obbligatoria?",
    answer:
      "Non per legge, ma di fatto spesso sì: la maggior parte dei mutui richiede almeno una polizza incendio e scoppio sull'immobile come condizione per l'erogazione. La RC capofamiglia, inclusa nella polizza casa, è invece altamente raccomandata: copre danni causati a terzi da te, dai tuoi figli, dai domestici e dagli animali domestici. I costi di un risarcimento senza copertura possono essere devastanti.",
  },
  {
    question: "Ho già il Servizio Sanitario Nazionale: perché fare anche la salute integrativa?",
    answer:
      "Il SSN garantisce le cure essenziali, ma con tempi di attesa spesso lunghi (mesi per una risonanza o una visita specialistica) e senza la possibilità di scegliere il medico. La polizza sanitaria integrativa ti permette di accedere a strutture private, scegliere il chirurgo, ed ottenere rimborsi per visite ed esami. In Italia il 70% delle spese sanitarie annue sono out-of-pocket: una polizza salute spesso si ripaga in pochi anni.",
  },
  {
    question: "Quanto costa un'assicurazione vita e quando serve davvero?",
    answer:
      "Una polizza temporanea caso morte (TCM) per un 35enne non fumatore in buona salute parte da circa 100-150€/anno per un capitale assicurato di 100.000€. Serve soprattutto se hai persone economicamente dipendenti da te (figli, coniuge non lavorante), un mutuo in corso, o debiti che ricadrebbero sui tuoi familiari. È uno dei prodotti con il miglior rapporto protezione/costo del mercato assicurativo.",
  },
  {
    question: "Cosa copre esattamente la polizza casa e cosa non copre?",
    answer:
      "Una polizza casa standard copre: incendio e scoppio, furto e rapina in abitazione, allagamento da impianti interni, danni da eventi atmosferici (grandine, vento), RC capofamiglia. Non copre solitamente: danni da alluvione o terremoto (richiedono copertura catastrofale separata), usura normale, danni dolosi. Le polizze più complete includono anche guasti agli impianti, rottura lastre e assistenza domiciliare urgente.",
  },
  {
    question: "Come funziona la Long Term Care (LTC) e a chi serve?",
    answer:
      "La LTC eroga una rendita mensile (es. 1.000-2.000€/mese) se il titolare diventa non autosufficiente, ovvero non riesce autonomamente a svolgere almeno 3 delle 6 attività quotidiane di base (lavarsi, vestirsi, mangiare, spostarsi, continuenza, andare in bagno). I costi di una badante o di una RSA in Italia partono da 1.500-2.500€/mese. Stipulare la LTC prima dei 55-60 anni garantisce premi contenuti e una copertura duratura.",
  },
]

export default function FamigliePage() {
  return (
    <div>
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
            <span className="text-white/80">Famiglie e Privati</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              🏠 Soluzioni per privati e famiglie
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Proteggi ciò che{' '}
              <span className="text-accent">conta davvero</span>
              <br />
              per la tua famiglia
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Casa, salute, vita: le polizze giuste per ogni fase della vita.
              FIM analizza la tua situazione familiare e seleziona le coperture davvero necessarie,
              senza sovrassicrurarti e senza lasciare gap pericolosi.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 max-w-2xl">
              <p className="text-white/90 text-sm">
                <strong className="text-accent">Sapevi che</strong> — il 68% delle famiglie italiane è sottoassicurata.
                La polizza media copre meno del 40% del valore reale dell&apos;abitazione.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/preventivo" className="btn-primary text-lg px-8 py-4">
                Preventivo per la mia famiglia
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

      {/* Profiles */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container-custom">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Profili che assistiamo
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {profiles.map((p) => (
              <div key={p.name} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700">
                <span>{p.icon}</span>
                {p.name}
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
              Coperture disponibili
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">
              Tutto ciò che puoi proteggere
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Non devi sottoscrivere tutto: costruiamo insieme la copertura più adatta alla tua situazione e al tuo budget.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coverages.map((cov) => (
              <Card key={cov.title} className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cov.icon}</span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                    {cov.price}
                  </span>
                </div>
                <h3 className="font-bold text-primary mb-2">{cov.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{cov.desc}</p>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * I prezzi indicati sono orientativi. Il premio effettivo dipende dall&apos;età, dai valori assicurati e dal profilo di rischio.
          </p>
        </div>
      </section>

      {/* Process + Package */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
                Il nostro approccio
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
                La polizza giusta è quella<br />che ti serve, non quella<br />che costa meno.
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Molte famiglie pagano polizze che si sovrappongono o che hanno massimali insufficienti.
                FIM fa una mappatura delle coperture già in essere e identifica i gap reali prima di proporre qualsiasi soluzione.
              </p>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Mappatura della situazione', desc: 'Analizziamo casa, reddito, composizione del nucleo familiare, esposizioni reali e coperture già attive.' },
                  { step: '02', title: 'Identificazione dei gap', desc: 'Individuiamo cosa non è coperto e cosa lo è doppiamente — liberando budget per ciò che conta.' },
                  { step: '03', title: 'Selezione mirata', desc: 'Confrontiamo le offerte di 30+ compagnie e proponiamo solo le coperture che fanno la differenza.' },
                  { step: '04', title: 'Revisione annuale', desc: 'La vita cambia: figlio nato, casa acquistata, pensione in arrivo. Le polizze devono evolvere con te.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-bold text-primary mb-0.5">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-black text-primary mb-2">Pacchetto famiglia consigliato</h3>
              <p className="text-gray-500 text-sm mb-6">Per una famiglia di 3-4 persone, proprietaria di casa con mutuo</p>
              <div className="space-y-3 mb-6">
                {[
                  { name: 'Polizza casa (incendio + furto + RC)', price: '250€/anno' },
                  { name: 'Vita TCM (capitale mutuo residuo)', price: '150€/anno' },
                  { name: 'Infortuni privati (entrambi i coniugi)', price: '160€/anno' },
                  { name: 'Tutela legale familiare', price: '70€/anno' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/5 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">Totale indicativo</span>
                  <span className="text-2xl font-black text-primary">da 630€/anno</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">ca. 52€/mese per proteggere l&apos;intera famiglia</p>
              </div>
              <Link href="/preventivo" className="btn-primary w-full text-center block">
                Richiedi il tuo preventivo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LeadMagnet />

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-primary mb-3">Domande frequenti</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            La tua famiglia è davvero protetta?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Analisi gratuita delle coperture attive. Identifichiamo gap e duplicati senza impegno.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/prenota-consulenza" className="btn-primary text-lg px-8 py-4">
              Prenota Consulenza Gratuita
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
