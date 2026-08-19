/**
 * Riferimenti normativi dell'informativa precontrattuale, condivisi tra le
 * pagine legali (/trasparenza, /note-legali, /reclami).
 *
 * ⚠️ ATTENZIONE PRIMA DI TOCCARE I TESTI LEGALI
 * Il Provvedimento IVASS n. 147 del 20 giugno 2024 ha ABROGATO i vecchi
 * Allegati 3, 4, 4-bis e 4-ter del Reg. 40/2018 e li ha sostituiti con il
 * Modulo Unico Precontrattuale (MUP):
 *   • Allegato 3 → MUP per i prodotti assicurativi        (quello che riguarda FIM)
 *   • Allegato 4 → MUP per i prodotti d'investimento assicurativi (IBIP)
 *   • Allegato 4-ter → abrogato senza sostituzione
 * Chi aggiorna /trasparenza deve partire dal PDF ufficiale dell'Allegato 3
 * (vedi ALLEGATI_MONITORATI), non dallo schema pre-2024.
 */

/** URL dei PDF ufficiali IVASS da cui deriva il testo di /trasparenza. */
export const ALLEGATI_MONITORATI = [
  {
    id: 'allegato-3',
    label: 'Allegato 3 — MUP prodotti assicurativi',
    url: 'https://www.ivass.it/normativa/nazionale/secondaria-ivass/regolamenti/2018/n40/Regolamento_IVASS_40_2018_Allegato_3.pdf',
  },
  {
    id: 'allegato-4',
    label: 'Allegato 4 — MUP prodotti d\'investimento assicurativi',
    url: 'https://www.ivass.it/normativa/nazionale/secondaria-ivass/regolamenti/2018/n40/Regolamento_IVASS_40_2018_Allegato_4.pdf',
  },
  {
    id: 'reg-40-consolidato',
    label: 'Reg. IVASS 40/2018 — testo consolidato',
    url: 'https://www.ivass.it/normativa/nazionale/secondaria-ivass/regolamenti/2018/n40/Regolamento_IVASS_40_del_2_agosto_2018_consolidato.pdf',
  },
] as const

/**
 * Provvedimenti che hanno modificato il Reg. 40/2018 e che impattano il testo
 * pubblicato. Il più recente in coda: è quello citato nelle pagine legali.
 */
export const PROVVEDIMENTI_REG_40 = [
  { n: '97/2020', data: '4 agosto 2020', oggetto: 'gestione dei reclami e informativa' },
  { n: '147/2024', data: '20 giugno 2024', oggetto: 'introduzione del MUP, abrogazione degli Allegati 3, 4, 4-bis e 4-ter' },
  { n: '163/2025', data: '25 novembre 2025', oggetto: 'informativa sull\'Arbitro Assicurativo' },
  { n: '169/2026', data: '15 gennaio 2026', oggetto: 'Sezione VIII — diritto all\'oblio oncologico' },
] as const

/** Ultimo provvedimento recepito nel testo pubblicato su /trasparenza. */
export const PROVVEDIMENTO_VIGENTE = PROVVEDIMENTI_REG_40[PROVVEDIMENTI_REG_40.length - 1]

/** Etichetta breve usata negli occhielli e nelle description SEO. */
export const NORMATIVA_LABEL = `Reg. IVASS 40/2018 — Allegato 3 (MUP), agg. Provv. ${PROVVEDIMENTO_VIGENTE.n}`

/**
 * Data dell'ultima revisione umana dell'informativa. Va aggiornata a mano a
 * ogni rilettura, anche quando nulla cambia: serve a distinguere "verificato e
 * ancora valido" da "nessuno lo guarda dal 2024".
 */
export const ULTIMA_REVISIONE = '19 agosto 2026'

/** Iscrizione al RUI. */
export const RUI_SEZIONE = 'B'
export const RUI_NUMERO = 'B000405449'
/**
 * Data di iscrizione al RUI, richiesta espressamente dalla Sezione I del MUP
 * ("numero e data di iscrizione nel RUI"). Confermata da Arturo (ago 2026).
 */
export const RUI_DATA_ISCRIZIONE = '20 gennaio 2012'

/** Massimale della polizza RC professionale del broker. */
export const RC_PROFESSIONALE_MASSIMALE = '€ 2.500.000'

/**
 * Fondo di garanzia per i mediatori di assicurazione e riassicurazione.
 * La Sezione VII del MUP richiede indirizzo e recapito telefonico.
 */
export const FONDO_GARANZIA_BROKER = {
  gestore: 'CONSAP S.p.A.',
  denominazione: 'Fondo di garanzia per i mediatori di assicurazione e riassicurazione',
  indirizzo: 'Via Yser 14, 00198 Roma',
  telefono: '06 85796538',
  email: 'fondobrokers@consap.it',
  url: 'https://www.consap.it/fondo-brokers/',
} as const
