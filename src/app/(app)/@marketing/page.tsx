import Link from 'next/link'

import { Logo } from '~/components/shared/logo'

export default function IndexPage() {
  return (
    <div className='mx-auto w-full'>
      <header className='flex items-center justify-between'>
        <Link href='/'>
          <Logo className='size-6 text-neutral-700 dark:text-white' />
        </Link>
      </header>

      <div className='space-y-4 text-sm font-light leading-loose text-neutral-700 dark:text-neutral-400'>
        <div className='flex-col gap-2'>
          <h2 className='text-4xl text-white'>Breathe.</h2>
          <h2 className='text-4xl text-white'>Focus.</h2>
          <h2 className='text-4xl text-white'>Write.</h2>
        </div>

        <p>Communicate your thoughts without distraction.</p>
      </div>
    </div>
  )
}
