'use client'

import { type Route } from 'next'
import { usePathname, useRouter } from 'next/navigation'

import { CaretUpDown, Check } from '@phosphor-icons/react'
import { useHotkeys } from 'react-hotkeys-hook'

import { Dropdown } from '~/components/shared/dropdown'
import { KBD } from '~/components/shared/kbd'
import { api } from '~/trpc/react'
import { classNames } from '~/utils/core'
import { Marble } from '../shared/marble'

export const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { data } = api.lifts.getAllLifts.useQuery()

  const liftKeys = data?.map((item, i) => {
    return {
      label: (i + 1).toString(),
      hotkey: (i + 1).toString(),
      slug: item.slug as Route<string>
    }
  })

  useHotkeys(liftKeys?.map((item) => item.hotkey) ?? [], (e) => {
    const lift = data?.find((lift) => lift.slug === liftKeys?.find((key) => key.hotkey === e.key)?.slug)
    if (lift) {
      router.push(`/app/lift/${lift.slug}`)
    }
  })

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger>
          <div className={classNames('size-4 rounded-full bg-sky-600 dark:bg-sky-800')} />
          <span className='max-w-[8ch] overflow-hidden text-ellipsis text-nowrap md:max-w-[20ch] '>Lifts</span>
          <CaretUpDown className='size-3 text-inherit' />
        </Dropdown.Trigger>
        <Dropdown.Content align='start' className='w-[175px]'>
          {data?.map((lift, index) => {
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
                  <Marble>{lift.name}</Marble>
                  <span className='max-w-[20ch] overflow-hidden text-ellipsis text-nowrap'>{lift.name}</span>
                </div>
                {isActive ? <Check className='size-4' /> : isLessThanTen ? <KBD>{index + 1}</KBD> : null}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Content>
      </Dropdown>
    </>
  )
}
