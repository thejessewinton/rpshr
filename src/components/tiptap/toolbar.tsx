'use client'

import { useRouter } from 'next/navigation'

import { FloppyDisk, PenNib } from '@phosphor-icons/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useCurrentEditor } from '@tiptap/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'

import { useWritingStore } from '~/state/use-writing-store'
import { api } from '~/trpc/react'
import { cn } from '~/utils/core'

export const Toolbar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Tooltip.Provider delayDuration={500} skipDelayDuration={5000}>
      <AnimatePresence>
        <motion.div
          className='fixed bottom-10 right-10 z-10 flex origin-center items-center rounded-full bg-neutral-950 py-2 pl-4 pr-2 shadow-sm shadow-black/20'
          initial={{
            opacity: 0,
            translateY: 10
          }}
          animate={{
            opacity: 1,
            translateY: 0
          }}
          transition={{
            duration: 0.5
          }}
        >
          <div className='flex items-center gap-1.5'>
            <span className='font-mono text-xs'>{editor.storage.characterCount.words() as number} words</span>
            <FocusSwitcher />
            <SaveButton />
          </div>
        </motion.div>
      </AnimatePresence>
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
          <PenNib className={cn('size-5 text-white transition-colors')} />
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

const SaveButton = () => {
  const router = useRouter()
  const { mutate } = api.notes.create.useMutation({
    onMutate: () => {
      toast.loading('Saving…')
    },
    onSuccess: ([data]) => {
      router.push(`/notes/${data?.id}`)
      toast.success('Saved!')
      toast.dismiss()
    }
  })
  const { editor } = useCurrentEditor()

  const handleSave = () => {
    if (!editor) {
      return
    }

    mutate({
      title: 'note title',
      body: editor.getHTML()
    })
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger onClick={handleSave}>
        <div className='flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-800'>
          <FloppyDisk className={cn('size-5 text-white transition-colors')} />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content
        side='top'
        align='center'
        sideOffset={2}
        className='w-full rounded-sm bg-neutral-800 p-1 px-2 font-mono text-xs radix-state-delayed-open:animate-tooltip'
      >
        Save
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
