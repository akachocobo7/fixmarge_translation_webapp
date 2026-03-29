import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
})

export async function translateWithDictionary(
  text: string,
  entries: Record<string, string>
): Promise<string> {
  const dictText = Object.entries(entries)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `あなたは人工言語 fiXmArge の翻訳者です。
以下の辞書を参照して、入力テキストを自然な日本語に翻訳してください。
単語の語形変化（過去形・活用形など）も考慮してください。
辞書にない単語はそのまま残してください。
翻訳結果のみを返してください。

辞書:
${dictText}`,
      },
      { role: 'user', content: text },
    ],
    temperature: 0.3,
  })

  return response.choices[0]?.message?.content || text
}
