import { NextResponse } from 'next/server'

import { auth } from '~/server/auth'

export default auth((req) => {
  if (req.auth && req.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/overview', req.url))
  }
  // if (!req.auth && req.nextUrl.pathname !== '/login') {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
