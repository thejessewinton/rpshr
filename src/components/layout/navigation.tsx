'use client'

import { type Route } from 'next'
import { usePathname, useRouter } from 'next/navigation'

import { CaretUpDown, Check } from '@phosphor-icons/react'
import { useHotkeys } from 'react-hotkeys-hook'

import { Dropdown } from '~/components/shared/dropdown'
import { classNames } from '~/utils/core'

export const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  const items: Array<{
    label: string
    color: string
    pathname: Route<string>
    hotkey: string
  }> = [
    {
      label: 'Lifts',
      color: 'bg-blue-400',
      pathname: '/',
      hotkey: '1'
    },
    {
      label: 'Profile',
      color: 'bg-blue-200',
      pathname: '/profile',
      hotkey: '2'
    }
  ]

  useHotkeys('1', () => router.push('/'), [])
  useHotkeys('2', () => router.push('/profile'), [])

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className='size-4 rounded-full bg-blue-400' />
        <span className='max-w-[20ch] overflow-hidden text-ellipsis text-nowrap '>Navigation</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Dropdown.Trigger>
      <Dropdown.Content align='start'>
        {items.map((item) => {
          const isActive = item.pathname === pathname
          return (
            <Dropdown.Item key={item.label} onSelect={() => router.push(item.pathname)}>
              <div className='flex items-center gap-3'>
                <div className={classNames('size-4 rounded-full', item.color)} />
                {item.label}
              </div>
              {isActive ? (
                <Check className='size-4' />
              ) : (
                <kbd
                  className={classNames(
                    'flex size-4 items-center justify-center rounded',
                    'border-neutral-300 bg-neutral-300',
                    'dark:bg-neutral-700 dark:text-neutral-400'
                  )}
                >
                  {item.hotkey}
                </kbd>
              )}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Content>
    </Dropdown>
  )
}
