'use client'

import { Menu as MenuPrimitive } from '@base-ui-components/react'
import { cn } from '~/utils/cn'

const Root = ({ children, ...props }: MenuPrimitive.Root.Props) => {
  return <MenuPrimitive.Root {...props}>{children}</MenuPrimitive.Root>
}

const Trigger = ({ className, ...props }: MenuPrimitive.Trigger.Props) => {
  return (
    <MenuPrimitive.Trigger
      className={cn(
        'flex items-center font-light outline-hidden transition-colors focus:ring-1',
        className,
      )}
      {...props}
    />
  )
}

const Portal = MenuPrimitive.Portal

const Positioner = ({
  children,
  side = 'top',
  sideOffset = 24,
  className,
  ...props
}: MenuPrimitive.Positioner.Props) => {
  return (
    <MenuPrimitive.Positioner
      className={cn('outline-none', className)}
      side={side}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
    </MenuPrimitive.Positioner>
  )
}

const Popup = ({
  className,
  children,
  ...props
}: MenuPrimitive.Popup.Props) => {
  return (
    <MenuPrimitive.Popup
      className={cn(
        'z-9999 mt-1 w-32 origin-(--transform-origin) space-y-1 overflow-hidden rounded-lg border p-1 font-mono text-xs shadow-black/10 shadow-lg outline-none backdrop-blur-sm transition-[transform,opacity,filter]',
        'border-neutral-300/40 bg-neutral-100/70 text-neutral-700',
        'dark:border-neutral-700/30 dark:bg-neutral-900 dark:text-neutral-400',
        className,
      )}
      {...props}
    >
      {children}
    </MenuPrimitive.Popup>
  )
}

const Item = ({ className, ...props }: MenuPrimitive.Item.Props) => {
  return (
    <MenuPrimitive.Item
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-sm px-1.5 py-1 pl-2 outline-hidden transition-all',
        'focus:bg-neutral-200/70 focus:text-neutral-700 data-[highlighted]:bg-neutral-200/70 data-[highlighted]:text-neutral-700',
        'dark:data-[highlighted]:bg-neutral-700/20 dark:data-[highlighted]:text-white dark:focus:bg-neutral-900/20 dark:focus:text-white',
        className,
      )}
      {...props}
    />
  )
}

export const Menu = {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
}
