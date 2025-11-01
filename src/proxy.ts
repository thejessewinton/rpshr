import { getCookieCache } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/login', '/marketing']

export const proxy = async (request: NextRequest) => {
  const session = await getCookieCache(request)

  if (!session && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL('/marketing', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
