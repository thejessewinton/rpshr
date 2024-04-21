'use client'

import { CaretUpDown, Plus } from '@phosphor-icons/react'

import { Popover } from '~/components/shared/popover'

export const AddWorkout = () => {
  return (
    <Popover>
      <Popover.Trigger>
        <Plus className='size-4 text-orange-700' />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch] '>Add</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Popover.Trigger>
      <Popover.Content align='end'>Form will go here</Popover.Content>
    </Popover>
  )
}
