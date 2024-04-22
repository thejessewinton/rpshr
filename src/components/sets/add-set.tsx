'use client'

import { Plus } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'
import { z } from 'zod'

import { Input } from '~/components/shared/input'
import { units } from '~/server/db/schema'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const AddSet = ({ liftSlug, liftId }: { liftSlug: string; liftId: number }) => {
  const utils = api.useUtils()
  const { register, handleSubmit, reset, setFocus } = useForm<{ set: string }>()

  const { mutate } = api.sets.createNew.useMutation({
    onSuccess: async () => {
      reset()
      await utils.lifts.getBySlug.invalidate({ slug: liftSlug })
    }
  })

  const onSubmit = (values: { set: string }) => {
    const setSchema = z.object({
      reps: z.string().transform(Number),
      sets: z.string().transform(Number),
      weight: z.string().transform(Number),
      unit: z.enum(units),
      date: z.string(),
      notes: z.string().max(255).optional()
    })
    const [reps, sets, weight, unit, rawDate, notes] = values.set.split(',').map((v) => v.trim())

    const date = rawDate === 'Today' ? dayjs().format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')

    const set = setSchema.parse({ reps, sets, weight, unit, date, notes })

    mutate({ ...set, lift_id: liftId })
  }

  useHotkeys(
    'meta+f',
    () => {
      setFocus('set')
    },
    { preventDefault: true }
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      className={classNames(
        'relative -mx-[2px] flex w-full max-w-lg items-center justify-between gap-1 rounded-md border p-[2px] font-light transition-colors',
        'border-neutral-200/50 text-neutral-700 focus-within:border-neutral-200/90',
        'border-neutral-700/50 dark:text-neutral-400 focus-within:dark:border-neutral-700/90'
      )}
    >
      <Plus className='ml-2 size-4 text-neutral-400 dark:text-neutral-500' />
      <Input
        required
        aria-label='Add a set'
        placeholder='5, 5, 165, lbs, Today, Felt light'
        type='text'
        className='w-full border-none focus:!bg-transparent'
        {...register('set')}
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
    </form>
  )
}
