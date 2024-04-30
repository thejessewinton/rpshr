import Link from 'next/link'

import { Navigation } from '~/components/layout/navigation'
import { Logo } from '~/components/shared/logo'

export const Header = () => {
  return (
    <header className='flex items-center justify-between px-8 py-4'>
      <Link href='/'>
        <Logo className='size-6' />
      </Link>

      <Navigation />
    </header>
  )
}
