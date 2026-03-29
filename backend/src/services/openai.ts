import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
})

export async function refineTranslation(rawText: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `あなたは翻訳アシスタントです。
以下は人工言語から日本語に直訳されたテキストです。
これを自然で読みやすい日本語に整えてください。
元の意味を変えないでください。`,
      },
      {
        role: 'user',
        content: rawText,
      },
    ],
    temperature: 0.3,
  })

  return response.choices[0]?.message?.content || rawText
}
