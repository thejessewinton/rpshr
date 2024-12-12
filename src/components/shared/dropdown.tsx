'use client'

import { type Ref, forwardRef } from 'react'

import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'

import { cn } from '~/utils/core'

const Root = ({ children, ...props }: DropdownPrimitive.DropdownMenuProps) => {
  return <DropdownPrimitive.Root {...props}>{children}</DropdownPrimitive.Root>
}

const Trigger = forwardRef(
  (
    { className, ...props }: DropdownPrimitive.DropdownMenuTriggerProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <DropdownPrimitive.Trigger
        className={cn(
          'flex items-center font-light outline-hidden transition-colors focus:ring-1',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

const Content = forwardRef(
  (
    { className, ...props }: DropdownPrimitive.DropdownMenuContentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <DropdownPrimitive.Content
        className={cn(
          'z-9999 mt-1 w-32 radix-state-closed:animate-menu-out radix-state-open:animate-menu-in space-y-1 overflow-hidden rounded-lg border p-1 font-mono text-xs shadow-black/10 shadow-lg backdrop-blur-sm',
          'border-neutral-300/40 bg-neutral-100/70 text-neutral-700',
          'dark:border-neutral-700/30 dark:bg-neutral-900 dark:text-neutral-400',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

const Item = forwardRef(
  (
    { className, ...props }: DropdownPrimitive.DropdownMenuItemProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <DropdownPrimitive.Item
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-sm px-1.5 py-1 pl-2 outline-hidden transition-all',
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

export const Dropdown = {
  Root,
  Trigger,
  Content,
  Item,
}
