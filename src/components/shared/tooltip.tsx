'use client'

import { Tooltip as TooltipPrimitive } from '@base-ui-components/react'

import { cn } from '~/utils/cn'

const Provider = ({ children, ...props }: TooltipPrimitive.Provider.Props) => {
  return (
    <TooltipPrimitive.Provider {...props}>{children}</TooltipPrimitive.Provider>
  )
}

const Root = ({ children, ...props }: TooltipPrimitive.Root.Props) => {
  return <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
}

const Trigger = ({ className, ...props }: TooltipPrimitive.Trigger.Props) => {
  return (
    <TooltipPrimitive.Trigger
      className={cn(
        'rounded-full outline-hidden transition-colors focus:ring-1',
        className,
      )}
      {...props}
    />
  )
}

const Content = ({ className, ...props }: TooltipPrimitive.Popup.Props) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner side="top" sideOffset={24} align="center">
        <TooltipPrimitive.Popup
          className={cn(
            'flex w-full items-center justify-between gap-3 rounded-lg border border-neutral-300/40 bg-white px-1.5 py-1 pl-2 font-mono text-xs dark:border-neutral-700/20 dark:bg-neutral-900',

            className,
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export const Tooltip = {
  Provider,
  Root,
  Trigger,
  Content,
}
