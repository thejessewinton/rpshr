'use client'

import { CaretUpDown, ChatTeardropText } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { Button } from '~/components/shared/button'
import { Form, useZodForm } from '~/components/shared/form'
import { Popover } from '~/components/shared/popover'
import { TextArea } from '~/components/shared/textarea'
import { feedbackSchema } from '~/server/api/schemas/marketing'
import { api } from '~/trpc/react'

export const Feedback = () => {
  const feedback = api.marketing.feedback.useMutation({
    onSuccess: (data) => toast.success(data.message)
  })

  const form = useZodForm({
    defaultValues: {
      message: ''
    },
    schema: feedbackSchema
  })

  return (
    <Popover>
      <Popover.Trigger>
        <ChatTeardropText className='size-4 text-neutral-700 dark:text-neutral-400' />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch] '>Feedback</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Popover.Trigger>
      <Popover.Content align='end'>
        <Form form={form} handleSubmit={async (values) => feedback.mutateAsync(values)}>
          <TextArea {...form.register('message')} placeholder='Share your feedback...' className='w-full resize-none' />
          <Button type='submit' className='!mt-2'>
            Submit
          </Button>
        </Form>
      </Popover.Content>
    </Popover>
  )
}
