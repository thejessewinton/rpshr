'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { CaretUpDown } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { Button } from '~/components/shared/button'
import { Form, useZodForm } from '~/components/shared/form'
import { Popover } from '~/components/shared/popover'
import { TextArea } from '~/components/shared/textarea'
import { feedbackSchema } from '~/server/api/schemas/marketing'
import { api } from '~/trpc/react'

export const Feedback = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const form = useZodForm({
    defaultValues: {
      message: '',
      pathname
    },
    schema: feedbackSchema
  })

  const feedback = api.marketing.feedback.useMutation({
    onSuccess: (data) => {
      toast.success(data.message)
      form.reset()
      setOpen(false)
    }
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch]'>Feedback</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Popover.Trigger>
      <Popover.Content align='end'>
        <Form
          form={form}
          handleSubmit={async (values) => feedback.mutateAsync(values)}
          className='flex-col items-start border-0'
        >
          <TextArea
            {...form.register('message')}
            placeholder='Share your feedback...'
            className='w-full resize-none transition-colors focus:bg-neutral-900/50'
          />
          <Button type='submit' className='!mt-2'>
            Submit
          </Button>
        </Form>
      </Popover.Content>
    </Popover>
  )
}
