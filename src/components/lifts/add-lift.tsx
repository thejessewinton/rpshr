'use client'

import { Plus } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'
import { z } from 'zod'

import { Input } from '~/components/shared/input'
import { units } from '~/server/db/schema'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const AddLift = () => {
  const utils = api.useUtils()
  const { register, handleSubmit, reset, setFocus } = useForm<{ lift: string }>()

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
    'meta+f',
    () => {
      setFocus('lift')
    },
    { preventDefault: true }
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      className={classNames(
        'relative -mx-[2px] flex items-center justify-between gap-1 rounded-md border p-[2px] font-light transition-colors',
        'border-neutral-200/50 text-neutral-700 focus-within:border-neutral-200/90',
        'border-neutral-700/50 dark:text-neutral-400 focus-within:dark:border-neutral-700/90'
      )}
    >
      <Plus className='ml-2 size-4 text-neutral-400 dark:text-neutral-500' />
      <Input
        required
        aria-label='Add a lift'
        placeholder='Add a lift e.g. Deadlift, 225, lbs'
        type='text'
        className='w-full border-none focus:!bg-transparent'
        {...register('lift')}
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
