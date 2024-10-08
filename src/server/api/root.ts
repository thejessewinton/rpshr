import { liftsRouter } from '~/server/api/routers/lifts'
import { marketingRouter } from '~/server/api/routers/marketing'
import { setsRouter } from '~/server/api/routers/sets'
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  lifts: liftsRouter,
  sets: setsRouter,
  marketing: marketingRouter
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
