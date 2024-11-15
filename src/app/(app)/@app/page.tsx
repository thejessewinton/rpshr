import type { Metadata } from 'next'

import { NoteEditor } from '~/components/tiptap'

export const metadata: Metadata = {
  title: 'New Note',
}

export default async function NewNote() {
  return <NoteEditor />
}
