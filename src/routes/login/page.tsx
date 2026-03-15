import type { Metadata } from 'next'
import { Logo } from '~/components/shared/logo'
import { Login } from '~/components/ui/login'
import { LoginBg } from '~/components/ui/login-bg'

export const metadata: Metadata = {
  title: 'log in',
}

enum AuthError {
  Configuration = 'Configuration',
  AccessDenied = 'AccessDenied',
}

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  const error = (await searchParams).error as AuthError | undefined

  const errorMap: Record<keyof typeof AuthError, string> = {
    Configuration: 'Configuration error',
    AccessDenied: 'Access denied',
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <Logo className="relative z-10 mx-auto size-8" />
          <Login />
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
