'use client'

import { forwardRef, type Ref } from 'react'

import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '~/utils/core'

export const Popover = ({ children, ...props }: PopoverPrimitive.PopoverProps) => {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
}

const PopoverTrigger = forwardRef(
  ({ className, ...props }: PopoverPrimitive.PopoverTriggerProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <PopoverPrimitive.Trigger
        className={cn(
          'flex cursor-pointer items-center font-light outline-none transition-colors focus:ring-2',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

PopoverTrigger.displayName = 'PopoverTrigger'

const PopoverContent = forwardRef(
  ({ className, ...props }: PopoverPrimitive.PopoverContentProps, ref: Ref<HTMLDivElement>) => {
    return (
      <PopoverPrimitive.Content
        className={cn(
          'z-[9999] mt-1 w-40 space-y-1 overflow-hidden rounded-lg border p-1 font-mono text-xs shadow-lg shadow-black/10 backdrop-blur-sm radix-state-closed:animate-fade-out radix-state-open:animate-fade-in',
          'border-neutral-200/70 bg-neutral-100/70 text-neutral-700',
          'dark:border-neutral-700/30 dark:bg-neutral-950 dark:text-neutral-400',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

PopoverContent.displayName = 'PopoverContent'

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent