import { Header } from '~/components/ui/header'

export default function IndexPage() {
  return (
    <div className='mx-auto mt-40'>
      <Header />

      <div className='space-y-4 text-sm leading-loose text-neutral-700 dark:text-neutral-400'>
        <div className='flex gap-1'>
          <h2 className='animate-enter font-medium text-white'>Breathe.</h2>
          <h2 className='animate-enter font-medium text-white [animation-delay:750ms]'>Focus.</h2>
          <h2 className='animate-enter font-medium text-white [animation-delay:1500ms]'>Write.</h2>
        </div>

        <div className='space-y-4'>
          <p className='animate-enter [animation-delay:2250ms]'>
            How do we create without inhibition? What would it look like to be in a space devoid of the outside world, a
            place where creativity becomes the centermost ideal? What would you write if you had nothing to distract?
          </p>
          <p className='animate-enter [animation-delay:3000ms]'>
            An environment to write, journal, and take notes. No frills, minimal features— no distractions. A simple
            interface built on top of a powerful text editor.
          </p>
          <p className='animate-enter [animation-delay:3750ms]'>
            Designed with a focus on simplicity, readability, keyboard accessbility, and a delightful experience, this
            should be a place to write without worry. Mostly built for me.
          </p>
          <p className='animate-enter [animation-delay:4500ms]'>Just a focus on the words.</p>

          <a href={'/login'} className='animate-enter block text-white [animation-delay:10000ms]'>
            Start now
          </a>
        </div>
      </div>
    </div>
  )
}
