import { notFound } from 'next/navigation'
import { Editor } from '~/components/tiptap/editor'
import { FocusMode } from '~/components/ui/focus-mode'
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

  return <Editor content={note?.body} />
}
