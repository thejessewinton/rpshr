import type { ReactNode } from 'react'

import { Tooltip } from '~/components/shared/tooltip'
import { Shadow, Sidebar } from '~/components/ui/sidebar'
import { RouteChangeListener } from '~/state/route-change-listener'
import { api } from '~/trpc/server'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const notes = await api.notes.getAll()

  return (
    <Tooltip.Provider delayDuration={50} skipDelayDuration={1000}>
      <Sidebar notes={notes} />
      <Shadow />
      <main className="mx-auto flex w-full flex-col justify-center">
        {children}
      </main>
      <RouteChangeListener />
    </Tooltip.Provider>
  )
}
