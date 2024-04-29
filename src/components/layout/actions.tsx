'use client'

import { CaretUpDown, CircleDashed, SignOut } from '@phosphor-icons/react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useHotkeys } from 'react-hotkeys-hook'

import { Dropdown } from '~/components/shared/dropdown'
import { KBD } from '../shared/kbd'

export const Actions = () => {
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useHotkeys(['shift+q', 'm'], (_, handler) => {
    switch (handler.keys?.join('')) {
      case 'm':
        handleToggleTheme()
        break
        break
      case 'q':
        void signOut()
        break
    }
  })

  if (!session) return null

  return (
    <Dropdown>
      <Dropdown.Trigger className='animate-fade-in'>
        <div className='size-4 rounded-full bg-orange-700' />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch]'>
          {session.user.name}
        </span>
        <CaretUpDown className='size-3 text-inherit' />
      </Dropdown.Trigger>
      <Dropdown.Content align='end'>
        <Dropdown.Item
          onSelect={(e) => {
            e.preventDefault()
            handleToggleTheme()
          }}
        >
          <div className='flex items-center gap-3'>
            <CircleDashed className='size-4 text-neutral-700 dark:text-white' />
            Theme
          </div>
          <KBD>M</KBD>
        </Dropdown.Item>

        <Dropdown.Item onSelect={() => signOut()}>
          <div className='flex items-center gap-3'>
            <SignOut className='size-4 text-neutral-700 dark:text-white' />
            Logout
          </div>
          <KBD>⇧Q</KBD>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  )
}
