'use client'

import Link from 'next/link'

import NumberFlow from '@number-flow/react'
import { PenNib, Plus } from '@phosphor-icons/react'
import { useCurrentEditor } from '@tiptap/react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDebounceValue } from 'usehooks-ts'

import { Tooltip } from '~/components/shared/tooltip'
import { useWritingStore } from '~/state/use-writing-store'
import { cn } from '~/utils/core'
import { KBD } from '../shared/kbd'
import { Ping } from '../shared/ping'

type ToolbarProps = {
  isPending?: boolean
  isSuccess?: boolean
}

export const Toolbar = ({ isPending, isSuccess }: ToolbarProps) => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <MotionConfig
      transition={{
        duration: 0.1,
        repeatDelay: 4,
        type: 'spring',
        damping: 10
      }}
    >
      <AnimatePresence>
        <motion.div
          className='fixed bottom-10 left-1/2 z-20 flex origin-center items-center rounded-full border border-neutral-700/40 bg-neutral-950 py-1.5 pl-4 pr-1 shadow-xl shadow-black/10'
          initial={{
            opacity: 0,
            translateY: 10,
            filter: 'blur(4px)',
            translateX: '-50%'
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
            <NewButton />
            <SaveState isPending={isPending} isSuccess={isSuccess} />
          </div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}

const NewButton = () => {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Link
          href='/'
          className='flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-900'
        >
          <Plus className='size-4 text-white transition-colors' />
        </Link>
      </Tooltip.Trigger>
      <Tooltip.Content>
        New <KBD>C</KBD>
      </Tooltip.Content>
    </Tooltip>
  )
}

const WordCount = () => {
  const { editor } = useCurrentEditor()

  const [debouncedValue] = useDebounceValue((editor?.storage.characterCount as { words: () => number }).words(), 500)

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
  const { isFocusMode, toggleIsFocusMode } = useWritingStore()

  useHotkeys('`', () => {
    toggleIsFocusMode()
  })

  return (
    <Tooltip>
      <Tooltip.Trigger onClick={toggleIsFocusMode}>
        <div className='flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-900'>
          <PenNib
            className={cn('size-4 text-white transition-all duration-300 ease-in-out', {
              '-rotate-45': !isFocusMode
            })}
          />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {isFocusMode ? 'Focus' : 'Unfocus'} <KBD>`</KBD>
      </Tooltip.Content>
    </Tooltip>
  )
}

const SaveState = ({ isPending, isSuccess }: ToolbarProps) => {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <AnimatePresence mode='popLayout'>
          <motion.div
            initial={{
              opacity: 0,
              translateY: 10
            }}
            animate={{
              opacity: 1,
              translateY: 0
            }}
            exit={{
              opacity: 0,
              translateY: -10
            }}
            key={isPending ? 'pending' : isSuccess ? 'success' : 'idle'}
            className='flex size-8 items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-900'
          >
            {isPending ? (
              <Ping data-variant='pending' />
            ) : isSuccess ? (
              <Ping data-variant='success' />
            ) : (
              <Ping data-variant='idle' />
            )}
          </motion.div>
        </AnimatePresence>
      </Tooltip.Trigger>
      <Tooltip.Content>{isPending ? 'Pending' : isSuccess ? 'Saved' : 'No changes'}</Tooltip.Content>
    </Tooltip>
  )
}
