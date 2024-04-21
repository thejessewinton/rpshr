import { desc, eq } from 'drizzle-orm'

import { lift, personalRecord, set } from '~/server/db/schema'
import { getAllDaysInYear } from '~/utils/core'
import dayjs from '~/utils/date'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const activityRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const allLifts = await ctx.db.query.lift.findMany({
      where: eq(lift.user_id, ctx.session.user.id),
      orderBy: [desc(lift.created_at)],
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

    const allDays = getAllDaysInYear()

    return allDays.map((day) => {
      const lifts = allLifts.filter((lift) => {
        return dayjs(lift.created_at).isSame(day.date, 'day')
      })

      return {
        day,
        lifts
      }
    })
  })
})
