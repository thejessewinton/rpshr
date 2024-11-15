import type { ReactNode } from 'react'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex w-full min-w-screen flex-col justify-center">
      {children}
    </main>
  )
}
