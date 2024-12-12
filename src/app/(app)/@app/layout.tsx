import type { ReactNode } from 'react'
import { AnimatedList } from '~/components/shared/list'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex w-full flex-col justify-center">
      {children}
      <AnimatedList />
    </main>
  )
}
