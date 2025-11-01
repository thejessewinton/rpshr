import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { NoteEditor } from '~/components/ui/tiptap'
import { api } from '~/trpc/server'

export const generateMetadata = async ({
  params,
}: PageProps<'/[id]'>): Promise<Metadata> => {
  const note = await api.notes.getById({ id: (await params).id })

  return {
    title: note?.title ?? 'untitled',
  }
}

export default async function Note({ params }: PageProps<'/[id]'>) {
  const note = await api.notes.getById({ id: (await params).id })

  if (!note) {
    notFound()
  }

  return <NoteEditor content={note?.body} noteId={(await params).id} />
}
