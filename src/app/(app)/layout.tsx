import { type ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { Header } from '~/components/layout/header'
import { auth } from '~/server/auth'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <div className='relative mx-auto flex w-full flex-col'>
        <Header />
        <div className='flex flex-1 flex-col justify-center'>{children}</div>
      </div>
    </>
  )
}
