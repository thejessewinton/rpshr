import { Waitlist } from '~/components/marketing/waitlist'
import { Logo } from '~/components/shared/logo'

export default function Marketing() {
  return (
    <div className='w-full max-w-xl space-y-12 px-8'>
      <header className='flex items-center justify-between'>
        <Logo className='size-6 text-neutral-700 dark:text-white' />
        <h1 className='text-sm text-neutral-700 dark:text-white'>rup • ture</h1>
      </header>

      <div className='space-y-4 text-sm font-light leading-loose text-neutral-700 dark:text-neutral-400'>
        <p>A better way to journal your workouts.</p>

        <p>
          Track your lifts, progressive overload, and progress. Add a new lift, and include your PR. Add a set. Update
          your PR when you break it. Always know.
        </p>

        <p>
          Focused on simplicity, keyboard navigation, and ease-of-use. Has limited features, but does what it does well.
        </p>

        <Waitlist />
      </div>
    </div>
  )
}
