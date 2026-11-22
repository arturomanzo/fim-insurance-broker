/*
 * Le emoji non si mostrano sul sito. Nel codice le ferma lib/emoji.test.ts; qui si
 * puliscono i testi che arrivano già pronti, cioè le risposte dei due assistenti.
 * I simboli di testo (© ® ™ → •) restano.
 */

const EMOJI =
  /(?![©®™↔↕])(?:\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]|[✓✔✕✖✗✘])[\u{FE0F}\u{20E3}\u{1F3FB}-\u{1F3FF}]*(?:\u{200D}\p{Extended_Pictographic}\u{FE0F}?)*[ \t]?/gu

export function senzaEmoji(testo: string): string {
  return testo.replace(EMOJI, '')
}

export type Segno = 'si' | 'no' | 'attenzione'

const SEGNI: Record<string, Segno> = { '✅': 'si', '❌': 'no', '⚠': 'attenzione' }

/**
 * ✅ ❌ ⚠️ a inizio riga non sono decorazioni: dicono coperto, escluso, attenzione.
 * Si staccano dal testo e chi disegna la riga ci mette l'icona giusta.
 */
export function leggiSegno(riga: string): { segno: Segno | null; testo: string } {
  const m = riga.match(/^\s*(?:[-*•]\s*)?(✅|❌|⚠)️?\s*/u)
  return m
    ? { segno: SEGNI[m[1]], testo: senzaEmoji(riga.slice(m[0].length)) }
    : { segno: null, testo: senzaEmoji(riga) }
}
