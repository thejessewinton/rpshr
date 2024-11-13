import Link from 'next/link'

import { Logo } from '~/components/shared/logo'
import { Header } from '~/components/ui/header'

export default function IndexPage() {
  return (
    <div className='mx-auto w-full'>
      <Header />

      <div className='space-y-4 text-sm leading-loose text-neutral-700 dark:text-neutral-400'>
        <div className='flex gap-1'>
          <h2 className='animate-enter font-medium text-white'>Breathe.</h2>
          <h2 className='animate-enter font-medium text-white [animation-delay:250ms]'>Focus.</h2>
          <h2 className='animate-enter font-medium text-white [animation-delay:500ms]'>Write.</h2>
        </div>

        <p>Communicate your thoughts without distraction.</p>
      </div>
    </div>
  )
}
