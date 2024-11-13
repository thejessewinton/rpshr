'use client'

import { useRouter } from 'next/navigation'

import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Focus from '@tiptap/extension-focus'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorProvider, Node, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { isDeepEqual } from 'remeda'
import { useDebounceCallback } from 'usehooks-ts'

import { Toolbar } from '~/components/tiptap/toolbar'
import { api } from '~/trpc/react'

// const FocusMode = Node.create({
//   name: 'focusMode',
//   addGlobalAttributes() {
//     return [
//       {
//         types: ['paragraph'],
//         attributes: {
//           class: {
//             default: 'blur-sm transition-all duration-300'
//           }
//         }
//       }
//     ]
//   }
// })

const extensions = [
  StarterKit,
  Typography,
  CharacterCount.configure({
    limit: null
  }),
  Placeholder.configure({
    showOnlyCurrent: false,
    placeholder: ({ node }) => {
      if (node.type.name === 'title') {
        return 'Breathe. Focus. Write.'
      }

      return 'Breathe. Focus. Write.'
    }
  }),
  Document.extend({
    content: 'title block+'
  }),
  Focus.configure({
    className: '!blur-0',
    mode: 'shallowest'
  }),
  Heading.extend({
    name: 'title',
    group: 'title',
    parseHTML: () => [{ tag: 'h1:first-child' }]
  }).configure({ levels: [1] }),
  Link.configure({
    autolink: true,
    defaultProtocol: 'https://',
    openOnClick: true
  })
]

type EditorProps = {
  content?: string
  noteId?: string
}

export const NoteEditor = ({ content, noteId }: EditorProps) => {
  const router = useRouter()

  const { mutate } = api.notes.create.useMutation({
    onSuccess: ([data]) => {
      if (data?.id) {
        router.push(`/${data?.id}`)
      }
    }
  })

  const handleSave = (editor: Editor) => {
    const isChanged = !isDeepEqual(content, editor.getHTML())

    if (!isChanged) {
      return
    }

    mutate({
      id: noteId,
      title: editor.view.state.doc.firstChild!.textContent.trim() ?? '',
      body: editor.getHTML() ?? ''
    })
  }

  const debouncedSave = useDebounceCallback((editor: Editor) => handleSave(editor), 1000)

  return (
    <EditorProvider
      autofocus
      immediatelyRender={false}
      extensions={extensions}
      content={content}
      onUpdate={({ editor }) => debouncedSave(editor)}
      editorProps={{
        attributes: {
          class:
            'editor prose-headings:text-sm max-w-none prose-headings:font-medium font-light text-sm prose dark:prose-invert prose-neutral py-4 focus:outline-none'
        }
      }}
    >
      <Toolbar />
    </EditorProvider>
  )
}
