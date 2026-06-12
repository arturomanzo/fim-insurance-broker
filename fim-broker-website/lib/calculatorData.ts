export type Profile = 'privato' | 'professionista' | 'pmi' | 'impresa'

export interface Question {
  id: string
  label: string
  yesLabel: string
  noLabel: string
}

export interface Copertura {
  nome: string
  priorita: 'urgente' | 'alta' | 'consigliata'
  motivo: string
  slug: string
}

export interface RiskResult {
  livello: 'basso' | 'medio' | 'alto'
  punteggio: number
  coperture: Copertura[]
  prezzoMin: number
  prezzoMax: number
}

export const PROFILE_LABELS: Record<Profile, string> = {
  privato: 'Privato',
  professionista: 'Libero Professionista',
  pmi: 'PMI / Artigiano',
  impresa: 'Grande Impresa',
}

export const LEVEL_LABELS: Record<'basso' | 'medio' | 'alto', string> = {
  basso: '🟢 Basso',
  medio: '🟡 Medio',
  alto: '🔴 Alto',
}

export const PROFILES: Array<{ id: Profile; emoji: string; label: string; desc: string }> = [
  { id: 'privato', emoji: '👤', label: 'Privato', desc: 'Proteggere me stesso e la mia famiglia' },
  { id: 'professionista', emoji: '💼', label: 'Libero Professionista', desc: 'Consulente, medico, avvocato, ingegnere…' },
  { id: 'pmi', emoji: '🏢', label: 'PMI / Artigiano', desc: 'Azienda con 1–50 dipendenti' },
  { id: 'impresa', emoji: '🏭', label: 'Grande Impresa', desc: 'Struttura con 50+ dipendenti' },
]

export const SECTORS: Record<Profile, string[]> = {
  privato: ['Casa e Famiglia', 'Auto e Mobilità', 'Salute e Previdenza', 'Copertura completa'],
  professionista: ['Consulente / Manager', 'Medico / Sanitario', 'Avvocato / Notaio', 'Ingegnere / Architetto', 'IT / Tecnologia', 'Commercialista / Fiscalista', 'Altro'],
  pmi: ['Commercio / Retail', 'Artigianato / Produzione', 'Servizi Professionali', 'Edilizia / Costruzioni', 'Tecnologia / IT', 'Ristorazione / Turismo', 'Altro'],
  impresa: ['Manifatturiero / Industria', 'Commercio / GDO', 'Servizi / Consulting', 'Tecnologia / Software', 'Edilizia / Infrastrutture', 'Sanità / Pharma', 'Altro'],
}

export const QUESTIONS: Record<Profile, Question[]> = {
  privato: [
    { id: 'casa', label: 'Sei proprietario di casa o hai un mutuo?', yesLabel: 'Sì, sono proprietario', noLabel: 'No, sono in affitto' },
    { id: 'auto', label: "Utilizzi l'auto anche per esigenze lavorative?", yesLabel: 'Sì, anche per lavoro', noLabel: 'Solo uso personale' },
    { id: 'carico', label: 'Hai familiari a carico (figli, coniuge)?', yesLabel: 'Sì', noLabel: 'No' },
  ],
  professionista: [
    { id: 'clienti', label: "Gestisci più di 20 clienti o commesse all'anno?", yesLabel: 'Sì, oltre 20', noLabel: 'No, meno di 20' },
    { id: 'rc', label: 'Hai già una polizza RC Professionale attiva?', yesLabel: "Sì, ce l'ho", noLabel: 'No / scaduta' },
    { id: 'dati', label: 'Nel tuo lavoro tratti dati sensibili (salute, legale, finanziario)?', yesLabel: 'Sì', noLabel: 'No / marginalmente' },
  ],
  pmi: [
    { id: 'dipendenti', label: 'La tua azienda ha dipendenti (oltre al titolare)?', yesLabel: 'Sì, ho dipendenti', noLabel: 'No, solo io' },
    { id: 'veicoli', label: 'Utilizzi veicoli aziendali o hai una flotta?', yesLabel: 'Sì', noLabel: 'No' },
    { id: 'coperture', label: 'Hai già coperture assicurative aziendali?', yesLabel: 'Sì, alcune', noLabel: 'No / incomplete' },
  ],
  impresa: [
    { id: 'sedi', label: 'Hai sedi operative in più città o regioni?', yesLabel: 'Sì, più sedi', noLabel: 'Sede unica' },
    { id: 'dati', label: 'Gestisci dati digitali di clienti o fornitori?', yesLabel: 'Sì', noLabel: 'Limitatamente' },
    { id: 'manager', label: 'Hai già un risk manager o consulente assicurativo dedicato?', yesLabel: 'Sì', noLabel: 'No' },
  ],
}

