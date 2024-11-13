import '~/styles/globals.css'

import { type ReactNode } from 'react'
import { type Metadata } from 'next'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { Header } from '~/components/ui/header'
import { env } from '~/env'
import { Hotkeys } from '~/providers/hotkeys'
import { SessionProvider } from '~/providers/session'
import { ThemeProvider } from '~/providers/theme'
import { Toaster } from '~/providers/toaster'
import { TRPCReactProvider } from '~/trpc/react'
import { cn } from '~/utils/core'

export const metadata: Metadata = {
  title: {
    template: '%s — notes',
    default: 'notes'
  },
  description: 'Simple notes.',
  metadataBase: new URL(env.APP_URL)
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'bg-neutral-50 font-sans antialiased dark:bg-neutral-900',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <SessionProvider>
          <ThemeProvider attribute='class'>
            <TRPCReactProvider>
              <div className='mx-auto max-w-3xl px-8'>{children}</div>
              <Hotkeys />
            </TRPCReactProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
