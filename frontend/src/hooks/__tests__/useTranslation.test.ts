import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTranslation } from '../useTranslation'

vi.mock('@/api/translate', () => ({
  translateText: vi.fn(),
}))

import { translateText } from '@/api/translate'
const mockTranslateText = vi.mocked(translateText)

describe('useTranslation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('初期状態は idle', () => {
    const { result } = renderHook(() => useTranslation())
    expect(result.current.status).toBe('idle')
    expect(result.current.translation).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('翻訳成功時に success 状態になる', async () => {
    mockTranslateText.mockResolvedValue({
      success: true,
      data: { translation: '翻訳結果', unknownWords: [] },
    })

    const { result } = renderHook(() => useTranslation())

    await act(async () => {
      await result.current.translate('hello')
    })

    expect(result.current.status).toBe('success')
    expect(result.current.translation).toBe('翻訳結果')
    expect(result.current.unknownWords).toEqual([])
  })

  it('APIエラー時に error 状態になる', async () => {
    mockTranslateText.mockResolvedValue({
      success: false,
      error: { code: 'TRANSLATION_ERROR', message: 'エラーが発生しました' },
    })

    const { result } = renderHook(() => useTranslation())

    await act(async () => {
      await result.current.translate('hello')
    })

    expect(result.current.status).toBe('error')
    expect(result.current.error).toBe('エラーが発生しました')
  })

  it('ネットワークエラー時に error 状態になる', async () => {
    mockTranslateText.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useTranslation())

    await act(async () => {
      await result.current.translate('hello')
    })

    expect(result.current.status).toBe('error')
    expect(result.current.error).toBe('ネットワークエラーが発生しました')
  })
})
