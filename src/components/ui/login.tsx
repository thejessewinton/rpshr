'use client'

import { GoogleLogo } from '@phosphor-icons/react/dist/ssr'
import { signIn } from '~/auth/client'
import { Button } from '../shared/button'

export const Login = () => {
  return (
    <div className="relative z-10 flex w-full items-center justify-center gap-2">
      <Button
        className="w-full py-2"
        icon={<GoogleLogo className="size-4 text-neutral-400" />}
        onClick={async () => {
          await signIn.social({
            provider: 'google',
            callbackURL: '/',
          })
        }}
      >
        Continue with Google
      </Button>
    </div>
  )
}
