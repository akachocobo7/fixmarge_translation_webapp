export interface TranslateResponse {
  success: boolean
  data?: {
    translation: string
    unknownWords: string[]
  }
  error?: {
    code: string
    message: string
  }
}

export type TranslationStatus = 'idle' | 'loading' | 'success' | 'error'
