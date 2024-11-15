import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import { GoogleLogo } from '@phosphor-icons/react/dist/ssr'

import { Button } from '~/components/shared/button'
import { Logo } from '~/components/shared/logo'
import { auth, signIn } from '~/server/auth'

export const metadata: Metadata = {
  title: 'Log In',
}

enum Error {
  Configuration = 'Configuration',
  AccessDenied = 'AccessDenied',
}

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  const error = (await searchParams).error as Error | undefined

  const providers = [
    {
      name: 'Google',
      icon: GoogleLogo,
      action: async () => {
        'use server'
        await signIn('google')
      },
    },
  ]

  const errorMap: Record<keyof typeof Error, string> = {
    [Error.Configuration]: 'Configuration error',
    [Error.AccessDenied]: 'Access denied',
  }

  return (
    <div className="flex h-screen items-center justify-center dark:bg-neutral-900">
      <div className="w-full max-w-2xl space-y-6 text-center">
        <Logo className="mx-auto size-8" />
        <div className="flex w-full items-center justify-center gap-2">
          {providers.map((provider) => (
            <form action={provider.action} key={provider.name}>
              <Button
                className="w-full py-2"
                icon={<provider.icon className="size-4 text-neutral-400" />}
              >
                Continue with {provider.name}
              </Button>
            </form>
          ))}
        </div>
        <div className="max-auto text-sm font-light text-gray-700 dark:text-gray-400">
          {errorMap[error!]}
        </div>
      </div>
    </div>
  )
}
