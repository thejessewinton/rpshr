'use client'

import { CaretUpDown, ChatTeardropText } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '~/components/shared/button'
import { Popover } from '~/components/shared/popover'
import { TextArea } from '~/components/shared/textarea'
import { api } from '~/trpc/react'
import { type RouterInputs } from '~/trpc/shared'

type Values = RouterInputs['marketing']['feedback']

export const Feedback = () => {
  const feedback = api.marketing.feedback.useMutation({
    onSuccess: (data) => toast.success(data.message)
  })

  const { register, handleSubmit } = useForm<Values>({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit = (values: Values) => {
    feedback.mutate(values)
  }

  return (
    <Popover>
      <Popover.Trigger>
        <ChatTeardropText className='size-4 text-neutral-700 dark:text-neutral-400' />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch] '>Feedback</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Popover.Trigger>
      <Popover.Content align='end'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextArea {...register('message')} placeholder='Share your feedback...' className='w-full resize-none' />
          <Button type='submit' className='!mt-2'>
            Submit
          </Button>
        </form>
      </Popover.Content>
    </Popover>
  )
}
