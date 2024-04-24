'use client'

import { useRouter } from 'next/navigation'

import { CaretUpDown, CircleDashed, SignOut, User } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useHotkeys } from 'react-hotkeys-hook'

import { Dropdown } from '~/components/shared/dropdown'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const Actions = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { isLoading, data } = api.user.getCurrent.useQuery()

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleGoToProfile = () => {
    router.push('/profile')
  }

  useHotkeys(['shift+q', 'm', 'p'], (_, handler) => {
    switch (handler.keys?.join('')) {
      case 'm':
        handleToggleTheme()
        break
      case 'p':
        handleGoToProfile()
        break
      case 'q':
        signOut()
        break
    }
  })

  if (isLoading) return null

  return (
    <Dropdown>
      <Dropdown.Trigger className='animate-fade-in'>
        <div className='size-4 rounded-full bg-orange-900' />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch]'>{data?.name}</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Dropdown.Trigger>
      <Dropdown.Content align='end'>
        <Dropdown.Item onSelect={handleGoToProfile}>
          <div className='flex items-center gap-3'>
            <User className='size-4 text-neutral-700 dark:text-white' />
            Profile
          </div>
          <kbd
            className={classNames(
              'flex size-4 items-center justify-center rounded font-sans text-[10px]',
              'bg-neutral-300/50',
              'dark:bg-neutral-700 dark:text-neutral-400'
            )}
          >
            P
          </kbd>
        </Dropdown.Item>
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
        <Dropdown.Separator />
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
