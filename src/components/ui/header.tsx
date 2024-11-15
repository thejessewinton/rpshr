'use client'

import Link from 'next/link'

import { Logo } from '~/components/shared/logo'
import { Button } from '../shared/button'

export const Header = () => {
  return (
    <header className="relative z-50 mx-auto flex w-full justify-between py-10">
      <Link href="/" className="rounded-full outline-none focus:ring-2">
        <Logo />
      </Link>

      <Button
        href="/login"
        className="animate-enter text-sm [animation-delay:7000ms]"
      >
        Start now
      </Button>
    </header>
  )
}
