'use client'

import Link from 'next/link'

import { Logo } from '~/components/shared/logo'

export const Header = () => {
  return (
    <header className="relative z-50 mx-auto flex w-full justify-between py-10">
      <Link href="/" className="rounded-full outline-hidden focus:ring-1">
        <Logo />
      </Link>
    </header>
  )
}
