'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '~/components/shared/button'
import { Input } from '~/components/shared/input'
import { api } from '~/trpc/react'

export const Waitlist = () => {
  const { register, handleSubmit } = useForm<{ email: string }>({
    defaultValues: {
      email: ''
    }
  })

  const { mutate } = api.marketing.joinWaitlist.useMutation({
    onSuccess: (data) => {
      toast.success(data.message, {
        icon: <></>
      })
    }
  })

  const onSubmit = (values: { email: string }) => {
    mutate(values)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      className='!mt-16 flex w-full rounded border border-neutral-200/70 focus-within:border-neutral-200/90 hover:border-neutral-200/90 dark:border-neutral-700/30 focus-within:dark:border-neutral-700/70 hover:dark:border-neutral-700/70'
    >
      <Input
        type='email'
        placeholder='Enter your email to join the waitlist...'
        className='flex-1 rounded-r-none border-0'
        {...register('email')}
      />
      <Button
        type='submit'
        className='rounded-l-none border-y-0 border-r-0 hover:bg-neutral-200/70 hover:dark:bg-neutral-700/20'
      >
        Sign up
      </Button>
    </form>
  )
}
