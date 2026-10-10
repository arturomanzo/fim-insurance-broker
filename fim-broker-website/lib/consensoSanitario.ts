/**
 * Consenso esplicito ai dati sulla salute per l'Agente Sinistri AI
 * (art. 9, par. 2, lett. a, GDPR).
 *
 * Nei sinistri con feriti chi scrive in chat può raccontare lesioni e cure, e
 * quei messaggi passano dal modello di IA. La DPIA del 10/10/2026 (misura M1)
 * chiede il consenso prima della chat: la chat non parte senza, e chi non vuole
 * darlo ha telefono e WhatsApp sulla stessa pagina.
 *
 * Il flag viaggia con ogni richiesta e il server lo ricontrolla: la casella nel
 * browser da sola si aggira con una fetch.
 */
export const CONSENSO_SANITARIO_TESTO =
  "Acconsento al trattamento dei dati sulla mia salute o su quella di altre persone che dovessi indicare per la pratica, anche tramite l'assistente IA, come descritto nell'informativa privacy (art. 9 GDPR). Senza consenso puoi chiamarci o scriverci su WhatsApp."

/** Vero solo per un `true` esplicito: una stringa o un numero non bastano. */
export function haConsensoSanitario(valore: unknown): valore is true {
  return valore === true
}
