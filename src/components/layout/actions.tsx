'use client'

import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import * as Dropdown from '@radix-ui/react-dropdown-menu'

export const Actions = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className='flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-xs font-light tracking-wide text-neutral-400 outline-none transition-colors hover:bg-neutral-800 focus:ring-1 focus:ring-neutral-400'>
        <span className='max-w-[20ch] overflow-hidden text-ellipsis text-nowrap '>thejessewinton</span>
        <ChevronUpDownIcon className='h-4 w-4 text-neutral-400' />
      </Dropdown.Trigger>
      <Dropdown.Content
        align='start'
        className='mt-1 w-40 rounded-lg border border-neutral-700 bg-neutral-800 p-1 text-xs text-neutral-400 shadow-lg shadow-black/10 radix-state-closed:animate-fade-out'
      >
        <Dropdown.Item className='w-full rounded px-4 py-1 outline-none focus:bg-neutral-700'>
          <button className='w-full text-left'>Profile</button>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
