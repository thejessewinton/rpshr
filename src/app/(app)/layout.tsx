import { headers } from 'next/headers'
import { getSessionData } from '~/auth'

export default async function AppLayout({ marketing, app }: LayoutProps<'/'>) {
  const session = await getSessionData(await headers())

  return <>{session?.user ? app : marketing}</>
}
