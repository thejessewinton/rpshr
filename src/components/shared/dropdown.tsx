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
          'flex cursor-pointer items-center font-light outline-hidden transition-colors focus:ring-2',
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
          'flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm px-1.5 py-1 pl-2 outline-hidden',
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

const DropdownSub = ({ ...props }: DropdownPrimitive.DropdownMenuSubProps) => {
  return <DropdownPrimitive.Sub {...props} />
}

DropdownSub.displayName = 'DropdownSub'

const DropdownSubTrigger = forwardRef(
  (
    { className, ...props }: DropdownPrimitive.DropdownMenuSubTriggerProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <DropdownPrimitive.SubTrigger
        className={cn(
          'flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm p-2 outline-hidden',
          'radix-highlighted:bg-neutral-200/70 radix-highlighted:text-neutral-700 focus:bg-neutral-200/70 focus:text-neutral-700',
          'dark:radix-highlighted:bg-neutral-700/20 dark:radix-highlighted:text-white dark:focus:bg-neutral-700/20 dark:focus:text-white',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

DropdownSubTrigger.displayName = 'DropdownSubTrigger'

const DropdownSubContent = forwardRef(
  (
    { className, ...props }: DropdownPrimitive.DropdownMenuSubContentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <DropdownPrimitive.SubContent
        className={cn(
          'mt-1 w-40 radix-state-closed:animate-fade-out space-y-1 overflow-hidden rounded-lg border p-1 text-xs shadow-black/10 shadow-lg backdrop-blur-sm',
          'border-neutral-200/70 bg-neutral-100/70 text-neutral-700',
          'dark:border-neutral-700/30 dark:bg-neutral-800/70 dark:text-neutral-400',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

DropdownSubContent.displayName = 'DropdownSubContent'

const DropdownSeparator = forwardRef(
  (
    { className, ...props }: DropdownPrimitive.DropdownMenuSeparatorProps,
    ref: Ref<HTMLHRElement>,
  ) => {
    return (
      <DropdownPrimitive.Separator
        className={cn(
          'my-1 h-px w-full',
          'bg-neutral-300',
          'dark:bg-neutral-700',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

DropdownSeparator.displayName = 'DropdownSeparator'

Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent
Dropdown.Item = DropdownItem
Dropdown.Sub = DropdownSub
Dropdown.SubTrigger = DropdownSubTrigger
Dropdown.SubContent = DropdownSubContent
Dropdown.Separator = DropdownSeparator
