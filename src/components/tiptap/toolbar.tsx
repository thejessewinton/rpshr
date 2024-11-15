'use client'

import Link from 'next/link'

import NumberFlow from '@number-flow/react'
import { PenNib, Plus } from '@phosphor-icons/react'
import { useCurrentEditor } from '@tiptap/react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDebounceValue } from 'usehooks-ts'

import { useTheme } from 'next-themes'
import { KBD } from '~/components/shared/kbd'
import { Ping } from '~/components/shared/ping'
import { Tooltip } from '~/components/shared/tooltip'
import { useWritingStore } from '~/state/use-writing-store'
import { cn } from '~/utils/core'

type ToolbarProps = {
  isPending?: boolean
  isSuccess?: boolean
  isError?: boolean
}

export const Toolbar = ({ isPending, isSuccess, isError }: ToolbarProps) => {
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
        damping: 10,
      }}
    >
      <AnimatePresence>
        <motion.div
          className="fixed bottom-10 left-1/2 z-20 flex origin-center items-center rounded-full border border-neutral-300/40 bg-neutral-200 py-1.5 pr-1 pl-4 shadow-black/10 shadow-xl dark:border-neutral-700/40 dark:bg-neutral-950"
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
            <NewButton />
            <FocusSwitcher />
            <ThemeSwitcher />
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
          href="/"
          className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          <Plus className="size-4 text-neutral-900 dark:text-white" />
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

  const [debouncedValue] = useDebounceValue(
    (editor?.storage.characterCount as { words: () => number }).words(),
    500,
  )

  if (!editor) {
    return null
  }

  return (
    <span className="flex items-center gap-1.5 border-neutral-700/40 border-r pr-3 font-mono text-xs">
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
        <div className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <PenNib
            className={cn(
              'size-4 text-neutral-900 transition-transform dark:text-white',
              {
                '-rotate-45': !isFocusMode,
              },
            )}
          />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {isFocusMode ? 'Focus' : 'Unfocus'} <KBD>`</KBD>
      </Tooltip.Content>
    </Tooltip>
  )
}

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useHotkeys('/', () => {
    handleToggleTheme()
  })

  return (
    <Tooltip>
      <Tooltip.Trigger onClick={handleToggleTheme}>
        <div className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <div className="size-3 rounded-full bg-neutral-950 dark:bg-white" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Theme <KBD>/</KBD>
      </Tooltip.Content>
    </Tooltip>
  )
}

const SaveState = ({ isPending, isSuccess, isError }: ToolbarProps) => {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{
              opacity: 0,
              translateY: 10,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              translateY: -10,
            }}
            key={
              isPending
                ? 'pending'
                : isSuccess
                  ? 'success'
                  : isError
                    ? 'error'
                    : 'idle'
            }
            className="mr-2 flex items-center justify-center"
          >
            {isPending ? (
              <Ping data-variant="pending" />
            ) : isSuccess ? (
              <Ping data-variant="success" />
            ) : isError ? (
              <Ping data-variant="error" />
            ) : (
              <Ping data-variant="idle" />
            )}
          </motion.div>
        </AnimatePresence>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {isPending
          ? 'Pending'
          : isSuccess
            ? 'Saved'
            : isError
              ? 'Error'
              : 'No changes'}
      </Tooltip.Content>
    </Tooltip>
  )
}
