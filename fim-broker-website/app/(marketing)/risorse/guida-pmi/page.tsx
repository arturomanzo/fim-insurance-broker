import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guida Completa alle Assicurazioni per PMI 2025 — FIM Insurance Broker',
  description:
    'Guida pratica per artigiani, PMI e professionisti italiani: polizze obbligatorie, massimali, prezzi indicativi, gestione sinistri e checklist dei rischi.',
}

const sections = [
  {
    id: 'intro',
    number: '01',
    title: "Perché un'impresa ha bisogno di assicurarsi",
  },
  {
    id: 'obbligatorie',
    number: '02',
    title: 'Le assicurazioni obbligatorie per i datori di lavoro',
  },
  {
    id: 'consigliate',
    number: '03',
    title: 'Le coperture essenziali (non obbligatorie ma necessarie)',
  },
  {
    id: 'massimali',
    number: '04',
    title: 'Come scegliere i massimali giusti',
  },
  {
    id: 'sinistri',
    number: '05',
    title: 'Come funziona la gestione di un sinistro',
  },
  {
    id: 'prezzi',
    number: '06',
    title: 'Prezzi indicativi per le polizze principali',
  },
  {
    id: 'checklist',
    number: '07',
    title: 'Checklist dei rischi per PMI italiane',
  },
]

