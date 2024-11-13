'use client'

import { List, PenNib } from '@phosphor-icons/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useCurrentEditor } from '@tiptap/react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useHotkeys } from 'react-hotkeys-hook'

import { useWritingStore } from '~/state/use-writing-store'
import { Dropdown } from '../shared/dropdown'

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
              <div className='relative flex items-center gap-1'>
                <span className='border-r border-neutral-700/40 pr-3 font-mono text-xs'>
                  {(editor.storage.characterCount as { words: () => number }).words()} words
                </span>
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
      <Tooltip.Root>
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
        <Tooltip.Content
          side='top'
          align='center'
          sideOffset={12}
          className='w-full rounded-md bg-neutral-950 p-1 px-2 font-mono text-xs shadow-sm shadow-black/20 radix-state-delayed-open:animate-tooltip'
        >
          Navigation
        </Tooltip.Content>
      </Tooltip.Root>
    </Dropdown>
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
        sideOffset={12}
        className='w-full rounded-md bg-neutral-950 p-1 px-2 font-mono text-xs shadow-sm shadow-black/20 radix-state-delayed-open:animate-tooltip'
      >
        Focus
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
