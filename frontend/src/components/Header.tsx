export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-xl border-b border-neutral-200/60">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-neutral-900">
            fiXmArge 翻訳
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            人工言語 fiXmArge を日本語に翻訳します
          </p>
        </div>
      </div>
    </header>
  )
}
