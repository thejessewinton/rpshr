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
        'min-w-0 max-w-none appearance-none rounded border-none bg-transparent p-0 text-xs !outline-none ring-0',
        'focus:bg-neutral-200/70 focus:text-neutral-700',
        'focus:dark:bg-neutral-700/20 focus:dark:text-white',
        className
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'
