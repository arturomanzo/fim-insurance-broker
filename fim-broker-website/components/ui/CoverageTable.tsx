import type { Coverage } from '@/lib/services'

interface CoverageTableProps {
  coverage: Coverage
  /** Etichetta usata negli aria-label e nello screen-reader caption */
  serviceName: string
}

/**
 * Tabella comparativa "Cosa copre / Cosa NON copre" per pagine servizio.
 *
 * AEO: la struttura table semantica con header riga "Cosa copre/Cosa NON
 * copre" è un forte candidato a Featured Snippet tabellare su query del
 * tipo "cosa copre la polizza X" o "polizza X esclusioni". Mantenere
 * il rendering come `<table>` (non flex/grid) è importante perché Google
 * estrae lo snippet leggendo i `<th>`/`<td>`.
 */
export default function CoverageTable({ coverage, serviceName }: CoverageTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <table className="w-full text-left">
        <caption className="sr-only">
          Tabella comparativa: cosa copre e cosa non copre la {serviceName}
        </caption>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th
              scope="col"
              className="w-1/2 px-5 py-4 text-sm font-bold text-primary border-r border-gray-200"
            >
              <span className="inline-flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cosa copre
              </span>
            </th>
            <th scope="col" className="w-1/2 px-5 py-4 text-sm font-bold text-primary">
              <span className="inline-flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-red-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cosa NON copre
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Itera in parallelo: rendiamo righe pari = covered, dispari = notCovered
              non funziona perché le due liste possono avere lunghezze diverse.
              Soluzione: una riga per ogni indice, con valore o stringa vuota. */}
          {Array.from({
            length: Math.max(coverage.covered.length, coverage.notCovered.length),
          }).map((_, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-b-0 align-top">
              <td className="px-5 py-3 text-sm text-gray-700 border-r border-gray-100">
                {coverage.covered[i] && (
                  <span className="inline-flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true">
                      ✓
                    </span>
                    {coverage.covered[i]}
                  </span>
                )}
              </td>
              <td className="px-5 py-3 text-sm text-gray-700">
                {coverage.notCovered[i] && (
                  <span className="inline-flex items-start gap-2">
                    <span className="text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true">
                      ✗
                    </span>
                    {coverage.notCovered[i]}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {coverage.note && (
        <p className="px-5 py-4 text-xs text-gray-500 bg-gray-50 border-t border-gray-100 leading-relaxed">
          {coverage.note}
        </p>
      )}
    </div>
  )
}
