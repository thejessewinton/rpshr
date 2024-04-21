import '~/styles/globals.css'

import { type ReactNode } from 'react'
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import { Dialog } from '~/components/shared/dialog'
import { HotkeysProvider } from '~/providers/hotkeys'
import { SessionProvider } from '~/providers/session'
import { ThemeProvider } from '~/providers/theme'
import { TRPCReactProvider } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const metadata: Metadata = {
  title: {
    template: '%s · Rupture',
    default: 'Rupture'
  },
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

const inter = Inter({
  display: 'fallback',
  variable: '--font-inter',
  subsets: ['latin']
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={classNames('bg-neutral-50 font-sans dark:bg-neutral-900', inter.variable)}>
        <SessionProvider>
          <ThemeProvider attribute='class'>
            <TRPCReactProvider cookies={cookies().toString()}>
              <main className='flex min-h-screen w-full flex-row'>{children}</main>
              <HotkeysProvider />
              <Dialog />
            </TRPCReactProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
