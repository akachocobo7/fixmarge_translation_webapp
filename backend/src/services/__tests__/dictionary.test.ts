import { describe, it, expect } from 'vitest'
import { loadDictionary } from '../dictionary'

describe('loadDictionary', () => {
  it('辞書を読み込める', () => {
    const dict = loadDictionary()
    expect(typeof dict).toBe('object')
    expect(Object.keys(dict).length).toBeGreaterThan(0)
  })

  it('既知の単語が含まれている', () => {
    const dict = loadDictionary()
    expect(dict["Iz'u"]).toBeDefined()
  })

  it('2回呼び出してもキャッシュから同じオブジェクトを返す', () => {
    const dict1 = loadDictionary()
    const dict2 = loadDictionary()
    expect(dict1).toBe(dict2)
  })
})
