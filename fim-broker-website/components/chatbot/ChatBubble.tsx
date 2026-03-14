import React from 'react';
import { clsx } from 'clsx';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export default function ChatBubble({ role, content, isStreaming }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={clsx('flex gap-2 mb-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fim-primary to-fim-light flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
          F
        </div>
      )}
      <div
        className={clsx(
          'max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-gradient-to-br from-fim-primary to-fim-light text-white rounded-tr-sm'
            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
        )}
      >
        <span className="whitespace-pre-wrap">{content}</span>
        {isStreaming && (
          <span className="inline-block w-1 h-4 bg-current ml-0.5 animate-pulse rounded-sm" />
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold shrink-0 mt-0.5">
          Tu
        </div>
      )}
    </div>
  );
}
