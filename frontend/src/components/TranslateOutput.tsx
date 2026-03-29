import { useState } from 'react'
import type { TranslationStatus } from '@/types'

interface TranslateOutputProps {
  status: TranslationStatus
  translation: string | null
  unknownWords: string[]
  error: string | null
}

export function TranslateOutput({ status, translation, unknownWords, error }: TranslateOutputProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!translation) return
    await navigator.clipboard.writeText(translation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 p-5 flex flex-col gap-4"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
          日本語
        </p>
        {translation && (
          <button
            onClick={handleCopy}
            className="
              bg-neutral-100 text-neutral-600
              px-3 py-1 rounded-lg
              text-xs font-medium
              hover:bg-neutral-200 transition-all duration-150
            "
          >
            {copied ? '✓ コピー済み' : 'コピー'}
          </button>
        )}
      </div>

      <div className="min-h-[200px] flex flex-col justify-start">
        {status === 'loading' && (
          <div className="space-y-3 pt-1">
            {[100, 75, 50].map(w => (
              <div
                key={w}
                className="h-3.5 bg-neutral-100 rounded-full animate-pulse"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        )}

        {status === 'error' && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {status === 'success' && translation && (
          <div className="space-y-4">
            <p className="text-sm text-neutral-900 leading-relaxed whitespace-pre-wrap">
              {translation}
            </p>
            {unknownWords.length > 0 && (
              <div className="pt-2 border-t border-neutral-100">
                <p className="text-xs text-neutral-400 mb-2">未知の単語</p>
                <div className="flex flex-wrap gap-1.5">
                  {unknownWords.map(word => (
                    <span
                      key={word}
                      className="text-xs bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-lg"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {status === 'idle' && (
          <p className="text-sm text-neutral-400">翻訳結果がここに表示されます</p>
        )}
      </div>
    </div>
  )
}
