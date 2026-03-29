import { useState } from 'react'
import { translateText } from '@/api/translate'
import type { TranslationStatus } from '@/types'

interface TranslationState {
  status: TranslationStatus
  translation: string | null
  unknownWords: string[]
  error: string | null
}

export function useTranslation() {
  const [state, setState] = useState<TranslationState>({
    status: 'idle',
    translation: null,
    unknownWords: [],
    error: null,
  })

  async function translate(text: string) {
    setState(prev => ({ ...prev, status: 'loading', error: null }))

    try {
      const res = await translateText(text)

      if (res.success && res.data) {
        setState({
          status: 'success',
          translation: res.data.translation,
          unknownWords: res.data.unknownWords,
          error: null,
        })
      } else {
        const message = res.error?.message || '翻訳に失敗しました'
        setState(prev => ({ ...prev, status: 'error', error: message }))
      }
    } catch {
      setState(prev => ({
        ...prev,
        status: 'error',
        error: 'ネットワークエラーが発生しました',
      }))
    }
  }

  return { ...state, translate }
}
