'use client'

import { toast } from 'sonner'

import { Button } from '~/components/shared/button'
import { Form, useZodForm } from '~/components/shared/form'
import { Input } from '~/components/shared/input'
import { waitlistSchema } from '~/server/api/schemas/marketing'
import { api } from '~/trpc/react'

export const Waitlist = () => {
  const waitlist = api.marketing.signup.useMutation({
    onSuccess: (data) => toast.success(data.message)
  })

  const form = useZodForm({
    defaultValues: {
      email: ''
    },
    schema: waitlistSchema
  })

  return (
    <Form
      form={form}
      handleSubmit={async (values) => waitlist.mutateAsync(values)}
      autoComplete='off'
      className='!mt-16'
    >
      <Input
        type='email'
        placeholder='Join the waitlist...'
        className='flex-1 rounded-r-none border-0'
        {...form.register('email')}
      />
      <Button
        type='submit'
        className='rounded-sm rounded-l-none border-y-0 border-r-0 border-neutral-200/50 dark:border-neutral-700/50 hover:dark:text-neutral-100'
      >
        Sign up
      </Button>
    </Form>
  )
}
