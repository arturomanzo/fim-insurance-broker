/**
 * Recapiti FIM Insurance Broker condivisi tra più file
 * (pagina Contatti, footer, pagina Sinistri, pagina Reclami).
 * Estratti qui per evitare duplicazioni e tenere un'unica fonte di verità.
 */

export const TEL = '+39 06 96883381'
export const TEL_HREF = 'tel:+390696883381'
export const FAX = '06 45220215'
export const PEC = 'fiminsurancebrokersas@pec.it'

export const EMAIL_INFO = 'info@fimbroker.it'
export const EMAIL_RCA = 'rca@fimbroker.it'
export const EMAIL_SINISTRI = 'sinistri@fimbroker.it'
export const EMAIL_RECLAMI = 'reclami@fimbroker.it'

/**
 * Canali email dedicati, in ordine di esposizione al pubblico.
 * Usati per generare le card nella pagina Contatti.
 */
export const EMAIL_CHANNELS = [
  {
    email: EMAIL_INFO,
    title: 'Informazioni e preventivi',
    desc: 'Richieste generali, preventivi e consulenza assicurativa.',
  },
  {
    email: EMAIL_RCA,
    title: 'Polizze Auto (RCA)',
    desc: 'Preventivi e gestione delle coperture auto e veicoli.',
  },
  {
    email: EMAIL_SINISTRI,
    title: 'Sinistri',
    desc: 'Apertura, denuncia e gestione dei sinistri.',
  },
  {
    email: EMAIL_RECLAMI,
    title: 'Reclami',
    desc: 'Reclami formali ai sensi del Reg. IVASS 40/2018.',
  },
] as const
