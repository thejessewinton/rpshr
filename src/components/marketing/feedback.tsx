'use client'

import { useEffect } from 'react'

import { CaretUpDown, ChatTeardropText } from '@phosphor-icons/react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

import { Button } from '~/components/shared/button'
import { Popover } from '~/components/shared/popover'
import { TextArea } from '~/components/shared/textarea'
import { feedbackAction } from '~/server/actions/marketing'

export const Feedback = () => {
  const [state, action] = useFormState(feedbackAction, { message: '', success: false })

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
    }
  }, [state.success])

  return (
    <Popover>
      <Popover.Trigger>
        <ChatTeardropText className='size-4 text-neutral-700 dark:text-neutral-400' />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch] '>Feedback</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Popover.Trigger>
      <Popover.Content align='end'>
        <form action={action}>
          <TextArea name='message' placeholder='Share your feedback...' className='w-full resize-none' />
          <Button type='submit' className='!mt-2'>
            Submit
          </Button>
        </form>
      </Popover.Content>
    </Popover>
  )
}
