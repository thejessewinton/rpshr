import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Hotkeys } from '~/providers/hotkeys'
import { cn } from '~/utils/cn'
import appCss from '../styles/globals.css?url'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

// export const metadata: Metadata = {
//   title: {
//     template: '%s — rpshr',
//     default: 'rpshr',
//   },
//   description: 'Breathe. Focus. Write.',
//   metadataBase: new URL(env.BETTER_AUTH_URL),
// }

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        template: '%s — rpshr',
        default: 'rpshr',
      },
      {
        description: 'Breathe. Focus. Write.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className={cn(
          'bg-neutral-50 font-sans antialiased selection:bg-blue-500 selection:text-white dark:bg-neutral-900 dark:selection:bg-blue-950',
        )}
      >
        <div className="mx-auto max-w-2xl">
          <main className="isolate mx-auto flex w-full flex-col justify-center">
            <Outlet />
            <Scripts />
          </main>
        </div>
        <Hotkeys />
      </body>
    </html>
  )
}