export function getCoperture(profile: Profile, settore: string | null, answers: Record<string, boolean>): Copertura[] {
  const res: Copertura[] = []

  if (profile === 'privato') {
    if (answers.casa) {
      res.push({ nome: 'Assicurazione Casa', priorita: 'urgente', motivo: 'Protegge il tuo immobile da incendio, furto e responsabilità civile del proprietario.', slug: 'casa' })
    }
    if (answers.carico) {
      res.push({ nome: 'Polizza Vita / Caso Morte', priorita: 'alta', motivo: 'Con familiari a carico, proteggere il reddito familiare è una priorità assoluta.', slug: 'vita' })
    }
    res.push({
      nome: 'RC Auto + Kasko',
      priorita: answers.auto ? 'alta' : 'consigliata',
      motivo: answers.auto
        ? "Usi l'auto per lavoro: verifica che la polizza includa l'uso professionale e non solo privato."
        : 'Ottimizza costo e copertura della tua polizza auto con le migliori offerte di mercato.',
      slug: 'auto',
    })
    res.push({ nome: 'Assicurazione Salute', priorita: 'consigliata', motivo: "Accesso rapido a visite specialistiche e cure private, senza lunghe liste d'attesa del SSN.", slug: 'salute' })
  }

  if (profile === 'professionista') {
    res.push({
      nome: 'RC Professionale',
      priorita: !answers.rc ? 'urgente' : 'alta',
      motivo: !answers.rc
        ? 'Non hai una RC professionale attiva: è obbligatoria per molte categorie e protegge il tuo patrimonio personale da richieste di risarcimento.'
        : 'Ottimizza massimali e condizioni della tua RC professionale in base al volume di attività.',
      slug: 'aziendali',
    })
    if (answers.dati) {
      res.push({ nome: 'Polizza Cyber & Privacy', priorita: 'alta', motivo: 'Tratti dati sensibili: sei esposto a rischi GDPR e data breach. La cyber insurance copre sanzioni, ripristino dati e danni ai clienti.', slug: 'aziendali' })
    }
    res.push({ nome: 'Tutela Legale Professionale', priorita: 'consigliata', motivo: 'Copre le spese legali in caso di controversie con clienti, fornitori o autorità di vigilanza.', slug: 'aziendali' })
    res.push({ nome: 'Previdenza Complementare', priorita: 'consigliata', motivo: 'Da autonomo, la pensione pubblica sarà ridotta. Un piano previdenziale complementare è indispensabile.', slug: 'vita' })
  }

  if (profile === 'pmi') {
    res.push({
      nome: 'RC Impresa / RC Prodotti',
      priorita: !answers.coperture ? 'urgente' : 'alta',
      motivo: !answers.coperture
        ? "Non hai coperture aziendali: la RC impresa è il primo passo per tutelare l'attività da danni causati a terzi."
        : 'Verifica che la RC copra adeguatamente tutti i prodotti e servizi erogati.',
      slug: 'aziendali',
    })
    res.push({ nome: 'All Risk Aziendale (Property)', priorita: 'alta', motivo: 'Protegge locali, macchinari, attrezzature e merci da incendio, furto e danni accidentali.', slug: 'aziendali' })
    if (settore === 'Tecnologia / IT' || settore === 'Servizi Professionali') {
      res.push({ nome: 'Cyber Risk Insurance', priorita: 'alta', motivo: 'Nel tuo settore il rischio informatico è elevato. La cyber insurance è diventata imprescindibile per le PMI digitali.', slug: 'aziendali' })
    }
    if (answers.veicoli) {
      res.push({ nome: 'Flotta Aziendale', priorita: 'alta', motivo: 'Una polizza flotta unica ottimizza i costi e semplifica la gestione di tutti i veicoli aziendali.', slug: 'auto' })
    }
    if (answers.dipendenti) {
      res.push({ nome: 'Welfare & Salute Dipendenti', priorita: 'consigliata', motivo: 'Polizze sanitarie e infortuni per i dipendenti: benefit molto apprezzato e fiscalmente agevolato.', slug: 'salute' })
    }
  }

  if (profile === 'impresa') {
    res.push({ nome: 'Programma Assicurativo Integrato', priorita: 'urgente', motivo: "Un'impresa strutturata necessita di un programma coordinato: property, liability, D&O, cyber, fleet.", slug: 'aziendali' })
    if (answers.dati) {
      res.push({ nome: 'Cyber Insurance Enterprise', priorita: 'urgente', motivo: 'Gestisci dati digitali: il rischio cyber è classificato come top risk globale per le imprese. La copertura deve essere adeguata alla scala.', slug: 'aziendali' })
    }
    res.push({ nome: 'D&O (Directors & Officers)', priorita: 'alta', motivo: 'Protegge dirigenti e amministratori da responsabilità personali per decisioni aziendali e nei confronti di azionisti/terzi.', slug: 'aziendali' })
    if (answers.sedi) {
      res.push({ nome: 'All Risk Property Multi-Sede', priorita: 'alta', motivo: 'Con più sedi, una polizza centralizzata garantisce copertura coerente e riduce i costi complessivi.', slug: 'aziendali' })
    }
    res.push({ nome: 'Welfare & Benefits Aziendali', priorita: 'consigliata', motivo: "Programmi sanitari e previdenziali strutturati: fattore chiave nell'attrarre e trattenere talenti.", slug: 'salute' })
  }

  return res
}

