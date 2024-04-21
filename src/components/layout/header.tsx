import { Navigation } from '~/components/layout/navigation'
import { Logo } from '~/components/shared/logo'
import { AddActivity } from '../lifts/add-workout'

export const Header = async () => {
  return (
    <header className='flex items-center justify-between px-8 py-4'>
      <div className='mx-auto flex w-full items-center gap-4'>
        <Logo className='size-6' />
        <div className='h-4 w-px rotate-[16deg] bg-neutral-700' />
        <Navigation />
      </div>
      <AddActivity />
    </header>
  )
}
