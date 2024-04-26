import { type ReactNode } from 'react'

import { Header } from '~/components/layout/header'

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative mx-auto flex w-full flex-col'>
      <Header />
      <div className='mt-16 flex flex-1 flex-col'>{children}</div>
    </div>
  )
}
