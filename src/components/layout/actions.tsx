'use client'

import { useState } from 'react'

import { CaretUpDown, CircleDashed, SignOut } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useHotkeys } from 'react-hotkeys-hook'

import { Dropdown } from '~/components/shared/dropdown'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const Actions = () => {
  const { theme, setTheme } = useTheme()
  const { isLoading, data } = api.user.getCurrent.useQuery()
  const [open, setOpen] = useState(false)

  useHotkeys(['m', 'shift+q', 'u'], (_, handler) => {
    switch (handler.keys?.join('')) {
      case 'm':
        setTheme(theme === 'dark' ? 'light' : 'dark')
        break
      case 'q':
        signOut().catch(console.error)
        break
      case 'u':
        setOpen(!open)
        break
    }
  })

  if (isLoading) return null

  return (
    <Dropdown>
      <Dropdown.Trigger className='animate-fade-in'>
        <div className='size-4 rounded-full bg-orange-700' />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch] '>{data?.username}</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Dropdown.Trigger>
      <Dropdown.Content align='end'>
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
          <kbd
            className={classNames(
              'flex size-4 items-center justify-center rounded font-sans text-[10px]',
              'bg-neutral-300/50',
              'dark:bg-neutral-700 dark:text-neutral-400'
            )}
          >
            M
          </kbd>
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => signOut()}>
          <div className='flex items-center gap-3'>
            <SignOut className='size-4 text-neutral-700 dark:text-white' />
            Logout
          </div>
          <kbd
            className={classNames(
              'flex h-4 items-center justify-center rounded px-1 font-sans text-[10px]',
              'bg-neutral-300/50',
              'dark:bg-neutral-700 dark:text-neutral-400'
            )}
          >
            ⇧Q
          </kbd>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  )
}
