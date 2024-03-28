import type { Route } from 'next'
import Link from 'next/link'

import { auth } from '~/server/auth'
import { classNames } from '~/utils/core'
import { Actions } from './actions'

const items: Array<{
  label: string
  href: Route<string>
}> = [
  {
    label: 'Lifts',
    href: '/'
  },
  { label: 'Profile', href: '/profile' }
]

export const Sidebar = async () => {
  const session = await auth()

  return (
    <div className='sticky top-0 h-screen w-52 bg-neutral-50 px-3 drop-shadow-sm dark:bg-neutral-950'>
      <Actions session={session!} />
      <div className='flex flex-col text-xs text-neutral-300'>
        {items.map((item) => {
          return (
            <div className='rounded px-3 py-2' key={item.label}>
              <Link href={item.href} className='block w-full'>
                {item.label}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
