'use client'

import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Focus from '@tiptap/extension-focus'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorProvider, Node } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Toolbar } from '~/components/tiptap/toolbar'

const FocusMode = Node.create({
  name: 'focusMode',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          class: {
            default: 'unfocused'
          }
        }
      }
    ]
  }
})

const extensions = [
  StarterKit,
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
    className: 'focused',
    mode: 'shallowest'
  }),
  Heading.extend({
    name: 'title',
    group: 'title',
    parseHTML: () => [{ tag: 'h1:first-child' }]
  }).configure({ levels: [1] }),
  FocusMode
]

type EditorProps = {
  content?: string
}

export const Editor = ({ content }: EditorProps) => {
  return (
    <EditorProvider
      autofocus
      immediatelyRender={false}
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: {
          class:
            'editor prose-headings:text-sm max-w-none prose-headings:font-medium text-sm prose dark:prose-invert prose-neutral py-4 focus:outline-none'
        }
      }}
    >
      <Toolbar />
    </EditorProvider>
  )
}
