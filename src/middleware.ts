export { auth as middleware } from '~/server/auth'

export const config = {
  matcher: ['/((?!api|!login|!$|!help|_next/static|_next/image|favicon.ico).*)']
}
