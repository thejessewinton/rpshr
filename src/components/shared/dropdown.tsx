'use client'

import { type Ref, forwardRef } from 'react'

import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'

import { cn } from '~/utils/core'

export const Dropdown = ({
  children,
  ...props
}: DropdownPrimitive.DropdownMenuProps) => {
  return <DropdownPrimitive.Root {...props}>{children}</DropdownPrimitive.Root>
}

const DropdownTrigger = forwardRef(
  (
    { className, ...props }: DropdownPrimitive.DropdownMenuTriggerProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <DropdownPrimitive.Trigger
        className={cn(
          'flex items-center font-light outline-hidden transition-colors focus:ring-2',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

DropdownTrigger.displayName = 'DropdownTrigger'

const DropdownContent = forwardRef(
  (
    { className, ...props }: DropdownPrimitive.DropdownMenuContentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <DropdownPrimitive.Content
        className={cn(
          'z-9999 mt-1 w-32 radix-state-open:animate-menu space-y-1 overflow-hidden rounded-lg border p-1 font-mono text-xs shadow-black/10 shadow-lg backdrop-blur-sm',
          'border-neutral-200/70 bg-neutral-100/70 text-neutral-700',
          'dark:border-neutral-700/30 dark:bg-neutral-950 dark:text-neutral-400',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

DropdownContent.displayName = 'DropdownContent'

const DropdownItem = forwardRef(
  (
    { className, ...props }: DropdownPrimitive.DropdownMenuItemProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <DropdownPrimitive.Item
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-sm px-1.5 py-1 pl-2 outline-hidden',
          'radix-highlighted:bg-neutral-200/70 radix-highlighted:text-neutral-700 focus:bg-neutral-200/70 focus:text-neutral-700',
          'dark:radix-highlighted:bg-neutral-700/20 dark:radix-highlighted:text-white dark:focus:bg-neutral-900/20 dark:focus:text-white',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

DropdownItem.displayName = 'DropdownItem'

Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent
Dropdown.Item = DropdownItem
