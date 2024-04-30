import Link from 'next/link'

import { Navigation } from '~/components/layout/navigation'
import { Logo } from '~/components/shared/logo'

export const Header = () => {
  return (
    <header className='flex items-center justify-between px-8 py-4'>
      <div className='mx-auto flex w-full items-center gap-4'>
        <Link href='/'>
          <Logo className='size-6' />
        </Link>
        <div className='h-4 w-px rotate-[16deg] bg-neutral-700' />
        <Navigation />
      </div>
    </header>
  )
}
