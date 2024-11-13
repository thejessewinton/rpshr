import { ReactNode } from 'react'

import { Header } from '~/components/ui/header'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className='min-w-screen mx-auto flex w-full flex-col justify-center'>{children}</main>
    </>
  )
}
