import { type ComponentPropsWithoutRef } from 'react'

import { classNames } from '~/utils/core'

export const Ping = ({ className, ...props }: ComponentPropsWithoutRef<'span'>) => {
  return (
    <span className={classNames('group relative flex size-2', className)} {...props}>
      <span
        className={classNames(
          'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
          'group-data-[variant=success]:bg-green-600',
          'group-data-[variant=warning]:bg-orange-600',
          'group-data-[variant=error]:bg-red-600'
        )}
      />
      <span
        className={classNames(
          'relative inline-flex size-2 rounded-full',
          'group-data-[variant=success]:bg-green-800',
          'group-data-[variant=warning]:bg-orange-800',
          'group-data-[variant=error]:bg-red-800'
        )}
      />
    </span>
  )
}
