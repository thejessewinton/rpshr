import Link from 'next/link'
import { Header } from '~/components/ui/header'

export default function IndexPage() {
  return (
    <div className="mx-auto my-20 md:my-40">
      <Header />

      <div className="space-y-4 text-neutral-700 text-sm leading-loose dark:text-neutral-400">
        <div className="flex gap-1">
          <h2 className="font-medium text-neutral-950 dark:text-white">
            Breathe.
          </h2>
          <h2 className="font-medium text-neutral-950 dark:text-white">
            Focus.
          </h2>
          <h2 className="font-medium text-neutral-950 dark:text-white">
            Write.
          </h2>
        </div>

        <div className="space-y-4">
          <p>
            How do we create without inhibition? What would it look like to be
            in a space devoid of the outside world, a place where creativity
            becomes the centermost ideal? What would you write if you had
            nothing to distract?
          </p>
          <p>
            An environment to write, journal, and take notes. No frills, minimal
            features— no distractions. A simple interface built on top of a
            powerful text editor.
          </p>
          <p>
            Designed with a focus on simplicity, readability, keyboard
            accessbility, and a delightful experience, this should be a place to
            write without worry. Mostly built for me.
          </p>
          <p>
            Just a focus on the words.{' '}
            <Link href="/login" className="text-neutral-900 dark:text-white">
              Start now
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
