import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import translateRoute from './routes/translate.js'

const app = new Hono()

app.use('*', logger())
app.use('/api/*', cors({
  origin: 'http://localhost:8080',
}))

app.route('/api', translateRoute)

app.get('/api/health', (c) => c.json({ status: 'ok' }))

export default app

// Node.js サーバーとして起動
import { serve } from '@hono/node-server'

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Backend running on http://localhost:${info.port}`)
})
