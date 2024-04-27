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
      <Button type='submit' className='rounded-l-none border-0 hover:text-neutral-400 hover:dark:text-neutral-100'>
        Sign up
      </Button>
    </Form>
  )
}
