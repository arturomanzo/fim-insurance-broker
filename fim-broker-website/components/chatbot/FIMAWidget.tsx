'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { clsx } from 'clsx';
import ChatBubble from './ChatBubble';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const QUICK_CHIPS = [
  'RC Auto',
  'Assicurazione casa',
  'Preventivo',
  'Dove siete?',
];

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Ciao! Sono FIMA, l\'assistente AI di FIM Insurance Broker. 👋\n\nSono qui per aiutarti con informazioni sui nostri servizi assicurativi. Come posso aiutarti oggi?',
};

export default function FIMAWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: userText.trim(),
      };

      const assistantId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setInputValue('');
      setIsLoading(true);

      // Build conversation history for API (exclude welcome message and system messages)
      const conversationHistory = [
        ...messages.filter((m) => m.id !== 'welcome'),
        userMessage,
      ].map((m) => ({ role: m.role, content: m.content }));

      try {
        abortRef.current = new AbortController();

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: conversationHistory }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`Errore server: ${response.status}`);
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  accumulated += parsed.text;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: accumulated, isStreaming: true }
                        : m
                    )
                  );
                }
              } catch {
                // skip malformed JSON
              }
            }
          }
        }

        // Mark streaming done
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, isStreaming: false } : m
          )
        );
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    'Mi dispiace, si è verificato un errore. Riprova tra qualche momento o contattaci direttamente.',
                  isStreaming: false,
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [isLoading, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleChip = (chip: string) => {
    sendMessage(chip);
  };

  const handleClose = () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-fim-primary to-fim-light p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-fim-accent flex items-center justify-center font-bold text-fim-primary text-lg shadow">
              F
            </div>
            <div className="flex-grow">
              <div className="text-white font-bold text-sm">
                FIMA – FIM Insurance Broker
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-blue-100 text-xs">Online</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors p-1"
              aria-label="Chiudi chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-1 bg-gray-50">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                isStreaming={msg.isStreaming}
              />
            ))}

            {/* Typing indicator */}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fim-primary to-fim-light flex items-center justify-center text-white text-xs font-bold">
                  F
                </div>
                <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips (only show near start) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 flex flex-wrap gap-2 bg-gray-50 border-t border-gray-100">
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChip(chip)}
                  disabled={isLoading}
                  className="text-xs px-3 py-1.5 rounded-full bg-fim-primary/10 text-fim-primary hover:bg-fim-primary hover:text-white border border-fim-primary/20 transition-all duration-200 disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-gray-100 flex gap-2 items-end"
          >
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrivi un messaggio..."
              rows={1}
              disabled={isLoading}
              className="flex-grow resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-fim-light focus:ring-1 focus:ring-fim-light disabled:bg-gray-50 max-h-24 overflow-y-auto"
              style={{ lineHeight: '1.4' }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={clsx(
                'p-2.5 rounded-xl transition-all duration-200 shrink-0',
                inputValue.trim() && !isLoading
                  ? 'bg-fim-primary text-white hover:bg-fim-light shadow-md'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              )}
              aria-label="Invia"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300',
          'bg-gradient-to-br from-fim-primary to-fim-light hover:shadow-2xl hover:scale-110',
          isOpen && 'rotate-0'
        )}
        aria-label={isOpen ? 'Chiudi FIMA' : 'Apri FIMA chat'}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <div className="relative">
            <Bot size={26} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-fim-accent rounded-full border-2 border-white" />
          </div>
        )}
      </button>
    </>
  );
}
