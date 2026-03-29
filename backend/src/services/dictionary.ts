import { readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

type Dictionary = Record<string, string>

let dictionary: Dictionary | null = null

export function loadDictionary(): Dictionary {
  if (dictionary) return dictionary

  const path = join(__dirname, '..', '..', '..', 'data', 'dictionary.json')
  const content = readFileSync(path, 'utf-8')
  dictionary = JSON.parse(content) as Dictionary

  return dictionary
}

