'use client'

import { useState } from 'react'
import { type Route } from 'next'
import { usePathname, useRouter } from 'next/navigation'

import { CaretUpDown, Check, CircleDashed, SignOut } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useHotkeys } from 'react-hotkeys-hook'

import { Dropdown } from '~/components/shared/dropdown'
import { classNames } from '~/utils/core'

const items: Array<{
  label: string
  color: string
  pathname: Route<string>
  hotkey: string
}> = [
  {
    label: 'Lifts',
    color: 'dark:bg-sky-800 bg-sky-600',
    pathname: '/',
    hotkey: '1'
  },
  {
    label: 'Homepage',
    color: 'dark:bg-teal-800 bg-teal-600',
    pathname: '/login',
    hotkey: '2'
  }
]

export const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState<(typeof items)[number]>(items[0]!)
  const { theme, setTheme } = useTheme()

  useHotkeys(['1', '2', 'm', 'shift+q'], (_, handlers) => {
    switch (handlers.keys?.join('')) {
      case '1':
        router.push('/')
        break
      case '2':
        router.push('/login')
        break
      case 'q':
        signOut().catch(console.error)
        break
      case 'm':
        setTheme(theme === 'dark' ? 'light' : 'dark')
        break
    }
  })

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className={classNames('size-4 rounded-full', activeItem.color)} />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch] '>Navigation</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Dropdown.Trigger>
      <Dropdown.Content align='start'>
        {items.map((item) => {
          const isActive = item.pathname === pathname
          return (
            <Dropdown.Item
              key={item.label}
              onSelect={() => {
                setActiveItem(item)
                router.push(item.pathname)
              }}
            >
              <div className='flex items-center gap-3'>
                <div className={classNames('size-4 rounded-full', item.color)} />
                {item.label}
              </div>
              {isActive ? (
                <Check className='size-4' />
              ) : (
                <kbd
                  className={classNames(
                    'flex size-4 items-center justify-center rounded font-sans text-[10px]',
                    'bg-neutral-300/50',
                    'dark:bg-neutral-700 dark:text-neutral-400'
                  )}
                >
                  {item.hotkey}
                </kbd>
              )}
            </Dropdown.Item>
          )
        })}
        <Dropdown.Separator />
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
