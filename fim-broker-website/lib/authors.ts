/**
 * Mappa autori per i post del blog FIM Insurance Broker.
 *
 * Usata per:
 * - Schema JSON-LD `author: Person` sui BlogPosting (E-E-A-T fondamentale
 *   per contenuti YMYL — Your Money Your Life — come le assicurazioni).
 * - Box autore inline sotto ogni articolo.
 * - OpenGraph `article:author`.
 *
 * Ogni autore è una persona reale del team FIM con foto, ruolo, bio e
 * credenziali pubbliche (RUI IVASS per gli intermediari iscritti).
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fimbroker.it'

export interface Author {
  slug: string
  name: string
  role: string
  bio: string
  photo: string
  /** Identificativo RUI IVASS — visibile se la persona è iscritta come intermediario */
  rui?: string
  /** URL alla sezione team della pagina chi-siamo */
  url: string
  /** Profili social verificati (LinkedIn, X, ecc.) — opzionale */
  sameAs?: string[]
  /** Aree di specializzazione (mostrate nel box autore) */
  expertise: string[]
}

export const AUTHORS = {
  'arturo-manzo': {
    slug: 'arturo-manzo',
    name: 'Arturo Manzo',
    role: 'CEO & Fondatore',
    bio: "Fondatore di FIM Insurance Broker nel 2004, oltre 20 anni di esperienza nel brokeraggio assicurativo italiano. Specializzato in polizze aziendali complesse, risk management per PMI e advisory normativo.",
    photo: '/images/team/arturomanzo.jpg',
    rui: 'B000405449',
    url: `${BASE_URL}/chi-siamo#arturo-manzo`,
    expertise: ['Risk Management', 'Polizze Aziendali', 'D&O', 'Compliance IVASS'],
  },
  'gianluca-ferrante-carrante': {
    slug: 'gianluca-ferrante-carrante',
    name: 'Gianluca Ferrante Carrante',
    role: 'Consulente Senior — Privati',
    bio: "Consulente senior specializzato nella protezione di famiglie e privati. Si occupa di polizze auto, casa, vita, salute e viaggio, con un approccio orientato alla relazione di lungo periodo.",
    photo: '/images/team/gianlucaferrantecarrante.jpg',
    url: `${BASE_URL}/chi-siamo#gianluca-ferrante-carrante`,
    expertise: ['Auto & Casa', 'Vita & Salute', 'Polizze Viaggio'],
  },
  'luciano-manzo': {
    slug: 'luciano-manzo',
    name: 'Luciano Manzo',
    role: 'Responsabile Sinistri',
    bio: "Segue i clienti in ogni fase del sinistro, dalla denuncia alla liquidazione. Esperto di RC professionale, tutela legale e contenzioso assicurativo per liberi professionisti.",
    photo: '/images/team/lucianomanzo.jpg',
    url: `${BASE_URL}/chi-siamo#luciano-manzo`,
    expertise: ['Gestione Sinistri', 'RC Professionale', 'Tutela Legale'],
  },
  'nazario-manzo': {
    slug: 'nazario-manzo',
    name: 'Nazario Manzo',
    role: 'Consulente — Aziende & PMI',
    bio: "Specializzato in soluzioni assicurative per piccole e medie imprese. Aiuta gli imprenditori a proteggere il patrimonio aziendale con polizze cyber, RC, welfare per dipendenti e coperture di filiera.",
    photo: '/images/team/nazariomanzo.jpg',
    url: `${BASE_URL}/chi-siamo#nazario-manzo`,
    expertise: ['Cyber Risk', 'Flotte Aziendali', 'Welfare Aziendale'],
  },
} as const satisfies Record<string, Author>

export type AuthorSlug = keyof typeof AUTHORS

export const DEFAULT_AUTHOR: AuthorSlug = 'arturo-manzo'

/**
 * Ritorna l'autore per slug, con fallback al default (CEO) se lo slug
 * è mancante o non valido. Mai undefined: ogni post ha sempre un autore
 * — fondamentale per E-E-A-T.
 */
export function getAuthor(slug: string | undefined): Author {
  if (slug && slug in AUTHORS) {
    return AUTHORS[slug as AuthorSlug]
  }
  return AUTHORS[DEFAULT_AUTHOR]
}

/**
 * Costruisce un blocco Person schema.org valido per inclusione come
 * `author` in BlogPosting, NewsArticle, ecc. Include credenziali pubbliche
 * (RUI IVASS) come `identifier` quando disponibili.
 */
export function buildPersonSchema(author: Author) {
  const ORG_ID = `${BASE_URL}/#organization`
  return {
    '@type': 'Person',
    '@id': author.url,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: author.photo.startsWith('http') ? author.photo : `${BASE_URL}${author.photo}`,
    url: author.url,
    worksFor: { '@id': ORG_ID },
    knowsAbout: author.expertise,
    ...(author.rui
      ? {
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'IVASS-RUI',
            value: author.rui,
          },
        }
      : {}),
    ...(author.sameAs ? { sameAs: author.sameAs } : {}),
  }
}
