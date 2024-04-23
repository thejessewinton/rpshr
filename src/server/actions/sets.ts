import { revalidatePath } from 'next/cache'

import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import dayjs from '~/utils/date'
import { protectedAction } from '../actions'
import { db } from '../db'
import { lift, set, units } from '../db/schema'

export const newSetSchema = zfd.formData({
  reps: z.number(),
  weight: z.number(),
  unit: z.enum(units),
  lift_id: z.number(),
  date: z.string(),
  notes: z.string().max(255).optional()
})

export const addSet = protectedAction(newSetSchema, async (input, { userId }) => {
  await db.transaction(async (db) => {
    await db
      .update(lift)
      .set({
        updated_at: dayjs().toDate()
      })
      .where(eq(lift.id, input.lift_id))

    await db.insert(set).values({
      user_id: userId,
      date: dayjs(input.date).toDate(),
      reps: input.reps,
      weight: input.weight,
      unit: input.unit,
      lift_id: input.lift_id
    })

    revalidatePath(`/lift/${input.lift_id}`)
  })
})
