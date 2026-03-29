import { useState } from 'react'

interface TranslateInputProps {
  onTranslate: (text: string) => void
  isLoading: boolean
}

export function TranslateInput({ onTranslate, isLoading }: TranslateInputProps) {
  const [text, setText] = useState('')

  function handleSubmit() {
    const trimmed = text.trim()
    if (trimmed) onTranslate(trimmed)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/60 p-5 flex flex-col gap-4"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}>
      <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest">
        fiXmArge
      </p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="ここに fiXmArge のテキストを入力..."
        disabled={isLoading}
        className="
          w-full min-h-[200px] resize-none
          bg-neutral-50 border border-neutral-200
          rounded-xl px-4 py-3
          text-sm text-neutral-900
          placeholder:text-neutral-400
          focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-150
        "
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400">
          {text.length > 0 ? `${text.length} 文字` : '⌘ + Enter で翻訳'}
        </span>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="
            bg-neutral-900 text-white
            px-5 py-2 rounded-xl
            text-sm font-medium
            transition-all duration-150
            hover:bg-neutral-700 active:scale-[0.98]
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-900
          "
        >
          {isLoading ? '翻訳中...' : '翻訳する'}
        </button>
      </div>
    </div>
  )
}
