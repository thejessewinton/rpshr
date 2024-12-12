import { Plus } from '@phosphor-icons/react'
import Link from 'next/link'
import { KBD } from '~/components/shared/kbd'
import { Tooltip } from '~/components/shared/tooltip'

export const NewNote = () => {
  return (
    <Tooltip.Root>
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
    </Tooltip.Root>
  )
}
