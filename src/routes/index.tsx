import { createFileRoute } from '@tanstack/react-router'
import { NoteEditor } from '~/components/ui/tiptap'

export const Route = createFileRoute('/')({
  component: NewNote,
})

function NewNote() {
  return <NoteEditor />
}
