/*
 * Le forme del set «Sotto il tetto»: solo l'oggetto, il tetto lo mette `<Icona>`
 * (components/icons/TettoIcons.tsx).
 *
 * - griglia 24: l'oggetto sta tra x 2,5-21,5 e y 7,3-23, pieno, dritto
 * - ogni voce dell'array è un tracciato evenodd: i fori stanno nella stessa voce,
 *   i pezzi che si sovrappongono in voci separate (altrimenti si bucano)
 * - solo letterali, niente funzioni: così un componente client si porta dietro
 *   soltanto le forme che importa
 * - niente scudo: sotto il tetto rifarebbe il logo
 * - prima di pubblicarne una nuova, guardarla a 240 e a 20 pixel
 */

export type Forma = readonly string[]

// Persone
export const PERSONA: Forma = ['M8.2 11.3a3.8 3.8 0 1 1 7.6 0 3.8 3.8 0 0 1-7.6 0Z', 'M4.5 23v-2.5a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5V23Z']
export const PERSONE: Forma = ['M4.7 11.5a3.3 3.3 0 1 1 6.6 0 3.3 3.3 0 0 1-6.6 0ZM13.4 12.2a2.8 2.8 0 1 1 5.6 0 2.8 2.8 0 0 1-5.6 0Z', 'M2.5 23v-2.5a4.5 4.5 0 0 1 4.5-4.5h2a4.5 4.5 0 0 1 4.5 4.5V23ZM15 23v-2.5a6 6 0 0 0-1.3-3.7l.3-.1h3a4.5 4.5 0 0 1 4.5 4.5V23Z']
export const PROFESSIONISTA: Forma = ['M8.4 11a3.6 3.6 0 1 1 7.2 0 3.6 3.6 0 0 1-7.2 0Z', 'M4 23v-2.5a5 5 0 0 1 4.5-5L12 20l3.5-4.5a5 5 0 0 1 4.5 5V23ZM11.1 15.3h1.8l-.4 1.4.8 2L12 20.2l-1.3-1.5.8-2Z']
export const FAMIGLIA: Forma = ['M3.5 10.5a2.7 2.7 0 1 1 5.4 0 2.7 2.7 0 0 1-5.4 0ZM15.1 10.5a2.7 2.7 0 1 1 5.4 0 2.7 2.7 0 0 1-5.4 0ZM10 15.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z', 'M2.5 23v-5.2a3.2 3.2 0 0 1 3.2-3.2h1a2.6 2.6 0 0 1 2.1 1l-1 3.4v4ZM21.5 23v-5.2a3.2 3.2 0 0 0-3.2-3.2h-1a2.6 2.6 0 0 0-2.1 1l1 3.4v4ZM9.3 23v-2a2.2 2.2 0 0 1 2.2-2.2h1a2.2 2.2 0 0 1 2.2 2.2v2Z']
export const COPPIA: Forma = ['M3.8 13.3a3.3 3.3 0 1 1 6.6 0 3.3 3.3 0 0 1-6.6 0ZM13.6 13.3a3.3 3.3 0 1 1 6.6 0 3.3 3.3 0 0 1-6.6 0Z', 'M2.5 23v-1.5a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4V23ZM12.5 23v-1.5a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4V23Z', 'M12 11.5 9.8 9.3a1.3 1.3 0 0 1 2.2-1.4 1.3 1.3 0 0 1 2.2 1.4Z']
export const ANZIANO: Forma = ['M6.2 10.5a3.1 3.1 0 1 1 6.2 0 3.1 3.1 0 0 1-6.2 0Z', 'M4.5 23v-4.5a4 4 0 0 1 4-4h1.6a4 4 0 0 1 4 4V23Z', 'M15.5 23v-7a2.5 2.5 0 0 1 5 0v.8h-1.8V16a.7.7 0 0 0-1.4 0v7Z']
export const NEONATO: Forma = ['M3 14.5a7 7 0 0 1 7-7v7ZM3 15.7h16a6 5.5 0 0 1-6 4.6H9a6 5.5 0 0 1-6-4.6Z', 'M18 10.5h3.5v2h-1.7L19 16h-2.2Z', 'M5 21.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM14 21.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z']
export const SPORT: Forma = ['M2.5 14.2h2v3h-2ZM5 11.2h3.5v9H5ZM8.5 14.4h7v2.6h-7ZM15.5 11.2H19v9h-3.5ZM19.5 14.2h2v3h-2Z']
export const CASCO: Forma = ['M4 17a8 8 0 0 1 5.5-7.6V14h1.3V8h2.4v6h1.3V9.4A8 8 0 0 1 20 17Z', 'M2.5 18.2h19v1.8l-2 2h-17Z']
export const CRAVATTA: Forma = ['M9 7.5h6l-1.7 3.5h-2.6ZM10.7 11.8h2.6l2.4 8-3.7 3.2-3.7-3.2Z']
export const TOCCO: Forma = ['M12 8 21.5 12.2 12 16.4 2.5 12.2Z', 'M6 15.2l6 2.7 6-2.7v4.5L15 22.5H9l-3-2.8Z', 'M19.5 13h1.5v7h-1.5Z']
export const ORGANIGRAMMA: Forma = ['M9 7.8h6v5H9ZM2.5 18h6v5h-6ZM15.5 18h6v5h-6Z', 'M11 12.5h2v2.2h6.5V18h-2v-1.3h-11V18h-2v-3.3H11Z']
export const MENTE: Forma = ['M11 7.5a7 7 0 0 1 7 6.5l2 3h-2v2.5a1.5 1.5 0 0 1-1.5 1.5H15v2H7v-4a7 7 0 0 1 4-11.5ZM11 18l-3.2-3a1.9 1.9 0 0 1 3.2-2 1.9 1.9 0 0 1 3.2 2Z']

