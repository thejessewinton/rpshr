import '~/styles/globals.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { env } from '~/env'
import { Hotkeys } from '~/providers/hotkeys'
import { TRPCReactProvider } from '~/trpc/react'
import { cn } from '~/utils/core'

export const metadata: Metadata = {
  title: {
    template: '%s — notes',
    default: 'notes',
  },
  description: 'Simple notes.',
  metadataBase: new URL(env.APP_URL),
}

export default async function RootLayout({
  children,
}: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-neutral-50 font-sans antialiased selection:bg-blue-950 selection:text-white dark:bg-neutral-900',
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <SessionProvider>
          <ThemeProvider attribute="class">
            <TRPCReactProvider>
              <div className="mx-auto max-w-2xl px-8">{children}</div>
              <Hotkeys />
            </TRPCReactProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
