'use client'

import { useCurrentEditor } from '@tiptap/react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Tooltip } from '~/components/shared/tooltip'

import { DeleteNote } from '~/components/ui/toolbar/delete-note'
import { FocusSwitcher } from '~/components/ui/toolbar/focus-switcher'
import { NewNote } from '~/components/ui/toolbar/new-note'
import { NotesList } from '~/components/ui/toolbar/notes-list'
import { SaveState } from '~/components/ui/toolbar/save-state'
import { SignOutButton } from '~/components/ui/toolbar/sign-out-button'
import { ThemeSwitcher } from '~/components/ui/toolbar/theme-switcher'
import { WordCount } from '~/components/ui/toolbar/word-counter'

type ToolbarProps = {
  isPending?: boolean
  isSuccess?: boolean
  isError?: boolean
  noteId?: string
}

export const Toolbar = ({
  isPending,
  isSuccess,
  isError,
  noteId,
}: ToolbarProps) => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Tooltip.Provider delayDuration={50} skipDelayDuration={1000}>
      <MotionConfig
        transition={{
          duration: 0.1,
          repeatDelay: 4,
          type: 'spring',
          damping: 10,
        }}
      >
        <AnimatePresence>
          <motion.div
            className="fixed bottom-10 left-1/2 flex origin-center items-center rounded-full border border-neutral-300/40 bg-white py-1.5 pr-2 pl-4 shadow-black/10 shadow-xl dark:border-neutral-700/40 dark:bg-neutral-900"
            initial={{
              opacity: 0,
              translateY: 10,
              filter: 'blur(4px)',
              translateX: '-50%',
            }}
            animate={{
              opacity: 1,
              translateY: 0,
              filter: 'blur(0px)',
            }}
            whileHover={{
              scale: 1,
            }}
          >
            <div className="relative flex items-center justify-center gap-1">
              <SaveState
                isPending={isPending}
                isSuccess={isSuccess}
                isError={isError}
              />
              <WordCount />
              <NotesList />
              <NewNote />
              {noteId && <DeleteNote noteId={noteId} />}
              <FocusSwitcher />
              <ThemeSwitcher />
              <SignOutButton />
            </div>
          </motion.div>
        </AnimatePresence>
      </MotionConfig>
    </Tooltip.Provider>
  )
}
