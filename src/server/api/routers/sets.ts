import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { setSchema } from '~/server/api/schemas/sets'
import { transformSetString } from '~/server/api/transformers/sets'
import { lift, personalRecord, set, units } from '~/server/db/schema'
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
      const sets = transformSetString(input.sets)

      if (!sets) return

      await db.insert(set).values(
        sets.map((set) => {
          return {
            user_id: ctx.session.user.id,
            date: set.date,
            notes: set.notes,
            reps: set.reps,
            weight: set.weight,
            unit: set.unit,
            lift_id: input.lift_id
          }
        })
      )

      const currentPR = await db.query.personalRecord.findFirst({
        where: eq(personalRecord.lift_id, input.lift_id)
      })

      const setWithHighestWeight = sets.reduce((acc, set) => {
        return set.weight > acc.weight ? set : acc
      }, sets[0]!)

      if (currentPR && setWithHighestWeight.weight > currentPR.weight) {
        await db.insert(personalRecord).values({
          weight: setWithHighestWeight.weight,
          date: setWithHighestWeight.date,
          lift_id: input.lift_id,
          user_id: ctx.session.user.id
        })
      }
    })

    return {
      message: 'Set added successfully'
    }
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
