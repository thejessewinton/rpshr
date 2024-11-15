import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '~/utils/core'

export const Ping = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) => {
  return (
    <span className={cn('group relative flex size-2', className)} {...props}>
      <span
        className={cn(
          'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
          'group-data-[variant=success]:bg-green-600/50',
          'group-data-[variant=pending]:bg-yellow-600/50',
        )}
      />
      <span
        className={cn(
          'relative inline-flex size-2 rounded-full',
          'group-data-[variant=success]:bg-green-800',
          'group-data-[variant=pending]:bg-yellow-800',
          'group-data-[variant=idle]:bg-neutral-600',
        )}
      />
    </span>
  )
}
