import { forwardRef, Ref } from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '~/utils/core'

export const Tooltip = ({ children, ...props }: TooltipPrimitive.TooltipProps) => {
  return <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
}
const TooltipTrigger = forwardRef(
  ({ className, ...props }: TooltipPrimitive.TooltipTriggerProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <TooltipPrimitive.Trigger
        className={cn('rounded-full outline-none transition-colors focus:ring-2', className)}
        ref={ref}
        {...props}
      />
    )
  }
)

TooltipTrigger.displayName = 'TooltipTrigger'

const TooltipContent = forwardRef(
  (
    { className, side = 'top', sideOffset = 12, align = 'center', ...props }: TooltipPrimitive.TooltipContentProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <TooltipPrimitive.Content
        className={cn(
          'flex w-full items-center justify-between gap-3 rounded-md bg-neutral-950 px-1.5 py-1 pl-2 font-mono text-xs shadow-sm shadow-black/20 radix-state-delayed-open:animate-menu',
          className
        )}
        side={side}
        sideOffset={sideOffset}
        align={align}
        ref={ref}
        {...props}
      />
    )
  }
)

TooltipContent.displayName = 'TooltipContent'

Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent
Tooltip.Provider = TooltipPrimitive.Provider
