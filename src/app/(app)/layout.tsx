import { type ReactNode } from 'react'

import { auth } from '~/server/auth'

export default async function AppLayout({ app, marketing }: { app: ReactNode; marketing: ReactNode }) {
  const session = await auth()

  return <>{session ? app : marketing}</>
}
