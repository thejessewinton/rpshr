'use client'

import { Plus } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'

import { Input } from '~/components/shared/input'
import { api } from '~/trpc/react'
import { RouterInputs } from '~/trpc/shared'
import { classNames } from '~/utils/core'

type Values = RouterInputs['sets']['addSets']

export const AddSet = ({ liftSlug, liftId }: { liftSlug: string; liftId: number }) => {
  const utils = api.useUtils()
  const { register, handleSubmit, reset, setFocus } = useForm<Values>({
    defaultValues: {
      sets: '',
      lift_id: liftId
    }
  })

  const { mutate } = api.sets.addSets.useMutation({
    onSuccess: async () => {
      reset()
      await utils.lifts.getLiftBySlug.invalidate({ slug: liftSlug })
    }
  })

  const onSubmit = (values: Values) => {
    mutate(values)
  }

  useHotkeys(
    'meta+f',
    () => {
      setFocus('sets')
    },
    { preventDefault: true },
    {
      enableOnFormTags: ['input']
    }
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        placeholder='Add set e.g. 5x5@165lbs, 3x3@175lbs, Today, Felt light'
        type='text'
        autoFocus
        className='w-full border-none focus:!bg-transparent'
        {...register('sets')}
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
