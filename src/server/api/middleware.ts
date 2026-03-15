import { createMiddleware } from '@tanstack/react-start'
import { getSessionData } from '~/auth'

const sessionMiddleware = createMiddleware().server(async ({ ctx }) => {
  return {
    session: getSessionData(ctx.headers),
  }
})
