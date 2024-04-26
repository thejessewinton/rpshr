import '~/styles/globals.css'

import { type ReactNode } from 'react'
import { type Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { cookies } from 'next/headers'

import { env } from '~/env'
import { ThemeProvider } from '~/providers/theme'
import { Toaster } from '~/providers/toaster'
import { TRPCReactProvider } from '~/trpc/react'
import { classNames } from '~/utils/core'

export const metadata: Metadata = {
  title: {
    template: '%s · rpshr',
    default: 'rpshr'
  },
  description: 'A better way to journal your workouts.',
  metadataBase: new URL(env.APP_URL)
}

const inter = Inter({
  display: 'fallback',
  variable: '--font-inter',
  subsets: ['latin']
})

const jetbrains = JetBrains_Mono({
  display: 'fallback',
  variable: '--font-jetbrains-mono',
  subsets: ['latin']
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={classNames('bg-neutral-50 font-sans dark:bg-neutral-900', inter.variable, jetbrains.variable)}>
        <ThemeProvider attribute='class'>
          <TRPCReactProvider cookies={cookies().toString()}>
            <main className='min-w-screen flex min-h-screen w-full flex-col justify-center'>{children}</main>
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
