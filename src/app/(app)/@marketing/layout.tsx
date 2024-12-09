import type { ReactNode } from 'react'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex w-full flex-col flex-wrap justify-center">
      {children}
    </main>
  )
}
