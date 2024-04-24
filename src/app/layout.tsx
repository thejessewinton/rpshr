import '~/styles/globals.css'

import { type ReactNode } from 'react'
import { type Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { cookies } from 'next/headers'

import { get } from '@vercel/edge-config'

import { Ping } from '~/components/shared/ping'
import { env } from '~/env'
import { SessionProvider } from '~/providers/session'
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
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
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
        <SessionProvider>
          <ThemeProvider attribute='class'>
            <TRPCReactProvider cookies={cookies().toString()}>
              <main className='flex min-h-screen w-full flex-row'>{children}</main>
              <Toaster
                position='bottom-center'
                toastOptions={{
                  classNames: {
                    toast:
                      'mx-auto justify-center border-neutral-200/70 rounded-full flex items-center bg-neutral-100/70 text-neutral-700 rounded border dark:border-neutral-700/30 dark:bg-neutral-800/70 dark:text-neutral-400',
                    title: 'text-sm font-light'
                  }
                }}
                icons={{
                  success: <Ping data-variant='success' />,
                  warning: <Ping data-variant='warning' />,
                  error: <Ping data-variant='error' />
                }}
              />
            </TRPCReactProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
