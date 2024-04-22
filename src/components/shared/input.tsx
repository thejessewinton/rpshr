import { forwardRef, type InputHTMLAttributes, type Ref } from 'react'

import { classNames } from '~/utils/core'

type InputProps = {
  label?: string
  secondaryLabel?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef(({ name, className, onChange, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      name={name}
      onChange={onChange}
      className={classNames(
        'min-w-0 max-w-none appearance-none rounded border bg-transparent px-2 py-1 text-sm !outline-none ring-0',
        'border-neutral-200/70 text-neutral-700 placeholder:text-neutral-700 focus:text-neutral-700',
        'placeholder:dark:text-neutral-400 focus:dark:text-white',

        'dark:border-neutral-700/30  dark:text-neutral-400',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'
