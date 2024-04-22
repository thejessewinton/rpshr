import { type ReactNode } from 'react'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <div className='flex w-screen items-center justify-center'>{children}</div>
}
