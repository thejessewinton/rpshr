import type { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex w-full flex-col justify-center">
      {children}
    </main>
  )
}
