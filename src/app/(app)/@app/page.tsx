import Link from 'next/link'

import { format } from 'date-fns'

import { api } from '~/trpc/server'

export default async function LiftsPage() {
  const notes = await api.notes.getAll()
  return (
    <div className='-mx-[2px] flex flex-col gap-4'>
      {notes.map((note) => (
        <Link
          href={`/${note.id}`}
          key={note.id}
          className='flex items-center justify-between rounded p-4 text-sm font-light outline-none transition-colors hover:dark:bg-neutral-700/20 focus:dark:bg-neutral-700/20'
        >
          <div className='flex items-center gap-4'>
            <span className='text-neutral-700 dark:text-white'>{note.title}</span>
          </div>
          <span className='text-xs font-light text-neutral-700 dark:text-neutral-400'>
            {format(note.updated_at ?? note.created_at!, 'MMMM dd')}
          </span>
        </Link>
      ))}
    </div>
  )
}
