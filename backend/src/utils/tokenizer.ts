/**
 * fiXmArge テキストを単語のトークンに分割する
 * スペース区切りをベースとし、前後の句読点を除去する
 */
export function tokenize(text: string): string[] {
  return text
    .split(/\s+/)
    .map(token =>
      // 先頭: 句読点・引用符を除去、末尾: アポストロフィは fiXmArge 単語の一部なので除外
      token
        .replace(/^[.,!?;:'"()\[\]{}]+/, '')
        .replace(/[.,!?;:"()\[\]{}]+$/, '')
    )
    .filter(token => token.length > 0)
}
