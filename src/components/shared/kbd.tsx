import { type ReactNode } from 'react'

import { cn } from '~/utils/core'

export const KBD = ({ children }: { children: ReactNode }) => {
  return (
    <kbd
      className={cn(
        'flex h-4 w-fit min-w-4 items-center justify-center rounded p-1 font-sans text-[10px]',
        'bg-neutral-300/50',
        'dark:bg-neutral-800 dark:text-neutral-400'
      )}
    >
      {children}
    </kbd>
  )
}
