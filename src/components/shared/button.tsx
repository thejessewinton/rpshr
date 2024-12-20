import Link, { type LinkProps } from 'next/link'
import {
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
  forwardRef,
} from 'react'

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
  (
    { children, icon, className, disabled, ...props }: ButtonProps,
    ref: Ref<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (props.href === undefined) {
      return (
        <button
          className={cn(
            'relative flex min-h-8 w-fit cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-md border px-3 text-xs outline-hidden transition-colors focus:ring-1 focus:ring-sky-600/75 disabled:cursor-not-allowed disabled:opacity-70',
            'border-neutral-300/40 bg-neutral-100 hover:border-neutral-300',
            'dark:border-neutral-700/20 dark:bg-neutral-900 dark:hover:bg-neutral-900/50',
            className,
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
          'relative flex min-h-8 w-fit cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-md border px-3 text-xs outline-hidden transition-colors focus:ring-1 focus:ring-sky-600/75 disabled:cursor-not-allowed disabled:opacity-70',
          'border-neutral-300/40 bg-neutral-100 hover:border-neutral-300',
          'dark:border-neutral-700/20 dark:bg-neutral-900 dark:hover:bg-neutral-900/50',
          className,
        )}
        ref={ref as Ref<HTMLAnchorElement>}
        {...props}
      >
        {icon ? icon : null}
        {children}
      </Link>
    )
  },
)

Button.displayName = 'Button'
