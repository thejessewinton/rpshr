import { type ReactNode } from 'react'

import { Logo } from '~/components/shared/logo'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto w-full max-w-xl space-y-12 px-8'>
      <header className='flex items-center justify-between'>
        <Logo className='size-6 text-neutral-700 dark:text-white' />

        <h1 className='text-sm text-neutral-700 dark:text-neutral-400'>rpshr</h1>
      </header>
      <div className='space-y-4 text-sm font-light leading-loose text-neutral-700 dark:text-neutral-400'>
        {children}
      </div>
    </div>
  )
}