// Casa, edifici, luoghi
export const CASA: Forma = ['M4 13 12 7.5 20 13v7.5L17.5 23H14v-5h-4v5H4Z']
export const PALAZZO: Forma = ['M5.5 8h13v12.5L16 23h-2.5v-3.5h-3V23h-5ZM8 10.5v2.3h2.8v-2.3ZM13.2 10.5v2.3H16v-2.3ZM8 14.8v2.3h2.8v-2.3ZM13.2 14.8v2.3H16v-2.3Z']
export const CONDOMINIO: Forma = ['M2.5 23V13.5L7 10l4.5 3.5V23H8.3v-3.5H5.7V23ZM5.5 14v2.3h3V14ZM12.8 23V8h8.7v12.5L19 23ZM14.8 10.5v2.3h1.8v-2.3ZM17.8 10.5v2.3h1.8v-2.3ZM14.8 15v2.3h1.8V15ZM17.8 15v2.3h1.8V15Z']
export const VILLETTE: Forma = ['M2.5 23v-8L7 10.5l4.5 4.5v8H8.5v-4h-3v4ZM12.5 23v-8L17 10.5l4.5 4.5v5.5L19 23h-.5v-4h-3v4Z']
export const FABBRICA: Forma = ['M3 23V11l6 3.5V11l6 3.5V7.5h5.5v13L18 23ZM7 17.5v3.2h3.5v-3.2ZM13.5 17.5v3.2H17v-3.2Z']
export const NEGOZIO: Forma = ['M5 8h14l2.5 4.5v1a2.35 2.35 0 0 1-4.75 0 2.375 2.375 0 0 1-4.75 0 2.375 2.375 0 0 1-4.75 0 2.375 2.375 0 0 1-4.75 0v-1Z', 'M4.5 17h15v3.5L17 23H4.5ZM7.5 18.5V23h3.2v-4.5ZM13 18.5v2.3h4v-2.3Z']
export const CANTIERE: Forma = ['M4.5 7.5h3.5v2h13.5v2.3H8V21H4.5v-9.2H2.5V9.5h2ZM5.6 13h1.3v2H5.6ZM5.6 16.7h1.3v2H5.6Z', 'M2.5 21h7.5v2H2.5Z', 'M16.3 11.8h1.8v3.5h-1.8Z', 'M13.5 15.3h7.3v5.2L18.3 23h-4.8ZM15.5 17.5v1.7h3.3v-1.7Z']
export const SERRA: Forma = ['M2.5 23v-9.5L12 7.5l9.5 6V23ZM4.8 14.8v6h14.4v-6L12 10.2Z', 'M11 15.5h2V21h-2Z', 'M11 17.3c-3.3.2-4.9-1.6-4.8-4.5 3 0 4.9 1.5 4.8 4.5ZM13 16.5c-.2-3 1.6-4.3 4.8-4.3 0 3-1.8 4.4-4.8 4.3Z']
export const ISTITUZIONE: Forma = ['M2.5 12 12 7.5l9.5 4.5v1.2h-19Z', 'M5 14.4h2.8v5H5ZM10.6 14.4h2.8v5h-2.8ZM16.2 14.4H19v5h-2.8ZM2.5 20.6h19L19 23H2.5Z']
export const SCUOLA: Forma = ['M2.5 23v-9H7l5-4 5 4h4.5v6.5L19 23h-5v-4h-4v4ZM4.5 16.2v2.5h2v-2.5ZM17.5 16.2v2.5h2v-2.5ZM10.5 14a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z', 'M11.3 7.3h4l-1 1.3 1 1.3h-2.6v1h-1.4Z']
export const OSPEDALE: Forma = ['M4.5 8h15v12.5L17 23h-3v-3.5h-4V23H4.5ZM10.8 10.2v2.4H8.4V15h2.4v2.4h2.4V15h2.4v-2.4h-2.4v-2.4Z']
export const HOTEL: Forma = ['M2.5 9.5H5v7h16.5V23H19v-2.5H5V23H2.5ZM6 13.3a2.2 2.2 0 1 1 4.4 0 2.2 2.2 0 0 1-4.4 0ZM11.5 11.2h7a3 3 0 0 1 3 3v1.3h-10Z']
export const ASCENSORE: Forma = ['M2.5 8h12v15h-12ZM4.8 10.3v10.4h3V10.3ZM9.2 10.3v10.4h3V10.3Z', 'M16 14h5.5l-2.75-4.5ZM16 17h5.5l-2.75 4.5Z']
export const PISCINA: Forma = ['M7 18v-7.5a3 3 0 0 1 6 0h-2a1 1 0 0 0-2 0V18ZM13.5 18v-7.5a3 3 0 0 1 6 0h-2a1 1 0 0 0-2 0V18Z', 'M9 12.5h4.5v1.8H9Z', 'M2.5 19.5q2.4-2 4.75 0t4.75 0 4.75 0 4.75 0v3q-2.4-2-4.75 0t-4.75 0-4.75 0-4.75 0Z']
export const SPIAGGIA: Forma = ['M3 14.5a9 6.8 0 0 1 18 0Z', 'M11 14.5h2V21h-2ZM2.5 21h19l-2 2h-17Z']
export const DIVANO: Forma = ['M6 14v-2.5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V14l-1.5 2.5h-9Z', 'M2.5 14.5a1.5 1.5 0 0 1 3 0v3h13v-3a1.5 1.5 0 0 1 3 0V21l-.8.8h-1.2V23h-2.5v-1.2H7V23H4.5v-1.2h-2Z']
export const PORTA: Forma = ['M3.5 8h9.8v15H3.5ZM10 15a1.1 1.1 0 1 0 0 2.2A1.1 1.1 0 0 0 10 15Z', 'M14.8 14.3h3v-2.8l3.9 4-3.9 4v-2.8h-3Z']
export const SEGNAPOSTO: Forma = ['M12 7.4a6.3 6.3 0 0 1 6.3 6.3c0 3.8-3.8 7.3-6.3 9.3-2.5-2-6.3-5.5-6.3-9.3A6.3 6.3 0 0 1 12 7.4ZM12 11.2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z']
export const MAPPA: Forma = ['M2.5 10.5 8 8.3v12.4l-5.5 2.2ZM9.3 8.3l5.4 2.2v12.4l-5.4-2.2ZM16 10.5l5.5-2.2v12.4L16 22.9Z']
export const MONDO: Forma = ['M12 7.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5ZM11 9.8A7.5 7.5 0 0 0 8.5 14.2H11ZM13 9.8v4.4h2.5A7.5 7.5 0 0 0 13 9.8ZM11 16.2H8.5a7.5 7.5 0 0 0 2.5 4.5ZM13 16.2v4.5a7.5 7.5 0 0 0 2.5-4.5Z']

