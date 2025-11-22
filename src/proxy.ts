import { getSessionCookie } from 'better-auth/cookies'
import type { Route } from 'next'
import { type NextRequest, NextResponse } from 'next/server'

const routes = {
  home: '/',
  login: '/login',
  marketing: '/marketing',
} as const satisfies Record<string, Route<string>>

export const proxy = async (request: NextRequest) => {
  const session = getSessionCookie(request)

  if (!session && request.nextUrl.pathname === routes.home) {
    return NextResponse.rewrite(new URL('/marketing', request.url))
  }

  if (session && request.nextUrl.pathname.startsWith(routes.marketing)) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
