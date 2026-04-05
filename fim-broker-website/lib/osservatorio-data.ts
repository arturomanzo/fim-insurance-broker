// Dati dell'Osservatorio Prezzi — aggiornati trimestralmente via GitHub Actions
// Script: fim-broker-website/scripts/update-osservatorio.ts

export const reportData = {
  lastUpdated: '2025-04-01',
  quarter: 'Q1 2025',
  summary:
    'Il mercato assicurativo italiano mostra una stabilizzazione dopo i rialzi del 2024. La RC Auto registra la prima flessione in tre anni, mentre le polizze catastrofali crescono per effetto dell\'obbligo di legge per le imprese. Il comparto salute mantiene la crescita sostenuta da una domanda privata in aumento.',
  categories: [
    {
      name: 'RC Auto',
      icon: '🚗',
      avgPremium: 487,
      change: -2.1,
      trend: 'down' as const,
      insight:
        'Prima flessione dal 2022. I sinistri si stabilizzano e alcune compagnie tornano a competere sui prezzi. Chi non ha cambiato polizza da oltre 2 anni ha margini di risparmio del 15-25%.',
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
        'L\'aumento riflette la crescente sinistrosità da eventi atmosferici (+40% nel 2024). Le compagnie rialzano i premi sulle estensioni alluvione/grandine, mentre le polizze base rimangono stabili.',
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
        'Sostanzialmente stabile. La domanda di polizze temporanee caso morte cresce tra i millennials con mutuo. Le unit-linked risentono della volatilità finanziaria. La previdenza complementare beneficia degli incentivi fiscali 2025.',
      priceRange: { min: 15, max: 150 },
      priceUnit: '€/mese',
      factors: ['Tassi di interesse in discesa', 'Cultura previdenziale in crescita', 'Incentivi fiscali confermati'],
    },
    {
      name: 'RC Professionale',
      icon: '💼',
      avgPremium: 680,
      change: 8.4,
      trend: 'up' as const,
      insight:
        'Forte rialzo guidato dall\'aumento dei contenziosi professionali. I settori più colpiti: medici (+12%), ingegneri (+9%), consulenti finanziari (+11%). L\'obbligo di legge amplia la platea di chi deve assicurarsi.',
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
        'Crescita significativa trainata dall\'obbligo catastrofale per le imprese (D.L. 18/2023) e dalla domanda di cyber risk. Le PMI che non erano ancora assicurate entrano ora nel mercato. Previsione: stabilizzazione nel Q3 2025.',
      priceRange: { min: 800, max: 15000 },
      factors: ['Obbligo polizza catastrofale', 'Crescita cyber risk', 'Nuovi assicurati PMI'],
    },
  ],
  regionData: [
    { region: 'Lazio', rcAuto: 534, trend: 'stable' as const, note: 'Roma mantiene i premi più alti del centro Italia' },
    { region: 'Lombardia', rcAuto: 498, trend: 'down' as const, note: 'Milano in calo per nuove compagnie digitali' },
    { region: 'Campania', rcAuto: 712, trend: 'up' as const, note: 'Sinistrosità elevata mantiene premi alti' },
    { region: 'Veneto', rcAuto: 421, trend: 'stable' as const, note: 'Tra le province meno costose del Nord-Est' },
    { region: 'Sicilia', rcAuto: 688, trend: 'up' as const, note: 'Frodi in aumento incidono sui premi' },
    { region: 'Toscana', rcAuto: 445, trend: 'down' as const, note: 'Beneficia della riduzione sinistri nelle città medie' },
  ],
  methodology:
    'I dati sono elaborati da FIM Insurance Broker su base trimestrale analizzando i preventivi erogati, le tariffe delle principali compagnie partner e i dati pubblici IVASS e ANIA. I premi medi sono indicativi e si riferiscono a profili standard. Il premio effettivo dipende da caratteristiche individuali del cliente.',
}
