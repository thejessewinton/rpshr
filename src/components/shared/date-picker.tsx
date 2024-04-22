'use client'

import { useState } from 'react'

import { CalendarBlank } from '@phosphor-icons/react'
import dayjs from 'dayjs'

import { Button } from '~/components/shared/button'
import { Calendar } from '~/components/shared/calendar'
import { Popover } from '~/components/shared/popover'

export const DatePicker = () => {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <Popover.Trigger className='text-sm' asChild>
        <Button className='h-10 w-full justify-start rounded py-2 text-left font-normal'>
          <CalendarBlank className='mr-2 size-4' />
          {date ? dayjs(date).format('MMMM D, YYYY') : <span>Date</span>}
        </Button>
      </Popover.Trigger>
      <Popover.Content className='w-auto p-0' align='end'>
        <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
      </Popover.Content>
    </Popover>
  )
}
