import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { TranslationStatus } from '@/types'

interface TranslateOutputProps {
  status: TranslationStatus
  translation: string | null
  unknownWords: string[]
  error: string | null
}

export function TranslateOutput({ status, translation, unknownWords, error }: TranslateOutputProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!translation) return
    await navigator.clipboard.writeText(translation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">翻訳結果（日本語）</CardTitle>
        {translation && (
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? 'コピー済み' : 'コピー'}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {status === 'loading' && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}

        {status === 'error' && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        {status === 'success' && translation && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{translation}</p>
            {unknownWords.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">未知の単語:</p>
                <div className="flex flex-wrap gap-1">
                  {unknownWords.map(word => (
                    <span
                      key={word}
                      className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {status === 'idle' && (
          <p className="text-sm text-muted-foreground">翻訳結果がここに表示されます</p>
        )}
      </CardContent>
    </Card>
  )
}
