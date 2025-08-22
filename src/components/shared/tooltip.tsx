'use client'

import { type Ref, forwardRef } from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '~/utils/cn'

const Provider = TooltipPrimitive.Provider

const Root = ({ children, ...props }: TooltipPrimitive.TooltipProps) => {
  return <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
}

const Trigger = forwardRef(
  (
    { className, ...props }: TooltipPrimitive.TooltipTriggerProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    return (
      <TooltipPrimitive.Trigger
        className={cn(
          'rounded-full outline-hidden transition-colors focus:ring-1',
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
    {
      className,
      side = 'top',
      sideOffset = 24,
      align = 'center',
      ...props
    }: TooltipPrimitive.TooltipContentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <TooltipPrimitive.Content
        className={cn(
          'flex w-full radix-state-delayed-open:animate-menu-in items-center justify-between gap-3 rounded-lg border border-neutral-300/40 bg-white px-1.5 py-1 pl-2 font-mono text-xs dark:border-neutral-700/20 dark:bg-neutral-900',
          className,
        )}
        side={side}
        sideOffset={sideOffset}
        align={align}
        ref={ref}
        {...props}
      />
    )
  },
)

export const Tooltip = {
  Provider,
  Root,
  Trigger,
  Content,
}
