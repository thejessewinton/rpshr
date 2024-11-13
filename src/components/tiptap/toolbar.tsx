'use client'

import { PenNib } from '@phosphor-icons/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useCurrentEditor } from '@tiptap/react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useHotkeys } from 'react-hotkeys-hook'

import { useWritingStore } from '~/state/use-writing-store'
import { cn } from '~/utils/core'

export const Toolbar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Tooltip.Provider delayDuration={500} skipDelayDuration={5000}>
      <MotionConfig
        transition={{
          duration: 0.3,
          type: 'spring',
          damping: 10
        }}
      >
        <AnimatePresence>
          <motion.div
            className='fixed bottom-10 right-10'
            initial={{
              scale: 0.8
            }}
            whileHover={{
              scale: 1
            }}
          >
            <motion.div
              className='z-10 flex origin-center cursor-pointer items-center rounded-full border border-neutral-700/80 bg-neutral-900 py-0.5 pl-3 pr-1 shadow-sm shadow-black/20'
              initial={{
                opacity: 0,
                translateY: 10,
                filter: 'blur(4px)'
              }}
              animate={{
                opacity: 1,
                translateY: 0,
                filter: 'blur(0px)'
              }}
              whileHover={{
                scale: 1
              }}
            >
              <div className='flex items-center gap-1.5'>
                <span className='font-mono text-[.625rem]'>{editor.storage.characterCount.words()} words</span>
                <FocusSwitcher />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </MotionConfig>
    </Tooltip.Provider>
  )
}

const FocusSwitcher = () => {
  const { toggleIsFocusMode } = useWritingStore()

  useHotkeys('`', () => {
    toggleIsFocusMode()
  })

  return (
    <Tooltip.Root>
      <Tooltip.Trigger onClick={toggleIsFocusMode}>
        <div className='flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-800'>
          <PenNib className={cn('size-4 text-white transition-colors')} />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content
        side='top'
        align='center'
        sideOffset={2}
        className='w-full rounded-sm bg-neutral-800 p-1 px-2 font-mono text-xs radix-state-delayed-open:animate-tooltip'
      >
        Focus
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
