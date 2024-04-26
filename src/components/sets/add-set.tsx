'use client'

import { Plus } from '@phosphor-icons/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'

import { Input } from '~/components/shared/input'
import { setSchema } from '~/server/api/schemas/sets'
import { api } from '~/trpc/react'
import { RouterInputs } from '~/trpc/shared'
import { classNames } from '~/utils/core'
import { Form, useZodForm } from '../shared/form'

export const AddSet = ({ liftSlug, liftId }: { liftSlug: string; liftId: number }) => {
  const utils = api.useUtils()

  const form = useZodForm({
    schema: setSchema,
    defaultValues: {
      sets: '',
      lift_id: liftId
    }
  })

  const addSetMutation = api.sets.addSets.useMutation({
    onSuccess: async (data) => {
      toast.success(data.message)
      await utils.lifts.getLiftBySlug.invalidate({ slug: liftSlug })
      form.reset()
    }
  })

  useHotkeys(
    'meta+f',
    () => {
      form.setFocus('sets')
    },
    { preventDefault: true },
    {
      enableOnFormTags: ['input']
    }
  )

  return (
    <Form
      form={form}
      handleSubmit={async (values) => {
        await addSetMutation.mutateAsync(values)
      }}
      autoComplete='off'
      autoCorrect='off'
      className={classNames(
        'relative -mx-[2px] flex w-full max-w-lg items-center justify-between gap-1 rounded-md border p-[2px] font-light transition-colors',
        'border-neutral-200/50 text-neutral-700 focus-within:border-neutral-200/90',
        'border-neutral-700/50 dark:text-neutral-400 focus-within:dark:border-neutral-700/90'
      )}
    >
      <Plus className='ml-2 size-4 text-neutral-400 dark:text-neutral-500' />
      <Input
        required
        aria-label='Add sets'
        placeholder='Add a set e.g. 5 5 225lbs, Today, Felt light'
        type='text'
        autoFocus
        className='w-full border-none focus:!bg-transparent'
        {...form.register('sets')}
      />
      <div className='mr-4 flex gap-1'>
        <kbd
          className={classNames(
            'flex size-4 items-center justify-center rounded font-sans text-[10px]',
            'bg-neutral-300/50',
            'dark:bg-neutral-700 dark:text-neutral-400'
          )}
        >
          ⌘
        </kbd>
        <kbd
          className={classNames(
            'flex size-4 items-center justify-center rounded font-sans text-[10px]',
            'bg-neutral-300/50',
            'dark:bg-neutral-700 dark:text-neutral-400'
          )}
        >
          F
        </kbd>
      </div>
    </Form>
  )
}
