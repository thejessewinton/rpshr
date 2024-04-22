import { forwardRef, type ComponentPropsWithRef, type ReactNode, type Ref } from 'react'
import Link, { type LinkProps } from 'next/link'

import { cva, type VariantProps } from 'cva'

import { classNames } from '~/utils/core'

const button = cva(
  'flex min-h-8 w-fit relative overflow-hidden cursor-pointer items-center justify-center transition-colors gap-3 rounded px-6 text-xs outline-none focus:ring-1 focus:ring-sky-600/75 disabled:cursor-not-allowed disabled:opacity-70',
  {
    variants: {
      variant: {
        default:
          'border dark:text-neutral-400 text-neutral-700 border-neutral-200/70 hover:border-neutral-200 dark:border-neutral-700/30 hover:dark:border-neutral-700/70'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

type ButtonProps =
  | ({ href?: never; icon?: ReactNode; disabled?: boolean } & ComponentPropsWithRef<'button'>)
  | ({ href: string; icon?: ReactNode; disabled?: boolean } & ComponentPropsWithRef<'a'> & LinkProps<string>)

export const Button = forwardRef(
  (
    { children, icon, className, variant, disabled, ...props }: ButtonProps & VariantProps<typeof button>,
    ref: Ref<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (props.href === undefined) {
      return (
        <button
          className={classNames(button({ variant, className }))}
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
      <Link className={classNames(button({ variant, className }))} ref={ref as Ref<HTMLAnchorElement>} {...props}>
        {icon ? icon : null}
        {children}
      </Link>
    )
  }
)

Button.displayName = 'Button'
