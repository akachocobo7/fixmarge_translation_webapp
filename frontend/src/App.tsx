import { Header } from '@/components/Header'
import { TranslateInput } from '@/components/TranslateInput'
import { TranslateOutput } from '@/components/TranslateOutput'
import { useTranslation } from '@/hooks/useTranslation'

export default function App() {
  const { status, translation, unknownWords, error, translate } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <TranslateInput onTranslate={translate} isLoading={status === 'loading'} />
        <TranslateOutput
          status={status}
          translation={translation}
          unknownWords={unknownWords}
          error={error}
        />
      </main>
    </div>
  )
}
