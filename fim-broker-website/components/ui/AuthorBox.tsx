import Image from 'next/image'
import Link from 'next/link'
import type { Author } from '@/lib/authors'

interface AuthorBoxProps {
  author: Author
  /** Data ISO della pubblicazione, mostrata sotto il nome per trust */
  publishedDate?: string
  /** Data ISO dell'ultima modifica, mostrata se diversa da publishedDate */
  modifiedDate?: string
}

/**
 * Box autore mostrato sotto ogni articolo del blog. Veicola E-E-A-T:
 *
 * - **Experience/Expertise**: ruolo + aree di specializzazione
 * - **Authoritativeness**: credenziale RUI IVASS visibile per gli iscritti
 * - **Trust**: foto reale + link al profilo team della pagina chi-siamo
 *
 * Mantiene coerenza visiva con `Card` ma è componente puro presentazionale.
 */
export default function AuthorBox({ author, publishedDate, modifiedDate }: AuthorBoxProps) {
  const showModified = modifiedDate && modifiedDate !== publishedDate

  return (
    <aside
      className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-gray-50/60"
      aria-label={`Articolo scritto da ${author.name}`}
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
        <Link
          href="/chi-siamo"
          className="flex-shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-200 self-start"
        >
          <Image
            src={author.photo}
            alt={`Foto di ${author.name}, ${author.role}`}
            fill
            className="object-cover"
            sizes="96px"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            Scritto da
          </p>
          <h3 className="text-xl font-black text-primary">
            <Link href="/chi-siamo" className="hover:text-primary-light transition-colors">
              {author.name}
            </Link>
          </h3>
          <p className="text-sm font-semibold text-accent mt-0.5">{author.role}</p>

          <p className="text-gray-700 text-sm leading-relaxed mt-3">{author.bio}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {author.expertise.map((exp) => (
              <span
                key={exp}
                className="text-xs font-semibold text-primary bg-white border border-gray-200 rounded-full px-3 py-1"
              >
                {exp}
              </span>
            ))}
          </div>

          {(author.rui || publishedDate) && (
            <dl className="flex flex-wrap gap-x-6 gap-y-1 mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
              {author.rui && (
                <div className="flex items-center gap-1.5">
                  <dt className="font-semibold">Iscrizione IVASS:</dt>
                  <dd>RUI Sez. B n. {author.rui}</dd>
                </div>
              )}
              {publishedDate && (
                <div className="flex items-center gap-1.5">
                  <dt className="font-semibold">Pubblicato:</dt>
                  <dd>
                    <time dateTime={publishedDate}>
                      {new Date(publishedDate).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </dd>
                </div>
              )}
              {showModified && (
                <div className="flex items-center gap-1.5">
                  <dt className="font-semibold">Aggiornato:</dt>
                  <dd>
                    <time dateTime={modifiedDate}>
                      {new Date(modifiedDate).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>
    </aside>
  )
}
