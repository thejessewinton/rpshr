import { eq } from 'drizzle-orm'

import { updateUserSchema } from '~/server/api/schemas/user'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { users } from '~/server/db/schema'

export const userRouter = createTRPCRouter({
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
      columns: {
        username: true,
        name: true
      },
      with: {
        customer: true
      }
    })
  }),
  updateUsername: protectedProcedure.input(updateUserSchema).mutation(async ({ ctx, input }) => {
    await ctx.db
      .update(users)
      .set({
        username: input.username
      })
      .where(eq(users.id, ctx.session.user.id))

    return {
      message: 'Username updated'
    }
  })
})
