import type { Metadata } from 'next'

import { NoteEditor } from '~/components/ui/tiptap'

export const metadata: Metadata = {
  title: 'untitled',
}

export default async function NewNote() {
  return <NoteEditor />
}
