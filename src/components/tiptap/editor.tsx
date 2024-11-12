'use client'

import { useState } from 'react'

import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Toolbar } from '~/components/tiptap/toolbar'

const extensions = [
  StarterKit,
  CharacterCount.configure({
    limit: null
  }),
  Placeholder.configure({
    placeholder: 'Write something…'
  })
]

type EditorProps = {
  content?: string
}

export const Editor = ({ content }: EditorProps) => {
  const [title, setTitle] = useState('')

  return (
    <>
      {title && <title>{title}</title>}
      <input
        type='text'
        className='bg-transparent font-mono text-sm outline-none placeholder:text-neutral-600'
        placeholder='Your title…'
        value={title}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
      />
      <EditorProvider
        immediatelyRender={false}
        extensions={extensions}
        content={content}
        editorProps={{
          attributes: {
            class: 'editor font-mono text-sm prose dark:prose-invert prose-neutral py-4 focus:outline-none'
          }
        }}
      >
        <Toolbar />
      </EditorProvider>
    </>
  )
}
