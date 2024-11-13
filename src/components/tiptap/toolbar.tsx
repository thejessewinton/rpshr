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
            className='fixed bottom-10 left-1/2 origin-center'
            initial={{
              scale: 0.9,
              translateX: '-50%'
            }}
            whileHover={{
              scale: 1
            }}
          >
            <motion.div
              className='z-10 flex origin-center cursor-pointer items-center rounded-full border border-neutral-700/80 bg-neutral-950 py-0.5 pl-3 pr-1 shadow-sm shadow-black/20'
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
                <span className='font-mono text-xs'>{editor.storage.characterCount.words()} words</span>
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
        <div className='flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-900'>
          <PenNib className='size-4 text-white transition-colors' />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content
        side='top'
        align='center'
        sideOffset={8}
        className='w-full rounded-sm bg-neutral-950 p-1 px-2 font-mono text-xs shadow-sm shadow-black/20 radix-state-delayed-open:animate-tooltip'
      >
        Focus
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
