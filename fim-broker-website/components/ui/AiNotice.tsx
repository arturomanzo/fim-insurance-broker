import { clsx } from 'clsx'

/**
 * Avviso di trasparenza sull'uso dell'IA (AI Act art. 50).
 *
 * - `variant="bar"`: striscia sottile, pensata per l'intestazione di una chat.
 * - `variant="box"`: riquadro discreto, per report e articoli.
 *
 * Il testo arriva da `lib/ai-disclosure.ts` per restare coerente ovunque.
 */
interface AiNoticeProps {
  text: string
  variant?: 'bar' | 'box'
  className?: string
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 3 9.7 6.7 6 8l3.7 1.3L11 13l1.3-3.7L16 8l-3.7-1.3L11 3Zm7 7-.8 2.2L15 13l2.2.8L18 16l.8-2.2L21 13l-2.2-.8L18 10ZM6 14l-.9 2.6L2.5 17.5l2.6.9L6 21l.9-2.6 2.6-.9-2.6-.9L6 14Z" />
    </svg>
  )
}

export default function AiNotice({ text, variant = 'bar', className }: AiNoticeProps) {
  if (variant === 'box') {
    return (
      <div
        role="note"
        className={clsx(
          'flex items-start gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3',
          className
        )}
      >
        <SparklesIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
      </div>
    )
  }

  return (
    <div
      role="note"
      className={clsx(
        'flex items-center gap-1.5 px-4 py-1.5 bg-gray-50 border-b border-gray-100',
        className
      )}
    >
      <SparklesIcon className="w-3 h-3 text-gray-400 flex-shrink-0" />
      <p className="text-[11px] text-gray-500 leading-tight">{text}</p>
    </div>
  )
}
