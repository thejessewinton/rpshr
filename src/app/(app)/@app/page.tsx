import type { Metadata } from 'next'

import { NoteEditor } from '~/components/tiptap'

export const metadata: Metadata = {
  title: 'untitled',
}

export default async function NewNote() {
  return <NoteEditor />
}
