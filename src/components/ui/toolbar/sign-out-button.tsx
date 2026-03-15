'use client'

import { ArrowUpRightIcon } from '@phosphor-icons/react/ArrowUpRight'
import { useRouter } from '@tanstack/react-router'
import { useHotkeys } from 'react-hotkeys-hook'
import { signOut } from '~/auth/client'
import { KBD } from '~/components/shared/kbd'
import { Tooltip } from '~/components/shared/tooltip'

export const SignOutButton = () => {
  const router = useRouter()

  const handleSignout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.navigate({ to: '/' })
        },
      },
    })
  }

  useHotkeys('alt+q', async () => {
    await handleSignout()
  })

  return (
    <Tooltip.Root>
      <Tooltip.Trigger onClick={async () => await handleSignout()}>
        <div className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <ArrowUpRightIcon className="size-4 text-neutral-900 transition-transform dark:text-white" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        Sign Out{' '}
        <div className="flex items-center gap-1">
          <KBD>&#8997;</KBD>
          <KBD>Q</KBD>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
