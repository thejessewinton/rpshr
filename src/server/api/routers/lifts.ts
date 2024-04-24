import { and, desc, eq } from 'drizzle-orm'
import { z } from 'zod'

import { lift, personalRecord, set, units } from '~/server/db/schema'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const liftsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
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
          columns: {
            weight: true
          }
        }
      }
    })
  }),
  createNew: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        weight: z.number(),
        unit: z.enum(units)
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (db) => {
        const [newLift] = await db
          .insert(lift)
          .values({
            name: input.name,
            user_id: ctx.session.user.id
          })
          .returning({ id: lift.id })

        await db.insert(personalRecord).values({
          weight: input.weight,
          lift_id: newLift!.id,
          user_id: ctx.session.user.id
        })
      })
    }),
  getBySlug: protectedProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.query.lift.findFirst({
      where: and(eq(lift.slug, input.slug), eq(lift.user_id, ctx.session.user.id)),
      with: {
        sets: {
          with: {
            lift: {
              columns: {
                slug: true
              }
            }
          }
        },
        personal_records: {
          where({ lift_id, user_id }, { and, eq }) {
            return and(eq(personalRecord.lift_id, lift_id), eq(personalRecord.user_id, user_id))
          },
          orderBy: [desc(personalRecord.date)],
          columns: {
            weight: true,
            date: true
          }
        }
      }
    })
  }),
  deleteLift: protectedProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(lift).where(eq(lift.id, input.id))
    })
})
