import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { setSchema } from '~/server/api/validation/sets'
import { lift, set, units } from '~/server/db/schema'
import { generateSetInsertData } from '~/utils/sets'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const setsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.set.findMany({
      where: eq(lift.user_id, ctx.session.user.id),
      with: {
        lift: true
      }
    })
  }),
  createNew: protectedProcedure
    .input(
      z.object({
        reps: z.number(),
        weight: z.number(),
        unit: z.enum(units),
        lift_id: z.number(),
        date: z.string(),
        notes: z.string().max(50).optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (db) => {
        await db
          .update(lift)
          .set({
            updated_at: dayjs().toDate()
          })
          .where(eq(lift.id, input.lift_id))

        return await db.insert(set).values({
          user_id: ctx.session.user.id,
          date: dayjs(input.date).toDate(),
          reps: input.reps,
          weight: input.weight,
          unit: input.unit,
          lift_id: input.lift_id
        })
      })
    }),
  addSets: protectedProcedure.input(setSchema).mutation(async ({ ctx, input }) => {
    await ctx.db.transaction(async (db) => {
      await db
        .update(lift)
        .set({
          updated_at: dayjs().toDate()
        })
        .where(eq(lift.id, input.lift_id))

      const setData = generateSetInsertData(input.sets)

      if (!setData) return

      return await db.insert(set).values(
        setData.sets.map((set) => ({
          user_id: ctx.session.user.id,
          date: dayjs().toDate(),
          reps: set.reps,
          weight: set.weight,
          unit: set.unit,
          lift_id: input.lift_id
        }))
      )
    })
  }),
  deleteSet: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(set).where(eq(set.id, input.id))
    })
})
