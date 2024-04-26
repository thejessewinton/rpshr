import { type ReactNode } from 'react'

import { Header } from '~/components/layout/header'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className='relative mt-16 flex flex-1 flex-col'>{children}</div>
    </>
  )
}
