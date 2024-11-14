import { type ReactNode } from 'react'
import { unstable_cache } from 'next/cache'

import { Tooltip } from '~/components/shared/tooltip'
import { Header } from '~/components/ui/header'
import { Shadow, Sidebar } from '~/components/ui/sidebar'
import { api } from '~/trpc/server'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const notes = await api.notes.getAll()

  return (
    <Tooltip.Provider delayDuration={50} skipDelayDuration={1000}>
      <Header />
      <Sidebar notes={notes} />
      {/* <Shadow /> */}
      <main className='min-w-screen mx-auto flex w-full flex-col justify-center'>{children}</main>
    </Tooltip.Provider>
  )
}
