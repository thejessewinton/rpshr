import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { NoteEditor } from '~/components/tiptap'
import { api } from '~/trpc/server'

export const generateMetadata = async ({
  params,
}: NotePageParams): Promise<Metadata> => {
  const note = await api.notes.getById({ id: (await params).id })

  return {
    title: note?.title ?? 'untitled',
  }
}

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

  return <NoteEditor content={note?.body} noteId={(await params).id} />
}
