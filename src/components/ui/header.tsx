'use client'

import Link from 'next/link'

import { Logo } from '~/components/shared/logo'

export const Header = () => {
  return (
    <header className='relative z-50 mx-auto flex w-full max-w-3xl justify-between py-10'>
      <Link href='/'>
        <Logo />
      </Link>
    </header>
  )
}