// Mezzi
export const AUTO: Forma = ['M6 10h12l2.5 5 1 .5V21h-3v2h-3v-2h-7v2h-3v-2h-3v-5.5l1-.5ZM7.5 12 6 15h12l-1.5-3ZM5 17v2h3v-2ZM16 17v2h3v-2Z']
export const FURGONE: Forma = ['M2.5 9.5H14v10H2.5ZM15 12.5h3.5l3 3.8v3.2H15ZM16.5 14v2.3h3L17.7 14Z', 'M4.2 20.8a2.2 2.2 0 1 1 4.4 0 2.2 2.2 0 0 1-4.4 0ZM15.4 20.8a2.2 2.2 0 1 1 4.4 0 2.2 2.2 0 0 1-4.4 0Z']
export const SOCCORSO: Forma = ['M14.5 12.5H18l3.5 4V20h-7ZM16 14v2.3h3L17.2 14Z', 'M2.5 17.3h11V20h-11Z', 'M3 15.8 10.2 8.3l1.7 1.6-5.7 5.9Z', 'M10.2 8.3h2.2v3.2h-1.1v2H9.2v-1.6h1Z', 'M4.2 21a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM15.5 21a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z']
export const TRATTORE: Forma = ['M5.5 8.5h7l2 5.5H20v4.5h-6.5a5.2 5.2 0 0 0-8-3ZM7.5 10.5v3h4.5l-1-3Z', 'M2.8 18.8a4.2 4.2 0 1 1 8.4 0 4.2 4.2 0 0 1-8.4 0ZM5.5 18.8a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z', 'M15.5 20.6a2.4 2.4 0 1 1 4.8 0 2.4 2.4 0 0 1-4.8 0ZM17.5 10h1.8v4h-1.8Z']
export const AEREO: Forma = ['M12 7.4a1.6 1.6 0 0 1 1.6 1.6v4l7.9 4v2.3l-7.9-2.1v3l2.2 1.5V23L12 22.2 8.2 23v-1.3l2.2-1.5v-3l-7.9 2.1V17l7.9-4V9A1.6 1.6 0 0 1 12 7.4Z']
export const IMPATTO: Forma = ['m12 7.5 2.2 4.2 4.3-2.2-1.2 4.4 4.2 1.7-4.3 1.6 1.3 4.5-4.4-2.3L12 23l-2.1-3.6-4.4 2.3 1.3-4.5-4.3-1.6 4.2-1.7-1.2-4.4 4.3 2.2Z']
export const VETRO: Forma = ['M4 8h16v15H4ZM6 10v4.8h4.8l-1.2-2 1.8-2.8ZM13.2 10l-1.5 2.8 1.3 2h5V10ZM6 16.7V21h3.3l1.6-2.2-.7-2.1ZM12.7 16.7l.8 2.1L11.2 21H18v-4.3Z']

