import { describe, it, expect } from 'vitest'
import { tokenize } from '../tokenizer'

describe('tokenize', () => {
  it('スペース区切りで単語に分割する', () => {
    expect(tokenize('hello world')).toEqual(['hello', 'world'])
  })

  it('前後の句読点を除去する', () => {
    expect(tokenize('hello, world!')).toEqual(['hello', 'world'])
  })

  it('複数スペースをまとめて処理する', () => {
    expect(tokenize('hello  world')).toEqual(['hello', 'world'])
  })

  it('空文字列は空配列を返す', () => {
    expect(tokenize('')).toEqual([])
  })

  it('アポストロフィを含む単語は保持する', () => {
    expect(tokenize("Iz'u hison'")).toEqual(["Iz'u", "hison'"])
  })
})
