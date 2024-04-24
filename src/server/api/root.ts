import { liftsRouter } from '~/server/api/routers/lifts'
import { marketingRouter } from '~/server/api/routers/marketing'
import { setsRouter } from '~/server/api/routers/sets'
import { userRouter } from '~/server/api/routers/user'
import { createTRPCRouter } from '~/server/api/trpc'
import { plansRouter } from './routers/plans'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  lifts: liftsRouter,
  sets: setsRouter,
  marketing: marketingRouter,
  plans: plansRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
