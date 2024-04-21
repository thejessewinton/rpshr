'use client'

import { CaretUpDown, CircleDashed, SignOut, User } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'

import { Dropdown } from '~/components/shared/dropdown'

export const Actions = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className='size-4 rounded-full bg-orange-700' />
        <span className='max-w-[20ch] overflow-hidden text-ellipsis text-nowrap '>thejessewinton</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Dropdown.Trigger>
      <Dropdown.Content align='start'>
        <Dropdown.Item>
          <div className='flex items-center gap-3'>
            <User className='size-4 text-neutral-700 dark:text-white' />
            Profile
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          onSelect={(e) => {
            e.preventDefault()
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
        >
          <div className='flex items-center gap-3'>
            <CircleDashed className='size-4 text-neutral-700 dark:text-white' />
            Theme
          </div>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => signOut()}>
          <div className='flex items-center gap-3'>
            <SignOut className='size-4 text-neutral-700 dark:text-white' />
            Logout
          </div>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  )
}