// Salute
export const CUORE: Forma = ['M12 23 3.8 15.2A4.6 4.6 0 0 1 12 9.5a4.6 4.6 0 0 1 8.2 5.7Z']
export const CROCE_MEDICA: Forma = ['M9 8h6v4.5h5.5v6H15V21l-2 2H9v-4.5H3.5v-6H9Z']
export const CEROTTO: Forma = ['M4.3 17 12.8 8.5a3.8 3.8 0 0 1 5.4 5.4l-8.5 8.5A3.8 3.8 0 0 1 4.3 17ZM11.3 12.5l-3 3 3 3 3-3Z', 'M10.3 14.5h2v2h-2Z']
export const OSSO: Forma = ['m7.2 16.8 6.2-5.6a2.1 2.1 0 1 1 3.7-1 2.1 2.1 0 1 1 .2 3.8l-6.2 5.6a2.1 2.1 0 1 1-3.7 1 2.1 2.1 0 1 1-.2-3.8Z']

// Lavoro e mestieri
export const BORSA: Forma = ['M8.5 12V9.7A1.7 1.7 0 0 1 10.2 8h3.6a1.7 1.7 0 0 1 1.7 1.7V12h-2v-2h-3v2Z', 'M5 11.5h14a1.5 1.5 0 0 1 1.5 1.5v3h-17v-3A1.5 1.5 0 0 1 5 11.5ZM3.5 17.5h17v2L17 23H5a1.5 1.5 0 0 1-1.5-1.5Z']
export const BILANCIA: Forma = ['M11 7.5h2v2h7.5v2H13V21h3l2 2H6l2-2h3v-9.5H3.5v-2H11Z', 'm5.5 11.2-3.7 6.1a3.7 3.2 0 0 0 7.4 0ZM18.5 11.2l-3.7 6.1a3.7 3.2 0 0 0 7.4 0ZM5.5 14l1.9 3.1H3.6ZM18.5 14l1.9 3.1h-3.8Z']
export const CHIAVE_INGLESE: Forma = ['m14.5 7.8-.7 3.8 2.6 2.6 3.8-.7a5.3 5.3 0 0 1-6.9 4.3l-5 5a2.4 2.4 0 0 1-3.4-3.4l5-5a5.3 5.3 0 0 1 4.6-6.6Z']
export const MARTELLO: Forma = ['M3.5 8h11.5c3.3 0 5.3 2 6.2 5-1.8-1.6-3.7-2-6.2-1.5v1.3H3.5Z', 'M7.8 12.8h4V21l-2 2h-2Z']
export const FULMINE: Forma = ['M13.8 7.4 5.5 16.8h5L9.5 23l9-10h-5.2Z']
export const POSATE: Forma = ['M4.5 7.8h1.7v4.7h1.2V7.8h1.7v4.7h1.2V7.8H12v6.5L9.8 16v7h-3v-7l-2.3-1.7Z', 'M19.5 7.6V23h-3v-5.5H14v-4.4a5.5 5.5 0 0 1 5.5-5.5Z']
export const FORBICI: Forma = ['M5.2 8.5 7.3 8l9.4 10-2.3 2.2Z', 'M18.8 8.5 16.7 8 7.3 18l2.3 2.2Z', 'M3.5 19.7a3.3 3.3 0 1 1 6.6 0 3.3 3.3 0 0 1-6.6 0ZM5.5 19.7a1.3 1.3 0 1 0 2.6 0 1.3 1.3 0 0 0-2.6 0ZM13.9 19.7a3.3 3.3 0 1 1 6.6 0 3.3 3.3 0 0 1-6.6 0ZM15.9 19.7a1.3 1.3 0 1 0 2.6 0 1.3 1.3 0 0 0-2.6 0Z']
export const STAMPANTE: Forma = ['M7 7.8h10v3.5H7ZM2.5 12.3h19V19L19 21h-1v-3.5H6V21H2.5ZM7 18.7h10V23H7Z']
export const PACCO: Forma = ['M11.3 23 3 19.2v-7.4l8.3 3.7ZM12.7 23l8.3-3.8v-7.4l-8.3 3.7Z', 'M3.5 10.5 7 8.9l8.3 3.8-3.3 1.5ZM8.8 8.1 12 7.4l8.5 3.1-3.4 1.5Z']
export const SQUADRA: Forma = ['M4 7.8 19.8 23H4ZM7.5 15.5v4h4.2Z']
export const CALICE: Forma = ['M3.5 8h17L13 16.2V21h4l-1 2H7v-2h4v-4.8ZM8 10l1.8 2h4.4l1.8-2Z']
export const MEGAFONO: Forma = ['M19 7.5v14l-8-3H9.7l1.5 4.5H7.6l-1.5-4.5H4.5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2H11Z', 'M20 12.2a2.5 2.5 0 0 1 0 4.6Z']
export const TROFEO: Forma = ['M6.5 8h11v4a5.5 5.5 0 0 1-4.5 5.4V20h3.5l1 3h-11l1-3H11v-2.6A5.5 5.5 0 0 1 6.5 12Z', 'M2.5 9.2h4v2h-2a3 3 0 0 0 3 3v2a5 5 0 0 1-5-5ZM21.5 9.2h-4v2h2a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5Z']

