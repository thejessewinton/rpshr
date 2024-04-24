import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { unit, units, users } from '~/server/db/schema'

export const userRouter = createTRPCRouter({
  getCurrent: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
      columns: {
        username: true,
        name: true
      }
    })
  }),
  updateUsername: protectedProcedure
    .input(
      z.object({
        username: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          username: input.username
        })
        .where(eq(users.id, ctx.session.user.id))

      return {
        message: 'Username updated'
      }
    }),
  updateWeightUnit: protectedProcedure
    .input(
      z.object({
        value: z.enum(units)
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .insert(unit)
        .values({ value: input.value, user_id: ctx.session.user.id })
        .onConflictDoUpdate({
          target: unit.id,
          set: {
            value: input.value
          }
        })
    })
})
