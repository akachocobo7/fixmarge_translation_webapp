import { describe, it, expect, vi, beforeEach } from 'vitest'
import { translateText } from '../translator'

vi.mock('../openai', () => ({
  refineTranslation: vi.fn().mockResolvedValue('整形された日本語'),
}))

describe('translateText', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('辞書の単語を翻訳してOpenAIで整形する', async () => {
    const result = await translateText("Iz'u")
    expect(result.translation).toBe('整形された日本語')
    expect(result.unknownWords).toEqual([])
  })

  it('辞書にない単語はunknownWordsに含まれる', async () => {
    const result = await translateText('unknownword')
    expect(result.unknownWords).toContain('unknownword')
  })

  it('既知と未知の単語が混在する場合を処理できる', async () => {
    const result = await translateText("Iz'u unknownword")
    expect(result.unknownWords).toEqual(['unknownword'])
    expect(result.unknownWords).not.toContain("Iz'u")
  })
})
