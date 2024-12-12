'use client'

import Link from 'next/link'

import NumberFlow from '@number-flow/react'
import {
  ArrowUpRight,
  ListDashes,
  PenNib,
  Plus,
  TextStrikethrough,
} from '@phosphor-icons/react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useCurrentEditor } from '@tiptap/react'
import { format } from 'date-fns'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { signOut } from 'next-auth/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDebounceValue } from 'usehooks-ts'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { KBD } from '~/components/shared/kbd'
import { Ping } from '~/components/shared/ping'
import { Tooltip } from '~/components/shared/tooltip'
import { useFocusStore } from '~/state/use-focus-store'
import { api } from '~/trpc/react'
import { cn, pluralize } from '~/utils/core'
import { Dropdown } from '../shared/dropdown'
import { Spinner } from '../shared/spinner'

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
            <Notes />
            <NewButton />
            {noteId && <DeleteButton noteId={noteId} />}
            <FocusSwitcher />
            <ThemeSwitcher />
            <SignOutButton />
          </div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}

const NewButton = () => {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
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

  const counts = {
    characters: (
      editor?.storage.characterCount as { characters: () => number }
    ).characters(),
    words: (editor?.storage.characterCount as { words: () => number }).words(),
  } as const

  const [debouncedValue] = useDebounceValue(counts.words, 500)

  if (!editor) {
    return null
  }

  return (
    <span className="flex items-center gap-1.5 border-neutral-300/40 border-r py-2 pr-5 font-mono text-xs dark:border-neutral-700/40">
      <NumberFlow value={debouncedValue} /> {pluralize(debouncedValue, 'word')}
    </span>
  )
}

const FocusSwitcher = () => {
  const { isFocusMode, toggleIsFocusMode } = useFocusStore()

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
        {isFocusMode ? 'Unfocus' : 'Focus'} <KBD>`</KBD>
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
        <div className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <div className="size-3 rounded-full bg-neutral-900 dark:bg-white" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Theme <KBD>/</KBD>
      </Tooltip.Content>
    </Tooltip>
  )
}

const DeleteButton = ({ noteId }: { noteId: string }) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const utils = api.useUtils()

  const { mutate } = api.notes.delete.useMutation({
    onMutate: () => {
      router.push('/')
    },
    onSuccess: () => {
      utils.notes.getAll.invalidate()
    },
  })

  useHotkeys('d', () => {
    setOpen(true)
  })

  const handleDelete = () => {
    mutate({ id: noteId })
  }

  return (
    <Tooltip>
      <Dropdown open={open} onOpenChange={setOpen}>
        <Dropdown.Trigger className="rounded-full">
          <Tooltip.Trigger asChild>
            <div className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
              <TextStrikethrough className="size-4 text-neutral-900 transition-transform dark:text-white" />
            </div>
          </Tooltip.Trigger>
        </Dropdown.Trigger>
        <Dropdown.Content side="top" sideOffset={12}>
          <Dropdown.Item onClick={handleDelete}>Delete?</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>

      <Tooltip.Content>
        Delete <KBD>D</KBD>
      </Tooltip.Content>
    </Tooltip>
  )
}

const SignOutButton = () => {
  useHotkeys('alt+q', () => {
    signOut()
  })

  return (
    <Tooltip>
      <Tooltip.Trigger onClick={() => signOut()}>
        <div className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <ArrowUpRight className="size-4 text-neutral-900 transition-transform dark:text-white" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Sign Out{' '}
        <div className="flex items-center gap-1">
          <KBD>&#8997;</KBD>
          <KBD>Q</KBD>
        </div>
      </Tooltip.Content>
    </Tooltip>
  )
}

const SaveState = ({ isPending, isSuccess, isError }: ToolbarProps) => {
  return (
    <Tooltip>
      <Tooltip.Trigger className="-ml-2 mr-2">
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
            className="flex size-8 items-center justify-center"
          >
            {isPending ? (
              <Spinner />
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

const Notes = () => {
  const [open, setOpen] = useState(false)

  useHotkeys('n', () => {
    setOpen(true)
  })

  const { data } = api.notes.getAll.useQuery()

  return (
    <Tooltip>
      <Dropdown open={open} onOpenChange={setOpen}>
        <Dropdown.Trigger className="rounded-full">
          <Tooltip.Trigger asChild>
            <div className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
              <ListDashes className="size-4 text-neutral-900 transition-transform dark:text-white" />
            </div>
          </Tooltip.Trigger>
        </Dropdown.Trigger>
        <Dropdown.Content
          side="top"
          sideOffset={12}
          className="min-w-xs overflow-y-scroll"
        >
          <ScrollArea.Root className="max-h-60">
            <ScrollArea.Viewport className="space-y-2 p-2">
              {data?.map((note) => {
                return (
                  <Dropdown.Item
                    key={note.id}
                    asChild
                    className="flex w-full items-center justify-between py-2"
                  >
                    <Link href={`/${note.id}`}>
                      <span className="line-clamp-1 max-w-[20ch]">
                        {note.title}
                      </span>

                      <span className="font-mono text-neutral-500 text-xs">
                        <KBD>
                          {format(note.updated_at ?? note.created_at, 'MMM do')}
                        </KBD>
                      </span>
                    </Link>
                  </Dropdown.Item>
                )
              })}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="before:-translate-x-1/2 before:-translate-y-1/2 relative flex-1 rounded-[10px] bg-black before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-11 before:min-w-11" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Dropdown.Content>
      </Dropdown>

      <Tooltip.Content>
        Notes <KBD>N</KBD>
      </Tooltip.Content>
    </Tooltip>
  )
}
