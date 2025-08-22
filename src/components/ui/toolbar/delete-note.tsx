import { TextStrikethrough } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { KBD } from '~/components/shared/kbd'
import { Menu } from '~/components/shared/menu'
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
      <Menu.Root open={open} onOpenChange={setOpen}>
        <Menu.Trigger className="rounded-full">
          <Tooltip.Trigger
            render={
              <div className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <TextStrikethrough className="size-4 text-neutral-900 transition-transform dark:text-white" />
              </div>
            }
          />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner side="top" sideOffset={12}>
            <Menu.Popup>
              <Menu.Item onClick={handleDelete}>Delete?</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Tooltip.Content>
        Delete <KBD>D</KBD>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
