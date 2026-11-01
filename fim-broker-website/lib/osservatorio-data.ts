// Dati dell'Osservatorio Prezzi.
//
// Dal 01/11/2026 qui ci sono solo numeri con una fonte. Prima c'erano sei premi
// medi, sei percentuali di tendenza e sei fasce regionali scritti a mano, che la
// pagina presentava come «Media mercato italiano»: non li aveva misurati nessuno.
// Scelta di Arturo del 01/11/2026: per la RC auto il dato ufficiale IVASS; per
// gli altri rami nessuna cifra, perché non c'è una fonte pubblica sul premio
// per contratto e i campioni del gestionale (meno di 40 polizze per ramo al
// 01/11/2026) non reggono una media. Il premio mediano del portafoglio FIM non
// si pubblica: misura un'altra cosa (mediano, solo annuali) e si leggerebbe come
// un confronto con la media IVASS.
//
// Come si aggiorna: IVASS pubblica l'indagine IPER ogni trimestre tra le
// «Comunicazioni statistiche». Si legge il report, si cambiano i valori qui
// sotto, `fonte`, `url`, `pubblicata` e `periodo`, e si controlla che le frasi
// della pagina reggano ancora (se l'anno su anno diventa negativo, il testo lo
// dice da solo: lo legge da `variazioneAnnua`).

export const ivassRcAuto = {
  fonte: 'IVASS, Comunicazione statistica n. 7/2026 (indagine IPER)',
  url: 'https://www.ivass.it/pubblicazioni-e-statistiche/statistiche/comunicazioni-statistiche/2026/cs-n-7-2026/cs_n_7_2026_Report_IPER.pdf',
  pubblicata: '2026-09-24',
  periodo: 'II trimestre 2026',
  anno: 2026,
  /** Prezzo medio della garanzia r.c. auto delle autovetture, euro correnti. */
  prezzoMedio: 422,
  /** Variazione nominale su base annua, in percentuale. */
  variazioneAnnua: 1.6,
  /** Variazione sul trimestre precedente, in percentuale. */
  variazioneTrimestre: -0.4,
  /** La metà delle province ha premi medi sopra questo valore. */
  medianaProvince: 396,
  /** Nel quarto di province più care si supera questo valore. */
  quartileAlto: 422,
} as const

export type RamoSenzaCifre = {
  name: string
  icon: string
  /** Una frase su che cosa determina il premio: niente tendenze di mercato, niente numeri. */
  testo: string
  /** Gli elementi che il preventivo guarda davvero. */
  fattori: string[]
  href: string
}

export const altriRami: RamoSenzaCifre[] = [
  {
    name: 'Polizza casa',
    icon: '🏠',
    testo: 'Il premio cambia soprattutto con il valore che assicuri e con le garanzie che aggiungi alla base incendio: furto, danni da acqua, eventi atmosferici, responsabilità civile della famiglia.',
    fattori: ['Valore del fabbricato e del contenuto', 'Zona e tipo di immobile', 'Garanzie aggiunte e franchigie'],
    href: '/servizi/assicurazione-casa',
  },
  {
    name: 'Polizza salute',
    icon: '🏥',
    testo: 'Conta l\'età di chi si assicura, e molto cosa copre la polizza: solo grandi interventi, oppure anche visite e accertamenti, con quale rete di strutture e con quali scoperti.',
    fattori: ['Età e stato di salute dichiarato', 'Ampiezza delle prestazioni', 'Rete convenzionata, scoperti e franchigie'],
    href: '/servizi/assicurazione-salute',
  },
  {
    name: 'Polizza vita',
    icon: '❤️',
    testo: 'Per una temporanea caso morte il premio dipende dal capitale, dalla durata e dall\'età. Il fumo e la salute dichiarata pesano quanto il resto.',
    fattori: ['Capitale assicurato e durata', 'Età, fumo e salute dichiarata', 'Eventuali garanzie aggiuntive'],
    href: '/servizi/assicurazione-vita',
  },
  {
    name: 'RC professionale',
    icon: '💼',
    testo: 'La professione fa la differenza, e con lei il massimale, la retroattività e il fatturato. Due professionisti dello stesso albo possono avere premi molto diversi.',
    fattori: ['Professione e attività svolte', 'Massimale, retroattività e postuma', 'Fatturato e sinistri precedenti'],
    href: '/soluzioni/professionisti',
  },
  {
    name: 'Polizze aziendali',
    icon: '🏢',
    testo: 'Qui un premio medio non direbbe niente: dipende da cosa fa l\'azienda, da quanto vale quello che assicura e da quali garanzie servono, compresa la catastrofale per chi è obbligato.',
    fattori: ['Attività, fatturato e addetti', 'Valore di fabbricati, macchinari e merci', 'Garanzie scelte, compresa la catastrofale'],
    href: '/servizi/polizze-aziendali',
  },
]
