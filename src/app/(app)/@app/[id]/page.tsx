import { notFound } from 'next/navigation'

import { NoteEditor } from '~/components/tiptap'
import { api } from '~/trpc/server'

type NotePageParams = {
  params: Promise<{
    id: string
  }>
}

export default async function Note({ params }: NotePageParams) {
  const note = await api.notes.getById({ id: (await params).id })

  if (!note) {
    notFound()
  }

  return (
    <NoteEditor
      title={note.title}
      content={note?.body}
      noteId={(await params).id}
    />
  )
}
