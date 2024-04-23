'use client'

import { useEffect } from 'react'

import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

import { Button } from '~/components/shared/button'
import { Input } from '~/components/shared/input'
import { waitlist } from '~/server/actions/waitlist'

export const Waitlist = () => {
  const { result, reset } = useAction(waitlist)

  useEffect(() => {
    if (result.data?.success) {
      toast.success(result.data?.message, {
        icon: <></>
      })
      reset()
    }
  }, [result.data?.success])

  return (
    <form
      action={waitlist}
      autoComplete='off'
      className='!mt-16 flex w-full rounded border border-neutral-200/70 focus-within:border-neutral-200/90 hover:border-neutral-200/90 dark:border-neutral-700/30 focus-within:dark:border-neutral-700/70 hover:dark:border-neutral-700/70'
    >
      <Input type='email' placeholder='Join the waitlist...' className='flex-1 rounded-r-none border-0' name='email' />
      <Button
        type='submit'
        className='rounded-l-none border-y-0 border-r-0 hover:bg-neutral-200/70 hover:dark:bg-neutral-700/20'
      >
        Sign up
      </Button>
    </form>
  )
}
