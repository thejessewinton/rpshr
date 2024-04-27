import { type ReactNode } from 'react'

import { classNames } from '~/utils/core'

export const KBD = ({ children }: { children: ReactNode }) => {
  return (
    <kbd
      className={classNames(
        'flex size-4 items-center justify-center rounded font-sans text-[10px]',
        'bg-neutral-300/50',
        'dark:bg-neutral-700 dark:text-neutral-400'
      )}
    >
      {children}
    </kbd>
  )
}
