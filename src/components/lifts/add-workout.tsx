'use client'

import { CaretUpDown, Plus } from '@phosphor-icons/react'

import { Popover } from '~/components/shared/popover'
import { classNames } from '~/utils/core'
import { Input } from '../shared/input'

export const AddActivity = () => {
  return (
    <Popover>
      <Popover.Trigger>
        <Plus className='size-4 text-white' />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch] '>Add</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Popover.Trigger>
      <Popover.Content align='end'>
        <ActivityForm />
      </Popover.Content>
    </Popover>
  )
}

export const ActivityForm = () => {
  return (
    <form
      autoComplete='off'
      className={classNames(
        'grid grid-cols-1 items-center focus-within:ring md:grid-cols-2',
        'text-neutral-700 focus-within:ring-neutral-200/70',
        'dark:text-neutral-400 focus-within:dark:ring-neutral-700/30'
      )}
    >
      <Input placeholder='Name' type='text' className='focus:!bg-transparent' />
      <Input placeholder='Date' type='date' className='focus:!bg-transparent' />
      <Input placeholder='Sets' type='number' className='focus:!bg-transparent' />
      <Input placeholder='Reps' type='number' className='focus:!bg-transparent' />
    </form>
  )
}
