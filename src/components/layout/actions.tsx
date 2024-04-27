'use client'

import { useRouter } from 'next/navigation'

import { CaretUpDown, CircleDashed, SignOut, User } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useHotkeys } from 'react-hotkeys-hook'

import { Dropdown } from '~/components/shared/dropdown'
import { api } from '~/trpc/react'
import { KBD } from '../shared/kbd'

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
        void signOut()
        break
    }
  })

  if (isLoading || !data) return null

  return (
    <Dropdown>
      <Dropdown.Trigger className='animate-fade-in'>
        <div className='size-4 rounded-full bg-orange-700' />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch]'>
          {data.username ? data.username : data.name}
        </span>
        <CaretUpDown className='size-3 text-inherit' />
      </Dropdown.Trigger>
      <Dropdown.Content align='end'>
        <Dropdown.Item onSelect={handleGoToProfile}>
          <div className='flex items-center gap-3'>
            <User className='size-4 text-neutral-700 dark:text-white' />
            Profile
          </div>
          <KBD>P</KBD>
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
          <KBD>M</KBD>
        </Dropdown.Item>
        <Dropdown.Separator />
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
