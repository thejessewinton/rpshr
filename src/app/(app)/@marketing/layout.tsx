import { ReactNode } from 'react'

import { Header } from '~/components/ui/header'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className='min-w-screen mx-auto flex w-full flex-col justify-center'>{children}</main>
    </>
  )
}
