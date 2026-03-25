import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Soluzioni per Settore — FIM Insurance Broker',
  description:
    'Soluzioni assicurative per famiglie, professionisti, artigiani, PMI, condomini e rischi catastrofali. FIM Insurance Broker: consulenza su misura per ogni categoria.',
}

const solutions = [
  {
    href: '/soluzioni/famiglie',
    icon: '🏠',
    tag: 'Per privati e nuclei familiari',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'Famiglie e Privati',
    subtitle: 'Coppie, famiglie, proprietari di casa, affittuari',
    desc: 'Casa, vita, salute, infortuni: le polizze giuste per ogni fase della vita. FIM analizza le coperture già in essere, identifica i gap e seleziona solo ciò che serve davvero.',
    highlights: ['Polizza Casa', 'Vita TCM', 'Salute Integrativa', 'Tutela Legale'],
    cta: 'Scopri le soluzioni per famiglie',
    price: 'da 150€/anno',
  },
  {
    href: '/soluzioni/professionisti',
    icon: '⚖️',
    tag: 'Obbligatoria per molte categorie',
    tagColor: 'bg-blue-100 text-blue-700',
    title: 'Professionisti',
    subtitle: 'Avvocati, commercialisti, ingegneri, medici, consulenti',
    desc: 'La RC professionale è obbligatoria per molte categorie. Un errore professionale non coperto può costarti anni di lavoro. FIM trova la polizza giusta per la tua categoria e il tuo volume d\'affari.',
    highlights: ['RC Professionale', 'Tutela Legale', 'Cyber Risk', 'D&O per STP'],
    cta: 'Scopri le soluzioni per professionisti',
    price: 'da 200€/anno',
  },
  {
    href: '/soluzioni/artigiani-pmi',
    icon: '🏭',
    tag: 'Per piccole e medie imprese',
    tagColor: 'bg-green-100 text-green-700',
    title: 'Artigiani e PMI',
    subtitle: 'Commercianti, artigiani, imprese fino a 50 dipendenti',
    desc: 'Proteggi capannone, macchinari, dipendenti e clienti con un pacchetto assicurativo su misura per la tua attività. Nessuna copertura inutile, nessun gap pericoloso.',
    highlights: ['RC Impresa', 'All-risk capannone', 'Infortuni dipendenti', 'Flotta aziendale'],
    cta: 'Scopri le soluzioni per PMI',
    price: 'da 300€/anno',
  },
  {
    href: '/soluzioni/condomini',
    icon: '🏢',
    tag: 'RC Amministratore obbligatoria per legge',
    tagColor: 'bg-orange-100 text-orange-700',
    title: 'Condomini',
    subtitle: 'Amministratori, assemblee condominiali, stabili residenziali',
    desc: 'Globale fabbricato, RC ascensori, RC Amministratore (obbligatoria L. 220/2012) e tutela legale condominiale. FIM segue sinistri e rinnovi per conto del condominio.',
    highlights: ['Globale Fabbricato', 'RC Amministratore', 'RC Ascensori', 'Tutela Legale'],
    cta: 'Scopri le soluzioni per condomini',
    price: 'da 400€/anno',
  },
  {
    href: '/soluzioni/catastrofi-naturali',
    icon: '🌊',
    tag: '⚠️ Obbligo di legge dal 2025 per le imprese',
    tagColor: 'bg-red-100 text-red-700',
    title: 'Catastrofi Naturali',
    subtitle: 'Privati, famiglie e imprese — tutto il territorio italiano',
    desc: 'Alluvioni, terremoti, grandinate: le polizze standard spesso non coprono questi rischi. Dal 2025 le imprese italiane hanno l\'obbligo di legge di assicurarsi contro i rischi catastrofali.',
    highlights: ['Alluvione ed esondazione', 'Terremoto e sisma', 'Grandine', 'Frana e smottamento'],
    cta: 'Scopri le coperture catastrofali',
    price: 'da 80€/anno',
  },
]

export default function SoluzioniPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-20 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 border border-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
              Soluzioni per settore
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-5">
              Assicurazioni <span className="text-accent">su misura</span><br />
              per la tua categoria
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Ogni categoria ha esigenze diverse. Abbiamo sviluppato soluzioni specifiche per le categorie
              più comuni — così non devi partire da zero ma da una base costruita per chi fa il tuo stesso lavoro.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {solutions.map((sol) => (
              <div key={sol.href} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col">
                {/* Top section */}
                <div className="p-8 flex-1">
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-5xl">{sol.icon}</span>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${sol.tagColor}`}>
                      {sol.tag}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-primary mb-1">{sol.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">{sol.subtitle}</p>
                  <p className="text-gray-700 leading-relaxed mb-6">{sol.desc}</p>
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {sol.highlights.map((h) => (
                      <span key={h} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Bottom section */}
                <div className="px-8 pb-8 border-t border-gray-50 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500">Polizze disponibili</span>
                    <span className="text-sm font-bold text-accent">{sol.price}</span>
                  </div>
                  <Link
                    href={sol.href}
                    className="flex items-center justify-between w-full bg-primary/5 hover:bg-primary/10 text-primary font-semibold px-5 py-3 rounded-xl transition-colors group-hover:bg-primary group-hover:text-white"
                  >
                    {sol.cta}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other needs */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-black text-primary mb-3">Non trovi la tua categoria?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Lavoriamo con qualsiasi tipo di attività. Contattaci e costruiamo insieme la copertura più adatta alla tua situazione specifica.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/preventivo" className="btn-primary px-8 py-4">
              Richiedi un preventivo personalizzato
            </Link>
            <Link href="/contatti" className="btn-secondary px-8 py-4">
              Parlaci della tua attività
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