// Natura, meteo, animali
export const ONDA: Forma = ['M2.5 23v-4.5c0-6.5 4-10.7 9.3-10.7 3.6 0 6.5 2 7.2 5.2-1.5-1.3-4-1.5-5.2.2-1.6 2.2.2 5.2 3.2 5.2 1.8 0 3.3-.7 4.5-1.8V23Z']
export const GOCCIA: Forma = ['M12 7.4c3 3.3 6.5 6.8 6.5 9.4a6.5 6.2 0 0 1-13 0c0-2.6 3.5-6.1 6.5-9.4Z']
export const FIAMMA: Forma = ['M12.5 7.3c.5 4 6.5 5.5 6.5 10.2a7 5.8 0 0 1-14 0c0-2.8 1.5-4.7 2.8-6 0 2 1 3.2 2.2 3.5-.8-3 0-6 2.5-7.7ZM12 16.3c-1.5 1.3-2.4 2.3-2.4 3.2a2.4 2 0 0 0 4.8 0c0-.9-.9-1.9-2.4-3.2Z']
export const PIOGGIA: Forma = ['M6.5 17.5a3.6 3.6 0 0 1-.7-7.1 5.4 5.4 0 0 1 9.9.1 3.5 3.5 0 1 1 1.8 7Z', 'M6.5 19h2.3l-1.4 4H5.1ZM11.3 19h2.3l-1.4 4H9.9ZM16.1 19h2.3L17 23h-2.3Z']
export const GRANDINE: Forma = ['M6.5 16.5a3.2 3.2 0 0 1-.7-6.3 5.2 5.2 0 0 1 9.8.1 3.1 3.1 0 1 1 1.9 6.2Z', 'm5.5 17.8 2.2 1.5v2.5l-2.2 1.2-2.2-1.2v-2.5ZM12 17.8l2.2 1.5v2.5L12 23l-2.2-1.2v-2.5ZM18.5 17.8l2.2 1.5v2.5L18.5 23l-2.2-1.2v-2.5Z']
export const VENTO: Forma = ['M2.5 8h19l-2 3h-15ZM6 12.3h12.5l-2 3h-9ZM9 16.6h7l-1.8 2.7h-4ZM11.5 20.5h3.2L11.8 23Z']
export const NEVE: Forma = ['M10.9 7.5h2.2V23h-2.2Z', 'm4.7 12.3 1.1-1.9 13.5 7.8-1.1 1.9Z', 'm4.7 18.2 13.5-7.8 1.1 1.9-13.5 7.8Z', 'm8 9.5 1.3-1.4L12 10.5l2.7-2.4L16 9.5l-4 3.6ZM8 21l1.3 1.4L12 20l2.7 2.4L16 21l-4-3.6Z']
export const FRANA: Forma = ['M2.5 23V9.5l19 13.5Z', 'M11.5 8.2 14.8 9l.4 3.2-2.8 1.2-2.2-2.5ZM17.5 12.7l3 .8.7 3-2.8 1-2-2.2Z']
export const TERREMOTO: Forma = ['M2.5 13.2 12 7.5l1.2.8-2.4 4.4 3 2.6-3.3 3.4 1 4.3H4.5v-8.5h-2ZM14.8 9.2l6.7 4v1.3h-2V23h-5.8l-1-4 3.5-3.8-3.2-2.8Z']
export const SPIGA: Forma = ['M11 13h2v10h-2Z', 'M12 7.3c2.3 2 2.3 4.2 0 6-2.3-1.8-2.3-4 0-6ZM11 17.2c-4.3.2-6.3-2-6.2-5.5 3.8.2 6 2.1 6.2 5.5ZM13 17.2c4.3.2 6.3-2 6.2-5.5-3.8.2-6 2.1-6.2 5.5ZM11 22c-4.3.2-6.3-1.7-6.2-5 3.8.2 6 2 6.2 5ZM13 22c4.3.2 6.3-1.7 6.2-5-3.8.2-6 2-6.2 5Z']
export const GERMOGLIO: Forma = ['M11 14.5h2V22h-2Z', 'M6.5 20.8h11L16 23H8Z', 'M11 16.5c-5.5.3-8.2-2.8-8-8 5.2-.2 8.3 2.5 8 8ZM13 15c-.3-4.7 2.7-7 8-6.8.2 4.7-2.8 7.1-8 6.8Z']
export const ZAMPA: Forma = ['M2.8 14.3a2.2 2.6 0 1 1 4.4 0 2.2 2.6 0 0 1-4.4 0ZM7.2 10.3a2.2 2.6 0 1 1 4.4 0 2.2 2.6 0 0 1-4.4 0ZM12.4 10.3a2.2 2.6 0 1 1 4.4 0 2.2 2.6 0 0 1-4.4 0ZM16.8 14.3a2.2 2.6 0 1 1 4.4 0 2.2 2.6 0 0 1-4.4 0Z', 'M12 14.5c3 0 6 4 6 6.5 0 1.8-1.5 2.2-3 2-1.2-.2-2-.5-3-.5s-1.8.3-3 .5c-1.5.2-3-.2-3-2 0-2.5 3-6.5 6-6.5Z']
export const CANE: Forma = ['M8 8.3h8l1.5 3v6L14.5 22h-5l-3-4.7v-6ZM8.5 13v1.9h2V13ZM13.5 13v1.9h2V13ZM10.3 17.5l1.7 2.3 1.7-2.3Z', 'M6.8 8.5 2.8 11v6.5l3-1.2ZM17.2 8.5l4 2.5v6.5l-3-1.2Z']
export const SALVAGENTE: Forma = ['M12 7.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5ZM12 12a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM11 8.7v2.4a4.3 4.3 0 0 1 2 0V8.7a7 7 0 0 0-2 0ZM11 21.8v-2.4a4.3 4.3 0 0 0 2 0v2.4a7 7 0 0 1-2 0ZM5.4 14.2h2.4a4.3 4.3 0 0 0 0 2H5.4a7 7 0 0 1 0-2ZM18.6 14.2h-2.4a4.3 4.3 0 0 1 0 2h2.4a7 7 0 0 0 0-2Z']
export const OMBRELLO: Forma = ['M2.5 16a9.5 8.3 0 0 1 19 0c-2.1-1.8-4.2-1.8-6.3 0-2.2-1.8-4.3-1.8-6.4 0-2.1-1.8-4.2-1.8-6.3 0Z', 'M11 15.5h2v5a2.7 2.7 0 0 1-5.4 0h2a.7.7 0 0 0 1.4 0Z']

