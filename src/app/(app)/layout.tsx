import type { ReactNode } from 'react'

import { auth } from '~/server/auth'

type AppLayoutProps = { marketing: ReactNode; app: ReactNode }

export default async function AppLayout({ marketing, app }: AppLayoutProps) {
  const session = await auth()

  return <>{session ? app : marketing}</>
}
