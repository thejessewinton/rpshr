import { useId } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn
} from 'react-hook-form'
import { type z } from 'zod'

import { classNames } from '~/utils/core'

type UseZodForm<TInput extends FieldValues> = UseFormReturn<TInput> & {
  id: string
}

type UseZodFormProps<TSchema extends z.ZodType> = Omit<
  UseFormProps<TSchema['_input'] extends FieldValues ? TSchema['_input'] : FieldValues>,
  'resolver'
> & {
  schema: TSchema
}

export const useZodForm = <TSchema extends z.ZodType>({ schema, ...props }: UseZodFormProps<TSchema>) => {
  const form = useForm<TSchema['_input'] extends FieldValues ? TSchema['_input'] : FieldValues>({
    ...props,
    resolver: zodResolver(schema, undefined, {
      raw: true
    })
  }) as UseZodForm<TSchema['_input'] extends FieldValues ? TSchema['_input'] : FieldValues>

  form.id = useId()

  return form
}

type FormProps<TInput extends FieldValues> = Omit<React.ComponentProps<'form'>, 'onSubmit' | 'id'> & {
  handleSubmit: SubmitHandler<TInput>
  form: UseZodForm<TInput>
}

export function Form<TInput extends FieldValues>({ form, className, handleSubmit, ...props }: FormProps<TInput>) {
  return (
    <FormProvider {...form}>
      <form
        {...props}
        id={form.id}
        onSubmit={async (event) => {
          await form.handleSubmit(async (values) => {
            try {
              await handleSubmit(values)
            } catch (cause) {
              form.setError('root.server', {
                message: (cause as Error)?.message ?? 'Unknown error',
                type: 'server'
              })
            }
          })(event)
        }}
        className={classNames(
          'relative -mx-[2px] flex w-full items-center justify-between gap-1 justify-self-start rounded-md border p-[2px] font-light transition-colors',
          'border-neutral-200/50 text-neutral-700 focus-within:border-neutral-200/90',
          'border-neutral-700/50 dark:text-neutral-400 focus-within:dark:border-neutral-700/90',
          className
        )}
      />
    </FormProvider>
  )
}
