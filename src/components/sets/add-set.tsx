'use client'

import { type ComponentProps } from 'react'

import { Plus } from '@phosphor-icons/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'

import { Form, useZodForm } from '~/components/shared/form'
import { Input } from '~/components/shared/input'
import { KBD } from '~/components/shared/kbd'
import { setSchema } from '~/server/api/schemas/sets'
import { api } from '~/trpc/react'

type AddSetProps = { liftSlug: string; liftId: number } & ComponentProps<'form'>

export const AddSet = ({ liftSlug, liftId, ...props }: AddSetProps) => {
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
    '/',
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
      {...props}
    >
      <Input
        required
        aria-label='Add sets'
        placeholder='Add a set e.g. 5 5 225lbs, Today, Felt light'
        type='text'
        autoFocus
        icon={<Plus className='ml-2 size-4 text-neutral-400 dark:text-neutral-500' />}
        kbd={<KBD>/</KBD>}
        className='w-full border-none focus:bg-transparent'
        {...form.register('sets')}
      />
    </Form>
  )
}