// Cyber e sicurezza
export const LUCCHETTO: Forma = ['M7.5 14v-2a4.5 4.5 0 0 1 9 0v2h-2.2v-2a2.3 2.3 0 0 0-4.6 0v2Z', 'M5 13.5h14v6.5l-3 3H5ZM12 15.5a1.6 1.6 0 0 0-.9 2.9V21h1.8v-2.6a1.6 1.6 0 0 0-.9-2.9Z']
export const LUCCHETTO_APERTO: Forma = ['M12 14v-2a4.6 4.6 0 0 1 9.2 0v1.5H19V12a2.4 2.4 0 0 0-4.8 0v2Z', 'M3 13.5h13.5v6.5l-3 3H3ZM9.75 15.5a1.6 1.6 0 0 0-.9 2.9V21h1.8v-2.6a1.6 1.6 0 0 0-.9-2.9Z']
export const CHIAVE: Forma = ['M2.5 15.2a5 5 0 0 1 9.7-1.7h9.3V17h-1.8v2.8h-3V17h-4.5a5 5 0 0 1-9.7-1.8ZM5.5 15.2a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z']
export const COMPUTER: Forma = ['M4.5 8.5h15v11h-15ZM6.8 10.8v6.4h10.4v-6.4ZM2.5 20.5h19L19 23H2.5Z']
export const AMO: Forma = ['M14 7.5h3v3h-.5v7.2a5.6 5.3 0 0 1-11.2 0v-4.5l4.2 4H7.9v.5a3 2.7 0 0 0 6 0v-7.2H14Z']
export const DATI: Forma = ['M4 10.5a8 3 0 0 1 16 0 8 3 0 0 1-16 0Z', 'M4 12.8a8 3 0 0 0 16 0v3.5a8 3 0 0 1-16 0ZM4 18.5a8 3 0 0 0 16 0V20a8 3 0 0 1-16 0Z']
export const STOP: Forma = ['M8.8 7.5h6.4l4.5 4.5v6.5L15.2 23H8.8l-4.5-4.5V12ZM7.5 14v2.6h9V14Z']
export const PAUSA: Forma = ['M5.5 8h5v15h-5ZM13.5 8h5v12.5L16 23h-2.5Z']
export const SIRENA: Forma = ['M6.5 19.5v-3.8a5.5 5.5 0 0 1 11 0v3.8ZM4.5 20.8h15L17.5 23h-13Z', 'M11 7.3h2v1.8h-2ZM3 9.5l1.4-1.4 2 2L5 11.5ZM21 9.5l-1.4-1.4-2 2 1.4 1.4Z']
export const CARTA: Forma = ['M2.5 9h19v3h-19ZM2.5 14.3h19v5.5L19 22H2.5ZM5.5 17.2v2h5v-2Z']
export const CATENA: Forma = ['M6.8 11h3.7v2.6H6.8a1.7 1.7 0 0 0 0 3.4h3.7v2.6H6.8a4.3 4.3 0 0 1 0-8.6ZM17.2 11a4.3 4.3 0 0 1 0 8.6h-3.7V17h3.7a1.7 1.7 0 0 0 0-3.4h-3.7V11Z', 'M8 14.2h8v2.2H8Z']

