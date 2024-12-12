import type { ReactNode } from 'react'

import { Tooltip } from '~/components/shared/tooltip'

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Tooltip.Provider delayDuration={50} skipDelayDuration={1000}>
      <main className="mx-auto flex w-full flex-col justify-center">
        {children}
      </main>
    </Tooltip.Provider>
  )
}
