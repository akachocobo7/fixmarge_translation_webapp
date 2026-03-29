import type { TranslateResponse } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function translateText(text: string): Promise<TranslateResponse> {
  const response = await fetch(`${API_URL}/api/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })

  return response.json() as Promise<TranslateResponse>
}