// Documenti, numeri, soldi
export const DOCUMENTO: Forma = ['M5.5 8h9.5l3.5 3.5V23h-13ZM8 12.5v1.9h8v-1.9ZM8 15.8v1.9h8v-1.9ZM8 19.1V21h5v-1.9Z']
export const REGOLE: Forma = ['M5.5 8h9.5l3.5 3.5V23h-13ZM8 16l1.5-1.5 1.8 1.8 3.7-3.8 1.5 1.5-5.2 5.3Z']
export const ELENCO: Forma = ['M5 10h2v3h10v-3h2v10.5L16.5 23H5ZM7.2 15.5l1.4-1.2 1 1 1.8-1.8 1.2 1.2-3 3ZM13.3 15.2v1.8h3.5v-1.8ZM7.5 19v1.8h2V19ZM11 19v1.8h5.8V19Z', 'M8 12V9.2h2a2 2 0 0 1 4 0h2V12Z']
export const RICEVUTA: Forma = ['M5 8h14v15l-2.3-1.8-2.4 1.8-2.3-1.8L9.7 23l-2.4-1.8L5 23ZM8 11v2h8v-2ZM8 15.3v2h5.5v-2Z']
export const SIGILLO: Forma = ['M4.5 8h15v10.2a4.5 4.5 0 0 0-8.3 1.3H4.5ZM7.5 11v2h9v-2Z', 'M12.3 19a3.2 3.2 0 1 1 6.4 0 3.2 3.2 0 0 1-6.4 0Z', 'M13.2 20.5h2v3l-1-.7-1 .7ZM15.8 20.5h2v3l-1-.7-1 .7Z']
export const GIORNALE: Forma = ['M3 8.5h15V23H5.5A2.5 2.5 0 0 1 3 20.5ZM5.2 10.3v2.4h10.6v-2.4ZM5.2 14.2v4.3h4.5v-4.3ZM11 14.2v1.6h4.8v-1.6ZM11 17v1.5h4.8V17ZM5.2 19.8v1.5h10.6v-1.5Z', 'M19 12h2.5v9.2l-1.8 1.8H19Z']
export const LIBRO: Forma = ['M2.5 8.5c3.5-.7 6.3 0 8.8 2V23c-2.5-2-5.3-2.7-8.8-2ZM21.5 8.5c-3.5-.7-6.3 0-8.8 2V23c2.5-2 5.3-2.7 8.8-2Z']
export const CALENDARIO: Forma = ['M6.2 7.4h3v2h5.6v-2h3v2h3.2v11L18.5 23H3V9.4h3.2ZM5.5 13.7v6.8h12.8v-6.8ZM7.5 15.8h3.2v2.8H7.5Z']
export const OROLOGIO: Forma = ['M12 7.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5ZM10.8 10.5v5.8h5.8v-2.2h-3.5v-3.6Z']
export const CRONOMETRO: Forma = ['M9.5 7.3h5v1.8h-5ZM18 9.5l1.4-1.2 2 2.3-1.4 1.2Z', 'M12 10a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13ZM10.9 12.3v5.3h4.6v-2.1h-2.4v-3.2Z']
export const RICAMBIO: Forma = ['M3 9.8h12V7.5l6 4-6 4v-2.3H3ZM21 17.3H9V15l-6 4 6 4v-2.3h12Z']
export const BARRE: Forma = ['M3.5 18 8 16v7H3.5ZM9.75 13.5l4.5-2V23h-4.5ZM16 11l4.5-2v14H16Z']
export const CRESCITA: Forma = ['M2.5 20 9 13.5l3.5 3.5 4.3-4.3-2.3-2.3h7v7l-2.3-2.3-6.7 6.7L9 18.3 4.8 22.5Z']
export const CALO: Forma = ['M2.5 10.5 9 17l3.5-3.5 4.3 4.3-2.3 2.3h7v-7l-2.3 2.3-6.7-6.7L9 12.2 4.8 8Z']
export const EURO: Forma = ['M12 7.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5ZM16.3 11.6a5 5 0 0 0-7.8 1.5H6.8v1.6H8v1.2H6.8v1.6h1.7a5 5 0 0 0 7.8 1.5l-1.3-1.4a3 3 0 0 1-4.4-.1h2.9v-1.6H10v-1.2h3.9v-1.6h-3.3a3 3 0 0 1 4.4-.1Z']
export const MONETE: Forma = ['M2.5 10.5a5.5 2.6 0 0 1 11 0v1.2a5.5 2.6 0 0 1-11 0ZM2.5 14a5.5 2.6 0 0 0 8.3 1.9 4 4 0 0 0-.8 2.1v.6a5.5 2.6 0 0 1-7.5-2.3ZM2.5 18.7a5.5 2.6 0 0 0 7.5 2.1v2a5.5 2.6 0 0 1-7.5-2.4Z', 'M11 17.2a5.25 2.5 0 0 1 10.5 0v1a5.25 2.5 0 0 1-10.5 0Z', 'M11 20.3a5.25 2.5 0 0 0 10.5 0v.5a5.25 2.5 0 0 1-10.5 0Z']
export const STELLA: Forma = ['m12 7.4 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8Z']

