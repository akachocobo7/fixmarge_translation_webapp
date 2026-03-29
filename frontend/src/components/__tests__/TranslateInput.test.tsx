import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TranslateInput } from '../TranslateInput'

describe('TranslateInput', () => {
  it('テキストエリアと翻訳ボタンが表示される', () => {
    render(<TranslateInput onTranslate={vi.fn()} isLoading={false} />)
    expect(screen.getByPlaceholderText(/fiXmArge のテキストを入力/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '翻訳する' })).toBeInTheDocument()
  })

  it('テキスト入力後にボタンをクリックすると onTranslate が呼ばれる', async () => {
    const onTranslate = vi.fn()
    render(<TranslateInput onTranslate={onTranslate} isLoading={false} />)

    const textarea = screen.getByPlaceholderText(/fiXmArge のテキストを入力/)
    await userEvent.type(textarea, "Iz'u hison'")
    await userEvent.click(screen.getByRole('button', { name: '翻訳する' }))

    expect(onTranslate).toHaveBeenCalledWith("Iz'u hison'")
  })

  it('ローディング中はボタンが無効になる', () => {
    render(<TranslateInput onTranslate={vi.fn()} isLoading={true} />)
    expect(screen.getByRole('button', { name: '翻訳中...' })).toBeDisabled()
  })

  it('テキストが空の時はボタンが無効になる', () => {
    render(<TranslateInput onTranslate={vi.fn()} isLoading={false} />)
    expect(screen.getByRole('button', { name: '翻訳する' })).toBeDisabled()
  })
})
