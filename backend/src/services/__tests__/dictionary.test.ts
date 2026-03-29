import { describe, it, expect } from 'vitest'
import { translate } from '../dictionary'

describe('dictionary', () => {
  it('辞書に存在する単語を翻訳できる', () => {
    const result = translate("Iz'u")
    expect(result).toBe('～は/～が')
  })

  it('辞書に存在しない単語はnullを返す', () => {
    const result = translate('unknownword')
    expect(result).toBeNull()
  })

  it('大文字小文字を区別する', () => {
    const result = translate("iz'u")
    expect(result).toBeNull()
  })
})
