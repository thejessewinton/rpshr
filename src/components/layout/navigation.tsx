'use client'

import { usePathname, useRouter } from 'next/navigation'

import { CaretUpDown, Check, CircleDashed, SignOut } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useHotkeys } from 'react-hotkeys-hook'

import { Dropdown } from '~/components/shared/dropdown'
import { KBD } from '~/components/shared/kbd'
import { api } from '~/trpc/react'

export const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { data } = api.lifts.getAllLifts.useQuery()
  const { theme, setTheme } = useTheme()

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useHotkeys(['shift+q', 'm'], (_, handler) => {
    switch (handler.keys?.join('')) {
      case 'm':
        handleToggleTheme()
        break

      case 'q':
        void signOut()
        break
    }
  })

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger>
          <span className='max-w-[16ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[24ch] '>Navigation</span>
          <CaretUpDown className='size-3 text-inherit' />
        </Dropdown.Trigger>
        <Dropdown.Content align='end' className='w-[175px]'>
          {data?.map((lift) => {
            const isActive = pathname?.includes(lift.slug)

            return (
              <Dropdown.Item
                key={lift.id}
                onSelect={() => {
                  router.push(`/lift/${lift.slug}`)
                }}
              >
                <div className='flex items-center gap-3'>
                  <span className='max-w-[20ch] overflow-hidden text-ellipsis text-nowrap'>{lift.name}</span>
                </div>
                {isActive ? <Check className='size-4' /> : null}
              </Dropdown.Item>
            )
          })}
          <Dropdown.Separator />
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
    </>
  )
}
