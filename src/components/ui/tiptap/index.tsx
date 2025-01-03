'use client'

import CharacterCount from '@tiptap/extension-character-count'
import Focus from '@tiptap/extension-focus'
import Link from '@tiptap/extension-link'
import Mention from '@tiptap/extension-mention'
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

import { useState } from 'react'
import { Toolbar } from '~/components/ui/toolbar'
import { useFocusStore } from '~/state/use-focus-store'
import { type RouterOutputs, api } from '~/trpc/react'

type EditorProps = {
  content?: EditorProviderProps['content']
  noteId?: NonNullable<RouterOutputs['notes']['getById']>['id']
}

export const NoteEditor = ({ content, noteId }: EditorProps) => {
  const utils = api.useUtils()
  const { isFocusMode } = useFocusStore()
  const pathname = usePathname()
  const { data: notes, refetch } = api.notes.getAll.useQuery()

  // local state to store the id of the note on first save
  const [id, setId] = useState<string | undefined>(undefined)

  const { mutate, isPending, isSuccess, isError } =
    api.notes.createOrUpdate.useMutation({
      onSuccess: ([data]) => {
        if (data?.id && pathname === '/') {
          window.history.pushState({}, '', `/${data.id}`)
          setId(data.id)
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
      id: noteId ?? id,
      title: editor.view.state.doc.firstChild?.textContent.trim() ?? '',
      body: editor.getHTML() ?? '',
    })
  }

  const debouncedSave = useDebounceCallback(
    (editor: Editor) => handleSave(editor),
    2000,
  )

  const extensions = [
    StarterKit,
    Typography,
    CharacterCount.configure({
      limit: null,
    }),
    Link.configure({
      autolink: true,
      defaultProtocol: 'https://',
      openOnClick: true,
    }),
    Focus.configure({
      className: 'focused',
    }),
    Mention.configure({
      HTMLAttributes: {
        class: 'mention',
      },
      suggestion: {
        items: async ({ query }) => {
          console.log(notes)
          if (!notes) return []
          return notes.filter((note) =>
            note.title!.toLowerCase().includes(query.toLowerCase()),
          )
        },
        render: () => {
          return {
            onStart: async (props) => {
              await refetch()
              console.log('onStart', props)
            },
            onUpdate: async (props) => {
              await refetch()
              console.log('onUpdate', props)
            },
          }
        },
      },
    }),
  ]

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
            'editor px-8 animate-enter mt-20 md:prose-headings:text-sm max-w-none pb-[12rem] prose-headings:font-medium font-light prose-headings:text-base text-base md:text-sm prose dark:prose-invert prose-neutral py-4 focus:outline-hidden',
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