export function calcola(input: { profile: Profile; settore: string | null; answers: Record<string, boolean> }): RiskResult {
  const { profile, settore, answers } = input
  let score = 0
  const base: Record<Profile, number> = { privato: 18, professionista: 38, pmi: 55, impresa: 75 }
  score += base[profile]

  if (profile === 'privato') {
    if (answers.casa) score += 10
    if (answers.auto) score += 8
    if (answers.carico) score += 7
  } else if (profile === 'professionista') {
    if (answers.clienti) score += 12
    if (!answers.rc) score += 18
    if (answers.dati) score += 15
  } else if (profile === 'pmi') {
    if (answers.dipendenti) score += 8
    if (answers.veicoli) score += 6
    if (!answers.coperture) score += 14
  } else if (profile === 'impresa') {
    if (answers.sedi) score += 8
    if (answers.dati) score += 10
    if (!answers.manager) score += 5
  }

  score = Math.min(score, 100)
  const livello: 'basso' | 'medio' | 'alto' = score < 36 ? 'basso' : score < 66 ? 'medio' : 'alto'
  const coperture = getCoperture(profile, settore, answers)

  const ranges: Record<Profile, [number, number]> = {
    privato: [500, 1800],
    professionista: [700, 3500],
    pmi: [1500, 9000],
    impresa: [6000, 30000],
  }
  const [rMin, rMax] = ranges[profile]
  const f = score / 100
  const prezzoMin = Math.round((rMin * (0.8 + f * 0.3)) / 100) * 100
  const prezzoMax = Math.round((rMax * (0.7 + f * 0.4)) / 100) * 100

  return { livello, punteggio: score, coperture, prezzoMin, prezzoMax }
}

export function isProfile(value: unknown): value is Profile {
  return value === 'privato' || value === 'professionista' || value === 'pmi' || value === 'impresa'
}
