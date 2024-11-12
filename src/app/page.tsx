import Link from 'next/link'
import { api } from '~/trpc/server'

export default async function LiftsPage() {
  const notes = await api.notes.getAll()
  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col space-y-8'>
      {notes.map((note) => (
        <Link href={`/${note.id}`} key={note.id}>
          {note.title} {note.created_at?.toLocaleDateString()}
        </Link>
      ))}
    </div>
  )
}
