// Dati dell'Osservatorio Prezzi.
//
// ATTENZIONE, prima di toccare questi numeri: NON sono statistiche misurate.
// Sono valori di orientamento compilati da FIM su profili standard. Lo script
// `scripts/update-osservatorio.ts` non li ricava da nessuna fonte — li ha
// scritti dentro di sé — e il testo della pagina lo dice apertamente al
// lettore dal 24/08/2026. Se un giorno arriveranno numeri veri (dai preventivi
// del gestionale, o da una fonte pubblica), va aggiornata *anche* la
// `methodology` qui sotto: è lei che dichiara al cliente da dove vengono.

export const reportData = {
  lastUpdated: '2025-04-01',
  quarter: 'Q1 2025',
  summary:
    'Dopo anni di rialzi il mercato assicurativo italiano dà segni di raffreddamento sulla RC Auto, mentre crescono le coperture spinte da un obbligo di legge — la catastrofale per le imprese — e da una domanda privata in aumento sulla salute.',
  categories: [
    {
      name: 'RC Auto',
      icon: '🚗',
      avgPremium: 487,
      change: -2.1,
      trend: 'down' as const,
      insight:
        'Dopo anni di rialzi il mercato dà segni di raffreddamento: i sinistri si stabilizzano e qualche compagnia torna a competere sul prezzo. Chi non rivede la polizza da qualche anno spesso paga condizioni superate, perché il mercato si muove e il contratto no: quanto si recupera si vede solo confrontando la propria posizione.',
      priceRange: { min: 250, max: 950 },
      factors: ['Frequenza sinistri in calo', 'Rientro competitività', 'Tecnologie ADAS riducono incidenti'],
    },
    {
      name: 'Polizza Casa',
      icon: '🏠',
      avgPremium: 218,
      change: 3.8,
      trend: 'up' as const,
      insight:
        'L\'aumento riflette la crescente sinistrosità da eventi atmosferici. Le compagnie rialzano i premi sulle estensioni alluvione e grandine, mentre le polizze base rimangono stabili.',
      priceRange: { min: 100, max: 450 },
      factors: ['Aumento eventi atmosferici', 'Inflazione costi riparazione', 'Domanda assicurazione catastrofale'],
    },
    {
      name: 'Polizza Salute',
      icon: '🏥',
      avgPremium: 412,
      change: 5.2,
      trend: 'up' as const,
      insight:
        'Il comparto salute cresce trainato dall\'insoddisfazione per le liste d\'attesa del SSN. Le polizze integrative con accesso a strutture private registrano la crescita maggiore. Segnali positivi dal welfare aziendale.',
      priceRange: { min: 180, max: 900 },
      factors: ['Liste attesa SSN in aumento', 'Invecchiamento demografico', 'Welfare aziendale in espansione'],
    },
    {
      name: 'Polizza Vita',
      icon: '❤️',
      avgPremium: 320,
      change: 1.1,
      trend: 'stable' as const,
      insight:
        'Sostanzialmente stabile. La domanda di polizze temporanee caso morte cresce tra chi ha un mutuo da coprire. Le unit-linked risentono della volatilità finanziaria. La previdenza complementare resta sostenuta dalla deducibilità dei versamenti.',
      priceRange: { min: 15, max: 150 },
      priceUnit: '€/mese',
      factors: ['Tassi di interesse in discesa', 'Cultura previdenziale in crescita', 'Deducibilità dei versamenti'],
    },
    {
      name: 'RC Professionale',
      icon: '💼',
      avgPremium: 680,
      change: 8.4,
      trend: 'up' as const,
      insight:
        'Rialzo guidato dall\'aumento dei contenziosi professionali. I rincari si concentrano sulle professioni sanitarie e tecniche, dove il singolo sinistro può valere molto e i tempi del contenzioso si allungano. L\'obbligo di legge amplia la platea di chi deve assicurarsi.',
      priceRange: { min: 300, max: 3000 },
      factors: ['Aumento contenziosi legali', 'Nuove categorie obbligate', 'Sinistri più complessi e costosi'],
    },
    {
      name: 'Polizze Aziendali',
      icon: '🏢',
      avgPremium: 1850,
      change: 14.2,
      trend: 'up' as const,
      insight:
        'Crescita trainata dall\'obbligo di copertura catastrofale per le imprese e dalla domanda di cyber risk. Le PMI che non erano ancora assicurate entrano ora nel mercato.',
      priceRange: { min: 800, max: 15000 },
      factors: ['Obbligo polizza catastrofale', 'Crescita cyber risk', 'Nuovi assicurati PMI'],
    },
  ],
  // Fasce, non valori puntuali. Prima erano sei premi all'euro con una freccia
  // di tendenza accanto: il pezzo della pagina che sembrava piu' un dato di
  // tutti gli altri, e nessuno lo aveva misurato. Le note dicevano perche' un
  // premio saliva o scendeva — inclusa una sulle frodi in Sicilia — cioe'
  // affermazioni su un territorio senza niente dietro. Ora la fascia dice
  // l'ordine di grandezza e la nota descrive la posizione, non il movimento.
  regionData: [
    { region: 'Lazio', rcAutoMin: 500, rcAutoMax: 570, note: 'Sopra la media nazionale, trainata da Roma' },
    { region: 'Lombardia', rcAutoMin: 460, rcAutoMax: 530, note: 'Tra le grandi regioni con la concorrenza più vivace' },
    { region: 'Campania', rcAutoMin: 660, rcAutoMax: 760, note: 'Tra le regioni con i premi RC Auto più alti d\'Italia' },
    { region: 'Veneto', rcAutoMin: 390, rcAutoMax: 450, note: 'Tra le meno costose del Nord-Est' },
    { region: 'Sicilia', rcAutoMin: 640, rcAutoMax: 730, note: 'Tra le regioni con i premi RC Auto più alti d\'Italia' },
    { region: 'Toscana', rcAutoMin: 410, rcAutoMax: 480, note: 'Tra le meno costose del centro Italia' },
  ],
  methodology:
    'Questi non sono dati statistici. Sono valori di orientamento compilati da FIM Insurance Broker su profili standard, insieme ai commenti che li accompagnano: servono a dare un ordine di grandezza a chi non sa da dove partire, non a fotografare il mercato. Non derivano da elaborazioni di statistiche ufficiali IVASS o ANIA. Le percentuali indicano una direzione attesa, non una variazione misurata. Si riferiscono al periodo indicato in cima alla pagina e non vengono aggiornati da allora. Il premio che pagherai dipende dalle tue caratteristiche e lo puoi sapere solo con un preventivo: quello è gratuito e non impegna a niente.',
}
