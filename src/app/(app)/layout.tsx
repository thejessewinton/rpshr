import { type ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { Header } from '~/components/layout/header'
import { Sidebar } from '~/components/layout/sidebar'
import { auth } from '~/server/auth'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <Sidebar />
      <div className='relative mx-auto flex flex-1 flex-col'>
        <Header />
        <div className='mx-auto w-full flex-1 rounded-tl-lg border-l border-t border-neutral-200 bg-neutral-900 px-16 py-8 dark:border-neutral-800'>
          {children}
        </div>
      </div>
    </>
  )
}