export default function GuidaPmiPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-primary py-14 md:py-20 text-white">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Guida PMI 2025</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 text-sm font-semibold mb-5 text-accent">
              📋 Guida gratuita — Aggiornata 2025
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
              Guida Completa alle<br />Assicurazioni per PMI 2025
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              Tutto quello che artigiani, commercianti, PMI e professionisti devono sapere
              sulle assicurazioni — spiegato in modo chiaro, senza gergo tecnico.
            </p>
            <div className="flex flex-wrap gap-4 text-white/70 text-sm">
              <span>✓ Aggiornata al 2025</span>
              <span>✓ Prezzi indicativi inclusi</span>
              <span>✓ Normativa italiana</span>
              <span>✓ Checklist scaricabile</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sidebar — indice */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Indice</p>
              <nav className="space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-start gap-2 text-sm text-gray-600 hover:text-primary transition-colors group"
                  >
                    <span className="text-accent font-black text-xs mt-0.5 flex-shrink-0">{s.number}</span>
                    <span className="group-hover:underline leading-tight">{s.title}</span>
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-5 border-t border-gray-200">
                <Link href="/preventivo" className="btn-primary w-full text-center text-sm py-3 block">
                  Preventivo gratuito
                </Link>
                <a href="tel:+390696883381" className="mt-2 text-center text-sm text-gray-500 hover:text-primary block">
                  📞 06 96883381
                </a>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3 prose prose-gray max-w-none">

            {/* 01 */}
            <section id="intro" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center flex-shrink-0">01</span>
                <h2 className="text-2xl font-black text-primary m-0">Perché un&apos;impresa ha bisogno di assicurarsi</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                In Italia, quasi il 70% delle PMI è sottoassicurato o non ha coperture adeguate.
                Il risultato: quando accade un sinistro rilevante (incendio, infortunio grave, contestazione di un cliente),
                l&apos;impresa si trova a dover far fronte a costi che possono arrivare a centinaia di migliaia di euro.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le assicurazioni non sono un costo inutile: sono il meccanismo che trasferisce il rischio dall&apos;imprenditore
                alla compagnia assicurativa, in cambio di un premio annuale certo e relativamente contenuto.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 not-prose mb-4">
                <p className="text-blue-800 text-sm font-semibold mb-2">💡 Il concetto chiave</p>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Un incendio nel capannone può costarti 500.000€. Una polizza all-risk può costare 1.500€/anno.
                  La logica è semplice: paghi una piccola certezza per evitare una grande incertezza.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Il ruolo del broker assicurativo</strong> — a differenza di un agente che rappresenta una sola compagnia,
                il broker (come FIM) è un consulente indipendente che lavora nell&apos;interesse del cliente.
                Confronta le offerte di 30+ compagnie, negozia le condizioni e ti assiste nei sinistri.
                Il suo compenso è una provvigione a carico della compagnia — per te la consulenza è gratuita.
              </p>
            </section>

            {/* 02 */}
            <section id="obbligatorie" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center flex-shrink-0">02</span>
                <h2 className="text-2xl font-black text-primary m-0">Le assicurazioni obbligatorie</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-5">
                Queste coperture sono imposte dalla legge. Operare senza di esse espone a sanzioni amministrative e penali.
              </p>
              <div className="space-y-4 not-prose mb-6">
                {[
                  {
                    name: 'INAIL — Infortuni sul Lavoro',
                    law: 'D.P.R. 1124/1965',
                    who: 'Tutti i datori di lavoro con dipendenti',
                    desc: "Copre infortuni sul lavoro e malattie professionali. L'INAIL gestisce direttamente la copertura: l'imprenditore versa i contributi periodicamente. Attenzione: l'INAIL copre solo una parte dell'esposizione — vedi sezione 3.",
                  },
                  {
                    name: 'RC Auto — Responsabilità Civile Autoveicoli',
                    law: 'L. 990/1969',
                    who: 'Chiunque circoli su strada con un veicolo',
                    desc: 'Obbligatoria per tutti i veicoli, compresi quelli aziendali. Non copre i danni al proprio veicolo.',
                  },
                  {
                    name: 'RC Professionale',
                    law: 'D.P.R. 137/2012 e altre norme di categoria',
                    who: 'Avvocati, ingegneri, architetti, medici, commercialisti, ecc.',
                    desc: 'Obbligatoria per la maggior parte delle professioni ordinistiche. Copre i danni causati ai clienti per errori, omissioni o negligenze professionali.',
                  },
                  {
                    name: 'Assicurazione Catastrofi Naturali per Imprese',
                    law: 'L. 213/2023, art. 1 co. 101-111',
                    who: 'Tutte le imprese con immobili/macchinari iscritti a bilancio',
                    desc: 'Dal 2025 obbligo di stipulare una polizza catastrofale (terremoto, alluvione, frana) entro il 31 marzo 2025. Le imprese non in regola rischiano di essere escluse dagli aiuti pubblici post-catastrofe.',
                    urgent: true,
                  },
                ].map((item) => (
                  <div key={item.name} className={`border rounded-xl p-5 ${item.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className={`font-bold text-lg m-0 ${item.urgent ? 'text-red-800' : 'text-primary'}`}>{item.name}</h3>
                      {item.urgent && (
                        <span className="text-xs font-bold bg-red-500 text-white px-2.5 py-1 rounded-full">NOVITÀ 2025</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Riferimento normativo: <code className="bg-gray-100 px-1.5 py-0.5 rounded">{item.law}</code></p>
                    <p className="text-xs font-semibold text-gray-600 mb-2">Chi è obbligato: {item.who}</p>
                    <p className="text-sm text-gray-600 leading-relaxed m-0">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 */}
            <section id="consigliate" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center flex-shrink-0">03</span>
                <h2 className="text-2xl font-black text-primary m-0">Le coperture essenziali (non obbligatorie ma necessarie)</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-5">
                Non obbligatorie per legge, ma indispensabili nella pratica. Queste polizze coprono i rischi che, se non gestiti, portano molte PMI a chiudere.
              </p>
              <div className="not-prose space-y-4">
                {[
                  {
                    icon: '🔥',
                    name: 'All-risk Sede, Capannone e Macchinari',
                    priority: 'Alta',
                    desc: 'Copre la struttura fisica (muri, impianti, tetto), le attrezzature e le scorte da incendio, furto, allagamento ed eventi atmosferici. Include spesso l\'interruzione di esercizio. È la polizza che più frequentemente salva le PMI.',
                  },
                  {
                    icon: '⚖️',
                    name: 'RC Impresa (Responsabilità Civile verso Terzi)',
                    priority: 'Alta',
                    desc: "Copre i danni causati a terzi nell'esercizio dell'attività: un cliente che si fa male, un prodotto difettoso, danni causati da dipendenti durante il lavoro. Senza questa polizza, un singolo sinistro grave può azzerare il patrimonio aziendale.",
                  },
                  {
                    icon: '👷',
                    name: 'Infortuni Dipendenti (Integrativa INAIL)',
                    priority: 'Alta per datori di lavoro',
                    desc: "L'INAIL copre solo parte degli infortuni e con limiti significativi. La polizza integrativa colma il gap: indennità dal primo giorno, rimborso spese mediche private, capitali aggiuntivi per invalidità grave. Sempre più richiesta nei contratti collettivi.",
                  },
                  {
                    icon: '💻',
                    name: 'Cyber Risk',
                    priority: 'Media-Alta',
                    desc: "Un ransomware blocca i tuoi sistemi. Dati dei clienti rubati. Sanzioni GDPR. La cyber risk copre i costi di ripristino IT, le spese legali, le sanzioni e il danno reputazionale. Non è più solo per le grandi aziende: il 43% degli attacchi informatici colpisce PMI.",
                  },
                  {
                    icon: '⏸️',
                    name: 'Interruzione di Esercizio',
                    priority: 'Media',
                    desc: "Se un sinistro (incendio, alluvione) blocca la produzione, questa polizza copre il mancato guadagno durante il periodo di fermo. È spesso inclusa nella polizza all-risk. Senza di essa, l'impresa deve far fronte alle spese fisse (affitti, stipendi) senza incassi.",
                  },
                  {
                    icon: '🚛',
                    name: 'Merci in Transito',
                    priority: 'Media',
                    desc: "Copre le merci durante il trasporto, sia con mezzi propri che attraverso corrieri terzi. Un danno alle merci in consegna può significare perdere il cliente e pagare il risarcimento. Il corriere ha una responsabilità limitata per legge.",
                  },
                ].map((item) => (
                  <div key={item.name} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5">
                    <span className="text-3xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="font-bold text-primary m-0 text-base">{item.name}</h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          item.priority.startsWith('Alta') ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          Priorità {item.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed m-0">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 */}
            <section id="massimali" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center flex-shrink-0">04</span>
                <h2 className="text-2xl font-black text-primary m-0">Come scegliere i massimali giusti</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Il massimale è l&apos;importo massimo che la compagnia pagherà in caso di sinistro. Sceglierlo correttamente è fondamentale:
                un massimale troppo basso lascia scoperti i rischi maggiori; uno troppo alto aumenta inutilmente il premio.
              </p>
              <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5">
                <p className="text-amber-800 text-sm font-semibold mb-2">⚠️ Il rischio della sottoassicurazione</p>
                <p className="text-amber-700 text-sm leading-relaxed m-0">
                  Se assicuri macchinari che valgono 200.000€ per soli 100.000€, in caso di sinistro totale riceverai solo il 50% del danno reale.
                  Questo principio — chiamato &ldquo;regola proporzionale&rdquo; — si applica anche ai sinistri parziali.
                  Un sinistro da 40.000€ verrebbe rimborsato solo 20.000€.
                </p>
              </div>
              <div className="not-prose space-y-3">
                {[
                  { polizza: 'RC Impresa', regola: 'Minimo 1M€. Per attività con molto pubblico (negozi, ristoranti) o prodotti complessi, considera 2-5M€.' },
                  { polizza: 'All-risk sede e macchinari', regola: 'Deve corrispondere al valore di ricostruzione/sostituzione a nuovo, non al valore di mercato. Aggiorna ogni 2-3 anni per tenere conto dell\'inflazione.' },
                  { polizza: 'RC Professionale', regola: 'Dipende dal fatturato e dal tipo di attività. Per consulenti e professionisti: minimo 500.000€. Per chi lavora su grandi progetti: 1-5M€.' },
                  { polizza: 'Cyber Risk', regola: 'Considera i costi di ripristino IT + le sanzioni GDPR (fino al 4% del fatturato globale). Minimo 250.000€ per PMI; 1M€+ per chi gestisce molti dati sensibili.' },
                ].map((item) => (
                  <div key={item.polizza} className="flex gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <span className="text-accent font-black flex-shrink-0">→</span>
                    <div>
                      <span className="font-bold text-primary text-sm">{item.polizza}: </span>
                      <span className="text-gray-600 text-sm">{item.regola}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05 */}
            <section id="sinistri" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center flex-shrink-0">05</span>
                <h2 className="text-2xl font-black text-primary m-0">Come funziona la gestione di un sinistro</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-5">
                Conoscere il processo prima che accada un sinistro fa la differenza tra un rimborso rapido e anni di contenzioso.
              </p>
              <div className="not-prose space-y-4">
                {[
                  { step: '1', title: 'Denuncia immediata alla compagnia', desc: "Hai l'obbligo contrattuale di denunciare il sinistro entro i termini indicati in polizza (spesso 3-5 giorni). Il ritardo può ridurre o annullare il rimborso. Con FIM hai un numero dedicato per le emergenze." },
                  { step: '2', title: 'Documentazione del danno', desc: "Fotografa tutto prima di rimuovere o riparare. Raccogli fatture, preventivi di riparazione, inventari delle merci danneggiate. Più documentazione hai, più veloce e completo sarà il rimborso." },
                  { step: '3', title: 'Perizia della compagnia', desc: "La compagnia nomina un perito per valutare il danno. Hai il diritto di nominare il tuo perito (controperizia) se non sei d'accordo con la valutazione. FIM ti assiste in questa fase." },
                  { step: '4', title: 'Liquidazione', desc: "Dopo la perizia, la compagnia propone un importo di liquidazione. Con la documentazione corretta e l'assistenza del broker, i tempi di liquidazione si riducono significativamente — spesso da mesi a settimane." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-5">
                    <span className="w-8 h-8 rounded-full bg-primary text-white font-black text-sm flex items-center justify-center flex-shrink-0">{item.step}</span>
                    <div>
                      <h3 className="font-bold text-primary mb-1 m-0">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed m-0">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-5 not-prose">
                <p className="text-primary text-sm font-semibold mb-1">Il vantaggio del broker nei sinistri</p>
                <p className="text-gray-600 text-sm leading-relaxed m-0">
                  Un agente che rappresenta una compagnia ha un incentivo a minimizzare i rimborsi. Il broker lavora invece per massimizzare il tuo risarcimento: conosce il contratto, sa come documentare correttamente, e ha il potere di negoziare con la compagnia.
                </p>
              </div>
            </section>

            {/* 06 */}
            <section id="prezzi" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center flex-shrink-0">06</span>
                <h2 className="text-2xl font-black text-primary m-0">Prezzi indicativi 2025</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-5">
                I prezzi variano in base al settore di attività, al fatturato, ai valori assicurati e allo storico sinistri.
                I seguenti sono riferimenti orientativi per PMI con 1-10 dipendenti e fatturato fino a 1M€.
              </p>
              <div className="not-prose overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="text-left p-3 rounded-tl-lg font-semibold">Polizza</th>
                      <th className="text-left p-3 font-semibold">Da</th>
                      <th className="text-left p-3 rounded-tr-lg font-semibold">Fino a</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'RC Impresa (1M€ massimale)', from: '300€/anno', to: '1.500€/anno' },
                      { name: 'All-risk sede + macchinari (500K€)', from: '600€/anno', to: '2.500€/anno' },
                      { name: 'RC Professionale (500K€)', from: '200€/anno', to: '1.200€/anno' },
                      { name: 'Infortuni dipendenti (per addetto)', from: '150€/anno', to: '400€/anno' },
                      { name: 'Flotta aziendale (per veicolo)', from: '400€/anno', to: '1.200€/anno' },
                      { name: 'Cyber Risk (250K€)', from: '400€/anno', to: '2.000€/anno' },
                      { name: 'Merci in transito', from: '200€/anno', to: '800€/anno' },
                      { name: 'Catastrofi naturali (estensione casa)', from: '80€/anno', to: '300€/anno' },
                    ].map((row, i) => (
                      <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border-b border-gray-100 text-gray-700 font-medium">{row.name}</td>
                        <td className="p-3 border-b border-gray-100 text-accent font-bold">{row.from}</td>
                        <td className="p-3 border-b border-gray-100 text-gray-500">{row.to}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3 not-prose">
                * Prezzi orientativi 2025. Il premio definitivo dipende da settore di attività, valori assicurati, massimali e storico sinistri. Richiedi un preventivo personalizzato per i tuoi dati reali.
              </p>
            </section>

            {/* 07 */}
            <section id="checklist" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center flex-shrink-0">07</span>
                <h2 className="text-2xl font-black text-primary m-0">Checklist dei rischi per PMI italiane</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-5">
                Usa questa checklist per verificare se la tua impresa è adeguatamente protetta. Per ogni punto senza spunta, valuta se il rischio è rilevante per la tua attività.
              </p>
              <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { category: 'Obblighi legali', items: ['Ho in regola i versamenti INAIL', 'Tutti i veicoli aziendali hanno RC auto', 'Ho la RC professionale (se categoria obbligata)', 'Ho valutato l\'obbligo catastrofi naturali 2025'] },
                  { category: 'Protezione sede e beni', items: ['La sede/capannone è assicurata contro incendio', 'I macchinari sono assicurati al valore di ricostruzione', 'Le scorte e le merci sono coperte', 'Ho copertura per interruzione di esercizio'] },
                  { category: 'Responsabilità verso terzi', items: ['Ho RC impresa per danni a clienti e terzi', 'Prodotto/servizio: ho RC prodotto se necessario', 'Ho tutela legale in caso di contestazioni', 'I dipendenti operando per mio conto sono coperti'] },
                  { category: 'Rischi digitali e personale', items: ['Ho valutato il rischio cyber per i miei dati', 'I dipendenti hanno copertura integrativa infortuni', 'Ho un piano di disaster recovery IT', 'Le merci in transito sono assicurate'] },
                ].map((group) => (
                  <div key={group.category} className="bg-white border border-gray-200 rounded-xl p-5">
                    <h3 className="font-bold text-primary text-sm mb-3">{group.category}</h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-4 h-4 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA finale */}
            <div className="bg-primary rounded-2xl p-8 text-white not-prose">
              <h3 className="text-2xl font-black mb-3">Hai trovato lacune nella tua copertura?</h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                FIM Insurance Broker offre un&apos;analisi gratuita della tua copertura attuale.
                In 30 minuti identifichiamo i gap, confrontiamo le offerte di 30+ compagnie e ti proponiamo la soluzione più adatta.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/prenota-consulenza" className="btn-primary px-6 py-3">
                  Prenota consulenza gratuita
                </Link>
                <Link href="/preventivo" className="btn-outline-white px-6 py-3">
                  Richiedi preventivo
                </Link>
                <a href="tel:+390696883381" className="btn-outline-white px-6 py-3">
                  📞 06 96883381
                </a>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}
