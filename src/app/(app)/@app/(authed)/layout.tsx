import { type ReactNode } from 'react'

import { Header } from '~/components/layout/header'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className='relative mt-8 flex flex-1'>{children}</div>
    </>
  )
}
