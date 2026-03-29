import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { translateText } from '../services/translator.js'

const app = new Hono()

const translateSchema = z.object({
  text: z.string().min(1).max(10000),
})

app.post('/translate', zValidator('json', translateSchema), async (c) => {
  const { text } = c.req.valid('json')

  try {
    const result = await translateText(text)
    return c.json({ success: true, data: result })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return c.json(
      { success: false, error: { code: 'TRANSLATION_ERROR', message } },
      500
    )
  }
})

export default app
