import { forwardRef, type InputHTMLAttributes, type Ref } from 'react'

import { classNames } from '~/utils/core'

type TextAreaProps = {
  label?: string
  secondaryLabel?: string
} & InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = forwardRef(
  ({ name, className, onChange, ...props }: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    return (
      <textarea
        ref={ref}
        name={name}
        onChange={onChange}
        className={classNames(
          'min-w-0 max-w-none appearance-none rounded border-none bg-transparent p-1 text-sm !outline-none ring-0 autofill:shadow-autofill',
          'placeholder:text-neutral-700 focus:bg-neutral-200/70 focus:text-neutral-700',
          'placeholder:dark:text-neutral-400 focus:dark:bg-neutral-700/20 focus:dark:text-white',
          className
        )}
        {...props}
      />
    )
  }
)

TextArea.displayName = 'TextArea'
