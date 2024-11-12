import { notFound } from 'next/navigation'

import { api } from '~/trpc/server'

type TagPageParams = {
  params: Promise<{
    tag: string
  }>
}

export default async function Tag({ params }: TagPageParams) {
  const notes = await api.notes.getAllByTag({ tag: (await params).tag })

  if (!notes) {
    return notFound()
  }

  console.log(notes)

  return <div>Tag Page</div>
}
