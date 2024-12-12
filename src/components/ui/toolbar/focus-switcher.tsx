import { PenNib } from '@phosphor-icons/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { KBD } from '~/components/shared/kbd'
import { Tooltip } from '~/components/shared/tooltip'
import { useFocusStore } from '~/state/use-focus-store'
import { cn } from '~/utils/core'

export const FocusSwitcher = () => {
  const { isFocusMode, toggleIsFocusMode } = useFocusStore()

  useHotkeys('`', () => {
    toggleIsFocusMode()
  })

  return (
    <Tooltip.Root>
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
    </Tooltip.Root>
  )
}
