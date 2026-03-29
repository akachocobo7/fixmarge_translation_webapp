import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TranslateInputProps {
  onTranslate: (text: string) => void
  isLoading: boolean
}

export function TranslateInput({ onTranslate, isLoading }: TranslateInputProps) {
  const [text, setText] = useState('')

  function handleSubmit() {
    const trimmed = text.trim()
    if (trimmed) onTranslate(trimmed)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">入力（fiXmArge）</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="fiXmArge のテキストを入力..."
          className="min-h-[160px] resize-none"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{text.length} 文字</span>
          <Button onClick={handleSubmit} disabled={isLoading || !text.trim()}>
            {isLoading ? '翻訳中...' : '翻訳する'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
