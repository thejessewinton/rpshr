import { Waitlist } from '~/components/marketing/waitlist'
import { Logo } from '~/components/shared/logo'
import { index } from '~/contentlayer'

export default function IndexPage() {
  return (
    <div className='mx-auto w-full max-w-xl space-y-12 px-8'>
      <header className='flex items-center justify-between'>
        <Logo className='size-6 text-neutral-700 dark:text-white' />

        <h2 className='text-sm text-neutral-700 dark:text-neutral-400'>rpshr</h2>
      </header>

      <div className='prose space-y-4 text-sm font-light leading-loose text-neutral-700 dark:text-neutral-400'>
        <div dangerouslySetInnerHTML={{ __html: index.body.html }} />
        <Waitlist />
      </div>
    </div>
  )
}
