'use client'

import { useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'
import { z } from 'zod'

import { Input } from '~/components/shared/input'
import { liftInsertSchema, personalRecordInsertSchema, units } from '~/server/db/schema'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const AddLift = () => {
  const utils = api.useUtils()
  const { register, handleSubmit, reset } = useForm<{ lift: string }>()
  const { mutate } = api.lifts.createNew.useMutation({
    onSuccess: async () => {
      reset()
      await utils.lifts.getAll.invalidate()
    }
  })

  const onSubmit = (values: { lift: string }) => {
    const liftSchema = z.object({
      name: z.string(),
      weight: z.string().transform(Number),
      unit: z.enum(units)
    })
    const [name, weight, unit] = values.lift.split(',').map((v) => v.trim())
    const lift = liftSchema.parse({ name, weight, unit })

    mutate(lift)
  }

  useHotkeys(
    ['meta+k'],
    (_, handlers) => {
      switch (handlers.keys?.join('')) {
        case 'f':
          handleSubmit(onSubmit)
          break
      }
    },
    { preventDefault: true }
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      className={classNames(
        'relative items-center gap-3 rounded border font-light',
        'border-neutral-200/70 text-neutral-700',
        'dark:border-neutral-700/30 dark:text-neutral-400'
      )}
    >
      <Input
        placeholder='Add a new lift and personal record, e.g. Deadlift, 225, lbs'
        {...register('lift')}
        type='text'
        className='w-full border-none focus:!bg-transparent'
      />
    </form>
  )
}
