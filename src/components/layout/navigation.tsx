'use client'

import { useState } from 'react'
import { type Route } from 'next'
import { usePathname, useRouter } from 'next/navigation'

import { CaretUpDown, Check, CircleDashed, HouseSimple, SignOut } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useHotkeys } from 'react-hotkeys-hook'

import { Dropdown } from '~/components/shared/dropdown'
import { api } from '~/trpc/react'
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
  }
]

export const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { data } = api.lifts.getAll.useQuery()

  const liftKeys = data?.map((item, i) => {
    return {
      label: (i + 1).toString(),
      hotkey: (i + 1).toString(),
      slug: item.slug
    }
  })

  useHotkeys(liftKeys?.map((item) => item.hotkey) ?? [], (e) => {
    const lift = data?.find((lift) => lift.slug === liftKeys?.find((key) => key.hotkey === e.key)?.slug)
    if (lift) {
      router.push(`/lift/${lift.slug}`)
    }
  })

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className={classNames('size-4 rounded-full bg-sky-600 dark:bg-sky-800')} />
        <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch] '>Lifts</span>
        <CaretUpDown className='size-3 text-inherit' />
      </Dropdown.Trigger>
      <Dropdown.Content align='start'>
        {data &&
          data.map((lift, index) => {
            const isActive = lift.slug === pathname
            const isLessThanTen = index < 9
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
                {isActive ? (
                  <Check className='size-4' />
                ) : isLessThanTen ? (
                  <kbd
                    className={classNames(
                      'flex size-4 items-center justify-center rounded font-sans text-[10px]',
                      'bg-neutral-300/50',
                      'dark:bg-neutral-700 dark:text-neutral-400'
                    )}
                  >
                    {index + 1}
                  </kbd>
                ) : null}
              </Dropdown.Item>
            )
          })}
      </Dropdown.Content>
    </Dropdown>
  )
}
