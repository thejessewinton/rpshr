import { Waitlist } from '~/components/marketing/waitlist'
import { Logo } from '~/components/shared/logo'

export default function Marketing() {
  return (
    <div className='w-full max-w-xl space-y-12 px-8'>
      <header className='flex items-center justify-between'>
        <Logo className='size-6 text-neutral-700 dark:text-white' />

        <h2 className='text-sm text-neutral-700 dark:text-neutral-400'>rup • ture</h2>
      </header>

      <div className='space-y-4 text-sm font-light leading-loose text-neutral-700 dark:text-neutral-400'>
        <p>A better way to journal your workouts.</p>

        <p>
          Track your lifts, progressive overload, and progress. Add a new lift, and include your PR. Add a set. Update
          your PR when you break it. Keep getting stronger.
        </p>

        <p>
          Focused on simplicity, keyboard navigation, accessibility, and ease-of-use. Has limited features, but does
          what it does well.
        </p>

        <p>Might add more, might not.</p>

        <Waitlist />
      </div>
    </div>
  )
}
