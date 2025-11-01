import { getCookieCache } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

export const proxy = async (request: NextRequest) => {
  const session = await getCookieCache(request)

  if (session) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  // if (!session && !request.nextUrl.pathname.startsWith('/login')) {
  //   return NextResponse.rewrite(new URL('/marketing', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
