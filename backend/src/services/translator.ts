import { tokenize } from '../utils/tokenizer.js'
import { translate } from './dictionary.js'
import { refineTranslation } from './openai.js'
import type { TranslateResult } from '../types/index.js'

export async function translateText(text: string): Promise<TranslateResult> {
  const tokens = tokenize(text)

  const unknownWords: string[] = []
  const translatedTokens = tokens.map(token => {
    const result = translate(token)
    if (result === null) {
      unknownWords.push(token)
      return token
    }
    return result
  })

  const rawTranslation = translatedTokens.join(' ')
  const translation = await refineTranslation(rawTranslation)

  return { translation, unknownWords }
}
