import { Waitlist } from '~/components/marketing/waitlist'
import { Logo } from '~/components/shared/logo'

export default function HelpPage() {
  return (
    <div className='mx-auto w-full max-w-xl space-y-12 px-8'>
      <header className='flex items-center justify-between'>
        <Logo className='size-6 text-neutral-700 dark:text-white' />

        <h2 className='text-sm text-neutral-700 dark:text-neutral-400'>rpshr</h2>
      </header>

      <div className='space-y-4 text-sm font-light leading-loose text-neutral-700 dark:text-neutral-400'>
        <p>Write your lifts and sets like a sentence.</p>

        <h2>New Lift</h2>

        <p>
          rpshr expects a string for new lifts, containing the name of the lift, your current 1RM with the unit i.e.
          lbs, or kgs, and the date you set that max, formatted as `Today`, `Yesterday`, or a traditional date string.
          An example would be: <code>Squat, 315lbs, Today</code>
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
