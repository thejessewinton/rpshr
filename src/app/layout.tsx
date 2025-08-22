import '~/styles/globals.css'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from 'next-themes'
import { env } from '~/env'
import { Hotkeys } from '~/providers/hotkeys'
import { TRPCReactProvider } from '~/trpc/react'
import { cn } from '~/utils/cn'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s — rpshr',
    default: 'rpshr',
  },
  description: 'Breathe. Focus. Write.',
  metadataBase: new URL(env.BETTER_AUTH_URL),
}

export default async function RootLayout({
  children,
}: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-neutral-50 font-sans antialiased selection:bg-blue-500 selection:text-white dark:bg-neutral-900 dark:selection:bg-blue-950',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <TRPCReactProvider>
            <div className="mx-auto max-w-2xl">{children}</div>
            <Hotkeys />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
