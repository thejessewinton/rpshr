import NumberFlow from '@number-flow/react'
import { useCurrentEditor } from '@tiptap/react'
import { useDebounceValue } from 'usehooks-ts'
import { pluralize } from '~/utils/pluralize'

export const WordCount = () => {
  const { editor } = useCurrentEditor()

  const counts = {
    characters: (
      editor?.storage.characterCount as { characters: () => number }
    ).characters(),
    words: (editor?.storage.characterCount as { words: () => number }).words(),
  } as const

  const [debouncedValue] = useDebounceValue(counts.words, 500)

  if (!editor) {
    return null
  }

  return (
    <span className="flex items-center gap-1.5 border-neutral-300/40 border-r py-2 pr-5 font-mono text-xs dark:border-neutral-700/20">
      <NumberFlow value={debouncedValue} /> {pluralize(debouncedValue, 'word')}
    </span>
  )
}
