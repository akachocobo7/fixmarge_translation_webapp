import { describe, it, expect, vi } from 'vitest'
import app from '../../index'

vi.mock('../../services/translator', () => ({
  translateText: vi.fn().mockResolvedValue({
    translation: '翻訳結果',
    unknownWords: [],
  }),
}))

// Node.jsサーバー起動をモック
vi.mock('@hono/node-server', () => ({
  serve: vi.fn(),
}))

describe('POST /api/translate', () => {
  it('正常なリクエストで翻訳結果を返す', async () => {
    const res = await app.request('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: "Iz'u hison'" }),
    })

    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.data.translation).toBe('翻訳結果')
  })

  it('空のテキストでバリデーションエラーを返す', async () => {
    const res = await app.request('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: '' }),
    })

    expect(res.status).toBe(400)
  })

  it('GET /api/health でヘルスチェックが通る', async () => {
    const res = await app.request('/api/health')
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.status).toBe('ok')
  })
})
