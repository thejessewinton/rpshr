import { TextStrikethrough } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Dropdown } from '~/components/shared/dropdown'
import { KBD } from '~/components/shared/kbd'
import { Tooltip } from '~/components/shared/tooltip'
import { api } from '~/trpc/react'

export const DeleteNote = ({ noteId }: { noteId: string }) => {
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
    <Tooltip.Root>
      <Dropdown.Root open={open} onOpenChange={setOpen}>
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
      </Dropdown.Root>

      <Tooltip.Content>
        Delete <KBD>D</KBD>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
