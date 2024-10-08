import { forwardRef, type InputHTMLAttributes, type ReactNode, type Ref } from 'react'

import { classNames } from '~/utils/core'

type InputProps = {
  icon?: ReactNode
  kbd?: ReactNode
  label?: string
  secondaryLabel?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef(
  ({ icon, kbd, name, className, onChange, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <>
        {icon && icon}
        <input
          ref={ref}
          name={name}
          onChange={onChange}
          className={classNames(
            'min-w-0 max-w-none appearance-none rounded border bg-transparent px-3 py-2 text-base outline-none ring-0 placeholder-shown:text-ellipsis sm:text-sm',
            'border-neutral-200/70 text-neutral-700 placeholder:text-neutral-700/70 focus:text-neutral-700',
            'dark:border-neutral-700/30 dark:text-neutral-400 placeholder:dark:text-neutral-400/70  focus:dark:text-white',
            className
          )}
          {...props}
        />
        {kbd && <div className='mr-4 hidden gap-1 md:flex'>{kbd}</div>}
      </>
    )
  }
)

Input.displayName = 'Input'
