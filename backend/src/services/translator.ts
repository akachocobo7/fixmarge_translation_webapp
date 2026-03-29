import { loadDictionary } from './dictionary.js'
import { translateWithDictionary } from './openai.js'
import type { TranslateResult } from '../types/index.js'

export async function translateText(text: string): Promise<TranslateResult> {
  const dictionary = loadDictionary()
  const translation = await translateWithDictionary(text, dictionary)

  return { translation, unknownWords: [] }
}
