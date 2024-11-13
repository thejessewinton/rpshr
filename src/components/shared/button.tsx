import { forwardRef, type ComponentPropsWithRef, type ReactNode, type Ref } from 'react'
import Link, { type LinkProps } from 'next/link'

import { cn } from '~/utils/core'

type ButtonProps =
  | ({
      href?: never
      icon?: ReactNode
      disabled?: boolean
    } & ComponentPropsWithRef<'button'>)
  | ({
      href: string
      icon?: ReactNode
      disabled?: boolean
    } & ComponentPropsWithRef<'a'> &
      LinkProps<string>)

export const Button = forwardRef(
  ({ children, icon, className, disabled, ...props }: ButtonProps, ref: Ref<HTMLButtonElement | HTMLAnchorElement>) => {
    if (props.href === undefined) {
      return (
        <button
          className={cn(
            'relative flex min-h-8 w-fit cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-md px-6 text-xs outline-none transition-colors focus:ring-1 focus:ring-sky-600/75 disabled:cursor-not-allowed disabled:opacity-70',
            'border border-neutral-200/70 text-neutral-700 hover:border-neutral-200 dark:border-neutral-700/30 dark:text-neutral-400 hover:dark:border-neutral-700/70',
            className
          )}
          disabled={disabled}
          ref={ref as Ref<HTMLButtonElement>}
          {...props}
        >
          {icon ? icon : null}
          {children}
        </button>
      )
    }

    return (
      <Link
        className={cn(
          'relative flex min-h-8 w-fit cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-md px-6 text-xs outline-none transition-colors focus:ring-1 focus:ring-sky-600/75 disabled:cursor-not-allowed disabled:opacity-70',
          'border border-neutral-200/70 text-neutral-700 hover:border-neutral-200 dark:border-neutral-700/30 dark:text-neutral-400 hover:dark:border-neutral-700/70',
          className
        )}
        ref={ref as Ref<HTMLAnchorElement>}
        {...props}
      >
        {icon ? icon : null}
        {children}
      </Link>
    )
  }
)

Button.displayName = 'Button'