// Azioni e segni
export const ANALISI: Forma = ['M11 7.5a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM7.2 17.5h2v-3h-2ZM10 17.5h2v-6.7h-2ZM12.8 17.5h2v-4.7h-2Z', 'm16.9 17.1 4.6 4.2-1.9 1.9-4.6-4.2Z']
export const LENTE: Forma = ['M10.5 7.5a6.8 6.8 0 1 1 0 13.6 6.8 6.8 0 0 1 0-13.6ZM10.5 10.3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z', 'm16.2 16.8 5.1 4.4-2 2-5.1-4.4Z']
export const BUSSOLA: Forma = ['M12 7.6a7.8 7.8 0 1 0 0 15.6 7.8 7.8 0 0 0 0-15.6ZM12 9.8a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2Z', 'm15.4 12-1.8 5-5 1.8 1.8-5ZM12 14.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z']
export const BANDIERA: Forma = ['M4.5 7.5h2.8V23H4.5ZM7.3 8h12.2L16 12.5l3.5 4.5H7.3Z']
export const SCARICA: Forma = ['M10.3 7.5h3.4V13h3.8L12 19l-5.5-6h3.8ZM4 18h2.5v2.8h11V18H20v2.5L17.5 23H4Z']
export const INVIA: Forma = ['M2.5 14 21.5 7.6 16 23l-4.2-6.2 5.2-5.3-7 4.2Z']
export const IDEA: Forma = ['M12 7.4a6 6 0 0 1 3.5 10.9v1.2h-7v-1.2A6 6 0 0 1 12 7.4ZM9 20.7h6l-1 2.3h-4Z']
export const DOMANDA: Forma = ['M12 7.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5ZM8.7 12.8h2.2a1.2 1.2 0 1 1 1.8 1.1c-1.1.6-1.8 1.3-1.8 2.6v.5h2.2v-.4c0-.5.4-.8 1-1.2a3.2 3.2 0 1 0-5.4-2.6ZM10.9 18.3v2.2h2.2v-2.2Z']
export const ALLERTA: Forma = ['M12 7.5 21.5 23h-19ZM10.9 12.5h2.2v5h-2.2ZM10.9 19h2.2v2.2h-2.2Z']
export const CONFERMA: Forma = ['M12 7.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5ZM6.8 15.5l3.8 3.8 6.8-6.8-1.6-1.6-5.2 5.2-2.2-2.2Z']
export const TELEFONO: Forma = ['M6 8h4l1.5 4.5-2.2 1.6a9 9 0 0 0 4.6 4.6l1.6-2.2L20 18v4l-1 1C10 23 4 16.5 4 10Z']
export const POSTA: Forma = ['M2.5 9h19L12 16.2ZM2.5 11.5 12 18.7l9.5-7.2v8.2L19 22.2H2.5Z']
export const FUMETTO: Forma = ['M5 8h14a2.5 2.5 0 0 1 2.5 2.5v6.3a2.5 2.5 0 0 1-2.5 2.5h-7.5L6.5 23v-3.7H5a2.5 2.5 0 0 1-2.5-2.5v-6.3A2.5 2.5 0 0 1 5 8ZM6.2 12.6v2.2h2.2v-2.2ZM10.9 12.6v2.2h2.2v-2.2ZM15.6 12.6v2.2h2.2v-2.2Z']
export const BISCOTTO: Forma = ['M12 7.5a3 3 0 0 0 3.5 3.5 3 3 0 0 0 4.2 2.7A7.75 7.75 0 1 1 12 7.5ZM8 12v2.4h2.4V12ZM7.5 17.2v2h2v-2ZM12.8 16.3v2.6h2.6v-2.6Z']
export const FRECCIA: Forma = ['M3 13.6h11V9.3l7.5 6.2-7.5 6.2v-4.3H3Z']
export const ESTERNO: Forma = ['M9.5 8h11v11l-3.8-3.8-8 8L5.3 19.8l8-8Z']
export const SPUNTA: Forma = ['m3 15.7 2.4-2.4 4.2 4.2 9-9L21 10.9 9.6 22.3Z']
export const CROCE: Forma = ['m6.3 8.6 5.7 5.7 5.7-5.7 2.1 2.1-5.7 5.7 5.7 5.7-2.1 1.5-5.7-5.1-5.7 5.1-2.1-1.5 5.7-5.7-5.7-5.7Z']

// Quanto sei coperto: sempre con l'etichetta accanto
export const LIVELLO_0: Forma = ['M3 17h5v6H3ZM4.7 18.7v2.6h1.6v-2.6ZM9.5 12.5h5V23h-5ZM11.2 14.2v7.1h1.6v-7.1ZM16 8h5v15h-5ZM17.7 9.7v11.6h1.6V9.7Z']
export const LIVELLO_1: Forma = ['M3 17h5v6H3ZM9.5 12.5h5V23h-5ZM11.2 14.2v7.1h1.6v-7.1ZM16 8h5v15h-5ZM17.7 9.7v11.6h1.6V9.7Z']
export const LIVELLO_2: Forma = ['M3 17h5v6H3ZM9.5 12.5h5V23h-5ZM16 8h5v15h-5ZM17.7 9.7v11.6h1.6V9.7Z']
export const LIVELLO_3: Forma = ['M3 17h5v6H3ZM9.5 12.5h5V23h-5ZM16 8h5v15h-5Z']
