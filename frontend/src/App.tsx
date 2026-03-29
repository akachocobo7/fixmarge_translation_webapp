import { Header } from '@/components/Header'
import { TranslateInput } from '@/components/TranslateInput'
import { TranslateOutput } from '@/components/TranslateOutput'
import { useTranslation } from '@/hooks/useTranslation'

export default function App() {
  const { status, translation, unknownWords, error, translate } = useTranslation()

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TranslateInput onTranslate={translate} isLoading={status === 'loading'} />
          <TranslateOutput
            status={status}
            translation={translation}
            unknownWords={unknownWords}
            error={error}
          />
        </div>
      </main>
    </div>
  )
}
