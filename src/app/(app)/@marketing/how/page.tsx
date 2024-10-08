import { type Metadata } from 'next'
import Link from 'next/link'

import { Logo } from '~/components/shared/logo'

export const metadata: Metadata = {
  title: 'how',
  description: 'learn how rpshr helps you track you progress with beautiful simplicity.'
}

export default function HelpPage() {
  return (
    <div className='mx-auto w-full max-w-xl space-y-12 px-8'>
      <header className='flex items-center justify-between'>
        <Link href='/'>
          <Logo className='size-6 text-neutral-700 dark:text-white' />
        </Link>

        <h2 className='text-sm text-neutral-700 dark:text-neutral-400'>how</h2>
      </header>

      <div className='text-sm font-light leading-loose text-neutral-700 dark:text-neutral-400'>
        <h2 className='mb-2 text-white'>Lifts</h2>
        <p className='mb-8'>
          {`Add a new lift by entering the lift's name, the weight and units of your PR, and the date you achieved it. For example:`}{' '}
          <span className='font-normal text-neutral-900 dark:text-neutral-200'>Deadlift, 405lbs, 05-24-1992</span>. A
          date can also be formatted as{' '}
          <span className='font-normal text-neutral-900 dark:text-neutral-200'>Yesterday</span>, or{' '}
          <span className='font-normal text-neutral-900 dark:text-neutral-200'>Today</span> and rpshr will convert it
          for you.
        </p>

        <h2 className='mb-2 text-white'>Sets</h2>
        <p className='mb-4'>
          {`Navigate to a lift and add new sets by entering any number of sets, reps, it's weight and unit, the date of the workout, and, optionally, a short note. For example:`}{' '}
          <span className='font-normal text-neutral-900 dark:text-neutral-200'>
            3 5 315lbs, 3 5 365lbs, 2 5 415lbs, Today, Felt great
          </span>
          . If you enter any sets with a weight higher than your PR, rpshr will automatically add a new PR to the lift.
        </p>

        <p>Simple and lightweight by default.</p>
      </div>
    </div>
  )
}
