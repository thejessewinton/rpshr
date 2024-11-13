'use client'

import NumberFlow from '@number-flow/react'
import { List, PenNib } from '@phosphor-icons/react'
import { useCurrentEditor } from '@tiptap/react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDebounceValue } from 'usehooks-ts'

import { Dropdown } from '~/components/shared/dropdown'
import { Tooltip } from '~/components/shared/tooltip'
import { useWritingStore } from '~/state/use-writing-store'

const TOOLTIP_OFFSET = 12

export const Toolbar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Tooltip.Provider delayDuration={50} skipDelayDuration={1000}>
      <MotionConfig
        transition={{
          duration: 0.3,
          type: 'spring',
          damping: 10
        }}
      >
        <AnimatePresence>
          <motion.div
            className='fixed !left-1/2 bottom-10 origin-center !-translate-x-1/2 focus-within:!scale-100'
            initial={{
              scale: 0.9
            }}
            whileHover={{
              scale: 1
            }}
          >
            <motion.div
              className='z-10 flex origin-center cursor-pointer items-center rounded-full border border-neutral-700/40 bg-neutral-950 py-1.5 pl-4 pr-1 shadow-xl shadow-black/10'
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
              <div className='relative flex items-center justify-center gap-1'>
                <WordCount />
                <FocusSwitcher />
                <NavigationMenu />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </MotionConfig>
    </Tooltip.Provider>
  )
}

const NavigationMenu = () => {
  return (
    <Dropdown>
      <Tooltip>
        <Dropdown.Trigger asChild className='overflow-hidden rounded-full'>
          <Tooltip.Trigger>
            <div className='flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-900'>
              <List className='size-4 text-white transition-colors' />
            </div>
          </Tooltip.Trigger>
        </Dropdown.Trigger>
        <Dropdown.Content side='top' sideOffset={8}>
          <Dropdown.Item>Table of Contents</Dropdown.Item>
        </Dropdown.Content>
        <Tooltip.Content>Navigation</Tooltip.Content>
      </Tooltip>
    </Dropdown>
  )
}

const WordCount = () => {
  const { editor } = useCurrentEditor()
  const [debouncedValue] = useDebounceValue((editor?.storage.characterCount as { words: () => number }).words(), 1000)

  if (!editor) {
    return null
  }

  return (
    <span className='flex items-center gap-1.5 border-r border-neutral-700/40 pr-3 font-mono text-xs'>
      <NumberFlow value={debouncedValue} /> words
    </span>
  )
}

const FocusSwitcher = () => {
  const { toggleIsFocusMode } = useWritingStore()

  useHotkeys('`', () => {
    toggleIsFocusMode()
  })

  return (
    <Tooltip>
      <Tooltip.Trigger onClick={toggleIsFocusMode}>
        <div className='flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-900'>
          <PenNib className='size-4 text-white transition-colors' />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>Focus</Tooltip.Content>
    </Tooltip>
  )
}
