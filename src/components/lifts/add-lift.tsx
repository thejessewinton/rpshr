'use client'

import { Plus } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'
import { z } from 'zod'

import { Input } from '~/components/shared/input'
import { units } from '~/server/db/schema'
import { api } from '~/trpc/react'
import { RouterInputs } from '~/trpc/shared'
import { classNames } from '~/utils/core'

type Values = RouterInputs['lifts']['createNew']

export const AddLift = () => {
  const utils = api.useUtils()
  const { register, handleSubmit, reset, setFocus } = useForm<Values>()

  const { mutate } = api.lifts.createNew.useMutation({
    onSuccess: async () => {
      reset()
      await utils.lifts.getAll.invalidate()
    }
  })

  const onSubmit = (values: Values) => {
    mutate(values)
  }

  useHotkeys(
    'meta+f',
    () => {
      setFocus('name')
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
      <div className='flex items-center gap-1'>
        <Plus className='ml-2 size-4 text-neutral-400 dark:text-neutral-500' />
        <Input
          required
          aria-label='Name'
          placeholder='Deadlift'
          type='text'
          className='max-w-[4.75rem] border-none focus:!bg-transparent'
          tabIndex={1}
          {...register('name')}
        />
        <Input
          required
          aria-label='Weight'
          placeholder='225'
          type='text'
          className='max-w-[4.75rem] border-none focus:!bg-transparent'
          tabIndex={2}
          {...register('weight')}
        />
        <Input
          required
          aria-label='Unit (lbs, kg)'
          placeholder='lbs'
          type='text'
          className='max-w-[4.75rem] border-none focus:!bg-transparent'
          tabIndex={3}
          {...register('unit')}
        />
      </div>
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
