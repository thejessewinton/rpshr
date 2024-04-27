'use client'

import { useEffect } from 'react'

import { User } from '@phosphor-icons/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'

import { Form, useZodForm } from '~/components/shared/form'
import { Input } from '~/components/shared/input'
import { updateUserSchema } from '~/server/api/schemas/user'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const ProfileForm = () => {
  const utils = api.useUtils()
  const user = api.user.getCurrent.useQuery()

  const updateUser = api.user.updateUsername.useMutation({
    onSuccess: async (data) => {
      await utils.user.getCurrent.invalidate()
      toast.success(data.message)
    }
  })

  const form = useZodForm({
    defaultValues: {
      username: user.data?.username ?? ''
    },
    schema: updateUserSchema
  })

  useEffect(() => {
    if (user.data) {
      form.setValue('username', user.data?.username ?? '')
    }
  }, [form, user.data])

  useHotkeys(
    'meta+f',
    () => {
      form.setFocus('username')
    },
    { preventDefault: true },
    {
      enableOnFormTags: ['input']
    }
  )

  if (!user.data) return null

  return (
    <Form
      form={form}
      handleSubmit={async (values) => updateUser.mutateAsync(values)}
      autoComplete='off'
      autoCorrect='off'
    >
      <User className='ml-2 size-4 text-neutral-400 dark:text-neutral-500' />
      <Input
        required
        aria-label='Add a set'
        placeholder='Update your username'
        type='text'
        autoFocus
        className='w-full border-none focus:!bg-transparent'
        {...form.register('username')}
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
