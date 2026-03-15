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
import { isDeepEqual } from 'remeda'
import { useDebounceCallback } from 'usehooks-ts'

import { useState } from 'react'
import { Toolbar } from '~/components/ui/toolbar'
import { useFocusStore } from '~/state/use-focus-store'

type EditorProps = {
  content?: EditorProviderProps['content']
  noteId?: string
}

export const NoteEditor = ({ content, noteId }: EditorProps) => {
  const { isFocusMode } = useFocusStore()

  // local state to store the id of the note on first save
  const [id, setId] = useState<string | undefined>(undefined)

  const handleSave = (editor: Editor) => {
    const isChanged = !isDeepEqual(content, editor.getHTML())
    const isEmpty = editor.view.state.doc.textContent.trim() === ''

    if (!isChanged || isEmpty) {
      return
    }

    console.log('save', editor.getHTML())
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
            'editor px-8 mt-20 md:prose-headings:text-sm max-w-none pb-48 prose-headings:font-medium font-light prose-headings:text-base text-base md:text-sm prose dark:prose-invert prose-neutral py-4 focus:outline-hidden',
        },
      }}
    >
      <Toolbar
        isPending={false}
        isSuccess={true}
        isError={false}
        noteId={noteId}
      />
    </EditorProvider>
  )
}
