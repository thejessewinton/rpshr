import { type ReactNode } from 'react'

import { auth } from '~/server/auth'

export default async function AppLayout({ marketing, app }: { marketing: ReactNode; app: ReactNode }) {
  const session = await auth()

  return <>{session ? app : marketing}</>
}
