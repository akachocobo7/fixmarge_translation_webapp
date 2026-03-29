import { describe, it, expect, vi, beforeEach } from 'vitest'
import { translateText } from '../translator'

vi.mock('../openai', () => ({
  translateWithDictionary: vi.fn().mockResolvedValue('整形された日本語'),
}))

describe('translateText', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('翻訳結果を返す', async () => {
    const result = await translateText("Iz'u hison'")
    expect(result.translation).toBe('整形された日本語')
  })

  it('unknownWordsは常に空配列', async () => {
    const result = await translateText('unknownword')
    expect(result.unknownWords).toEqual([])
  })
})
