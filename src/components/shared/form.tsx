import { useId } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

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

export function Form<TInput extends FieldValues>({ form, handleSubmit, ...props }: FormProps<TInput>) {
  return (
    <FormProvider {...form}>
      <form
        {...props}
        id={form.id}
        onSubmit={(event) => {
          form.handleSubmit(async (values) => {
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
      />
    </FormProvider>
  )
}
