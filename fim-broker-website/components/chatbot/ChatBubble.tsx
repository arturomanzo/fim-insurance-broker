import { clsx } from 'clsx'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

export default function ChatBubble({ role, content, isStreaming }: ChatBubbleProps) {
  const isUser = role === 'user'

  return (
    <div className={clsx('flex gap-3 mb-4', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {/* Avatar */}
      <div
        className={clsx(
          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold',
          isUser ? 'bg-primary text-white' : 'bg-accent text-primary'
        )}
      >
        {isUser ? 'Tu' : 'F'}
      </div>

      {/* Bubble */}
      <div
        className={clsx(
          'max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-white rounded-tr-sm'
            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
        )}
      >
        {content}
        {isStreaming && (
          <span className="inline-flex gap-1 ml-1">
            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        )}
      </div>
    </div>
  )
}
