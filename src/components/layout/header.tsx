import Link from 'next/link'

import { Navigation } from '~/components/layout/navigation'
import { Feedback } from '~/components/marketing/feedback'
import { Logo } from '~/components/shared/logo'

export const Header = () => {
  return (
    <header className='flex items-center justify-between px-8 py-4'>
      <Link
        href='/'
        className='rounded-lg p-2 outline-none transition-colors hover:bg-neutral-200/70 focus:bg-neutral-200/70 hover:dark:bg-neutral-700/20 focus:dark:bg-neutral-700/20'
      >
        <Logo className='size-6' />
      </Link>

      <div className='flex items-center gap-2'>
        <Feedback />
        <div className='h-4 w-px rotate-[16deg] bg-neutral-400 dark:bg-neutral-700' />
        <Navigation />
      </div>
    </header>
  )
}
