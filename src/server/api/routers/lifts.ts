import { and, desc, eq } from 'drizzle-orm'
import { groupBy } from 'remeda'
import { z } from 'zod'

import { transformLiftString } from '~/server/api/transformers/lifts'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { lift, personalRecord, set } from '~/server/db/schema'
import dayjs, { getDaysBetween } from '~/utils/date'
import { liftSchema } from '../schemas/lifts'

export const liftsRouter = createTRPCRouter({
  getAllLifts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.lift.findMany({
      where: eq(lift.user_id, ctx.session.user.id),
      orderBy: [desc(lift.updated_at)],
      with: {
        sets: {
          orderBy: [desc(set.created_at)]
        },
        personal_records: {
          where({ lift_id, user_id }, { and, eq }) {
            return and(eq(personalRecord.lift_id, lift_id), eq(personalRecord.user_id, user_id))
          },
          orderBy: [desc(personalRecord.date)],
          limit: 1,
          columns: {
            weight: true
          }
        }
      }
    })
  }),
  getLiftBySlug: protectedProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const liftQuery = await ctx.db.query.lift.findFirst({
      where: and(eq(lift.slug, input.slug), eq(lift.user_id, ctx.session.user.id)),
      with: {
        sets: {
          columns: {
            id: true,
            date: true,
            weight: true,
            reps: true
          },
          orderBy: [desc(set.weight)]
        },
        personal_records: {
          where({ lift_id, user_id }, { and, eq }) {
            return and(eq(personalRecord.lift_id, lift_id), eq(personalRecord.user_id, user_id))
          },
          orderBy: [desc(personalRecord.date)],
          columns: {
            weight: true,
            date: true,
            unit: true
          }
        }
      }
    })

    if (!liftQuery) return null

    const dates = getDaysBetween(dayjs().subtract(60, 'days'), dayjs().add(305, 'days'))

    return {
      name: liftQuery.name,
      id: liftQuery.id,
      personal_records: liftQuery.personal_records,
      updated_at: liftQuery.updated_at,
      created_at: liftQuery.created_at,
      dates: dates.map((date) => {
        const sets = liftQuery.sets.filter(
          (set) => dayjs(set.date).format('MM DD, YYYY') === date.format('MM DD, YYYY')
        )
        const setsGroupedByWeight = groupBy(sets, (set) => set.weight)

        return {
          numberOfSets: sets.length,
          date: date.format('YYYY-MM-DD'),
          groups: Object.entries(setsGroupedByWeight)
        }
      })
    }
  }),
  createLift: protectedProcedure.input(liftSchema).mutation(async ({ ctx, input }) => {
    await ctx.db.transaction(async (db) => {
      const liftData = transformLiftString(input.lift)

      if (!liftData) return

      const [newLift] = await db
        .insert(lift)
        .values({
          name: liftData.name,
          user_id: ctx.session.user.id
        })
        .returning({ id: lift.id })

      await db.insert(personalRecord).values({
        weight: liftData.weight,
        date: liftData.date,
        lift_id: newLift!.id,
        unit: liftData.unit,
        user_id: ctx.session.user.id
      })
    })

    return {
      message: 'Lift added successfully'
    }
  }),
  renameLift: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(lift).set({ name: input.name }).where(eq(lift.id, input.id))

      return {
        message: 'Lift updated successfully'
      }
    }),
  deleteLift: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(lift).where(eq(lift.id, input.id))

      return {
        message: 'Lift deleted successfully'
      }
    })
})
