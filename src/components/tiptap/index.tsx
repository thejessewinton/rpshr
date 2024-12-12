'use client'

import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Focus from '@tiptap/extension-focus'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import {
  type Editor,
  EditorProvider,
  type EditorProviderProps,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { usePathname } from 'next/navigation'
import { isDeepEqual } from 'remeda'
import { useDebounceCallback } from 'usehooks-ts'

import { Toolbar } from '~/components/tiptap/toolbar'
import { useFocusStore } from '~/state/use-focus-store'
import { type RouterOutputs, api } from '~/trpc/react'

const extensions = [
  StarterKit,
  Typography,
  CharacterCount.configure({
    limit: null,
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'title') {
        return 'Enter a title...'
      }

      return 'Breathe. Focus. Write.'
    },
  }),
  Document.extend({
    content: 'title block+',
  }),
  Heading.extend({
    name: 'title',
    group: 'title',
    parseHTML: () => [{ tag: 'h1:first-child' }],
  }).configure({ levels: [1] }),
  Link.configure({
    autolink: true,
    defaultProtocol: 'https://',
    openOnClick: true,
  }),
  Focus.configure({
    className: 'focused',
    mode: 'deepest',
  }),
]

type EditorProps = {
  content?: EditorProviderProps['content']
  noteId?: NonNullable<RouterOutputs['notes']['getById']>['id']
}

export const NoteEditor = ({ content, noteId }: EditorProps) => {
  const utils = api.useUtils()
  const { isFocusMode } = useFocusStore()
  const pathname = usePathname()

  const { mutate, isPending, isSuccess, isError } =
    api.notes.createOrUpdate.useMutation({
      onSuccess: ([data]) => {
        if (data?.id && pathname === '/') {
          window.history.pushState({}, '', `/${data.id}`)
        }
        utils.notes.getAll.invalidate()
      },
    })

  const handleSave = (editor: Editor) => {
    const isChanged = !isDeepEqual(content, editor.getHTML())
    const isEmpty = editor.view.state.doc.textContent.trim() === ''

    if (!isChanged || isEmpty) {
      return
    }

    mutate({
      id: noteId,
      title: editor.view.state.doc.firstChild?.textContent.trim() ?? '',
      body: editor.getHTML() ?? '',
    })
  }

  const debouncedSave = useDebounceCallback(
    (editor: Editor) => handleSave(editor),
    2000,
  )

  return (
    <EditorProvider
      immediatelyRender={false}
      extensions={extensions}
      content={content}
      onUpdate={({ editor }) => {
        debouncedSave(editor)
      }}
      editorContainerProps={
        {
          'data-focus-mode': isFocusMode,
        } as EditorProviderProps['editorContainerProps']
      }
      editorProps={{
        attributes: {
          class:
            'editor first:blur-none! px-8 animate-enter mt-20 md:prose-headings:text-sm max-w-none pb-[12rem] prose-headings:font-medium font-light prose-headings:text-base text-base md:text-sm prose dark:prose-invert prose-neutral py-4 focus:outline-hidden',
        },
      }}
    >
      <Toolbar
        isPending={isPending}
        isSuccess={isSuccess}
        isError={isError}
        noteId={noteId}
      />
    </EditorProvider>
  )
}
