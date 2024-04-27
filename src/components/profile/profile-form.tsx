'use client'

import { useEffect } from 'react'

import { User } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'

import { Input } from '~/components/shared/input'
import { api } from '~/trpc/react'
import { type RouterInputs } from '~/trpc/shared'
import { classNames } from '~/utils/core'

type Values = RouterInputs['user']['updateUsername']

export const ProfileForm = () => {
  const utils = api.useUtils()
  const user = api.user.getCurrent.useQuery()
  const updateUser = api.user.updateUsername.useMutation({
    onSuccess: async (data) => {
      await utils.user.getCurrent.invalidate()
      toast.success(data.message)
    }
  })

  const { register, handleSubmit, setValue, setFocus } = useForm<Values>({
    defaultValues: {
      username: user.data?.username ?? ''
    }
  })

  useEffect(() => {
    if (user.data) {
      setValue('username', user.data?.username ?? '')
    }
  }, [setValue, user.data])

  useHotkeys(
    'meta+f',
    () => {
      setFocus('username')
    },
    { preventDefault: true },
    {
      enableOnFormTags: ['input']
    }
  )

  const onSubmit = (values: Values) => {
    updateUser.mutate(values)
  }

  if (!user.data) return null

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      autoCorrect='off'
      className={classNames(
        'relative -mx-[2px] flex w-full items-center justify-between gap-1 rounded-md border p-[2px] font-light transition-colors',
        'border-neutral-200/50 text-neutral-700 focus-within:border-neutral-200/90',
        'border-neutral-700/50 dark:text-neutral-400 focus-within:dark:border-neutral-700/90'
      )}
    >
      <User className='ml-2 size-4 text-neutral-400 dark:text-neutral-500' />
      <Input
        required
        aria-label='Add a set'
        placeholder='Update your username'
        type='text'
        autoFocus
        className='w-full border-none focus:!bg-transparent'
        {...register('username')}
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
