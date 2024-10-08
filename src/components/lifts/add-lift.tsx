'use client'

import { Plus } from '@phosphor-icons/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'

import { Form, useZodForm } from '~/components/shared/form'
import { Input } from '~/components/shared/input'
import { KBD } from '~/components/shared/kbd'
import { liftSchema } from '~/server/api/schemas/lifts'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const AddLift = () => {
  const utils = api.useUtils()
  const form = useZodForm({
    defaultValues: {
      lift: ''
    },
    schema: liftSchema
  })

  const addLiftMutation = api.lifts.createLift.useMutation({
    onSuccess: async (data) => {
      toast.success(data.message)
      await utils.lifts.getAllLifts.invalidate()
      form.reset()
    }
  })

  useHotkeys(
    'meta+f',
    () => {
      form.setFocus('lift')
    },
    { preventDefault: true }
  )

  return (
    <Form
      form={form}
      handleSubmit={async (values) => {
        await addLiftMutation.mutateAsync(values)
      }}
      autoComplete='off'
      autoCorrect='off'
      className={classNames(
        'relative -mx-[2px] flex items-center justify-between gap-1 rounded-md border p-[2px] font-light transition-colors',
        'border-neutral-200/50 text-neutral-700 focus-within:border-neutral-200/90',
        'border-neutral-700/50 dark:text-neutral-400 focus-within:dark:border-neutral-700/90'
      )}
    >
      <Input
        required
        aria-label='Add a lift'
        placeholder='Add a lift e.g. Deadlift, 225lbs, Today'
        type='text'
        autoFocus
        className='w-full border-none focus:bg-transparent'
        icon={<Plus className='ml-2 size-4 text-neutral-400 dark:text-neutral-500' />}
        kbd={
          <>
            <KBD>⌘</KBD>
            <KBD>F</KBD>
          </>
        }
        {...form.register('lift')}
      />
    </Form>
  )
}
