import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { GoogleLogo } from '@phosphor-icons/react/dist/ssr'

import { Button } from '~/components/shared/button'
import { Logo } from '~/components/shared/logo'
import { LoginBg } from '~/components/ui/login-bg'
import { auth, signIn } from '~/server/auth'

export const metadata: Metadata = {
  title: 'log in',
}

enum AuthError {
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

  const error = (await searchParams).error as AuthError | undefined

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

  const errorMap: Record<keyof typeof AuthError, string> = {
    Configuration: 'Configuration error',
    AccessDenied: 'Access denied',
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <Logo className="relative z-10 mx-auto size-8" />
          <div className="relative z-10 flex w-full items-center justify-center gap-2">
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
          {error && (
            <div className="max-auto font-light text-gray-700 text-sm dark:text-gray-400">
              {errorMap[error]}
            </div>
          )}
        </div>
      </div>
      <LoginBg />
    </>
  )
}
